import type { NextFunction, Request, Response } from "express";
import { logger, isError, STATUS } from "shared";
import { OrderStatus } from "../generated/prisma";
import { prisma } from "./db";
import { _env } from "./env";
import { api } from "./lib/axios";
import { qstashClient } from "./lib/qstash";
import { stripe } from "./lib/stripe";
import { createCheckoutSession } from "./service";
import { createOrderSchema } from "./type";

export const createOrder = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const parsedBody = createOrderSchema.safeParse(req.body);
		if (!parsedBody.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: parsedBody.error.message });
		}

		const { lineItems, shippingAddress, userId, cartId, email } =
			parsedBody.data;

		// Cancel any existing PENDING order for this user (abandoned retry)
		const existingPendingOrder = await prisma.order.findFirst({
			where: { userId, status: OrderStatus.PENDING },
			include: { orderItems: true },
		});
		if (existingPendingOrder) {
			logger.info("Cancelling abandoned PENDING order for retry", {
				orderId: existingPendingOrder.id,
			});

			// Cancel the QStash release job if we have the messageId
			if (existingPendingOrder.qstashMessageId) {
				try {
					await qstashClient.messages.delete(existingPendingOrder.qstashMessageId);
					logger.info("QStash release job cancelled", {
						messageId: existingPendingOrder.qstashMessageId,
					});
				} catch {
					// Job may have already fired or expired — safe to ignore
					logger.info("QStash job already gone, skipping", {
						messageId: existingPendingOrder.qstashMessageId,
					});
				}
			}

			// Release reserved inventory
			const abandonedLineItems = existingPendingOrder.orderItems.map((o) => ({
				productId: o.productId,
				inventoryId: o.inventoryId,
				quantity: o.quantity,
			}));
			await api.post(
				`${_env.INVENTORY_SERVICE_URL}/api/inventory/release`,
				abandonedLineItems,
			);
			logger.info("Inventory released for abandoned order", {
				orderId: existingPendingOrder.id,
			});

			// Mark as CANCELLED
			await prisma.order.update({
				where: { id: existingPendingOrder.id },
				data: { status: OrderStatus.FAILED },
			});
		}

		const response = await api.post(
			`${_env.INVENTORY_SERVICE_URL}/api/inventory/reserve`,
			lineItems,
		);
		if (isError(response.status)) {
			return res.status(response.status).json(response.data);
		}
		const totalAmount = lineItems.reduce(
			(acc, i) => i.price * i.quantity + acc,
			0,
		);
		logger.info("Inventory reserved for lineItems", {
			totalAmount,
		});

		const newOrder = await prisma.$transaction(async (tr) => {
			const newOrder = await tr.order.create({
				data: {
					userId,
					status: OrderStatus.PENDING,
					totalAmount,
					paymentMethod: "STRIPE",
					shippingAddress,
				},
			});
			await tr.orderItem.createMany({
				data: lineItems.map((item) => ({
					quantity: item.quantity,
					inventoryId: item.inventoryId,
					productId: item.id,
					productTitle: item.title,
					price: item.price,
					orderId: newOrder.id,
				})),
			});
			return newOrder;
		});
		logger.info("Order created for lineItems", { id: newOrder.id });

		const releaseStockMessage = await qstashClient.publishJSON({
			url: _env.WORKER_STOCK_RELEASE_URL,
			body: {
				topic: "clear_stock_auto",
				orderId: newOrder.id,
			},
			delay: "30m",
		});
		logger.info("Stock clearance message queued", {
			messageId: releaseStockMessage.messageId,
			orderId: newOrder.id,
		});

		await prisma.order.update({
			where: { id: newOrder.id },
			data: { qstashMessageId: releaseStockMessage.messageId },
		});

		const paymentSession = await createCheckoutSession(
			lineItems,
			email,
			cartId,
			releaseStockMessage.messageId,
			newOrder.id,
		);

		return res.status(STATUS.CREATED).json({
			data: {
				paymentSessionId: paymentSession.id,
				paymentSessionUrl: paymentSession.url,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const processOnCheckoutCompleted = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const signature = req.headers["stripe-signature"];
		const event = stripe.webhooks.constructEvent(
			req.body,
			signature as string,
			_env.STRIPE_WEBHOOK_SECRET,
		);

		if (event.type === "checkout.session.completed") {
			const data = event.data.object;
			if (data.payment_status !== "paid") {
				return res
					.status(STATUS.BAD_REQUEST)
					.json({ error: "Order is unpaid" });
			}
			logger.info("Checkout session ", { id: data.id });
			const meta = data.metadata as {
				orderId: string;
				messageId: string;
				cartId: string;
			};

			const order = await prisma.order.findFirst({
				where: { id: meta.orderId },
			});
			if (!order) {
				return res.status(STATUS.NOT_FOUND).json({ error: "Order not found" });
			}

			const updatedOrder = await prisma.order.update({
				data: {
					status: OrderStatus.CONFIRMED,
				},
				where: {
					id: meta.orderId,
				},
			});
			logger.info("Order status updated", {
				id: updatedOrder.id,
				status: updatedOrder.status,
			});

			const orderItems = await prisma.orderItem.findMany({
				where: {
					orderId: meta.orderId,
				},
			});
			const lineItems = orderItems.map((o) => ({
				productId: o.productId,
				inventoryId: o.inventoryId,
				quantity: o.quantity,
			}));
			logger.info("LineItems created from orderItems", {
				total: lineItems.length,
				orderId: meta.orderId,
			});

			let response = await api.post(
				`${_env.INVENTORY_SERVICE_URL}/api/inventory/deduct`,
				lineItems,
			);
			if (isError(response.status)) {
				return res.status(response.status).json(response.data);
			}
			logger.info("Reserved inventory deducted", { orderId: updatedOrder.id });

			await qstashClient.messages.delete(meta.messageId);
			logger.info("Auto stock clearance message deleted", {
				messageId: meta.messageId,
				orderId: meta.orderId,
			});

			response = await api.delete(
				`${_env.CART_SERVICE_URL}/api/cart/${meta.cartId}`,
			);
			if (isError(response.status)) {
				return res.status(response.status).json(response.data);
			}
			logger.info("Cart items cleared", {
				cartId: meta.cartId,
				orderId: meta.orderId,
			});

			await qstashClient.publishJSON({
				url: _env.WORKER_SEND_EMAIL_URL,
				body: {
					topic: "order_confirm_email",
					orderId: meta.orderId,
					email: data.customer_email,
				},
			});
			logger.info("Confirmation email queued", {
				email: data.customer_email,
				orderId: meta.orderId,
			});

			return res.status(STATUS.OK).json({ data: updatedOrder.id });
		}
		return res.status(STATUS.BAD_REQUEST).json({
			message: "Unknown event",
		});
	} catch (error) {
		logger.error("Webhook Failed!", { details: error });
		return res.status(STATUS.SERVER_ERROR).json({
			error,
		});
	}
};

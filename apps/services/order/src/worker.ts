import logger from "@shared/src/logger";
import { isError, STATUS } from "@shared/src/response";
import axios from "axios";
import { orderConfirmationTemplate } from "email-template";
import type { NextFunction, Request, Response } from "express";
import { createTransport } from "nodemailer";
import { prisma } from "./db";
import { _env } from "./env";
import { releaseStockSchema, sendEmailSchema } from "./type";

export const sendEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const parsedBody = sendEmailSchema.safeParse(req.body);
		if (!parsedBody.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: parsedBody.error.message });
		}
		const { orderId, email } = parsedBody.data;

		const order = await prisma.order.findFirst({ where: { id: orderId } });
		if (!order) {
			return res.status(STATUS.NOT_FOUND).json({ error: "No order found" });
		}
		const orderItems = await prisma.orderItem.findMany({ where: { orderId } });
		const lineItems = orderItems.map((o) => ({
			title: o.productTitle,
			quantity: o.quantity,
			price: o.price,
		}));
		logger.info("LineItems created from orderItems", {
			total: lineItems.length,
			orderId: orderId,
		});

		const transporter = createTransport({
			host: _env.MAIL_HOST,
			port: _env.MAIL_PORT,
			auth: {
				user: _env.MAIL_USERNAME,
				pass: _env.MAIL_PASSWORD,
			},
		});
		const emailTemplate = await orderConfirmationTemplate(
			orderId,
			lineItems,
			order.totalAmount.toNumber()
		);

		await transporter.sendMail({
			from: "BeatRos LLC",
			to: email,
			subject: "Order Confirmation",
			html: emailTemplate,
		});
		logger.info("Order confirmation email is sent", {
			orderId,
			email,
		});

		return res.status(STATUS.OK).json({ data: orderId });
	} catch (error) {
		next(error);
	}
};

export const releaseStock = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const parsedBody = releaseStockSchema.safeParse(req.body);
		if (!parsedBody.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: parsedBody.error.message });
		}
		const { orderId } = parsedBody.data;
		const order = await prisma.order.findFirst({ where: { id: orderId } });
		if (!order) {
			return res.status(STATUS.NOT_FOUND).json({ error: "No order found" });
		}

		const orderItems = await prisma.orderItem.findMany({ where: { orderId } });
		const lineItems = orderItems.map((o) => ({
			productId: o.productId,
			inventoryId: o.inventoryId,
			quantity: o.quantity,
		}));
		logger.info("LineItems created from orderItems", {
			total: lineItems.length,
			orderId: orderId,
		});

		const response = await axios.post(
			`${_env.INVENTORY_SERVICE_URL}/api/inventory/deduct`,
			lineItems
		);
		if (isError(response.status)) {
			return res.status(response.status).json(response.data);
		}
		logger.info("Reserved inventory released", { orderId });

		return res.status(STATUS.OK).json({ data: orderId });
	} catch (error) {
		next(error);
	}
};

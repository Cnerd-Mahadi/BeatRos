import logger from "@shared/src/logger";
import { STATUS } from "@shared/src/response";
import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { _env } from "../env";
import { api } from "../lib/axios";
import { fetchCartData } from "../services/cartService";
import { createLineItems } from "../services/orderService";

export const createOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const addressSchema = z.string().min(1);
		const parsed = addressSchema.safeParse(req.body);
		if (!parsed.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: parsed.error.message });
		}
		const address = parsed.data;

		const { products, cartItems } = await fetchCartData(req);
		const lineItems = createLineItems(cartItems, products);
		logger.info("Total line items", { lineItems: lineItems.length });
		if (lineItems.length === 0) {
			return res
				.status(STATUS.NOT_FOUND)
				.json({ error: "Nothing found on the lineItems" });
		}

		const response = await api.post(
			`${_env.ORDER_SERVICE_URL}/api/order/create`,
			{
				lineItems,
				shippingAddress: address,
			}
		);

		return res.status(response.status).json(response.data);
	} catch (error) {
		next(error);
	}
};

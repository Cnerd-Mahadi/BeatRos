import logger from "@shared/src/logger";
import { STATUS } from "@shared/src/response";
import { NextFunction, Request, Response } from "express";
import { ANONYMOUS_SESSION_ID_COOKIE } from "../constant";
import { _env } from "../env";
import { api } from "../lib/axios";
import {
	fetchCartData,
	getCurrentSession,
	validateCart,
} from "../services/cartService";

export const getCartProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { products, cartItems, inventories } = await fetchCartData(req);
		const validatedCart = validateCart(products, inventories, cartItems);
		logger.info("Cart items validated", {
			insufficient: validatedCart.insufficient,
		});

		return res.status(STATUS.OK).json({ data: validatedCart });
	} catch (error) {
		next(error);
	}
};

export const getCartLength = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const session = getCurrentSession(req);
		if (!session) {
			return res
				.status(STATUS.NOT_FOUND)
				.json({ error: "No valid session found" });
		}

		const cartId = `cart:${session.type}:${session.id}`;
		const response = await api.get(
			`${_env.CART_SERVICE_URL}/api/cart/${cartId}/length`
		);
		return res.status(response.status).json(response.data);
	} catch (error) {
		next(error);
	}
};

export const transferCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.user?.id;
		if (!userId)
			return res.status(STATUS.NOT_FOUND).json({ error: "User Id not found" });

		const sessionId = req.cookies[ANONYMOUS_SESSION_ID_COOKIE];
		if (!sessionId)
			return res
				.status(STATUS.NOT_FOUND)
				.json({ error: "Session Id not found" });

		const response = await api.post(
			`${_env.CART_SERVICE_URL}/api/cart/transfer`,
			{ sessionId, userId }
		);

		return res.status(response.status).json(response.data);
	} catch (error) {
		next(error);
	}
};

export const addProductToCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const session = getCurrentSession(req);
		if (!session) {
			return res
				.status(STATUS.NOT_FOUND)
				.json({ error: "No valid session found" });
		}

		const response = await api.post(
			`${_env.CART_SERVICE_URL}/api/cart/add_to_cart`,
			{ ...req.body, sessionId: session.id, sessionType: session.type }
		);

		return res.status(response.status).json(response.data);
	} catch (error) {
		next(error);
	}
};

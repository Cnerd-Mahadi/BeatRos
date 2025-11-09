import logger from "@shared/src/logger";
import { redis } from "@shared/src/redis";
import { isError, STATUS } from "@shared/src/response";
import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { userType } from "./constant";
import { _env } from "./env";
import { api } from "./lib/axios";
import {
	addProductToCartSchema,
	cartSessionSchema,
	ProductType,
	transferCartSchema,
} from "./type";
import { getCartKey, updatedExpiry } from "./utils";

type CartItem = Record<string, number>;

export const addProductToCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const parsedBody = addProductToCartSchema.safeParse(req.body);
		if (!parsedBody.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: parsedBody.error.message });
		}

		const { productId, quantity, sessionId, sessionType } = parsedBody.data;
		const cartId = getCartKey(sessionType, sessionId);
		const response = await api.get(
			`${_env.PRODUCT_SERVICE_URL}/api/product/${productId}`
		);
		if (isError(response.status)) {
			return res.status(response.status).json(response.data);
		}
		const product = response.data.data as ProductType;
		logger.info("Product found", { id: product.id });

		const inventory = product.inventory;
		const available = inventory.total_quantity - inventory.reserved_quantity;
		if (available <= 0) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: "Product not available" });
		}

		if (quantity > available) {
			return res.status(STATUS.BAD_REQUEST).json({
				error: `Product available only ${available} items`,
				available,
			});
		}

		const expiration = updatedExpiry(sessionType);
		await redis.hset(cartId, {
			[productId]: quantity,
		});
		logger.info("Product added to cart", { id: product.id });
		await redis.expire(cartId, expiration);
		logger.info("Increased cart expiration", {
			expiration,
		});

		return res.status(STATUS.OK).json({
			data: {
				productId,
				quantity,
				available,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const getCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const parsed = cartSessionSchema.safeParse(req.params);
		if (!parsed.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: "Cart session info is required" });
		}
		const { sessionId, sessionType } = parsed.data;
		const cartId = getCartKey(sessionType, sessionId);
		const cartExists = await redis.exists(cartId);
		if (!cartExists) {
			return res
				.status(STATUS.NOT_FOUND)
				.json({ error: "Cart session not found" });
		}

		const cartItems = (await redis.hgetall<CartItem>(cartId)) ?? {};
		const cartProducts = Object.entries(cartItems).map(([k, v]) => ({
			id: k,
			quantity: v,
		}));
		logger.info("Total cart items", cartProducts.length);

		const expiration = updatedExpiry(sessionType);
		await redis.expire(cartId, expiration);
		logger.info("Increased cart expiration", {
			expiration,
		});

		return res.status(STATUS.OK).json({ data: cartProducts });
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
		const cartIdSchema = z.string();
		const parsed = cartIdSchema.safeParse(req.params.id);
		if (!parsed.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: "Cart id is required" });
		}
		const cartId = parsed.data;

		const cartLength = await redis.hlen(cartId);
		return res.status(STATUS.OK).json({ data: cartLength });
	} catch (error) {
		next(error);
	}
};

export const deleteCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const cartIdSchema = z.string();
		const parsed = cartIdSchema.safeParse(req.params.id);
		if (!parsed.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: "Cart id is required" });
		}
		const cartId = parsed.data;

		await redis.del(cartId);
		return res.status(STATUS.OK).json({ data: cartId });
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
		const parsed = transferCartSchema.safeParse(req.body);
		if (!parsed.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: parsed.error.message });
		}

		const { userId, sessionId } = parsed.data;
		const sessionCartId = getCartKey(userType.ANONYMOUS, sessionId);
		const currentCart = (await redis.hgetall<CartItem>(sessionCartId)) ?? {};
		if (!currentCart) {
			return res.status(STATUS.OK).json({ message: "No cart found" });
		}

		const pipeline = redis.pipeline();
		const userCartId = getCartKey(userType.USER, userId);
		Object.entries(currentCart).forEach(([k, v]) =>
			pipeline.hset(userCartId, {
				[k]: v,
			})
		);
		await pipeline.exec();
		await redis.del(sessionCartId);

		return res.status(STATUS.OK).json({ data: userCartId });
	} catch (error) {
		next(error);
	}
};

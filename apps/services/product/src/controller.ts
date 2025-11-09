import { isError, STATUS } from "@shared/src/response";
import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { prisma } from "./db";
import { _env } from "./env";
import { api } from "./lib/axios";
import { productIdsSchema } from "./type";

export const handleGetProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const ids = req.query.ids;
		if (ids) {
			return getProductsByIds(req, res);
		}
		return getProducts(req, res);
	} catch (err) {
		next(err);
	}
};

export const getProducts = async (req: Request, res: Response) => {
	const products = await prisma.product.findMany({
		skip: 0,
		take: 50,
	});
	return res.status(STATUS.OK).json({ data: products });
};

export const getProductsByIds = async (req: Request, res: Response) => {
	const ids = (req.params.ids as string).split(",");
	const parsed = productIdsSchema.safeParse(ids);
	if (!parsed.success) {
		return res.status(STATUS.BAD_REQUEST).json({ error: parsed.error.message });
	}

	const productIds = parsed.data;
	const products = await prisma.product.findMany({
		where: {
			id: {
				in: productIds,
			},
		},
	});
	if (!products) {
		return res.status(STATUS.NOT_FOUND).json({ error: "Products not found" });
	}
	if (products.length !== productIds.length) {
		return res
			.status(STATUS.NOT_FOUND)
			.json({ error: "Some products are missing" });
	}

	return res.status(STATUS.OK).json({ data: products });
};

export const getProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const productIdSchema = z.string();
	const parsed = productIdSchema.safeParse(req.params.productId);
	if (!parsed.success) {
		return res.status(STATUS.BAD_REQUEST).json({ error: parsed.error.message });
	}

	const productId = parsed.data;
	try {
		const product = await prisma.product.findFirst({
			where: { id: productId },
		});
		if (!product) {
			return res.status(STATUS.NOT_FOUND).json({ error: "Product not found" });
		}

		const response = await api.get(
			`${_env.INVENTORY_SERVICE_URL}/api/inventory/${product.inventoryId}`
		);

		if (isError(response.status)) {
			return res.status(response.status).json(response.data);
		}

		const inventory = response.data.data;
		return res.status(STATUS.OK).json({ ...product, inventory });
	} catch (error) {
		next(error);
	}
};

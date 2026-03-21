import type { NextFunction, Request, Response } from "express";
import { isError, STATUS } from "shared";
import z from "zod";
import { prisma } from "./db";
import { _env } from "./env";
import { api } from "./lib/axios";
import { filterProducts } from "./service";
import { productIdsSchema } from "./type";

export const handleGetProducts = async (
	req: Request,
	res: Response,
	next: NextFunction,
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
	const { where, orderBy } = filterProducts(req);
	const page = Math.max(1, parseInt(req.query.page as string) || 1);
	const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 40));
	const skip = (page - 1) * limit;

	const [products, total] = await Promise.all([
		prisma.product.findMany({
			where,
			orderBy,
			include: {
				productCategories: {
					select: {
						category: true,
					},
				},
			},
			skip,
			take: limit,
		}),
		prisma.product.count({ where }),
	]);
	return res.status(STATUS.OK).json({ data: products, total });
};

export const getBrands = async (req: Request, res: Response) => {
	const brands = await prisma.brand.findMany({
		skip: 0,
		take: 50,
	});
	return res.status(STATUS.OK).json({ data: brands });
};

export const getCategories = async (req: Request, res: Response) => {
	const categories = await prisma.category.findMany({
		skip: 0,
		take: 50,
	});
	return res.status(STATUS.OK).json({ data: categories });
};

export const getProductsByIds = async (req: Request, res: Response) => {
	const ids = (req.query.ids as string).split(",");
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
	next: NextFunction,
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
			include: {
				brand: true,
				productCategories: {
					select: {
						category: true,
					},
				},
			},
		});
		if (!product) {
			return res.status(STATUS.NOT_FOUND).json({ error: "Product not found" });
		}

		const response = await api.get(
			`${_env.INVENTORY_SERVICE_URL}/api/inventory/${product.inventoryId}`,
		);

		if (isError(response.status)) {
			return res.status(response.status).json(response.data);
		}

		const inventory = response.data.data;
		return res.status(STATUS.OK).json({ data: { ...product, inventory } });
	} catch (error) {
		next(error);
	}
};

import type { NextFunction, Request, Response } from "express";
import { _env } from "../env";
import { api } from "shared";

export const getProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const response = await api.get(`${_env.PRODUCT_SERVICE_URL}/api/product`, {
			params: req.query,
		});
		return res.status(response.status).json(response.data);
	} catch (error) {
		next(error);
	}
};

export const getProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const response = await api.get(
			`${_env.PRODUCT_SERVICE_URL}/api/product/${req.params.id}`
		);
		return res.status(response.status).json(response.data);
	} catch (error) {
		next(error);
	}
};

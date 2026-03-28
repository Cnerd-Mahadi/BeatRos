import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { _env } from "../env";
import { api } from "../lib/axios";

const workerRouter: Router = Router();

workerRouter.post(
	"/release-stock",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await api.post(
				`${_env.ORDER_SERVICE_URL}/api/worker/release-stock`,
				req.body,
				{ headers: { "content-type": req.headers["content-type"] } },
			);
			return res.status(response.status).json(response.data);
		} catch (error) {
			next(error);
		}
	},
);

workerRouter.post(
	"/send-email",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await api.post(
				`${_env.ORDER_SERVICE_URL}/api/worker/send-email`,
				req.body,
				{ headers: { "content-type": req.headers["content-type"] } },
			);
			return res.status(response.status).json(response.data);
		} catch (error) {
			next(error);
		}
	},
);

export default workerRouter;

import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import Stripe from "stripe";
import { STATUS } from "shared";
import { _env } from "../env";
import { api } from "shared";

const stripe = new Stripe(_env.STRIPE_SECRET_KEY);

const webhookRouter: Router = Router();

webhookRouter.post(
	"/checkout/completed",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const signature = req.headers["stripe-signature"];

			let event: Stripe.Event;
			try {
				event = stripe.webhooks.constructEvent(
					req.body,
					signature as string,
					_env.STRIPE_WEBHOOK_SECRET,
				);
			} catch {
				return res
					.status(STATUS.UNAUTHORIZED)
					.json({ error: "Invalid Stripe signature" });
			}

			const response = await api.post(
				`${_env.ORDER_SERVICE_URL}/api/webhook/checkout/completed`,
				event,
			);
			return res.status(response.status).json(response.data);
		} catch (error) {
			next(error);
		}
	},
);

export default webhookRouter;

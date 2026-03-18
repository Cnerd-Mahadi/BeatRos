import { Router } from "express";
import { createOrder, processOnCheckoutCompleted } from "./controller";
import { releaseStock, sendEmail } from "./worker";

export const orderRouter: Router = Router();
export const workerRouter: Router = Router();
export const webhookRouter: Router = Router();

orderRouter.post("/create", createOrder);

workerRouter.post("/release-stock", releaseStock);
workerRouter.post("/send-email", sendEmail);

webhookRouter.post("/checkout/completed", processOnCheckoutCompleted);

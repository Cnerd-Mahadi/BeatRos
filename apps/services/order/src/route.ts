import { Router } from "express";
import { createOrder } from "./controller";
import { releaseStock, sendEmail } from "./worker";

export const orderRouter: Router = Router();
export const workerRouter: Router = Router();

orderRouter.post("/create", createOrder);

workerRouter.post("/release-stock", releaseStock);
workerRouter.post("/send-email", sendEmail);

import { Router } from "express";
import { createOrder } from "../controllers/orderController";
import { auth } from "../middleware";

const orderRouter: Router = Router();

orderRouter.post("/create", auth, createOrder);

export default orderRouter;

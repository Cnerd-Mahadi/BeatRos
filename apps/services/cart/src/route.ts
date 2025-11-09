import { Router } from "express";
import {
	addProductToCart,
	deleteCart,
	getCart,
	getCartLength,
	transferCart,
} from "./controller";

export const cartRouter: Router = Router();

cartRouter.post("/add_to_cart", addProductToCart);
cartRouter.get("/", getCart);
cartRouter.get("/:id/length", getCartLength);
cartRouter.delete("/:id", deleteCart);
cartRouter.post("/transfer", transferCart);

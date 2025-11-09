import { Router } from "express";
import {
	addProductToCart,
	getCartLength,
	getCartProducts,
	transferCart,
} from "../controllers/cartController";
import { auth } from "../middleware";

const cartRouter: Router = Router();

cartRouter.post("add-product", addProductToCart);
cartRouter.post("/transfer-cart", auth, transferCart);
cartRouter.get("/", getCartProducts);
cartRouter.get("/length", getCartLength);

export default cartRouter;

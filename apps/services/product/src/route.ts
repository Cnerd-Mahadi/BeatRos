import { Router } from "express";
import {
	getBrands,
	getCategories,
	getProduct,
	handleGetProducts,
} from "./controller";

export const productRouter: Router = Router();

productRouter.get("/", handleGetProducts);
productRouter.get("/brands", getBrands);
productRouter.get("/categories", getCategories);
productRouter.get("/:productId", getProduct);

import { Router } from "express";
import { getProduct, handleGetProducts } from "./controller";

export const productRouter: Router = Router();

productRouter.get("/", handleGetProducts);
productRouter.get("/:productId", getProduct);

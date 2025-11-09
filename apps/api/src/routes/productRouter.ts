import { Router } from "express";
import { getProduct, getProducts } from "../controllers/productController";

const productRouter: Router = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);

export default productRouter;

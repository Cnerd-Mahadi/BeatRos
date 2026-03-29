import { Router } from "express";
import cartRouter from "./cartRouter";
import orderRouter from "./orderRouter";
import productRouter from "./productRouter";

const router: Router = Router();

router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/cart", cartRouter);

export default router;

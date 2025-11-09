import { Router } from "express";
import cartRouter from "./cartRouter";
import inventoryRouter from "./inventoryRouter";
import orderRouter from "./orderRouter";
import productRouter from "./productRouter";
import userRouter from "./userRouter";

const router: Router = Router();

router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/inventory", inventoryRouter);
router.use("/cart", cartRouter);
router.use("/user", userRouter);

export default router;

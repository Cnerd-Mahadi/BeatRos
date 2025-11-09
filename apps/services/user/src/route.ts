import { Router } from "express";
import { syncUser } from "./controller";

export const userRouter: Router = Router();

userRouter.post("/sync", syncUser);

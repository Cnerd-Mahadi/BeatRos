import { Router } from "express";
import {
	deductInventory,
	getInventoriesByIds,
	getInventory,
	releaseInventory,
	reserveInventory,
} from "./controller";

export const inventoryRouter: Router = Router();

inventoryRouter.get("/", getInventoriesByIds);
inventoryRouter.get("/:id", getInventory);
inventoryRouter.post("/reserve", reserveInventory);
inventoryRouter.post("/deduct", deductInventory);
inventoryRouter.post("/release", releaseInventory);

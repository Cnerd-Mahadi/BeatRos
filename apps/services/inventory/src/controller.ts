import { HttpError, STATUS } from "@shared/src/response";
import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { prisma } from "./db";
import { lineItemSchema } from "./type";

export const getInventory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const inventoryIdSchema = z.string();
		const parsed = inventoryIdSchema.safeParse(req.params);
		if (!parsed.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: parsed.error.message });
		}

		const inventoryId = parsed.data;
		const inventory = await prisma.inventory.findUnique({
			where: { id: inventoryId },
		});
		if (!inventory) {
			return res
				.status(STATUS.NOT_FOUND)
				.json({ error: "Inventory not found" });
		}

		return res.status(STATUS.OK).json({ data: inventory });
	} catch (error) {
		next(error);
	}
};

export const getInventoriesByIds = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const ids = (req.params.ids as string).split(",");
		const inventoryIdsSchema = z.array(z.string().min(1));
		const parsed = inventoryIdsSchema.safeParse(ids);
		if (!parsed.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: parsed.error.message });
		}

		const inventoryIds = parsed.data;
		const inventories = await prisma.inventory.findMany({
			where: {
				id: {
					in: inventoryIds,
				},
			},
		});
		if (!inventories) {
			return res
				.status(STATUS.NOT_FOUND)
				.json({ error: "No inventories found from the ids" });
		}
		if (inventories.length !== inventoryIds.length) {
			return res
				.status(STATUS.NOT_FOUND)
				.json({ error: "Some inventories are missing" });
		}

		return res.status(STATUS.OK).json({ data: inventories });
	} catch (error) {
		next(error);
	}
};

export const reserveInventory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const parsedBody = lineItemSchema.safeParse(req.body);
		if (!parsedBody.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: parsedBody.error.message });
		}

		const lineItems = parsedBody.data;
		await prisma.$transaction(async (tr) => {
			for (const li of lineItems) {
				const inventory = await tr.inventory.findFirst({
					where: {
						id: li.inventoryId,
					},
				});
				if (!inventory) {
					throw new HttpError(STATUS.NOT_FOUND, "Inventory not found");
				}
				const available =
					inventory.total_quantity - inventory.reserved_quantity;
				if (available < li.quantity) {
					throw new HttpError(STATUS.BAD_REQUEST, "Insufficient Item");
				}
				await tr.inventory.update({
					where: { id: li.inventoryId },
					data: {
						reserved_quantity: { increment: li.quantity },
					},
				});
			}
			return true;
		});

		return res.status(STATUS.OK).json({ totalReserved: lineItems.length });
	} catch (error) {
		next(error);
	}
};

export const deductInventory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const parsedBody = lineItemSchema.safeParse(req.body);
		if (!parsedBody.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: parsedBody.error.message });
		}

		const lineItems = parsedBody.data;

		await prisma.$transaction(async (tr) => {
			for (const li of lineItems) {
				const inventory = await tr.inventory.findFirst({
					where: {
						id: li.inventoryId,
					},
				});
				if (!inventory) {
					throw new HttpError(STATUS.NOT_FOUND, "Inventory not found");
				}

				await tr.inventory.update({
					where: { id: li.inventoryId },
					data: {
						reserved_quantity: { decrement: li.quantity },
						total_quantity: { decrement: li.quantity },
					},
				});
			}
			return true;
		});

		return res.status(STATUS.OK).json({ totalDeducted: lineItems.length });
	} catch (error) {
		next(error);
	}
};

export const releaseInventory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const parsedBody = lineItemSchema.safeParse(req.body);
		if (!parsedBody.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ error: parsedBody.error.message });
		}

		const lineItems = parsedBody.data;

		await prisma.$transaction(async (tr) => {
			for (const li of lineItems) {
				const inventory = await tr.inventory.findFirst({
					where: {
						id: li.inventoryId,
					},
				});
				if (!inventory) {
					throw new HttpError(STATUS.NOT_FOUND, "Inventory not found");
				}
				await tr.inventory.update({
					where: { id: li.inventoryId },
					data: {
						reserved_quantity: { decrement: li.quantity },
					},
				});
			}
			return true;
		});

		return res.status(STATUS.OK).json({ totalReleased: lineItems.length });
	} catch (error) {
		next(error);
	}
};

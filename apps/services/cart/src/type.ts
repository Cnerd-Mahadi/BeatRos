import z from "zod";
import { userType } from "./constant";

export const transferCartSchema = z.object({
	userId: z.string(),
	sessionId: z.string(),
});

export const addProductToCartSchema = z.object({
	productId: z.string(),
	quantity: z.number(),
	sessionId: z.string(),
	sessionType: z.enum(userType),
});

export const cartSessionSchema = addProductToCartSchema.pick({
	sessionId: true,
	sessionType: true,
});

enum InventoryStatus {
	ACTIVE,
	INACTIVE,
	OUT_OF_STOCK,
}

export interface InventoryType {
	id: string;
	total_quantity: number;
	reserved_quantity: number;
	status: InventoryStatus;
	createdAt: Date;
	updatedAt: Date;
}

export interface ProductType {
	id: string;
	title: string;
	sku: string;
	description: string | null;
	priceInCents: number;
	slug: string;
	imageUrl: string | null;
	isActive: boolean;
	brandId: string | null;
	inventoryId: string;
	inventory: InventoryType;
}

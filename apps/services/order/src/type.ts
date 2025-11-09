import z from "zod";

export const processPaymentSchema = z.object({
	sessionId: z.string(),
});

export const createOrderSchema = z.object({
	lineItems: z
		.array(
			z.object({
				id: z.string(),
				title: z.string(),
				image: z.string(),
				inventoryId: z.string(),
				price: z.number(),
				quantity: z.number(),
			})
		)
		.min(1),
	userId: z.string(),
	cartId: z.string(),
	email: z.email(),
	shippingAddress: z.string(),
});

export type LineItem = z.infer<
	typeof createOrderSchema.shape.lineItems.element
>;

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

export type InventoryAction = "reserve" | "deduct" | "release";

export const sendEmailSchema = z.object({
	topic: z.literal("order_confirm_email"),
	orderId: z.string(),
	email: z.email(),
});

export const releaseStockSchema = z.object({
	topic: z.literal("clear_stock_auto"),
	orderId: z.string(),
});

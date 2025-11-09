import z from "zod";

export const inventoryUpdateSchema = z.object({
	id: z.string(),
	total: z.number().optional(),
	reserved: z.number(),
});

export const lineItemSchema = z.array(
	z.object({
		inventoryId: z.string(),
		quantity: z.number().nonnegative(),
	})
);

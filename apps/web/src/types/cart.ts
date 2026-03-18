import z from "zod";

export const cartSchema = z.object({
	cart: z.array(
		z.object({
			quantity: z.number(),
			available: z.number(),
			id: z.string(),
			title: z.string(),
			priceInCents: z.number(),
			imageUrl: z.string().nullable(),
			isActive: z.boolean(),
			brandId: z.string().nullable(),
			inventoryId: z.string(),
		})
	),
	insufficient: z.boolean(),
});

export type CartSchema = z.infer<typeof cartSchema>;

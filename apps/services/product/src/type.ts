import z from "zod";

export const productIdsSchema = z.array(z.string().min(1));

export enum SortFilter {
	PRICE_LH = "price: low to high",
	PRICE_HL = "price: high to low",
	NEWEST = "newest",
	OLDEST = "oldest",
}

export const productFilterSchema = z.object({
	category: z.string().optional(),
	brand: z.string().optional(),
	sort_by: z.enum(SortFilter).optional(),
	price_range: z
		.object({
			low: z.coerce.number(),
			high: z.coerce.number(),
		})
		.optional(),
	ids: z.array(z.string()).optional(),
});

export type ProductFilterType = z.infer<typeof productFilterSchema>;

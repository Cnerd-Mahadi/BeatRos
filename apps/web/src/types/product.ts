import { z } from "zod";

export const inventorySchema = z.object({
	id: z.string(),
	total_quantity: z.number(),
	reserved_quantity: z.number(),
	status: z.string(),
});

export const brandSchema = z.object({
	name: z.string(),
	id: z.string(),
	slug: z.string(),
});

export const categorySchema = z.object({
	name: z.string(),
	id: z.string(),
	slug: z.string(),
});

export const productSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	priceInCents: z.number().int(),
	imageUrl: z.string().url(),
	brandId: z.string(),
	productCategories: z.array(
		z.object({
			category: z.object({
				name: z.string(),
				id: z.string(),
			}),
		})
	),
	inventoryId: z.string(),
});

export const productDetailSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	rating: z.number(),
	features: z.array(z.string()),
	priceInCents: z.number().int(),
	imageUrl: z.string().url(),
	brand: brandSchema,
	productCategories: z.array(
		z.object({
			category: categorySchema,
		})
	),
	inventory: inventorySchema,
});

export type BrandSchema = z.infer<typeof brandSchema>;
export type CategorySchema = z.infer<typeof categorySchema>;
export type ProductSchema = z.infer<typeof productSchema>;
export type ProductDetailSchema = z.infer<typeof productDetailSchema>;

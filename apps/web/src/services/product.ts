import type { AxiosInstance } from "axios";
import { brandSchema, categorySchema, productSchema } from "@/types/product";
import z from "zod";

export interface ProductFilters {
	category?: string;
	brand?: string;
	sort_by?: "price: low to high" | "price: high to low" | "newest" | "oldest";
	min_price?: number;
	max_price?: number;
	page?: number;
	limit?: number;
}

const productsResponseSchema = z.object({
	data: z.array(productSchema),
	total: z.number(),
});

export class ProductService {
	constructor(private api: AxiosInstance) {}

	async getProducts(filters?: ProductFilters) {
		const params = new URLSearchParams();

		if (filters?.category) params.append("category", filters.category);
		if (filters?.brand) params.append("brand", filters.brand);
		if (filters?.sort_by) params.append("sort_by", filters.sort_by);
		if (filters?.page) params.append("page", filters.page.toString());
		if (filters?.limit) params.append("limit", filters.limit.toString());

		if (filters?.min_price !== undefined || filters?.max_price !== undefined) {
			params.append("price_range", "true");
			params.append("min_price", (filters?.min_price ?? 0).toString());
			params.append("max_price", (filters?.max_price ?? 9999999).toString());
		}

		const queryString = params.toString();
		const response = await this.api.get(`/product${queryString ? `?${queryString}` : ""}`);
		const parsed = productsResponseSchema.safeParse(response.data);
		if (!parsed.success) throw new Error(parsed.error.message);
		return parsed.data;
	}

	async getProduct(id: string) {
		const response = await this.api.get(`/product/${id}`);
		return response.data;
	}

	async getBrands() {
		const response = await this.api.get("/product/brands");
		const parsed = z.array(brandSchema).safeParse(response.data.data);
		if (!parsed.success) throw new Error(parsed.error.message);
		return parsed.data;
	}

	async getCategories() {
		const response = await this.api.get("/product/categories");
		const parsed = z.array(categorySchema).safeParse(response.data.data);
		if (!parsed.success) throw new Error(parsed.error.message);
		return parsed.data;
	}
}

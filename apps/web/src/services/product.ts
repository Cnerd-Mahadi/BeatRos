import { api } from "@/lib/axios";
import { brandSchema, categorySchema, productSchema } from "@/types/product";
import z from "zod";

export interface ProductFilters {
	category?: string;
	brand?: string;
	sort_by?: "price: low to high" | "price: high to low" | "newest" | "oldest";
	min_price?: number;
	max_price?: number;
}

export const getProducts = async (filters?: ProductFilters) => {
	const params = new URLSearchParams();

	if (filters?.category) {
		params.append("category", filters.category);
	}
	if (filters?.brand) {
		params.append("brand", filters.brand);
	}
	if (filters?.sort_by) {
		params.append("sort_by", filters.sort_by);
	}

	params.append("price_range", "true");
	params.append(
		"min_price",
		filters?.min_price ? filters.min_price.toString() : "0",
	);
	params.append(
		"max_price",
		filters?.max_price ? filters.max_price.toString() : "40000",
	);

	const queryString = params.toString();
	const response = await api.get(
		`/product${queryString ? `?${queryString}` : ""}`,
	);
	const parsed = z.array(productSchema).safeParse(response.data.data);
	if (!parsed.success) throw new Error(parsed.error.message);
	return parsed.data;
};

export const getProduct = async (id: string) => {
	const response = await api.get(`/product/${id}`);
	return response.data;
};

export const getBrands = async () => {
	const response = await api.get(`/product/brands`);
	const parsed = z.array(brandSchema).safeParse(response.data.data);
	if (!parsed.success) throw new Error(parsed.error.message);
	return parsed.data;
};

export const getCategories = async () => {
	const response = await api.get(`/product/categories`);
	const parsed = z.array(categorySchema).safeParse(response.data.data);
	if (!parsed.success) throw new Error(parsed.error.message);
	return parsed.data;
};

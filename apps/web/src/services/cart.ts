import { api } from "@/lib/axios";
import { cartSchema } from "@/types/cart";
import z from "zod";

export async function addToCart(productId: string, quantity: number) {
	const response = await api.post(`/cart/add-product`, { quantity, productId });
	return response.data;
}

export async function getCartLength() {
	const response = await api.get(`/cart/length`);
	const cartLengthSchema = z.number();
	const parsed = cartLengthSchema.safeParse(response.data.data);
	if (!parsed.success) throw new Error(parsed.error.message);
	return parsed.data;
}

export async function getCart() {
	const response = await api.get(`/cart`);
	const parsed = cartSchema.safeParse(response.data.data);
	if (!parsed.success) throw new Error(parsed.error.message);
	return parsed.data;
}

export async function transferCart(sessionId: string, token: string) {
	const authedApi = () => {
		api.interceptors.request.use((config) => {
			config.headers.Authorization = `Bearer ${token}`;
			return config;
		});
		return api;
	};
	const response = await authedApi().post(
		`/cart/transfer?session_id=${sessionId}`,
	);
	const cartIdSchema = z.string().min(1);
	const parsed = cartIdSchema.safeParse(response.data.data);
	if (!parsed.success) throw new Error(parsed.error.message);
	return !!parsed.data;
}

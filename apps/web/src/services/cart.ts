import type { AxiosInstance } from "axios";
import { cartSchema } from "@/types/cart";
import z from "zod";

export class CartService {
	constructor(private api: AxiosInstance) {}

	async getCartLength() {
		const response = await this.api.get("/cart/length");
		const parsed = z.number().safeParse(response.data.data);
		if (!parsed.success) throw new Error(parsed.error.message);
		return parsed.data;
	}

	async getCart() {
		const response = await this.api.get("/cart");
		const parsed = cartSchema.safeParse(response.data.data);
		if (!parsed.success) throw new Error(parsed.error.message);
		return parsed.data;
	}

	async addToCart(productId: string, quantity: number) {
		const response = await this.api.post("/cart/add-product", { productId, quantity });
		return response.data;
	}

	async transferCart(sessionId: string) {
		const response = await this.api.post(`/cart/transfer?session_id=${sessionId}`);
		const parsed = z.string().min(1).safeParse(response.data.data);
		if (!parsed.success) throw new Error(parsed.error.message);
		return !!parsed.data;
	}
}

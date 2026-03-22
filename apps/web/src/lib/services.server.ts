import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { CartService } from "@/services/cart";
import { OrderService } from "@/services/order";
import { ProductService } from "@/services/product";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export async function getServices() {
	const { getToken } = await auth();
	const token = await getToken();

	const api = axios.create({
		baseURL,
		headers: { Authorization: `Bearer ${token}` },
	});

	return {
		cart: new CartService(api),
		order: new OrderService(api),
		product: new ProductService(api),
	};
}

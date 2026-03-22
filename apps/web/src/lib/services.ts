"use client";

import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { CartService } from "@/services/cart";
import { OrderService } from "@/services/order";
import { ProductService } from "@/services/product";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

function createApi(token: string) {
	return axios.create({
		baseURL,
		headers: { Authorization: `Bearer ${token}` },
	});
}

// server components
export async function getServices() {
	const { getToken } = await auth();
	const token = await getToken();
	const api = createApi(token!);

	return {
		cart: new CartService(api),
		order: new OrderService(api),
		product: new ProductService(api),
	};
}

// client components
export function useServices() {
	const { getToken } = useAuth();

	const api = axios.create({ baseURL });

	api.interceptors.request.use(async (config) => {
		const token = await getToken();
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	});

	return {
		cart: new CartService(api),
		order: new OrderService(api),
		product: new ProductService(api),
	};
}

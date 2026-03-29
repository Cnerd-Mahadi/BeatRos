"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { SESSION_ID_HEADER } from "@/lib/constant";
import { CartService } from "@/services/cart";
import { OrderService } from "@/services/order";
import { ProductService } from "@/services/product";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export function useServices() {
	const { getToken } = useAuth();

	const api = axios.create({ baseURL });

	api.interceptors.request.use(async (config) => {
		const token = await getToken();
		if (token) config.headers.Authorization = `Bearer ${token}`;

		if (!token) {
			const { data } = await axios.get("/api/session");
			if (data.sid) config.headers[SESSION_ID_HEADER] = data.sid;
		}

		return config;
	});

	return {
		cart: new CartService(api),
		order: new OrderService(api),
		product: new ProductService(api),
	};
}

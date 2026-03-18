import { api } from "@/lib/axios";

export async function createOrder(data: { address: string; email: string }) {
	const response = await api.post(`/order/create`, data);
	return response.data;
}

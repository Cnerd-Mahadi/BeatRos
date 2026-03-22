import type { AxiosInstance } from "axios";

export class OrderService {
	constructor(private api: AxiosInstance) {}

	async createOrder(data: { address: string; email: string }) {
		const response = await this.api.post("/order/create", data);
		return response.data;
	}
}

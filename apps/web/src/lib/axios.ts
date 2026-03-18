import { env } from "@/env";
import axios from "axios";

export const api = axios.create({
	withCredentials: true,
	baseURL: `${env.NEXT_PUBLIC_API_URL}/api/v1`,
});

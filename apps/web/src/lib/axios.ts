import axios from "axios";

const baseURL =
	typeof window === "undefined" ? `${process.env.API_URL}/api/v1` : `/api/v1`;

export const api = axios.create({
	withCredentials: true,
	baseURL,
});

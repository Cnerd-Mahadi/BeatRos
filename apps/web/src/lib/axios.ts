import axios from "axios";

// client-side uses NEXT_PUBLIC_API_URL, server-side falls back to API_URL
const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

// for unauthenticated or cookie-based client requests
export const api = axios.create({
	withCredentials: true,
	baseURL,
});

// for server-side calls with explicit Bearer token
export function serverApi(token: string) {
	return axios.create({
		baseURL,
		headers: { Authorization: `Bearer ${token}` },
	});
}

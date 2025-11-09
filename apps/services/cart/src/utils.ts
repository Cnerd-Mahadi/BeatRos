import { userType } from "./constant";

export const updatedExpiry = (sessionType: userType) =>
	sessionType === "user" ? 30 * 86400 : 3 * 86400;

export const getCartKey = (type: userType, id: string) => `cart:${type}:${id}`;

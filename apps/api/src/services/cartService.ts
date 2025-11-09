import { getAuth } from "@clerk/express";
import logger from "@shared/src/logger";
import { HttpError, isError, STATUS } from "@shared/src/response";
import { Request } from "express";
import { ANONYMOUS_SESSION_ID_COOKIE, userType } from "../constant";
import { _env } from "../env";
import { api } from "../lib/axios";
import { CartItem } from "../types/cart";
import { InventoryType } from "../types/inventory";
import { ProductType } from "../types/product";

export function getCurrentSession(req: Request) {
	let sessionId = null;

	const { isAuthenticated, userId } = getAuth(req);
	if (isAuthenticated) {
		return { type: userType.USER, id: userId };
	}

	sessionId = req.cookies[ANONYMOUS_SESSION_ID_COOKIE] as string | null;
	if (sessionId) {
		return { type: userType.ANONYMOUS, id: sessionId };
	}

	return null;
}

export function validateCart(
	products: Omit<ProductType, "inventory">[],
	inventories: InventoryType[],
	cartItems: CartItem[]
) {
	let insufficient = false;
	const inventoriesMap = new Map(inventories.map((i) => [i.id, i]));
	const productsMap = new Map(products.map((p) => [p.id, p]));

	const validated = cartItems.map((c) => {
		const p = productsMap.get(c.id) as ProductType;
		const inv = inventoriesMap.get(p.inventoryId) as InventoryType;
		const available = inv.total_quantity - inv.reserved_quantity;
		insufficient = available < c.quantity ? true : insufficient;
		return { ...p, quantity: c.quantity, available };
	});

	return { validated, insufficient };
}

export async function fetchCartData(req: Request) {
	const session = getCurrentSession(req);
	if (!session) {
		throw new HttpError(STATUS.NOT_FOUND, "No valid user session found");
	}

	let response = await api.get(`${_env.CART_SERVICE_URL}/api/cart`, {
		params: {
			sessionId: session.id,
			sessionType: session.type,
		},
	});
	if (isError(response.status)) {
		throw new HttpError(response.status, response.data);
	}
	const cartItems: CartItem[] = response.data.data;

	response = await api.get(`${_env.PRODUCT_SERVICE_URL}/api/product`, {
		params: {
			ids: cartItems.map((c) => c.id).join(","),
		},
	});
	if (isError(response.status)) {
		throw new HttpError(response.status, response.data);
	}
	const products: ProductType[] = response.data.data;

	response = await api.get(`${_env.INVENTORY_SERVICE_URL}/api/inventory`, {
		params: {
			ids: products.map((p) => p.inventoryId).join(","),
		},
	});
	if (isError(response.status)) {
		throw new HttpError(response.status, response.data);
	}
	const inventories: InventoryType[] = response.data.data;

	logger.info("Total Cart items", {
		products: products.length,
		cartItems: cartItems.length,
		inventories: inventories.length,
	});

	return { products, inventories, cartItems };
}

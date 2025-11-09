import { HttpError, STATUS } from "@shared/src/response";
import { CartItem } from "../types/cart";
import { ProductType } from "../types/product";

export const createLineItems = (cart: CartItem[], products: ProductType[]) => {
	const productsMap = new Map(products.map((p) => [p.id, p]));
	return cart.map((c) => {
		const p = productsMap.get(c.id);
		if (!p) throw new HttpError(STATUS.NOT_FOUND, "Cart Product missing");

		return {
			id: c.id,
			inventoryId: p.inventoryId,
			title: p.title,
			image: p.imageUrl,
			price: p.priceInCents,
			quantity: c.quantity,
		};
	});
};

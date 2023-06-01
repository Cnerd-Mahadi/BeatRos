import { productType } from "../data/products";
import { AppDispatch } from "../store/store";
import {
	addItemtoCart,
	reduceItemFromCart,
	removeItemFromCart,
} from "./cartManager";
import {
	addProduct,
	decrementProduct,
	incrementProduct,
} from "./productManager";

export const handleAddToCart = (
	product: productType[0],
	dispatch: AppDispatch
) => {
	if (product && product.quantity > 0) {
		decrementProduct(product.id, dispatch);
		addItemtoCart(product, dispatch);
	}
};

export const handleReduceFromCart = (
	product: productType[0],
	dispatch: AppDispatch
) => {
	if (product.quantity > 1) {
		reduceItemFromCart(product.id, dispatch);
		incrementProduct(product.id, dispatch);
	}
};

export const handleRemoveFromCart = (
	product: productType[0],
	dispatch: AppDispatch
) => {
	if (product) {
		removeItemFromCart(product.id, dispatch);
		addProduct(product.id, dispatch);
	}
};

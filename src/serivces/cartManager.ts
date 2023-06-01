import { productType } from "../data/products";
import { cartAction } from "../store/cartSlice";
import { AppDispatch } from "../store/store";

export const getCartItem = (cart: productType, productId: number) => {
	return cart.find((product) => product.id === productId);
};

export const addItemtoCart = (
	product: productType[0],
	dispatch: AppDispatch
) => {
	if (product) {
		dispatch(cartAction["cart/addProduct"]({ product }));
	}
};

export const reduceItemFromCart = (
	productId: number,
	dispatch: AppDispatch
) => {
	dispatch(cartAction["cart/reduceProduct"]({ id: productId }));
};

export const removeItemFromCart = (
	productId: number,
	dispatch: AppDispatch
) => {
	dispatch(cartAction["cart/removeProduct"]({ id: productId }));
};

export const clearCart = (dispatch: AppDispatch) => {
	dispatch(cartAction["cart/clearCart"]());
};

export const totalPriceCount = (cart: productType) => {
	return cart.reduce(
		(total, product) => total + product.price * product.quantity,
		0
	);
};

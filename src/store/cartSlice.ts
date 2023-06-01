import { createSlice } from "@reduxjs/toolkit";
import { productType } from "../data/products";

const initialCart: productType = [];

const cartSlice = createSlice({
	name: "cart",
	initialState: initialCart,
	reducers: {
		"cart/addProduct": (state, action) => {
			const { product } = action.payload;
			const exisitingCartProduct = state.find((item) => item.id === product.id);
			if (exisitingCartProduct) {
				exisitingCartProduct.quantity += 1;
			} else {
				state.push({ ...product, quantity: 1 });
			}
		},

		"cart/reduceProduct": (state, action) => {
			const product = state.find((item) => item.id === action.payload.id);
			if (product) {
				product.quantity -= 1;
			}
		},
		"cart/removeProduct": (state, action) => {
			const productIndex = state.findIndex(
				(item) => item.id === action.payload.id
			);
			state.splice(productIndex, 1);
		},

		"cart/clearCart": () => [],
	},
});

export const cartAction = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

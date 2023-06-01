import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { overlayReducer } from "./overlaySlice";
import { productReducer } from "./productSlice";

export const store = configureStore({
	reducer: {
		products: productReducer,
		cart: cartReducer,
		overlay: overlayReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

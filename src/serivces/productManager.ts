import { productType } from "../data/products";
import { productAction } from "../store/productSlice";
import { AppDispatch } from "../store/store";

export const getFeaturedProducts = (products: productType) => {
	return products.filter((product) => product.tag === "featured-product");
};

export const getTopProducts = (products: productType) => {
	return products.slice(0, 8);
};

export const getHeroProducts = (products: productType) => {
	return products.filter((product) => product.tag === "hero-product");
};

export const getProduct = (products: productType, productId: number) => {
	return products.find((product) => product.id === productId);
};

export const getProductsByPriceOrder = (
	products: productType,
	order: number
) => {
	let productOrdered: productType = [];
	productOrdered = [...products];

	if (productOrdered && order === 0) {
		productOrdered.sort((a, b) => a.price - b.price);
	} else {
		productOrdered.sort((a, b) => b.price - a.price);
	}

	return productOrdered;
};

export const getProductsByPriceRange = (
	products: productType,
	priceRange: number
) => {
	return products.filter((product) => product.price <= priceRange);
};

export const getProductsByCategory = (
	products: productType,
	filterOption: string
) => {
	return products.filter((product) => product.category === filterOption);
};

export const addProduct = (productId: number, dispatch: AppDispatch) => {
	dispatch(productAction["products/addProduct"]({ id: productId }));
};

export const incrementProduct = (productId: number, dispatch: AppDispatch) => {
	dispatch(productAction["products/incrementProduct"]({ id: productId }));
};

export const decrementProduct = (productId: number, dispatch: AppDispatch) => {
	dispatch(productAction["products/decrementProduct"]({ id: productId }));
};

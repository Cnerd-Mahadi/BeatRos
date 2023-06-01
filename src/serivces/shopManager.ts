import { productType } from "../data/products";
import { SORTS } from "../utilities/common";
import { filterObjectType, filtersType } from "../utilities/types";
import {
	getFeaturedProducts,
	getProductsByPriceOrder,
	getProductsByPriceRange,
	getTopProducts,
} from "./productManager";

export const getProductsByOption = (
	products: productType,
	filters: filtersType,
	sortType: string,
	priceRange?: number
) => {
	const sortedProducts = getProductsBySort(products, sortType, priceRange);
	let finalProducts = sortedProducts ? sortedProducts : products;
	const productsByCategory: productType = [];

	sortedProducts &&
		filters.categories.forEach((category) => {
			finalProducts.forEach((product) => {
				product.category === category.name &&
					category.checked &&
					productsByCategory.push(product);
			});
		});

	finalProducts = productsByCategory.length
		? productsByCategory
		: finalProducts;

	const productsByBrand: productType = [];

	productsByCategory &&
		filters.brands.forEach((brand) => {
			finalProducts.forEach((product) => {
				product.brand === brand.name &&
					brand.checked &&
					productsByBrand.push(product);
			});
		});

	finalProducts = productsByBrand.length ? productsByBrand : finalProducts;
	console.log(finalProducts, filters);
	return finalProducts;
};

export const getProductsBySort = (
	products: productType,
	sort: string,
	priceRange?: number
) => {
	priceRange = priceRange ? priceRange : 0;

	switch (sort) {
		case SORTS.TOP_PRODUCTS:
			return getTopProducts(products);
		case SORTS.FEATURED:
			return getFeaturedProducts(products);
		case SORTS.HIGH_TO_LOW:
			return getProductsByPriceOrder(products, 1);
		case SORTS.LOW_TO_HIGH:
			return getProductsByPriceOrder(products, 0);
		case SORTS.PRICE_RANGE:
			return getProductsByPriceRange(products, priceRange);
		default:
			return products;
	}
};

export const filterProductsByCategory = (
	products: productType,
	filterOption: filterObjectType
) => {
	return products.filter(
		(product) => product.category === filterOption.name && filterOption.checked
	);
};

export const filterProductsByBrand = (
	products: productType,
	filterOption: filterObjectType
) => {
	return products.filter(
		(product) => product.brand === filterOption.name && filterOption.checked
	);
};

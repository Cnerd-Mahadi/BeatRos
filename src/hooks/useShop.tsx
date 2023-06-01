import { useState } from "react";
import { productType } from "../data/products";
import { getProductsByOption } from "../serivces/shopManager";
import { SORTS, filterBrands, filterCategories } from "../utilities/common";

type useShopProps = {
	products: productType;
	setProducts: React.Dispatch<React.SetStateAction<productType>>;
};

export const useShop = ({ products, setProducts }: useShopProps) => {
	const [sortedPrice, setSortedPrice] = useState(0);
	const [sortType, setSortType] = useState("");

	const [filterBrandsOption, setFilterBrandsOption] = useState(filterBrands);
	const [filterCategoriesOption, setFilterCategoriesOption] =
		useState(filterCategories);
	const filterOptions = {
		categories: filterCategoriesOption,
		brands: filterBrandsOption,
	};

	const handlePriceRange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const priceRange = parseInt(event.currentTarget.value);
		setSortedPrice(priceRange);
		setSortType(SORTS.PRICE_RANGE);

		setProducts(
			getProductsByOption(
				products,
				filterOptions,
				SORTS.PRICE_RANGE,
				priceRange
			)
		);
	};

	const handleCategoriesChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const catagory = event.target.name;
		const modifiedCatagory = filterCategoriesOption.find((item) => {
			return item.name === catagory;
		});
		if (modifiedCatagory) {
			modifiedCatagory.checked
				? (modifiedCatagory.checked = false)
				: (modifiedCatagory.checked = true);
			setFilterCategoriesOption(
				filterCategoriesOption.map((filterCatagory) =>
					filterCatagory.name === modifiedCatagory.name
						? modifiedCatagory
						: filterCatagory
				)
			);
			setProducts(
				getProductsByOption(products, filterOptions, sortType, sortedPrice)
			);
		}
	};

	const handleBrandsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const brand = event.target.name;
		const modifiedBrand = filterBrandsOption.find((item) => {
			return item.name === brand;
		});
		if (modifiedBrand) {
			modifiedBrand.checked
				? (modifiedBrand.checked = false)
				: (modifiedBrand.checked = true);
			setFilterBrandsOption(
				filterBrands.map((filterBrand) =>
					filterBrand.name === modifiedBrand.name ? modifiedBrand : filterBrand
				)
			);
			setProducts(
				getProductsByOption(products, filterOptions, sortType, sortedPrice)
			);
		}
	};

	return {
		sortedPrice,
		setSortType,
		filterBrandsOption,
		filterCategoriesOption,
		filterOptions,
		handlePriceRange,
		handleCategoriesChange,
		handleBrandsChange,
	};
};

import { FC } from "react";
import { productType } from "../../data/products";
import { useProduct } from "../../hooks/useProduct";
import { useShop } from "../../hooks/useShop";
import { getProductsByOption } from "../../serivces/shopManager";
import { SORTS } from "../../utilities/common";

export type SideBarProps = {
	setProducts: React.Dispatch<React.SetStateAction<productType>>;
};

export const SideBar: FC<SideBarProps> = ({ setProducts }) => {
	const productsStored = useProduct();
	const {
		sortedPrice,
		setSortType,
		filterBrandsOption,
		filterCategoriesOption,
		filterOptions,
		handlePriceRange,
		handleCategoriesChange,
		handleBrandsChange,
	} = useShop({ products: productsStored, setProducts });

	return (
		<section className={"sidebar"}>
			<h3>Sort</h3>
			<hr />
			<div className="sidebar__sort">
				<p
					onClick={() => {
						setSortType(SORTS.FEATURED);
						setProducts(
							getProductsByOption(productsStored, filterOptions, SORTS.FEATURED)
						);
					}}>
					Featured
				</p>
				<p
					onClick={() => {
						setSortType(SORTS.TOP_PRODUCTS);
						setProducts(
							getProductsByOption(
								productsStored,
								filterOptions,
								SORTS.TOP_PRODUCTS
							)
						);
					}}>
					Top products
				</p>
				<p
					onClick={() => {
						setSortType(SORTS.LOW_TO_HIGH);
						setProducts(
							getProductsByOption(
								productsStored,
								filterOptions,
								SORTS.LOW_TO_HIGH
							)
						);
					}}>
					Price(lowest to highest)
				</p>
				<p
					onClick={() => {
						setSortType(SORTS.HIGH_TO_LOW);
						setProducts(
							getProductsByOption(
								productsStored,
								filterOptions,
								SORTS.HIGH_TO_LOW
							)
						);
					}}>
					Price(highest to lowest)
				</p>
				<div className="sidebar__price">
					<p>Price: {sortedPrice}</p>
					<input
						type="range"
						id="price"
						name="price"
						min={0}
						max={20000}
						step={1}
						onChange={handlePriceRange}
					/>
				</div>
			</div>
			<h3>Filter</h3>
			<hr />
			<div className="sidebar__filters">
				<div className="sidebar__brands">
					<h4>Brands</h4>
					{filterBrandsOption.map((item) => {
						return (
							<div key={item.id} className="sidebar__brand">
								<input
									type="checkbox"
									name={item.name}
									id={item.name}
									onChange={handleBrandsChange}
									checked={item.checked}
								/>
								<p>{item.name}</p>
							</div>
						);
					})}
				</div>
				<div className="sidebar__categories">
					<h4>Categories</h4>
					{filterCategoriesOption.map((item) => {
						return (
							<div key={item.id} className="sidebar__brand">
								<input
									type="checkbox"
									name={item.name}
									id={item.name}
									onChange={handleCategoriesChange}
									checked={item.checked}
								/>
								<p>{item.name}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

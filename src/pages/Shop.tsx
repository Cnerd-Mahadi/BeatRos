import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ProductGallery } from "../components/shop/ProductGallery";
import { SideBar } from "../components/shop/SideBar";
import { useProduct } from "../hooks/useProduct";
import { overlayAction } from "../store/overlaySlice";
import { RootState } from "../store/store";

export const Shop = () => {
	const [products, setProducts] = useState(useProduct());
	const filterMenu = useSelector(
		(state: RootState) => state.overlay.filterMenu
	);
	const dispatch = useDispatch();
	const [activeFilter, setActiveFilter] = useState(false);

	return (
		<>
			<div className="container shop">
				<FaFilter
					className={`${activeFilter && "filter--colored"} shop__filter-icon`}
					onClick={() => {
						filterMenu
							? dispatch(overlayAction.filterMenuOff())
							: dispatch(overlayAction.filterMenuOn());
						setActiveFilter(!activeFilter);
					}}
				/>
				<div className="shop__filters">
					<SideBar setProducts={setProducts} />
				</div>
				{filterMenu && (
					<div className="shop__mob-filters">
						<SideBar setProducts={setProducts} />
					</div>
				)}
				{!filterMenu && (
					<div className="shop__products">
						<ProductGallery products={products} />
					</div>
				)}
			</div>
		</>
	);
};

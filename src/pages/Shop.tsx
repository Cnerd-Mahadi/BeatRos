import { ProductGallery } from "../components/shop/ProductGallery";
import { SideBar } from "../components/shop/SideBar";

export const Shop = () => {
	return (
		<div className="container shop">
			<div className="shop__filters">
				<SideBar />
			</div>
			<div className="shop__products">
				<ProductGallery />
			</div>
		</div>
	);
};

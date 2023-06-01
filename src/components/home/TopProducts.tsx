import { FC } from "react";
import { productType } from "../../data/products";
import { Product } from "../common/Product";

type TopProductsProps = {
	topProducts: productType;
};

export const TopProducts: FC<TopProductsProps> = ({ topProducts }) => {
	return (
		<div className="top-products">
			{topProducts.map((item) => {
				return (
					<Product
						key={item.id}
						id={item.id}
						title={item.title}
						image={item.images[0]}
						price={item.price}
						info={item.info}
						rateCount={item.rateCount}
					/>
				);
			})}
		</div>
	);
};

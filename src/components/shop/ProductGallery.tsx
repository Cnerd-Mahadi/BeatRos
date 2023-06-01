import { FC } from "react";
import { productType } from "../../data/products";
import { Product } from "../common/Product";

type ProductGalleryProps = {
	products: productType;
};

export const ProductGallery: FC<ProductGalleryProps> = ({ products }) => {
	return (
		<section className="product-gallery">
			{products.map((item) => {
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
		</section>
	);
};

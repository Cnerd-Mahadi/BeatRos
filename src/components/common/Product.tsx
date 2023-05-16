import { BsFillCartPlusFill } from "react-icons/bs";

interface ProductProps {
	title: string;
	image: string;
	price: number;
	type: string;
}

export const Product = ({ title, image, price, type }: ProductProps) => {
	return (
		<>
			<section className="product">
				<div className="product__image">
					<img src={image} alt="product_image" />
				</div>
				<div className="product__details">
					<h6 className="product__category">{type}</h6>
					<h3 className="product__title">{title}</h3>
					<div className="product__shop">
						<div className="product__info">
							<div className="ratings">
								<img
									src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
									alt="rating"
								/>
								<img
									src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
									alt="rating"
								/>
								<img
									src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
									alt="rating"
								/>
								<img
									src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
									alt="rating"
								/>
								<img
									src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
									alt="rating"
								/>
							</div>
							<h3>{`BDT. ${price}`}</h3>
						</div>
						<BsFillCartPlusFill className="product__cart" />
					</div>
				</div>
			</section>
		</>
	);
};

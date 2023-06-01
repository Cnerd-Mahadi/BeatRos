import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useProduct } from "../../hooks/useProduct";
import { getProduct } from "../../serivces/productManager";
import { handleAddToCart } from "../../serivces/transactionManager";
import { getRatings } from "../../utilities/common";
import { ElementError } from "./ElementError";

type ProductProps = {
	id: number;
	title: string;
	image: string;
	price: number;
	info: string;
	rateCount: number;
};

export const Product: React.FC<ProductProps> = ({
	id,
	title,
	image,
	price,
	info,
	rateCount,
}) => {
	const dispatch = useDispatch();
	const product = getProduct(useProduct(), id);
	const addedOnCart = useCart().find((item) => (item.id === id ? true : false));

	return product ? (
		<>
			<section className="product">
				<Link to={`/product/${id}`}>
					<div className="product__image">
						<img src={image} alt="product_image" />
					</div>
				</Link>
				<div className="product__details">
					<Link to={`/product/${id}`}>
						<h6 className="product__category">{info}</h6>
					</Link>
					<Link to={`/product/${id}`}>
						<h3 className="product__title">{title}</h3>
					</Link>
					<div className="product__shop">
						<div className="product__info">
							<div className="ratings">
								{getRatings(rateCount).map((item) => {
									return (
										<img
											key={item}
											src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
											alt="rating"
										/>
									);
								})}
							</div>
							<h3>{`BDT. ${price}`}</h3>
						</div>
						<BsFillCartPlusFill
							className={`${addedOnCart && "product-added"} product__cart`}
							onClick={() => {
								handleAddToCart(product, dispatch);
							}}
						/>
					</div>
				</div>
			</section>
		</>
	) : (
		<ElementError />
	);
};

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { getProduct } from "../../serivces/productManager";
import { handleAddToCart } from "../../serivces/transactionManager";
import { getRatings } from "../../utilities/common";
import { ElementError } from "../common/ElementError";

export const ProductDetails = () => {
	const { id } = useParams();
	const products = useProduct();
	const dispatch = useDispatch();
	const [displayedImage, setDisplayedImage] = useState(0);

	const productId = id ? parseInt(id) : 0;
	const product = getProduct(products, productId);
	const ratings = product ? getRatings(product.rateCount) : getRatings(0);

	return product ? (
		<main className="product-details">
			<div className="product-details__product">
				<div className="product-details__display">
					<img src={product.images[displayedImage]} alt="" />
				</div>
				<div className="product-details__images">
					{product.images.map((image, index) => {
						return (
							<div
								onClick={() => {
									setDisplayedImage(index);
								}}
								key={index}
								className="product-details__image">
								<img src={image} alt="" />
							</div>
						);
					})}
				</div>
			</div>
			<div className="product-details__details">
				<h2>{product.title}</h2>
				<h1 className="product-details__price">BDT. {product.price}</h1>
				<div className="product-details__form">
					<p>1</p>
					<button
						className="button"
						onClick={() => {
							handleAddToCart(product, dispatch);
						}}>
						Add To Cart
					</button>
				</div>
				<div className="product-details__info">
					<h2>Product Details</h2>
					<p>
						Brand: <span>{product.brand}</span>
					</p>
					<p>
						Info: <span>{product.info}</span>
					</p>
					<p>
						Category: <span>{product.category}</span>
					</p>
					<p>
						Type: <span>{product.type}</span>
					</p>
					<p>
						Connectivity: <span>{product.connectivity}</span>
					</p>
					<p>
						Quantity: <span>{product.quantity}</span>
					</p>
					<p>
						Ratings: <span>{product.ratings}</span>
					</p>
					<div className="ratings product-details__ratings">
						{ratings.map((item) => {
							return (
								<img
									key={item}
									src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
									alt="rating"
								/>
							);
						})}
					</div>
				</div>
			</div>
		</main>
	) : (
		<ElementError />
	);
};

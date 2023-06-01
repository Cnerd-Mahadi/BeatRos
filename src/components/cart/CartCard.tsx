import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { productType } from "../../data/products";
import { useProduct } from "../../hooks/useProduct";
import { getProduct } from "../../serivces/productManager";
import {
	handleAddToCart,
	handleReduceFromCart,
	handleRemoveFromCart,
} from "../../serivces/transactionManager";

type CartCardProps = {
	cartItem: productType[0];
};

export const CartCard: React.FC<CartCardProps> = ({ cartItem }) => {
	const cartProduct = cartItem;
	const storedProduct = getProduct(useProduct(), cartProduct.id);

	const dispatch = useDispatch();

	return (
		<section className="cart-card">
			<div className="cart-card__image">
				<img src={cartProduct.images[0]} alt="" />
			</div>
			<div className="cart-card__details">
				<h4>
					{cartProduct.title} {cartProduct.info}
				</h4>
				<p>BDT. {cartProduct.price}</p>
				<div className="cart-card__counter">
					<div
						className="counter-tab"
						onClick={() => {
							handleReduceFromCart(cartProduct, dispatch);
						}}>
						<FaMinus className="counter-minus" />
					</div>
					<div className="counter-tab">
						<p className="count-number">{cartProduct.quantity}</p>
					</div>
					<div
						className="counter-tab"
						onClick={() => {
							if (storedProduct) handleAddToCart(storedProduct, dispatch);
						}}>
						<FaPlus className="counter-plus" />
					</div>
				</div>
			</div>
			<FaTrash
				className="cart-card__trash"
				onClick={() => {
					handleRemoveFromCart(cartProduct, dispatch);
				}}
			/>
		</section>
	);
};

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CartCard } from "../components/cart/CartCard";
import { useCart } from "../hooks/useCart";
import { clearCart, totalPriceCount } from "../serivces/cartManager";

export const Cart = () => {
	const cart = useCart();
	const dispatch = useDispatch();

	return (
		<main className="container cart">
			<div className="cart__products">
				{cart.length ? (
					cart.map((item) => {
						return <CartCard key={item.id} cartItem={item} />;
					})
				) : (
					<div className="cart__empty">
						<h2>This cart is empty</h2>
						<Link to="/shop">
							<button className="button">Start shopping</button>
						</Link>
					</div>
				)}
			</div>
			<div className="cart__order-summary">
				<h1 className="cart__order-title">Order Summary</h1>
				<div className="cart__order-details">
					<p className="order-details__title">Price</p>
					<p className="order-details__details">BDT. {totalPriceCount(cart)}</p>
				</div>
				<div className="cart__order-details">
					<p className="order-details__title">Delivery</p>
					<p className="order-details__details">BDT. 60</p>
				</div>
				<hr />
				<div className="cart__order-total">
					<p className="order-total__title">Total Price</p>
					<p className="order-total__details">
						BDT. {totalPriceCount(cart) + 60}
					</p>
				</div>
				<button
					className="button"
					onClick={() => {
						clearCart(dispatch);
					}}>
					Checkout
				</button>
			</div>
		</main>
	);
};

import { CartCard } from "../components/cart/CartCard";

export const Cart = () => {
	return (
		<main className="container cart">
			<div className="cart__products">
				<CartCard />
				<CartCard />
				<CartCard />
			</div>
			<div className="cart__order-summary">
				<h1 className="cart__order-title">Order Summary</h1>
				<div className="cart__order-details">
					<p className="order-details__title">Price</p>
					<p className="order-details__details">BDT. 2,344</p>
				</div>
				<div className="cart__order-details">
					<p className="order-details__title">Delivery</p>
					<p className="order-details__details">Free</p>
				</div>
				<hr />
				<div className="cart__order-total">
					<p className="order-total__title">Total Price</p>
					<p className="order-total__details">BDT. 2,344</p>
				</div>
				<button className="button">Checkout</button>
			</div>
		</main>
	);
};

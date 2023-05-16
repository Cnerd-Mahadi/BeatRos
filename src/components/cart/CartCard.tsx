import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import image from "../../images/products/boat110-1.png";

export const CartCard = () => {
	return (
		<div className="cart-card">
			<div className="cart-card__image">
				<img src={image} alt="" />
			</div>
			<div className="cart-card__details">
				<h4>boAt Airdopes 131 Wireless In-Ear Earbuds</h4>
				<p>BDT. 1,099</p>
				<div className="cart-card__counter">
					<div className="counter-tab">
						<FaMinus className="counter-minus" />
					</div>
					<div className="counter-tab">
						<p className="count-number">4</p>
					</div>
					<div className="counter-tab">
						<FaPlus className="counter-plus" />
					</div>
				</div>
			</div>
			<FaTrash className="cart-card__trash" />
		</div>
	);
};

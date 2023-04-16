import { BsFillCartPlusFill } from "react-icons/bs";
import styles from "../scss/components/home/Product.module.scss";

export const Product = ({ title, image, price, type }) => {
	return (
		<>
			<section id={styles.product}>
				<div className={styles.image_container}>
					<img src={image} alt="product_image" />
				</div>
				<div className={styles.detail_container}>
					<h3 className={styles.category_text}>{type}</h3>
					<h3 className={styles.title_text}>{title}</h3>
					<div className={styles.buy_container}>
						<div className={styles.price_container}>
							<div className={styles.ratings}>
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
							<p>{`MRP. ${price}`}</p>
						</div>
						<BsFillCartPlusFill className={styles.cart} />
					</div>
				</div>
			</section>
		</>
	);
};

import styles from "../scss/components/home/FeaturedProduct.module.scss";

export const FeaturedProduct = ({ title, image, price }) => {
	return (
		<div id={styles.featured}>
			<p>{title}</p>
			<img src={image} alt="boAt Airdopes 203" />
			<h3>{`MRP. ${price}`}</h3>
		</div>
	);
};

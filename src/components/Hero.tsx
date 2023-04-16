import hero from "../images/products/sonyXb910n-1.png";
import styles from "../scss/components/home/Hero.module.scss";

export const Hero = () => {
	return (
		<>
			<div id={styles.hero_container}>
				<div className={styles.hero_image}>
					<img src={hero} alt="sony" />
				</div>
				<div className={styles.text_container}>
					<h3>Sony WH-XB910N</h3>
					<h1>Give your favorite music a boost</h1>
					<h3 className={styles.price}>MRP.12,000</h3>
					<button>Shop now</button>
				</div>
			</div>
		</>
	);
};

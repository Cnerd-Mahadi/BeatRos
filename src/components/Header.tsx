import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import styles from "../scss/components/Header.module.scss";

export const Header = () => {
	return (
		<div className={styles.nav_container}>
			<h3>
				<span>M</span>a<span>n</span>ia<span>c</span>
			</h3>
			<div className={styles.nav_links}>
				<a href="#">Home</a>
				<a href="#">Shop</a>
				<a href="#">Blog</a>
				<FaShoppingCart className={styles.nav_cart} />
				<FaUserAlt className={styles.nav_user} />
			</div>
		</div>
	);
};

{
	/* <FaSearch className={styles.action_item} />
				<FaUser className={styles.action_item} /> */
}

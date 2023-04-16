import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import styles from "../scss/components/Footer.module.scss";

export const Footer = () => {
	return (
		<section id={styles.footer}>
			<div className={styles.first_container}>
				<h3>
					<span>M</span>a<span>n</span>ia<span>c</span>
				</h3>
				<p>All rights reserved by Cnerd Mahadi.</p>
			</div>
			<div className={styles.second_container}>
				<div className={styles.help_container}>
					<p>Help</p>
					<div className={styles.links}>
						<a href="#">FAQ</a>
						<a href="#">Return Order</a>
						<a href="#">Cancel Order</a>
					</div>
				</div>
				<div className={styles.company_container}>
					<p>Company</p>
					<div className={styles.links}>
						<a href="#">About Us</a>
						<a href="#">Contact Us</a>
						<a href="#">Careers</a>
					</div>
				</div>
			</div>
			<div className={styles.third_container}>
				<div className={styles.socials}>
					<FaFacebook className={styles.action_item} />
					<FaTwitter className={styles.action_item} />
					<FaInstagram className={styles.action_item} />
					<FaLinkedin className={styles.action_item} />
				</div>
			</div>
		</section>
	);
};

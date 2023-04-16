import { FeaturedProduct } from "../components/FeaturedProduct";
import { Hero } from "../components/Hero";
import { Product } from "../components/Product";
import { Subscribe } from "../components/Subscribe";
import fti3 from "../images/products/boat110-1.png";
import fti2 from "../images/products/boat131-1.png";
import fti4 from "../images/products/boat255r-1.png";
import tpi6 from "../images/products/boat410-1.png";
import fti1 from "../images/products/boat518-1.png";
import fti5 from "../images/products/jbl200bt-1.png";
import tpi8 from "../images/products/sonyCh710n-1.png";
import tpi7 from "../images/products/sonyXb910n-1.png";
import styles from "../scss/pages/Home.module.scss";

export const Home = () => {
	return (
		<main id={styles.home}>
			<Hero />
			<section className={styles.featured}>
				<h3>Featured Products</h3>
				<div className={styles.featured_products}>
					<FeaturedProduct title="boAt Rockerz 518" image={fti1} price="1299" />
					<FeaturedProduct
						title="boAt Airdopes 131"
						image={fti2}
						price="1099"
					/>
					<FeaturedProduct
						title="boAt BassHeads 110"
						image={fti3}
						price="599"
					/>
					<FeaturedProduct title="boAt Rockerz 255" image={fti4} price="999" />
					<FeaturedProduct title="JBL Live 200BT" image={fti5} price="3650" />
				</div>
			</section>
			<div className={styles.top_products}>
				<h3>Top Products</h3>
				<div className={styles.top_nav}>
					<a href="">All</a>
					<a href="">Headphones</a>
					<a href="">Earbuds</a>
					<a href="">Earphones</a>
					<a href="">Neckbands</a>
				</div>
				<section className={styles.top_container}>
					<Product
						title="boAt Rockerz 518"
						image={fti1}
						price="1299"
						type="On-Ear Wireless Headphones"
					/>
					<Product title="JBL Live 200BT" image={fti5} price="3650" type="" />
					<Product
						title="boAt Rockerz 410"
						image={tpi6}
						price="1600"
						type="Bluetooth & Wired On-Ear Headphones"
					/>
					<Product
						title="Sony WH-CH710N"
						image={tpi8}
						price="8590"
						type="Wireless Over-Ear NC Headphones"
					/>
					<Product
						title="Sony WH-XB910N"
						image={tpi7}
						price="13499"
						type="Wireless Over-Ear Headphones"
					/>
					<Product
						title="boAt BassHeads 110"
						image={fti3}
						price="599"
						type="In-Ear Wired Earphones"
					/>
					<Product
						title="boAt Airdopes 131"
						image={fti2}
						price="1099"
						type="Wireless In-Ear Earbuds"
					/>
					<Product
						title="boAt Rockerz 255"
						image={fti4}
						price="999"
						type="In-Ear Wireless Neckbands"
					/>
				</section>
				<Subscribe />
			</div>
		</main>
	);
};

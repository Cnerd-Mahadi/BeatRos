import { FeaturedProduct } from "../components/home/FeaturedProducts";
import { Hero } from "../components/home/Hero";
import { Subscribe } from "../components/home/Subscribe";
import { TopProducts } from "../components/home/TopProducts";
import fti3 from "../images/products/boat110-1.png";
import fti2 from "../images/products/boat131-1.png";
import fti4 from "../images/products/boat255r-1.png";
import fti1 from "../images/products/boat518-1.png";
import fti5 from "../images/products/jbl200bt-1.png";

export const Home = () => {
	return (
		<main className="home">
			<Hero />

			<section className="container home__featured">
				<h2>Featured Products</h2>
				<div className="home__featured-products">
					<FeaturedProduct
						key={0}
						title="boAt Rockerz 518"
						image={fti1}
						price={1299}
					/>
					<FeaturedProduct
						key={1}
						title="boAt Airdopes 131"
						image={fti2}
						price={1099}
					/>
					<FeaturedProduct
						key={2}
						title="boAt BassHeads 110"
						image={fti3}
						price={599}
					/>
					<FeaturedProduct
						key={3}
						title="boAt Rockerz 255"
						image={fti4}
						price={999}
					/>
					<FeaturedProduct
						key={4}
						title="JBL Live 200BT"
						image={fti5}
						price={3650}
					/>
				</div>
			</section>

			<section className="container home__top-products">
				<h2>Top Products</h2>
				<div className="nav-items home__top-products-nav">
					<a href="">All</a>
					<a href="">Headphones</a>
					<a href="">Earbuds</a>
					<a href="">Earphones</a>
					<a href="">Neckbands</a>
				</div>
				<TopProducts />
			</section>

			<Subscribe />
		</main>
	);
};

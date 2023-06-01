import { useState } from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";
import { FeaturedProduct } from "../components/home/FeaturedProducts";
import { Hero } from "../components/home/Hero";
import { Subscribe } from "../components/home/Subscribe";
import { TopProducts } from "../components/home/TopProducts";
import { useProduct } from "../hooks/useProduct";
import {
	getFeaturedProducts,
	getHeroProducts,
	getProductsByCategory,
	getTopProducts,
} from "../serivces/productManager";
import { CATEGORIES } from "../utilities/common";

export const Home = () => {
	const products = useProduct();
	const [filteredProducts, setProducts] = useState(getTopProducts(products));
	const [activeLink, setActiveLink] = useState(CATEGORIES.ALL);

	return (
		<main className="home">
			<Swiper
				modules={[Pagination, Autoplay]}
				spaceBetween={50}
				slidesPerView={1}
				pagination={{ clickable: true }}
				loop={true}
				speed={1000}
				autoplay={{
					delay: 1200,
				}}>
				{getHeroProducts(products).map((product) => (
					<SwiperSlide key={product.id}>
						<Hero product={product} />
					</SwiperSlide>
				))}
			</Swiper>
			<section className="container home__featured">
				<h2>Featured Products</h2>
				<div className="home__featured-products">
					<Swiper
						modules={[Pagination, Autoplay]}
						spaceBetween={50}
						breakpoints={{
							1120: {
								slidesPerView: 5,
							},
							960: {
								slidesPerView: 3,
							},
							640: {
								slidesPerView: 2,
							},
							496: {
								slidesPerView: 1,
							},
						}}
						loop={true}
						autoplay={{
							delay: 1200,
							reverseDirection: true,
						}}
						speed={1000}>
						{getFeaturedProducts(products).map((item) => {
							return (
								<SwiperSlide key={item.id}>
									<FeaturedProduct
										id={item.id}
										title={item.title}
										image={item.images[0]}
										price={item.price}
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</section>
			<section className="container home__top-products">
				<h2>Top Products</h2>
				<div className="nav-items home__top-products-nav">
					<a
						className={`${
							activeLink === CATEGORIES.ALL ? "active" : "link--tag"
						}`}
						onClick={() => {
							setActiveLink(CATEGORIES.ALL);
							setProducts(products);
						}}>
						All
					</a>
					<a
						className={`${
							activeLink === CATEGORIES.HEADPHONES ? "active" : "link--tag"
						}`}
						onClick={() => {
							setActiveLink(CATEGORIES.HEADPHONES);
							setProducts(
								getProductsByCategory(products, CATEGORIES.HEADPHONES)
							);
						}}>
						Headphones
					</a>
					<a
						className={`${
							activeLink === CATEGORIES.EARBUDS ? "active" : "link--tag"
						}`}
						onClick={() => {
							setActiveLink(CATEGORIES.EARBUDS);
							setProducts(getProductsByCategory(products, CATEGORIES.EARBUDS));
						}}>
						Earbuds
					</a>
					<a
						className={`${
							activeLink === CATEGORIES.EARPHONES ? "active" : "link--tag"
						}`}
						onClick={() => {
							setActiveLink(CATEGORIES.EARPHONES);
							setProducts(
								getProductsByCategory(products, CATEGORIES.EARPHONES)
							);
						}}>
						Earphones
					</a>
					<a
						className={`${
							activeLink === CATEGORIES.NECKBANDS ? "active" : "link--tag"
						}`}
						onClick={() => {
							setActiveLink(CATEGORIES.NECKBANDS);
							setProducts(
								getProductsByCategory(products, CATEGORIES.NECKBANDS)
							);
						}}>
						Neckbands
					</a>
				</div>
				<TopProducts topProducts={filteredProducts} />
			</section>
			<Subscribe />
		</main>
	);
};

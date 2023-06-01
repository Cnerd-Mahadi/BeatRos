import { Link } from "react-router-dom";
import { useSwiper } from "swiper/react";
import { productType } from "../../data/products";

type HeroProps = {
	product: productType[0];
};

export const Hero = ({ product }: HeroProps) => {
	const swiper = useSwiper();

	return (
		<>
			<section
				className="container hero"
				onMouseEnter={() => swiper.autoplay.stop()}
				onMouseLeave={() => swiper.autoplay.start()}>
				<div className="hero__image">
					<img src={product.heroImage} alt="sony" />
				</div>
				<div className="hero__text">
					<h3>{product.title}</h3>
					<h1 className="hero__tag">
						Listen to your favourite <br /> music in style.
					</h1>
					<h4 className="hero__price">BDT. {product.price}</h4>
					<Link to={`/product/${product.id}`}>
						<button className="button">Shop now</button>
					</Link>
				</div>
			</section>
		</>
	);
};

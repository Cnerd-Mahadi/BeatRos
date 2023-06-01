import { Link } from "react-router-dom";
import { useSwiper } from "swiper/react";

type FeatureProps = {
	id: number;
	title: string;
	image: string;
	price: number;
};

export const FeaturedProduct: React.FC<FeatureProps> = ({
	id,
	title,
	image,
	price,
}) => {
	const swiper = useSwiper();

	return (
		<Link to={`/product/${id}`}>
			<div
				className="featured-product"
				onMouseEnter={() => swiper.autoplay.stop()}
				onMouseLeave={() => swiper.autoplay.start()}>
				<h5>{title}</h5>
				<img src={image} alt="featured images" />
				<h3>{`BDT. ${price}`}</h3>
			</div>
		</Link>
	);
};

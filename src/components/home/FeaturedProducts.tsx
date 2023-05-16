interface FeatureProps {
	title: string;
	image: string;
	price: number;
}

export const FeaturedProduct = ({ title, image, price }: FeatureProps) => {
	return (
		<div className="featured-product">
			<h5>{title}</h5>
			<img src={image} alt="boAt Airdopes 203" />
			<h3>{`BDT. ${price}`}</h3>
		</div>
	);
};

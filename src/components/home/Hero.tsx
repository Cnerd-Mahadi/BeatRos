import hero from "../../images/products/sonyXb910n-1.png";

export const Hero = () => {
	return (
		<>
			<section className="container hero">
				<div className="hero__image">
					<img src={hero} alt="sony" />
				</div>
				<div className="hero__text">
					<h3>Sony WH-XB910N</h3>
					<h1 className="hero__tag">
						Listen to your favourite <br /> music in style.
					</h1>
					<h4 className="hero__price">BDT. 12,000</h4>
					<button className="button">Shop now</button>
				</div>
			</section>
		</>
	);
};

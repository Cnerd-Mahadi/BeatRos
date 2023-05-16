export const Subscribe = () => {
	return (
		<>
			<section className="subscribe">
				<div className="subscribe__text">
					<h2>Subscribe To Our Daily Newsletter</h2>
					<h3>Get email about our latest and special offers.</h3>
				</div>
				<form action="#">
					<input
						className="input"
						type="text"
						placeholder="Type your email here.."
					/>
					<button className="button btn--subscribe">Submit</button>
				</form>
			</section>
		</>
	);
};

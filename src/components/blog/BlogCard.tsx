export const BlogCard = () => {
	return (
		<div className="blog-card">
			<img
				src="https://images.unsplash.com/photo-1595539657356-43465dd59ee8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=863&q=80"
				alt=""
			/>
			<div className="blog-card__info">
				<h5 className="blog-card__info-type">Business, Travel — </h5>
				<h5 className="blog-card__info-date">July 2, 2020</h5>
			</div>
			<h3>Your most unhappy customers are your greatest source of learning.</h3>
			<p className="blog-card__hook">
				Far far away, behind the word mountains, far from the countries Vokalia
				and Consonantia, there live the blind texts.
			</p>
			<div className="blog-card__author-image">
				<img
					src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
					alt=""
				/>
				<div className="blog-card__author-info">
					<h5>Sergy Campbell</h5>
					<p>CEO and Founder</p>
				</div>
			</div>
		</div>
	);
};

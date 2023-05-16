import image1 from "../../images/products/jbl660nc-1.png";
import image2 from "../../images/products/jbl660nc-2.png";
import image3 from "../../images/products/jbl660nc-3.png";
import image4 from "../../images/products/jbl660nc-4.png";

export const ProductDetails = () => {
	return (
		<main className="product-details">
			<div className="product-details__product">
				<div className="product-details__display">
					<img src={image1} alt="" />
				</div>
				<div className="product-details__images">
					<div className="product-details__image">
						<img src={image1} alt="" />
					</div>
					<div className="product-details__image">
						<img src={image2} alt="" />
					</div>
					<div className="product-details__image">
						<img src={image3} alt="" />
					</div>
					<div className="product-details__image">
						<img src={image4} alt="" />
					</div>
				</div>
			</div>
			<div className="product-details__details">
				<h2>JBL Live 660NC</h2>
				<h1 className="product-details__price">BDT. {9999}</h1>
				<form action="#">
					<input type="text" value={1} />
					<button className="button">Add To Cart</button>
				</form>
				<div className="product-details__info">
					<h2>Product Details</h2>
					<p>
						Brand: <span>JBL</span>
					</p>
					<p>
						Info: <span>Wireless Over-Ear NC Headphones</span>
					</p>
					<p>
						Category: <span>Headphones</span>
					</p>
					<p>
						Type: <span>Over Ear</span>
					</p>
					<p>
						Connectivity: <span>Wireless</span>
					</p>
					<p>
						Ratings: <span>1234</span>
					</p>
					<div className="ratings product-details__ratings">
						<img
							src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
							alt="rating"
						/>
						<img
							src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
							alt="rating"
						/>
						<img
							src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
							alt="rating"
						/>
						<img
							src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
							alt="rating"
						/>
						<img
							src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
							alt="rating"
						/>
					</div>
				</div>
			</div>
		</main>
	);
};

export const SideBar = () => {
	return (
		<div className="sidebar">
			<h3>Sort</h3>
			<hr />
			<div className="sidebar__sort">
				<p>Featured</p>
				<p>Top products</p>
				<p>Price(lowest to highest)</p>
				<p>Price(highest to lowest)</p>
				<div className="sidebar__price">
					<p>Price:</p>
					<input type="range" />
				</div>
			</div>
			<h3>Filter</h3>
			<hr />
			<div className="sidebar__filters">
				<div className="sidebar__brands">
					<h4>Brands</h4>
					<div className="sidebar__brand">
						<input type="checkbox" name="" id="" />
						<p>JBL</p>
					</div>
					<div className="sidebar__brand">
						<input type="checkbox" name="" id="" />
						<p>boAt</p>
					</div>
					<div className="sidebar__brand">
						<input type="checkbox" name="" id="" />
						<p>Sony</p>
					</div>
				</div>
				<div className="sidebar__categories">
					<h4>Category</h4>
					<div className="sidebar__category">
						<input type="checkbox" name="" id="" />
						<p>Headphone</p>
					</div>
					<div className="sidebar__category">
						<input type="checkbox" name="" id="" />
						<p>Earphone</p>
					</div>
					<div className="sidebar__category">
						<input type="checkbox" name="" id="" />
						<p>Earbuds</p>
					</div>
					<div className="sidebar__category">
						<input type="checkbox" name="" id="" />
						<p>Neckbands</p>
					</div>
				</div>
			</div>
		</div>
	);
};

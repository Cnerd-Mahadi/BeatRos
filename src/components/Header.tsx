import { FaBars, FaShoppingCart, FaUserAlt } from "react-icons/fa";

export const Header = () => {
	return (
		<nav className="header__nav">
			<h2 className="logo">
				beat-<span>Ros</span>
			</h2>
			<div className="nav-items header__nav-items">
				<a href="#">Home</a>
				<a href="#">Shop</a>
				<a href="#">Blog</a>
				<FaShoppingCart className="header__cart" />
				<FaUserAlt className="header__user" />
			</div>
			<FaBars className="header__bar-menu" />
		</nav>
	);
};

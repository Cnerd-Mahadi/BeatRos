import { useEffect } from "react";
import { FaBars, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { overlayAction } from "../store/overlaySlice";
import { RootState } from "../store/store";
import { BREAKPOINTS } from "../utilities/common";
import { DropDown } from "./home/DropDown";
import { NavMenuMobile } from "./home/NavMenuMobile";

export const Header = () => {
	const menu = useSelector((state: RootState) => state.overlay.menu);
	const userMenu = useSelector((state: RootState) => state.overlay.userMenu);
	const cart = useSelector((state: RootState) => state.cart);
	const dispatch = useDispatch();

	useEffect(() => {
		window.addEventListener("resize", () => {
			if (window.innerWidth > BREAKPOINTS.SMALL) {
				dispatch(overlayAction.menuOff());
			}
			if (window.innerWidth < BREAKPOINTS.SMALL) {
				dispatch(overlayAction.userMenuOff());
			}
			if (window.innerWidth > BREAKPOINTS.MEDIUM) {
				dispatch(overlayAction.filterMenuOff());
			}
		});
	}, [dispatch]);

	return (
		<>
			<section className="header__nav">
				<Link to="/">
					<h2 className="logo">
						Beat<span>Ros</span>
					</h2>
				</Link>
				<nav className="nav-items header__nav-items">
					<NavLink
						to="/home"
						className={({ isActive }) => (isActive ? "active" : "link--tag")}>
						Home
					</NavLink>
					<NavLink
						to="/shop"
						className={({ isActive }) => (isActive ? "active" : "link--tag")}>
						Shop
					</NavLink>
					<NavLink
						to="/blogs"
						className={({ isActive }) => (isActive ? "active" : "link--tag")}>
						Blog
					</NavLink>
					<NavLink
						to="/cart"
						className={({ isActive }) => (isActive ? "active" : "link--tag")}>
						<div className="header__cart">
							{cart.length > 0 && <h4>{cart.length}</h4>}
							<FaShoppingCart className={`header__cart-icon`} />
						</div>
					</NavLink>

					<FaUserAlt
						className="header__user"
						onClick={() => {
							userMenu
								? dispatch(overlayAction.userMenuOff())
								: dispatch(overlayAction.userMenuOn());
						}}
					/>
				</nav>
				<FaBars
					className="header__bar-menu"
					onClick={() => {
						menu
							? dispatch(overlayAction.menuOff())
							: dispatch(overlayAction.menuOn());
					}}
				/>
				<DropDown />
			</section>
			<NavMenuMobile />
		</>
	);
};

import { createBrowserRouter } from "react-router-dom";
import App from "../components/App";
import { RouteError } from "../components/common/RouteError";
import { SignIn } from "../components/form/SignIn";
import { SignUp } from "../components/form/SignUp";
import { ProductDetails } from "../components/home/ProductDetails";
import { BlogDetails } from "../pages/BlogDeatils";
import { Blogs } from "../pages/Blogs";
import { Cart } from "../pages/Cart";
import { Home } from "../pages/Home";
import { Shop } from "../pages/Shop";

export type RouterType = typeof Router;

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <RouteError />,
		children: [
			{
				index: true,
				element: <SignIn />,
			},
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/shop",
				element: <Shop />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/blogs",
				element: <Blogs />,
			},
			{
				path: "/blog-details/:id",
				element: <BlogDetails />,
			},
			{
				path: "/signin",
				element: <SignIn />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/product/:id",
				element: <ProductDetails />,
			},
		],
	},
]);

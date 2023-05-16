import { BlogDetails } from "../pages/BlogDeatils";
import { Blogs } from "../pages/Blogs";
import { Cart } from "../pages/Cart";
import { Home } from "../pages/Home";
import { Shop } from "../pages/Shop";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SignIn } from "./form/SignIn";
import { SignUp } from "./form/SignUp";
import { ProductDetails } from "./home/ProductDetails";

function App() {
	return (
		<section id="App">
			<Header />
			<Home />
			<ProductDetails />
			<Cart />
			<Shop />
			<Blogs />
			<BlogDetails />
			<SignUp />
			<SignIn />
			<Footer />
		</section>
	);
}

export default App;

import { Home } from "../pages/Home";
import "../scss/components/App.module.scss";
import styles from "../scss/components/App.module.scss";
import { Footer } from "./Footer";
import { Header } from "./Header";

function App() {
	return (
		<section id={styles.App}>
			<Header />
			<Home />
			<Footer />
		</section>
	);
}

export default App;

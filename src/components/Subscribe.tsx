import styles from "../scss/components/home/Subscribe.module.scss";

export const Subscribe = () => {
	return (
		<>
			<div className={styles.subscribe}>
				<div className={styles.text_container}>
					<h3>Subscribe To Our Daily Newsletter</h3>
					<h5>Get email about our latest and special offers.</h5>
				</div>
				<form action="#">
					<input type="text" placeholder="Type your email here.." />
					<button>Submit</button>
				</form>
			</div>
		</>
	);
};

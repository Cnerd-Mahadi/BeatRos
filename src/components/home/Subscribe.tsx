import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export const Subscribe = () => {
	type SubscribeFormDataType = {
		email: string;
	};

	const [submitted, setSubmitted] = useState(false);

	const subscribeResolver = Yup.object({
		email: Yup.string().required().email(),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SubscribeFormDataType>({
		resolver: yupResolver(subscribeResolver),
	});

	const onSubmit = (data: SubscribeFormDataType) => {
		console.log(data);
		setSubmitted(true);
		setTimeout(() => {
			setSubmitted(false);
		}, 2000);
	};

	return (
		<>
			<section className="subscribe">
				<div className="subscribe__text">
					<h2>Subscribe To Our Daily Newsletter</h2>
					<h3>Get email about our latest and special offers.</h3>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						className="input"
						{...register("email")}
						placeholder="Type your email here.."
					/>
					<button
						type="submit"
						className={`${submitted && "submitted"} button btn--subscribe`}>
						{submitted ? "Submitted" : "Submit"}
					</button>
				</form>
				{errors.email && <p className="error-text">{errors.email.message}</p>}
			</section>
		</>
	);
};

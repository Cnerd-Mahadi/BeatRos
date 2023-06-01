import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaShieldAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FormInput } from "./../common/FormInput";

const signUpResolver = Yup.object({
	username: Yup.string().required().min(3),
	email: Yup.string().required().email(),
	password: Yup.string().required().min(3),
	con_password: Yup.string()
		.required()
		.oneOf([Yup.ref("password")]),
	agreement: Yup.bool().isTrue(),
});

export type FormDataType = {
	username: string;
	email: string;
	password: string;
	con_password: string;
	remember: boolean;
	agreement: boolean;
};

export const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataType>({ resolver: yupResolver(signUpResolver) });
	const navigate = useNavigate();

	const onSubmit = (data: FormDataType) => {
		console.log(data);
		navigate("/signin");
	};

	return (
		<main className="container signup">
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Sign Up</h1>

				<FormInput label="username" register={register}>
					<FaUser
						className={`signin__icon ${errors.username && "icon-validation"}`}
					/>
				</FormInput>
				<FormInput label="email" register={register}>
					<FaEnvelope
						className={`signin__icon ${errors.email && "icon-validation"}`}
					/>
				</FormInput>
				<FormInput label="password" register={register}>
					<FaLock
						className={`signin__icon ${errors.password && "icon-validation"}`}
					/>
				</FormInput>
				<FormInput label="con_password" register={register}>
					<FaShieldAlt
						className={`signin__icon ${
							errors.con_password && "icon-validation"
						}`}
					/>
				</FormInput>

				<div className="signup__agreement">
					<input type="checkbox" {...register("agreement")} />
					<h5>I agree with all the Terms and Conditions</h5>
				</div>

				<input type="submit" value="SignUp" className="button" />
				<Link to="/signin" className="signup__small">
					I am already signed in
				</Link>
			</form>

			<div className="signup__sidebar">
				<img src="/images/signup.png" alt="" />
				<Link to="/signin">I am already signed in</Link>
			</div>
		</main>
	);
};

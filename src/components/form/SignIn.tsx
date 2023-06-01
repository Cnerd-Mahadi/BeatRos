import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
	FaFacebook,
	FaGoogle,
	FaLock,
	FaTwitter,
	FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FormInput } from "./../common/FormInput";
import { FormDataType } from "./SignUp";

export const SignIn = () => {
	const signInResolver = Yup.object({
		username: Yup.string().required("Hello").min(3),
		password: Yup.string().required().min(3),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormDataType>({
		resolver: yupResolver(signInResolver),
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("username")) {
			navigate("/home");
		}
	}, [navigate]);

	const onSubmit = (data: FormDataType) => {
		console.log(data);
		if (data.remember) {
			localStorage.setItem("username", data.username);
		}
		navigate("/home");
	};

	return (
		<main className="container signin">
			<div className="signin__info">
				<form onSubmit={handleSubmit(onSubmit)}>
					<h1>Sign In</h1>
					<FormInput label="username" register={register}>
						<FaUser
							className={`signin__icon ${errors.username && "icon-validation"}`}
						/>
					</FormInput>
					<FormInput label="password" register={register}>
						<FaLock
							className={`signin__icon ${errors.password && "icon-validation"}`}
						/>
					</FormInput>
					<div className="signin__agreement">
						<input type="checkbox" {...register("remember")} />
						<h5>Remember me</h5>
					</div>
					<button className="button" type="submit">
						SignIn
					</button>
				</form>

				<div className="signin__links">
					<h4>Or sign in with</h4>
					<FaFacebook className="signin__social" />
					<FaTwitter className="signin__social" />
					<FaGoogle className="signin__social" />
				</div>
				<Link to="/signup" className="signin__small">
					Create an account
				</Link>
			</div>

			<div className="signin__sidebar">
				<img src="/images/signin.png" alt="" />
				<Link to="/signup">Create an account</Link>
			</div>
		</main>
	);
};

import {
	FaFacebook,
	FaGoogle,
	FaLock,
	FaTwitter,
	FaUser,
} from "react-icons/fa";
import image from "../../images/signin.png";
import { FormInput } from "../common/FormInput";

export const SignIn = () => {
	return (
		<div className="container signin">
			<div className="signin__info">
				<form action="#">
					<h1>Sign In</h1>
					<FormInput type="text">
						<FaUser className="signin__icon" />
					</FormInput>
					<FormInput type="password">
						<FaLock className="signin__icon" />
					</FormInput>
					<div className="signin__agreement">
						<input type="checkbox" name="" id="" />
						<h5>Remember me</h5>
					</div>
					<input type="submit" value="SignIn" className="button" />
				</form>

				<div className="signin__links">
					<h4>Or sign in with</h4>
					<FaFacebook className="signin__social" />
					<FaTwitter className="signin__social" />
					<FaGoogle className="signin__social" />
				</div>
				<a className="signin__small">Create an account</a>
			</div>

			<div className="signin__sidebar">
				<img src={image} alt="" />
				<a>Create an account</a>
			</div>
		</div>
	);
};

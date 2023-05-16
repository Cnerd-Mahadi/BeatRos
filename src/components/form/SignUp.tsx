import { FaEnvelope, FaLock, FaShieldAlt, FaUser } from "react-icons/fa";
import image from "../../images/signup.png";
import { FormInput } from "../common/FormInput";

export const SignUp = () => {
	return (
		<div className="container signup">
			<form action="#">
				<h1>Sign Up</h1>

				<FormInput type="text">
					<FaUser className="signup__icon" />
				</FormInput>

				<FormInput type="text">
					<FaEnvelope className="signup__icon" />
				</FormInput>

				<FormInput type="password">
					<FaLock className="signup__icon" />
				</FormInput>

				<FormInput type="password">
					<FaShieldAlt className="signup__icon" />
				</FormInput>

				<div className="signup__agreement">
					<input type="checkbox" name="" id="" />
					<h5>I agree with all the Terms and Conditions</h5>
				</div>

				<input type="submit" value="SignUp" className="button" />
				<a className="signup__small">I am already signed in</a>
			</form>

			<div className="signup__sidebar">
				<img src={image} alt="" />
				<a>I am already signed in</a>
			</div>
		</div>
	);
};

import { Path, UseFormRegister } from "react-hook-form";
import { FormDataType } from "../form/SignUp";

interface Icon {
	label: Path<FormDataType>;
	register: UseFormRegister<FormDataType>;
	children: React.ReactNode;
}

export const FormInput = ({ label, register, children }: Icon) => {
	return (
		<div className="input--form">
			{children}
			<input {...register(label)} />
		</div>
	);
};

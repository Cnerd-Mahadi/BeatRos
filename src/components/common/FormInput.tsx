import { ReactNode } from "react";

interface Icon {
	children: ReactNode;
	type: string;
}

export const FormInput = ({ children, type }: Icon) => {
	return (
		<div className="input--form">
			{children}
			<input type={type} />
		</div>
	);
};

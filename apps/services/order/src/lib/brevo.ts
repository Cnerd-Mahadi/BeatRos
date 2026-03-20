import { _env } from "../env";
import { api } from "./axios";

export const sendEmail = async ({
	to,
	subject,
	html,
}: {
	to: string;
	subject: string;
	html: string;
}) => {
	return api.post(
		"https://api.brevo.com/v3/smtp/email",
		{
			sender: { name: "BeatRos", email: _env.MAIL_FROM },
			to: [{ email: to }],
			subject,
			htmlContent: html,
		},
		{
			headers: {
				"api-key": _env.BREVO_API_KEY,
				"Content-Type": "application/json",
			},
		},
	);
};

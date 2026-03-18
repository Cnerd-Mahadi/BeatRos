import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function attachAuthParams(params: {
	url: string;
	redirectUrl?: string | null;
	sessionId?: string | null;
}) {
	const { url, redirectUrl, sessionId } = params;
	let nextUrl = url;
	const searchParams = new URLSearchParams();
	if (redirectUrl || sessionId) {
		nextUrl = nextUrl + "?";
		if (redirectUrl) {
			let nextRedirectUrl = redirectUrl;
			if (!decodeURIComponent(redirectUrl)) {
				nextRedirectUrl = encodeURIComponent(nextRedirectUrl);
			}
			searchParams.append("redirect_url", nextRedirectUrl);
		}
		if (sessionId) {
			searchParams.append("session_id", sessionId);
		}

		nextUrl = nextUrl + searchParams.toString();
	}

	return nextUrl;
}

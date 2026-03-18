import { attachAuthParams } from "@/lib/utils";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const params = await searchParams;
	// Handle the redirect flow by calling the Clerk.handleRedirectCallback() method
	// or rendering the prebuilt <AuthenticateWithRedirectCallback/> component.
	const sessionId = params.session_id ? (params.session_id as string) : null;
	const redirectUrl = params.redirect_url
		? (params.redirect_url as string)
		: null;

	return (
		<>
			<AuthenticateWithRedirectCallback
				signInFallbackRedirectUrl={attachAuthParams({
					url: "/auth/callback",
					sessionId,
					redirectUrl,
				})}
				signUpFallbackRedirectUrl={attachAuthParams({
					url: "/auth/callback",
					sessionId,
					redirectUrl,
				})}
			/>

			{/* Required for sign-up flows
      Clerk's bot sign-up protection is enabled by default */}
			<div id="clerk-captcha" />
		</>
	);
}

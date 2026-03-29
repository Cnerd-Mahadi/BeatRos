import SignUp from "@/components/SignUp";
import { SESSION_COOKIE } from "@/lib/constant";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
	const sessionId = (await cookies()).get(SESSION_COOKIE);
	if (!sessionId || !sessionId.value) {
		throw new Error("No session id found");
	}

	return <SignUp sessionId={sessionId.value} />;
}

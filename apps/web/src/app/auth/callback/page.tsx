import { transferCart } from "@/services/cart";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CallbackAuthPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const sessionId = (await searchParams).session_id;
	const redirectUrl = (await searchParams).redirect_url;
	if (!sessionId) throw new Error("No session id found");

	const { isAuthenticated, getToken } = await auth();
	const token = await getToken();
	if (!isAuthenticated || !token) throw new Error("Not Authed");

	const cartTransferred = await transferCart(sessionId as string, token);

	if (!cartTransferred) {
		throw new Error("Cart not transferred");
	}

	redirect(`${redirectUrl ? decodeURIComponent(redirectUrl as string) : "/"}`);
}

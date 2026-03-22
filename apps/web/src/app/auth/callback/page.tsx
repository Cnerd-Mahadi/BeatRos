import { getServices } from "@/lib/services";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CallbackAuthPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const sessionId = (await searchParams).session_id;
	const redirectUrl = (await searchParams).redirect_url;
	if (!sessionId) throw new Error("No session id found");

	const { isAuthenticated } = await auth();
	if (!isAuthenticated) throw new Error("Not Authed");

	const { cart } = await getServices();
	const cartTransferred = await cart.transferCart(sessionId as string);

	if (!cartTransferred) {
		throw new Error("Cart not transferred");
	}

	redirect(`${redirectUrl ? decodeURIComponent(redirectUrl as string) : "/"}`);
}

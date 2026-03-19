import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/checkout(.*)"]);
const isAuthRoute = createRouteMatcher(["/auth(.*)"]);

export default clerkMiddleware(async (auth, request) => {
	if (isProtectedRoute(request)) {
		await auth.protect();
	}

	const { isAuthenticated } = await auth();
	const response = NextResponse.next();
	const ANONYMOUS_SESSION_ID_COOKIE = "X-ANONYMOUS-SESSION-ID";
	const sessionCookie = request.cookies.get(ANONYMOUS_SESSION_ID_COOKIE);

	if (isAuthenticated) {
		if (isAuthRoute(request)) {
			// TO DO
		}
		if (sessionCookie) {
			response.cookies.set(ANONYMOUS_SESSION_ID_COOKIE, "", {
				maxAge: 0,
			});
		}
		return response;
	}

	if (!sessionCookie) {
		const newValue = crypto.randomUUID();
		response.cookies.set(ANONYMOUS_SESSION_ID_COOKIE, newValue, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			maxAge: 60 * 60 * 24 * 7,
		});
	}

	return response;
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};

import { SESSION_COOKIE } from "@/lib/constant";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const sid = (await cookies()).get(SESSION_COOKIE)?.value ?? null;
	return NextResponse.json<{ sid: string | null }>({ sid });
}

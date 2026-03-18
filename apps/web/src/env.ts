import { z } from "zod";

const clientEnvSchema = z.object({
	NEXT_PUBLIC_API_URL: z.string().url(),
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
});

export const env = clientEnvSchema.parse({
	NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
		process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

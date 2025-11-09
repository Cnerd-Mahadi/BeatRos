import z from "zod";

export const createUserSchema = z.object({
	email: z.email(),
	clerkId: z.string(),
});

import type { Request, Response } from "express";
import { prisma } from "./db";
import { createUserSchema } from "./type";

export const syncUser = async (req: Request, res: Response) => {
	try {
		const parsedBody = createUserSchema.safeParse(req.body);
		if (!parsedBody.success) {
			return res.status(400).json({ error: parsedBody.error.message });
		}

		const { email, clerkId } = parsedBody.data;
		console.log("Body Parsed: ", parsedBody.data);

		const userCreated = await prisma.user.create({
			data: { email, clerkId },
		});
		console.log("New User: ", userCreated);
		return res.status(200).json({ user: userCreated });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

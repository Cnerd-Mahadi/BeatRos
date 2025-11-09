import { getAuth } from "@clerk/express";
import { STATUS } from "@shared/src/response";
import { NextFunction, Request, Response } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
	const { isAuthenticated, userId } = getAuth(req);
	if (!isAuthenticated) {
		return res.status(STATUS.UNAUTHORIZED).json({
			error: "User unauthorized",
		});
	}

	req.user = { id: userId };
	next();
};

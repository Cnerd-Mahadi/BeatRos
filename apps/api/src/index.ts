import { clerkMiddleware } from "@clerk/express";
import logger from "@shared/src/logger";
import { HttpError } from "@shared/src/response";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { _env } from "./env";
import router from "./routes";

dotenv.config();

const app = express();

app.use(clerkMiddleware());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
	res.json({ status: "🚀⚡️✨", timestamp: new Date().toISOString() });
});

app.get("/health", (_req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/v1", router);

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
	logger.error(err.message, err.stack);
	if (err instanceof HttpError) {
		res.status(err.status).json({ error: err.message });
	} else {
		res.status(500).json({
			error: "Internal server error",
			service: "api",
		});
	}
});

app.listen(_env.PORT, () => {
	logger.info(`Server running at http://localhost:${_env.PORT}`);
});

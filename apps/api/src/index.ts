import { clerkMiddleware } from "@clerk/express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { HttpError, logger } from "shared";
import { _env } from "./env";
import router from "./routes";

dotenv.config();

const app = express();

app.head("/ping", (_req, res) => {
	res.status(200).end();
});

app.use(cookieParser());
app.use(clerkMiddleware());
app.use(
	cors({
		origin: process.env.APP_URL || "http://localhost:3000",
		credentials: true,
	}),
);
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
	logger.error(err.message, { name: err.name, details: err.stack });
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

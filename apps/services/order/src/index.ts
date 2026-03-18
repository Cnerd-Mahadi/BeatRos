import logger from "@shared/src/logger";
import { HttpError } from "@shared/src/response";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { _env } from "./env";
import { orderRouter, webhookRouter, workerRouter } from "./route";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(
	"/api/webhook",
	express.raw({ type: "application/json" }),
	webhookRouter,
);

app.use(express.json());

app.get("/", (_req, res) => {
	res.json({ status: "🚀⚡️✨", timestamp: new Date().toISOString() });
});

app.get("/health", (_req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/order", orderRouter);
app.use("/api/worker", workerRouter);

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
	logger.error(err.message, { name: err.name, details: err.stack });
	if (err instanceof HttpError) {
		res.status(err.status).json({ error: err.message });
	} else {
		res.status(500).json({
			error: "Internal server error",
			service: "order",
		});
	}
});

app.listen(_env.PORT, () => {
	console.log(`Server running at http://localhost:${_env.PORT}`);
});

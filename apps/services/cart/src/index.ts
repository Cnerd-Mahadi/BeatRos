import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { logger, HttpError, httpLogger } from "shared";
import { _env } from "./env";
import { cartRouter } from "./route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.get("/", (_req, res) => {
	res.json({ status: "🚀⚡️✨", timestamp: new Date().toISOString() });
});

app.get("/health", (_req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.head("/ping", (_req, res) => {
	res.status(200).end();
});

app.use("/api/cart", cartRouter);

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
	logger.error(err.message, { name: err.name, details: err.stack });
	if (err instanceof HttpError) {
		res.status(err.status).json({ error: err.message });
	} else {
		res.status(500).json({
			error: "Internal server error",
			service: "cart",
		});
	}
});

app.listen(_env.PORT, () => {
	logger.info(`Cart service running at http://localhost:${_env.PORT}`);
});

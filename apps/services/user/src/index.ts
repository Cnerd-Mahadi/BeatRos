import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// define user routes

app.get("/", (_req, res) => {
	res.json({ status: "🚀⚡️✨", timestamp: new Date().toISOString() });
});

app.get("/health", (_req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
	console.error(err.message);
	// if (err instanceof HttpError) {
	// 	res.status(err.status).json({ error: err.message });
	// } else {
	// 	res.status(500).json({
	// 		success: false,
	// 		error: "Internal server error",
	// 		service: "api",
	// 	});
	// }
});

// app.listen(_env.PORT, () => {
// 	console.log(`Server running at http://localhost:${_env.PORT}`);
// });

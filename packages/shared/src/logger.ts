import type { Logform } from "winston";
import { createLogger, format, transports } from "winston";

const isDev = process.env.NODE_ENV !== "production";

const devFormat = format.combine(
	format.errors({ stack: true }),
	format.colorize(),
	format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	format.printf((info: Logform.TransformableInfo) => {
		const { timestamp, level, message, ...meta } = info;
		const extra = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : "";
		return `[[${timestamp}] ${level}: ${message}\n${extra}`;
	})
);

const prodFormat = format.combine(
	format.errors({ stack: true }),
	format.timestamp(),
	format.printf((info: Logform.TransformableInfo) => {
		const { timestamp, level, message, ...meta } = info;
		return JSON.stringify({
			timestamp,
			level,
			message,
			meta: Object.keys(meta).length ? meta : undefined,
		});
	})
);

const logger = createLogger({
	level: isDev ? "debug" : "info",
	format: isDev ? devFormat : prodFormat,
	transports: [new transports.Console()],
});

export default logger;

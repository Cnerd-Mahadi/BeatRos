import morgan from "morgan";

const service = process.env.SERVICE_NAME ?? "unknown";

export const httpLogger = morgan(`[${service}] :method :url :status - :response-time ms`);

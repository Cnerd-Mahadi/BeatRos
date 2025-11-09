import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import z from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const envSchema = z.object({
	PORT: z.number().default(4002),
	DATABASE_URL: z.string(),
	INVENTORY_SERVICE_URL: z.string(),
	CART_SERVICE_URL: z.string(),
	PRODUCT_SERVICE_URL: z.string(),
	STRIPE_SECRET_KEY: z.string(),
	WORKER_STOCK_RELEASE_URL: z.string(),
	WORKER_SEND_EMAIL_URL: z.string(),
	CHECKOUT_SUCCESS_URL: z.string(),
	CHECKOUT_FAILURE_URL: z.string(),
	QSTASH_TOKEN: z.string(),
	MAIL_PORT: z.number(),
	MAIL_HOST: z.string(),
	MAIL_USERNAME: z.string(),
	MAIL_PASSWORD: z.string(),
});

export const _env = envSchema.parse(process.env);

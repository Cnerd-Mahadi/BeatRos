import dotenv from "dotenv";
import path from "path";
import z from "zod";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const envSchema = z.object({
	PORT: z.coerce.number().default(4002),
	ORDER_DATABASE_URL: z.string(),
	INVENTORY_SERVICE_URL: z.string(),
	CART_SERVICE_URL: z.string(),
	PRODUCT_SERVICE_URL: z.string(),
	STRIPE_SECRET_KEY: z.string(),
	WORKER_STOCK_RELEASE_URL: z.string(),
	WORKER_SEND_EMAIL_URL: z.string(),
	CHECKOUT_SUCCESS_URL: z.string(),
	CHECKOUT_FAILURE_URL: z.string(),
	QSTASH_TOKEN: z.string(),
	BREVO_API_KEY: z.string(),
	MAIL_FROM: z.string().default("noreply@beatros.com"),
});

export const _env = envSchema.parse(process.env);

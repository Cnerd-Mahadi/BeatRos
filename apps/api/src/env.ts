import dotenv from "dotenv";
import path from "path";
import z from "zod";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const envSchema = z.object({
	PORT: z.coerce.number().default(8000),
	PRODUCT_SERVICE_URL: z.string(),
	INVENTORY_SERVICE_URL: z.string(),
	CART_SERVICE_URL: z.string(),
	ORDER_SERVICE_URL: z.string(),
	STRIPE_SECRET_KEY: z.string(),
	STRIPE_WEBHOOK_SECRET: z.string(),
});

export const _env = envSchema.parse(process.env);

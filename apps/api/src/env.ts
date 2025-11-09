import dotenv from "dotenv";
import z from "zod";

dotenv.config({ path: new URL("../.env", import.meta.url) });

const envSchema = z.object({
	PORT: z.number().default(8000),
	PRODUCT_SERVICE_URL: z.string(),
	INVENTORY_SERVICE_URL: z.string(),
	CART_SERVICE_URL: z.string(),
	ORDER_SERVICE_URL: z.string(),
});

export const _env = envSchema.parse(process.env);

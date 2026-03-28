import dotenv from "dotenv";
import path from "path";
import z from "zod";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const envSchema = z.object({
	PORT: z.coerce.number().default(4004),
	CART_DATABASE_URL: z.string().optional(),
	PRODUCT_SERVICE_URL: z.string(),
});

export const _env = envSchema.parse(process.env);

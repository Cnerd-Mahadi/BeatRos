import dotenv from "dotenv";
import path from "path";
import z from "zod";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const envSchema = z.object({
	PORT: z.number().default(4001),
	DATABASE_URL: z.string(),
	INVENTORY_SERVICE_URL: z.string(),
});

export const _env = envSchema.parse(process.env);

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import z from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const envSchema = z.object({
	PORT: z.number().default(4001),
	DATABASE_URL: z.string(),
	INVENTORY_SERVICE_URL: z.string(),
});

export const _env = envSchema.parse(process.env);

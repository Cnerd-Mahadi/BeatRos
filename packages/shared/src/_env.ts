import dotenv from "dotenv";
import path from "path";
import z from "zod";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const envSchema = z.object({
	UPSTASH_REDIS_REST_URL: z.string(),
	UPSTASH_REDIS_REST_TOKEN: z.string(),
});

export const _env = envSchema.parse(process.env);

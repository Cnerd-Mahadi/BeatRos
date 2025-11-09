import { Redis } from "@upstash/redis";
import { _env } from "./_env";

export const redis = new Redis({
	url: _env.UPSTASH_REDIS_REST_URL,
	token: _env.UPSTASH_REDIS_REST_TOKEN,
});

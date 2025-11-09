import { Client } from "@upstash/qstash";
import { _env } from "../env";

export const qstashClient = new Client({ token: _env.QSTASH_TOKEN });

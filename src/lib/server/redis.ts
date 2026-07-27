import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";
import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

export function getRedis(): Redis | null {
  if (dev) return null;

  const url = env.KV_REST_API_URL;
  const token = env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error("Upstash Redis credentials are missing");
  }

  redis ??= new Redis({
    url,
    token,
  });

  return redis;
}

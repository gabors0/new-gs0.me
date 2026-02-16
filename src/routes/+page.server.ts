import { KV_REST_API_URL, KV_REST_API_TOKEN } from "$env/static/private";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: KV_REST_API_URL || "",
  token: KV_REST_API_TOKEN || "",
});

export async function load() {
  // Increment the view counter atomically
  const views = await redis.incr("page_views");

  return {
    views,
  };
}

import { KV_REST_API_URL, KV_REST_API_TOKEN } from "$env/static/private";
import { Redis } from "@upstash/redis";
import { json } from "@sveltejs/kit";

const redis = new Redis({
  url: KV_REST_API_URL || "",
  token: KV_REST_API_TOKEN || "",
});

export async function GET() {
  const views = await redis.get<number>("page_views");
  return json({ views: views ?? 0 });
}

export async function POST() {
  const views = await redis.incr("page_views");
  return json({ views });
}
import { env } from "$env/dynamic/private";
import { getRedis } from "$lib/server/redis";
import { json, type RequestEvent } from "@sveltejs/kit";

const RATE_LIMIT_SECONDS = 120; // 2 min
const SALT = env.HASH_SALT;

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getVisitorId(ip: string, userAgent: string): Promise<string> {
  return hashString(`${SALT}:${ip}:${userAgent}`);
}

export async function GET() {
  const redis = getRedis();
  if (!redis) return json({ views: 0 });

  const views = await redis.get<number>("page_views");
  return json({ views: views ?? 0 });
}

export async function POST({ getClientAddress, request }: RequestEvent) {
  const redis = getRedis();
  if (!redis) return json({ views: 0, counted: false });

  const ip = getClientAddress();
  const userAgent = request.headers.get("user-agent") || "";
  const visitorId = await getVisitorId(ip, userAgent);
  const visitorKey = `visitor:${visitorId}`;

  const isNew = await redis.set(visitorKey, "1", {
    nx: true,
    ex: RATE_LIMIT_SECONDS,
  });

  if (!isNew) {
    const views = await redis.get<number>("page_views");
    return json({ views: views ?? 0, counted: false });
  }

  const views = await redis.incr("page_views");
  return json({ views, counted: true });
}

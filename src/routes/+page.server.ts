import { getRedis } from "$lib/server/redis";

export async function load() {
  const views = await getRedis()?.get<number>("page_views");

  return {
    views: views ?? 0,
  };
}

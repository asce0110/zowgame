import { getHoodNews } from "@/app/lib/hood-warfare-2-server";
import { getHoodStore } from "@/app/lib/hood-warfare-2-store-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const [news, store] = await Promise.all([getHoodNews(), getHoodStore()]);
  const status = news.state === "unavailable" && store.state === "unavailable" ? 503 : 200;
  return Response.json({ ...news, store }, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      ...(status === 503 ? { "Retry-After": "30" } : {}),
    },
  });
}

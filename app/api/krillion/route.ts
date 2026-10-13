import { getKrillionDaily } from "@/app/lib/krillion-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const payload = await getKrillionDaily();
  const status = payload.state === "unavailable" ? 503 : 200;
  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      ...(status === 503 ? { "Retry-After": "30" } : {}),
    },
  });
}

import { AION_2_APP_ID } from "@/app/data/aion-2-stats";
import { createAionStatsService } from "@/app/lib/aion-2-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const service = createAionStatsService({ appId: AION_2_APP_ID });

export async function GET() {
  const { payload, status } = await service.getStats();
  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      ...(status === 503 ? { "Retry-After": "30" } : {}),
    },
  });
}

import type { AionMetric, AionNewsItem, AionStatsResponse } from "../data/aion-2-stats";

const CACHE_TTL_MS = 10 * 60 * 1000;
const MAX_STALE_MS = 60 * 60 * 1000;
const RETRY_DELAY_MS = 30 * 1000;
const REQUEST_TIMEOUT_MS = 8000;

type Snapshot<T> = { value: T; observedAt: string; observedAtMs: number };
type SourceCache<T> = { snapshot?: Snapshot<T>; inFlight?: Promise<Snapshot<T>>; retryAt?: number };
type PeakReading = { value: number; sourceUpdatedAt: string };
type ServiceOptions = { appId: number; fetcher?: typeof fetch; now?: () => number };

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid Steam response");
  return value as Record<string, unknown>;
}

function count(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) throw new Error("Invalid Steam player count");
  return value;
}

function epochDate(value: unknown): string {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value <= 0) throw new Error("Invalid Steam timestamp");
  const date = new Date(value * 1000);
  if (!Number.isFinite(date.getTime())) throw new Error("Invalid Steam timestamp");
  return date.toISOString();
}

function plainText(value: string, limit: number): string {
  const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return value
    .replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (match, entity: string) => {
      if (!entity.startsWith("#")) return entities[entity.toLowerCase()] ?? match;
      const numeric = entity.slice(1);
      const code = numeric[0].toLowerCase() === "x" ? parseInt(numeric.slice(1), 16) : parseInt(numeric, 10);
      return Number.isInteger(code) && code > 0 && code <= 0x10ffff && (code < 0xd800 || code > 0xdfff) ? String.fromCodePoint(code) : " ";
    })
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\[(img|previewyoutube|video)\b[^\]]*\][\s\S]*?\[\/\1\]/gi, " ")
    .replace(/\[\/?[a-z][^\]]*\]/gi, " ")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function officialNewsUrl(value: unknown, appId: number, id: string): string | null {
  if (typeof value !== "string") return null;
  let url: URL;
  try { url = new URL(value); } catch { return null; }
  if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
  const externalPost = `/news/externalpost/steam_community_announcements/${id}`;
  // Steam's API uses its CDN alias. The identical official store path is a verified
  // redirect to the announcement; the API gid is not its final announcement ID.
  if (url.hostname === "steamstore-a.akamaihd.net" && url.pathname === externalPost && !url.search && !url.hash) {
    return `https://store.steampowered.com${externalPost}`;
  }
  if (url.hostname === "store.steampowered.com") {
    const isAnnouncement = new RegExp(`^/news/app/${appId}/view/\\d+/?$`).test(url.pathname);
    if (!isAnnouncement && url.pathname !== externalPost) return null;
  } else if (url.hostname === "steamcommunity.com") {
    if (!new RegExp(`^/(?:games|ogg)/${appId}/announcements/detail/\\d+/?$`).test(url.pathname)) return null;
  } else return null;
  url.search = "";
  url.hash = "";
  return url.href;
}

function parseNews(payload: unknown, appId: number): AionNewsItem[] {
  const appnews = record(record(payload).appnews);
  if (appnews.appid !== appId || !Array.isArray(appnews.newsitems)) throw new Error("Invalid Steam news feed");
  const items: AionNewsItem[] = [];
  const seen = new Set<string>();
  for (const raw of appnews.newsitems.slice(0, 100)) {
    try {
      const item = record(raw);
      if (item.appid !== appId || item.feedname !== "steam_community_announcements") continue;
      if (typeof item.gid !== "string" || !/^\d{1,30}$/.test(item.gid) || seen.has(item.gid)) continue;
      const url = officialNewsUrl(item.url, appId, item.gid);
      if (!url || typeof item.title !== "string" || typeof item.contents !== "string") continue;
      const title = plainText(item.title, 180);
      if (!title) continue;
      const date = epochDate(item.date);
      items.push({ id: item.gid, title, url, date, excerpt: plainText(item.contents, 150) });
      seen.add(item.gid);
    } catch { /* A malformed item must not hide other valid official announcements. */ }
  }
  if (appnews.newsitems.length && !items.length) throw new Error("No valid official Steam announcements");
  return items.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 6);
}

/** A warm process cache only: no historical sampling or cross-instance storage. */
export function createAionStatsService({ appId, fetcher = fetch, now = Date.now }: ServiceOptions) {
  if (!Number.isSafeInteger(appId) || appId <= 0) throw new Error("Invalid Steam app ID");
  const playersCache: SourceCache<number> = {};
  const peakCache: SourceCache<PeakReading> = {};
  const newsCache: SourceCache<AionNewsItem[]> = {};

  async function json(url: string): Promise<unknown> {
    const response = await fetcher(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Steam source unavailable");
    return response.json();
  }

  async function load<T>(cache: SourceCache<T>, loader: () => Promise<T>): Promise<Snapshot<T>> {
    const time = now();
    if (cache.snapshot && time - cache.snapshot.observedAtMs < CACHE_TTL_MS) return cache.snapshot;
    if (cache.inFlight) return cache.inFlight;
    if (cache.retryAt && time < cache.retryAt) throw new Error("Steam source retry pending");
    const request = (async () => {
      const value = await loader();
      const observedAtMs = now();
      const snapshot = { value, observedAtMs, observedAt: new Date(observedAtMs).toISOString() };
      cache.snapshot = snapshot;
      cache.retryAt = undefined;
      return snapshot;
    })();
    cache.inFlight = request;
    try { return await request; }
    catch (error) { cache.retryAt = now() + RETRY_DELAY_MS; throw error; }
    finally { cache.inFlight = undefined; }
  }

  function reading<T>(result: PromiseSettledResult<Snapshot<T>>, cache: SourceCache<T>, time: number) {
    if (result.status === "fulfilled") return { snapshot: result.value, state: "ready" as const };
    if (cache.snapshot && time - cache.snapshot.observedAtMs <= MAX_STALE_MS) return { snapshot: cache.snapshot, state: "stale" as const };
    return { snapshot: null, state: "unavailable" as const };
  }

  async function getStats(): Promise<{ payload: AionStatsResponse; status: 200 | 503 }> {
    const [playersResult, peakResult, newsResult] = await Promise.allSettled([
      load(playersCache, async () => {
        const response = record(record(await json(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`)).response);
        if (response.result !== 1) throw new Error("Steam current-player request failed");
        return count(response.player_count);
      }),
      load(peakCache, async () => {
        const response = record(record(await json("https://api.steampowered.com/ISteamChartsService/GetGamesByConcurrentPlayers/v1/")).response);
        if (!Array.isArray(response.ranks)) throw new Error("Invalid Steam chart");
        const target = response.ranks.find((item) => item && typeof item === "object" && item.appid === appId);
        if (!target) throw new Error("App absent from Steam chart");
        return { value: count(record(target).peak_in_game), sourceUpdatedAt: epochDate(response.last_update) };
      }),
      load(newsCache, async () => parseNews(await json(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${appId}&count=6&maxlength=150&feeds=steam_community_announcements`), appId)),
    ]);
    const time = now();
    const players = reading(playersResult, playersCache, time);
    const peak = reading(peakResult, peakCache, time);
    const news = reading(newsResult, newsCache, time);
    const currentPlayers: AionMetric = { value: players.snapshot?.value ?? null, observedAt: players.snapshot?.observedAt ?? null, state: players.state };
    const peakToday: AionMetric = { value: peak.snapshot?.value.value ?? null, observedAt: peak.snapshot?.observedAt ?? null, state: peak.state };
    if (peak.snapshot) peakToday.sourceUpdatedAt = peak.snapshot.value.sourceUpdatedAt;
    const payload: AionStatsResponse = {
      generatedAt: new Date(time).toISOString(),
      currentPlayers,
      peakToday,
      news: { items: news.snapshot?.value ?? [], observedAt: news.snapshot?.observedAt ?? null, state: news.state },
    };
    return { payload, status: players.state !== "unavailable" || news.state !== "unavailable" ? 200 : 503 };
  }

  return { getStats };
}

export type HoodNewsItem = { id: string; title: string; url: string; date: string; excerpt: string };
export type HoodNewsResponse = {
  state: "ready" | "stale" | "unavailable";
  items: HoodNewsItem[];
  observedAt: string | null;
  sourceUrl: string;
  message?: string;
};

const APP_ID = 5155360;
const SOURCE_URL = "https://steamcommunity.com/app/5155360/allnews/";
const NEWS_URL = "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=5155360&count=6&maxlength=300&feeds=steam_community_announcements";
const CACHE_TTL_MS = 10 * 60 * 1000;
const MAX_STALE_MS = 60 * 60 * 1000;
const RETRY_DELAY_MS = 30 * 1000;
const REQUEST_TIMEOUT_MS = 8000;

type Snapshot = { items: HoodNewsItem[]; observedAtMs: number; observedAt: string };
type ServiceOptions = { fetcher?: typeof fetch; now?: () => number };

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid Steam news response");
  return value as Record<string, unknown>;
}

function epochDate(value: unknown): string {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value <= 0) throw new Error("Invalid Steam news timestamp");
  const date = new Date(value * 1000);
  if (!Number.isFinite(date.getTime())) throw new Error("Invalid Steam news timestamp");
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
    .replace(/\[\/?[a-z][^\]]*\]/gi, "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function officialNewsUrl(value: unknown, id: string): string | null {
  if (typeof value !== "string") return null;
  let url: URL;
  try { url = new URL(value); } catch { return null; }
  if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
  const externalPost = `/news/externalpost/steam_community_announcements/${id}`;
  // Steam's API CDN and store serve the same announcement redirect. Preserve its
  // API gid; it is not the final announcement's /view/ or /detail/ identifier.
  if (url.hostname === "steamstore-a.akamaihd.net" && url.pathname === externalPost && !url.search && !url.hash) {
    return `https://store.steampowered.com${externalPost}`;
  }
  if (url.hostname === "store.steampowered.com") {
    if (!new RegExp(`^/news/app/${APP_ID}/view/\\d+/?$`).test(url.pathname) && url.pathname !== externalPost) return null;
  } else if (url.hostname === "steamcommunity.com") {
    if (!new RegExp(`^/(?:games|ogg)/${APP_ID}/announcements/detail/\\d+/?$`).test(url.pathname)) return null;
  } else return null;
  url.search = "";
  url.hash = "";
  return url.href;
}

function parseNews(payload: unknown): HoodNewsItem[] {
  const appnews = record(record(payload).appnews);
  if (appnews.appid !== APP_ID || !Array.isArray(appnews.newsitems)) throw new Error("Invalid Hood Warfare 2 news feed");
  const items: HoodNewsItem[] = [];
  const seen = new Set<string>();
  for (const raw of appnews.newsitems.slice(0, 100)) {
    try {
      const item = record(raw);
      if (item.appid !== APP_ID || item.feedname !== "steam_community_announcements") continue;
      if (typeof item.gid !== "string" || !/^\d{1,30}$/.test(item.gid) || seen.has(item.gid)) continue;
      const url = officialNewsUrl(item.url, item.gid);
      if (!url || typeof item.title !== "string" || typeof item.contents !== "string") continue;
      const title = plainText(item.title, 180);
      if (!title) continue;
      const date = epochDate(item.date);
      items.push({ id: item.gid, title, url, date, excerpt: plainText(item.contents, 300) });
      seen.add(item.gid);
    } catch { /* Keep valid official items when an individual item is malformed. */ }
  }
  if (appnews.newsitems.length && !items.length) throw new Error("No valid official Hood Warfare 2 announcements");
  return items.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 6);
}

function unavailable(): HoodNewsResponse {
  return {
    state: "unavailable", items: [], observedAt: null, sourceUrl: SOURCE_URL,
    message: "Official announcements could not be verified. Retry or open the Steam feed.",
  };
}

/** One public news feed and a warm-process cache; no player counts or archive. */
export function createHoodNewsService({ fetcher = fetch, now = Date.now }: ServiceOptions = {}) {
  let lastGood: Snapshot | undefined;
  let inFlight: Promise<Snapshot> | undefined;
  let retryAt = 0;

  function ageAt(snapshot: Snapshot, time: number): number {
    return time - snapshot.observedAtMs;
  }

  async function load(): Promise<Snapshot> {
    const time = now();
    if (lastGood && ageAt(lastGood, time) >= 0 && ageAt(lastGood, time) < CACHE_TTL_MS) return lastGood;
    if (inFlight) return inFlight;
    if (time < retryAt) throw new Error("Steam news retry pending");
    const request = (async () => {
      const response = await fetcher(NEWS_URL, {
        cache: "no-store", redirect: "error", headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error("Steam news source unavailable");
      const items = parseNews(await response.json());
      const observedAtMs = now();
      const snapshot = { items, observedAtMs, observedAt: new Date(observedAtMs).toISOString() };
      lastGood = snapshot;
      retryAt = 0;
      return snapshot;
    })();
    inFlight = request;
    try { return await request; }
    catch (error) { retryAt = now() + RETRY_DELAY_MS; throw error; }
    finally { inFlight = undefined; }
  }

  function reading(snapshot: Snapshot, state: "ready" | "stale"): HoodNewsResponse {
    return {
      state, items: snapshot.items.map((item) => ({ ...item })), observedAt: snapshot.observedAt, sourceUrl: SOURCE_URL,
      ...(state === "stale" ? { message: "Showing the last verified announcements. The latest check failed." } : {}),
    };
  }

  async function getHoodNews(): Promise<HoodNewsResponse> {
    try { return reading(await load(), "ready"); }
    catch {
      const time = now();
      return lastGood && ageAt(lastGood, time) >= 0 && ageAt(lastGood, time) <= MAX_STALE_MS ? reading(lastGood, "stale") : unavailable();
    }
  }

  return { getHoodNews };
}

const service = createHoodNewsService();

export async function getHoodNews(): Promise<HoodNewsResponse> {
  return service.getHoodNews();
}

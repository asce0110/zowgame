export type HoodStoreData = {
  name: string;
  isFree: boolean;
  price: { currency: "CNY"; initial: number; final: number; discountPercent: number } | null;
  platforms: { windows: boolean; mac: boolean; linux: boolean };
  supportedLanguages: string;
  releaseDate: string;
  comingSoon: boolean;
  pcRequirements: { minimum: string; recommended: string };
  developers: string[];
  publishers: string[];
};
export type HoodStoreResponse = {
  state: "ready" | "stale" | "unavailable";
  data: HoodStoreData | null;
  observedAt: string | null;
  sourceUrl: string;
  message?: string;
};

const APP_ID = 5155360;
const SOURCE_URL = "https://store.steampowered.com/app/5155360/Hood_Warfare_2/?cc=cn";
const STORE_API_URL = "https://store.steampowered.com/api/appdetails?appids=5155360&cc=cn&l=english";
const CACHE_TTL_MS = 10 * 60 * 1000;
const MAX_STALE_MS = 60 * 60 * 1000;
const RETRY_DELAY_MS = 30 * 1000;
const REQUEST_TIMEOUT_MS = 8000;

type Snapshot = { data: HoodStoreData; observedAtMs: number; observedAt: string };
type ServiceOptions = { fetcher?: typeof fetch; now?: () => number };

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid Steam store response");
  return value as Record<string, unknown>;
}

function booleanValue(value: unknown): boolean {
  if (typeof value !== "boolean") throw new Error("Invalid Steam store boolean");
  return value;
}

function integer(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) throw new Error("Invalid Steam price value");
  return value;
}

function plainText(value: string, limit: number): string {
  const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", copy: "©", reg: "®" };
  return value
    .replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp|ndash|mdash|copy|reg);/gi, (match, entity: string) => {
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

function optionalText(value: unknown, limit: number): string {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") throw new Error("Invalid Steam store text");
  return plainText(value, limit);
}

function textList(value: unknown): string[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) throw new Error("Invalid Steam store credits");
  return [...new Set(value.map((item) => plainText(item, 180)).filter(Boolean))].slice(0, 30);
}

function parsePrice(value: unknown): HoodStoreData["price"] {
  // Steam can omit price_overview for free, unavailable or unpriced products.
  if (value === undefined || value === null) return null;
  const price = record(value);
  if (price.currency !== "CNY") throw new Error("Steam price is not for the CN market");
  const initial = integer(price.initial);
  const final = integer(price.final);
  const discountPercent = integer(price.discount_percent);
  if (final > initial || discountPercent > 100) throw new Error("Invalid Steam discount values");
  return { currency: "CNY", initial, final, discountPercent };
}

function parseRequirements(value: unknown): HoodStoreData["pcRequirements"] {
  if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) return { minimum: "", recommended: "" };
  const requirements = record(value);
  return { minimum: optionalText(requirements.minimum, 6000), recommended: optionalText(requirements.recommended, 6000) };
}

function parseStore(payload: unknown): HoodStoreData {
  const envelope = record(record(payload)[String(APP_ID)]);
  if (envelope.success !== true) throw new Error("Steam store lookup failed");
  const source = record(envelope.data);
  if (source.steam_appid !== APP_ID) throw new Error("Wrong Steam app");
  if (typeof source.name !== "string") throw new Error("Missing Steam game name");
  const name = plainText(source.name, 200);
  if (!name) throw new Error("Missing Steam game name");
  const platforms = record(source.platforms);
  const release = record(source.release_date);
  return {
    name,
    isFree: booleanValue(source.is_free),
    price: parsePrice(source.price_overview),
    platforms: { windows: booleanValue(platforms.windows), mac: booleanValue(platforms.mac), linux: booleanValue(platforms.linux) },
    supportedLanguages: optionalText(source.supported_languages, 2000),
    releaseDate: optionalText(release.date, 200),
    comingSoon: booleanValue(release.coming_soon),
    pcRequirements: parseRequirements(source.pc_requirements),
    developers: textList(source.developers),
    publishers: textList(source.publishers),
  };
}

function unavailable(): HoodStoreResponse {
  return {
    state: "unavailable", data: null, observedAt: null, sourceUrl: SOURCE_URL,
    message: "Official store details could not be verified. Retry or open Steam directly.",
  };
}

/** A single CN store lookup and a process cache, without a price-history archive. */
export function createHoodStoreService({ fetcher = fetch, now = Date.now }: ServiceOptions = {}) {
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
    if (time < retryAt) throw new Error("Steam store retry pending");
    const request = (async () => {
      const response = await fetcher(STORE_API_URL, {
        cache: "no-store", redirect: "error", headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error("Steam store source unavailable");
      const data = parseStore(await response.json());
      const observedAtMs = now();
      const snapshot = { data, observedAtMs, observedAt: new Date(observedAtMs).toISOString() };
      lastGood = snapshot;
      retryAt = 0;
      return snapshot;
    })();
    inFlight = request;
    try { return await request; }
    catch (error) { retryAt = now() + RETRY_DELAY_MS; throw error; }
    finally { inFlight = undefined; }
  }

  function reading(snapshot: Snapshot, state: "ready" | "stale"): HoodStoreResponse {
    const data = snapshot.data;
    return {
      state,
      data: {
        ...data, price: data.price ? { ...data.price } : null, platforms: { ...data.platforms },
        pcRequirements: { ...data.pcRequirements }, developers: [...data.developers], publishers: [...data.publishers],
      },
      observedAt: snapshot.observedAt, sourceUrl: SOURCE_URL,
      ...(state === "stale" ? { message: "Showing the last verified store details. The latest check failed." } : {}),
    };
  }

  async function getHoodStore(): Promise<HoodStoreResponse> {
    try { return reading(await load(), "ready"); }
    catch {
      const time = now();
      return lastGood && ageAt(lastGood, time) >= 0 && ageAt(lastGood, time) <= MAX_STALE_MS ? reading(lastGood, "stale") : unavailable();
    }
  }

  return { getHoodStore };
}

const service = createHoodStoreService();

export async function getHoodStore(): Promise<HoodStoreResponse> {
  return service.getHoodStore();
}

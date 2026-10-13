export type KrillionDailyResponse = {
  state: "ready" | "stale" | "unavailable";
  date: string | null;
  dayNumber: number | null;
  resetsAt: string | null;
  prompts: { id: string; text: string }[];
  observedAt: string | null;
  sourceUrl: "https://krillion.io/";
  message?: string;
};

const SOURCE_URL = "https://krillion.io/";
const DAILY_URL = "https://krillion.io/api/today";
const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_STALE_MS = 60 * 60 * 1000;
const MAX_RESET_DISTANCE_MS = 30 * 60 * 60 * 1000;
const RETRY_DELAY_MS = 30 * 1000;
const REQUEST_TIMEOUT_MS = 8000;

type VerifiedDaily = { date: string; dayNumber: number; resetsAt: string; prompts: { id: string; text: string }[] };
type Snapshot = { payload: VerifiedDaily; observedAtMs: number; observedAt: string };
type ServiceOptions = { fetcher?: typeof fetch; now?: () => number };

const officialDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  calendar: "gregory",
  numberingSystem: "latn",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function officialDate(time: number): string {
  const parts = officialDateFormatter.formatToParts(new Date(time));
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid Krillion summary");
  return value as Record<string, unknown>;
}

function resetTimestamp(value: unknown, time: number): string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/.test(value)) {
    throw new Error("Invalid Krillion reset time");
  }
  const calendarDay = value.slice(0, 10);
  const calendarTime = Date.parse(`${calendarDay}T00:00:00Z`);
  if (!Number.isFinite(calendarTime) || new Date(calendarTime).toISOString().slice(0, 10) !== calendarDay) throw new Error("Invalid Krillion reset date");
  const resetAt = Date.parse(value);
  const distance = resetAt - time;
  if (!Number.isFinite(resetAt) || distance <= 0 || distance > MAX_RESET_DISTANCE_MS) throw new Error("Krillion reset is outside today's window");
  return new Date(resetAt).toISOString();
}

function validateDaily(value: unknown, time: number): VerifiedDaily {
  const payload = record(value);
  if (typeof payload.date !== "string" || payload.date !== officialDate(time)) throw new Error("Krillion summary is not for today");
  if (typeof payload.dayNumber !== "number" || !Number.isSafeInteger(payload.dayNumber) || payload.dayNumber < 0) throw new Error("Invalid Krillion day number");
  const resetsAt = resetTimestamp(payload.resetsAt, time);
  if (!Array.isArray(payload.prompts) || payload.prompts.length !== 7) throw new Error("Krillion must supply seven prompts");
  const ids = new Set<string>();
  const prompts = payload.prompts.map((raw) => {
    const prompt = record(raw);
    if (typeof prompt.id !== "string" || !/^[A-Za-z0-9_-]{1,32}$/.test(prompt.id) || ids.has(prompt.id)) throw new Error("Invalid Krillion prompt ID");
    if (typeof prompt.text !== "string" || Array.from(prompt.text).length > 240 || !prompt.text.trim()) throw new Error("Invalid Krillion prompt text");
    if (/[<>]|&(?:lt|gt|#0*60|#0*62|#x0*3c|#x0*3e);/i.test(prompt.text) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(prompt.text)) {
      throw new Error("Krillion prompts must contain plain text");
    }
    ids.add(prompt.id);
    return { id: prompt.id, text: prompt.text.replace(/\s+/g, " ").trim() };
  });
  return { date: payload.date, dayNumber: payload.dayNumber, resetsAt, prompts };
}

function unavailable(): KrillionDailyResponse {
  return {
    state: "unavailable", date: null, dayNumber: null, resetsAt: null, prompts: [], observedAt: null,
    sourceUrl: SOURCE_URL,
    message: "Today's prompts could not be verified. Retry or open Krillion directly.",
  };
}

/** Uses the public daily summary only. This process cache is not an archive. */
export function createKrillionDailyService({ fetcher = fetch, now = Date.now }: ServiceOptions = {}) {
  let lastGood: Snapshot | undefined;
  let inFlight: Promise<Snapshot> | undefined;
  let retryAt = 0;

  function isCurrent(snapshot: Snapshot, time: number, maximumAge: number): boolean {
    const age = time - snapshot.observedAtMs;
    return age >= 0 && age <= maximumAge && snapshot.payload.date === officialDate(time) && Date.parse(snapshot.payload.resetsAt) > time;
  }

  async function load(): Promise<Snapshot> {
    const time = now();
    if (lastGood && isCurrent(lastGood, time, CACHE_TTL_MS) && time - lastGood.observedAtMs < CACHE_TTL_MS) return lastGood;
    if (inFlight) return inFlight;
    if (time < retryAt) throw new Error("Krillion retry pending");
    const request = (async () => {
      const response = await fetcher(DAILY_URL, {
        cache: "no-store",
        redirect: "error",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error("Krillion summary unavailable");
      const body: unknown = await response.json();
      const observedAtMs = now();
      const payload = validateDaily(body, observedAtMs);
      const snapshot = { payload, observedAtMs, observedAt: new Date(observedAtMs).toISOString() };
      lastGood = snapshot;
      retryAt = 0;
      return snapshot;
    })();
    inFlight = request;
    try { return await request; }
    catch (error) { retryAt = now() + RETRY_DELAY_MS; throw error; }
    finally { inFlight = undefined; }
  }

  function reading(snapshot: Snapshot, state: "ready" | "stale"): KrillionDailyResponse {
    return {
      ...snapshot.payload,
      prompts: snapshot.payload.prompts.map((prompt) => ({ ...prompt })),
      state, observedAt: snapshot.observedAt, sourceUrl: SOURCE_URL,
      ...(state === "stale" ? { message: "Showing today's last verified prompts. The latest check failed." } : {}),
    };
  }

  async function getKrillionDaily(): Promise<KrillionDailyResponse> {
    try {
      const snapshot = await load();
      // A request or cache read can straddle the official midnight/reset boundary.
      return isCurrent(snapshot, now(), MAX_STALE_MS) ? reading(snapshot, "ready") : unavailable();
    } catch {
      return lastGood && isCurrent(lastGood, now(), MAX_STALE_MS) ? reading(lastGood, "stale") : unavailable();
    }
  }

  return { getKrillionDaily };
}

const service = createKrillionDailyService();

export async function getKrillionDaily(): Promise<KrillionDailyResponse> {
  return service.getKrillionDaily();
}

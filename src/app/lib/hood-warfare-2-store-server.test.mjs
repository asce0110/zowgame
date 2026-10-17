import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import { createHoodStoreService } from "./hood-warfare-2-store-server.ts";

const appId = 5155360;
const initialTime = Date.parse("2026-10-14T00:00:00Z");
const tenMinutes = 10 * 60 * 1000;
const hour = 60 * 60 * 1000;

function details(changes = {}) {
  return {
    steam_appid: appId, name: "Hood Warfare 2", is_free: false,
    price_overview: { currency: "CNY", initial: 2600, final: 2340, discount_percent: 10 },
    platforms: { windows: true, mac: false, linux: false },
    supported_languages: "English<strong>*</strong><br><strong>*</strong>languages with full audio support",
    release_date: { coming_soon: false, date: "8 Oct, 2026" },
    pc_requirements: { minimum: "<strong>Minimum:</strong> Windows 10", recommended: "<strong>Recommended:</strong> Windows 11" },
    developers: ["Trapstar Games"], publishers: ["Trapstar Games"],
    ...changes,
  };
}

const payload = (data) => ({ [appId]: { success: true, data } });

function harness() {
  let time = initialTime;
  let reply = payload(details());
  const calls = [];
  const service = createHoodStoreService({
    now: () => time,
    fetcher: async (input, options) => {
      calls.push({ url: new URL(String(input)), options });
      if (reply instanceof Error) throw reply;
      if (reply instanceof Response) return reply.clone();
      return Response.json(reply);
    },
  });
  return { service, calls, setTime: (value) => { time = value; }, setReply: (value) => { reply = value; } };
}

test("fetches the official CN store and emits only typed metadata with integer-cent CNY pricing", async () => {
  const h = harness();
  h.setReply(payload(details({ raw_extra: { owner_secret: "never echo arbitrary fields" } })));
  const result = await h.service.getHoodStore();
  assert.equal(result.state, "ready");
  assert.equal(result.observedAt, new Date(initialTime).toISOString());
  assert.equal(result.data.name, "Hood Warfare 2");
  assert.equal(result.data.isFree, false);
  assert.deepEqual(result.data.price, { currency: "CNY", initial: 2600, final: 2340, discountPercent: 10 });
  assert.deepEqual(result.data.platforms, { windows: true, mac: false, linux: false });
  assert.equal(result.data.releaseDate, "8 Oct, 2026");
  assert.equal(result.data.comingSoon, false);
  assert.equal("raw_extra" in result.data, false);
  assert.equal("steam_appid" in result.data, false);
  assert.equal(h.calls.length, 1);
  const { url, options } = h.calls[0];
  assert.equal(url.hostname, "store.steampowered.com");
  assert.equal(url.pathname, "/api/appdetails");
  assert.equal(url.searchParams.get("appids"), "5155360");
  assert.equal(url.searchParams.get("cc"), "cn");
  assert.equal(url.searchParams.get("l"), "english");
  assert.equal(options.cache, "no-store");
  assert.equal(options.redirect, "error");
  assert.ok(options.signal instanceof AbortSignal);
});

test("missing optional text and prices remain unknown while an explicitly free game stays free", async () => {
  const h = harness();
  const partial = details({ is_free: true });
  for (const key of ["price_overview", "supported_languages", "pc_requirements", "developers", "publishers"]) delete partial[key];
  delete partial.release_date.date;
  h.setReply(payload(partial));
  const result = await h.service.getHoodStore();
  assert.equal(result.state, "ready");
  assert.equal(result.data.isFree, true);
  assert.equal(result.data.price, null);
  assert.equal(result.data.supportedLanguages, "");
  assert.equal(result.data.releaseDate, "");
  assert.deepEqual(result.data.pcRequirements, { minimum: "", recommended: "" });
  assert.deepEqual(result.data.developers, []);
  assert.deepEqual(result.data.publishers, []);
  const nullPrice = harness();
  nullPrice.setReply(payload(details({ price_overview: null, pc_requirements: [], supported_languages: null, developers: null, publishers: null, release_date: { coming_soon: false, date: null } })));
  const nullResult = await nullPrice.service.getHoodStore();
  assert.equal(nullResult.state, "ready");
  assert.equal(nullResult.data.price, null);
  assert.deepEqual(nullResult.data.pcRequirements, { minimum: "", recommended: "" });
  assert.equal(nullResult.data.supportedLanguages, "");
  assert.equal(nullResult.data.releaseDate, "");
  assert.deepEqual(nullResult.data.developers, []);
});

test("coming-soon status and a non-calendar release description are preserved without inventing a date", async () => {
  const h = harness();
  h.setReply(payload(details({ release_date: { coming_soon: true, date: "<b>To be announced</b>" }, price_overview: null, pc_requirements: { minimum: "Windows", recommended: undefined } })));
  const result = await h.service.getHoodStore();
  assert.equal(result.state, "ready");
  assert.equal(result.data.comingSoon, true);
  assert.equal(result.data.releaseDate, "To be announced");
  assert.equal(result.data.pcRequirements.recommended, "");
  assert.equal(result.data.price, null);
});

test("cleans HTML, BBCode, entities and control characters from every metadata text field", async () => {
  const h = harness();
  h.setReply(payload(details({
    name: "&lt;script&gt;bad()&lt;/script&gt;Hood [b]Warfare[/b]\u00002",
    supported_languages: "<strong>English</strong> &amp; French\u0001",
    release_date: { coming_soon: false, date: "<i>8 Oct, 2026</i>\u007f" },
    pc_requirements: { minimum: "<script>bad()</script><ul><li>Windows 10</li><li>8 GB RAM</li></ul>", recommended: "[b]Windows 11[/b] &nbsp; 16 GB RAM" },
    developers: ["<b>Trapstar Games</b>"], publishers: ["Trapstar\u0003 Games"],
  })));
  const result = await h.service.getHoodStore();
  assert.equal(result.state, "ready");
  assert.equal(result.data.name, "Hood Warfare 2");
  assert.equal(result.data.supportedLanguages, "English & French");
  assert.equal(result.data.pcRequirements.minimum, "Windows 10 8 GB RAM");
  assert.equal(result.data.pcRequirements.recommended, "Windows 11 16 GB RAM");
  assert.deepEqual(result.data.developers, ["Trapstar Games"]);
  assert.deepEqual(result.data.publishers, ["Trapstar Games"]);
  assert.equal(/[<>\u0000-\u001f\u007f]/.test(JSON.stringify(result.data)), false);
});

test("rejects wrong app IDs, unsuccessful envelopes and missing required boolean semantics", async () => {
  for (const reply of [
    { 730: { success: true, data: details() } },
    { [appId]: { success: false, data: details() } },
    payload(details({ steam_appid: 730 })),
    payload(details({ steam_appid: "5155360" })),
    payload(details({ is_free: "false" })),
    payload(details({ platforms: { windows: true, mac: false } })),
    payload(details({ platforms: { windows: true, mac: "false", linux: false } })),
    payload(details({ release_date: { date: "8 Oct, 2026" } })),
    payload(details({ release_date: { coming_soon: "false", date: "8 Oct, 2026" } })),
    payload(details({ name: "<script>empty</script>" })),
  ]) {
    const h = harness();
    h.setReply(reply);
    const result = await h.service.getHoodStore();
    assert.equal(result.state, "unavailable");
    assert.equal(result.data, null);
    assert.equal(result.observedAt, null);
  }
});

test("invalid prices cannot be silently converted, rounded or published as CNY", async () => {
  for (const changes of [
    { currency: "USD" }, { initial: "2600" }, { final: -1 }, { initial: 2600.5 },
    { final: 3000 }, { initial: Number.MAX_SAFE_INTEGER + 1 },
    { discount_percent: -1 }, { discount_percent: 101 }, { discount_percent: 10.5 }, { discount_percent: "10" },
  ]) {
    const h = harness();
    h.setReply(payload(details({ price_overview: { currency: "CNY", initial: 2600, final: 2340, discount_percent: 10, ...changes } })));
    assert.equal((await h.service.getHoodStore()).state, "unavailable");
  }
  const emptyPrice = harness();
  emptyPrice.setReply(payload(details({ price_overview: {} })));
  assert.equal((await emptyPrice.service.getHoodStore()).data, null);
});

test("coalesces concurrent fetches, preserves cache time and prevents callers from mutating cached metadata", async () => {
  const h = harness();
  const [first, second] = await Promise.all([h.service.getHoodStore(), h.service.getHoodStore()]);
  assert.deepEqual(first, second);
  assert.equal(h.calls.length, 1);
  first.data.price.final = 1;
  first.data.platforms.windows = false;
  first.data.developers.push("Injected developer");
  h.setTime(initialTime + tenMinutes - 1);
  const cached = await h.service.getHoodStore();
  assert.equal(cached.data.price.final, 2340);
  assert.equal(cached.data.platforms.windows, true);
  assert.deepEqual(cached.data.developers, ["Trapstar Games"]);
  assert.equal(cached.observedAt, second.observedAt);
  assert.equal(h.calls.length, 1);
  h.setTime(initialTime + tenMinutes);
  assert.notEqual((await h.service.getHoodStore()).observedAt, second.observedAt);
  assert.equal(h.calls.length, 2);
});

test("failure backoff retains old values and time for one hour, then expires and permits recovery", async () => {
  const h = harness();
  const first = await h.service.getHoodStore();
  h.setTime(initialTime + tenMinutes + 1);
  h.setReply(new Error("offline"));
  const stale = await h.service.getHoodStore();
  assert.equal(stale.state, "stale");
  assert.deepEqual(stale.data, first.data);
  assert.equal(stale.observedAt, first.observedAt);
  await h.service.getHoodStore();
  assert.equal(h.calls.length, 2);
  h.setTime(initialTime + hour + 1);
  const expired = await h.service.getHoodStore();
  assert.equal(expired.state, "unavailable");
  assert.equal(expired.data, null);
  assert.equal(expired.observedAt, null);
  h.setReply(payload(details({ price_overview: { currency: "CNY", initial: 3000, final: 2700, discount_percent: 10 } })));
  h.setTime(initialTime + hour + 30001);
  const recovered = await h.service.getHoodStore();
  assert.equal(recovered.state, "ready");
  assert.equal(recovered.data.price.final, 2700);
  assert.equal(recovered.observedAt, new Date(initialTime + hour + 30001).toISOString());
});

test("HTTP, JSON and network errors return a complete unavailable response without exposing exception text", async () => {
  for (const reply of [new Response("offline", { status: 503 }), new Response("<html>Not JSON</html>"), new Error("private connection detail")]) {
    const h = harness();
    h.setReply(reply);
    const result = await h.service.getHoodStore();
    assert.equal(result.state, "unavailable");
    assert.equal(result.data, null);
    assert.equal(result.observedAt, null);
    assert.ok(result.sourceUrl.startsWith("https://store.steampowered.com/app/5155360/"));
    assert.equal(JSON.stringify(result).includes("private connection detail"), false);
  }
});

async function mockedRoute(news, store) {
  const dataUrl = (code) => `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  const routeSource = readFileSync(new URL("../../../app/api/hood-warfare-2/route.ts", import.meta.url), "utf8");
  const compiled = ts.transpileModule(routeSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  const newsModule = dataUrl(`export async function getHoodNews() { return ${JSON.stringify(news)}; }`);
  const storeModule = dataUrl(`export async function getHoodStore() { return ${JSON.stringify(store)}; }`);
  const injected = compiled
    .replace(/["']@\/app\/lib\/hood-warfare-2-server["']/g, JSON.stringify(newsModule))
    .replace(/["']@\/app\/lib\/hood-warfare-2-store-server["']/g, JSON.stringify(storeModule));
  return import(dataUrl(injected));
}

test("the real route preserves legacy news fields and returns 200 when either independent source works", async () => {
  for (const [newsState, storeState] of [["ready", "ready"], ["ready", "unavailable"], ["unavailable", "ready"], ["stale", "unavailable"], ["unavailable", "stale"], ["unavailable", "unavailable"]]) {
    const news = { state: newsState, items: [], observedAt: newsState === "unavailable" ? null : new Date(initialTime).toISOString(), sourceUrl: "https://steamcommunity.com/app/5155360/allnews/" };
    const store = { state: storeState, data: null, observedAt: storeState === "unavailable" ? null : new Date(initialTime).toISOString(), sourceUrl: "https://store.steampowered.com/app/5155360/" };
    const route = await mockedRoute(news, store);
    const response = await route.GET();
    assert.equal(response.status, newsState === "unavailable" && storeState === "unavailable" ? 503 : 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.match(response.headers.get("x-robots-tag"), /noindex/);
    const combined = await response.json();
    assert.deepEqual(combined.store, store);
    for (const key of Object.keys(news)) assert.deepEqual(combined[key], news[key]);
    if (response.status === 503) assert.equal(response.headers.get("retry-after"), "30");
  }
});

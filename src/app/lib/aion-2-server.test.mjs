import assert from "node:assert/strict";
import test from "node:test";
import { createAionStatsService } from "./aion-2-server.ts";

const appId = 3393110;
const initialTime = Date.parse("2026-10-12T12:00:00Z");
const tenMinutes = 10 * 60 * 1000;
const hour = 60 * 60 * 1000;

const announcement = (changes = {}) => ({
  gid: "1846018067937860",
  appid: appId,
  title: "Account Restrictions",
  contents: "Official announcement excerpt.",
  url: "https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1846018067937860",
  date: 1791698426,
  feedname: "steam_community_announcements",
  ...changes,
});

function harness() {
  let time = initialTime;
  let failure = false;
  let replies = {
    players: { response: { result: 1, player_count: 1200 } },
    charts: { response: { last_update: 1791806340, ranks: [{ appid: appId, peak_in_game: 1500 }] } },
    news: { appnews: { appid: appId, newsitems: [announcement()] } },
  };
  const calls = [];
  const service = createAionStatsService({
    appId,
    now: () => time,
    fetcher: async (input, options) => {
      const url = new URL(String(input));
      calls.push({ url, options });
      if (failure) throw new Error("Upstream offline");
      const key = url.pathname.includes("ISteamUserStats") ? "players" : url.pathname.includes("ISteamChartsService") ? "charts" : "news";
      const reply = replies[key];
      if (reply instanceof Error) throw reply;
      if (reply instanceof Response) return reply.clone();
      return Response.json(reply);
    },
  });
  return { service, calls, setTime: (value) => { time = value; }, fail: () => { failure = true; }, recover: () => { failure = false; }, set: (key, value) => { replies[key] = value; } };
}

test("independent official feeds preserve observation and source timestamps", async () => {
  const h = harness();
  const { status, payload } = await h.service.getStats();
  assert.equal(status, 200);
  assert.equal(payload.currentPlayers.value, 1200);
  assert.equal(payload.peakToday.value, 1500);
  assert.equal(payload.currentPlayers.observedAt, new Date(initialTime).toISOString());
  assert.equal(payload.peakToday.observedAt, new Date(initialTime).toISOString());
  assert.equal(payload.peakToday.sourceUpdatedAt, new Date(1791806340 * 1000).toISOString());
  assert.equal(payload.news.items[0].url, "https://store.steampowered.com/news/externalpost/steam_community_announcements/1846018067937860");
  const newsCall = h.calls.find(({ url }) => url.pathname.includes("ISteamNews"));
  assert.equal(newsCall.url.searchParams.get("feeds"), "steam_community_announcements");
  assert.equal(newsCall.url.searchParams.get("count"), "6");
  assert.equal(newsCall.url.searchParams.get("maxlength"), "150");
  assert.ok(h.calls.every(({ url, options }) => url.hostname === "api.steampowered.com" && options.cache === "no-store"));
});

test("cached and simultaneous readers do not refresh observation time or repeat upstream requests", async () => {
  const h = harness();
  const [first, second] = await Promise.all([h.service.getStats(), h.service.getStats()]);
  assert.equal(h.calls.length, 3);
  assert.deepEqual(first.payload, second.payload);
  h.setTime(initialTime + tenMinutes - 1);
  const cached = await h.service.getStats();
  assert.equal(h.calls.length, 3);
  assert.equal(cached.payload.currentPlayers.observedAt, first.payload.currentPlayers.observedAt);
  assert.notEqual(cached.payload.generatedAt, first.payload.generatedAt);
});

test("source failures keep old readings stale for at most one hour, then permit recovery", async () => {
  const h = harness();
  const first = await h.service.getStats();
  h.fail();
  h.setTime(initialTime + tenMinutes + 1);
  const stale = await h.service.getStats();
  assert.equal(stale.status, 200);
  assert.equal(stale.payload.currentPlayers.state, "stale");
  assert.equal(stale.payload.currentPlayers.observedAt, first.payload.currentPlayers.observedAt);
  assert.equal(stale.payload.currentPlayers.value, 1200);
  assert.equal(stale.payload.news.state, "stale");
  h.setTime(initialTime + hour + 1);
  const expired = await h.service.getStats();
  assert.equal(expired.status, 503);
  assert.deepEqual(expired.payload.currentPlayers, { value: null, observedAt: null, state: "unavailable" });
  assert.equal(expired.payload.peakToday.value, null);
  assert.deepEqual(expired.payload.news.items, []);
  h.recover();
  h.setTime(initialTime + hour + 60001);
  const recovered = await h.service.getStats();
  assert.equal(recovered.status, 200);
  assert.equal(recovered.payload.currentPlayers.state, "ready");
  assert.equal(recovered.payload.currentPlayers.observedAt, new Date(initialTime + hour + 60001).toISOString());
});

test("an absent chart app is unavailable while current players and news remain useful", async () => {
  const h = harness();
  h.set("charts", { response: { last_update: 1791806340, ranks: [{ appid: 730, peak_in_game: 300 }] } });
  const { status, payload } = await h.service.getStats();
  assert.equal(status, 200);
  assert.equal(payload.peakToday.state, "unavailable");
  assert.equal(payload.peakToday.value, null);
  assert.equal(payload.currentPlayers.state, "ready");
  assert.equal(payload.news.state, "ready");
});

test("one failed source retains its original timestamp while other sources refresh", async () => {
  const h = harness();
  const initial = await h.service.getStats();
  h.set("players", new Response("Unavailable", { status: 503 }));
  h.set("charts", { response: { last_update: 1791807000, ranks: [{ appid: appId, peak_in_game: 1600 }] } });
  h.setTime(initialTime + tenMinutes + 1);
  const partial = await h.service.getStats();
  assert.equal(partial.status, 200);
  assert.equal(partial.payload.currentPlayers.state, "stale");
  assert.equal(partial.payload.currentPlayers.observedAt, initial.payload.currentPlayers.observedAt);
  assert.equal(partial.payload.peakToday.state, "ready");
  assert.equal(partial.payload.peakToday.value, 1600);
  assert.notEqual(partial.payload.peakToday.observedAt, initial.payload.peakToday.observedAt);
  assert.notEqual(partial.payload.news.observedAt, initial.payload.news.observedAt);
  const callCount = h.calls.length;
  h.setTime(initialTime + tenMinutes + 1000);
  await h.service.getStats();
  assert.equal(h.calls.length, callCount);
  h.set("players", { response: { result: 1, player_count: 1300 } });
  h.setTime(initialTime + tenMinutes + 30001);
  const retry = await h.service.getStats();
  assert.equal(retry.payload.currentPlayers.state, "ready");
  assert.equal(retry.payload.currentPlayers.value, 1300);
  assert.equal(retry.payload.peakToday.observedAt, partial.payload.peakToday.observedAt);
  assert.equal(h.calls.length, callCount + 1);
});

test("malformed chart counts or source timestamps never become a published peak", async () => {
  for (const response of [
    { last_update: 1791806340, ranks: [{ appid: appId, peak_in_game: -10 }] },
    { last_update: 1791806340, ranks: [{ appid: appId, peak_in_game: 1.5 }] },
    { last_update: 1791806340, ranks: [{ appid: appId, peak_in_game: "1500" }] },
    { last_update: "1791806340", ranks: [{ appid: appId, peak_in_game: 1500 }] },
    { last_update: 0, ranks: [{ appid: appId, peak_in_game: 1500 }] },
    { last_update: 1791806340, ranks: null },
  ]) {
    const h = harness();
    h.set("charts", { response });
    const { payload } = await h.service.getStats();
    assert.equal(payload.peakToday.state, "unavailable");
    assert.equal(payload.peakToday.value, null);
    assert.equal(payload.peakToday.observedAt, null);
    assert.equal(payload.currentPlayers.state, "ready");
  }
});

test("only a successful safe integer player count can be displayed, including a real zero", async () => {
  for (const response of [{ result: 2, player_count: 0 }, { result: 1 }, { result: 1, player_count: -1 }, { result: 1, player_count: 1.5 }, { result: 1, player_count: "200" }, { result: 1, player_count: Number.MAX_SAFE_INTEGER + 1 }]) {
    const h = harness();
    h.set("players", { response });
    const { payload } = await h.service.getStats();
    assert.equal(payload.currentPlayers.state, "unavailable");
    assert.equal(payload.currentPlayers.value, null);
  }
  const h = harness();
  h.set("players", { response: { result: 1, player_count: 0 } });
  assert.equal((await h.service.getStats()).payload.currentPlayers.value, 0);
});

test("HTTP and invalid JSON failures return complete partial JSON instead of rejecting", async () => {
  const h = harness();
  h.set("players", new Response("Unavailable", { status: 502 }));
  h.set("news", new Response("<html>Not JSON</html>", { status: 200 }));
  const { status, payload } = await h.service.getStats();
  assert.equal(status, 503);
  assert.equal(payload.currentPlayers.state, "unavailable");
  assert.equal(payload.news.state, "unavailable");
  assert.equal(payload.peakToday.value, 1500);
  assert.equal(payload.peakToday.state, "ready");
});

test("news rejects external feeds, malicious URLs and wrong apps while producing plain text", async () => {
  const h = harness();
  const valid = announcement({ title: "[b]Update[/b] &amp; fixes", contents: "<script>alert(1)</script><p>Read <a href='https://example.com'>this</a> &amp; [b]check[/b] the patch.</p>" });
  const invalid = [
    { gid: "2", url: "https://steamcommunity.com.evil.example/ogg/3393110/announcements/detail/2" },
    { gid: "3", url: "https://evil@steamcommunity.com/ogg/3393110/announcements/detail/3" },
    { gid: "4", url: "javascript:alert(1)" },
    { gid: "5", url: "http://steamcommunity.com/ogg/3393110/announcements/detail/5" },
    { gid: "6", url: "https://steamstore-a.akamaihd.net/other/6" },
    { gid: "7", feedname: "pcgamer" },
    { gid: "8", appid: 730 },
    { gid: "9", url: "https://steamcommunity.com:8443/ogg/3393110/announcements/detail/9" },
    { gid: "10", url: "https://store.steampowered.com/news/app/730/view/10" },
  ].map((changes) => announcement(changes));
  h.set("news", { appnews: { appid: appId, newsitems: [valid, ...invalid] } });
  const { payload } = await h.service.getStats();
  assert.equal(payload.news.state, "ready");
  assert.equal(payload.news.items.length, 1);
  assert.equal(payload.news.items[0].title, "Update & fixes");
  assert.equal(payload.news.items[0].excerpt, "Read this & check the patch.");
  assert.equal(payload.news.items[0].date, new Date(1791698426 * 1000).toISOString());
});

test("a valid empty official news feed is distinct from an invalid or wrong-app payload", async () => {
  const h = harness();
  h.set("news", { appnews: { appid: appId, newsitems: [] } });
  const empty = await h.service.getStats();
  assert.equal(empty.payload.news.state, "ready");
  assert.deepEqual(empty.payload.news.items, []);
  for (const appnews of [{ appid: 730, newsitems: [] }, { appid: appId }, { appid: appId, newsitems: [announcement({ url: "https://example.com/" })] }]) {
    const invalid = harness();
    invalid.set("news", { appnews });
    assert.equal((await invalid.service.getStats()).payload.news.state, "unavailable");
  }
});

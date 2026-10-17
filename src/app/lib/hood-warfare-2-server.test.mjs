import assert from "node:assert/strict";
import test from "node:test";
import { createHoodNewsService } from "./hood-warfare-2-server.ts";

const appId = 5155360;
const initialTime = Date.parse("2026-10-14T00:00:00Z");
const tenMinutes = 10 * 60 * 1000;
const hour = 60 * 60 * 1000;

function announcement(changes = {}) {
  return {
    gid: "1001", appid: appId, feedname: "steam_community_announcements",
    title: "Test update", contents: "Official test announcement text.", date: 1791822955,
    url: "https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1001",
    ...changes,
  };
}

function harness() {
  let time = initialTime;
  let reply = { appnews: { appid: appId, newsitems: [announcement()] } };
  const calls = [];
  const service = createHoodNewsService({
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

test("requests only official Hood Warfare 2 news and emits safe ISO-dated items", async () => {
  const h = harness();
  const result = await h.service.getHoodNews();
  assert.equal(result.state, "ready");
  assert.equal(result.observedAt, new Date(initialTime).toISOString());
  assert.equal(result.sourceUrl, "https://steamcommunity.com/app/5155360/allnews/");
  assert.equal(result.items[0].id, "1001");
  assert.equal(result.items[0].date, new Date(1791822955 * 1000).toISOString());
  assert.equal(result.items[0].url, "https://store.steampowered.com/news/externalpost/steam_community_announcements/1001");
  assert.equal(h.calls.length, 1);
  const { url, options } = h.calls[0];
  assert.equal(url.hostname, "api.steampowered.com");
  assert.equal(url.pathname, "/ISteamNews/GetNewsForApp/v2/");
  assert.equal(url.searchParams.get("appid"), "5155360");
  assert.equal(url.searchParams.get("feeds"), "steam_community_announcements");
  assert.equal(url.searchParams.get("count"), "6");
  assert.equal(url.searchParams.get("maxlength"), "300");
  assert.equal(options.cache, "no-store");
  assert.equal(options.redirect, "error");
  assert.ok(options.signal instanceof AbortSignal);
});

test("concurrent readers share one request and cached readings retain their original observation", async () => {
  const h = harness();
  const [first, second] = await Promise.all([h.service.getHoodNews(), h.service.getHoodNews()]);
  assert.deepEqual(first, second);
  assert.equal(h.calls.length, 1);
  h.setTime(initialTime + tenMinutes - 1);
  assert.equal((await h.service.getHoodNews()).observedAt, first.observedAt);
  assert.equal(h.calls.length, 1);
  h.setTime(initialTime + tenMinutes);
  const fresh = await h.service.getHoodNews();
  assert.equal(h.calls.length, 2);
  assert.notEqual(fresh.observedAt, first.observedAt);
});

test("failed refreshes use the previous snapshot without changing its time, then expire and recover", async () => {
  const h = harness();
  const first = await h.service.getHoodNews();
  h.setReply(new Error("offline"));
  h.setTime(initialTime + tenMinutes + 1);
  const stale = await h.service.getHoodNews();
  assert.equal(stale.state, "stale");
  assert.equal(stale.observedAt, first.observedAt);
  assert.deepEqual(stale.items, first.items);
  await h.service.getHoodNews();
  assert.equal(h.calls.length, 2);
  h.setTime(initialTime + hour + 1);
  const expired = await h.service.getHoodNews();
  assert.equal(expired.state, "unavailable");
  assert.equal(expired.observedAt, null);
  assert.deepEqual(expired.items, []);
  h.setReply({ appnews: { appid: appId, newsitems: [announcement({ title: "Recovered test update" })] } });
  h.setTime(initialTime + hour + 30001);
  const recovered = await h.service.getHoodNews();
  assert.equal(recovered.state, "ready");
  assert.equal(recovered.items[0].title, "Recovered test update");
  assert.equal(recovered.observedAt, new Date(initialTime + hour + 30001).toISOString());
});

test("a wrong-app feed cannot populate or replace the verified Hood snapshot", async () => {
  const h = harness();
  h.setReply({ appnews: { appid: 3393110, newsitems: [announcement()] } });
  assert.equal((await h.service.getHoodNews()).state, "unavailable");
  const warm = harness();
  const first = await warm.service.getHoodNews();
  warm.setTime(initialTime + tenMinutes);
  warm.setReply({ appnews: { appid: 3393110, newsitems: [] } });
  const stale = await warm.service.getHoodNews();
  assert.equal(stale.state, "stale");
  assert.deepEqual(stale.items, first.items);
  assert.equal(stale.observedAt, first.observedAt);
});

test("filters malicious URLs, external feeds and wrong-app items while returning plain text", async () => {
  const h = harness();
  const good = announcement({ title: "[b]Test[/b] &amp; update", contents: "<script>alert(1)</script><p>Read <a href='https://example.com'>this</a> &amp; [b]check[/b] the patch.</p>" });
  const bad = [
    { gid: "2", url: "https://steamcommunity.com.evil.example/ogg/5155360/announcements/detail/2" },
    { gid: "3", url: "https://evil@steamcommunity.com/ogg/5155360/announcements/detail/3" },
    { gid: "4", url: "javascript:alert(1)" },
    { gid: "5", url: "http://steamcommunity.com/ogg/5155360/announcements/detail/5" },
    { gid: "6", url: "https://steamcommunity.com:8443/ogg/5155360/announcements/detail/6" },
    { gid: "7", url: "https://steamstore-a.akamaihd.net/other/7" },
    { gid: "8", url: "https://store.steampowered.com/news/app/730/view/8" },
    { gid: "9", feedname: "pcgamer" },
    { gid: "10", appid: 730 },
    { gid: "11", url: "https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/12" },
  ].map((changes) => announcement(changes));
  h.setReply({ appnews: { appid: appId, newsitems: [good, ...bad] } });
  const result = await h.service.getHoodNews();
  assert.equal(result.state, "ready");
  assert.equal(result.items.length, 1);
  assert.equal(result.items[0].title, "Test & update");
  assert.equal(result.items[0].excerpt, "Read this & check the patch.");
});

test("canonical Steam and SteamCommunity announcements remain usable without invented view IDs", async () => {
  for (const url of [
    "https://store.steampowered.com/news/app/5155360/view/689770861148769833?utm_source=test#comments",
    "https://steamcommunity.com/ogg/5155360/announcements/detail/689770861148769833",
    "https://steamcommunity.com/games/5155360/announcements/detail/689770861148769833",
    "https://store.steampowered.com/news/externalpost/steam_community_announcements/1001",
  ]) {
    const h = harness();
    h.setReply({ appnews: { appid: appId, newsitems: [announcement({ url })] } });
    const result = await h.service.getHoodNews();
    assert.equal(result.state, "ready");
    const resultUrl = new URL(result.items[0].url);
    assert.equal(resultUrl.search, "");
    assert.equal(resultUrl.hash, "");
    assert.ok(["store.steampowered.com", "steamcommunity.com"].includes(resultUrl.hostname));
  }
});

test("valid empty feeds are ready while malformed, wrong-app and fully rejected feeds are unavailable", async () => {
  const empty = harness();
  empty.setReply({ appnews: { appid: appId, newsitems: [] } });
  const result = await empty.service.getHoodNews();
  assert.equal(result.state, "ready");
  assert.deepEqual(result.items, []);
  assert.equal(result.observedAt, new Date(initialTime).toISOString());
  for (const reply of [null, { appnews: { appid: appId } }, { appnews: { appid: 730, newsitems: [] } }, { appnews: { appid: appId, newsitems: [announcement({ url: "https://example.com/" })] } }]) {
    const invalid = harness();
    invalid.setReply(reply);
    assert.equal((await invalid.service.getHoodNews()).state, "unavailable");
  }
});

test("invalid news identities and dates cannot be published", async () => {
  for (const changes of [
    { gid: "not-an-id" }, { gid: 1001 }, { gid: "1".repeat(31) },
    { date: 0 }, { date: -1 }, { date: "1791822955" }, { date: 1791822955.5 }, { date: Number.MAX_SAFE_INTEGER },
    { title: "<script>only script</script>" }, { contents: null },
  ]) {
    const h = harness();
    h.setReply({ appnews: { appid: appId, newsitems: [announcement(changes)] } });
    const result = await h.service.getHoodNews();
    assert.equal(result.state, "unavailable");
    assert.deepEqual(result.items, []);
  }
});

test("deduplicates and orders announcement IDs and bounds excerpt length", async () => {
  const h = harness();
  const items = Array.from({ length: 8 }, (_, index) => announcement({ gid: String(index + 1), date: 1791822955 + index, contents: "x".repeat(400), url: `https://store.steampowered.com/news/app/${appId}/view/${index + 100}` }));
  h.setReply({ appnews: { appid: appId, newsitems: [...items, items[0]] } });
  const result = await h.service.getHoodNews();
  assert.equal(result.items.length, 6);
  assert.equal(new Set(result.items.map((item) => item.id)).size, 6);
  assert.equal(result.items[0].id, "8");
  assert.ok(result.items.every((item) => item.excerpt.length === 300));
});

test("network, HTTP and JSON errors return a complete response without leaking internal exceptions", async () => {
  for (const reply of [new Error("private internal connection detail"), new Response("offline", { status: 502 }), new Response("<html>Not JSON</html>")]) {
    const h = harness();
    h.setReply(reply);
    const result = await h.service.getHoodNews();
    assert.equal(result.state, "unavailable");
    assert.equal(result.observedAt, null);
    assert.deepEqual(result.items, []);
    assert.equal(result.sourceUrl, "https://steamcommunity.com/app/5155360/allnews/");
    assert.ok(result.message);
    assert.equal(JSON.stringify(result).includes("private internal connection detail"), false);
  }
});

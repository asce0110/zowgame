import assert from "node:assert/strict";
import test from "node:test";
import { createKrillionDailyService } from "./krillion-server.ts";

const initialTime = Date.parse("2026-10-12T12:00:00.000Z");
const fiveMinutes = 5 * 60 * 1000;
const hour = 60 * 60 * 1000;

function daily(changes = {}) {
  return {
    date: "2026-10-12",
    dayNumber: 89,
    resetsAt: "2026-10-13T04:00:00.000Z",
    prompts: Array.from({ length: 7 }, (_, index) => ({ id: `p${index + 1}`, text: `Test prompt ${index + 1}?` })),
    ...changes,
  };
}

function harness({ time = initialTime, payload = daily() } = {}) {
  let clock = time;
  let reply = payload;
  const calls = [];
  const service = createKrillionDailyService({
    now: () => clock,
    fetcher: async (input, options) => {
      calls.push({ url: String(input), options });
      if (reply instanceof Error) throw reply;
      if (reply instanceof Response) return reply.clone();
      return Response.json(reply);
    },
  });
  return {
    service, calls,
    setTime: (value) => { clock = value; },
    setReply: (value) => { reply = value; },
  };
}

test("fetches only the official daily summary and returns seven whitelisted prompts", async () => {
  const payload = daily();
  payload.answers = ["never expose upstream extra fields"];
  payload.prompts[0].answer = "not a public prompt field";
  const h = harness({ payload });
  const result = await h.service.getKrillionDaily();
  assert.equal(result.state, "ready");
  assert.equal(result.sourceUrl, "https://krillion.io/");
  assert.equal(result.date, "2026-10-12");
  assert.equal(result.dayNumber, 89);
  assert.equal(result.resetsAt, "2026-10-13T04:00:00.000Z");
  assert.equal(result.observedAt, new Date(initialTime).toISOString());
  assert.equal(result.prompts.length, 7);
  assert.deepEqual(Object.keys(result.prompts[0]).sort(), ["id", "text"]);
  assert.equal("answers" in result, false);
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0].url, "https://krillion.io/api/today");
  assert.equal(h.calls[0].options.cache, "no-store");
  assert.equal(h.calls[0].options.redirect, "error");
  assert.ok(h.calls[0].options.signal instanceof AbortSignal);
});

test("coalesces simultaneous readers and preserves cached observation time", async () => {
  const h = harness();
  const [first, second] = await Promise.all([h.service.getKrillionDaily(), h.service.getKrillionDaily()]);
  assert.deepEqual(first, second);
  assert.equal(h.calls.length, 1);
  h.setTime(initialTime + fiveMinutes - 1);
  const cached = await h.service.getKrillionDaily();
  assert.equal(h.calls.length, 1);
  assert.equal(cached.observedAt, first.observedAt);
  h.setTime(initialTime + fiveMinutes);
  const refreshed = await h.service.getKrillionDaily();
  assert.equal(h.calls.length, 2);
  assert.notEqual(refreshed.observedAt, first.observedAt);
});

test("failure retains today's verified prompts for at most one hour and applies retry backoff", async () => {
  const h = harness();
  const first = await h.service.getKrillionDaily();
  h.setReply(new Error("upstream unavailable"));
  h.setTime(initialTime + fiveMinutes + 1);
  const stale = await h.service.getKrillionDaily();
  assert.equal(stale.state, "stale");
  assert.equal(stale.observedAt, first.observedAt);
  assert.deepEqual(stale.prompts, first.prompts);
  assert.ok(stale.message);
  await h.service.getKrillionDaily();
  assert.equal(h.calls.length, 2);
  h.setTime(initialTime + hour + 1);
  const unavailable = await h.service.getKrillionDaily();
  assert.equal(unavailable.state, "unavailable");
  assert.equal(unavailable.date, null);
  assert.equal(unavailable.dayNumber, null);
  assert.equal(unavailable.resetsAt, null);
  assert.equal(unavailable.observedAt, null);
  assert.deepEqual(unavailable.prompts, []);
  h.setReply(daily());
  h.setTime(initialTime + hour + 30001);
  assert.equal((await h.service.getKrillionDaily()).state, "ready");
});

test("a fresh cache cannot return yesterday's prompts after New York midnight", async () => {
  const h = harness({ time: Date.parse("2026-10-13T03:59:30Z") });
  assert.equal((await h.service.getKrillionDaily()).state, "ready");
  h.setReply(new Error("new daily summary not available"));
  h.setTime(Date.parse("2026-10-13T04:00:00Z"));
  const expired = await h.service.getKrillionDaily();
  assert.equal(h.calls.length, 2);
  assert.equal(expired.state, "unavailable");
  assert.equal(expired.date, null);
  assert.deepEqual(expired.prompts, []);
  h.setReply(daily({ date: "2026-10-13", dayNumber: 90, resetsAt: "2026-10-14T04:00:00Z" }));
  h.setTime(Date.parse("2026-10-13T04:00:30Z"));
  assert.equal((await h.service.getKrillionDaily()).date, "2026-10-13");
});

test("UTC midnight does not change the official New York puzzle date", async () => {
  const time = Date.parse("2026-10-13T00:10:00Z");
  const correct = harness({ time });
  assert.equal((await correct.service.getKrillionDaily()).state, "ready");
  const wrongDate = harness({ time, payload: daily({ date: "2026-10-13" }) });
  assert.equal((await wrongDate.service.getKrillionDaily()).state, "unavailable");
});

test("an upstream request crossing official midnight cannot validate yesterday's summary", async () => {
  let time = Date.parse("2026-10-13T03:59:59Z");
  const service = createKrillionDailyService({
    now: () => time,
    fetcher: async () => {
      time = Date.parse("2026-10-13T04:00:00Z");
      return Response.json(daily());
    },
  });
  const result = await service.getKrillionDaily();
  assert.equal(result.state, "unavailable");
  assert.deepEqual(result.prompts, []);
  assert.equal(result.observedAt, null);
});

test("New York daylight saving transitions accept 23- and 25-hour countdowns and winter midnight", async () => {
  for (const fixture of [
    { time: "2026-03-08T05:00:00Z", date: "2026-03-08", resetsAt: "2026-03-09T04:00:00Z", hours: 23 },
    { time: "2026-11-01T04:00:00Z", date: "2026-11-01", resetsAt: "2026-11-02T05:00:00Z", hours: 25 },
    { time: "2026-01-10T05:00:00Z", date: "2026-01-10", resetsAt: "2026-01-11T05:00:00Z", hours: 24 },
  ]) {
    const time = Date.parse(fixture.time);
    const h = harness({ time, payload: daily({ date: fixture.date, resetsAt: fixture.resetsAt }) });
    const result = await h.service.getKrillionDaily();
    assert.equal(result.state, "ready");
    assert.equal((Date.parse(result.resetsAt) - time) / hour, fixture.hours);
  }
  const winter = harness({ time: Date.parse("2026-01-11T04:59:30Z"), payload: daily({ date: "2026-01-10", resetsAt: "2026-01-11T05:00:00Z" }) });
  assert.equal((await winter.service.getKrillionDaily()).state, "ready");
  winter.setTime(Date.parse("2026-01-11T05:00:00Z"));
  assert.equal((await winter.service.getKrillionDaily()).state, "unavailable");
});

test("an expired upstream reset invalidates the cache even if its date is still today", async () => {
  const h = harness({ payload: daily({ resetsAt: "2026-10-12T12:01:00Z" }) });
  assert.equal((await h.service.getKrillionDaily()).state, "ready");
  h.setTime(initialTime + 60000);
  h.setReply(new Error("upstream offline"));
  assert.equal((await h.service.getKrillionDaily()).state, "unavailable");
});

test("rejects malformed, unsafe or off-date upstream summaries without echoing their contents", async () => {
  const invalid = [
    null,
    [],
    daily({ date: "2026-10-11" }),
    daily({ date: "2026-02-31" }),
    daily({ dayNumber: "89" }),
    daily({ dayNumber: -1 }),
    daily({ dayNumber: 89.5 }),
    daily({ dayNumber: Number.MAX_SAFE_INTEGER + 1 }),
    daily({ resetsAt: "not a date" }),
    daily({ resetsAt: "2026-10-12T12:00:00Z" }),
    daily({ resetsAt: new Date(initialTime + 30 * hour + 1).toISOString() }),
    daily({ prompts: daily().prompts.slice(1) }),
    daily({ prompts: [...daily().prompts, { id: "p8", text: "An extra prompt" }] }),
    daily({ prompts: [...daily().prompts.slice(0, 6), daily().prompts[0]] }),
  ];
  for (const prompt of [
    { id: "", text: "Prompt" },
    { id: "a".repeat(33), text: "Prompt" },
    { id: "bad id", text: "Prompt" },
    { id: "p1", text: "" },
    { id: "p1", text: "a".repeat(241) },
    { id: "p1", text: "<img src=x onerror=alert(1)>" },
    { id: "p1", text: "&lt;script&gt;alert(1)&lt;/script&gt;" },
    { id: "p1", text: "A\u0000prompt" },
    { id: "p1", text: 42 },
  ]) invalid.push(daily({ prompts: [prompt, ...daily().prompts.slice(1)] }));
  for (const payload of invalid) {
    const h = harness({ payload });
    const result = await h.service.getKrillionDaily();
    assert.equal(result.state, "unavailable");
    assert.deepEqual(result.prompts, []);
    assert.equal(result.sourceUrl, "https://krillion.io/");
    assert.ok(result.message);
  }
});

test("HTTP, parsing and network failures return a complete unavailable response", async () => {
  for (const reply of [new Response("offline", { status: 503 }), new Response("<html>Not JSON</html>"), new Error("private internal failure")]) {
    const h = harness();
    h.setReply(reply);
    const result = await h.service.getKrillionDaily();
    assert.equal(result.state, "unavailable");
    assert.equal(result.observedAt, null);
    assert.deepEqual(result.prompts, []);
    assert.equal(JSON.stringify(result).includes("private internal failure"), false);
  }
});

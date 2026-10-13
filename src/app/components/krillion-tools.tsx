"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, RefreshCw, Search } from "lucide-react";
import { krillionScoreTiers, krillionSources } from "../data/krillion";
import type { KrillionDailyResponse } from "../lib/krillion-server";

export function KrillionScoreCalculator() {
  const [ready, setReady] = useState(false);
  const [picks, setPicks] = useState<number[]>(Array(7).fill(0));
  useEffect(() => setReady(true), []);
  const score = picks.reduce((total, value) => total + value, 0);
  return <section id="score" className="kr-score kr-section" aria-labelledby="kr-score-title">
    <div className="kr-section-intro"><p className="ed-eyebrow">03 / THE DEPTH DESK</p><h2 id="kr-score-title">Seven answers.<br /><span>One depth.</span></h2><p>Choose the tier shown for each of your seven answers. See how one stronger pick changes your total.</p><p className="kr-note">A calculator for your results. It does not judge an answer or submit a score to Krillion.</p></div>
    <div className="kr-calculator"><fieldset disabled={!ready}><legend>Your seven answer tiers</legend><div className="kr-score-picks">{picks.map((value, index) => <label key={index} htmlFor={`kr-pick-${index}`}><span>ANSWER {String(index + 1).padStart(2, "0")}</span><select id={`kr-pick-${index}`} value={value} onChange={(event) => setPicks((previous) => previous.map((pick, position) => position === index ? Number(event.target.value) : pick))}>{krillionScoreTiers.map((tier) => <option key={tier.points} value={tier.points}>{tier.label} · {tier.points} pt</option>)}</select></label>)}</div></fieldset><div className="kr-depth-result"><div role="status" aria-live="polite" aria-atomic="true"><span className="ed-eyebrow">YOUR CALCULATED DEPTH</span><strong>{(score * 10).toLocaleString("en-US")}<small>m</small></strong><p>{score} / 700 points</p></div><button type="button" className="ed-text-link" disabled={!ready || score === 0} onClick={() => setPicks(Array(7).fill(0))}>Reset picks<RefreshCw size={16} aria-hidden="true" /></button></div><progress aria-label="Calculated depth towards 7,000 metres" value={score} max={700} /><p className="kr-note">1 point = 10 metres · Seven 100-point answers = 7,000 metres.</p><noscript><p className="kr-notice">The interactive calculator needs JavaScript. Add your seven scores and multiply the total by 10 for your depth.</p></noscript></div>
  </section>;
}

function isDailyResponse(value: unknown): value is KrillionDailyResponse {
  if (!value || typeof value !== "object") return false;
  const data = value as KrillionDailyResponse;
  if (!["ready", "stale", "unavailable"].includes(data.state) || !Array.isArray(data.prompts)) return false;
  if (data.state === "unavailable") return true;
  return typeof data.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(data.date)
    && typeof data.resetsAt === "string" && Number.isFinite(Date.parse(data.resetsAt))
    && typeof data.observedAt === "string" && Number.isFinite(Date.parse(data.observedAt))
    && typeof data.dayNumber === "number" && Number.isSafeInteger(data.dayNumber) && data.dayNumber >= 0
    && data.prompts.length === 7 && new Set(data.prompts.map((prompt) => prompt?.id)).size === 7
    && data.prompts.every((prompt) => prompt && typeof prompt.id === "string" && /^[A-Za-z0-9_-]{1,32}$/.test(prompt.id)
      && typeof prompt.text === "string" && prompt.text.trim().length > 0 && prompt.text.length <= 480);
}

export function KrillionDailyBrief() {
  const [data, setData] = useState<KrillionDailyResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [now, setNow] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const request = useRef<AbortController | null>(null);
  const active = useRef(true);
  const load = useCallback(async () => {
    if (request.current) return;
    const controller = new AbortController(); request.current = controller;
    setLoading(true); setFailed(false);
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch("/api/krillion/", { signal: controller.signal, cache: "no-store" });
      const result: unknown = await response.json();
      if ((!response.ok && response.status !== 503) || !isDailyResponse(result)) throw new Error("Unavailable daily summary");
      if (active.current && request.current === controller) { setData(result); setRevealed(false); }
    } catch { if (active.current && request.current === controller) setFailed(true); }
    finally { window.clearTimeout(timeout); if (request.current === controller) { request.current = null; if (active.current) { setLoading(false); setNow(Date.now()); } } }
  }, []);
  useEffect(() => {
    active.current = true; void load();
    const tick = window.setInterval(() => { setNow(Date.now()); }, 30000);
    const refresh = window.setInterval(() => { if (!document.hidden) void load(); }, 300000);
    const visible = () => { if (!document.hidden) { setNow(Date.now()); void load(); } };
    document.addEventListener("visibilitychange", visible); window.addEventListener("online", visible);
    return () => { active.current = false; request.current?.abort(); request.current = null; window.clearInterval(tick); window.clearInterval(refresh); document.removeEventListener("visibilitychange", visible); window.removeEventListener("online", visible); };
  }, [load]);
  useEffect(() => {
    if (!data?.resetsAt || Date.parse(data.resetsAt) <= Date.now()) return;
    const expiry = window.setTimeout(() => { setNow(Date.now()); setRevealed(false); if (!document.hidden) void load(); }, Date.parse(data.resetsAt) - Date.now() + 10);
    return () => window.clearTimeout(expiry);
  }, [data?.resetsAt, load]);
  const expired = !!data?.resetsAt && now !== null && Date.parse(data.resetsAt) <= now;
  const usable = data && data.state !== "unavailable" && !expired;
  const remaining = usable && data.resetsAt && now !== null ? Math.max(0, Math.floor((Date.parse(data.resetsAt) - now) / 60000)) : null;
  const nextReset = usable && data.resetsAt ? `${data.resetsAt.slice(0, 10)} ${data.resetsAt.slice(11, 16)} UTC` : null;
  return <section id="daily" className="kr-section kr-daily" aria-labelledby="kr-daily-title"><div className="kr-section-intro"><p className="ed-eyebrow">01 / TODAY’S DAILY DIVE</p><h2 id="kr-daily-title">Your next<br /><span>seven prompts.</span></h2><p>Check the official daily set before you dive. Prompts stay hidden until you choose to see them.</p><p className="kr-note">This is a question preview, not a verified answer sheet. Play and review accepted answers on the original game.</p><a className="ed-button" href={krillionSources.official.url} target="_blank" rel="noopener noreferrer">Play today on Krillion<ArrowUpRight size={18} aria-hidden="true" /></a></div><div className="kr-daily-panel">
    <div className="kr-daily-status" role="status">{usable ? <><span className="ed-eyebrow">{data.state === "stale" || failed ? "LAST VERIFIED SNAPSHOT" : "OFFICIAL QUESTION PREVIEW"}</span><h3>Dive #{data.dayNumber}</h3><p>Game date {data.date} · New York</p><p>{remaining !== null ? `${Math.floor(remaining / 60)}h ${remaining % 60}m until the next set` : "Checking the next reset…"}</p></> : <><span className="ed-eyebrow">{loading ? "READING THE OFFICIAL DAILY SET" : "DAILY SET UNAVAILABLE"}</span><h3>{loading ? "Checking today’s dive…" : expired ? "A new dive has started." : "The preview is taking a break."}</h3><p>{loading ? "Seven prompts will appear here when the source responds." : expired ? "Refresh to check the new set. The previous prompts have been hidden." : "We could not verify the current set. Retry here, or open the official daily game."}</p></>}</div>
    {usable && <><button className="ed-button ed-button-outline" type="button" aria-expanded={revealed} aria-controls="kr-daily-prompts" onClick={() => setRevealed((value) => !value)}>{revealed ? "Hide the seven prompts" : "Reveal today’s seven prompts"}</button><ol id="kr-daily-prompts" className="kr-prompts" hidden={!revealed}>{data.prompts.map((prompt, index) => <li key={prompt.id}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p>{prompt.text}</p></li>)}</ol><p className="kr-note">Next set: {nextReset}. Reset follows midnight in New York and shifts with daylight saving time.</p><p className="kr-note">Read {data.observedAt?.replace("T", " ").slice(0, 16)} UTC · <a href={krillionSources.official.url} target="_blank" rel="noopener noreferrer">Source: original Krillion</a></p></>}
    {(failed || data?.state === "stale") && usable && <p className="kr-notice">The source could not be refreshed. This is the last verified set, valid only until the reset above.</p>}
    <button type="button" className="ed-text-link" disabled={loading} onClick={() => void load()}>{loading ? "Checking source…" : "Refresh daily preview"}<RefreshCw size={16} aria-hidden="true" /></button><noscript><p className="kr-notice">The daily preview needs JavaScript. <a href={krillionSources.official.url}>Open today’s original puzzle</a> instead.</p></noscript>
  </div></section>;
}

export function KrillionQuestions({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const visible = faqs.filter((faq) => `${faq.q} ${faq.a}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="kr-questions"><label className="kr-faq-search"><Search size={18} aria-hidden="true" /><span className="zg-sr-only">Search Krillion questions</span><input type="search" disabled={!ready} placeholder={ready ? "Search rules, scores or missing answers…" : "Loading question search…"} value={query} onChange={(event) => setQuery(event.target.value)} /></label><p className="kr-note" role="status">{visible.length} {visible.length === 1 ? "answer" : "answers"}{query && ` matching “${query}”`}</p>{visible.map((faq) => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}{visible.length === 0 && <div className="kr-notice"><p>No answers match that search. Try “score”, “unlimited” or “spelling”.</p><button type="button" className="ed-text-link" onClick={() => setQuery("")}>Show all answers</button></div>}<noscript><p className="kr-note">All questions remain listed on this page. Expand an answer to read it.</p></noscript></div>;
}

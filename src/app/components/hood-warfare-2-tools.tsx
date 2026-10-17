"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, RefreshCw, Search } from "lucide-react";
import { HOOD_PATH, hoodFaqs, hoodGame, hoodModes, hoodSources, hoodUpdates } from "../data/hood-warfare-2";
import { useHoodLive } from "./hood-warfare-2-live";

export function HoodOfflineNotice() {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update(); window.addEventListener("offline", update); window.addEventListener("online", update);
    return () => { window.removeEventListener("offline", update); window.removeEventListener("online", update); };
  }, []);
  return offline ? <p className="hw-notice hw-offline" role="status">You're offline. The guide, mode descriptions and local checklist remain available. Official news and store details will refresh when you're back online.</p> : null;
}

export function HoodModeBrief() {
  const [selected, setSelected] = useState(0);
  const mode = hoodModes[selected];
  return <div className="hw-mode-brief">
    <div className="hw-mode-controls" role="group" aria-label="Choose a game mode">{hoodModes.map((item, index) => <button type="button" key={item.id} aria-pressed={index === selected} aria-controls="hw-mode-reading" onClick={() => setSelected(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.name}</strong><small>{item.zh}</small></button>)}</div>
    <div id="hw-mode-reading" className="hw-mode-reading" role="region" aria-label="Selected mode briefing" aria-live="polite" aria-atomic="true"><p className="ed-eyebrow">{mode.team ? "TEAM OBJECTIVE" : "FREE FOR ALL"}</p><h3>{mode.name}<small>{mode.zh}</small></h3><p className="hw-goal">{mode.goal}</p><dl><div><dt>Official objective</dt><dd>{mode.rule}</dd></div><div><dt>Start here</dt><dd>{mode.starterTip}</dd></div><div><dt>Watch for</dt><dd>{mode.avoid}</dd></div></dl><p className="hw-note">Objectives come from the official store. Starting tips and cautions are editorial practice advice.</p></div>
    <noscript><p className="hw-notice">Switching modes needs JavaScript. You can still read the <Link href={`${HOOD_PATH}modes/`}>complete descriptions of all six modes</Link>.</p></noscript>
  </div>;
}

export function HoodChecklist() {
  const [done, setDone] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    try { const raw = localStorage.getItem("zowgame-hood-first-match-v1"); if (raw) { const saved: unknown = JSON.parse(raw); if (!Array.isArray(saved)) throw new Error("Invalid checklist"); setDone([...new Set(saved.filter((n): n is number => Number.isInteger(n) && n >= 0 && n < hoodGame.guideSteps.length))]); } }
    catch { setFailed(true); }
    setReady(true);
  }, []);
  function save(next: number[]) { setDone(next); try { localStorage.setItem("zowgame-hood-first-match-v1", JSON.stringify(next)); setFailed(false); } catch { setFailed(true); } }
  return <div className="hw-checklist"><div className="hw-check-head"><p role="status">{ready ? `${done.length} / ${hoodGame.guideSteps.length} steps completed` : "Reading your local checklist…"}</p><button type="button" className="ed-text-link" disabled={!ready || done.length === 0} onClick={() => save([])}>Reset checklist<RefreshCw size={15} aria-hidden="true" /></button></div><progress value={done.length} max={hoodGame.guideSteps.length} aria-label="First-match preparation progress" /><ol>{hoodGame.guideSteps.map((step, index) => <li key={step.title}><label><input type="checkbox" disabled={!ready} checked={done.includes(index)} onChange={() => save(done.includes(index) ? done.filter((n) => n !== index) : [...done, index])} /><span><small>STEP {String(index + 1).padStart(2, "0")}</small><strong>{step.title}</strong></span></label><p>{step.body}</p></li>)}</ol>{failed && <p className="hw-notice" role="status">Your browser cannot read or save this checklist. You can still tick the steps, but progress may be lost when you leave. Enable local storage and tick a step to try again.</p>}<p className="hw-note">Progress is saved only in this browser on this device. It does not track your in-game level or challenge completion.</p><noscript><p className="hw-notice">Saving checklist progress needs JavaScript. The practice steps remain readable.</p></noscript></div>;
}

export function HoodQuestions() {
  const [query, setQuery] = useState("");
  const search = useRef<HTMLInputElement>(null);
  const terms = query.normalize("NFKC").toLocaleLowerCase("en-US").trim().split(/\s+/).filter(Boolean);
  const visible = hoodFaqs.filter(({ q, a }) => terms.every((term) => `${q} ${a}`.normalize("NFKC").toLocaleLowerCase("en-US").includes(term)));
  function clear() { setQuery(""); search.current?.focus(); }
  return <div className="hw-questions"><label className="hw-search" htmlFor="hw-question-search"><Search size={19} aria-hidden="true" /><span className="zg-sr-only">Search Hood Warfare 2 questions</span><input ref={search} id="hw-question-search" aria-label="Search Hood Warfare 2 questions" type="search" placeholder="Search: language, voice chat, progression, spawning…" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button type="button" onClick={clear}>Clear</button>}</label><p className="hw-note" role="status">{visible.length} {visible.length === 1 ? "answer" : "answers"} found</p>{visible.map(({ q, a }) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}{!visible.length && <div className="hw-empty"><h3>No questions match this search.</h3><p>Try “language”, “voice” or “progression”. For technical issues, use the official support link on the purchase page.</p><button type="button" className="ed-button ed-button-outline" onClick={clear}>Show all answers<ArrowRight size={16} aria-hidden="true" /></button></div>}<noscript><p className="hw-note">Search needs JavaScript. All questions remain listed on this page.</p></noscript></div>;
}


export function HoodLiveNews() {
  const { data, loading, failed, now, reload: load } = useHoodLive();
  const usable = data && data.state !== "unavailable" && now !== null && data.observedAt !== null && now - Date.parse(data.observedAt) >= 0 && now - Date.parse(data.observedAt) <= 3600000;
  const stale = !!usable && (failed || data.state === "stale");
  return <div className="hw-live-news" aria-busy={loading}><div className="hw-live-head"><p className="ed-eyebrow" role="status">{loading && !usable ? "READING DEVELOPER ANNOUNCEMENTS" : stale ? "LAST RETRIEVED ANNOUNCEMENTS / REFRESH FAILED" : usable ? "OFFICIAL ANNOUNCEMENTS / AUTO SYNC" : "OFFICIAL ANNOUNCEMENTS UNAVAILABLE"}</p><button type="button" className="ed-text-link" disabled={loading} onClick={() => void load()}>{loading ? "Reading…" : "Refresh announcements"}<RefreshCw size={15} aria-hidden="true" /></button></div>{usable ? <><p className="hw-note">Source checked: {data.observedAt!.replace("T", " ").slice(0, 16)} UTC · Checks every 10 minutes while this page is visible. Editorial summaries have separate review dates.</p>{stale && <p className="hw-notice">Steam could not be refreshed. These records retain their original check time and are hidden after one hour. You can still open the reviewed editorial summaries.</p>}{data.items.length ? <ol className="hw-live-list">{data.items.map((item) => {
      const reviewed = hoodUpdates.find((update) => update.id === item.id);
      const beijing = new Date(Date.parse(item.date) + 8 * 3600000).toISOString().slice(0, 16).replace("T", " ");
      return <li key={item.id}><time dateTime={item.date}>{beijing} UTC+8</time><h3>{reviewed ? reviewed.title : item.title}</h3><p>{reviewed ? reviewed.summary : `Official excerpt — pending editorial review. ${item.excerpt || "Open the official post for the full update."}`}</p><div>{reviewed && <a className="ed-text-link" href={`${HOOD_PATH}news/#update-${item.id}`}>Read reviewed editorial summary<ArrowRight size={15} aria-hidden="true" /></a>}<a className="ed-text-link" href={item.url} target="_blank" rel="noopener noreferrer">{reviewed ? "Official post" : "Official post / pending editorial review"}<ArrowUpRight size={15} aria-hidden="true" /></a></div></li>;
    })}</ol> : <p className="hw-empty">Steam returned no announcements. Browse the reviewed timeline or open the official news feed.</p>}</> : <p className={loading ? "hw-note" : "hw-notice"}>{loading ? "Reading Steam developer announcements." : "No verified official news is available. Refresh to try again; reviewed editorial summaries remain accessible."}</p>}<a className="ed-text-link" href={hoodSources.news.url} target="_blank" rel="noopener noreferrer">Open the official news feed<ArrowUpRight size={15} aria-hidden="true" /></a><noscript><p className="hw-notice">Live news needs JavaScript. Reviewed editorial summaries and official links remain accessible.</p></noscript></div>;
}

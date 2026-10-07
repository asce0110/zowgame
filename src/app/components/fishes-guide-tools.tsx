"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, WifiOff } from "lucide-react";

export function GuideIndex({ entries }: { entries: { key: string; title: string; description: string; searchText: string; group: string }[] }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All guides");
  const visible = entries.filter((entry) => (group === "All guides" || entry.group === group) && entry.searchText.toLowerCase().includes(query.trim().toLowerCase()));
  return <section className="fm-index" id="guide-index" aria-labelledby="index-title">
    <div className="fm-section-heading"><div><p className="fm-kicker">CHOOSE YOUR NEXT MOVE</p><h2 id="index-title">The survival library.</h2></div><span className="fm-mono">{entries.length} FIELD GUIDES</span></div>
    <div className="fm-index-tools">
      <div className="fm-search"><Search size={18} aria-hidden="true" /><label className="fm-sr-only" htmlFor="guide-search">Search guides and their contents</label><input id="guide-search" type="search" placeholder="Search: bait, Kraken, rescue…" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button aria-label="Clear search" onClick={() => setQuery("")}>Clear</button>}</div>
      <div className="fm-filters" role="group" aria-label="Filter guides">{["All guides", "Start here", "Survive", "Find an ending"].map((item) => <button key={item} aria-pressed={group === item} onClick={() => setGroup(item)}>{item}</button>)}</div>
    </div>
    <p className="fm-search-count" role="status">{visible.length} {visible.length === 1 ? "guide" : "guides"}{query ? ` matching “${query}”` : " ready to explore"}</p>
    <div className="fm-guide-list">{visible.map((entry, index) => <Link className="fm-guide-entry" key={entry.key} href={`/games/dont-sleep-with-the-fishes/${entry.key}/`}><span className="fm-entry-number">{String(index + 1).padStart(2, "0")}</span><div><span className="fm-kicker">{entry.group}</span><h3>{entry.title}</h3><p>{entry.description}</p></div><ArrowUpRight size={24} aria-hidden="true" /></Link>)}</div>
    {!visible.length && <div className="fm-empty"><h3>No guide found in these waters.</h3><p>Try “food”, “crew”, or “ending”, or clear the filters to see every guide.</p><button className="fm-button" onClick={() => { setQuery(""); setGroup("All guides"); }}>Reset search</button></div>}
  </section>;
}

export function ReadingCompass({ headings }: { headings: { id: string; title: string }[] }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const update = () => {
      let current = 0;
      headings.forEach((heading, index) => { const element = document.getElementById(heading.id); if (element && element.getBoundingClientRect().top <= 180) current = index; });
      setActive(current);
    };
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [headings]);
  return <nav className="fm-compass" aria-label="On this page"><p className="fm-kicker">YOUR READING POSITION</p><div className="fm-compass-status"><strong>{String(active + 1).padStart(2, "0")}</strong><span className="fm-mono">/ {String(headings.length).padStart(2, "0")} SECTIONS</span></div><div className="fm-depth-track" aria-hidden="true"><span style={{ transform: `scaleY(${(active + 1) / headings.length})` }} /></div><ol>{headings.map((heading, index) => <li key={heading.id}><a href={`#${heading.id}`} aria-current={index === active ? "location" : undefined}><span>{String(index + 1).padStart(2, "0")}</span>{heading.title}</a></li>)}</ol></nav>;
}

export function ConnectionNote() {
  const [offline, setOffline] = useState(false);
  useEffect(() => { const update = () => setOffline(!navigator.onLine); update(); window.addEventListener("offline", update); window.addEventListener("online", update); return () => { window.removeEventListener("offline", update); window.removeEventListener("online", update); }; }, []);
  return offline ? <div className="fm-offline" role="status"><WifiOff size={18} aria-hidden="true" /><p>You are offline. Open guide text remains available. Reconnect before visiting the stores or source pages.</p></div> : null;
}

export function GameArtwork() {
  const [failed, setFailed] = useState(false);
  return failed ? <div className="fm-art-fallback"><p className="fm-kicker">ARTWORK UNAVAILABLE</p><p>The sea is still waiting. All guides are available below.</p><button className="fm-button fm-button-secondary" onClick={() => setFailed(false)}>Retry artwork</button></div> : <img src="/fishes-at-sea.jpg" alt="Don't Sleep With The Fishes official gameplay screenshot" width="1920" height="1080" fetchPriority="high" onError={() => setFailed(true)} />;
}

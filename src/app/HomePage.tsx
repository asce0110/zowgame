"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, Compass, LifeBuoy, Search, X } from "lucide-react";
import { getPublishedGames } from "./data/games";
import { FISHES_VERSION } from "./data/fishes-guide";
import { SiteHeader } from "./components/site-header";
import { GameCover } from "./components/game-cover";
import { ConnectionNote } from "./components/fishes-guide-tools";
import "../styles/editorial.css";

const defendersPath = "/games/defenders-of-hogwarts/";
const filters = ["All games", "Browser", "Download", "Tabletop"] as const;
const guides = [
  { title: "Your first night at sea", game: "Don't Sleep With The Fishes", note: `Survival manual · ${FISHES_VERSION}`, href: "/games/dont-sleep-with-the-fishes/guide/" },
  { title: "Keep the furnace alive", game: "Cobb Can Move", note: "Controls & survival basics", href: "/games/cobb-can-move/guide/" },
  { title: "Find your way out", game: "All the Gold in Fort Locks", note: "Room puzzles & key sequences", href: "/games/all-the-gold-in-fort-locks/walkthrough/" },
];
const updates = [
  { title: "Defenders of Hogwarts, explained", note: "Setup, turns, win conditions & searchable answers", href: defendersPath, image: "/defenders-official.webp", date: "2026-10-12", label: "12 OCT 2026" },
  { title: "The sea has new rules", note: `Fishes survival manual · ${FISHES_VERSION}`, href: "/games/dont-sleep-with-the-fishes/changelog/", image: "/fishes-at-sea.jpg", date: "2026-10-07", label: "07 OCT 2026" },
];

export function HomePage() {
  const games = [...getPublishedGames()].sort((a, b) => ["dont-sleep-with-the-fishes", "cobb-can-move", "all-the-gold-in-fort-locks", "defenders-of-hogwarts"].indexOf(a.slug) - ["dont-sleep-with-the-fishes", "cobb-can-move", "all-the-gold-in-fort-locks", "defenders-of-hogwarts"].indexOf(b.slug));
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All games");
  const searchRef = useRef<HTMLInputElement>(null);
  const visible = games.filter((game) => {
    const text = `${game.shortTitle} ${game.content.genre} ${game.content.description} ${game.keywords.join(" ")}`;
    return text.toLowerCase().includes(query.trim().toLowerCase()) && (filter === "All games" || (game.accessMode || "browser") === filter.toLowerCase());
  });
  function resetLibrary() { setQuery(""); setFilter("All games"); }
  function showRules() { setQuery(""); setFilter("Tabletop"); }
  function searchLibrary() {
    document.getElementById("library")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return <div className="zg-site ed-home">
    <a className="zg-skip" href="#library">Skip to the game library</a>
    <ConnectionNote />
    <SiteHeader editorial search={<div className="ed-header-search"><Search size={17} aria-hidden="true" /><label className="zg-sr-only" htmlFor="header-search">Search the game library</label><input ref={searchRef} id="header-search" type="search" disabled={!ready} placeholder={ready ? "Search games…" : "Loading search…"} value={query} onChange={(event) => { setQuery(event.target.value); setFilter("All games"); }} onKeyDown={(event) => { if (event.key === "Enter") searchLibrary(); }} />{query && <button type="button" aria-label="Clear game search" onClick={() => { setQuery(""); searchRef.current?.focus({ preventScroll: true }); }}><X size={16} aria-hidden="true" /></button>}</div>} />

    <main className="ed-main">
      <div className="ed-feature-grid">
        <section className="ed-lead" aria-labelledby="featured-title">
          <div className="ed-lead-art"><GameCover src="/defenders-editorial.webp" title="Castle and tabletop map editorial illustration" priority retry={false} /></div>
          <div className="ed-lead-copy"><p className="ed-eyebrow">HARRY POTTER / TABLETOP GAME</p><h1 id="featured-title">DEFENDERS<br />OF HOGWARTS</h1><h2>Harry Potter Defenders RPG game — explained</h2><p className="ed-lead-deck">A new tabletop adventure from MinaLima.<br />Learn the rules. Find your next move.</p><div className="ed-lead-actions"><Link className="ed-button" href={defendersPath}>Read the guide<ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="ed-button ed-button-outline" href={`${defendersPath}#rules`}>How to play</Link></div><nav className="ed-briefing" aria-label="Defenders of Hogwarts guide sections"><Link href={`${defendersPath}#overview`}>What is it?<ArrowRight size={15} aria-hidden="true" /></Link><Link href={`${defendersPath}#rules`}>Rules & turns<ArrowRight size={15} aria-hidden="true" /></Link><Link href={`${defendersPath}#availability`}>Where to buy<ArrowRight size={15} aria-hidden="true" /></Link></nav></div>
          <small className="ed-art-credit">EDITORIAL ILLUSTRATION</small>
        </section>
        <aside className="ed-radar" aria-labelledby="radar-heading"><div className="ed-rail-heading"><h2 id="radar-heading">ON THE RADAR</h2><span className="ed-eyebrow">FRESH GUIDES</span></div><Link className="ed-radar-feature" href="/games/dont-sleep-with-the-fishes/"><GameCover src="/fishes-at-sea.jpg" title="Don't Sleep With The Fishes" retry={false} /><div><span className="ed-pill">SURVIVAL / DOWNLOAD</span><h3>Don't Sleep<br />With The Fishes</h3></div></Link><p className="ed-radar-caption"><span>{FISHES_VERSION} manual</span><span>Get your bearings at sea.</span></p><div id="guides" className="ed-start"><h3>START HERE</h3>{guides.map((guide, index) => <Link key={guide.href} href={guide.href}><span className="ed-number">{String(index + 1).padStart(2, "0")}</span><span>{guide.title}</span><ArrowUpRight size={17} aria-hidden="true" /></Link>)}</div></aside>
      </div>

      <nav className="ed-intent" aria-label="Choose your next move"><a href="#library" onClick={resetLibrary}><Compass size={31} aria-hidden="true" /><span><strong>Find a game.</strong><small>Something worth your time.</small></span><ArrowRight size={20} aria-hidden="true" /></a><a href="#library" onClick={showRules}><BookOpen size={31} aria-hidden="true" /><span><strong>Learn the rules.</strong><small>Get ready for the table.</small></span><ArrowRight size={20} aria-hidden="true" /></a><a href="#guides"><LifeBuoy size={31} aria-hidden="true" /><span><strong>Get unstuck.</strong><small>A better next move.</small></span><ArrowRight size={20} aria-hidden="true" /></a></nav>

      <section id="library" className="ed-library" aria-labelledby="library-heading"><div className="ed-section-heading"><div><h2 id="library-heading">THE GAME LIBRARY</h2><p className="ed-eyebrow">DIFFERENT WORLDS. SAME CURIOSITY.</p></div><button className="ed-text-link" disabled={!ready} onClick={() => { resetLibrary(); searchRef.current?.focus({ preventScroll: true }); }}>Browse all games<ArrowRight size={17} aria-hidden="true" /></button></div><div className="ed-library-tools"><div className="ed-filters" role="group" aria-label="Game format">{filters.map((item) => <button key={item} disabled={!ready} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><span className="ed-library-hint">BROWSER / DOWNLOAD / TABLETOP</span></div><p className={`ed-result-count${query || filter !== "All games" ? " ed-result-count-visible" : ""}`} role="status">{visible.length} {visible.length === 1 ? "game" : "games"}{query ? ` matching “${query}”` : " in view"}</p><div className="ed-game-grid">{visible.map((game) => {
        const tabletop = game.accessMode === "tabletop";
        const guideHref = tabletop ? `${game.canonicalPath}#rules` : `${game.canonicalPath}${game.slug === "all-the-gold-in-fort-locks" ? "walkthrough" : "guide"}/`;
        return <article key={game.slug} className={`ed-game ed-game-${game.slug}${tabletop ? " ed-game-tabletop" : ""}`}><Link className="ed-game-image" href={game.canonicalPath} aria-label={`Explore ${game.shortTitle}`}><GameCover src={game.slug === "dont-sleep-with-the-fishes" ? "/fishes-at-sea.jpg" : game.cardImage || game.content.coverImg || game.ogImage} title={game.shortTitle} retry={false} /><span className="ed-pill">{tabletop ? "PHYSICAL TABLETOP" : game.accessMode === "download" ? "DOWNLOAD GAME" : "BROWSER GAME"}</span></Link><div className="ed-game-copy"><p className="ed-eyebrow">{tabletop ? "MINALIMA / HARRY POTTER" : game.content.genre.split("·").slice(0, 2).join(" / ").trim()}</p><h3><Link href={game.canonicalPath}>{game.shortTitle}</Link></h3><p>{game.content.description}</p><Link className="ed-text-link" href={game.accessMode === "browser" || !game.accessMode ? game.canonicalPath : guideHref}>{tabletop ? "How to play" : game.accessMode === "download" ? "Read survival guide" : "Play in browser"}<ArrowUpRight size={17} aria-hidden="true" /></Link></div></article>;
      })}</div>{!visible.length && <div className="ed-empty"><Search size={30} aria-hidden="true" /><h3>No games match this search.</h3><p>Try “Harry Potter”, “horror” or “puzzle”, or show the whole library.</p><button className="ed-button" onClick={resetLibrary}>Show all games<ArrowRight size={17} aria-hidden="true" /></button></div>}</section>

      <div className="ed-bottom-grid"><section id="updates" className="ed-updates" aria-labelledby="updates-heading"><h2 id="updates-heading">RECENTLY UPDATED</h2>{updates.map((update) => <Link href={update.href} className="ed-update" key={update.href}><GameCover src={update.image} title={update.title} retry={false} /><div><time className="ed-eyebrow" dateTime={update.date}>{update.label}</time><h3>{update.title}</h3><p>{update.note}</p></div><ArrowUpRight size={18} aria-hidden="true" /></Link>)}</section><aside className="ed-editor-note"><img src="/defenders-editorial.webp" alt="" loading="lazy" width="1659" height="948" /><div><p className="ed-eyebrow">THE PLAYER'S INDEX</p><h2>SMALL WORLDS.<br />STRANGE RULES.</h2><p>Find a game. Learn its secrets.</p><a href="#library" className="ed-button" onClick={resetLibrary}>Explore the library<ArrowRight size={17} aria-hidden="true" /></a></div></aside></div>
    </main>
    <footer className="ed-footer"><Link href="/" className="zg-wordmark">ZOW<span>GAME</span></Link><p>Games worth your time.<br /><small>Independent player guides.</small></p><nav aria-label="Footer navigation"><a href="#library" onClick={resetLibrary}>Library</a><a href="#guides">Guides</a><Link href="/privacy/">Privacy</Link></nav></footer>
  </div>;
}
export default HomePage;

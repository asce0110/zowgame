"use client";
import Link from "next/link";
import { Search, ArrowUpRight, ArrowRight, Play, BookOpen } from "lucide-react";
import { useState } from "react";
import { getPublishedGames } from "./data/games";
import { FISHES_VERSION } from "./data/fishes-guide";
import { SiteHeader } from "./components/site-header";
import { GameCover } from "./components/game-cover";
import { ConnectionNote } from "./components/fishes-guide-tools";
import "../styles/site-ui.css";

export function HomePage() {
  const games = getPublishedGames();
  const fishes = games.find((game) => game.slug === "dont-sleep-with-the-fishes")!;
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All games");
  const visible = games.filter((game) => `${game.shortTitle} ${game.content.genre} ${game.content.description}`.toLowerCase().includes(query.trim().toLowerCase()) && (filter === "All games" || (filter === "Play in browser" ? game.accessMode !== "download" : game.accessMode === "download")));
  const guides = [
    { title: "Your first night at sea", game: "Don't Sleep With The Fishes", note: `Survival manual · ${FISHES_VERSION}`, href: `${fishes.canonicalPath}guide/`, number: "01" },
    { title: "Find your way out", game: "All the Gold in Fort Locks", note: "Room puzzles · walkthrough", href: "/games/all-the-gold-in-fort-locks/walkthrough/", number: "02" },
    { title: "Keep the furnace alive", game: "Cobb Can Move", note: "Controls · survival basics", href: "/games/cobb-can-move/guide/", number: "03" },
  ];
  return <div className="zg-site zg-library"><a className="zg-skip" href="#library">Skip to game library</a><ConnectionNote /><SiteHeader />
    <main className="zg-library-main">
      <section className="zg-home-lead">
        <div className="zg-home-intro"><p className="zg-eyebrow">INDEPENDENT GAMES. GOOD REASONS TO STAY.</p><h1>ONE MORE<br />TRY<span>.</span></h1><div className="zg-intro-bottom"><p>Small worlds. Strange rules.<br />Find a game. Learn its secrets.</p><a href="#library">Explore the library<ArrowRight size={20} aria-hidden="true" /></a></div><span className="zg-edition">ZOWGAME / THE PLAYER'S INDEX / 2026</span></div>
        <article className="zg-feature"><div className="zg-feature-art"><GameCover src="/fishes-at-sea.jpg" title={fishes.shortTitle} priority /></div><div className="zg-feature-copy"><p className="zg-eyebrow">IN FOCUS / UPDATED SURVIVAL MANUAL</p><h2>Don't Sleep<br />With The Fishes</h2><p>The sea has new rules. Get your bearings before the next night.</p><Link href={fishes.canonicalPath}>Open the {FISHES_VERSION} manual<ArrowUpRight size={20} aria-hidden="true" /></Link></div></article>
      </section>
      <section id="library" className="zg-game-library" aria-labelledby="library-heading"><div className="zg-library-heading"><div><p className="zg-eyebrow">PICK YOUR NEXT OBSESSION</p><h2 id="library-heading">The game library<span>.</span></h2></div><span className="zg-eyebrow">{games.length} GAMES / HANDPICKED</span></div>
        <div className="zg-discovery-controls"><div className="zg-search"><Search size={19} aria-hidden="true" /><label className="zg-sr-only" htmlFor="game-search">Search games by name or genre</label><input id="game-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a game, genre, or guide…" />{query && <button onClick={() => setQuery("")} aria-label="Clear game search">Clear</button>}</div><div className="zg-library-filters" role="group" aria-label="Game access type">{["All games", "Play in browser", "Guides & downloads"].map((item) => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
        <p className="zg-result-count" role="status">{visible.length} {visible.length === 1 ? "game" : "games"}{query ? ` matching “${query}”` : " in view"}</p>
        <div className="zg-catalog">{visible.map((game, index) => <article className={`zg-game-row zg-game-${game.slug}`} key={game.slug}><Link className="zg-game-art" href={game.canonicalPath} aria-label={`Open ${game.shortTitle}`}><GameCover src={game.cardImage || game.content.coverImg || game.ogImage} title={game.shortTitle} retry={false} /></Link><div className="zg-game-info"><div className="zg-game-meta"><span className="zg-row-number">{String(index + 1).padStart(2,"0")}</span><span>{game.content.genre.split("·")[0].trim()}</span><span className="zg-access-label">{game.accessMode === "download" ? "DOWNLOAD GAME" : "BROWSER GAME"}</span></div><h3><Link href={game.canonicalPath}>{game.shortTitle}</Link></h3><p>{game.content.description}</p><div className="zg-game-actions"><Link className="zg-primary-link" href={game.canonicalPath}>{game.accessMode === "download" ? <BookOpen size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}{game.accessMode === "download" ? "Explore the guide" : "Play in browser"}<ArrowUpRight size={17} aria-hidden="true" /></Link><Link href={`${game.canonicalPath}${game.slug === "all-the-gold-in-fort-locks" ? "walkthrough" : "guide"}/`}>Read the guide<ArrowRight size={16} aria-hidden="true" /></Link></div></div></article>)}</div>
        {!visible.length && <div className="zg-empty"><h3>No games match this search.</h3><p>Try “horror” or “puzzle”, or reset the filters to see the whole library.</p><button className="zg-primary-link" onClick={() => { setQuery(""); setFilter("All games"); }}>Show all games</button></div>}
      </section>
      <section id="guides" className="zg-guides-section" aria-labelledby="guides-heading"><div className="zg-library-heading"><div><p className="zg-eyebrow">A LITTLE KNOWLEDGE GOES A LONG WAY</p><h2 id="guides-heading">Stuck? Start here<span>.</span></h2></div><BookOpen size={30} aria-hidden="true" /></div><div className="zg-guides-list">{guides.map((guide) => <Link href={guide.href} key={guide.href}><span className="zg-row-number">{guide.number}</span><div><p className="zg-eyebrow">{guide.game}</p><h3>{guide.title}</h3><p>{guide.note}</p></div><ArrowUpRight size={24} aria-hidden="true" /></Link>)}</div></section>
      <div className="zg-library-note"><p>PLAY THE GAME. SUPPORT ITS CREATOR.</p><p>Browser games open on their game pages. Download titles link to the creator's official stores. Our guides are independent.</p></div>
    </main><footer className="zg-site-footer"><Link href="/" className="zg-wordmark">ZOW<span>GAME</span></Link><p>Independent games & player guides.</p><Link href="/privacy/">Privacy</Link></footer>
  </div>;
}
export default HomePage;

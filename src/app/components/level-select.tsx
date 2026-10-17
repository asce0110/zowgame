"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { ArrowRight, ArrowUpRight, RefreshCw } from "lucide-react";
import type { AtlasGame, AtlasGenreId, AtlasGuide } from "../data/atlas";
import { FEATURED_SCENES, HOME_GUIDE_FILTERS, homeGuides, homeGuideCopy, homeGuideFilter, homeStateHref, type HomeGuideFilter } from "../data/level-select";
import { GameCover } from "./game-cover";

function isPlainClick(event: MouseEvent<HTMLAnchorElement>) { return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey; }
function replaceHomeState(href: string) { window.history.replaceState(null, "", href); window.dispatchEvent(new Event("zowgame:home-state")); }
function SceneArtwork({ src, title, position }: { src: string; title: string; position?: string }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => { const image = imageRef.current; if (image?.complete) { if (image.naturalWidth > 0) setLoaded(true); else setFailed(true); } }, [src, attempt]);
  return <div className="ls-scene-art" aria-busy={!loaded && !failed}>
    {failed ? <div className="ls-art-error" role="status"><p>Scene unavailable.</p><span>All guides below are still ready to read.</span><button type="button" onClick={() => { setFailed(false); setLoaded(false); setAttempt((value) => value + 1); }}>Retry artwork<RefreshCw size={16} aria-hidden="true" /></button></div> : <><img ref={imageRef} key={attempt} src={src} alt={`${title} official game artwork`} width={1400} height={788} fetchPriority="high" decoding="async" style={{ objectPosition: position }} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />{!loaded && <span className="ls-art-loading" role="status">Loading game scene…</span>}</>}
  </div>;
}
export function LevelSelect({ games, initialGame, genre, guideType }: { games: readonly AtlasGame[]; initialGame: string; genre: AtlasGenreId; guideType: HomeGuideFilter }) {
  const [selected, setSelected] = useState(initialGame);
  const [currentType, setCurrentType] = useState(guideType);
  useEffect(() => { const sync = () => { const params = new URLSearchParams(window.location.search); setCurrentType(homeGuideFilter(params.get("type"))); const slug = params.get("game"); setSelected(games.some((entry) => entry.slug === slug) ? slug! : initialGame); }; window.addEventListener("zowgame:home-state", sync); window.addEventListener("popstate", sync); return () => { window.removeEventListener("zowgame:home-state", sync); window.removeEventListener("popstate", sync); }; }, [games, initialGame]);
  const roster = useRef<HTMLDivElement>(null);
  const game = games.find((entry) => entry.slug === selected) || games[0];
  const scene = FEATURED_SCENES.find((entry) => entry.slug === game.slug)!;
  const number = String(FEATURED_SCENES.indexOf(scene) + 1).padStart(2, "0");
  function select(slug: string) { setSelected(slug); replaceHomeState(homeStateHref({ game: slug, genre, type: currentType })); }
  function handleKeys(event: KeyboardEvent<HTMLAnchorElement>, index: number) {
    const next = event.key === "ArrowRight" ? (index + 1) % games.length : event.key === "ArrowLeft" ? (index - 1 + games.length) % games.length : event.key === "Home" ? 0 : event.key === "End" ? games.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault();
    const target = roster.current?.querySelectorAll<HTMLAnchorElement>(".ls-slot-select")[next];
    target?.focus({ preventScroll: true }); target?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" }); select(games[next].slug);
  }
  return <section id="library" className="ls-level-select" aria-label="Featured games and quick guides">
    <div id="featured-game" className={`ls-hero ls-hero-${game.slug}`}>
      <SceneArtwork key={game.slug} src={scene.scene} title={game.title} position={scene.position} />
      <div className="ls-hero-info" key={`info-${game.slug}`}><span className="ls-hero-number" aria-hidden="true">{number}</span><p className="ls-kicker">Featured game / {number}</p>
        <h2 className={`ls-game-title ${scene.lines.length > 2 ? "ls-game-title-long" : ""}`}>{scene.lines.map((line) => <span key={line}>{line}</span>)}</h2><p className="ls-game-genre">{scene.genre}</p>
        <nav className="ls-quick-guides" aria-label={`${game.title} quick guides`}>{scene.links.map((link, index) => <Link key={link.href} href={link.href}><span className="ls-guide-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="ls-quick-label">{link.label}<ArrowRight size={23} strokeWidth={1.5} aria-hidden="true" /></span></Link>)}</nav>
        <div className="ls-hero-actions"><Link className="ls-button" href={scene.links[0].href}>Explore guides<ArrowRight size={23} strokeWidth={1.5} aria-hidden="true" /></Link><Link className="ls-overview" href={game.href}>Game overview<ArrowRight size={21} strokeWidth={1.5} aria-hidden="true" /></Link></div>
      </div>
    </div>
    <div className="ls-roster-section"><div className="ls-roster-heading"><h2 className="ls-kicker">Featured games</h2><Link href="/games/">Browse all games<ArrowRight size={19} strokeWidth={1.5} aria-hidden="true" /></Link></div>
      <div ref={roster} className="ls-roster" aria-label="Choose a featured game">{games.map((entry, index) => {
        const slot = FEATURED_SCENES.find((item) => item.slug === entry.slug)!; const active = game.slug === entry.slug;
        return <article key={entry.slug} className={`atlas-game-card ls-slot ls-slot-${entry.slug} ${active ? "is-selected" : ""}`}><a className="ls-slot-select" href={homeStateHref({ game: entry.slug, genre, type: currentType, anchor: "featured-game" })} aria-current={active ? "true" : undefined} aria-label={`Select ${entry.title}`} onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); select(entry.slug); } }} onKeyDown={(event) => handleKeys(event, index)}><GameCover src={slot.thumbnail} title={entry.title} retry={false} /><span className="ls-slot-shade" aria-hidden="true" /><span className="ls-slot-number" aria-hidden="true">{String(FEATURED_SCENES.indexOf(slot) + 1).padStart(2, "0")}</span>{active && <span className="ls-selected-label">Selected</span>}<h3>{slot.shortLines.map((line) => <span key={line}>{line}</span>)}</h3></a><Link className="ls-slot-overview" href={entry.href} aria-label={`Open ${entry.title} game overview`} title={`Open ${entry.title} game overview`}><ArrowUpRight size={18} aria-hidden="true" /></Link></article>;
      })}</div><p className="zg-sr-only" role="status" aria-live="polite">Selected: {game.title}. Three quick guide links are shown above.</p><noscript><p className="ls-no-script">Choose a game to load its guides, or use the arrow on its cover to open the game overview.</p></noscript>
    </div>
  </section>;
}
export function HomeGuideFinder({ guides, genre, initialType, initialGame }: { guides: readonly AtlasGuide[]; genre: AtlasGenreId; initialType: HomeGuideFilter; initialGame: string }) {
  const [type, setType] = useState(initialType); const entries = homeGuides(guides, type);
  const [selectedGame, setSelectedGame] = useState(initialGame);
  useEffect(() => { const sync = () => { const params = new URLSearchParams(window.location.search); setSelectedGame(params.get("game") || initialGame); setType(homeGuideFilter(params.get("type"))); }; window.addEventListener("zowgame:home-state", sync); window.addEventListener("popstate", sync); return () => { window.removeEventListener("zowgame:home-state", sync); window.removeEventListener("popstate", sync); }; }, [initialGame]);
  const directory = genre === "all" ? "/guides/" : `/guides/?genre=${genre}`;
  const allMatches = type === "featured" ? directory : `${directory}${directory.includes("?") ? "&" : "?"}type=${type}`;
  return <section id="guides" className="ls-guide-finder" aria-labelledby="ls-guide-heading"><div className="ls-guide-intro"><h1 id="ls-guide-heading" className="ls-kicker">Game guides & walkthroughs</h1><p className="ls-next-move" aria-hidden="true"><span>Your</span><span>next move.</span></p><p>Clear, practical guides to help you<br className="ls-desktop-break" /> play smarter and go further.</p><Link className="ls-button" href={directory}>All guides<ArrowRight size={22} strokeWidth={1.5} aria-hidden="true" /></Link></div>
    <div className="ls-guide-results"><nav className="ls-guide-tabs" aria-label="Find guides by topic">{HOME_GUIDE_FILTERS.map((filter) => <a key={filter.id} href={homeStateHref({ genre, type: filter.id, game: selectedGame, anchor: "guides" })} aria-current={type === filter.id ? "true" : undefined} onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); setType(filter.id); replaceHomeState(homeStateHref({ genre, type: filter.id, game: selectedGame, anchor: "guides" })); } }}>{filter.label}</a>)}</nav><div aria-live="polite" aria-atomic="true" className="zg-sr-only">{entries.length} guides shown for {HOME_GUIDE_FILTERS.find((filter) => filter.id === type)?.label}.</div>
      {entries.length ? <ul className="ls-home-guides">{entries.map((guide) => { const copy = homeGuideCopy(guide); const art = FEATURED_SCENES.find((scene) => scene.slug === guide.gameSlug)?.thumbnail || guide.image; return <li key={guide.id}><Link className="ls-home-guide atlas-read-guide" href={guide.href}><span className="ls-home-guide-image"><GameCover src={art} title={guide.gameTitle} retry={false} /></span><span className="ls-home-guide-copy"><span className="ls-home-guide-game">{guide.gameTitle}</span><h2>{copy.title}</h2><span className="ls-home-guide-description">{copy.description}</span></span><ArrowRight size={23} strokeWidth={1.5} aria-hidden="true" /></Link></li>; })}</ul> : <div className="ls-guide-empty"><h2>No published guides in this topic yet.</h2><p>Try Featured or explore every guide in the library.</p><button type="button" onClick={() => { setType("featured"); replaceHomeState(homeStateHref({ genre, type: "featured", game: selectedGame, anchor: "guides" })); }}>Show featured guides<ArrowRight size={18} aria-hidden="true" /></button><Link href="/guides/">Browse all guides</Link></div>}
      {type !== "featured" && entries.length > 0 && <Link className="ls-all-matches" href={allMatches}>View all matching guides<ArrowRight size={18} aria-hidden="true" /></Link>}
    </div>
  </section>;
}

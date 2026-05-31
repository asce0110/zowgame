"use client";
import Link from "next/link";
import { Play, Search, Sparkles, Gamepad2, Star, Ghost, Skull } from "lucide-react";
import { trackEvent } from "./lib/analytics";
import { getPublishedGames } from "./data/games";

type HomePortalEntry = {
  title: string;
  href: string;
  imageSrc?: string;
  genre: string;
  rating?: string;
  badge: string;
  type: "playable" | "guide";
};

function PortalCard({ entry, onClick }: { entry: HomePortalEntry; onClick?: () => void }) {
  const isGuide = entry.type === "guide";

  return (
    <Link
      href={entry.href}
      onClick={onClick}
      className="group block rounded-[24px] overflow-hidden border ec-border ec-surface backdrop-blur hud-corners hover:-translate-y-1 hover:ec-border-brand transition-all duration-300"
      style={{ boxShadow: "var(--ec-shadow-card)" }}
    >
      <div className="relative aspect-[1.25/1] overflow-hidden bg-[rgba(var(--ec-bg-rgb),0.55)]">
        {entry.imageSrc ? (
          <img
            src={entry.imageSrc}
            alt={entry.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-fuchsia-500/20 via-orange-500/10 to-cyan-400/20">
            {isGuide ? <Skull className="w-14 h-14 text-cyan-300" /> : <Ghost className="w-14 h-14 text-fuchsia-300" />}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(var(--ec-bg-rgb),0.96)] via-[rgba(var(--ec-bg-rgb),0.2)] to-transparent" />

        <div className="absolute top-3 left-3 inline-flex items-center rounded-full border border-white/15 bg-black/60 px-2.5 py-1 backdrop-blur">
          <span className="text-white tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{entry.badge}</span>
        </div>

        {entry.rating ? (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 backdrop-blur">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-white" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{entry.rating}</span>
          </div>
        ) : null}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.55)]">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="ec-text-faint tracking-[0.22em] uppercase truncate" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
            {entry.genre}
          </span>
          <span className={`shrink-0 ${isGuide ? "text-cyan-300" : "text-orange-300"}`} style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "11px" }}>
            {isGuide ? "GUIDE" : "PLAY"}
          </span>
        </div>
        <div className="ec-text truncate" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "18px" }}>
          {entry.title}
        </div>
      </div>
    </Link>
  );
}

export function HomePage() {
  const games = getPublishedGames();
  const featuredGame = games[0];

  const portalEntries: HomePortalEntry[] = games.map((game) => ({
    title: game.shortTitle,
    href: game.canonicalPath,
    imageSrc: game.cardImage || game.content.coverImg || game.ogImage,
    genre: game.content.genre,
    rating: game.content.rating,
    badge: game.accessMode === "download" ? "GUIDE" : "PLAYABLE",
    type: game.accessMode === "download" ? "guide" : "playable",
  }));

  return (
    <div className="eclipse-app min-h-screen w-full relative overflow-x-hidden" style={{ fontFamily: "Rajdhani, sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ opacity: "var(--ec-blob-opacity, 1)" }}>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-orange-600/10 blur-[120px]" />
        <div className="hidden md:block absolute -right-[280px] top-[180px] w-[680px] h-[680px] eclipse-ring" aria-hidden="true" style={{ opacity: "var(--ec-eclipse-ring-opacity)" }} />
        <div className="hidden md:block absolute -left-[220px] -bottom-[220px] w-[520px] h-[520px] eclipse-ring" aria-hidden="true" style={{ opacity: "var(--ec-eclipse-ring-2-opacity)", animationDuration: "90s", animationDirection: "reverse" }} />
        <div className="absolute inset-0 ec-grid-overlay" style={{ backgroundSize: "80px 80px" }} />
      </div>

      <main className="relative px-4 sm:px-6 lg:px-10 py-10 sm:py-14 max-w-[1320px] mx-auto">
        <header className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
          <Link href="/" className="group flex items-center gap-3 cursor-pointer" aria-label="Go to homepage">
            <img src="/logo-symbol.svg" alt="ZOWGAME" className="w-11 h-11 transition-transform duration-200 group-hover:scale-105" />
            <div>
              <div className="ec-text tracking-[0.3em]" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "18px" }}>ZOWGAME</div>
              <div className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>GAMES + GUIDES</div>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-2 rounded-full border ec-border ec-surface px-4 py-2">
            <Gamepad2 className="w-4 h-4 text-cyan-400" />
            <span className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>CLICK A TILE TO OPEN</span>
          </div>
        </header>

        <section className="rounded-[30px] border ec-border-brand ec-surface backdrop-blur p-6 sm:p-8 hud-corners mb-8" style={{ boxShadow: "var(--ec-shadow-card)" }}>
          <span className="hud-c1" /><span className="hud-c2" />
          <div className="inline-flex items-center gap-2 rounded-full border ec-border-brand ec-surface px-3 py-1.5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-500" />
            <span className="text-fuchsia-500 tracking-[0.3em]" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>// GAME PORTAL</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="ec-text leading-[0.92] tracking-tight text-[40px] sm:text-[58px] lg:text-[72px]" style={{ fontFamily: "Orbitron", fontWeight: 900 }}>
                Pick a Game Tile and Jump In
              </h1>
              <p className="ec-text-muted max-w-3xl mt-4" style={{ fontSize: "18px", lineHeight: 1.65 }}>
                A visual H5 game homepage: clickable cover cards for playable browser games, plus guide entries for trending titles that live outside the instant-play catalog.
              </p>
            </div>
            {featuredGame ? (
              <Link
                href={featuredGame.canonicalPath}
                onClick={() => trackEvent("featured_game_click", { location: "home_top_pick", game: featuredGame.slug })}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-fuchsia-500 to-cyan-400 text-white hover:scale-[1.02] active:scale-95 transition-transform self-start lg:self-auto"
                style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "13px", boxShadow: "var(--ec-glow-orange)" }}
              >
                <Play className="w-4 h-4 fill-white" />
                TOP PICK: {featuredGame.shortTitle.toUpperCase()}
              </Link>
            ) : null}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <div className="ec-text tracking-[0.25em] mb-2" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>ALL ENTRIES</div>
              <h2 className="ec-text text-[28px] sm:text-[34px]" style={{ fontFamily: "Orbitron", fontWeight: 800 }}>Click a Cover to Open</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 ec-text-faint" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
              <Search className="w-4 h-4 text-cyan-400" />
              <span>VISUAL GRID FIRST</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {portalEntries.map((entry) => (
              <PortalCard
                key={entry.href}
                entry={entry}
                onClick={() => {
                  if (entry.type === "guide") {
                    trackEvent("guide_nav_click", { location: "home_portal_grid", target: entry.href.replace(/^\/games\/|\/$/g, "") });
                    return;
                  }

                  const game = games.find((item) => item.canonicalPath === entry.href);
                  trackEvent("play_click", {
                    location: "home_portal_grid",
                    game: game?.slug ?? entry.title.toLowerCase().replace(/\s+/g, "-"),
                  });
                }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

"use client";
import Link from "next/link";
import { Play, Search, Globe, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { SeoHead } from "./components/seo-head";
import { trackEvent } from "./lib/analytics";

export function HomePage() {
  return (
    <>
      <SeoHead
        title="ZowGame - Play Free Browser Games Online"
        canonical="https://zowgame.com/"
        description="Play fast, free browser games on ZowGame. Start with Cobb Can Move, a tense pixel horror game you can launch instantly online."
        keywords="ZowGame, free browser games, online games, play games online, horror browser games, Cobb Can Move"
      />

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
          <header className="flex items-center justify-between gap-4 mb-10 sm:mb-16">
            <Link href="/" className="group flex items-center gap-3 cursor-pointer" aria-label="Go to homepage">
              <img src="/logo-symbol.svg" alt="ZOWGAME" className="w-11 h-11 transition-transform duration-200 group-hover:scale-105" />
              <div>
                <div className="ec-text tracking-[0.3em]" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "18px" }}>ZOWGAME</div>
                <div className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>FREE BROWSER GAMES</div>
              </div>
            </Link>
            <Link href="/cobb-can-move/" onClick={() => trackEvent("featured_game_click", { location: "home_header", game: "cobb_can_move" })} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ec-surface border ec-border ec-text hover:ec-hover-surface transition-colors" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>
              OPEN FEATURED GAME
              <ArrowRight className="w-4 h-4" />
            </Link>
          </header>

          <section className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border ec-border-brand ec-surface px-3 py-1.5 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-500" />
                <span className="text-fuchsia-500 tracking-[0.3em]" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>// INSTANT PLAY GAMES</span>
              </div>
              <h1 className="ec-text leading-[0.92] tracking-tight text-[42px] sm:text-[68px] lg:text-[88px]" style={{ fontFamily: "Orbitron", fontWeight: 900 }}>
                Play Fast Browser Games Online
              </h1>
              <p className="ec-text-muted max-w-2xl mt-5 mb-7" style={{ fontSize: "18px", lineHeight: 1.7 }}>
                ZowGame brings you focused browser game pages that launch quickly, explain the controls clearly, and help you start playing without downloads or confusing setup.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/cobb-can-move/" onClick={() => trackEvent("play_click", { location: "home_hero", game: "cobb_can_move" })} className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 via-fuchsia-500 to-cyan-400 text-white hover:scale-[1.02] active:scale-95 transition-transform" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "14px", boxShadow: "var(--ec-glow-orange)" }}>
                  <Play className="w-5 h-5 fill-white" />
                  PLAY COBB CAN MOVE
                </Link>
                <Link href="/cobb-can-move/" onClick={() => trackEvent("guide_nav_click", { location: "home_hero", target: "game_guide" })} className="inline-flex items-center gap-3 px-6 py-4 rounded-xl ec-surface border ec-border ec-text hover:ec-hover-surface transition-colors" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "14px" }}>
                  <BookOpen className="w-5 h-5" />
                  VIEW GAME GUIDE
                </Link>
              </div>
            </div>

            <div className="grid gap-4" id="featured-game">
              <div className="rounded-2xl border ec-border-brand ec-surface backdrop-blur p-5 hud-corners" style={{ boxShadow: "var(--ec-shadow-card)" }}>
                <span className="hud-c1" /><span className="hud-c2" />
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-4 h-4 text-fuchsia-500" />
                  <span className="ec-text tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>FEATURED GAME</span>
                </div>
                <div className="ec-text text-[24px] leading-tight" style={{ fontFamily: "Orbitron", fontWeight: 800 }}>Cobb Can Move</div>
                <p className="ec-text-muted mt-2" style={{ fontSize: "15px", lineHeight: 1.6 }}>
                  A tense pixel horror game where you explore a dark dungeon, collect coal, keep the light alive, and survive Cobb as the rules change.
                </p>
                <Link href="/cobb-can-move/" onClick={() => trackEvent("featured_game_click", { location: "home_featured_card", game: "cobb_can_move" })} className="inline-flex items-center gap-2 mt-4 text-fuchsia-500 hover:text-fuchsia-400 transition-colors" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>
                  PLAY NOW
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="rounded-2xl border ec-border ec-surface backdrop-blur p-5 hud-corners" style={{ boxShadow: "var(--ec-shadow-card)" }}>
                <span className="hud-c1" /><span className="hud-c2" />
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-cyan-500" />
                  <span className="ec-text tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>WHY PLAY HERE</span>
                </div>
                <p className="ec-text-muted" style={{ fontSize: "15px", lineHeight: 1.7 }}>
                  Instant browser access, clear controls, useful tips, and focused game pages built to help you start playing faster.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

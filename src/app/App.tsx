"use client";
import { useCallback, useRef, useState } from "react";
import { Sidebar } from "./components/sidebar";
import { TopBar } from "./components/topbar";
import { Hero } from "./components/hero";
import { ActivityPanel } from "./components/sidebars-right";
import { SeoContent } from "./components/seo-content";
import { ContentProvider, useContent } from "./components/content-store";
import { SchemaJsonLd } from "./components/schema-jsonld";
import { ThemeProvider } from "./components/theme-store";
import { MobileTabBar } from "./components/mobile-tabbar";
import { Toaster } from "./components/ui/sonner";
import { trackEvent } from "./lib/analytics";
import type { GameRecord } from "./data/games";

function PlaceholderPage({ title, kicker, line }: { title: string; kicker: string; line: string }) {
  return (
    <div className="relative rounded-2xl border ec-border-brand ec-surface p-10 sm:p-16 text-center hud-corners">
      <span className="hud-c1" /><span className="hud-c2" />
      <div className="text-[var(--ec-accent-orange)] tracking-[0.3em] mb-3" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// {kicker}</div>
      <h2 className="ec-text tracking-tight mb-3 text-[34px] sm:text-[48px]" style={{ fontFamily: "Orbitron", fontWeight: 900 }}>{title}</h2>
      <p className="ec-text-faint max-w-xl mx-auto" style={{ fontFamily: "Rajdhani", fontSize: "16px" }}>{line}</p>
    </div>
  );
}

type ActiveView = "home" | "how-to-play" | "about";

function AppShell() {
  const [view, setView] = useState<ActiveView>("home");
  const [isGamePlaying, setIsGamePlaying] = useState(false);
  const [isGameFocused, setIsGameFocused] = useState(false);
  const playRef = useRef<(() => void) | null>(null);
  const exitGameRef = useRef<(() => void) | null>(null);
  const { game } = useContent();

  const registerPlay = useCallback((fn: () => void) => { playRef.current = fn; }, []);
  const registerExit = useCallback((fn: () => void) => { exitGameRef.current = fn; }, []);

  const triggerPlay = () => {
    if (game.accessMode === "download") {
      if (game.externalSourceUrl) {
        window.open(game.externalSourceUrl, "_blank", "noopener,noreferrer");
        trackEvent("external_source_click", { location: "shell_trigger", game: game.slug, target: game.externalSourceUrl });
      }
      return;
    }

    if (view !== "home") {
      setView("home");
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => playRef.current?.(), 250);
        }, 60);
      });
    } else {
      document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => playRef.current?.(), 250);
    }
  };

  const goView = (v: ActiveView) => {
    if (v === "how-to-play" || v === "about") {
      trackEvent("guide_nav_click", { location: "sidebar", target: v, game: game.slug });
      if (isGamePlaying) {
        exitGameRef.current?.();
      }
      setView("home");
      const targetId = v === "how-to-play" ? "how-to-play-section" : "about-section";
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, isGamePlaying ? 220 : 60);
      });
      return;
    }
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`eclipse-app min-h-screen w-full relative overflow-x-hidden ${isGameFocused ? "game-focus-active" : ""}`} style={{ fontFamily: "Rajdhani, sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ opacity: "var(--ec-blob-opacity, 1)" }}>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-orange-600/10 blur-[120px]" />
        <div className="hidden md:block absolute -right-[280px] top-[180px] w-[680px] h-[680px] eclipse-ring" aria-hidden="true" style={{ opacity: "var(--ec-eclipse-ring-opacity)" }} />
        <div className="hidden md:block absolute -left-[220px] -bottom-[220px] w-[520px] h-[520px] eclipse-ring" aria-hidden="true" style={{ opacity: "var(--ec-eclipse-ring-2-opacity)", animationDuration: "90s", animationDirection: "reverse" }} />
        <div className="absolute inset-0 ec-grid-overlay" style={{ backgroundSize: "80px 80px" }} />
      </div>

      {isGameFocused && <div className="game-focus-overlay" aria-hidden="true" />}

      <div className={`relative flex ${isGameFocused ? "z-[104]" : ""}`}>
        <Sidebar active={view} onChange={goView} />

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-5 sm:py-8 min-w-0 pb-24 lg:pb-8">
          <div className="game-focus-exempt">
            <TopBar />
          </div>

          {view === "home" ? (
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="flex-1 min-w-0 flex flex-col gap-8 sm:gap-10 order-2 lg:order-1">
                <div className={`game-focus-exempt ${isGameFocused ? "relative z-[130]" : ""}`}>
                  <Hero onPlayRef={registerPlay} onExitRef={registerExit} onPlayingChange={setIsGamePlaying} onFocusModeChange={setIsGameFocused} />
                </div>
                <SeoContent />
              </div>
              <div className="order-1 lg:order-2 lg:sticky lg:top-6 self-start">
                <ActivityPanel onPlay={triggerPlay} />
              </div>
            </div>
          ) : view === "how-to-play" ? (
            <PlaceholderPage title="HOW TO PLAY" kicker="GUIDE" line={`Controls, rules, and survival tips for ${game.shortTitle} — see the sections below on the main page for the full guide.`} />
          ) : (
            <PlaceholderPage title="ABOUT" kicker="SOURCE" line={game.accessMode === "download" ? `${game.shortTitle} is covered here as a discovery and official-source guide with platform info, FAQ coverage, and download intent support.` : `${game.shortTitle} is featured here with browser-play guidance, controls, FAQ coverage, and discovery content.`} />
          )}

          <footer className="mt-16 pt-8 border-t ec-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between ec-text-dim tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
            <span>{game.footerTagline ?? `© 2026 ${game.content.title} // FAN LANDING PAGE FOR DISCOVERY`}</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {game.footerStatus ?? "PLAY IN BROWSER · DESKTOP RECOMMENDED"}
            </span>
          </footer>
        </main>
      </div>

      <MobileTabBar active={view} onChange={goView} onPlay={triggerPlay} />
      <Toaster />
    </div>
  );
}

export default function App({ game }: { game: GameRecord }) {
  return (
    <ThemeProvider>
      <ContentProvider game={game}>
        <SchemaJsonLd game={game} />
        <AppShell />
      </ContentProvider>
    </ThemeProvider>
  );
}

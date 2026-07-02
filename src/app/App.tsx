"use client";
import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Sidebar } from "./components/sidebar";
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
    <div className="relative rounded-[2rem] border-2 border-foreground bg-card p-10 sm:p-16 text-center shadow-[6px_6px_0_#24312c]">
      <div className="text-muted-foreground tracking-[0.3em] mb-3" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// {kicker}</div>
      <h2 className="text-foreground tracking-tight mb-3 text-[34px] sm:text-[48px]" style={{ fontFamily: "Fredoka", fontWeight: 900 }}>{title}</h2>
      <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontFamily: "Nunito", fontSize: "16px" }}>{line}</p>
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
    <div className={`min-h-screen w-full relative overflow-x-hidden bg-background ${isGameFocused ? "game-focus-active" : ""}`} style={{ fontFamily: "Nunito, sans-serif" }}>
      {/* Background pattern — matching homepage */}
      <div className="pointer-events-none fixed inset-0 [background:linear-gradient(rgba(36,49,44,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(36,49,44,.03)_1px,transparent_1px)] [background-size:40px_40px]" />

      {isGameFocused && <div className="game-focus-overlay" aria-hidden="true" />}

      <div className={`relative flex ${isGameFocused ? "z-[104]" : ""}`}>
        <Sidebar active={view} onChange={goView} />

        <main className="flex-1 px-4 sm:px-6 py-5 sm:py-8 min-w-0 pb-24 lg:pb-8 md:pl-[268px]">
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

          <footer className="mt-16 pt-8 border-t-2 border-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-muted-foreground tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
            <span>{game.footerTagline ?? `© 2026 ${game.content.title} // FAN LANDING PAGE FOR DISCOVERY`}</span>
            <span className="flex items-center gap-4">
              <Link href="/" className="hover:text-foreground transition-colors">← HOME</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">PRIVACY</Link>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {game.footerStatus ?? "PLAY IN BROWSER · DESKTOP RECOMMENDED"}
              </span>
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

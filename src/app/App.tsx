import { useCallback, useRef, useState } from "react";
import { Sidebar } from "./components/sidebar";
import { TopBar } from "./components/topbar";
import { Hero } from "./components/hero";
import { ActivityPanel } from "./components/sidebars-right";
import { SeoContent } from "./components/seo-content";
import { ContentEditor } from "./components/content-editor";
import { ContentProvider, useContent } from "./components/content-store";
import { SchemaJsonLd } from "./components/schema-jsonld";
import { ThemeProvider } from "./components/theme-store";
import { MobileTabBar } from "./components/mobile-tabbar";
import { Toaster } from "./components/ui/sonner";
import { SeoHead } from "./components/seo-head";

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

type ActiveView = "home" | "how-to-play" | "about" | "admin";

function AppShell() {
  const [view, setView] = useState<ActiveView>("home");
  const playRef = useRef<(() => void) | null>(null);
  const { content } = useContent();

  const registerPlay = useCallback((fn: () => void) => { playRef.current = fn; }, []);

  const triggerPlay = () => {
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
      setView("home");
      const targetId = v === "how-to-play" ? "how-to-play-section" : "about-section";
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
      });
      return;
    }
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SeoHead
        title={content.seoTitle}
        canonical="https://zowgame.com/cobb-can-move/"
        description={content.seoDescription}
        keywords={content.seoKeywords}
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

        <div className="relative flex">
          <Sidebar active={view} onChange={goView} />

          <main className="flex-1 px-4 sm:px-6 lg:px-10 py-5 sm:py-8 min-w-0 pb-24 lg:pb-8">
            <TopBar />

            {view === "home" ? (
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-1 min-w-0 flex flex-col gap-8 sm:gap-10 order-2 lg:order-1">
                  <Hero onPlayRef={registerPlay} />
                  <SeoContent />
                </div>
                <div className="order-1 lg:order-2 lg:sticky lg:top-6 self-start">
                  <ActivityPanel onPlay={triggerPlay} />
                </div>
              </div>
            ) : view === "admin" ? (
              <ContentEditor />
            ) : view === "how-to-play" ? (
              <PlaceholderPage title="HOW TO PLAY" kicker="GUIDE" line="Controls, dungeon rules, and survival tips for Cobb Can Move — see the sections below on the main page for the full guide." />
            ) : (
              <PlaceholderPage title="ABOUT" kicker="SOURCE" line="Cobb Can Move is a survival horror game by abho and team. This page focuses on browser play, guidance, and discovery." />
            )}

            <footer className="mt-16 pt-8 border-t ec-border flex items-center justify-between ec-text-dim tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
              <span>© 2026 COBB CAN MOVE // FAN LANDING PAGE FOR DISCOVERY</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                PLAY IN BROWSER · DESKTOP RECOMMENDED
              </span>
            </footer>
          </main>
        </div>

        <MobileTabBar active={view} onChange={goView} onPlay={triggerPlay} />


        <Toaster />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <SchemaJsonLd />
        <AppShell />
      </ContentProvider>
    </ThemeProvider>
  );
}

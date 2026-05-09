import { useState } from "react";
import { Sidebar, ViewId } from "./components/sidebar";
import { TopBar } from "./components/topbar";
import { Hero } from "./components/hero";
import { ActivityPanel } from "./components/sidebars-right";
import { SeoContent } from "./components/seo-content";
import { ContentEditor } from "./components/content-editor";
import { ContentProvider } from "./components/content-store";
import { CustomCursor } from "./components/custom-cursor";
import { SchemaJsonLd } from "./components/schema-jsonld";

function PlaceholderPage({ title, kicker, line }: { title: string; kicker: string; line: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f0020]/60 p-16 text-center">
      <div className="text-fuchsia-400 tracking-[0.3em] mb-3" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// {kicker}</div>
      <h2 className="text-white tracking-tight mb-3" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "48px" }}>{title}</h2>
      <p className="text-white/50 max-w-xl mx-auto" style={{ fontFamily: "Rajdhani", fontSize: "16px" }}>{line}</p>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<ViewId>("home");

  return (
    <ContentProvider>
    <SchemaJsonLd />
    <div className="min-h-screen w-full bg-[#06000f] text-white relative overflow-x-hidden" style={{ fontFamily: "Rajdhani, sans-serif" }}>
      <CustomCursor />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-purple-700/15 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative flex">
        <Sidebar active={view} onChange={setView} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-5 sm:py-8 min-w-0">
          <TopBar />
          {view === "home" ? (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 min-w-0 flex flex-col gap-8 sm:gap-10 order-2 lg:order-1">
                <Hero />
                <SeoContent />
              </div>
              <div className="order-1 lg:order-2">
                <ActivityPanel />
              </div>
            </div>
          ) : view === "admin" ? (
            <ContentEditor />
          ) : view === "how-to-play" ? (
            <PlaceholderPage title="HOW TO PLAY" kicker="GUIDE" line="Controls, mechanics and tips for surviving Eclipse Protocol — coming soon." />
          ) : (
            <PlaceholderPage title="ABOUT" kicker="THE TEAM" line="Three people, one game, zero compromises. Read the story." />
          )}
          <footer className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between text-white/30 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
            <span>© 2026 ECLIPSE PROTOCOL // ALL SYSTEMS NOMINAL</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SERVERS_ONLINE — 47ms PING
            </span>
          </footer>
        </main>
      </div>
    </div>
    </ContentProvider>
  );
}

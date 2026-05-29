"use client";

import { useState } from "react";
import { Sidebar, ViewId } from "./components/sidebar";
import { TopBar } from "./components/topbar";
import { Hero } from "./components/hero";
import { ActivityPanel } from "./components/sidebars-right";
import { SeoContent } from "./components/seo-content";
import { ContentEditor } from "./components/content-editor";
import { ContentProvider } from "./components/content-store";
import { SchemaJsonLd } from "./components/schema-jsonld";

function PlaceholderPage({ title, kicker, line }: { title: string; kicker: string; line: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-16 text-center">
      <div className="text-indigo-400 tracking-[0.3em] mb-3 font-mono text-xs">// {kicker}</div>
      <h2 className="text-white tracking-tight mb-3 font-semibold text-4xl">{title}</h2>
      <p className="text-slate-400 max-w-xl mx-auto">{line}</p>
    </div>
  );
}

export default function AppShell() {
  const [view, setView] = useState<ViewId>("home");

  return (
    <ContentProvider>
      <SchemaJsonLd />
      <div className="min-h-screen w-full bg-slate-950 text-slate-100 relative overflow-x-hidden">
        {/* Ambient background glow — subtle, anchored to top */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[140px]" />
          <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-violet-700/8 blur-[120px]" />
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
              <PlaceholderPage title="HOW TO PLAY" kicker="GUIDE" line="Controls, mechanics and tips for the game — coming soon." />
            ) : (
              <PlaceholderPage title="ABOUT" kicker="THE TEAM" line="Learn more about the team behind the game." />
            )}
            <footer className="mt-16 pt-8 border-t border-slate-800 flex items-center justify-between text-slate-500 text-sm">
              <span>© {new Date().getFullYear()} Gaming Website. All rights reserved.</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                Online
              </span>
            </footer>
          </main>
        </div>
      </div>
    </ContentProvider>
  );
}

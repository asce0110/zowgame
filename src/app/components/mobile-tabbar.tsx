"use client";
import { Home, Gamepad2, BookOpen } from "lucide-react";
import { vibrate } from "../lib/haptics";
import { useContent } from "./content-store";

type AppView = "home" | "how-to-play" | "about";
type Tab = { id: AppView | "play"; label: string; icon: any; accent: string };

export function MobileTabBar({
  active,
  onChange,
  onPlay,
}: {
  active: AppView;
  onChange: (v: AppView) => void;
  onPlay: () => void;
}) {
  const { game } = useContent();
  const playLabel = game.accessMode === "download" ? "Source" : "Play";

  const tabs: Tab[] = [
    { id: "home", label: "Home", icon: Home, accent: "text-fuchsia-500" },
    { id: "play", label: playLabel, icon: Gamepad2, accent: "text-cyan-500" },
    { id: "how-to-play", label: "Guide", icon: BookOpen, accent: "text-violet-500" },
  ];

  const handle = (id: Tab["id"]) => {
    vibrate(8);
    if (id === "play") return onPlay();
    onChange(id as AppView);
  };

  return (
    <nav aria-label="Primary navigation" className="lg:hidden fixed bottom-0 left-0 right-0 z-40" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 10px)" }}>
      <div className="mx-3 mb-3 rounded-[22px] border ec-border-brand ec-surface-strong backdrop-blur-xl overflow-visible hud-corners" style={{ boxShadow: "var(--ec-shadow-card)" }}>
        <span className="hud-c1" /><span className="hud-c2" />
        <div className="grid grid-cols-3 pt-2 pb-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = (t.id === "home" && active === "home") || (t.id === "how-to-play" && active === "how-to-play");
            const isBig = t.id === "play";
            return (
              <button
                key={t.id}
                onClick={() => handle(t.id)}
                className={`relative flex flex-col items-center justify-center gap-1 py-2 min-h-[60px] active:scale-95 transition-transform cursor-pointer ${
                  isActive ? "ec-text" : "ec-text-faint hover:ec-text"
                }`}
              >
                {isBig ? (
                  <span className="ec-mobile-play-pill relative -mt-7 w-14 h-14 rounded-full flex items-center justify-center ring-4">
                    <span className="ec-mobile-play-glow absolute inset-0 rounded-full -z-10" />
                    <Icon className="w-5 h-5 text-white" />
                  </span>
                ) : (
                  <span className="relative">
                    <Icon className={`w-5 h-5 ${isActive ? t.accent : ""}`} />
                  </span>
                )}
                <span className="tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{t.label}</span>
                {isActive && !isBig && <span className={`absolute top-1 w-6 h-0.5 rounded-full ${t.accent} bg-current`} />}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

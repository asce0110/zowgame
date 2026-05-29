"use client";
import { Home, Gamepad2, BookOpen } from "lucide-react";
import { vibrate } from "../lib/haptics";

type AppView = "home" | "how-to-play" | "about" | "admin";
type Tab = { id: AppView | "play"; label: string; icon: any; accent: string };

const tabs: Tab[] = [
  { id: "home", label: "Home", icon: Home, accent: "text-fuchsia-500" },
  { id: "play", label: "Play", icon: Gamepad2, accent: "text-cyan-500" },
  { id: "how-to-play", label: "Guide", icon: BookOpen, accent: "text-violet-500" },
];

export function MobileTabBar({
  active,
  onChange,
  onPlay,
}: {
  active: AppView;
  onChange: (v: AppView) => void;
  onPlay: () => void;
}) {
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
                  <span className="relative -mt-7 w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-[0_0_24px_rgba(255,107,26,0.55)] ring-4 ring-[rgba(6,0,15,0.55)]">
                    <span className="absolute inset-0 rounded-full bg-fuchsia-500 blur-md opacity-50 -z-10" />
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

"use client";
import { useEffect, useState } from "react";
import { Zap, Keyboard, Gamepad2, Star, Clock, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { vibrate } from "../lib/haptics";
import { trackEvent } from "../lib/analytics";
import { useContent } from "./content-store";

export function ActivityPanel({ onPlay }: { onPlay?: () => void }) {
  const { content, game } = useContent();
  const [showSticky, setShowSticky] = useState(false);
  const isBrowserGame = game.accessMode !== "download";

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className="w-full lg:w-[360px] shrink-0 flex flex-col gap-5">
      {/* Quick Play Card */}
      <div className="relative rounded-2xl overflow-hidden border border-amber-700/20 bg-primary shadow-[0_0_40px_rgba(0,0,0,0.4)]">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-primary-foreground/80 tracking-widest font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
              {isBrowserGame ? "PLAY INSTANTLY" : "OFFICIAL SOURCE"}
            </span>
          </div>
          <h3 className="text-primary-foreground leading-tight mb-4" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "20px" }}>
            {isBrowserGame ? "No download needed. Open in browser now." : "Unofficial discovery guide. All details below."}
          </h3>
          {isBrowserGame ? (
            <button
              onClick={() => {
                vibrate(12);
                trackEvent("play_click", { location: "side_card", game: game.slug });
                onPlay?.();
              }}
              className="w-full py-3 rounded-xl border border-amber-700/20 bg-primary-foreground text-primary font-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] shadow-[3px_3px_0_#24312c] transition-all tracking-widest cursor-pointer"
              style={{ fontFamily: "Nunito", fontSize: "13px" }}
            >
              {game.primaryCtaLabel} →
            </button>
          ) : null}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3">
        <StatBox icon={Star} label="RATING" value={content.rating} color="text-yellow-500" suffix="/5" />
        <StatBox icon={Clock} label={isBrowserGame ? "AVG SESSION" : "TYPE"} value={isBrowserGame ? content.avgSession : "DL"} color="text-primary" suffix={isBrowserGame ? "min" : ""} />
      </div>

      {/* Quick Facts */}
      <div className="rounded-2xl border border-amber-700/20 bg-card p-5 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
        <h4 className="text-foreground tracking-widest mb-4" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "14px" }}>{game.quickFactsHeading}</h4>
        <div className="flex flex-col gap-3">
          {game.quickFacts.map((fact) => (
            <InfoRow
              key={fact.label}
              icon={fact.label === "Controls" ? Keyboard : fact.label === "Input" ? Gamepad2 : Zap}
              label={fact.label}
              value={fact.value}
            />
          ))}
        </div>
      </div>

      {/* Sticky Back-to-Home */}
      <div className={`hidden lg:block transition-all duration-300 ${showSticky ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-amber-700/20 bg-card font-extrabold text-foreground hover:bg-secondary shadow-[3px_3px_0_#24312c] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] transition-all cursor-pointer"
          style={{ fontFamily: "Nunito", fontSize: "13px" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Games
        </Link>
      </div>
    </aside>
  );
}

function StatBox({ icon: Icon, label, value, color, suffix }: { icon: any; label: string; value: string; color: string; suffix?: string }) {
  return (
    <div className="rounded-xl border border-amber-700/20 bg-card p-4 shadow-[3px_3px_0_#24312c]">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={`w-3.5 h-3.5 ${color}`} />
        <span className="text-muted-foreground tracking-widest font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{label}</span>
      </div>
      <div className="text-foreground tabular-nums" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "26px" }}>
        {value}{suffix ? <span className="text-muted-foreground text-base">{suffix}</span> : null}
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border-2 border-border px-3 py-2.5 bg-input-background">
      <Icon className="w-4 h-4 text-primary shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-muted-foreground tracking-widest font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{label}</div>
        <div className="text-foreground truncate font-bold" style={{ fontSize: "13px" }}>{value}</div>
      </div>
    </div>
  );
}

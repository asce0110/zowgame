"use client";
import { useEffect, useState } from "react";
import { Zap, Radio, Download, Keyboard, Gamepad2, ExternalLink } from "lucide-react";
import { vibrate } from "../lib/haptics";
import { usePresence } from "../lib/presence";
import { trackEvent } from "../lib/analytics";
import { useContent } from "./content-store";

export function ActivityPanel({ onPlay }: { onPlay?: () => void }) {
  const { game } = useContent();
  const [pulseIdx, setPulseIdx] = useState(0);
  const [ambientIdx, setAmbientIdx] = useState(0);
  const [showFloatingCard, setShowFloatingCard] = useState(false);
  const { inGame: onlineNow } = usePresence();
  const isBrowserGame = game.accessMode !== "download";

  useEffect(() => {
    const t = setInterval(() => setPulseIdx((i) => (i + 1) % game.livePulses.length), 3500);
    return () => clearInterval(t);
  }, [game.livePulses.length]);

  useEffect(() => {
    const t = setInterval(() => setAmbientIdx((i) => (i + 1) % game.ambientMessages.length), 5000);
    return () => clearInterval(t);
  }, [game.ambientMessages.length]);

  useEffect(() => {
    const onScroll = () => setShowFloatingCard(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const quickAction = isBrowserGame ? (
    <button
      onClick={() => {
        vibrate(12);
        trackEvent("play_click", { location: "quick_card", game: game.slug });
        onPlay?.();
      }}
      className="w-full py-3 rounded-xl ec-quick-match-btn hover:scale-[1.02] active:scale-95 transition-transform tracking-widest cursor-pointer min-h-[44px]"
      style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}
    >
      {game.primaryCtaLabel} →
    </button>
  ) : (
    <a
      href={game.externalSourceUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        vibrate(12);
        trackEvent("external_source_click", { location: "quick_card", game: game.slug, target: game.externalSourceUrl });
      }}
      className="w-full py-3 rounded-xl ec-quick-match-btn hover:scale-[1.02] active:scale-95 transition-transform tracking-widest cursor-pointer min-h-[44px] inline-flex items-center justify-center gap-2"
      style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}
    >
      <ExternalLink className="w-4 h-4" />
      {game.primaryCtaLabel}
    </a>
  );

  return (
    <aside className="w-full lg:w-[340px] shrink-0 flex flex-col gap-6">
      <div className="relative rounded-2xl border ec-border-brand ec-surface backdrop-blur p-5 overflow-hidden hud-corners" style={{ boxShadow: "var(--ec-shadow-card)" }}>
        <span className="hud-c1" /><span className="hud-c2" />
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl ec-side-blob" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
              </span>
              <span className="ec-text tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>{game.activityHeading ?? "PLAYING NOW"}</span>
            </div>
            <span className="ec-text-faint tracking-widest tabular-nums" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{onlineNow.toLocaleString()}</span>
          </div>

          <div className="h-14 relative overflow-hidden rounded-xl border ec-hairline" style={{ background: "var(--ec-input-bg)" }}>
            {game.livePulses.map((p, i) => (
              <div key={i} className="absolute inset-0 flex items-center gap-3 px-4 transition-all duration-700" style={{ opacity: i === pulseIdx ? 1 : 0, transform: `translateY(${i === pulseIdx ? 0 : i < pulseIdx ? -20 : 20}px)` }}>
                <span className="text-2xl">{p.icon}</span>
                <span className={`flex-1 truncate ${p.weight === "epic" ? "ec-live-pulse-epic" : p.weight === "hot" ? "ec-live-pulse-hot" : "ec-text-muted"}`} style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "13px" }}>
                  {p.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`hidden lg:block transition-all duration-300 ${showFloatingCard ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"}`}>
        <div className="relative rounded-2xl overflow-hidden p-5 ec-quick-match-card" style={{ boxShadow: "var(--ec-shadow-card)" }}>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 ec-quick-match-zap" />
              <span className="ec-quick-match-text tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "11px" }}>{game.quickActionEyebrow ?? "PLAY INSTANTLY"}</span>
            </div>
            <div className="ec-quick-match-text mb-3 leading-tight" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "22px" }} dangerouslySetInnerHTML={{ __html: game.quickActionTitle ?? "No download for browser play.<br />Desktop recommended." }} />
            {quickAction}
          </div>
        </div>
      </div>

      <div className="lg:hidden relative rounded-2xl overflow-hidden p-4 ec-quick-match-card" style={{ boxShadow: "var(--ec-shadow-card)" }}>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 ec-quick-match-zap" />
            <span className="ec-quick-match-text tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "11px" }}>{game.quickActionEyebrow ?? "PLAY INSTANTLY"}</span>
          </div>
          <div className="ec-quick-match-text mb-3 leading-tight" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "20px" }} dangerouslySetInnerHTML={{ __html: game.quickActionTitle ?? "No download for browser play.<br />Desktop recommended." }} />
          {quickAction}
        </div>
      </div>

      <div className="relative rounded-2xl border ec-border ec-surface backdrop-blur p-5 hud-corners" style={{ boxShadow: "var(--ec-shadow-card)" }}>
        <span className="hud-c1" /><span className="hud-c2" />
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-4 h-4 text-cyan-500" />
          <span className="ec-text tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>{game.quickFactsHeading}</span>
        </div>
        <div className="flex flex-col gap-3">
          {game.quickFacts.map((fact) => (
            <InfoRow
              key={fact.label}
              icon={fact.label === "Controls" ? Keyboard : fact.label === "Input" ? Gamepad2 : Radio}
              label={fact.label}
              value={fact.value}
            />
          ))}
        </div>
      </div>

      <div className="px-3 py-2 rounded-lg border ec-hairline ec-surface h-9 relative overflow-hidden flex items-center">
        <Radio className="w-3 h-3 text-emerald-500 shrink-0 mr-2" />
        <div className="flex-1 relative h-5">
          {game.ambientMessages.map((a, i) => (
            <div key={i} className="absolute inset-0 ec-text-faint truncate transition-all duration-700" style={{ opacity: i === ambientIdx ? 1 : 0, transform: `translateY(${i === ambientIdx ? 0 : 8}px)`, fontFamily: "Rajdhani", fontSize: "11px" }}>
              {a}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border ec-hairline px-3 py-3" style={{ background: "var(--ec-input-bg)" }}>
      <Icon className="w-4 h-4 text-cyan-500 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{label}</div>
        <div className="ec-text truncate" style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "13px" }}>{value}</div>
      </div>
    </div>
  );
}

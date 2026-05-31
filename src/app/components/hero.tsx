"use client";
import Link from "next/link";
import { Play, Users, Star, Zap, Radio, ExternalLink, ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useContent } from "./content-store";
import { GamePlayer } from "./game-player";
import { TrailerModal } from "./trailer-modal";
import { usePresence } from "../lib/presence";
import { vibrate } from "../lib/haptics";
import { trackEvent } from "../lib/analytics";

export function Hero({ onPlayRef, onExitRef, onPlayingChange, onFocusModeChange }: { onPlayRef?: (fn: () => void) => void; onExitRef?: (fn: () => void) => void; onPlayingChange?: (playing: boolean) => void; onFocusModeChange?: (focused: boolean) => void }) {
  const { content, game } = useContent();
  const { inGame: players } = usePresence();
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [playing, setPlaying] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [ready, setReady] = useState(12);
  const playBtnRef = useRef<HTMLButtonElement | null>(null);
  const titleParts = content.title.split(/\s+/);
  const titleHead = titleParts.slice(0, -1).join(" ");
  const titleTail = titleParts[titleParts.length - 1] || "";
  const isBrowserGame = game.accessMode !== "download";

  useEffect(() => {
    if (!isBrowserGame || playing) return;
    const t = setInterval(() => setReady((r) => (r <= 1 ? 12 : r - 1)), 1000);
    return () => clearInterval(t);
  }, [isBrowserGame, playing]);

  const handlePlay = () => {
    if (!isBrowserGame) return;
    vibrate(15);
    trackEvent("play_click", { location: "hero", game: game.slug });
    setPlaying(true);
  };

  useEffect(() => {
    if (onPlayRef) onPlayRef(handlePlay);
  }, [onPlayRef, game.slug, isBrowserGame, content.title, content.coverImg, content.genre]);

  useEffect(() => {
    if (onExitRef) onExitRef(() => setPlaying(false));
  }, [onExitRef]);

  useEffect(() => {
    onPlayingChange?.(playing);
  }, [playing, onPlayingChange]);

  if (isBrowserGame && playing) {
    return (
      <div className="animate-[fadeIn_0.4s_ease]">
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.98) } to { opacity: 1; transform: scale(1) } }`}</style>
        <GamePlayer src={content.iframeUrl} title={content.title} onExit={() => setPlaying(false)} onFocusModeChange={onFocusModeChange} />
      </div>
    );
  }

  return (
    <section
      id="hero-section"
      className="relative h-[520px] sm:h-[560px] lg:h-[640px] rounded-2xl sm:rounded-3xl overflow-hidden border ec-border-brand group hud-corners"
      style={{ boxShadow: "var(--ec-shadow-card)" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
    >
      <span className="hud-c1" /><span className="hud-c2" />

      {content.coverImg ? (
        <img
          src={content.coverImg.includes("unsplash.com") ? `${content.coverImg}&fm=avif` : content.coverImg}
          alt={content.title}
          width={1800}
          height={1013}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[8s]"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.28),transparent_30%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_28%),linear-gradient(135deg,rgba(11,15,25,0.96),rgba(22,27,40,0.98))]" />
      )}
      <div className="absolute inset-0" style={{ background: "var(--ec-hero-overlay)" }} />
      <div className="absolute inset-0" style={{ background: "var(--ec-hero-overlay-bottom)" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/15 via-purple-600/10 to-cyan-400/15 mix-blend-overlay ec-hero-accent-overlay" />

      <div
        className="absolute inset-0 opacity-30 pointer-events-none hidden sm:block ec-hero-grid"
        style={{
          maskImage: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, black, transparent 60%)`,
          WebkitMaskImage: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, black, transparent 60%)`,
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden sm:block ec-hero-spotlight"
        style={{
          left: `calc(${mouse.x}% - 300px)`,
          top: `calc(${mouse.y}% - 300px)`,
        }}
      />

      <div className="relative h-full flex flex-col justify-between p-5 sm:p-8 lg:p-12 z-10">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {game.heroBadges.map((badge, index) => {
            const badgeClassNames = [
              "bg-cyan-500/10 border-cyan-500/40 text-cyan-600 dark:text-cyan-300",
              "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-300",
              "bg-yellow-500/15 border-yellow-500/50 text-yellow-600 dark:text-yellow-300 hidden sm:flex",
            ];
            return (
              <span
                key={badge}
                className={`px-3 py-1 rounded-full border tracking-widest flex items-center gap-2 ${badgeClassNames[index] ?? "bg-white/10 border-white/15 text-white"}`}
                style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}
              >
                {index === 0 ? <Radio className="w-3 h-3" /> : null}
                {index === 1 ? <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> : null}
                {index === 2 ? <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> : null}
                {badge}
              </span>
            );
          })}
        </div>

        <div className="max-w-3xl">
          <div className="inline-block mb-3 sm:mb-4 px-3 py-1 rounded-md ec-hero-kicker">
            <span className="text-white tracking-[0.3em]" style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "11px" }}>{content.genre}</span>
          </div>
          <h1 className="ec-text mb-3 sm:mb-5 leading-[0.85] tracking-tight text-[44px] sm:text-[80px] lg:text-[112px]" style={{ fontFamily: "Orbitron", fontWeight: 900 }}>
            {titleHead}
            {titleHead && <br />}
            <span className="bg-gradient-to-r from-orange-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">{titleTail}</span>
          </h1>
          <p className="ec-text-muted max-w-xl mb-5 sm:mb-8 leading-relaxed line-clamp-3 sm:line-clamp-none" style={{ fontFamily: "Rajdhani", fontSize: "16px" }}>
            {content.subtitle}
          </p>

          {isBrowserGame ? (
            <div className="flex items-center gap-2 mb-3 ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-75" />
                <span className="relative rounded-full w-2 h-2 bg-orange-400" />
              </span>
              READY TO DROP IN <span className="text-orange-500 tabular-nums">{String(ready).padStart(2, "0")}s</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-3 ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
                <span className="relative rounded-full w-2 h-2 bg-cyan-400" />
              </span>
              OFFICIAL SOURCE · DOWNLOAD-FIRST GUIDE
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
            {isBrowserGame ? (
              <button
                ref={playBtnRef}
                onClick={handlePlay}
                className="group/btn relative w-full sm:w-auto px-6 sm:px-12 py-5 sm:py-5 rounded-xl bg-gradient-to-r from-orange-500 via-fuchsia-500 to-cyan-400 text-white overflow-hidden transition-transform hover:scale-105 active:scale-95 min-h-[56px] cursor-pointer"
                style={{ boxShadow: "var(--ec-glow-orange)" }}
              >
                <span className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-3 tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "16px" }}>
                  <Play className="w-6 h-6 fill-white" />
                  {game.primaryCtaLabel}
                </span>
              </button>
            ) : (
              <a
                href={game.externalSourceUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  vibrate(12);
                  trackEvent("external_source_click", { location: "hero", game: game.slug, target: game.externalSourceUrl });
                }}
                className="group/btn relative w-full sm:w-auto px-6 sm:px-12 py-5 sm:py-5 rounded-xl bg-gradient-to-r from-orange-500 via-fuchsia-500 to-cyan-400 text-white overflow-hidden transition-transform hover:scale-105 active:scale-95 min-h-[56px] cursor-pointer"
                style={{ boxShadow: "var(--ec-glow-orange)" }}
              >
                <span className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-3 tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "16px" }}>
                  <ExternalLink className="w-5 h-5" />
                  {game.primaryCtaLabel}
                </span>
              </a>
            )}
            {isBrowserGame ? (
              <button
                onClick={() => {
                  vibrate(8);
                  trackEvent("trailer_open", { location: "hero", game: game.slug });
                  setTrailerOpen(true);
                }}
                className="px-6 py-4 sm:py-5 rounded-xl border ec-border-strong backdrop-blur ec-surface ec-text ec-hover-surface transition-all flex items-center justify-center gap-3 tracking-widest min-h-[48px] cursor-pointer"
                style={{ fontFamily: "Orbitron", fontWeight: 500, fontSize: "13px" }}
              >
                <Zap className="w-4 h-4 text-yellow-500" />
                {game.secondaryCtaLabel}
              </button>
            ) : (
              <Link
                href="/"
                className="px-6 py-4 sm:py-5 rounded-xl border ec-border-strong backdrop-blur ec-surface ec-text ec-hover-surface transition-all flex items-center justify-center gap-3 tracking-widest min-h-[48px] cursor-pointer"
                style={{ fontFamily: "Orbitron", fontWeight: 500, fontSize: "13px" }}
              >
                <ArrowLeft className="w-4 h-4 text-cyan-400" />
                {game.secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>

        <div className="hidden sm:flex items-end justify-between">
          <div className="flex items-center gap-6 lg:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-cyan-500" />
                <span className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{game.activityCountLabel ?? "PLAYING NOW"}</span>
              </div>
              <div className="ec-text tabular-nums" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "30px" }}>{players.toLocaleString()}</div>
            </div>
            <div className="w-px h-12" style={{ background: "var(--ec-border)" }} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>OFFICIAL PAGE RATING</span>
              </div>
              <div className="ec-text" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "30px" }}>{content.rating} <span className="ec-text-dim" style={{ fontSize: "16px" }}>/5</span></div>
            </div>
            <div className="w-px h-12" style={{ background: "var(--ec-border)" }} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{isBrowserGame ? "AVG. RUN" : "AVG. SESSION"}</span>
              </div>
              <div className="ec-text" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "30px" }}>{content.avgSession}<span className="ec-text-dim" style={{ fontSize: "16px" }}>min</span></div>
            </div>
          </div>
        </div>
      </div>
      {isBrowserGame && trailerOpen ? <TrailerModal url={content.trailerUrl} title={content.title} onClose={() => setTrailerOpen(false)} /> : null}
    </section>
  );
}

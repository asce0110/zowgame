"use client";
import { Play, Star, Zap, Radio, BookOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useContent } from "./content-store";
import { GamePlayer } from "./game-player";
import { TrailerModal } from "./trailer-modal";
import { vibrate } from "../lib/haptics";
import { trackEvent } from "../lib/analytics";

export function Hero({ onPlayRef, onExitRef, onPlayingChange, onFocusModeChange }: { onPlayRef?: (fn: () => void) => void; onExitRef?: (fn: () => void) => void; onPlayingChange?: (playing: boolean) => void; onFocusModeChange?: (focused: boolean) => void }) {
  const { content, game } = useContent();
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

  useEffect(() => { if (onPlayRef) onPlayRef(handlePlay); }, [onPlayRef, game.slug, isBrowserGame, content.title, content.coverImg, content.genre]);
  useEffect(() => { if (onExitRef) onExitRef(() => setPlaying(false)); }, [onExitRef]);
  useEffect(() => { onPlayingChange?.(playing); }, [playing, onPlayingChange]);

  if (isBrowserGame && playing) {
    return (
      <div className="animate-[fadeIn_0.4s_ease]">
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.98) } to { opacity: 1; transform: scale(1) } }`}</style>
        <GamePlayer src={content.iframeUrl} title={content.title} onExit={() => setPlaying(false)} onFocusModeChange={onFocusModeChange} />
      </div>
    );
  }

  return (
    <section id="hero-section" className="relative h-[520px] sm:h-[560px] lg:h-[640px] rounded-[2rem] overflow-hidden border-2 border-foreground group shadow-[8px_8px_0_#24312c]">
      {content.coverImg ? (
        <img src={content.coverImg.includes("unsplash.com") ? `${content.coverImg}&fm=avif` : content.coverImg} alt={content.title} width={1800} height={1013} fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[8s]" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 via-lime-100 to-orange-100" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/50 to-transparent" />

      <div className="relative h-full flex flex-col justify-between p-5 sm:p-8 lg:p-12 z-10">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {game.heroBadges.map((badge, index) => {
            const badgeStyles = [
              "border-2 border-foreground bg-card/90 text-foreground backdrop-blur",
              "border-2 border-foreground bg-card/90 text-foreground backdrop-blur",
              "border-2 border-foreground bg-card/90 text-foreground backdrop-blur hidden sm:flex",
            ];
            return (
              <span key={badge} className={`px-3 py-1 rounded-full border-2 tracking-widest flex items-center gap-2 ${badgeStyles[index] ?? "border-2 border-foreground bg-card text-foreground"}`} style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
                {index === 0 ? <Radio className="w-3 h-3" /> : null}
                {index === 1 ? <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> : null}
                {index === 2 ? <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> : null}
                {badge}
              </span>
            );
          })}
        </div>

        <div className="max-w-3xl text-white">
          <div className="inline-block mb-3 sm:mb-4 px-3 py-1 rounded-md border-2 border-foreground bg-accent text-accent-foreground">
            <span className="tracking-[0.3em] font-extrabold" style={{ fontFamily: "Nunito", fontSize: "11px" }}>{content.genre}</span>
          </div>
          <h1 className="mb-3 sm:mb-5 leading-[0.85] tracking-tight text-[44px] sm:text-[80px] lg:text-[112px]" style={{ fontFamily: "Fredoka", fontWeight: 900 }}>
            {content.title}
          </h1>
          <p className="text-white/80 max-w-xl mb-5 sm:mb-8 leading-relaxed line-clamp-3 sm:line-clamp-none font-bold" style={{ fontSize: "16px" }}>{content.subtitle}</p>

          {isBrowserGame ? (
            <div className="flex items-center gap-2 mb-3 text-white/60 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
              <span className="relative flex w-2 h-2"><span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" /><span className="relative rounded-full w-2 h-2 bg-accent" /></span>
              READY TO DROP IN <span className="text-accent tabular-nums font-extrabold">{String(ready).padStart(2, "0")}s</span>
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
            {isBrowserGame ? (
              <button ref={playBtnRef} onClick={handlePlay} className="group/btn relative w-full sm:w-auto px-6 sm:px-12 py-5 rounded-2xl border-2 border-foreground bg-primary text-primary-foreground font-black overflow-hidden transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] shadow-[4px_4px_0_#24312c] active:scale-95 min-h-[56px] cursor-pointer">
                <span className="relative flex items-center justify-center gap-3 tracking-widest" style={{ fontFamily: "Nunito", fontWeight: 900, fontSize: "16px" }}><Play className="w-6 h-6 fill-primary-foreground" />{game.primaryCtaLabel}</span>
              </button>
            ) : (
              <button onClick={() => { vibrate(8); trackEvent("guide_scroll", { location: "hero", game: game.slug }); document.getElementById("how-to-play-section")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="group/btn relative w-full sm:w-auto px-6 sm:px-12 py-5 rounded-2xl border-2 border-foreground bg-primary text-primary-foreground font-black overflow-hidden transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] shadow-[4px_4px_0_#24312c] active:scale-95 min-h-[56px] cursor-pointer">
                <span className="relative flex items-center justify-center gap-3 tracking-widest" style={{ fontFamily: "Nunito", fontWeight: 900, fontSize: "16px" }}><BookOpen className="w-5 h-5" />View Game Guide ↓</span>
              </button>
            )}
            {isBrowserGame ? (
              <button onClick={() => { vibrate(8); trackEvent("trailer_open", { location: "hero", game: game.slug }); setTrailerOpen(true); }} className="px-6 py-4 sm:py-5 rounded-2xl border-2 border-foreground bg-card text-foreground font-extrabold hover:bg-secondary transition-all flex items-center justify-center gap-3 tracking-widest min-h-[48px] shadow-[3px_3px_0_#24312c] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] cursor-pointer" style={{ fontFamily: "Nunito", fontSize: "13px" }}>
                <Zap className="w-4 h-4 text-yellow-500" />{game.secondaryCtaLabel}
              </button>
            ) : null}
          </div>
        </div>

        <div className="hidden sm:flex items-end justify-between text-white">
          <div className="flex items-center gap-6 lg:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-white/60 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>RATING</span></div>
              <div className="text-white" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "30px" }}>{content.rating} <span className="text-white/50" style={{ fontSize: "16px" }}>/5</span></div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <div className="flex items-center gap-2 mb-1"><Zap className="w-4 h-4 text-yellow-300" /><span className="text-white/60 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{isBrowserGame ? "AVG. SESSION" : "TYPE"}</span></div>
              <div className="text-white" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "30px" }}>{isBrowserGame ? content.avgSession : "Download"}<span className="text-white/50" style={{ fontSize: "16px" }}>{isBrowserGame ? "min" : ""}</span></div>
            </div>
            {game.changelog && game.changelog.length > 0 && (
              <>
                <div className="w-px h-12 bg-white/20" />
                <div>
                  <div className="flex items-center gap-2 mb-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /><span className="text-white/60 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>VERSION</span></div>
                  <div className="text-white flex items-baseline gap-1.5" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "30px" }}>{game.changelog[0].version}<span className="text-white/40" style={{ fontFamily: "JetBrains Mono", fontSize: "10px", fontWeight: 700 }}>LATEST</span></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {isBrowserGame && trailerOpen ? <TrailerModal url={content.trailerUrl} title={content.title} onClose={() => setTrailerOpen(false)} /> : null}
    </section>
  );
}

"use client";

import { Play, Users, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useContent } from "./content-store";
import { GamePlayer } from "./game-player";
import { TrailerModal } from "./trailer-modal";

export function Hero() {
  const { content } = useContent();
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [players, setPlayers] = useState(847392);
  const [playing, setPlaying] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const titleParts = content.title.split(/\s+/);
  const titleHead = titleParts.slice(0, -1).join(" ");
  const titleTail = titleParts[titleParts.length - 1] || "";

  useEffect(() => {
    const t = setInterval(() => setPlayers(840000 + Math.floor(Math.random() * 20000)), 1500);
    return () => clearInterval(t);
  }, []);

  if (playing) {
    return (
      <div className="animate-[fadeIn_0.4s_ease]">
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.98) } to { opacity: 1; transform: scale(1) } }`}</style>
        <GamePlayer src={content.iframeUrl} title={content.title} onExit={() => setPlaying(false)} />
      </div>
    );
  }

  return (
    <section
      className="relative h-[460px] sm:h-[560px] lg:h-[640px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 group"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
    >
      <img
        src={content.coverImg.includes("unsplash.com") ? `${content.coverImg}&fm=avif` : content.coverImg}
        alt={content.title}
        width={1800}
        height={1013}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[8s]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0014] via-[#0a0014]/85 to-[#0a0014]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0014] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 via-purple-600/20 to-cyan-400/20 mix-blend-overlay" />

      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(217,70,239,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.18) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, black, transparent 60%)`,
          WebkitMaskImage: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, black, transparent 60%)`,
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          left: `calc(${mouse.x}% - 300px)`,
          top: `calc(${mouse.y}% - 300px)`,
          background: "radial-gradient(circle, rgba(217,70,239,0.35) 0%, transparent 70%)",
        }}
      />

      <div className="relative h-full flex flex-col justify-between p-5 sm:p-8 lg:p-12 z-10">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/40 text-yellow-300 tracking-widest flex items-center gap-2" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
            <Star className="w-3 h-3 fill-yellow-300" />
            EDITOR'S PICK · WEEK 19
          </span>
          <span className="px-3 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 tracking-widest flex items-center gap-2" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            LIVE NOW
          </span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-block mb-4 px-3 py-1 rounded-md bg-gradient-to-r from-fuchsia-500 via-purple-600 to-cyan-400">
            <span className="text-white tracking-[0.3em]" style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "11px" }}>{content.genre}</span>
          </div>
          <h1
            className="text-white mb-5 leading-[0.85] tracking-tight text-[52px] sm:text-[80px] lg:text-[112px]"
            style={{ fontFamily: "Orbitron", fontWeight: 900 }}
          >
            {titleHead}
            {titleHead && <br />}
            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">{titleTail}</span>
          </h1>
          <p className="text-zinc-300 max-w-xl mb-8 leading-relaxed" style={{ fontFamily: "Rajdhani", fontSize: "19px" }}>
            {content.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button onClick={() => setPlaying(true)} className="group/btn relative px-6 sm:px-12 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-cyan-400 text-white overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(217,70,239,0.5)]">
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <span className="relative flex items-center gap-3 tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "16px" }}>
                <Play className="w-6 h-6 fill-white" />
                PLAY NOW — FREE
              </span>
            </button>
            <button onClick={() => setTrailerOpen(true)} className="px-6 py-5 rounded-xl border border-white/20 backdrop-blur bg-white/5 text-white hover:bg-white/10 transition-all flex items-center gap-3 tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 500, fontSize: "13px" }}>
              <Zap className="w-4 h-4 text-yellow-400" />
              WATCH TRAILER
            </button>
          </div>
        </div>

        <div className="hidden sm:flex items-end justify-between">
          <div className="flex items-center gap-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-white/50 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>PLAYING NOW</span>
              </div>
              <div className="text-white tabular-nums" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "32px" }}>{players.toLocaleString()}</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white/50 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>USER SCORE</span>
              </div>
              <div className="text-white" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "32px" }}>{content.rating} <span className="text-white/30" style={{ fontSize: "16px" }}>/10</span></div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-fuchsia-400" />
                <span className="text-white/50 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>AVG. SESSION</span>
              </div>
              <div className="text-white" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "32px" }}>{content.avgSession}<span className="text-white/30" style={{ fontSize: "16px" }}>min</span></div>
            </div>
          </div>
        </div>
      </div>
      {trailerOpen && (
        <TrailerModal url={content.trailerUrl} title={content.title} onClose={() => setTrailerOpen(false)} />
      )}
    </section>
  );
}

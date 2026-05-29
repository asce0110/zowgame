"use client";

import { Play, Users, Star, Clock, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useContent } from "./content-store";
import { GamePlayer } from "./game-player";
import { TrailerModal } from "./trailer-modal";

export function Hero() {
  const { content } = useContent();
  const [players, setPlayers] = useState(847392);
  const [playing, setPlaying] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPlayers(840000 + Math.floor(Math.random() * 20000)), 2000);
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
    <section className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-0">
        {/* Cover image */}
        <div className="relative h-64 lg:h-auto min-h-[280px] overflow-hidden group">
          <img
            src={content.coverImg.includes("unsplash.com") ? `${content.coverImg}&fm=avif` : content.coverImg}
            alt={content.title}
            width={1800}
            height={1013}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white" />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <Star className="w-3 h-3 fill-white" />
              Editor's Pick
            </span>
            <span className="px-2.5 py-1 rounded-full bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-10 flex flex-col justify-center">
          <span className="inline-block self-start px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium mb-3">
            {content.genre}
          </span>
          <h1 className="text-slate-900 leading-tight mb-3 text-3xl lg:text-5xl font-bold">
            {content.title}
          </h1>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {content.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              onClick={() => setPlaying(true)}
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-indigo-200 flex items-center gap-2 font-semibold"
            >
              <Play className="w-4 h-4 fill-white" />
              Play Now — Free
            </button>
            <button
              onClick={() => setTrailerOpen(true)}
              className="px-5 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 font-medium"
            >
              <PlayCircle className="w-4 h-4 text-slate-500" />
              Watch Trailer
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-100">
            <Stat icon={Users} label="Playing now" value={players.toLocaleString()} tint="text-indigo-600" />
            <Stat icon={Star} label="User score" value={`${content.rating}/10`} tint="text-amber-500" />
            <Stat icon={Clock} label="Avg session" value={`${content.avgSession}m`} tint="text-emerald-600" />
          </div>
        </div>
      </div>

      {trailerOpen && (
        <TrailerModal url={content.trailerUrl} title={content.title} onClose={() => setTrailerOpen(false)} />
      )}
    </section>
  );
}

function Stat({ icon: Icon, label, value, tint }: { icon: any; label: string; value: string; tint: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={`w-3.5 h-3.5 ${tint}`} />
        <span className="text-slate-500 text-xs">{label}</span>
      </div>
      <div className="text-slate-900 font-semibold tabular-nums">{value}</div>
    </div>
  );
}

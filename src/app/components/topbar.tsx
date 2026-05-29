"use client";

import { Search, Bell } from "lucide-react";
import { useEffect, useState } from "react";

export function TopBar() {
  const [online, setOnline] = useState(8472);
  useEffect(() => {
    const t = setInterval(() => setOnline(8400 + Math.floor(Math.random() * 160)), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="flex items-center gap-3 sm:gap-6 mb-6 sm:mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          type="text"
          placeholder="SEARCH GAMES, GENRES, MOODS..."
          className="w-full pl-14 pr-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 tracking-widest focus:outline-none focus:border-fuchsia-500/50 focus:bg-white/[0.07] transition-all"
          style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded border border-white/10 text-white/40 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>
          ⌘ K
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-cyan-500/10 border border-fuchsia-500/25">
        <span className="text-lg leading-none">🔥</span>
        <div className="flex flex-col leading-tight">
          <span className="text-white/40 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>BUZZING NOW</span>
          <span className="text-white tabular-nums tracking-wider" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "13px" }}>
            {online.toLocaleString()} <span className="text-white/40" style={{ fontSize: "10px" }}>online</span>
          </span>
        </div>
        <span className="relative flex w-2 h-2 ml-1">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
        </span>
      </div>

      <button className="relative p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors">
        <Bell className="w-4 h-4" />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
      </button>
    </header>
  );
}

"use client";

import { Home, BookOpen, Info, ShieldAlert } from "lucide-react";

export type ViewId = "home" | "how-to-play" | "about" | "admin";

const items: { id: ViewId; icon: any; label: string; tint?: string }[] = [
  { id: "home", icon: Home, label: "Play", tint: "text-fuchsia-400" },
  { id: "how-to-play", icon: BookOpen, label: "How to Play", tint: "text-cyan-400" },
  { id: "about", icon: Info, label: "About", tint: "text-violet-400" },
];

export function Sidebar({ active, onChange }: { active: ViewId; onChange: (v: ViewId) => void }) {
  return (
    <aside className="w-[64px] sm:w-[88px] sm:hover:w-[240px] transition-all duration-300 ease-out h-screen sticky top-0 bg-[#0a0014]/80 backdrop-blur-xl border-r border-fuchsia-500/20 flex flex-col group/sidebar z-50 shrink-0">
      <div className="flex items-center gap-3 px-6 py-7 border-b border-fuchsia-500/10">
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500 via-purple-600 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.6)]">
            <span className="text-white tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 900 }}>N</span>
          </div>
          <div className="absolute inset-0 rounded-lg bg-fuchsia-500 blur-lg opacity-40 -z-10" />
        </div>
        <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
          <div className="text-white tracking-[0.3em]" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "14px" }}>NEXUS</div>
          <div className="text-fuchsia-400/60 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>v3.0 // ONLINE</div>
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
              style={{ fontFamily: "Rajdhani", fontWeight: 600 }}
            >
              {isActive && (
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full bg-current ${item.tint}`} />
              )}
              <Icon className={`w-5 h-5 shrink-0 ${isActive && item.tint ? item.tint : ""}`} />
              <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap tracking-wider">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-fuchsia-500/10">
        <button
          onClick={() => onChange("admin")}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
            active === "admin" ? "bg-rose-500/15 text-rose-300" : "text-zinc-500 hover:text-rose-300 hover:bg-rose-500/5"
          }`}
          style={{ fontFamily: "Rajdhani", fontWeight: 600 }}
        >
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap tracking-wider flex-1 text-left">Editor</span>
          <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity px-1.5 py-0.5 rounded bg-rose-500/20 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "8px" }}>Ω</span>
        </button>
      </div>
    </aside>
  );
}

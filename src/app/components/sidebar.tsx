"use client";
import Link from "next/link";
import { Home, BookOpen, Info } from "lucide-react";
import { useContent } from "./content-store";

export type ViewId = "home" | "how-to-play" | "about";
export type SidebarView = ViewId;

const items: { id: SidebarView; icon: any; label: string; tint?: string }[] = [
  { id: "home", icon: Home, label: "Home", tint: "text-fuchsia-400" },
  { id: "how-to-play", icon: BookOpen, label: "How to Play", tint: "text-cyan-400" },
  { id: "about", icon: Info, label: "About", tint: "text-violet-400" },
];

export function Sidebar({ active, onChange }: { active: SidebarView; onChange: (v: SidebarView) => void }) {
  const { game } = useContent();

  return (
    <aside className="hidden lg:flex w-[88px] hover:w-[240px] transition-all duration-300 ease-out h-screen sticky top-0 ec-surface-strong backdrop-blur-xl border-r ec-border-brand flex-col group/sidebar z-40 shrink-0">
      <div className="px-6 py-7 border-b ec-hairline">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group/logo" aria-label="Go to homepage">
          <div className="relative shrink-0">
            <img src="/logo-symbol.svg" alt="ZOWGAME" width={40} height={40} className="w-10 h-10 drop-shadow-[0_0_14px_rgba(217,70,239,0.55)] transition-transform duration-200 group-hover/logo:scale-105" />
            <div className="absolute inset-0 rounded-lg bg-fuchsia-500 blur-lg opacity-30 -z-10" />
          </div>
          <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
            <div className="ec-text tracking-[0.3em]" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "14px" }}>ZOWGAME</div>
            <div className="ec-brand-kicker tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{game.shortTitle.toUpperCase()}</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive ? "ec-surface ec-text" : "ec-text-faint hover:ec-text ec-hover-surface"
              }`}
              style={{ fontFamily: "Rajdhani", fontWeight: 600 }}
            >
              {isActive && <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full bg-current ${item.tint}`} />}
              <Icon className={`w-5 h-5 shrink-0 ${isActive && item.tint ? item.tint : ""}`} />
              <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap tracking-wider flex-1 text-left">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

"use client";

import { Home, BookOpen, Info, Settings, Gamepad2 } from "lucide-react";

export type ViewId = "home" | "how-to-play" | "about" | "admin";

const items: { id: ViewId; icon: any; label: string }[] = [
  { id: "home", icon: Home, label: "Play" },
  { id: "how-to-play", icon: BookOpen, label: "How to Play" },
  { id: "about", icon: Info, label: "About" },
];

export function Sidebar({ active, onChange }: { active: ViewId; onChange: (v: ViewId) => void }) {
  return (
    <aside className="w-[64px] sm:w-[88px] sm:hover:w-[220px] transition-all duration-300 ease-out h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col group/sidebar z-50 shrink-0">
      <div className="flex items-center gap-3 px-5 py-6 border-b border-slate-200">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-200">
          <Gamepad2 className="w-5 h-5 text-white" />
        </div>
        <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
          <div className="text-slate-900 font-semibold">PlayHub</div>
          <div className="text-slate-400 text-xs">Free HTML5 Games</div>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-indigo-600" />
              )}
              <Icon className="w-5 h-5 shrink-0" />
              <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-200">
        <button
          onClick={() => onChange("admin")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            active === "admin"
              ? "bg-amber-50 text-amber-700"
              : "text-slate-500 hover:text-amber-700 hover:bg-amber-50"
          }`}
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap flex-1 text-left">
            Editor
          </span>
        </button>
      </div>
    </aside>
  );
}

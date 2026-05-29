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
    <header className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search games, genres, moods..."
          className="w-full pl-11 pr-16 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-slate-200 text-slate-400 text-xs bg-slate-50">
          ⌘ K
        </kbd>
      </div>

      <div className="hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-emerald-50 border border-emerald-100">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
          <span className="relative rounded-full w-2 h-2 bg-emerald-500" />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-emerald-700 text-xs">Online now</span>
          <span className="text-emerald-900 tabular-nums font-semibold">
            {online.toLocaleString()}
          </span>
        </div>
      </div>

      <button className="relative p-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors">
        <Bell className="w-4 h-4" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
      </button>
    </header>
  );
}

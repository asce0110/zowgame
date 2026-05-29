"use client";

import { useEffect, useState } from "react";
import { Zap, Radio, ArrowRight } from "lucide-react";

const livePulses = [
  { icon: "🎯", text: "Anonymous just got 12 kills in a row" },
  { icon: "🔥", text: "Tokyo player won a 1v3 clutch" },
  { icon: "👻", text: "Berlin player survived 18 minutes solo" },
  { icon: "💥", text: "New world record: rooftop sprint 47s" },
  { icon: "⚡", text: "200 players joined in the last 5 minutes" },
  { icon: "🌙", text: "Night-owl lobby: 3,124 active right now" },
];

const ambient = [
  "5m ago — anon cleared rooftop sprint in 47s",
  "just now — Tokyo player landed a triple-kill",
  "1m ago — first wingsuit ace of the day",
  "just now — Berlin player held the throne for 6m",
  "2m ago — someone clutched a 1v4 on West Bridge",
];

function useTickingNumber(base: number, jitter = 30, interval = 2000) {
  const [n, setN] = useState(base);
  useEffect(() => {
    const t = setInterval(() => {
      setN(base + Math.floor(Math.random() * jitter * 2) - jitter);
    }, interval);
    return () => clearInterval(t);
  }, [base, jitter, interval]);
  return n;
}

export function ActivityPanel() {
  const [pulseIdx, setPulseIdx] = useState(0);
  const [ambientIdx, setAmbientIdx] = useState(0);
  const onlineNow = useTickingNumber(847392, 800, 1500);

  useEffect(() => {
    const t = setInterval(() => setPulseIdx((i) => (i + 1) % livePulses.length), 3500);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setAmbientIdx((i) => (i + 1) % ambient.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <aside className="w-full lg:w-[340px] shrink-0 flex flex-col gap-5">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5 shadow-xl shadow-slate-950/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
              <span className="relative rounded-full w-2 h-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            </span>
            <span className="text-white font-semibold text-sm">Happening Now</span>
          </div>
          <span className="text-slate-400 tabular-nums text-xs">
            {onlineNow.toLocaleString()} online
          </span>
        </div>

        <div className="h-14 relative overflow-hidden rounded-lg bg-slate-950/60 border border-slate-800">
          {livePulses.map((p, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center gap-3 px-4 transition-all duration-700"
              style={{
                opacity: i === pulseIdx ? 1 : 0,
                transform: `translateY(${i === pulseIdx ? 0 : i < pulseIdx ? -20 : 20}px)`,
              }}
            >
              <span className="text-xl">{p.icon}</span>
              <span className="flex-1 truncate text-slate-200 text-sm">{p.text}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-1 mt-3 h-5 items-end">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-indigo-500/30 to-indigo-400/80"
              style={{
                height: `${30 + ((i * 37 + pulseIdx * 13) % 70)}%`,
                transition: "height 0.7s ease",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative rounded-2xl p-5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 shadow-xl shadow-indigo-900/50 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-violet-400/20 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-indigo-300/20 blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span className="text-white/90 text-xs font-medium">Ready in 12 seconds</span>
          </div>
          <div className="text-white mb-4 leading-tight text-xl font-semibold">
            Skip the menu.<br />Drop straight in.
          </div>
          <button className="w-full py-2.5 rounded-lg bg-white text-indigo-700 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 font-semibold text-sm shadow-md">
            Quick Match
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/60 backdrop-blur h-9 relative overflow-hidden flex items-center">
        <Radio className="w-3 h-3 text-emerald-400 shrink-0 mr-2" />
        <div className="flex-1 relative h-5">
          {ambient.map((a, i) => (
            <div
              key={i}
              className="absolute inset-0 text-slate-400 truncate transition-all duration-700 text-xs flex items-center"
              style={{
                opacity: i === ambientIdx ? 1 : 0,
                transform: `translateY(${i === ambientIdx ? 0 : 8}px)`,
              }}
            >
              {a}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

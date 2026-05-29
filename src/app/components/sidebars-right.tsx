"use client";

import { useEffect, useState } from "react";
import { Zap, Radio } from "lucide-react";

const livePulses = [
  { icon: "🎯", text: "Anonymous just got 12 kills in a row", weight: "epic" },
  { icon: "🔥", text: "Tokyo player won a 1v3 clutch", weight: "hot" },
  { icon: "👻", text: "Berlin player survived 18 minutes solo", weight: "normal" },
  { icon: "💥", text: "New world record on rooftop sprint: 47s", weight: "epic" },
  { icon: "⚡", text: "200 players joined in the last 5 minutes", weight: "hot" },
  { icon: "🌙", text: "Night-owl lobby: 3,124 active right now", weight: "normal" },
];

const ambient = [
  "5m ago — anon cleared rooftop sprint in 47s ⚡",
  "just now — Tokyo player landed a triple-kill 🎯",
  "1m ago — first wingsuit ace of the day 🪂",
  "just now — Berlin player held the throne for 6m 👑",
  "2m ago — someone clutched a 1v4 on West Bridge 😱",
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
    <aside className="w-full lg:w-[340px] shrink-0 flex flex-col gap-6">
      {/* HAPPENING NOW */}
      <div className="relative rounded-2xl border border-fuchsia-500/20 bg-gradient-to-br from-[#1a0033]/80 to-[#0a0014]/80 backdrop-blur p-5 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
              </span>
              <span className="text-white tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>HAPPENING NOW</span>
            </div>
            <span className="text-white/40 tracking-widest tabular-nums" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
              {onlineNow.toLocaleString()}
            </span>
          </div>

          <div className="h-14 relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/5">
            {livePulses.map((p, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center gap-3 px-4 transition-all duration-700"
                style={{
                  opacity: i === pulseIdx ? 1 : 0,
                  transform: `translateY(${i === pulseIdx ? 0 : i < pulseIdx ? -20 : 20}px)`,
                }}
              >
                <span className="text-2xl">{p.icon}</span>
                <span
                  className={`flex-1 truncate ${
                    p.weight === "epic" ? "bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent" :
                    p.weight === "hot" ? "text-fuchsia-300" : "text-white/85"
                  }`}
                  style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "13px" }}
                >
                  {p.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-1 mt-3 h-5 items-end">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-fuchsia-500/40 to-cyan-400/60"
                style={{
                  height: `${30 + ((i * 37 + pulseIdx * 13) % 70)}%`,
                  transition: "height 0.7s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>

{/* QUICK MATCH CTA */}
      <div className="relative rounded-2xl overflow-hidden p-5 bg-gradient-to-br from-fuchsia-600 via-purple-700 to-cyan-500">
        <div className="absolute inset-0 bg-[#0a0014]/30" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="text-white tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "11px" }}>READY IN 12 SECONDS</span>
          </div>
          <div className="text-white mb-3 leading-tight" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "22px" }}>
            Skip the menu.<br />Drop straight in.
          </div>
          <button className="w-full py-3 rounded-xl bg-white text-black hover:scale-[1.02] active:scale-95 transition-transform tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>
            QUICK MATCH →
          </button>
        </div>
      </div>

      {/* AMBIENT TICKER */}
      <div className="px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02] h-9 relative overflow-hidden flex items-center">
        <Radio className="w-3 h-3 text-emerald-400 shrink-0 mr-2" />
        <div className="flex-1 relative h-5">
          {ambient.map((a, i) => (
            <div
              key={i}
              className="absolute inset-0 text-white/40 truncate transition-all duration-700"
              style={{
                opacity: i === ambientIdx ? 1 : 0,
                transform: `translateY(${i === ambientIdx ? 0 : 8}px)`,
                fontFamily: "Rajdhani",
                fontSize: "11px",
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

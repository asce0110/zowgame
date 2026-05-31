import { useEffect, useState } from "react";
import { Play, X, Clock } from "lucide-react";
import { vibrate } from "../lib/haptics";

const VISIT_KEY = "eclipse-last-visit-v1";

function formatAgo(ts: number) {
  const diff = Date.now() - ts;
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "earlier today";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function WelcomeBackBanner({ onPlay }: { onPlay: () => void }) {
  const [visible, setVisible] = useState(false);
  const [agoText, setAgoText] = useState("");

  useEffect(() => {
    let prev = 0;
    try {
      const raw = localStorage.getItem(VISIT_KEY);
      if (raw) prev = parseInt(raw, 10) || 0;
    } catch {}

    if (prev) {
      setAgoText(formatAgo(prev));
      setVisible(true);
    }
    try { localStorage.setItem(VISIT_KEY, String(Date.now())); } catch {}
  }, []);

  if (!visible) return null;

  return (
    <div className="relative rounded-2xl border ec-border-strong ec-surface backdrop-blur p-4 sm:p-5 mb-6 sm:mb-8 hud-corners overflow-hidden" style={{ animation: "ntfIn 360ms cubic-bezier(0.16,1,0.3,1) both", boxShadow: "var(--ec-shadow-card)" }}>
      <span className="hud-c1" /><span className="hud-c2" />
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl" style={{ opacity: "var(--ec-blob-opacity, 1)" }} />

      <div className="relative flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 items-center justify-center shadow-[0_0_18px_rgba(34,211,238,0.5)]">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-cyan-500 tracking-[0.3em]" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>// CONTINUE PLAYING</span>
            <span className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>· last played {agoText}</span>
          </div>
          <div className="ec-text truncate" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "16px" }}>
            Jump back into Cobb Can Move instantly.
          </div>
        </div>

        <button onClick={() => { vibrate(10); onPlay(); }} className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white tracking-widest hover:scale-[1.03] active:scale-95 transition-transform min-h-[44px] cursor-pointer" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "11px", boxShadow: "var(--ec-glow-fuchsia)" }}>
          <Play className="w-3.5 h-3.5 fill-white" />
          CONTINUE
        </button>

        <button onClick={() => setVisible(false)} aria-label="Dismiss" className="p-2 rounded-md ec-text-faint hover:ec-text ec-hover-surface transition-colors cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      <button onClick={() => { vibrate(10); onPlay(); }} className="sm:hidden mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white tracking-widest active:scale-95 transition-transform min-h-[48px] cursor-pointer" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px", boxShadow: "var(--ec-glow-fuchsia)" }}>
        <Play className="w-4 h-4 fill-white" />
        CONTINUE PLAYING
      </button>
    </div>
  );
}

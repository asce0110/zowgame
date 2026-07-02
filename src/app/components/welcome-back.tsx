"use client";
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
    <div className="relative rounded-2xl border-2 border-foreground bg-card p-4 sm:p-5 mb-6 sm:mb-8 overflow-hidden shadow-[5px_5px_0_#24312c]" style={{ animation: "ntfIn 360ms cubic-bezier(0.16,1,0.3,1) both" }}>
      <div className="relative flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex w-11 h-11 rounded-xl border-2 border-foreground bg-primary items-center justify-center shadow-[2px_2px_0_#24312c]">
          <Clock className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-primary tracking-[0.3em] font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>// CONTINUE PLAYING</span>
            <span className="text-muted-foreground tracking-widest font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>· last played {agoText}</span>
          </div>
          <div className="text-foreground truncate" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "16px" }}>
            Jump back into Cobb Can Move instantly.
          </div>
        </div>

        <button onClick={() => { vibrate(10); onPlay(); }} className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-foreground bg-primary text-primary-foreground font-black tracking-widest hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] shadow-[3px_3px_0_#24312c] transition-all min-h-[44px] cursor-pointer" style={{ fontFamily: "Nunito", fontSize: "11px" }}>
          <Play className="w-3.5 h-3.5 fill-primary-foreground" />
          CONTINUE
        </button>

        <button onClick={() => setVisible(false)} aria-label="Dismiss" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      <button onClick={() => { vibrate(10); onPlay(); }} className="sm:hidden mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-foreground bg-primary text-primary-foreground font-black tracking-widest active:scale-95 transition-transform min-h-[48px] shadow-[3px_3px_0_#24312c] cursor-pointer" style={{ fontFamily: "Nunito", fontSize: "12px" }}>
        <Play className="w-4 h-4 fill-primary-foreground" />
        CONTINUE PLAYING
      </button>
    </div>
  );
}

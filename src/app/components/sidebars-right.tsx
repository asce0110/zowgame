import { useEffect, useState } from "react";
import { Zap, Radio, Download, Keyboard, Gamepad2 } from "lucide-react";
import { vibrate } from "../lib/haptics";
import { usePresence } from "../lib/presence";
import { trackEvent } from "../lib/analytics";

const livePulses = [
  { icon: "🎮", text: "Keyboard and gamepad both supported", weight: "normal" },
  { icon: "🕯️", text: "Keep the furnace alive to survive deeper floors", weight: "hot" },
  { icon: "👁️", text: "Some floors let Cobb see you in open sight lines", weight: "epic" },
  { icon: "👂", text: "When Cobb can hear, movement discipline matters", weight: "hot" },
  { icon: "🪵", text: "Collect coal, return safely, and keep moving", weight: "normal" },
  { icon: "🧩", text: "The rule set changes every level", weight: "epic" },
];

const ambient = [
  "Official page: itch.io / developer: abho",
  "Browser play available + Windows download on the official page",
  "Desktop recommended for clearer control in late-run pressure",
  "Read the active rule before you rush the next room",
  "Use walls, darkness, and route changes to break pursuit",
];

export function ActivityPanel({ onPlay }: { onPlay?: () => void }) {
  const [pulseIdx, setPulseIdx] = useState(0);
  const [ambientIdx, setAmbientIdx] = useState(0);
  const [showFloatingCard, setShowFloatingCard] = useState(false);
  const { inGame: onlineNow } = usePresence();

  useEffect(() => {
    const t = setInterval(() => setPulseIdx((i) => (i + 1) % livePulses.length), 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAmbientIdx((i) => (i + 1) % ambient.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowFloatingCard(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className="w-full lg:w-[340px] shrink-0 flex flex-col gap-6">
      <div className="relative rounded-2xl border ec-border-brand ec-surface backdrop-blur p-5 overflow-hidden hud-corners" style={{ boxShadow: "var(--ec-shadow-card)" }}>
        <span className="hud-c1" /><span className="hud-c2" />
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl ec-side-blob" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
              </span>
              <span className="ec-text tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>PLAYING NOW</span>
            </div>
            <span className="ec-text-faint tracking-widest tabular-nums" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{onlineNow.toLocaleString()}</span>
          </div>

          <div className="h-14 relative overflow-hidden rounded-xl border ec-hairline" style={{ background: "var(--ec-input-bg)" }}>
            {livePulses.map((p, i) => (
              <div key={i} className="absolute inset-0 flex items-center gap-3 px-4 transition-all duration-700" style={{ opacity: i === pulseIdx ? 1 : 0, transform: `translateY(${i === pulseIdx ? 0 : i < pulseIdx ? -20 : 20}px)` }}>
                <span className="text-2xl">{p.icon}</span>
                <span className={`flex-1 truncate ${p.weight === "epic" ? "bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent" : p.weight === "hot" ? "text-fuchsia-500 dark:text-fuchsia-300" : "ec-text-muted"}`} style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "13px" }}>
                  {p.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`cobb-floating-desktop hidden lg:block transition-all duration-300 ${showFloatingCard ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"}`}>
        <div className="cobb-floating-wrap">
          <div className="cobb-monster" aria-hidden="true">
            <svg viewBox="0 0 360 230" className="cobb-monster-svg" role="img">
              <defs>
                <radialGradient id="cobbFaceGlow" cx="45%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ff5b55" />
                  <stop offset="58%" stopColor="#cf3131" />
                  <stop offset="100%" stopColor="#7b1518" />
                </radialGradient>
                <linearGradient id="cobbHorn" x1="0" x2="1">
                  <stop offset="0%" stopColor="#8e1f22" />
                  <stop offset="100%" stopColor="#d94542" />
                </linearGradient>
                <filter id="cobbGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="10" stdDeviation="7" floodColor="#000000" floodOpacity="0.65" />
                  <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#ff352e" floodOpacity="0.42" />
                </filter>
              </defs>
              <g filter="url(#cobbGlow)">
                <path className="cobb-horn cobb-horn-left" d="M76 96 C28 68 4 40 1 8 C38 16 72 42 103 79 Z" fill="url(#cobbHorn)" />
                <path className="cobb-horn cobb-horn-right" d="M264 79 C297 43 331 17 358 4 C359 45 334 74 286 100 Z" fill="url(#cobbHorn)" />
                <path className="cobb-head" d="M71 94 C72 34 114 4 181 4 C251 4 293 37 294 96 C295 135 279 166 247 184 C218 201 145 201 113 185 C85 170 70 139 71 94 Z" fill="url(#cobbFaceGlow)" />
                <path className="cobb-face-shadow" d="M87 119 C119 101 215 100 272 122 C264 158 238 178 183 181 C124 184 96 160 87 119 Z" fill="#9f2225" opacity="0.55" />
                <ellipse className="cobb-eye cobb-eye-left" cx="134" cy="91" rx="38" ry="44" fill="#050202" />
                <ellipse className="cobb-eye cobb-eye-right" cx="225" cy="90" rx="41" ry="45" fill="#050202" />
                <circle className="cobb-pupil cobb-pupil-left" cx="143" cy="91" r="6" fill="#fff8ee" />
                <circle className="cobb-pupil cobb-pupil-right" cx="215" cy="91" r="6" fill="#fff8ee" />
                <path className="cobb-mouth" d="M93 145 C124 128 236 128 270 145 C263 180 227 204 182 204 C135 204 101 180 93 145 Z" fill="#050202" />
                <g className="cobb-teeth" fill="#f4eee5">
                  <path d="M116 148 L131 147 L128 176 L115 174 Z" />
                  <path d="M142 146 L158 145 L155 183 L139 181 Z" />
                  <path d="M172 145 L190 145 L190 188 L172 188 Z" />
                  <path d="M204 145 L220 146 L224 181 L207 183 Z" />
                  <path d="M234 148 L249 150 L250 174 L236 176 Z" />
                  <path d="M127 199 L143 199 L139 176 L125 176 Z" opacity="0.78" />
                  <path d="M159 204 L176 205 L176 181 L160 181 Z" opacity="0.78" />
                  <path d="M196 205 L212 203 L209 181 L195 181 Z" opacity="0.78" />
                  <path d="M226 198 L241 196 L239 174 L225 176 Z" opacity="0.78" />
                </g>
                <path className="cobb-arm-left" d="M103 154 C72 158 45 176 31 206 L89 206 C96 188 112 180 139 176 Z" fill="#8e1b1e" />
                <path className="cobb-arm-right" d="M256 155 C291 160 318 177 331 206 L272 206 C264 188 247 180 220 176 Z" fill="#8e1b1e" />
                <g className="cobb-claw-left" fill="#fff2dd">
                  <path d="M60 184 C66 186 70 194 67 206 L53 206 C53 196 55 189 60 184 Z" />
                  <path d="M80 179 C87 182 91 193 87 206 L73 206 C73 194 75 184 80 179 Z" />
                  <path d="M101 176 C108 180 112 192 108 206 L93 206 C94 193 96 182 101 176 Z" />
                </g>
                <g className="cobb-claw-right" fill="#fff2dd">
                  <path d="M260 176 C267 181 270 193 268 206 L253 206 C249 192 253 180 260 176 Z" />
                  <path d="M282 179 C289 184 291 195 288 206 L274 206 C271 193 275 182 282 179 Z" />
                  <path d="M303 184 C309 189 311 197 307 206 L293 206 C291 195 296 186 303 184 Z" />
                </g>
              </g>
            </svg>
          </div>

          <div className="relative rounded-2xl overflow-hidden p-5 ec-quick-match-card cobb-floating-card">
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 ec-quick-match-zap" />
                <span className="ec-quick-match-text tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "11px" }}>PLAY INSTANTLY</span>
              </div>
              <div className="ec-quick-match-text mb-3 leading-tight" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "22px" }}>
                No download for browser play.<br />Desktop recommended.
              </div>
              <button onClick={() => { vibrate(12); trackEvent("play_click", { location: "floating_card", game: "cobb_can_move" }); onPlay?.(); }} className="w-full py-3 rounded-xl ec-quick-match-btn hover:scale-[1.02] active:scale-95 transition-transform tracking-widest cursor-pointer min-h-[44px]" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>
                PLAY COBB CAN MOVE →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden relative rounded-2xl overflow-hidden p-4 ec-quick-match-card" style={{ boxShadow: "var(--ec-shadow-card)" }}>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 ec-quick-match-zap" />
            <span className="ec-quick-match-text tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "11px" }}>PLAY INSTANTLY</span>
          </div>
          <div className="ec-quick-match-text mb-3 leading-tight" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "20px" }}>
            No download for browser play.<br />Desktop recommended.
          </div>
          <button onClick={() => { vibrate(12); trackEvent("play_click", { location: "mobile_quick_card", game: "cobb_can_move" }); onPlay?.(); }} className="w-full py-3 rounded-xl ec-quick-match-btn hover:scale-[1.02] active:scale-95 transition-transform tracking-widest cursor-pointer min-h-[48px]" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>
            PLAY COBB CAN MOVE →
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl border ec-border ec-surface backdrop-blur p-5 hud-corners" style={{ boxShadow: "var(--ec-shadow-card)" }}>
        <span className="hud-c1" /><span className="hud-c2" />
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-4 h-4 text-cyan-500" />
          <span className="ec-text tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>QUICK FACTS</span>
        </div>
        <div className="flex flex-col gap-3">
          <InfoRow icon={Keyboard} label="Controls" value="WASD / Arrows + E / Space" />
          <InfoRow icon={Gamepad2} label="Input" value="Keyboard and gamepad" />
          <InfoRow icon={Radio} label="Platform" value="HTML5 Browser + Windows" />
        </div>
      </div>

      <div className="px-3 py-2 rounded-lg border ec-hairline ec-surface h-9 relative overflow-hidden flex items-center">
        <Radio className="w-3 h-3 text-emerald-500 shrink-0 mr-2" />
        <div className="flex-1 relative h-5">
          {ambient.map((a, i) => (
            <div key={i} className="absolute inset-0 ec-text-faint truncate transition-all duration-700" style={{ opacity: i === ambientIdx ? 1 : 0, transform: `translateY(${i === ambientIdx ? 0 : 8}px)`, fontFamily: "Rajdhani", fontSize: "11px" }}>
              {a}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border ec-hairline px-3 py-3" style={{ background: "var(--ec-input-bg)" }}>
      <Icon className="w-4 h-4 text-cyan-500 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{label}</div>
        <div className="ec-text truncate" style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "13px" }}>{value}</div>
      </div>
    </div>
  );
}

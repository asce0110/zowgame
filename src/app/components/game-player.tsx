import { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, RotateCw, Share2, AlertTriangle, Info, X, Check } from "lucide-react";

type Status = "loading" | "playing" | "error";

export function GamePlayer({ src, title, onExit }: { src: string; title: string; onExit: () => void }) {
  const [status, setStatus] = useState<Status>("loading");
  const [fullscreen, setFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [shared, setShared] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setStatus("loading");
    const t = window.setTimeout(() => {
      setStatus((s) => (s === "loading" ? "error" : s));
    }, 8000);
    return () => clearTimeout(t);
  }, [reloadKey, src]);

  const bumpControls = () => {
    setControlsVisible(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setControlsVisible(false), 3000);
  };
  useEffect(() => {
    bumpControls();
    return () => { if (idleTimer.current) clearTimeout(idleTimer.current); };
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const key = e.key;
      const lower = key.toLowerCase();
      const isMovementKey = ["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "spacebar"].includes(lower) || ["w", "a", "s", "d", "e", "q", "r", " "].includes(lower);

      if (status === "playing" && isMovementKey) {
        e.preventDefault();
      }

      if (key === "Escape" && !document.fullscreenElement) onExit();
      else if (lower === "f") toggleFullscreen();
      else if (lower === "r" && !isMovementKey) setReloadKey((k) => k + 1);
    };

    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit, status]);

  useEffect(() => {
    if (status !== "playing") return;

    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    const bodyTouchAction = document.body.style.touchAction;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
      document.body.style.touchAction = bodyTouchAction;
    };
  }, [status]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (wrapperRef.current?.requestFullscreen) {
          await wrapperRef.current.requestFullscreen();
          return;
        }
        throw new Error("no fs api");
      } else {
        await document.exitFullscreen();
        return;
      }
    } catch {
      setFullscreen((v) => !v);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    } catch {}
  };

  return (
    <div
      ref={wrapperRef}
      className={fullscreen && !document.fullscreenElement ? "fixed inset-0 z-[100] overflow-hidden border-0 ec-surface-strong" : "relative h-[460px] sm:h-[560px] lg:h-[640px] rounded-2xl sm:rounded-3xl overflow-hidden border ec-border ec-surface-strong"}
      style={{ boxShadow: "var(--ec-shadow-card)" }}
      onMouseMove={bumpControls}
    >
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 ec-surface-strong">
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(217,70,239,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.18) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent animate-[scanline_2s_linear_infinite]" />
          <style>{`@keyframes scanline { 0% { transform: translateY(0) } 100% { transform: translateY(640px) } }`}</style>
          <div className="relative text-center">
            <div className="text-fuchsia-500 tracking-[0.4em] mb-3 animate-pulse" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// LOADING GAME</div>
            <div className="ec-text tracking-tight mb-6" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "44px" }}>{title}</div>
            <div className="flex items-center justify-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-fuchsia-400" style={{ animation: `pulse 1.2s ${i * 0.15}s ease-in-out infinite` }} />
              ))}
            </div>
            <div className="ec-text-faint mt-6 tracking-widest tabular-nums" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>ESTABLISHING CONNECTION...</div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 ec-surface-strong">
          <div className="text-center max-w-md px-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-7 h-7 text-rose-500 dark:text-rose-400" />
            </div>
            <div className="text-rose-500 tracking-[0.4em] mb-2" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// CONNECTION FAILED</div>
            <div className="ec-text tracking-tight mb-3" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "28px" }}>Game failed to load</div>
            <p className="ec-text-muted mb-6" style={{ fontFamily: "Rajdhani", fontSize: "15px" }}>The game iframe couldn't be reached. Check your connection or try again in a moment.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setReloadKey((k) => k + 1)} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform cursor-pointer" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px", boxShadow: "var(--ec-glow-fuchsia)" }}>
                <RotateCw className="w-4 h-4" /> TRY AGAIN
              </button>
              <button onClick={onExit} className="px-5 py-2.5 rounded-xl border ec-border-strong ec-text-muted hover:ec-text ec-hover-surface tracking-widest flex items-center gap-2 cursor-pointer" style={{ fontFamily: "Orbitron", fontWeight: 600, fontSize: "12px" }}>
                BACK
              </button>
            </div>
          </div>
        </div>
      )}

      <iframe
        key={reloadKey}
        src={src}
        title={title}
        className="absolute inset-0 w-full h-full border-0"
        allow="autoplay; fullscreen; gamepad; clipboard-write"
        onLoad={() => setStatus("playing")}
        onError={() => setStatus("error")}
      />

      <div className={`absolute top-4 right-4 z-20 flex gap-2 transition-opacity duration-300 ${controlsVisible ? "opacity-100" : "opacity-0"}`}>
        <button onClick={toggleFullscreen} className="w-10 h-10 rounded-lg bg-black/55 backdrop-blur-md border border-white/15 text-white/85 hover:text-white hover:bg-black/75 transition-colors flex items-center justify-center cursor-pointer" title="Fullscreen (F)">
          {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
        <button onClick={onExit} className="w-10 h-10 rounded-lg bg-black/55 backdrop-blur-md border border-white/15 text-white/85 hover:text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/40 transition-colors flex items-center justify-center cursor-pointer" title="Exit (Esc)">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ${controlsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <ControlBtn icon={RotateCw} label="Reload" onClick={() => setReloadKey((k) => k + 1)} />
          <div className="w-px h-5 bg-white/10 mx-1" />
          <ControlBtn icon={shared ? Check : Share2} label={shared ? "Copied!" : "Share"} onClick={handleShare} success={shared} />
          <ControlBtn icon={Info} label="Info" onClick={() => setShowInfo((s) => !s)} active={showInfo} />
        </div>
      </div>

      {showInfo && (
        <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-80 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 transition-opacity ${controlsVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-start justify-between mb-2">
            <div className="text-fuchsia-400 tracking-[0.3em]" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>// GAME INFO</div>
            <button onClick={() => setShowInfo(false)} className="text-white/40 hover:text-white cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-white mb-2" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "14px" }}>{title}</div>
          <div className="grid grid-cols-1 gap-2 text-white/70" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
            <div className="flex justify-between"><span className="text-white/40">F</span><span>Fullscreen</span></div>
            <div className="flex justify-between"><span className="text-white/40">R</span><span>Reload</span></div>
            <div className="flex justify-between"><span className="text-white/40">ESC</span><span>Exit</span></div>
            <div className="pt-2 border-t border-white/10 text-white/50 leading-relaxed">
              While the game is active, movement keys are trapped so the page does not scroll underneath the iframe.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ControlBtn({
  icon: Icon,
  label,
  onClick,
  active,
  danger,
  success,
}: {
  icon: any;
  label: string;
  onClick: () => void;
  active?: boolean;
  danger?: boolean;
  success?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
        success ? "text-emerald-400 bg-emerald-500/10" : danger ? "text-white/60 hover:text-rose-300 hover:bg-rose-500/10" : active ? "text-fuchsia-300 bg-fuchsia-500/15" : "text-white/70 hover:text-white hover:bg-white/10"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black border border-white/15 text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>
        {label}
      </span>
    </button>
  );
}

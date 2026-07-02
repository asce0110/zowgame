"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, Minimize2, RotateCw, Share2, AlertTriangle, Info, X, Check, PanelTopOpen } from "lucide-react";
import { shouldLockPageScrollForGameKey } from "../lib/game-input";

type Status = "loading" | "playing" | "error";

export function GamePlayer({ src, title, onExit, onFocusModeChange }: { src: string; title: string; onExit: () => void; onFocusModeChange?: (focused: boolean) => void }) {
  const [status, setStatus] = useState<Status>("loading");
  const [fullscreen, setFullscreen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [shared, setShared] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<number | undefined>(undefined);
  const scrollLockRef = useRef<{ x: number; y: number } | null>(null);

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
    const isEditableTarget = (target: EventTarget | null) => {
      const element = target as HTMLElement | null;
      if (!element) return false;
      return element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.isContentEditable;
    };

    const lockPageScroll = (e: KeyboardEvent) => {
      if (!isEditableTarget(e.target) && shouldLockPageScrollForGameKey(e.key)) {
        e.preventDefault();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;

      const key = e.key;
      const lower = key.toLowerCase();

      if (key === "Escape" && !document.fullscreenElement) {
        if (focusMode) {
          setFocusMode(false);
          return;
        }
        onExit();
      } else if (lower === "f") toggleFullscreen();
    };

    window.addEventListener("keydown", lockPageScroll, { capture: true, passive: false });
    window.addEventListener("keydown", onKey, { passive: false });
    return () => {
      window.removeEventListener("keydown", lockPageScroll, { capture: true });
      window.removeEventListener("keydown", onKey);
    };
  }, [onExit, focusMode]);

  useEffect(() => {
    if (status !== "playing") {
      if (scrollLockRef.current) {
        window.scrollTo(scrollLockRef.current.x, scrollLockRef.current.y);
        scrollLockRef.current = null;
      }
      return;
    }

    scrollLockRef.current = { x: window.scrollX, y: window.scrollY };

    const keepPosition = () => {
      if (!scrollLockRef.current) return;
      if (window.scrollX !== scrollLockRef.current.x || window.scrollY !== scrollLockRef.current.y) {
        window.scrollTo(scrollLockRef.current.x, scrollLockRef.current.y);
      }
    };

    const onWheel = (e: WheelEvent) => {
      const target = e.target as Node | null;
      if (target && wrapperRef.current?.contains(target)) {
        e.preventDefault();
      }
      keepPosition();
    };

    const onScroll = () => keepPosition();
    const onTouchMove = (e: TouchEvent) => {
      const target = e.target as Node | null;
      if (target && wrapperRef.current?.contains(target)) {
        e.preventDefault();
      }
      keepPosition();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onTouchMove);
      if (scrollLockRef.current) {
        window.scrollTo(scrollLockRef.current.x, scrollLockRef.current.y);
        scrollLockRef.current = null;
      }
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

  const shell = (
    <div
      ref={wrapperRef}
      className={
        fullscreen && !document.fullscreenElement
          ? "fixed inset-0 z-[130] overflow-hidden border-0 bg-card"
          : focusMode
            ? "w-full h-full overflow-hidden rounded-2xl border-2 border-foreground bg-card"
            : "relative h-[460px] sm:h-[560px] lg:h-[640px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-foreground bg-card shadow-[5px_5px_0_#24312c]"
      }
      onMouseMove={bumpControls}
    >
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-card">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, #24312c 1px, transparent 1px)",
            backgroundSize: "15px 15px",
          }} />
          <div className="relative text-center">
            <div className="text-primary tracking-[0.4em] mb-3 animate-pulse font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// LOADING GAME</div>
            <div className="text-foreground tracking-tight mb-6" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "44px" }}>{title}</div>
            <div className="flex items-center justify-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-primary" style={{ animation: `pulse 1.2s ${i * 0.15}s ease-in-out infinite` }} />
              ))}
            </div>
            <div className="text-muted-foreground mt-6 tracking-widest tabular-nums font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>ESTABLISHING CONNECTION...</div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-card">
          <div className="text-center max-w-md px-6">
            <div className="w-16 h-16 rounded-2xl bg-destructive/15 border-2 border-destructive/40 flex items-center justify-center mx-auto mb-5 shadow-[3px_3px_0_#24312c]">
              <AlertTriangle className="w-7 h-7 text-destructive" />
            </div>
            <div className="text-destructive tracking-[0.4em] mb-2 font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// CONNECTION FAILED</div>
            <div className="text-foreground tracking-tight mb-3" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "28px" }}>Game failed to load</div>
            <p className="text-muted-foreground mb-6 font-bold" style={{ fontSize: "15px" }}>The game iframe couldn't be reached. Check your connection or try again in a moment.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setReloadKey((k) => k + 1)} className="px-5 py-2.5 rounded-xl border-2 border-foreground bg-primary text-primary-foreground font-black tracking-widest flex items-center gap-2 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] shadow-[3px_3px_0_#24312c] transition-all cursor-pointer" style={{ fontFamily: "Nunito", fontSize: "12px" }}>
                <RotateCw className="w-4 h-4" /> TRY AGAIN
              </button>
              <button onClick={onExit} className="px-5 py-2.5 rounded-xl border-2 border-foreground bg-card text-foreground font-extrabold tracking-widest flex items-center gap-2 hover:bg-secondary transition-colors shadow-[3px_3px_0_#24312c] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] cursor-pointer" style={{ fontFamily: "Nunito", fontSize: "12px" }}>
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
        <button onClick={() => { setFocusMode(false); onExit(); }} className="w-10 h-10 rounded-lg bg-black/55 backdrop-blur-md border border-white/15 text-white/85 hover:text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/40 transition-colors flex items-center justify-center cursor-pointer" title="Exit (Esc)">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ${controlsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <ControlBtn icon={PanelTopOpen} label={focusMode ? "Exit Focus Mode" : "Focus Mode"} onClick={() => setFocusMode((v) => !v)} active={focusMode} />
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
          <div className="text-white mb-2" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "14px" }}>{title}</div>
          <div className="grid grid-cols-1 gap-2 text-white/70" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
            <div className="flex justify-between"><span className="text-white/40">F</span><span>Fullscreen</span></div>
            <div className="flex justify-between"><span className="text-white/40">R</span><span>Reload</span></div>
            <div className="flex justify-between"><span className="text-white/40">ESC</span><span>Exit / Leave Focus</span></div>
            <div className="pt-2 border-t border-white/10 text-white/50 leading-relaxed">
              Focus Mode enlarges the game and softens the rest of the page without forcing browser fullscreen.
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (focusMode) {
    return createPortal(
      <div className="fixed inset-0 z-[130] flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto w-[min(94vw,1400px)] h-[min(84vh,820px)]">
          {shell}
        </div>
      </div>,
      document.body,
    );
  }

  return shell;
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

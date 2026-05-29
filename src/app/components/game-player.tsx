"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, RotateCw, Volume2, VolumeX, Share2, AlertTriangle, Info, X, Check } from "lucide-react";

type Status = "loading" | "playing" | "error";

export function GamePlayer({ src, title, onExit }: { src: string; title: string; onExit: () => void }) {
  const [status, setStatus] = useState<Status>("loading");
  const [muted, setMuted] = useState(false);
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
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "Escape" && !document.fullscreenElement) onExit();
      else if (e.key === "f" || e.key === "F") toggleFullscreen();
      else if (e.key === "m" || e.key === "M") setMuted((m) => !m);
      else if (e.key === "r" || e.key === "R") setReloadKey((k) => k + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit]);

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
      className={
        fullscreen && !document.fullscreenElement
          ? "fixed inset-0 z-[100] overflow-hidden border-0 bg-slate-900"
          : "relative h-[460px] sm:h-[560px] lg:h-[640px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm"
      }
      onMouseMove={bumpControls}
    >
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-50">
          <div className="text-center">
            <div className="text-indigo-600 uppercase tracking-wider text-xs font-semibold mb-3 animate-pulse">Loading game</div>
            <div className="text-slate-900 text-3xl font-bold mb-6">{title}</div>
            <div className="flex items-center justify-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-indigo-500"
                  style={{ animation: `pulse 1.2s ${i * 0.15}s ease-in-out infinite` }}
                />
              ))}
            </div>
            <div className="text-slate-500 mt-6 text-sm">Establishing connection...</div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-50">
          <div className="text-center max-w-md px-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-7 h-7 text-rose-600" />
            </div>
            <div className="text-rose-600 uppercase tracking-wider text-xs font-semibold mb-2">Connection failed</div>
            <div className="text-slate-900 text-2xl font-bold mb-3">Game failed to load</div>
            <p className="text-slate-600 mb-6">
              The game iframe couldn't be reached. Check your connection or try again in a moment.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setReloadKey((k) => k + 1)}
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 font-semibold transition-colors"
              >
                <RotateCw className="w-4 h-4" /> Try Again
              </button>
              <button
                onClick={onExit}
                className="px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium transition-colors"
              >
                Back
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
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 rounded-lg bg-white/95 text-slate-700 hover:bg-white shadow-md flex items-center justify-center transition-colors"
          title="Fullscreen (F)"
        >
          {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
        <button
          onClick={onExit}
          className="w-10 h-10 rounded-lg bg-white/95 text-slate-700 hover:bg-rose-50 hover:text-rose-600 shadow-md flex items-center justify-center transition-colors"
          title="Exit (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ${controlsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-white/95 border border-slate-200 shadow-lg">
          <ControlBtn icon={muted ? VolumeX : Volume2} label={muted ? "Unmute" : "Mute"} onClick={() => setMuted((m) => !m)} active={muted} />
          <ControlBtn icon={RotateCw} label="Reload" onClick={() => setReloadKey((k) => k + 1)} />
          <div className="w-px h-5 bg-slate-200 mx-1" />
          <ControlBtn icon={shared ? Check : Share2} label={shared ? "Copied!" : "Share"} onClick={handleShare} success={shared} />
          <ControlBtn icon={Info} label="Info" onClick={() => setShowInfo((s) => !s)} active={showInfo} />
          <ControlBtn icon={AlertTriangle} label="Report" onClick={() => alert("Thanks — we'll check this game.")} danger />
        </div>
      </div>

      {showInfo && (
        <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-80 p-4 rounded-xl bg-white border border-slate-200 shadow-lg transition-opacity ${controlsVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-start justify-between mb-2">
            <div className="text-indigo-600 uppercase tracking-wider text-xs font-semibold">Game info</div>
            <button onClick={() => setShowInfo(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-slate-900 font-semibold mb-3">{title}</div>
          <div className="grid grid-cols-2 gap-2 text-slate-600 text-xs">
            <div className="flex justify-between"><span className="text-slate-400">F</span><span>Fullscreen</span></div>
            <div className="flex justify-between"><span className="text-slate-400">M</span><span>Mute</span></div>
            <div className="flex justify-between"><span className="text-slate-400">R</span><span>Reload</span></div>
            <div className="flex justify-between"><span className="text-slate-400">ESC</span><span>Exit</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

function ControlBtn({
  icon: Icon, label, onClick, active, danger, success,
}: {
  icon: any; label: string; onClick: () => void; active?: boolean; danger?: boolean; success?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
        success ? "text-emerald-600 bg-emerald-50" :
        danger ? "text-slate-500 hover:text-rose-600 hover:bg-rose-50" :
        active ? "text-indigo-600 bg-indigo-50" :
        "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-slate-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {label}
      </span>
    </button>
  );
}

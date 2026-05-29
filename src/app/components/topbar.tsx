"use client";
import { Bell, X, Eye, EyeOff, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useContent, NotificationItem } from "./content-store";
import { usePresence } from "../lib/presence";
import { ThemeToggle } from "./theme-toggle";

const toneRing: Record<NotificationItem["tone"], string> = {
  fuchsia: "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-500 dark:text-fuchsia-300",
  cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300",
  rose: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300",
};

const READ_KEY = "nexus-notifications-read-v1";

export function TopBar() {
  const { content } = useContent();
  const { total: online } = usePresence();
  const [open, setOpen] = useState(false);
  const popRef = useRef<HTMLDivElement | null>(null);

  const [readIds, setReadIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(READ_KEY);
      if (raw) return JSON.parse(raw) as string[];
    } catch {}
    return [];
  });

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const total = content.notifications.length;
  const unreadCount = useMemo(() => {
    const set = new Set(readIds);
    return content.notifications.reduce((acc, n) => acc + (set.has(n.id) ? 0 : 1), 0);
  }, [content.notifications, readIds]);

  const markAllRead = () => {
    const allIds = content.notifications.map((n) => n.id);
    setReadIds(allIds);
    try { localStorage.setItem(READ_KEY, JSON.stringify(allIds)); } catch {}
  };

  const handleToggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next && unreadCount > 0) markAllRead();
      return next;
    });
  };

  const [rmOn, setRmOn] = useState<boolean>(() => {
    try { return localStorage.getItem("eclipse-rm") === "1"; } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.classList.toggle("rm-on", rmOn);
    try { localStorage.setItem("eclipse-rm", rmOn ? "1" : "0"); } catch {}
  }, [rmOn]);

  return (
    <header className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 flex-wrap">
      <div className="flex-1 min-w-[240px] rounded-2xl border ec-border-brand ec-surface px-4 py-3 sm:px-5 sm:py-4 hud-corners" style={{ boxShadow: "var(--ec-shadow-card)" }}>
        <span className="hud-c1" /><span className="hud-c2" />
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-fuchsia-500 tracking-[0.3em] mb-1" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>// OFFICIAL SOURCE + PLAY PAGE</div>
            <div className="ec-text" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "18px" }}>COBB CAN MOVE</div>
            <div className="ec-text-muted" style={{ fontFamily: "Rajdhani", fontSize: "13px" }}>Browser play, controls, rules, FAQ, and download intent coverage.</div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-cyan-500/10 border ec-border-brand">
        <div className="flex flex-col leading-tight">
          <span className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>PLAYING NOW</span>
          <span className="ec-text tabular-nums tracking-wider" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "13px" }}>
            {online.toLocaleString()} <span className="ec-text-faint" style={{ fontSize: "10px" }}>active</span>
          </span>
        </div>
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
        </span>
      </div>

      <ThemeToggle />

      <button
        onClick={() => setRmOn((v) => !v)}
        aria-label={rmOn ? "Enable motion" : "Reduce motion"}
        title={rmOn ? "Motion reduced — click to enable" : "Reduce motion"}
        className="hidden sm:flex p-3 rounded-xl border ec-surface ec-border ec-text-muted hover:ec-text transition-colors cursor-pointer min-h-[44px] min-w-[44px] items-center justify-center ec-hover-surface"
      >
        {rmOn ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>

      <div className="relative" ref={popRef}>
        <button
          onClick={handleToggle}
          aria-label="Notifications"
          aria-expanded={open}
          className={`relative p-3 rounded-xl border transition-colors cursor-pointer ec-text min-h-[44px] min-w-[44px] flex items-center justify-center ${open ? "ec-surface ec-border-brand" : "ec-surface ec-border ec-hover-surface"}`}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-fuchsia-500 text-white tabular-nums flex items-center justify-center shadow-[0_0_10px_rgba(217,70,239,0.7)]" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
              {unreadCount}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-[360px] sm:w-[400px] rounded-2xl border ec-border-brand ec-surface-strong backdrop-blur-xl z-50 overflow-hidden" style={{ animation: "ntfIn 160ms ease-out both", boxShadow: "var(--ec-shadow-card)" }}>
            <style>{`@keyframes ntfIn { from { opacity: 0; transform: translateY(-6px) scale(0.98) } to { opacity: 1; transform: translateY(0) scale(1) } }`}</style>
            <div className="flex items-center justify-between px-4 py-3 border-b ec-border">
              <div className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-fuchsia-500" />
                <span className="ec-text tracking-[0.3em]" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "11px" }}>PAGE NOTES</span>
                <span className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>· {total}</span>
              </div>
              <button onClick={() => setOpen(false)} className="ec-text-faint hover:ec-text cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="max-h-[420px] overflow-y-auto py-2">
              {total === 0 ? (
                <div className="px-4 py-10 text-center ec-text-faint" style={{ fontFamily: "Rajdhani", fontSize: "13px" }}>
                  All caught up. No new notifications.
                </div>
              ) : (
                content.notifications.map((n) => (
                  <div key={n.id} className="group/item px-4 py-3 ec-hover-surface transition-colors flex flex-col gap-1.5 cursor-default">
                    <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded border tracking-widest ${toneRing[n.tone] ?? toneRing.fuchsia}`} style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{n.tag || "INFO"}</span>
                      <span className="ec-text-dim tracking-widest ml-auto" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{n.time}</span>
                    </div>
                    <div className="ec-text" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "13px" }}>{n.title}</div>
                    <div className="ec-text-muted leading-snug" style={{ fontFamily: "Rajdhani", fontSize: "13px" }}>{n.body}</div>
                  </div>
                ))
              )}
            </div>
            <div className="px-4 py-2.5 border-t ec-border ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>
              Content is aligned to public search intent and official itch.io distribution.
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

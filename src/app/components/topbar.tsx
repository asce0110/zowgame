"use client";
import { Bell, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useContent, NotificationItem } from "./content-store";

const toneRing: Record<NotificationItem["tone"], string> = {
  fuchsia: "border-accent/30 bg-accent/10 text-accent",
  cyan: "border-primary/30 bg-primary/10 text-primary",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-600",
  rose: "border-rose-500/30 bg-rose-500/10 text-rose-600",
};

const READ_KEY = "nexus-notifications-read-v1";

export function TopBar() {
  const { content, game } = useContent();
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

  return (
    <header className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 flex-wrap">
      <div className="flex-1 min-w-[240px] rounded-2xl border-2 border-foreground bg-card px-4 py-3 sm:px-5 sm:py-4 shadow-[4px_4px_0_#24312c]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-accent tracking-[0.3em] mb-1 font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{game.topBarEyebrow}</div>
            <div className="text-foreground" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "18px" }}>{game.topBarTitle}</div>
            <div className="text-muted-foreground font-bold" style={{ fontSize: "13px" }}>{game.topBarDescription}</div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 border-foreground bg-card shadow-[2px_2px_0_#24312c]">
        <div className="flex flex-col leading-tight">
          <span className="text-muted-foreground tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>
            {game.activityHeading ?? "STATUS"}
          </span>
          <span className="text-foreground tabular-nums tracking-wider font-extrabold" style={{ fontFamily: "Nunito", fontSize: "13px" }}>
            {game.accessMode === "download" ? "Download guide" : "Play in browser"}
          </span>
        </div>
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
          <span className="relative rounded-full w-2 h-2 bg-primary" />
        </span>
      </div>

      <div className="relative" ref={popRef}>
        <button
          onClick={handleToggle}
          aria-label="Notifications"
          aria-expanded={open}
          className={`relative p-3 rounded-xl border-2 transition-colors cursor-pointer text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center ${
            open ? "bg-card border-foreground shadow-[2px_2px_0_#24312c]" : "bg-card border-foreground hover:bg-secondary shadow-[2px_2px_0_#24312c]"
          }`}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white tabular-nums flex items-center justify-center shadow-[2px_2px_0_#24312c]" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
              {unreadCount}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-[360px] sm:w-[400px] rounded-2xl border-2 border-foreground bg-card z-50 overflow-hidden shadow-[6px_6px_0_#24312c]" style={{ animation: "ntfIn 160ms ease-out both" }}>
            <style>{`@keyframes ntfIn { from { opacity: 0; transform: translateY(-6px) scale(0.98) } to { opacity: 1; transform: translateY(0) scale(1) } }`}</style>
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-border">
              <div className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-accent" />
                <span className="text-foreground tracking-[0.3em]" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "11px" }}>PAGE NOTES</span>
                <span className="text-muted-foreground tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>· {total}</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="max-h-[420px] overflow-y-auto py-2">
              {total === 0 ? (
                <div className="px-4 py-10 text-center text-muted-foreground font-bold" style={{ fontSize: "13px" }}>
                  All caught up. No new notifications.
                </div>
              ) : (
                content.notifications.map((n) => (
                  <div key={n.id} className="group/item px-4 py-3 hover:bg-secondary transition-colors flex flex-col gap-1.5 cursor-default">
                    <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded border-2 border-foreground tracking-widest font-extrabold ${toneRing[n.tone] ?? toneRing.fuchsia}`} style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{n.tag || "INFO"}</span>
                      <span className="text-muted-foreground tracking-widest ml-auto" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{n.time}</span>
                    </div>
                    <div className="text-foreground" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "13px" }}>{n.title}</div>
                    <div className="text-muted-foreground leading-snug font-bold" style={{ fontSize: "13px" }}>{n.body}</div>
                  </div>
                ))
              )}
            </div>
            <div className="px-4 py-2.5 border-t-2 border-border text-muted-foreground tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>
              {game.notificationFooter}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

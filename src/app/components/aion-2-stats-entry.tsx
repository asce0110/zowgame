"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { AION_2_STATS_PATH, type AionMetric } from "../data/aion-2-stats";

export function AionStatsEntry() {
  const [metric, setMetric] = useState<AionMetric | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    let stopped = false;
    let activeController: AbortController | null = null;
    let running = false;
    async function refresh() {
      if (document.hidden || running || stopped) return;
      running = true;
      setLoading(true);
      const controller = new AbortController();
      activeController = controller;
      const timeout = window.setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch("/api/aion-2/", { signal: controller.signal });
        const data = await response.json();
        const next = data.currentPlayers;
        if (!next || !["ready", "stale", "unavailable"].includes(next.state) || (next.value !== null && (!Number.isSafeInteger(next.value) || next.value < 0)) || (next.observedAt !== null && (typeof next.observedAt !== "string" || !Number.isFinite(Date.parse(next.observedAt))))) throw new Error("Unavailable feed");
        if (next.state !== "unavailable" && (next.value === null || next.observedAt === null)) throw new Error("Undated reading");
        if (next.state === "unavailable" && next.value !== null) throw new Error("Invalid reading state");
        if (!stopped) {
          setMetric(next);
          setFailed(next.state === "unavailable" || next.state === "stale");
        }
      } catch {
        if (!stopped) { setFailed(true); setMetric((old) => old ? { ...old, state: "stale" } : null); }
      } finally {
        window.clearTimeout(timeout);
        running = false;
        activeController = null;
        if (!stopped) setLoading(false);
      }
    }
    void refresh();
    const timer = setInterval(() => void refresh(), 300000);
    const visible = () => { if (!document.hidden) void refresh(); };
    document.addEventListener("visibilitychange", visible);
    return () => { stopped = true; activeController?.abort(); clearInterval(timer); document.removeEventListener("visibilitychange", visible); };
  }, [attempt]);

  const value = metric?.value;
  return <section className="ed-steam-entry" aria-labelledby="steam-entry-title">
    <div><p className="ed-eyebrow">THE STEAM WATCH / AION 2</p><h2 id="steam-entry-title"><Link href={AION_2_STATS_PATH}>AION 2 Steam launch stats<ArrowUpRight size={24} aria-hidden="true" /></Link></h2><p>Steam players, launch peaks, news explained and help with login, characters and transfers.</p></div>
    <div className="ed-steam-reading" aria-busy={loading}>
      <span className="ed-eyebrow">{metric?.state === "stale" ? "LAST AVAILABLE STEAM COUNT" : "PLAYERS ON STEAM"}</span>
      <strong>{typeof value === "number" ? new Intl.NumberFormat("en-US").format(value) : loading ? "Checking…" : "Unavailable"}</strong>
      <span className="ed-steam-note" role="status">{metric?.observedAt ? `Observed ${new Date(metric.observedAt).toISOString().slice(0, 16).replace("T", " ")} UTC${failed ? " · refresh unavailable" : ""}` : loading ? "Reading the Steam data feed." : "Open the tracker for sources and recovery."}</span>
      {failed && <button className="ed-text-link" type="button" disabled={loading} onClick={retry}><RefreshCw size={14} aria-hidden="true" />{loading ? "Checking…" : "Retry count"}</button>}
    </div>
    <Link className="ed-button ed-button-outline" href={AION_2_STATS_PATH}>Stats & player help<ArrowUpRight size={18} aria-hidden="true" /></Link>
  </section>;
}

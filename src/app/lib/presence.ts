import { useEffect, useState } from "react";

type PresenceListener = (total: number, inGame: number) => void;

const listeners = new Set<PresenceListener>();
let total = 12_847;
let inGame = computeInGame(total);
let timer: ReturnType<typeof setInterval> | null = null;

function computeInGame(t: number) {
  const ratio = 0.62 + Math.random() * 0.08;
  return Math.max(1, Math.min(t - 1, Math.floor(t * ratio)));
}

function tick() {
  const drift = Math.floor((Math.random() - 0.5) * 80);
  total = Math.max(9_000, Math.min(18_000, total + drift));
  inGame = computeInGame(total);
  listeners.forEach((l) => l(total, inGame));
}

function ensureTimer() {
  if (timer !== null || typeof window === "undefined") return;
  timer = setInterval(tick, 6000);
}

export function usePresence() {
  const [snap, setSnap] = useState({ total, inGame });

  useEffect(() => {
    ensureTimer();
    const l: PresenceListener = (t, ig) => setSnap({ total: t, inGame: ig });
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);

  return snap;
}

"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { DEFAULT_CONTENT } from "../data/cobb-can-move-content";
import type { GameRecord } from "../data/games";

export type FaqItem = { q: string; a: string };

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  tag: string;
  tone: "fuchsia" | "cyan" | "emerald" | "amber" | "rose";
  time: string;
};

export type SiteContent = {
  title: string;
  subtitle: string;
  genre: string;
  description: string;
  coverImg: string;
  iframeUrl: string;
  trailerUrl: string;
  rating: string;
  avgSession: string;

  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;

  about: string[];
  faqs: FaqItem[];
  notifications: NotificationItem[];
};

const STORAGE_KEY = "nexus-site-content-v1";

type Ctx = {
  content: SiteContent;
  game: GameRecord;
  setContent: (c: SiteContent) => void;
  reset: () => void;
};

const ContentContext = createContext<Ctx | null>(null);

export function ContentProvider({ children, game }: { children: ReactNode; game: GameRecord }) {
  const [content, setContentState] = useState<SiteContent>(() => {
    if (game.slug !== "cobb-can-move") return game.content;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULT_CONTENT, ...JSON.parse(raw) };
    } catch {}
    return game.content;
  });

  const setContent = (c: SiteContent) => {
    setContentState(c);
    if (game.slug !== "cobb-can-move") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch {}
  };

  const reset = () => {
    setContentState(game.content);
    if (game.slug !== "cobb-can-move") return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return <ContentContext.Provider value={{ content, game, setContent, reset }}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be inside ContentProvider");
  return ctx;
}

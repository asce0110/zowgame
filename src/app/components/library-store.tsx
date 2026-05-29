"use client";
import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

export type LibraryGame = {
  id: string;
  title: string;
  img: string;
  genre?: string;
  href?: string;
};

export type RecentEntry = LibraryGame & { playedAt: number };
export type FavoriteEntry = LibraryGame & { savedAt: number };

type LibraryState = {
  recent: RecentEntry[];
  favorites: FavoriteEntry[];
};

type LibraryCtx = LibraryState & {
  recordPlay: (g: LibraryGame) => void;
  toggleFavorite: (g: LibraryGame) => void;
  isFavorite: (id: string) => boolean;
  removeFavorite: (id: string) => void;
  removeRecent: (id: string) => void;
  clearRecent: () => void;
};

const Ctx = createContext<LibraryCtx | null>(null);

const KEY = "eclipse-library-v1";
const MAX_RECENT = 8;

function load(): LibraryState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.recent) && Array.isArray(parsed.favorites)) {
        // Migrate v1 format where favorites was string[]
        const favs: FavoriteEntry[] = parsed.favorites
          .map((f: unknown) => {
            if (typeof f === "string") return null;
            if (f && typeof f === "object" && "id" in f && "title" in f && "img" in f) {
              return f as FavoriteEntry;
            }
            return null;
          })
          .filter(Boolean) as FavoriteEntry[];
        return { recent: parsed.recent, favorites: favs };
      }
    }
  } catch {}
  return { recent: [], favorites: [] };
}

export function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "game";
}

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LibraryState>(() => load());

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const recordPlay = useCallback((g: LibraryGame) => {
    setState((prev) => {
      const filtered = prev.recent.filter((r) => r.id !== g.id);
      const next: RecentEntry = { ...g, playedAt: Date.now() };
      return { ...prev, recent: [next, ...filtered].slice(0, MAX_RECENT) };
    });
  }, []);

  const toggleFavorite = useCallback((g: LibraryGame) => {
    setState((prev) => {
      const has = prev.favorites.some((f) => f.id === g.id);
      if (has) {
        return { ...prev, favorites: prev.favorites.filter((f) => f.id !== g.id) };
      }
      const entry: FavoriteEntry = { ...g, savedAt: Date.now() };
      return { ...prev, favorites: [entry, ...prev.favorites] };
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => state.favorites.some((f) => f.id === id),
    [state.favorites],
  );

  const removeFavorite = useCallback((id: string) => {
    setState((prev) => ({ ...prev, favorites: prev.favorites.filter((f) => f.id !== id) }));
  }, []);

  const removeRecent = useCallback((id: string) => {
    setState((prev) => ({ ...prev, recent: prev.recent.filter((r) => r.id !== id) }));
  }, []);

  const clearRecent = useCallback(() => {
    setState((prev) => ({ ...prev, recent: [] }));
  }, []);

  return (
    <Ctx.Provider value={{ ...state, recordPlay, toggleFavorite, isFavorite, removeFavorite, removeRecent, clearRecent }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLibrary() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLibrary must be used inside LibraryProvider");
  return c;
}

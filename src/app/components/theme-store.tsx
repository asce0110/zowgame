"use client";
import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "dark" | "light";
export type DarkVariant = "cyberpunk" | "portal";

const KEY = "eclipse-theme-v1";
const DARK_VARIANT_KEY = "eclipse-dark-variant-v1";
const DEFAULT_THEME: Theme = "dark";
const DEFAULT_DARK_VARIANT: DarkVariant = "cyberpunk";

const META_COLOR: Record<Theme, string> = {
  dark: "#06000f",
  light: "#e6dff2",
};

const DARK_META_COLOR: Record<DarkVariant, string> = {
  cyberpunk: "#06000f",
  portal: "#11161d",
};

type Ctx = {
  theme: Theme;
  darkVariant: DarkVariant;
  setTheme: (t: Theme) => void;
  toggle: () => void;
  setDarkVariant: (variant: DarkVariant) => void;
  toggleDarkVariant: () => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

function applyTheme(theme: Theme, darkVariant: DarkVariant) {
  const html = document.documentElement;
  html.classList.toggle("theme-light", theme === "light");
  html.classList.toggle("theme-dark", theme === "dark");
  html.dataset.theme = theme;
  html.dataset.darkVariant = darkVariant;

  let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.content = theme === "dark" ? DARK_META_COLOR[darkVariant] : META_COLOR.light;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [darkVariant, setDarkVariantState] = useState<DarkVariant>(DEFAULT_DARK_VARIANT);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(KEY) as Theme | null;
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeState(savedTheme);
      }

      const savedVariant = localStorage.getItem(DARK_VARIANT_KEY) as DarkVariant | null;
      if (savedVariant === "cyberpunk" || savedVariant === "portal") {
        setDarkVariantState(savedVariant);
      }
    } catch {}
  }, []);

  useEffect(() => {
    applyTheme(theme, darkVariant);
    try { localStorage.setItem(KEY, theme); } catch {}
    try { localStorage.setItem(DARK_VARIANT_KEY, darkVariant); } catch {}
  }, [theme, darkVariant]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggle = useCallback(() => setThemeState((t) => (t === "dark" ? "light" : "dark")), []);
  const setDarkVariant = useCallback((variant: DarkVariant) => setDarkVariantState(variant), []);
  const toggleDarkVariant = useCallback(() => {
    setDarkVariantState((variant) => (variant === "cyberpunk" ? "portal" : "cyberpunk"));
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme, darkVariant, setTheme, toggle, setDarkVariant, toggleDarkVariant }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const c = useContext(ThemeCtx);
  if (!c) throw new Error("useTheme must be used inside ThemeProvider");
  return c;
}

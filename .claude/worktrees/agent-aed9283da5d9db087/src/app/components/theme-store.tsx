import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "dark" | "light";

const KEY = "eclipse-theme-v1";
const DEFAULT_THEME: Theme = "dark";

const META_COLOR: Record<Theme, string> = {
  dark: "#06000f",
  light: "#e6dff2",
};

type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void };

const ThemeCtx = createContext<Ctx | null>(null);

function applyTheme(t: Theme) {
  const html = document.documentElement;
  html.classList.toggle("theme-light", t === "light");
  html.classList.toggle("theme-dark", t === "dark");
  html.dataset.theme = t;

  let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.content = META_COLOR[t];
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    try {
      const saved = localStorage.getItem(KEY) as Theme | null;
      if (saved === "dark" || saved === "light") return saved;
    } catch {}
    return DEFAULT_THEME;
  });

  useEffect(() => {
    applyTheme(theme);
    try { localStorage.setItem(KEY, theme); } catch {}
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggle = useCallback(() => setThemeState((t) => (t === "dark" ? "light" : "dark")), []);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const c = useContext(ThemeCtx);
  if (!c) throw new Error("useTheme must be used inside ThemeProvider");
  return c;
}

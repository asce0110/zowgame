import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { DEFAULT_CONTENT } from "../data/cobb-can-move-content";

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
  setContent: (c: SiteContent) => void;
  reset: () => void;
};

const ContentContext = createContext<Ctx | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULT_CONTENT, ...JSON.parse(raw) };
    } catch {}
    return DEFAULT_CONTENT;
  });

  useEffect(() => {
    document.title = content.seoTitle;
    const setMeta = (name: string, val: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", val);
    };
    setMeta("description", content.seoDescription);
    setMeta("keywords", content.seoKeywords);
  }, [content.seoTitle, content.seoDescription, content.seoKeywords]);

  const setContent = (c: SiteContent) => {
    setContentState(c);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch {}
  };

  const reset = () => {
    setContentState(DEFAULT_CONTENT);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return <ContentContext.Provider value={{ content, setContent, reset }}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be inside ContentProvider");
  return ctx;
}

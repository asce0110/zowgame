import { createContext, useContext, useEffect, useState, ReactNode } from "react";

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

const DEFAULT_CONTENT: SiteContent = {
  title: "COBB CAN MOVE",
  subtitle:
    "Play Cobb Can Move online for free. Survive a dark pixel dungeon, collect coal, keep the furnace alive, and adapt as Cobb gains new rules every level.",
  genre: "SURVIVAL HORROR · ROGUELITE · PIXEL ART",
  description:
    "A survival horror browser game where every level changes the rules and Cobb gains new ways to hunt you.",
  coverImg: "https://img.itch.zone/aW1hZ2UvMzYwOTU0OC8yMTU0MzQ0NS5wbmc=/original/HuOTwj.png",
  iframeUrl: "https://html-classic.itch.zone/html/14116516/index.html",
  trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  rating: "4.7",
  avgSession: "18",

  seoTitle: "Cobb Can Move - Play Online Free in Browser",
  seoDescription:
    "Play Cobb Can Move online for free in your browser. Explore a dark pixel dungeon, collect coal, keep the light alive, and survive Cobb as the rules change every level.",
  seoKeywords:
    "cobb can move, cobb can move online, play cobb can move online free, cobb can move game, cobb can move no download, cobb can move browser game, cobb can move horror game, cobb can move controls, cobb can move download, cobb can move steam, cobb can move mobile, survival horror browser game, roguelite horror game",

  about: [
    "Cobb Can Move is a top-down survival horror game built around one simple idea: the rules do not stay the same. Each level gives Cobb a new way to hunt you, forcing you to change your route, your timing, and your survival strategy.",
    "You explore a dark pixel dungeon, search for coal, keep the furnace alive, and complete each floor while a red monster learns how to track you. Sometimes Cobb can hear. Sometimes Cobb can see. Sometimes Cobb can smell. Sometimes Cobb can duplicate.",
    "The game mixes short replayable runs, procedural dungeon layouts, tense sound design, and compact but memorable horror pacing. It is easy to start, but every new rule turns familiar rooms into fresh danger.",
  ],

  faqs: [
    {
      q: "What is Cobb Can Move?",
      a: "Cobb Can Move is a survival horror browser game where the rules change every level. You explore a dark pixel dungeon, collect coal, keep the furnace lit, and avoid Cobb, a monster that can gain new ways to track you.",
    },
    {
      q: "Where can I play Cobb Can Move online for free?",
      a: "You can play Cobb Can Move online on this page directly in your browser. The official version is also available on itch.io from developer abho.",
    },
    {
      q: "Is Cobb Can Move free to play?",
      a: "Yes. Cobb Can Move is free to play in the browser. The official itch.io page also offers a downloadable Windows version with a name-your-own-price option.",
    },
    {
      q: "How do you play Cobb Can Move?",
      a: "Explore the dungeon, collect coal, bring it to the furnace, and survive while Cobb hunts you. Each level changes the rules, so you must adjust your movement, route, and timing based on Cobb's current ability.",
    },
    {
      q: "What are the controls for Cobb Can Move?",
      a: "Use WASD or the Arrow Keys to move. Use E or Spacebar to interact, pick up items, or drop items. The game is best played on a desktop or laptop with a keyboard, though gamepad input is supported.",
    },
    {
      q: "What does it mean when the rules change in Cobb Can Move?",
      a: "The rule system changes how Cobb behaves. Cobb may hear your footsteps, see you in light, smell your trail, reach farther, or duplicate. Every new rule forces you to change your survival strategy.",
    },
    {
      q: "How do you survive Cobb Can Move?",
      a: "Read the active rule before moving, keep the furnace lit, avoid open spaces when Cobb can see, move carefully when Cobb can hear, and vary your route when Cobb can smell. Surviving depends on adapting quickly.",
    },
    {
      q: "Can I play Cobb Can Move on mobile?",
      a: "Cobb Can Move is an HTML5 game, but it is designed mainly for keyboard or gamepad input. Some mobile browsers may load the game, but desktop play is recommended for better control.",
    },
    {
      q: "Where can I download Cobb Can Move?",
      a: "The official Cobb Can Move download is available on the developer's itch.io page. The game currently supports HTML5 browser play and a Windows download version.",
    },
    {
      q: "Is Cobb Can Move on Steam?",
      a: "As of May 12, 2026, there is no official Steam store page surfaced in public search results. The official distribution source is the developer's itch.io page.",
    },
  ],

  notifications: [
    {
      id: "n1",
      title: "Official source available on itch.io",
      body: "The original Cobb Can Move page is published by abho and includes the Windows download build.",
      tag: "SOURCE",
      tone: "cyan",
      time: "now",
    },
    {
      id: "n2",
      title: "Version 1.5.2 is the latest public build",
      body: "Recent public devlogs mention balancing and follow-up fixes after the bigger 1.5 update.",
      tag: "UPDATE",
      tone: "fuchsia",
      time: "recent",
    },
    {
      id: "n3",
      title: "Keyboard and gamepad supported",
      body: "Desktop play is recommended for the best control and visibility in late-run pressure moments.",
      tag: "INFO",
      tone: "emerald",
      time: "guide",
    },
  ],
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

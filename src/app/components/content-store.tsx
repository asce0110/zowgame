import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type FaqItem = { q: string; a: string };

export type SiteContent = {
  // Game
  title: string;
  subtitle: string;
  genre: string;
  description: string;
  coverImg: string;
  iframeUrl: string;
  trailerUrl: string;
  rating: string;
  avgSession: string;

  // SEO meta
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;

  // About paragraphs
  about: string[];

  // FAQ
  faqs: FaqItem[];
};

const DEFAULT_CONTENT: SiteContent = {
  title: "ECLIPSE PROTOCOL",
  subtitle: "Drop into a fractured neon city. 100 players, one survivor. Master the rooftops, hack the grid, claim the throne. No download. No login. Just play.",
  genre: "FPS · BATTLE ROYALE",
  description: "A vertical-first browser battle royale.",
  coverImg: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1800&q=80",
  iframeUrl: "https://chromedino.com/",
  trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  rating: "9.4",
  avgSession: "23",

  seoTitle: "Eclipse Protocol — Free Browser Battle Royale | Play Now",
  seoDescription: "Play Eclipse Protocol free in your browser. 100-player battle royale, no download, no login. Drops you into a match in 12 seconds.",
  seoKeywords: "eclipse protocol, battle royale, browser shooter, free fps, online multiplayer game, no download, unblocked",

  about: [
    "Eclipse Protocol is a free-to-play browser-based battle royale shooter set in a fractured neon megacity during a 23-minute planetary eclipse. One hundred players drop into the grid simultaneously, and only one walks out. Built with WebGL and optimized for instant play, the game runs at 60 frames per second in your browser without a single download.",
    "What sets Eclipse Protocol apart from other online FPS games is its vertical-first map design. Every block has rooftops, walkways, and grappleable surfaces, encouraging players to fight in three dimensions. Combined with a built-in wingsuit and grid-hacking mechanics, the game rewards creative routing as much as raw aim.",
    "Whether you have five minutes of downtime or a full evening to grind ranked, Eclipse Protocol meets you where you are. Quick Match drops you into a lobby in under twelve seconds. Squad Up lets you team with up to three friends using a single share code — no account required for any of it.",
  ],

  faqs: [
    { q: "Is Eclipse Protocol free to play?", a: "Yes. Eclipse Protocol is 100% free to play in your browser. No download, no account, no credit card required. Just hit play and you're in a match within 12 seconds." },
    { q: "Do I need to download anything?", a: "No. The game runs entirely in your browser using WebGL. It works on Chrome, Firefox, Edge, Safari, and any modern browser. There's nothing to install on your device." },
    { q: "Can I play Eclipse Protocol on mobile?", a: "Yes. The game supports touch controls on iOS and Android browsers. We recommend Chrome on Android and Safari on iOS for the smoothest experience. A controller works too if you have one paired." },
    { q: "How do I get better at Eclipse Protocol?", a: "Land smart, not aggressive. Most new players die in the first 60 seconds because they fight before they're geared. Glide past hot drops, loot rooftops, learn one weapon class deeply, and practice movement in the warmup lobby." },
    { q: "Is there a way to play with friends?", a: "Yes. From the main menu, click 'Squad Up' and share your lobby code. Up to 4 players can squad together, and voice chat is built in — no third-party app needed." },
    { q: "Why is the game called Eclipse Protocol?", a: "The story takes place during a planetary eclipse that knocks out the city's surveillance grid for exactly 23 minutes. Players are agents racing to seize control before the grid comes back online." },
    { q: "Are there hackers or cheaters?", a: "Eclipse Protocol uses server-side anti-cheat with kernel-level detection on PC clients. Cheating reports are processed within 24 hours. The game also has a separate matchmaking pool for verified accounts." },
    { q: "Can I unblock Eclipse Protocol at school?", a: "The game runs in any browser without downloads, so most school networks allow it. If your school blocks the main domain, our partner mirrors at .io and .net work as drop-in replacements." },
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
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  return <ContentContext.Provider value={{ content, setContent, reset }}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be inside ContentProvider");
  return ctx;
}

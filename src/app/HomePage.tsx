"use client";
import Link from "next/link";
import { BookOpen, ChevronRight, Compass, Flame, Gamepad2, Grid3X3, Menu, Play, Search, Shield, Sparkles, Star, Swords, Trophy, X, Zap, Ghost, Skull } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { trackEvent } from "./lib/analytics";
import { getPublishedGames } from "./data/games";
import type { GameRecord } from "./data/games";
import { SmoothScroll } from "./components/smooth-scroll";
import { ParticleBg } from "./components/particle-bg";

const iconBank = [Shield, Swords, Sparkles, Flame, Zap, Trophy, Compass, BookOpen, Map, Skull, Ghost] as const;

function pickIcon(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return iconBank[Math.abs(h) % iconBank.length];
}

const colorBank = ["#1f6f5b", "#315f9f", "#c64f2f", "#6c4f8f", "#b8872f", "#2f7a90", "#8f5f43", "#517a35", "#984c38", "#5b7c2d", "#7c533b", "#4b5f78"];
const coverBank = [
  "from-emerald-200 via-lime-100 to-orange-100",
  "from-sky-200 via-blue-100 to-amber-100",
  "from-orange-200 via-amber-100 to-rose-100",
  "from-purple-200 via-stone-100 to-rose-100",
  "from-yellow-200 via-stone-100 to-emerald-100",
  "from-cyan-200 via-stone-100 to-lime-100",
  "from-stone-300 via-orange-100 to-sky-100",
  "from-green-200 via-yellow-100 to-stone-100",
  "from-rose-200 via-amber-100 to-stone-100",
  "from-lime-200 via-emerald-100 to-yellow-100",
  "from-amber-200 via-stone-100 to-purple-100",
  "from-slate-300 via-stone-100 to-orange-100",
];

type CardGame = {
  title: string;
  href: string;
  genre: string;
  status: "PLAY" | "GUIDE" | "WIKI";
  rating: string;
  plays: string;
  guide: string;
  color: string;
  cover: string;
  icon: any;
  image?: string;
  size?: "featured" | "wide";
};

function buildCardGames(games: GameRecord[]): CardGame[] {
  return games.map((g, i) => ({
    title: g.shortTitle,
    href: g.canonicalPath,
    genre: g.content.genre.split("·")[0].trim(),
    status: g.accessMode === "download" ? ("GUIDE" as const) : ("PLAY" as const),
    rating: g.content.rating,
    plays: "—",
    guide: g.accessMode === "download" ? "Download" : "Play now",
    color: colorBank[i % colorBank.length],
    cover: coverBank[i % coverBank.length],
    icon: pickIcon(g.slug),
    image: g.cardImage || g.content.coverImg || g.ogImage,
    size: (i === 0 ? "featured" : undefined) as "featured" | undefined,
  }));
}

const categories = ["All", "Horror", "Puzzle", "Arcade", "Roguelite", "Strategy"];

function GameCard({ game: g, compact = false }: { game: CardGame; compact?: boolean }) {
  const Icon = g.icon;
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };
  return (
    <Link
      ref={cardRef}
      href={g.href}
      onClick={() => {
        trackEvent(g.status === "GUIDE" ? "guide_nav_click" : "play_click", {
          location: "home_grid",
          game: g.title.toLowerCase().replace(/\s+/g, "-"),
        });
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex min-h-[190px] cursor-pointer flex-col overflow-hidden rounded-[1.45rem] border-2 border-foreground bg-card text-left shadow-[5px_5px_0_#24312c] transition duration-200 hover:-translate-y-1 hover:shadow-[7px_7px_0_#24312c] focus:outline-none focus:ring-4 focus:ring-ring/40 ${g.size === "featured" && !compact ? "md:col-span-2 md:row-span-2 md:min-h-[420px]" : ""} ${g.size === "wide" && !compact ? "md:col-span-2" : ""}`}
      style={{ perspective: "800px", transformStyle: "preserve-3d" }}
    >
      <div className={`relative overflow-hidden ${g.image ? "flex-1 min-h-[140px]" : "flex-1 p-4 bg-gradient-to-br " + g.cover}`}>
        {g.image ? (
          <img src={g.image} alt={g.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(45deg,rgba(36,49,44,.22)_1px,transparent_1px)] [background-size:15px_15px]" />
        )}
        <div className="relative flex items-start justify-between gap-3 p-4">
          <span className="rounded-full border-2 border-foreground bg-card px-3 py-1 font-mono text-[10px] font-black tracking-[.18em]">{g.status}</span>
          <span className="inline-flex items-center gap-1 rounded-full border-2 border-foreground bg-white/70 px-2 py-1 text-xs font-black"><Star className="h-3 w-3 fill-[#c39a2f] text-[#c39a2f]" />{g.rating}</span>
        </div>
        {!g.image && (
          <div className="relative mt-8 grid place-items-center">
            <span className="grid h-20 w-20 rotate-[-5deg] place-items-center rounded-[1.4rem] border-2 border-foreground text-white shadow-[4px_4px_0_#24312c] transition group-hover:rotate-3" style={{ backgroundColor: g.color }}><Icon className="h-9 w-9" /></span>
          </div>
        )}
      </div>
      <div className="border-t-2 border-foreground p-4">
        <div className="flex items-center justify-between gap-2"><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-muted-foreground">{g.genre}</p><p className="font-mono text-[10px] font-black text-accent">{g.plays}</p></div>
        <h3 className="mt-2 font-['Fredoka'] text-2xl font-black leading-none">{g.title}</h3>
        <div className="mt-3 flex items-center justify-between gap-2"><span className="rounded-full bg-secondary px-3 py-1 text-xs font-black">{g.guide}</span><span className="inline-flex items-center gap-1 text-sm font-black text-primary">Open <ChevronRight className="h-4 w-4" /></span></div>
      </div>
    </Link>
  );
}

export function HomePage() {
  const rawGames = getPublishedGames();
  const cardGames = useMemo(() => buildCardGames(rawGames), [rawGames]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const fullTitle = "A playable arcade with guidebook depth.";
  const [typewriterText, setTypewriterText] = useState(fullTitle);

  useEffect(() => {
    let i = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!deleting) {
        i++;
        setTypewriterText(fullTitle.slice(0, i));
        if (i >= fullTitle.length) {
          timeout = setTimeout(() => { deleting = true; tick(); }, 3000);
          return;
        }
      } else {
        i--;
        setTypewriterText(fullTitle.slice(0, i));
        if (i <= 0) {
          timeout = setTimeout(() => { deleting = false; tick(); }, 2000);
          return;
        }
      }
      timeout = setTimeout(tick, deleting ? 50 : 100);
    };

    timeout = setTimeout(tick, 180);
    return () => clearTimeout(timeout);
  }, []);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const root = heroRef.current;
    const badge = root.querySelector("[data-anime='badge']") as HTMLElement;
    const title = root.querySelector("[data-anime='title']") as HTMLElement;
    const desc = root.querySelector("[data-anime='desc']") as HTMLElement;
    const stats = root.querySelectorAll("[data-anime='stat']");
    const featuredBoard = root.querySelector("[data-anime='featured']") as HTMLElement;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(badge, { scale: 0, rotate: 6, opacity: 0 }, { scale: 1, rotate: -2, opacity: 1, duration: 0.5, ease: "back.out(2)" });
    tl.fromTo(title, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.12);
    tl.fromTo(desc, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.28);
    tl.fromTo(stats, { y: 40, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }, 0.46);
    tl.fromTo(featuredBoard, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, 0.58);

    return () => { tl.kill(); };
  }, []);
  const visibleGames = useMemo(() => {
    return activeCategory === "All" ? cardGames : cardGames.filter((g) => g.genre.toLowerCase().includes(activeCategory.toLowerCase()) || g.title.toLowerCase().includes(activeCategory.toLowerCase()));
  }, [activeCategory, cardGames]);

  const updates = useMemo(() => [
    { title: "Survival Guide", body: "Cobb Can Move — controls, rules, coal routes, and furnace strategy.", href: "/games/cobb-can-move/#how-to-play-section", bg: "bg-accent text-accent-foreground", img: cardGames[0]?.image },
    { title: "Items & Endings", body: "Don't Sleep With The Fishes — 35+ items, 12+ endings, crew guide.", href: "/games/dont-sleep-with-the-fishes/items/", bg: "bg-primary text-primary-foreground", img: cardGames[1]?.image },
    { title: "How to Play", body: "Controls, walkthrough, FAQ, and event counters for every game in the collection.", href: "#discover", bg: "bg-[#c39a2f] text-foreground" },
  ], [cardGames]);

  return (
    <SmoothScroll>
      <ParticleBg />
      <main className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-accent selection:text-accent-foreground" style={{ fontFamily: "Nunito, sans-serif" }}>
      {/* Skip to main content — accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:border-2 focus:border-foreground focus:bg-accent focus:text-accent-foreground focus:px-4 focus:py-2 focus:font-extrabold focus:shadow-[3px_3px_0_#24312c]">Skip to main content</a>

      <div className="pointer-events-none fixed inset-0 [background:radial-gradient(circle_at_18%_18%,rgba(255,246,220,.95)_0_14%,transparent_32%),linear-gradient(115deg,transparent_0_52%,rgba(31,111,91,.12)_52%_100%),linear-gradient(rgba(36,49,44,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(36,49,44,.07)_1px,transparent_1px)] [background-size:auto,auto,34px_34px,34px_34px]" />

      <aside className="fixed bottom-3 left-3 right-3 top-auto z-50 rounded-[1.6rem] border-2 border-foreground bg-card/90 shadow-[5px_5px_0_#24312c] backdrop-blur md:bottom-6 md:left-6 md:right-auto md:top-6 md:w-[248px]">
        <div className="flex h-16 items-center justify-between px-4 md:h-full md:flex-col md:items-stretch md:justify-start md:p-5">
          <Link href="/" className="flex min-h-11 items-center gap-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-ring/40">
            <span className="grid h-11 w-11 rotate-[-6deg] place-items-center rounded-2xl border-2 border-foreground bg-accent text-accent-foreground shadow-[3px_3px_0_#24312c] overflow-hidden"><img src="/logo-symbol.svg" alt="ZowGame" className="h-full w-full scale-125" /></span>
            <span className="hidden sm:block"><strong className="block font-['Space_Grotesk'] text-2xl font-bold leading-none">ZowGame</strong><span className="font-mono text-[10px] font-extrabold uppercase tracking-[.22em]">game atlas</span></span>
          </Link>
          <nav className="hidden md:mt-10 md:grid md:gap-3" aria-label="Main navigation">
            {[{ label: "Games", href: "#discover", icon: Grid3X3 }, { label: "Top Pick", href: "#featured", icon: Play }, { label: "Guides", href: "#guides", icon: BookOpen }].map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} className="group flex min-h-12 items-center gap-3 rounded-2xl border-2 border-transparent px-4 font-extrabold transition hover:border-foreground hover:bg-secondary hover:shadow-[3px_3px_0_#24312c] focus:outline-none focus:ring-4 focus:ring-ring/40" aria-label={`Navigate to ${label}`}>
                <Icon className="h-5 w-5 text-primary transition group-hover:rotate-[-8deg]" aria-hidden="true" />{label}
              </a>
            ))}
          </nav>
          <div className="hidden md:mt-auto md:block">
            <div className="rotate-[-1deg] rounded-2xl border-2 border-foreground bg-secondary p-4 shadow-[4px_4px_0_#24312c]"><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-accent">Library</p><p className="mt-2 font-['Fredoka'] text-2xl font-black leading-none">{cardGames.length} games ready to open.</p></div>
            <Link href="#discover" className="mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-foreground bg-primary px-5 font-extrabold text-primary-foreground shadow-[3px_3px_0_#24312c] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] focus:outline-none focus:ring-4 focus:ring-ring/40"><Search className="h-4 w-4" /> Search games</Link>
          </div>
          <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-xl border-2 border-foreground bg-secondary md:hidden">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && (
          <div className="grid gap-2 border-t-2 border-foreground p-4 md:hidden">
            {[{ label: "Games", href: "#discover" }, { label: "Top Pick", href: "#featured" }, { label: "Guides", href: "#guides" }].map(({ label, href }) => (
              <a key={label} href={href} className="rounded-xl border-2 border-foreground bg-secondary px-4 py-3 font-extrabold">{label}</a>
            ))}
          </div>
        )}
      </aside>

      <section className="relative mx-auto grid w-full gap-6 px-4 pb-8 pt-8 md:px-6 md:pl-[300px] lg:grid-cols-[1.05fr_.95fr]" ref={heroRef}>
        <div className="relative z-10 rounded-[2rem] border-2 border-foreground bg-card/85 p-6 shadow-[8px_8px_0_#24312c] md:p-8" id="main-content">
          <div className="mb-5 inline-flex rotate-[-2deg] items-center gap-2 rounded-full border-2 border-foreground bg-accent text-accent-foreground px-4 py-2 font-mono text-xs font-extrabold uppercase tracking-[.18em] shadow-[3px_3px_0_#24312c]" data-anime="badge"><Sparkles className="h-4 w-4" /> Browser game shelf</div>
          <h1 className="font-['Fredoka'] text-5xl font-black leading-[.88] tracking-[-.035em] md:text-7xl min-h-[1.8em]" data-anime="title">{typewriterText}<span className="animate-pulse text-accent">|</span></h1>
          <p className="mt-6 max-w-lg text-lg font-bold leading-relaxed text-muted-foreground" data-anime="desc">Quick-to-open browser games + wiki notes where you need them. No installs, just play.</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[[String(cardGames.length), "Games"], [String(cardGames.filter((g) => g.status === "PLAY").length), "Playable"], [String(cardGames.filter((g) => g.status === "GUIDE").length), "Guides"]].map(([n, l]) => (
              <div key={l} className="rounded-2xl border-2 border-foreground bg-background p-5 shadow-[3px_3px_0_#24312c]" data-anime="stat"><p className="font-['Fredoka'] text-5xl font-black">{n}</p><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-muted-foreground mt-1">{l}</p></div>
            ))}
          </div>
          <div className="mt-6">
            <a href="#discover" className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-2xl border-2 border-foreground bg-primary px-6 font-black text-primary-foreground shadow-[4px_4px_0_#24312c] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] transition text-base">
              Browse Games ↓
            </a>
          </div>
        </div>
        <div id="featured" className="relative rounded-[2rem] border-2 border-foreground shadow-[8px_8px_0_#24312c] overflow-hidden min-h-[420px]" data-anime="featured">
          {cardGames[0]?.image && (
            <img src={cardGames[0].image} alt={cardGames[0].title} className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-yellow-300 mb-2">Top Pick</p>
              <h2 className="font-['Fredoka'] text-3xl sm:text-4xl font-black text-white leading-none">{cardGames[0]?.title}</h2>
            </div>
            <Link
              href={cardGames[0]?.href ?? "#"}
              onClick={() => trackEvent("play_click", { location: "home_featured", game: cardGames[0]?.title.toLowerCase().replace(/\s+/g, "-") ?? "" })}
              className="shrink-0 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-2xl border-2 border-foreground bg-primary px-6 font-black text-primary-foreground shadow-[4px_4px_0_#24312c] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] transition"
            >
              <Play className="h-5 w-5 fill-current" /> Play now
            </Link>
          </div>
        </div>
      </section>

      <section id="discover" className="relative mx-auto w-full px-4 py-8 md:pl-[300px] md:pr-6" aria-labelledby="discover-heading">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="font-mono text-xs font-black uppercase tracking-[.22em] text-accent">Discover games</p><h2 id="discover-heading" className="font-['Fredoka'] text-5xl font-black">Many small cards, fast scanning.</h2></div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`min-h-11 shrink-0 cursor-pointer rounded-full border-2 border-foreground px-4 font-black shadow-[2px_2px_0_#24312c] transition ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"}`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {visibleGames.map((g) => <GameCard key={g.title} game={g} />)}
        </div>
      </section>

      <section id="guides" className="relative mx-auto grid w-full gap-5 px-4 py-10 md:pl-[300px] md:pr-6 lg:grid-cols-[.85fr_1.15fr]" aria-labelledby="guides-heading">
        <div className="rounded-[1.8rem] border-2 border-foreground bg-primary p-6 text-primary-foreground shadow-[6px_6px_0_#24312c]"><p className="font-mono text-xs font-black uppercase tracking-[.22em] opacity-80">Wiki supports play</p><h2 id="guides-heading" className="mt-3 font-['Fredoka'] text-4xl font-black leading-none">Guides are attached to games, not replacing games.</h2><p className="mt-4 text-lg font-bold leading-8 text-white/80">Cards lead with playability and genre; guide labels appear as helpful metadata: routes, endings, controls, items.</p></div>
        <div className="grid gap-3 sm:grid-cols-3">
          {updates.map(({ title, body, href, bg, img }, i) => (
              <Link key={title} href={href} className={`group relative rounded-[1.4rem] border-2 border-foreground shadow-[4px_4px_0_#24312c] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#24312c] cursor-pointer block overflow-hidden ${i === 0 ? "rotate-[-1deg]" : i === 1 ? "rotate-[1deg]" : "rotate-[1.5deg]"}`}>
                {img && <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" />}
                <div className={`relative p-5 ${img ? "bg-gradient-to-t from-black/60 to-transparent min-h-[140px] flex flex-col justify-end" : bg}`}>
                  <span className="inline-block rounded-full border-2 border-foreground bg-card px-3 py-0.5 font-mono text-[9px] font-black uppercase tracking-[.18em] text-foreground mb-3 w-fit">Guide {i + 1}</span>
                  <p className={`font-['Fredoka'] text-2xl font-black leading-tight ${img ? "text-white" : ""}`}>{title}</p>
                  <p className={`mt-2 font-bold leading-6 text-sm ${img ? "text-white/70" : "opacity-80"}`}>{body}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <section className="relative mx-auto w-full px-4 py-10 md:pl-[300px] md:pr-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            [String(cardGames.length), "Total Games", Gamepad2],
            [String(cardGames.filter((g: CardGame) => g.status === "PLAY").length), "Play in Browser", Play],
            [String(cardGames.filter((g: CardGame) => g.status === "GUIDE").length), "With Guides", BookOpen],
          ].map(([n, l, Icon]) => (
            <div key={l as string} className="rounded-2xl border-2 border-foreground bg-card p-6 text-center shadow-[4px_4px_0_#24312c]">
              <Icon className="w-6 h-6 mx-auto mb-2 text-accent" />
              <p className="font-['Fredoka'] text-4xl font-black">{n}</p>
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-muted-foreground mt-1">{l as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto w-full px-4 py-10 md:pl-[300px] md:pr-6">
        <div className="rounded-[1.8rem] border-2 border-foreground bg-card p-8 shadow-[5px_5px_0_#24312c]">
          <h2 className="font-['Fredoka'] text-3xl font-black mb-4">About ZowGame</h2>
          <div className="text-muted-foreground font-bold leading-relaxed space-y-3" style={{ fontSize: "15px" }}>
            <p>ZowGame is a curated game aggregation portal built for players who want instant browser access to indie games, paired with useful guides where they add value. Every game on this site is either playable directly in your browser without installation, or accompanied by a discovery guide that links to the official download source.</p>
            <p>We cover survival horror, puzzle, arcade, and roguelite browser games — with more titles added regularly. Each game page includes controls, gameplay tips, FAQ, and structured data to help search engines surface the right information.</p>
          </div>
        </div>
      </section>

      <footer className="relative mx-auto w-full px-4 pb-28 pt-6 md:pb-10 md:pl-[300px] md:pr-6">
        <div className="flex flex-col gap-4 rounded-[1.7rem] border-2 border-foreground bg-secondary p-6 font-black shadow-[5px_5px_0_#24312c] md:flex-row md:items-center md:justify-between">
          <span>© 2026 ZowGame — game aggregation first, wiki where useful.</span>
          <span className="flex items-center gap-4">
            <Link href="/privacy" className="font-mono text-xs uppercase tracking-[.22em] hover:text-foreground transition-colors">Privacy</Link>
            <span className="font-mono text-xs uppercase tracking-[.22em]">Light atlas arcade</span>
          </span>
        </div>
      </footer>
    </main>
    </SmoothScroll>
  );
}

export default HomePage;

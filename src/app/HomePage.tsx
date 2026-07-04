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

const colorBank = ["#c39a2f", "#315f9f", "#c64f2f", "#6c4f8f", "#b8872f", "#2f7a90", "#8f5f43", "#517a35", "#984c38", "#5b7c2d", "#7c533b", "#4b5f78"];
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
      className={`group relative flex min-h-[190px] cursor-pointer flex-col overflow-hidden rounded-[1.45rem] border border-amber-700/20 bg-card text-left shadow-[0_0_40px_rgba(0,0,0,0.4)] transition duration-200 hover:shadow-[0_0_60px_rgba(0,0,0,0.45)] focus:outline-none focus:ring-4 focus:ring-ring/40 ${g.size === "featured" && !compact ? "md:col-span-2 md:row-span-2 md:min-h-[420px]" : ""} ${g.size === "wide" && !compact ? "md:col-span-2" : ""}`}
      style={{ perspective: "800px", transformStyle: "preserve-3d" }}
    >
      <div className={`relative overflow-hidden ${g.image ? "flex-1 min-h-[140px]" : "flex-1 p-4 bg-gradient-to-br " + g.cover}`}>
        {g.image ? (
          <img src={g.image} alt={g.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(45deg,rgba(36,49,44,.22)_1px,transparent_1px)] [background-size:15px_15px]" />
        )}
        <div className="relative flex items-start justify-between gap-3 p-4">
          <span className="rounded-full border border-amber-700/20 bg-card px-3 py-1 font-mono text-[10px] font-black tracking-[.18em]">{g.status}</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-700/20 bg-white/70 px-2 py-1 text-xs font-black"><Star className="h-3 w-3 fill-[#c39a2f] text-[#c39a2f]" />{g.rating}</span>
        </div>
        {!g.image && (
          <div className="relative mt-8 grid place-items-center">
            <span className="grid h-20 w-20 rotate-[-5deg] place-items-center rounded-[1.4rem] border border-amber-700/20 text-white shadow-[0_0_30px_rgba(0,0,0,0.35)] transition group-hover:rotate-3" style={{ backgroundColor: g.color }}><Icon className="h-9 w-9" /></span>
          </div>
        )}
      </div>
      <div className="border-t border-amber-700/20 p-4">
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
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const root = heroRef.current;
    const badge = root.querySelector("[data-anime='badge']") as HTMLElement;
    const title = root.querySelector("[data-anime='title']") as HTMLElement;
    const desc = root.querySelector("[data-anime='desc']") as HTMLElement;
    const featuredBoard = root.querySelector("[data-anime='featured']") as HTMLElement;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(title, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    tl.fromTo(desc, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.12);
    tl.fromTo(featuredBoard, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, 0.28);

    return () => { tl.kill(); };
  }, []);
  const visibleGames = cardGames;

  const updates = useMemo(() => {
    var bgGuideColors = ["bg-accent text-amber-50", "bg-primary text-amber-50", "bg-amber-600 text-amber-50"];
    return cardGames.slice(0, 3).map(function(g, i) {
      return {
        title: `${g.title} Guide`,
        body: `Tips, walkthrough, and strategy for ${g.title}.`,
        href: g.href,
        bg: bgGuideColors[i % bgGuideColors.length],
        img: g.image,
      };
    });
  }, [cardGames]);

  return (
    <SmoothScroll>
      <ParticleBg />
      <main className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-accent selection:text-amber-50" style={{ fontFamily: "Nunito, sans-serif" }}>
      {/* Skip to main content — accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:border-2 focus:border-foreground focus:bg-accent focus:text-amber-50 focus:px-4 focus:py-2 focus:font-extrabold focus:shadow-[0_0_25px_rgba(0,0,0,0.3)]">Skip to main content</a>

      <div className="pointer-events-none fixed inset-0 opacity-[0.05] [background-image:radial-gradient(circle,rgba(195,154,47,.25)_1px,transparent_1px),radial-gradient(ellipse_at_50%_-20%,rgba(195,154,47,.08)_0%,transparent_60%)] [background-size:32px_32px,100%_100%]" />

      <aside className="fixed bottom-3 left-3 right-3 top-auto z-50 rounded-[1.6rem] border border-amber-700/20 bg-card/90 shadow-[0_0_40px_rgba(0,0,0,0.4)] backdrop-blur md:bottom-6 md:left-6 md:right-auto md:top-6 md:w-[220px]">
        {/* Gothic ornament */}
          <div className="hidden md:flex items-center justify-center gap-2 pt-3 pb-1" aria-hidden="true">
            <div className="h-px w-6 bg-gradient-to-r from-amber-500/20 to-transparent" /><span className="text-amber-400/40 text-[10px]">♦</span><div className="h-px w-6 bg-gradient-to-l from-amber-500/20 to-transparent" />
          </div>
        <div className="flex h-16 items-center justify-between px-4 md:h-full md:flex-col md:items-stretch md:justify-start md:p-5">
          <Link href="/" className="flex min-h-11 items-center gap-3 rounded-xl logo-hover focus:outline-none focus:ring-4 focus:ring-ring/40">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-600/30 bg-amber-500/10 shadow-[0_0_15px_rgba(195,154,47,0.1)] overflow-hidden animate-pulse" style={{ animationDuration: "3s" }}><img src="/logo-symbol.svg" alt="ZowGame" className="h-full w-full scale-125" /></span>
            <span className="hidden sm:block"><strong className="block font-['Space_Grotesk'] text-2xl font-bold leading-none text-amber-400 animate-pulse" style={{ animationDuration: "4s" }}>ZowGame</strong><span className="font-mono text-[10px] font-extrabold uppercase tracking-[.22em]">game atlas</span></span>
          </Link>
          <nav className="hidden md:mt-10 md:grid md:gap-3" aria-label="Main navigation">
            {[{ label: "Games", href: "#discover", icon: Grid3X3 }, { label: "Top Pick", href: "#featured", icon: Play }, { label: "Guides", href: "#guides", icon: BookOpen }].map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} className="group flex min-h-12 items-center gap-3 rounded-2xl border-2 border-transparent px-4 font-extrabold transition hover:border-foreground hover:bg-secondary hover:shadow-[0_0_25px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-4 focus:ring-ring/40" aria-label={`Navigate to ${label}`}>
                <Icon className="h-5 w-5 text-primary transition group-hover:rotate-[-8deg]" aria-hidden="true" />{label}
              </a>
            ))}
          </nav>
          <div className="hidden md:mt-auto md:block">
            <div className=" rounded-2xl border border-amber-700/20 bg-secondary p-4 shadow-[0_0_30px_rgba(0,0,0,0.35)]"><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-accent">Library</p><p className="mt-2 font-['Fredoka'] text-2xl font-black leading-none">{cardGames.length} games ready to open.</p></div>
            <Link href="#discover" className="mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-amber-700/20 bg-primary px-5 font-extrabold text-amber-50 shadow-[0_0_25px_rgba(0,0,0,0.3)] transition hover:shadow-[0_0_15px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-4 focus:ring-ring/40"><Search className="h-4 w-4" /> Search games</Link>
          </div>
          <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-xl border border-amber-700/20 bg-secondary md:hidden">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && (
          <div className="grid gap-2 border-t border-amber-700/20 p-4 md:hidden">
            {[{ label: "Games", href: "#discover" }, { label: "Top Pick", href: "#featured" }, { label: "Guides", href: "#guides" }].map(({ label, href }) => (
              <a key={label} href={href} className="rounded-xl border border-amber-700/20 bg-secondary px-4 py-3 font-extrabold">{label}</a>
            ))}
          </div>
        )}
      </aside>

      <section className="relative mx-auto grid w-full gap-6 px-4 pb-8 pt-8 md:px-6 md:pl-[268px] lg:grid-cols-[.75fr_1.25fr]" ref={heroRef}>
        <div className="relative z-10 rounded-[2rem] border border-amber-700/20 shadow-[0_0_70px_rgba(0,0,0,0.5)] md:p-8 flex flex-col justify-center overflow-hidden -rotate-[0.5deg]" id="main-content" style={{ background: "linear-gradient(to bottom, #0b0e0c 0%, #1a211e 100%)" }}>
          <div className="absolute -top-[2px] left-[8%] right-[8%] h-[50px] border border-amber-500/30 border-b-0 rounded-t-[100px] pointer-events-none z-10" />
          <div className="absolute top-[10px] left-[12%] right-[12%] h-[35px] border border-amber-400/20 border-b-0 rounded-t-[70px] pointer-events-none z-10" />
          <div className="absolute top-4 left-4 z-20 pointer-events-none"><div className="w-6 h-6 border-t-2 border-l-2 border-amber-500/40" /><div className="absolute top-[-2px] left-[22px] w-2 h-2 bg-amber-500/30 rounded-full" /></div>
          <div className="absolute top-4 right-4 z-20 pointer-events-none"><div className="w-6 h-6 border-t-2 border-r-2 border-amber-500/40" /><div className="absolute top-[-2px] right-[22px] w-2 h-2 bg-amber-500/30 rounded-full" /></div>
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none"><div className="w-6 h-6 border-b-2 border-l-2 border-amber-500/40" /></div>
          <div className="absolute bottom-4 right-4 z-20 pointer-events-none"><div className="w-6 h-6 border-b-2 border-r-2 border-amber-500/40" /></div>
          <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 text-amber-400/50 text-xl z-20 pointer-events-none">♦</div>
          <span className="absolute top-[26px] left-[26px] text-amber-400/30 text-sm z-20 pointer-events-none">✦</span>
          <span className="absolute top-[26px] right-[26px] text-amber-400/30 text-sm z-20 pointer-events-none">✦</span>
          <span className="absolute bottom-[26px] left-[26px] text-amber-400/30 text-sm z-20 pointer-events-none">✦</span>
          <span className="absolute bottom-[26px] right-[26px] text-amber-400/30 text-sm z-20 pointer-events-none">✦</span>
          <div className="absolute inset-[8px] border border-amber-500/10 rounded-[1.85rem] pointer-events-none z-10" />
        
          {/* Notebook ruled lines */}
          
          {/* Red margin line */}
          
          {/* Spiral binding holes */}
          
          <div className="relative pl-12 py-6 pr-6">
            <h1 className="font-['Fredoka'] text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.92] tracking-tight" data-anime="title">Free Browser Games + Survival Guides</h1>
            <p className="mt-4 text-base font-bold leading-relaxed text-muted-foreground" data-anime="desc">Quick-to-open browser games + wiki notes. No installs, just play.</p>
            <div className="mt-6">
              <a href="#discover" className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-2xl border border-amber-700/20 bg-primary px-6 font-black text-amber-50 shadow-[0_0_30px_rgba(0,0,0,0.35)] hover:shadow-[0_0_15px_rgba(0,0,0,0.25)] transition text-base">
                Browse Games ↓
              </a>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <div id="featured" className="relative rounded-[2rem] border border-amber-700/20 shadow-[0_0_70px_rgba(0,0,0,0.5)] overflow-hidden flex-1" data-anime="featured">
            {cardGames[0]?.image && (
              <img src={cardGames[0].image} alt={cardGames[0].title} className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e0c]/90 via-[#0b0e0c]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-amber-400 mb-1 drop-shadow-[0_0_6px_rgba(195,154,47,0.4)]">♦ Top Pick</p>
                <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-black text-amber-200 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{cardGames[0]?.title}</h2>
              </div>
              <Link
                href={cardGames[0]?.href ?? "#"}
                onClick={() => trackEvent("play_click", { location: "home_featured", game: cardGames[0]?.title.toLowerCase().replace(/\s+/g, "-") ?? "" })}
                className="shrink-0 inline-flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border-2 border-amber-500/50 bg-card/80 backdrop-blur px-6 font-black text-amber-300 uppercase tracking-[0.12em] transition-all duration-300 hover:border-amber-400/70 hover:text-amber-200 hover:shadow-[0_0_25px_rgba(195,154,47,0.35),0_0_50px_rgba(195,154,47,0.1)] hover:scale-[1.03] active:scale-[0.97] text-sm"
              >
                <Play className="h-4 w-4 fill-current" /> Play
              </Link>
            </div>
          </div>
          {cardGames.length > 1 && (
            <div className="flex flex-col gap-4 w-44 shrink-0">
              {cardGames.slice(1, 3).map((g) => (
                <Link key={g.title} href={g.href} className="relative rounded-2xl border border-amber-700/20 shadow-[0_0_40px_rgba(0,0,0,0.4)] overflow-hidden h-36 group">
                  {g.image && <img src={g.image} alt={g.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e0c]/80 via-[#0b0e0c]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-['Fredoka'] text-lg font-black text-amber-200 leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">{g.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Gothic Divider */}
      <div className="flex items-center justify-center gap-4 py-6 mx-auto w-full px-4 md:pl-[268px] md:pr-6" aria-hidden="true">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-500/50 rounded-full" /><span className="text-amber-400/50 text-lg">◆</span><span className="w-1.5 h-1.5 bg-amber-500/50 rounded-full" /></div>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      </div>

      <section id="discover" className="relative mx-auto w-full px-4 py-8 md:pl-[268px] md:pr-6" aria-labelledby="discover-heading">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="font-mono text-xs font-black uppercase tracking-[.22em] text-amber-500/60">♦ Discover games ♦</p><h2 id="discover-heading" className="font-['Fredoka'] text-5xl font-black text-amber-300 drop-shadow-[0_0_15px_rgba(195,154,47,0.3)]">Many small cards, fast scanning.</h2></div>
        </div>
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {visibleGames.map((g) => <GameCard key={g.title} game={g} />)}
        </div>
      </section>
      {/* Gothic Divider */}
      <div className="flex items-center justify-center gap-4 py-6 mx-auto w-full px-4 md:pl-[268px] md:pr-6" aria-hidden="true">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-500/50 rounded-full" /><span className="text-amber-400/50 text-lg">◆</span><span className="w-1.5 h-1.5 bg-amber-500/50 rounded-full" /></div>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      </div>

      <section id="guides" className="relative mx-auto grid w-full gap-5 px-4 py-10 md:pl-[268px] md:pr-6 lg:grid-cols-[.85fr_1.15fr]" aria-labelledby="guides-heading">
        <div className="rounded-[1.8rem] border border-amber-700/20 bg-card p-6 shadow-[0_0_40px_rgba(0,0,0,0.3)]"><p className="font-mono text-xs font-black uppercase tracking-[.22em] text-amber-500/60">Wiki supports play</p><h2 id="guides-heading" className="mt-3 font-['Fredoka'] text-4xl font-black leading-none text-amber-300 drop-shadow-[0_0_15px_rgba(195,154,47,0.3)]">Guides are attached to games, not replacing games.</h2><p className="mt-4 text-lg font-bold leading-8 text-muted-foreground">Cards lead with playability and genre; guide labels appear as helpful metadata: routes, endings, controls, items.</p></div>
        <div className="grid gap-3 sm:grid-cols-3">
          {updates.map(({ title, body, href, bg, img }, i) => (
              <Link key={title} href={href} className={`group relative rounded-[1.4rem] border border-amber-700/20 shadow-[0_0_30px_rgba(0,0,0,0.35)] transition hover:shadow-[0_0_50px_rgba(0,0,0,0.4)] cursor-pointer block overflow-hidden ${i === 0 ? "" : i === 1 ? "" : ""}`}>
                {img && <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-opacity" />}
                <div className={`relative p-5 ${img ? "bg-gradient-to-t from-[#0b0e0c]/85 via-[#0b0e0c]/40 to-transparent min-h-[140px] flex flex-col justify-end" : bg}`}>
                  <span className="inline-block rounded-full border border-amber-700/20 bg-card px-3 py-0.5 font-mono text-[9px] font-black uppercase tracking-[.18em] text-foreground mb-3 w-fit">Guide {i + 1}</span>
                  <p className={`font-['Fredoka'] text-2xl font-black leading-tight ${img ? "text-white" : ""}`}>{title}</p>
                  <p className={`mt-2 font-bold leading-6 text-sm ${img ? "text-white/70" : "opacity-80"}`}>{body}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <section className="relative mx-auto w-full px-4 py-10 md:pl-[268px] md:pr-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            [String(cardGames.length), "⚔ Total Games", Gamepad2],
            [String(cardGames.filter((g: CardGame) => g.status === "PLAY").length), "◉ Play in Browser", Play],
            [String(cardGames.length), "☬ With Guides", BookOpen],
          ].map(([n, l, Icon]) => (
            <div key={l as string} className="rounded-2xl border border-amber-700/20 bg-card p-6 text-center shadow-[0_0_30px_rgba(0,0,0,0.35)]">
              <Icon className="w-6 h-6 mx-auto mb-2 text-accent" />
              <p className="font-['Fredoka'] text-4xl font-black text-amber-300 drop-shadow-[0_0_8px_rgba(195,154,47,0.4)]">{n}</p>
              <p className="font-mono text-[10px] font-black uppercase tracking-[.15em] text-amber-500/60 mt-1">{l as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto w-full px-4 py-10 md:pl-[268px] md:pr-6">
        <div className="rounded-[1.8rem] border border-amber-700/20 bg-card p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
          <h2 className="font-['Fredoka'] text-3xl font-black mb-4 text-amber-300">♦ About ZowGame ♦</h2>
          <div className="text-muted-foreground font-bold leading-relaxed space-y-3" style={{ fontSize: "15px" }}>
            <p>ZowGame is a curated game aggregation portal built for players who want instant browser access to indie games, paired with useful guides where they add value. Every game on this site is either playable directly in your browser without installation, or accompanied by a discovery guide that links to the official download source.</p>
            <p>We cover survival horror, puzzle, arcade, and roguelite browser games — with more titles added regularly. Each game page includes controls, gameplay tips, FAQ, and structured data to help search engines surface the right information.</p>
          </div>
        </div>
      </section>

      <footer className="relative mx-auto w-full px-4 pb-28 pt-6 md:pb-10 md:pl-[268px] md:pr-6">
        <div className="flex flex-col gap-4 rounded-[1.7rem] border border-amber-700/20 bg-secondary p-6 font-black shadow-[0_0_40px_rgba(0,0,0,0.4)] md:flex-row md:items-center md:justify-between">
          <span>© 2026 ZowGame — game aggregation first, wiki where useful.</span>
          <span className="flex items-center gap-4">
            <Link href="/privacy" className="font-mono text-xs uppercase tracking-[.22em] hover:text-foreground transition-colors">Privacy</Link>
            <span className="font-mono text-xs uppercase tracking-[.22em]">Dark fantasy ✦ game atlas</span>
          </span>
        </div>
      </footer>
    </main>
    </SmoothScroll>
  );
}

export default HomePage;

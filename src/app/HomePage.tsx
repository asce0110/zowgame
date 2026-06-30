"use client";
import { BookMarked, BookOpen, Castle, ChevronRight, Compass, Flag, Gamepad2, Map, Menu, Play, Search, Shield, Sparkles, Swords, X } from "lucide-react";
import { useState } from "react";

const expeditions = [
  { title: "Cobb Can Move", x: "left-[58%] top-[18%]", level: "Playable", tone: "bg-[#1f6f5b]", ring: "border-[#1f6f5b]", note: "Lantern routes + coal spawn atlas", icon: Castle },
  { title: "Excuse Me Sir", x: "left-[24%] top-[36%]", level: "Guide", tone: "bg-[#c64f2f]", ring: "border-[#c64f2f]", note: "Dialogue trees and stealth etiquette", icon: Flag },
  { title: "Dungeon Depths", x: "left-[67%] top-[58%]", level: "Playable", tone: "bg-[#315f9f]", ring: "border-[#315f9f]", note: "Relic index, floor notes, boss tells", icon: Swords },
  { title: "Pixel Asylum", x: "left-[38%] top-[72%]", level: "Wiki", tone: "bg-[#6c4f8f]", ring: "border-[#6c4f8f]", note: "Room clues, keys, endings", icon: Shield },
];

const shelves = [
  ["01", "Play first", "Open a browser game in a large reader-friendly play panel."],
  ["02", "Hint ladder", "Reveal hints gradually before seeing full spoilers."],
  ["03", "Atlas pages", "Maps, item lists, endings, routes and tiny discoveries."],
];

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(expeditions[0]);
  const ActiveIcon = active.icon;

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-accent selection:text-accent-foreground" style={{ fontFamily: "Nunito, sans-serif" }}>
      <div className="pointer-events-none fixed inset-0 [background:radial-gradient(circle_at_18%_18%,rgba(255,246,220,.95)_0_14%,transparent_32%),linear-gradient(115deg,transparent_0_52%,rgba(31,111,91,.14)_52%_100%),linear-gradient(rgba(36,49,44,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(36,49,44,.07)_1px,transparent_1px)] [background-size:auto,auto,34px_34px,34px_34px]" />

      <aside className="fixed bottom-3 left-3 right-3 top-auto z-50 rounded-[1.6rem] border-2 border-foreground bg-card/90 shadow-[5px_5px_0_#24312c] backdrop-blur md:bottom-6 md:left-6 md:right-auto md:top-6 md:w-[248px]">
        <div className="flex h-16 items-center justify-between px-4 md:h-full md:flex-col md:items-stretch md:justify-start md:p-5">
          <a href="#" className="flex min-h-11 items-center gap-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-ring/40">
            <span className="grid h-11 w-11 rotate-[-6deg] place-items-center rounded-2xl border-2 border-foreground bg-accent text-accent-foreground shadow-[3px_3px_0_#24312c]"><Gamepad2 className="h-5 w-5" /></span>
            <span className="hidden sm:block"><strong className="block font-[Fraunces] text-2xl leading-none">ZowGame</strong><span className="font-mono text-[10px] font-extrabold uppercase tracking-[.22em]">field wiki</span></span>
          </a>

          <nav className="hidden md:mt-10 md:grid md:gap-3">
            {[
              ["Map", Map],
              ["Play", Play],
              ["Wiki", BookOpen],
              ["Routes", Compass],
            ].map(([item, Icon]) => <a key={item as string} href={`#${(item as string).toLowerCase()}`} className="group flex min-h-12 items-center gap-3 rounded-2xl border-2 border-transparent px-4 font-extrabold transition hover:border-foreground hover:bg-secondary hover:shadow-[3px_3px_0_#24312c] focus:outline-none focus:ring-4 focus:ring-ring/40"><Icon className="h-5 w-5 text-primary transition group-hover:rotate-[-8deg]" />{item as string}</a>)}
          </nav>

          <div className="hidden md:mt-auto md:block">
            <div className="rotate-[-1deg] rounded-2xl border-2 border-foreground bg-secondary p-4 shadow-[4px_4px_0_#24312c]">
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-accent">Current quest</p>
              <p className="mt-2 font-[Fraunces] text-2xl font-black leading-none">Find a guide, then play.</p>
            </div>
            <button className="mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-foreground bg-primary px-5 font-extrabold text-primary-foreground shadow-[3px_3px_0_#24312c] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] focus:outline-none focus:ring-4 focus:ring-ring/40"><Search className="h-4 w-4" /> Search wiki</button>
          </div>

          <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-xl border-2 border-foreground bg-secondary md:hidden">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="grid gap-2 border-t-2 border-foreground p-4 md:hidden">{['Map','Play','Wiki','Routes'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="rounded-xl border-2 border-foreground bg-secondary px-4 py-3 font-extrabold">{item}</a>)}</div>}
      </aside>

      <section className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-28 pt-10 md:px-6 md:pl-[300px] lg:grid-cols-[.78fr_1.22fr] lg:pt-10">
        <div className="relative z-10">
          <div className="mb-7 inline-flex rotate-[-2deg] items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-2 font-mono text-xs font-extrabold uppercase tracking-[.18em] shadow-[3px_3px_0_#24312c]"><Sparkles className="h-4 w-4 text-accent" /> New atlas edition</div>
          <h1 className="font-[Fraunces] text-6xl font-black leading-[.86] tracking-[-.035em] md:text-8xl">Play the map. Read the secrets.</h1>
          <p className="mt-7 max-w-xl text-xl font-bold leading-8 text-muted-foreground">A bright adventure-desk redesign for ZowGame: browser games are islands, wiki pages are field notes, and walkthroughs sit beside the play button.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button className="inline-flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-foreground bg-primary px-6 text-lg font-black text-primary-foreground shadow-[5px_5px_0_#24312c] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#24312c] focus:outline-none focus:ring-4 focus:ring-ring/40"><Play className="h-5 w-5 fill-current" /> Start playing</button>
            <button className="inline-flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-foreground bg-card px-6 text-lg font-black shadow-[5px_5px_0_#24312c] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#24312c] focus:outline-none focus:ring-4 focus:ring-ring/40"><BookOpen className="h-5 w-5" /> Open guidebook</button>
          </div>
        </div>

        <div id="map" className="relative min-h-[620px] rounded-[2.4rem] border-2 border-foreground bg-[#fff1c8] p-5 shadow-[10px_10px_0_#24312c]">
          <div className="absolute left-5 top-5 z-20 rounded-full border-2 border-foreground bg-card px-4 py-2 font-mono text-xs font-extrabold uppercase tracking-[.2em]">Zow atlas / v2</div>
          <div className="absolute inset-5 overflow-hidden rounded-[1.8rem] border-2 border-foreground bg-[radial-gradient(circle_at_28%_38%,#b7d6aa_0_10%,transparent_11%),radial-gradient(circle_at_68%_28%,#f3cf83_0_12%,transparent_13%),radial-gradient(circle_at_62%_70%,#a9c4df_0_13%,transparent_14%),radial-gradient(circle_at_38%_74%,#d9b1d9_0_9%,transparent_10%),#f7df9d]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 650" aria-hidden="true">
              <path d="M220 250 C330 160, 430 190, 520 130 S690 145, 665 235 C640 335, 755 390, 650 475 S450 505, 365 440 C280 375, 190 420, 220 250Z" fill="none" stroke="#24312c" strokeWidth="5" strokeDasharray="12 13" strokeLinecap="round" />
              <path d="M110 520 C210 480,260 555,350 515 S480 430,570 510 S710 560,805 495" fill="none" stroke="#24312c" strokeWidth="3" opacity=".5" />
              <path d="M130 105 l28 18 -8 34 -32 5 -20 -25zM760 92 l40 24 -18 42 -42-4 -13-38zM115 430 l54-22 35 42 -37 48 -56-13z" fill="#fff6dc" stroke="#24312c" strokeWidth="3" opacity=".8" />
            </svg>
            {expeditions.map((item) => {
              const Icon = item.icon;
              const selected = item.title === active.title;
              return <button key={item.title} onClick={() => setActive(item)} className={`absolute ${item.x} z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-3xl border-2 bg-card p-3 text-left shadow-[5px_5px_0_#24312c] transition hover:-translate-y-[55%] focus:outline-none focus:ring-4 focus:ring-ring/40 ${selected ? item.ring : 'border-foreground'}`}>
                <div className="flex items-center gap-3"><span className={`grid h-12 w-12 place-items-center rounded-2xl border-2 border-foreground ${item.tone} text-white`}><Icon className="h-6 w-6" /></span><span><strong className="block min-w-36 font-[Fraunces] text-xl leading-none">{item.title}</strong><span className="font-mono text-[10px] font-black uppercase tracking-[.18em]">{item.level}</span></span></div>
              </button>;
            })}
          </div>
          <div className="absolute bottom-9 left-9 right-9 z-20 rounded-3xl border-2 border-foreground bg-card/95 p-5 shadow-[6px_6px_0_#24312c] backdrop-blur md:left-auto md:w-[420px]">
            <div className="flex items-start gap-4"><span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-2 border-foreground ${active.tone} text-white`}><ActiveIcon className="h-7 w-7" /></span><div><p className="font-mono text-xs font-black uppercase tracking-[.18em] text-accent">Selected expedition</p><h2 className="font-[Fraunces] text-3xl font-black">{active.title}</h2><p className="mt-2 font-bold text-muted-foreground">{active.note}</p></div></div>
          </div>
        </div>
      </section>

      <section id="play" className="relative mx-auto max-w-7xl px-4 py-12 md:pl-[300px] md:pr-6">
        <div className="grid overflow-hidden rounded-[2rem] border-2 border-foreground bg-card shadow-[8px_8px_0_#24312c] lg:grid-cols-[.9fr_1.1fr]">
          <div className="border-b-2 border-foreground bg-[#1f6f5b] p-8 text-primary-foreground lg:border-b-0 lg:border-r-2"><p className="font-mono text-xs font-black uppercase tracking-[.22em] opacity-80">Play window concept</p><h2 className="mt-4 font-[Fraunces] text-5xl font-black leading-none">The game stays center stage.</h2><p className="mt-5 text-lg font-bold leading-8 text-white/80">Instead of sending players away to read, ZowGame can pair the embedded game with spoiler-safe tabs: Controls, First Goal, Hints, Full Walkthrough.</p></div>
          <div className="p-5 md:p-8">
            <div className="rounded-[1.5rem] border-2 border-foreground bg-[#24312c] p-4 shadow-inner"><div className="flex items-center gap-2 border-b border-white/15 pb-3"><span className="h-3 w-3 rounded-full bg-[#c64f2f]" /><span className="h-3 w-3 rounded-full bg-[#f0c35a]" /><span className="h-3 w-3 rounded-full bg-[#76b878]" /><span className="ml-auto font-mono text-xs font-black uppercase tracking-[.18em] text-white/50">browser game embed</span></div><div className="grid aspect-video place-items-center"><button className="grid h-24 w-24 cursor-pointer place-items-center rounded-full border-2 border-white bg-accent text-accent-foreground shadow-[0_0_0_10px_rgba(255,246,220,.12)]"><Play className="h-10 w-10 fill-current" /></button></div></div>
          </div>
        </div>
      </section>

      <section id="wiki" className="relative mx-auto max-w-7xl px-4 py-12 md:pl-[300px] md:pr-6">
        <div className="mb-7 flex items-end justify-between"><div><p className="font-mono text-xs font-black uppercase tracking-[.22em] text-accent">Guidebook system</p><h2 className="font-[Fraunces] text-5xl font-black">Wiki cards with personality.</h2></div><BookMarked className="hidden h-12 w-12 text-primary md:block" /></div>
        <div className="grid gap-5 md:grid-cols-3">
          {shelves.map(([num, title, body], index) => <article key={title} className={`rounded-[1.7rem] border-2 border-foreground bg-card p-6 shadow-[6px_6px_0_#24312c] ${index === 1 ? 'rotate-[1.5deg] md:-mt-5' : index === 2 ? '-rotate-[1deg]' : 'rotate-[-.5deg]'}`}><span className="font-mono text-5xl font-black text-secondary-foreground/20">{num}</span><h3 className="mt-5 font-[Fraunces] text-3xl font-black">{title}</h3><p className="mt-3 text-lg font-bold leading-8 text-muted-foreground">{body}</p><a href="#" className="mt-5 inline-flex items-center gap-1 rounded-full bg-secondary px-4 py-2 font-black">Explore <ChevronRight className="h-4 w-4" /></a></article>)}
        </div>
      </section>

      <footer className="relative mx-auto max-w-7xl px-4 pb-28 pt-10 md:pb-10 md:pl-[300px] md:pr-6"><div className="flex flex-col gap-4 rounded-[1.7rem] border-2 border-foreground bg-secondary p-6 font-black shadow-[5px_5px_0_#24312c] md:flex-row md:items-center md:justify-between"><span>© 2026 ZowGame — playable atlas + wiki desk</span><span className="font-mono text-xs uppercase tracking-[.22em]">No neon / more character</span></div></footer>
    </main>
  );
}

export default HomePage;

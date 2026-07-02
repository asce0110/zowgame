"use client";
import { useState } from "react";
import Link from "next/link";
import { Home, BookOpen, Info, ArrowLeft, Menu, X, GitCommit } from "lucide-react";
import { useContent } from "./content-store";
import { ChangelogModal } from "./changelog-modal";

export type ViewId = "home" | "how-to-play" | "about";
export type SidebarView = ViewId;

const items: { id: SidebarView; icon: any; label: string }[] = [
  { id: "home", icon: Home, label: "Game" },
  { id: "how-to-play", icon: BookOpen, label: "How to Play" },
  { id: "about", icon: Info, label: "About" },
];

export function Sidebar({ active, onChange }: { active: SidebarView; onChange: (v: SidebarView) => void }) {
  const { game } = useContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [changelogEntry, setChangelogEntry] = useState<any>(null);

  const handleNav = (v: SidebarView) => {
    setMenuOpen(false);
    setTimeout(() => onChange(v), 50);
  };

  return (
    <>
      <aside className="fixed bottom-3 left-3 right-3 top-auto z-50 rounded-[1.6rem] border-2 border-foreground bg-card/90 shadow-[5px_5px_0_#24312c] backdrop-blur md:bottom-6 md:left-6 md:right-auto md:top-6 md:w-[220px]">
        <div className="flex h-16 items-center justify-between px-4 md:h-full md:flex-col md:items-stretch md:justify-start md:p-5">
          <Link href="/" className="flex min-h-11 items-center gap-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-ring/40" aria-label="Back to homepage">
            <span className="grid h-11 w-11 shrink-0 rotate-[-6deg] place-items-center rounded-2xl border-2 border-foreground bg-accent text-accent-foreground shadow-[3px_3px_0_#24312c] overflow-hidden">
              <img src="/logo-symbol.svg" alt="ZowGame" className="h-full w-full scale-125" />
            </span>
            <span className="hidden sm:block">
              <span className="block font-['Space_Grotesk'] text-[13px] font-bold leading-none">{game.shortTitle}</span>
              <span className="font-mono text-[10px] font-extrabold uppercase tracking-[.2em] text-accent">← Back to home</span>
            </span>
          </Link>
          <nav className="hidden md:mt-10 md:grid md:gap-3" aria-label="Game page navigation">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button key={item.id} onClick={() => onChange(item.id)}
                  className={`group flex min-h-12 items-center gap-3 rounded-2xl border-2 px-4 text-left font-extrabold transition focus:outline-none focus:ring-4 focus:ring-ring/40 cursor-pointer ${
                    isActive ? "border-foreground bg-secondary shadow-[2px_2px_0_#24312c]" : "border-transparent hover:border-foreground hover:bg-secondary hover:shadow-[3px_3px_0_#24312c]"
                  }`}
                  style={{ fontFamily: "Nunito" }}>
                  <Icon className="h-5 w-5 text-primary transition group-hover:rotate-[-8deg]" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          {game.slug === "dont-sleep-with-the-fishes" && (
            <div className="hidden md:block md:mt-4">
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-muted-foreground mb-2 px-4">Wiki Pages</p>
              <div className="grid gap-1">
                {[["Guide", `${game.canonicalPath}guide/`],["Walkthrough", `${game.canonicalPath}walkthrough/`],["Items", `${game.canonicalPath}items/`],["Events", `${game.canonicalPath}events/`],["Endings", `${game.canonicalPath}endings/`],["FAQ", `${game.canonicalPath}faq/`]].map(([label, href]) => (
                  <Link key={label} href={href} className="flex min-h-10 items-center gap-3 rounded-xl border-2 border-transparent px-4 text-sm font-extrabold transition hover:border-foreground hover:bg-secondary hover:shadow-[2px_2px_0_#24312c] focus:outline-none focus:ring-4 focus:ring-ring/40 text-muted-foreground hover:text-foreground">{label}</Link>
                ))}
                {game.changelog && game.changelog.length > 0 && (
                  <Link href={`${game.canonicalPath}changelog/`} className="flex min-h-10 items-center gap-3 rounded-xl border-2 border-transparent px-4 text-sm font-extrabold transition hover:border-foreground hover:bg-secondary hover:shadow-[2px_2px_0_#24312c] focus:outline-none focus:ring-4 focus:ring-ring/40 text-muted-foreground hover:text-foreground cursor-pointer w-full text-left">
                    <GitCommit className="w-4 h-4 text-accent" /> Changelog
                  </Link>
                )}
              </div>
            </div>
          )}
          {game.slug === "all-the-gold-in-fort-locks" && (
            <div className="hidden md:block md:mt-4">
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-muted-foreground mb-2 px-4">Guide</p>
              <div className="grid gap-1">
                {[["Walkthrough", `${game.canonicalPath}walkthrough/`]].map(([label, href]) => (
                  <Link key={label} href={href} className="flex min-h-10 items-center gap-3 rounded-xl border-2 border-transparent px-4 text-sm font-extrabold transition hover:border-foreground hover:bg-secondary hover:shadow-[2px_2px_0_#24312c] focus:outline-none focus:ring-4 focus:ring-ring/40 text-muted-foreground hover:text-foreground">{label}</Link>
                ))}
              </div>
            </div>
          )}
          <div className="hidden md:mt-auto md:block">
            <div className="rotate-[-1deg] rounded-2xl border-2 border-foreground bg-secondary p-4 shadow-[4px_4px_0_#24312c]">
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-accent">{game.accessMode === "download" ? "Download" : "Browser"}</p>
              <p className="mt-2 font-['Space_Grotesk'] text-lg font-bold leading-none">{game.accessMode === "download" ? "Official source guide" : "Play instantly online"}</p>
            </div>
            <Link href="/" className="mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-foreground bg-primary px-5 font-extrabold text-primary-foreground shadow-[3px_3px_0_#24312c] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] focus:outline-none focus:ring-4 focus:ring-ring/40">
              <ArrowLeft className="h-4 w-4" /> All Games
            </Link>
          </div>
          <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-xl border-2 border-foreground bg-secondary md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="grid gap-2 border-t-2 border-foreground p-4 md:hidden">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button key={item.id} onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left font-extrabold cursor-pointer ${isActive ? "border-foreground bg-secondary shadow-[2px_2px_0_#24312c]" : "border-foreground bg-secondary"}`}
                  style={{ fontFamily: "Nunito" }}>
                  <Icon className="h-5 w-5 text-primary" /> {item.label}
                </button>
              );
            })}
          </div>
        )}
      </aside>
      {changelogEntry && <ChangelogModal entry={changelogEntry} onClose={() => setChangelogEntry(null)} />}
    </>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { BookOpen, Package, Zap, Flag, HelpCircle, Home } from "lucide-react";

export function SubPageLayout({
  gameTitle,
  gamePath,
  pageTitle,
  pageDescription,
  children,
}: {
  gameTitle: string;
  gamePath: string;
  pageTitle: string;
  pageDescription: string;
  children: ReactNode;
}) {
  const wikiLinks = [
    { label: "Overview", href: gamePath, icon: Home },
    { label: "Guide", href: `${gamePath}guide/`, icon: BookOpen },
    { label: "Walkthrough", href: `${gamePath}walkthrough/`, icon: Zap },
    { label: "Items", href: `${gamePath}items/`, icon: Package },
    { label: "Events", href: `${gamePath}events/`, icon: Zap },
    { label: "Characters", href: `${gamePath}characters/`, icon: Home },
    { label: "Endings", href: `${gamePath}endings/`, icon: Flag },
    { label: "Tips", href: `${gamePath}tips-tricks/`, icon: Zap },
    { label: "Achievements", href: `${gamePath}achievements/`, icon: Flag },
    { label: "Steam", href: `${gamePath}steam/`, icon: Zap },
    { label: "FAQ", href: `${gamePath}faq/`, icon: HelpCircle },
  ];

  const isActive = (href: string) => {
    const slug = pageTitle.toLowerCase().replace(/\s+/g, "-");
    return href.includes(`/${slug}/`) || (href === gamePath && slug === "overview");
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "Nunito, sans-serif" }}>
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 [background:linear-gradient(rgba(36,49,44,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(36,49,44,.04)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_30%_20%,black_40%,transparent_70%)]" />

      {/* Hero header */}
      <header className="relative overflow-hidden border-b-2 border-foreground bg-gradient-to-br from-primary via-primary to-[#0d3d32]">
        {/* Decorative shapes */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border-2 border-primary-foreground/10 opacity-20" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full border-2 border-primary-foreground/10 opacity-15" />
        <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-accent opacity-30" />

        <div className="relative px-6 lg:px-12 py-10 sm:py-14">
          <Link href={gamePath} className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-5 font-extrabold" style={{ fontSize: "14px" }}>
            <span>←</span> Back to {gameTitle}
          </Link>

          <h1 className="font-['Fredoka'] text-5xl sm:text-6xl lg:text-7xl font-black text-primary-foreground leading-[0.9] tracking-tight max-w-4xl">
            {pageTitle}
          </h1>
          <p className="mt-5 text-primary-foreground/75 font-bold text-lg sm:text-xl leading-relaxed max-w-2xl">
            {pageDescription}
          </p>
        </div>
      </header>

      {/* Sticky sub-nav */}
      <nav className="sticky top-0 z-30 border-b-2 border-foreground bg-card overflow-x-auto">
        <div className="flex gap-1.5 px-4 lg:px-12 py-2.5">
          {wikiLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={`shrink-0 px-3.5 py-2 rounded-full border-2 font-extrabold text-xs transition flex items-center gap-1.5 ${
                isActive(href)
                  ? "border-foreground bg-foreground text-background shadow-[2px_2px_0_#24312c]"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground hover:shadow-[2px_2px_0_#24312c]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />{label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-10 px-6 lg:px-12 py-10">
        <article className="flex-1 min-w-0">
          <div className="flex flex-col gap-10">
            {children}
          </div>

          {/* Cross-links footer */}
          <div className="mt-12 rounded-[2rem] border-2 border-foreground bg-gradient-to-br from-secondary to-[#f1dca9] p-8 shadow-[6px_6px_0_#24312c]">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-full border-2 border-foreground bg-accent flex items-center justify-center text-accent-foreground font-black text-sm">?</span>
              <p className="font-['Fredoka'] text-2xl font-black">More {gameTitle} Guides</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {wikiLinks.filter((l) => l.label !== "Overview").map(({ label, href }, i) => {
                const colors = [
                  "bg-accent text-accent-foreground",
                  "bg-primary text-primary-foreground",
                  "bg-[#c39a2f] text-foreground",
                  "bg-[#6c4f8f] text-white",
                  "bg-[#315f9f] text-white",
                  "bg-card text-foreground",
                  "bg-[#984c38] text-white",
                  "bg-[#2f7a90] text-white",
                  "bg-[#517a35] text-white",
                  "bg-secondary text-secondary-foreground",
                ];
                return (
                <Link
                  key={label}
                  href={href}
                  className={`rounded-xl border-2 border-foreground px-4 py-3 text-sm font-extrabold text-center transition shadow-[3px_3px_0_#24312c] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] ${colors[i % colors.length]}`}
                >
                  {label}
                </Link>
              );})}
            </div>
          </div>

          <footer className="mt-10 pt-6 border-t-2 border-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-muted-foreground tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
            <span>© 2026 ZOWGAME // UNOFFICIAL DISCOVERY GUIDE</span>
            <span className="flex items-center gap-4">
              <Link href="/" className="hover:text-foreground transition-colors">← HOME</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">PRIVACY</Link>
            </span>
          </footer>
        </article>

        {/* Sidebar */}
        <aside className="lg:w-60 shrink-0">
          <div className="lg:sticky lg:top-20 space-y-4">
            {/* Wiki nav card */}
            <div className="rounded-2xl border-2 border-foreground bg-card shadow-[4px_4px_0_#24312c] overflow-hidden rotate-[0.5deg]">
              <div className="bg-primary px-5 py-3 border-b-2 border-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-300" />
                <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-primary-foreground">Contents</p>
              </div>
              <div className="p-3 flex flex-col gap-0.5">
                {wikiLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className={`block px-3 py-2.5 rounded-xl font-extrabold text-sm transition ${
                      isActive(href)
                        ? "bg-secondary text-foreground shadow-[2px_2px_0_#24312c]"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {isActive(href) ? `→ ${label}` : label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Back CTA */}
            <Link
              href={gamePath}
              className="block w-full rounded-2xl border-2 border-foreground bg-accent text-accent-foreground p-4 text-center font-extrabold shadow-[4px_4px_0_#24312c] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#24312c] transition-all -rotate-[0.5deg]"
            >
              ← Back to Game Overview
            </Link>

            <Link
              href={`${gamePath}changelog/`}
              className="block w-full rounded-2xl border-2 border-foreground bg-card p-3 text-center font-extrabold text-sm text-muted-foreground hover:text-foreground hover:bg-secondary shadow-[2px_2px_0_#24312c] transition-all"
            >
              Changelog
            </Link>

            {/* Quick tip card */}
            <div className="rounded-2xl border-2 border-foreground bg-[#fff1c8] p-4 shadow-[3px_3px_0_#24312c] rotate-[1deg]">
              <p className="font-mono text-[9px] font-black uppercase tracking-[.18em] text-accent mb-2">Pro Tip</p>
              <p className="font-bold text-xs leading-relaxed text-foreground">
                Use the sticky nav at the top to jump between guide pages without scrolling back up.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ====== Content Components ====== */

export function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border-2 border-foreground bg-card p-6 sm:p-8 shadow-[5px_5px_0_#24312c]">
      <h2 className="font-['Fredoka'] text-2xl font-black mb-4">{title}</h2>
      <div className="text-muted-foreground font-bold leading-relaxed space-y-4" style={{ fontSize: "15px" }}>
        {children}
      </div>
    </section>
  );
}

export function HighlightBox({ children, variant = "info" }: { children: ReactNode; variant?: "info" | "warning" | "success" | "danger" }) {
  const colors: Record<string, string> = {
    info: "border-primary/30 bg-primary/5",
    warning: "border-yellow-500/30 bg-yellow-500/5",
    success: "border-emerald-500/30 bg-emerald-500/5",
    danger: "border-accent/30 bg-accent/5",
  };
  return (
    <div className={`rounded-xl border-2 p-5 font-bold leading-relaxed ${colors[variant]}`} style={{ fontSize: "14px" }}>
      {children}
    </div>
  );
}

export function StepNumber({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border-2 border-foreground bg-accent text-accent-foreground font-['Fredoka'] font-black text-sm shadow-[2px_2px_0_#24312c] shrink-0">
      {n}
    </span>
  );
}

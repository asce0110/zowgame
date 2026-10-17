import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, Flag, HelpCircle, Home, Package, Zap, type LucideIcon } from "lucide-react";
import { SiteHeader } from "./site-header";
import "../../styles/atlas-guide.css";

type WikiLink = { label: string; href: string; icon: LucideIcon };

export function SubPageLayout({ gameTitle, gamePath, pageTitle, pageDescription, children, wikiLinks: customWikiLinks }: {
  gameTitle: string; gamePath: string; pageTitle: string; pageDescription: string; children: ReactNode; wikiLinks?: WikiLink[];
}) {
  const defaultWikiLinks: WikiLink[] = [
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
  const availableWikiLinks: WikiLink[] = gamePath.includes("dont-sleep-with-the-fishes") ? defaultWikiLinks : [
    { label: "Overview", href: gamePath, icon: Home },
    { label: "Guide", href: `${gamePath}guide/`, icon: BookOpen },
    ...(gamePath.includes("all-the-gold-in-fort-locks") ? [{ label: "Walkthrough", href: `${gamePath}walkthrough/`, icon: Zap }] : []),
    { label: "FAQ", href: `${gamePath}faq/`, icon: HelpCircle },
  ];
  const wikiLinks = customWikiLinks || availableWikiLinks;
  const normalizedTitle = pageTitle.toLowerCase().trim();
  const pageSlug = normalizedTitle.startsWith("how to ") ? "guide" : normalizedTitle.replace(/\s+/g, "-");
  const isActive = (href: string) => href === `${gamePath}${pageSlug}/` || (href === gamePath && pageSlug === "overview");
  const otherGuides = wikiLinks.filter(({ label, href }) => label !== "Overview" && !isActive(href));

  return <div className="zg-site zg-general-guide atlas-guide">
    <a className="zg-skip" href="#atlas-guide-main">Skip to guide content</a>
    <SiteHeader gameTitle={gameTitle} />
    <main id="atlas-guide-main" className="atlas-guide-main" tabIndex={-1}>
      <nav className="atlas-guide-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Game library</Link><ChevronRight size={13} aria-hidden="true" />
        <Link href={gamePath}>{gameTitle}</Link><ChevronRight size={13} aria-hidden="true" />
        <span aria-current="page">{pageTitle}</span>
      </nav>
      <header className="atlas-guide-masthead">
        <p className="atlas-guide-eyebrow">ZOWGAME / PLAYER FIELD GUIDE</p>
        <h1>{!pageTitle.toLowerCase().includes(gameTitle.toLowerCase()) && <><span className="seo-game-prefix">{gameTitle}</span>{" "}</>}{pageTitle}</h1>
        <p className="atlas-guide-description">{pageDescription}</p>
        <Link href={gamePath} className="atlas-guide-back"><ArrowLeft size={16} aria-hidden="true" />Back to {gameTitle}</Link>
      </header>
      <div className="atlas-guide-workspace">
        <aside className="atlas-guide-sidebar" aria-label={`${gameTitle} guide directory`}>
          <div className="atlas-guide-directory">
            <p className="atlas-guide-eyebrow"><BookOpen size={16} aria-hidden="true" />IN THIS GAME</p>
            <h2>{gameTitle}</h2>
            <nav aria-label={`${gameTitle} guide pages`}>
              {wikiLinks.map(({ label, href, icon: Icon }, index) => <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined}>
                <span className="atlas-guide-chapter-number">{String(index + 1).padStart(2, "0")}</span>
                <Icon size={16} aria-hidden="true" /><span>{label}</span><ChevronRight size={14} aria-hidden="true" />
              </Link>)}
            </nav>
            <Link className="atlas-guide-overview" href={gamePath}><ArrowLeft size={15} aria-hidden="true" />Game overview</Link>
            {gamePath.includes("dont-sleep-with-the-fishes") && <Link className="atlas-guide-overview" href={`${gamePath}changelog/`}>Changelog<ArrowRight size={15} aria-hidden="true" /></Link>}
          </div>
        </aside>
        <article className="atlas-guide-paper" aria-label={`${gameTitle}: ${pageTitle}`}>
          <div className="atlas-guide-body">{children}</div>
          {otherGuides.length > 0 && <section className="atlas-guide-related" aria-labelledby="atlas-related-heading">
            <p className="atlas-guide-eyebrow">CONTINUE EXPLORING</p><h2 id="atlas-related-heading">More {gameTitle} guides</h2>
            <nav aria-label="Related guide pages">{otherGuides.map(({ label, href }) => <Link key={href} href={href}>{label}<ArrowRight size={16} aria-hidden="true" /></Link>)}</nav>
          </section>}
          <footer className="atlas-guide-footer">
            <p>© 2026 ZowGame · Independent player guides</p>
            <nav aria-label="Footer navigation"><Link href="/">Game library</Link><Link href="/privacy">Privacy</Link></nav>
            <a className="atlas-guide-badge" href="https://findly.tools/zowgame?utm_source=zowgame" target="_blank" rel="noopener noreferrer"><img src="https://findly.tools/badges/findly-tools-badge-dark.svg" alt="Featured on Findly.tools" width="175" height="55" loading="lazy" /></a>
          </footer>
        </article>
      </div>
    </main>
  </div>;
}

export function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="atlas-guide-section"><h2>{title}</h2><div className="atlas-guide-prose">{children}</div></section>;
}
export function HighlightBox({ children, variant = "info" }: { children: ReactNode; variant?: "info" | "warning" | "success" | "danger" }) {
  return <aside className={`atlas-guide-note atlas-guide-note-${variant}`}>{children}</aside>;
}
export function StepNumber({ n }: { n: number }) {
  return <span className="atlas-guide-step-number">{String(n).padStart(2, "0")}</span>;
}

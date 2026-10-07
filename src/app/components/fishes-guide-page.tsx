import Link from "next/link";
import { ArrowUpRight, ArrowRight, Anchor, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type { GameRecord } from "../data/games";
import { FISHES_VERSION, FISHES_CHECKED, fishesGuidePages, fishesSources } from "../data/fishes-guide";
import { GuideIndex, ReadingCompass, ConnectionNote, GameArtwork } from "./fishes-guide-tools";
import { SchemaJsonLd } from "./schema-jsonld";
import { SiteHeader } from "./site-header";
import "../../styles/fishes.css";
import type { Metadata } from "next";

const base = "/games/dont-sleep-with-the-fishes/";
const labels: Record<string, string> = { guide: "Beginner guide", walkthrough: "Walkthrough", items: "Items & supplies", events: "Night events", characters: "Crew & support", endings: "Ending routes", "tips-tricks": "Tips & strategy", achievements: "Achievements", steam: "Get the game", faq: "FAQ", changelog: "Patch notes" };

export function fishesGuideMetadata(pageKey: string): Metadata {
  const page = fishesGuidePages[pageKey];
  const title = `Don't Sleep With The Fishes ${page.title} (${FISHES_VERSION})`;
  const description = `${page.description} Sources checked ${FISHES_CHECKED}.`;
  const url = `https://zowgame.com${base}${pageKey}/`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, images: ["/fishes-steam-header.jpg"] }, twitter: { card: "summary_large_image", title, description, images: ["/fishes-steam-header.jpg"] } };
}

function Shell({ active, children }: { active: string; children: ReactNode }) {
  return <div className="zg-site fishes-manual"><a className="fm-skip" href="#manual-content">Skip to guide content</a><ConnectionNote />
    <SiteHeader officialUrl={fishesSources.official.url} />
    <div className="fm-workspace"><aside className="fm-rail"><Link href={base} className="fm-game-mark"><Anchor size={26} aria-hidden="true" /><span>DON'T SLEEP<br />WITH THE FISHES</span></Link><p className="fm-kicker">SURVIVAL MANUAL / 01</p><nav aria-label="Game guide chapters"><Link href={base} aria-current={active === "overview" ? "page" : undefined}><span>00</span>Overview</Link>{Object.entries(labels).map(([key, label], i) => <Link key={key} href={`${base}${key}/`} aria-current={active === key ? "page" : undefined}><span>{String(i + 1).padStart(2, "0")}</span>{label}<ChevronRight size={13} aria-hidden="true" /></Link>)}</nav><div className="fm-rail-note"><p className="fm-kicker">VERIFIED BUILD</p><strong>{FISHES_VERSION}</strong><p>Windows · English<br />Independent guide</p><Link href={`${base}changelog/`}>Read patch notes <ArrowRight size={14} aria-hidden="true" /></Link></div></aside>
    <main id="manual-content" className="fm-main">{children}<footer className="fm-footer"><p>GAME BY TAIKI / DOPPLERGHOST<br /><span>An independent ZowGame player guide.</span></p><div><Link href={base}>Game overview</Link><Link href="/privacy/">Privacy</Link><a href={fishesSources.official.url}>Developer's page <ArrowUpRight size={14} aria-hidden="true" /></a></div></footer></main></div>
  </div>;
}

function SourceLinks({ sources }: { sources: (keyof typeof fishesSources)[] }) {
  return <div className="fm-sources"><span className="fm-kicker">SOURCES</span>{sources.map((key) => <a key={key} href={fishesSources[key].url} target="_blank" rel="noopener noreferrer">{fishesSources[key].label}<ArrowUpRight size={12} aria-hidden="true" /></a>)}</div>;
}

export function FishesGuidePage({ pageKey }: { pageKey: string }) {
  const page = fishesGuidePages[pageKey];
  const headings = page.sections.map((section, i) => ({ id: `section-${i + 1}`, title: section.title }));
  const index = Object.keys(labels).indexOf(pageKey) + 1;
  return <Shell active={pageKey}><div className="fm-breadcrumb"><Link href={base}>Fishes manual</Link><span>/</span>{labels[pageKey]}</div>
    <header className="fm-article-header"><p className="fm-kicker">FIELD GUIDE {String(index).padStart(2, "0")} / {FISHES_VERSION}</p><h1>{page.title}<span className="fm-heading-dot">.</span></h1><p>{page.description}</p><div className="fm-audit"><span className="fm-status-dot" />Sources checked <time dateTime={FISHES_CHECKED}>{FISHES_CHECKED}</time><span>Official notes + labeled community reports</span></div></header>
    <div className="fm-reading-grid"><article className="fm-article">{pageKey === "guide" && <figure className="fm-field-image"><img src="/fishes-lifeboat.jpg" alt="Scavenging supplies inside the ship before evacuation" width="1920" height="1080" loading="lazy" /><figcaption>Before the evacuation: know what you need, then get it to the boat. Official Steam screenshot.</figcaption></figure>}{page.sections.map((section, i) => {
      const content = <><h2>{section.title}</h2>{section.body && <p>{section.body}</p>}{section.bullets && <ul>{section.bullets.map((text) => <li key={text}>{text}</li>)}</ul>}{section.rows && <div className="fm-table-scroll" role="region" aria-label={`${section.title} reference table`} tabIndex={0}><table><caption className="fm-sr-only">{section.title}</caption><thead><tr>{section.headers!.map((text) => <th scope="col" key={text}>{text}</th>)}</tr></thead><tbody>{section.rows.map((row) => <tr key={row[0]}>{row.map((text, j) => j === 0 ? <th scope="row" key={j}>{text}</th> : <td key={j}>{text}</td>)}</tr>)}</tbody></table></div>}<SourceLinks sources={section.sources} /></>;
      return <section id={headings[i].id} key={headings[i].id} className="fm-article-section"><div className="fm-section-label"><span>{String(i + 1).padStart(2, "0")}</span><span>{section.spoiler ? "ENDING SPOILERS" : "FIELD NOTES"}</span></div>{section.spoiler ? <details className="fm-spoiler"><summary>{section.title}<span>Reveal spoilers +</span></summary><div>{content}</div></details> : content}</section>;
    })}<div className="fm-next"><p className="fm-kicker">KEEP YOUR BEARINGS</p><Link href={base}>Explore every guide <ArrowRight size={20} aria-hidden="true" /></Link></div></article><ReadingCompass headings={headings} /></div>
  </Shell>;
}

export function FishesOverview({ game }: { game: GameRecord }) {
  const groups: Record<string, string> = { guide: "Start here", walkthrough: "Start here", faq: "Start here", steam: "Start here", changelog: "Start here", items: "Survive", events: "Survive", characters: "Survive", "tips-tricks": "Survive", endings: "Find an ending", achievements: "Find an ending" };
  const entries = Object.entries(fishesGuidePages).map(([key, page]) => ({ key, title: page.title, description: page.description, searchText: `${page.title} ${page.description} ${JSON.stringify(page.sections)}`, group: groups[key] }));
  return <Shell active="overview"><SchemaJsonLd game={game} /><div className="fm-breadcrumb"><Link href="/">Game library</Link><span>/</span>Don't Sleep With The Fishes</div>
    <section className="fm-hero"><div className="fm-hero-art"><GameArtwork /><div className="fm-art-coordinate"><span>OPEN WATER</span><span>NO SAFE PASSAGE</span></div></div><div className="fm-hero-copy"><p className="fm-kicker">SURVIVAL HORROR / THE PLAYER'S FIELD MANUAL</p><h1>DON'T SLEEP<br /><span>WITH THE</span><br />FISHES<span className="fm-heading-dot">.</span></h1><p>The ship is sinking.<br />Make your next decision count.</p><div className="fm-hero-actions"><Link className="fm-button" href={`${base}guide/`}>Start surviving <ArrowRight size={18} aria-hidden="true" /></Link><a className="fm-button fm-button-secondary" href={fishesSources.steam.url} target="_blank" rel="noopener noreferrer">Get the game <ArrowUpRight size={18} aria-hidden="true" /></a></div><p className="fm-hero-credit">A game by Taiki / DopplerGhost · Windows · English</p></div></section>
    <div className="fm-build-strip"><div><span className="fm-status-dot" /><span className="fm-kicker">CURRENT MANUAL</span><strong>{FISHES_VERSION}</strong></div><p>Checked <time dateTime={FISHES_CHECKED}>{FISHES_CHECKED}</time></p><Link href={`${base}changelog/`}>What changed <ArrowRight size={16} aria-hidden="true" /></Link></div>
    <section className="fm-dispatch"><div><p className="fm-kicker">LATEST DISPATCH / PATCH NOTES</p><h2>The rules changed.<br /><span>So should your plan.</span></h2></div><div><p>New events, revised crew support, and updated ending conditions. Before your next run, catch up on the developer's changes.</p><Link href={`${base}changelog/`}>Read the update log <ArrowUpRight size={17} aria-hidden="true" /></Link></div><span className="fm-dispatch-stamp" aria-hidden="true">1.1.4.4</span></section>
    <GuideIndex entries={entries} />
    <section className="fm-ground-rules"><div><p className="fm-kicker">BEFORE YOU BOARD</p><h2>Know what you're<br />sailing into.</h2></div><div><p>Random encounters. Limited supplies. Multiple ways for a run to end. This manual links developer notes and labels community observations so you know what is established and what is uncertain.</p><p className="fm-warning">Content warning: jumpscares, flashing lights, and loud sounds.</p><SourceLinks sources={["official", "steam", "patch1144"]} /></div></section>
  </Shell>;
}

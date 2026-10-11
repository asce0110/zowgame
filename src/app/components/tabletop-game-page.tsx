import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, List } from "lucide-react";
import { defendersFaqs, defendersOfHogwartsGame, defendersSections, defendersSources, DEFENDERS_CHECKED } from "../data/defenders-of-hogwarts";
import { defendersGuideSections, defendersStrategy, defendersTerminology } from "../data/defenders-guide";
import type { GameRecord } from "../data/games";
import { SiteHeader } from "./site-header";
import { GameCover } from "./game-cover";
import { ConnectionNote, ReadingCompass } from "./fishes-guide-tools";
import { SchemaJsonLd } from "./schema-jsonld";
import { TabletopQuestions } from "./tabletop-questions";
import "../../styles/tabletop.css";

function SourceLink({ source }: { source: { label: string; url: string } }) {
  return <a className="tt-source" href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRight size={15} aria-hidden="true" /></a>;
}
function SectionLabel({ id, eyebrow }: { id: string; eyebrow: string }) {
  return <div className="tt-section-label"><span>{String(defendersSections.findIndex((section) => section.id === id) + 1).padStart(2, "0")}</span><p className="tt-eyebrow">{eyebrow}</p></div>;
}
function RulebookLink({ pages }: { pages: string }) {
  const firstPrintedPage = Number(pages.match(/\d+/)?.[0] || 2);
  return <SourceLink source={{ label: `Official rulebook · printed pages ${pages.replace(/^pp?\.\s*/, "")}`, url: `${defendersSources.rulebook.url}#page=${Math.floor(firstPrintedPage / 2) + 1}` }} />;
}
const routes = [
  { label: "Identify the game", hint: "Format, players & editions", href: "#overview" },
  { label: "Play a first game", hint: "Set up, then take your turn", href: "#setup" },
  { label: "Check a rule", hint: "Search questions at the table", href: "#faq" },
  { label: "Buy or get support", hint: "Availability & order problems", href: "#availability" },
];

export function TabletopGamePage({ game = defendersOfHogwartsGame }: { game?: GameRecord }) {
  return <div className="zg-site zg-tabletop">
    <a className="zg-skip" href="#tabletop-main">Skip to the game guide</a>
    <SiteHeader gameTitle={game.shortTitle} officialUrl={defendersSources.project.url} />
    <ConnectionNote />
    <SchemaJsonLd game={game} />
    <main id="tabletop-main" className="tt-main">
      <nav className="tt-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/#library">Game library</Link><span aria-hidden="true">/</span><span aria-current="page">Defenders of Hogwarts</span></nav>
      <header className="tt-hero">
        <div className="tt-hero-copy">
          <p className="tt-eyebrow">HARRY POTTER / TABLETOP FIELD GUIDE</p>
          <h1>DEFENDERS<br />OF <span>HOGWARTS</span></h1>
          <p className="tt-hero-deck">A castle to defend.<br />A side to choose.</p>
          <p className="tt-hero-intro">Learn MinaLima’s physical Harry Potter board game: set up the castle, take either side’s turn, check a disputed rule and find official buying or support information.</p>
          <div className="tt-hero-actions"><a className="tt-button" href="#setup">Set up a game<ArrowRight size={19} aria-hidden="true" /></a><a className="tt-button tt-button-outline" href="#faq">Find an answer</a></div>
          <p className="tt-preview-note">RULEBOOK-BASED GUIDE · CHECKED {DEFENDERS_CHECKED}</p>
        </div>
        <figure className="tt-hero-art"><GameCover src="/defenders-editorial.webp" title="Defenders of Hogwarts editorial illustration" priority /><figcaption>Editorial illustration. Not product photography or gameplay.</figcaption></figure>
      </header>
      <div className="tt-reading-strip"><p><span>AT THE TABLE</span> 2–5 players · 90 minutes · Ages 13+ · Physical board game</p><a href={defendersSources.rulebook.url} target="_blank" rel="noopener noreferrer">Open official rules<ArrowUpRight size={16} aria-hidden="true" /></a></div>
      <nav className="tt-intent-index" aria-label="Find your answer">{routes.map((route, index) => <a key={route.href} href={route.href}><span className="tt-intent-number">{String(index + 1).padStart(2, "0")}</span><span><strong>{route.label}</strong><small>{route.hint}</small></span><ArrowRight size={18} aria-hidden="true" /></a>)}</nav>
      <div className="tt-article-layout">
        <aside id="guide-directory" className="tt-reader-rail"><ReadingCompass headings={defendersSections} /></aside>
        <article className="tt-article" aria-label="Defenders of Hogwarts game guide">
          <section id="overview" className="tt-section" aria-labelledby="tt-overview-title">
            <SectionLabel id="overview" eyebrow="IDENTIFY THE GAME" />
            <h2 id="tt-overview-title">Looking for “Harry Potter<br />Defenders RPG game”?</h2>
            <p className="tt-lead">The game you may be looking for is <strong>Defenders of Hogwarts</strong> — a physical board game from MinaLima, developed with designer David Waterman.</p>
            <p>One player commands the Dark Arts. One to four other players each choose a Hogwarts house and defend the castle. You move pawns across a shared board, use cards and collect resources while the Dark Arts Path advances.</p>
            <dl className="tt-game-facts"><div><dt>Players</dt><dd>2–5</dd></div><div><dt>Listed play time</dt><dd>90 min</dd></div><div><dt>Age</dt><dd>13+</dd></div><div><dt>Roles</dt><dd>1 Dark Arts / 1–4 Houses</dd></div></dl>
            <figure className="tt-product"><GameCover src="/defenders-official.webp" title="Defenders of Hogwarts board game by MinaLima" /><figcaption>Official game artwork from MinaLima. <SourceLink source={defendersSources.studio} /></figcaption></figure>
            <div className="tt-format-note"><p className="tt-eyebrow">BEFORE YOU CHOOSE</p><h3>Bring it to the table.</h3><p>This game requires the physical box and at least two players. The official rulebook describes no solo mode. It is a different product from Harry Potter: Hogwarts Battle and is not an online RPG to launch here.</p></div>
            <p>Allow extra time to learn the first game. The guide below covers the standard rulebook; specific card instructions still matter. Strategy notes are our deductions from those rules. ZowGame has not published a first-hand playtest or review score.</p>
            <div className="tt-section-sources"><RulebookLink pages="2–5" /><SourceLink source={defendersSources.project} /></div>
          </section>
          <section id="rules" className="tt-section" aria-labelledby="tt-rules-title">
            <SectionLabel id="rules" eyebrow="THE OBJECTIVE / BEFORE THE FIRST TURN" />
            <h2 id="tt-rules-title">Two sides.<br /><span>Two ways to win.</span></h2>
            <div className="tt-win-brief"><div><p className="tt-eyebrow">HOUSE PLAYERS</p><h3>One player. Two shields.</h3><p>A House player wins by collecting two Defence Shields themselves. Two shields spread across different Houses do not satisfy this condition.</p><a href="#house-turn">Read the House turn<ArrowRight size={16} aria-hidden="true" /></a></div><div><p className="tt-eyebrow">DARK ARTS PLAYER</p><h3>Three tokens. One location.</h3><p>Collect all three Progress Tokens and bring the required Dark Arts pawns together at the location named by the Location Card. Reaching the path’s end alone is insufficient.</p><a href="#ending">Check the complete win condition<ArrowRight size={16} aria-hidden="true" /></a></div></div>
            <p>Begin with <a className="tt-inline-link" href="#setup">setup</a>, then read the turn for your side. On a normal turn choose one Main Action. Do not treat later path zones as extra automatic actions; follow the unlocked effects and any additional plays explicitly allowed by a card.</p>
            <p className="tt-editor-note">References use printed rulebook page numbers. The PDF displays two printed pages per viewer page. Keep your supplied edition and any newer official corrections at hand.</p>
            <div className="tt-section-sources"><RulebookLink pages="5, 16–23" /></div>
          </section>
          {defendersGuideSections.map((section) => <section id={section.id} key={section.id} className="tt-section" aria-labelledby={`tt-${section.id}-title`}>
            <SectionLabel id={section.id} eyebrow={section.eyebrow.replace(/^\d+\s*\/\s*/, "")} />
            <h2 id={`tt-${section.id}-title`}>{section.title}</h2>
            <p className="tt-lead">{section.intro}</p>
            <ol className="tt-first-session">{section.rules.map((rule, index) => <li key={rule.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{rule.title}</h3><p>{rule.body}</p></div></li>)}</ol>
            <div className="tt-section-sources"><RulebookLink pages={section.sourcePages} /></div>
          </section>)}
          <section id="strategy" className="tt-section" aria-labelledby="tt-strategy-title">
            <SectionLabel id="strategy" eyebrow="EDITORIAL ADVICE / INFERRED FROM THE RULES" />
            <h2 id="tt-strategy-title">Make your first<br /><span>decisions count.</span></h2>
            <p className="tt-lead">Use the rules to weigh your next move. These suggestions are starting points, not a tested winning build or a guarantee.</p>
            <ol className="tt-first-session">{defendersStrategy.map((tip, index) => <li key={tip.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{tip.title}</h3><p>{tip.body}</p><RulebookLink pages={tip.sourcePages} /></div></li>)}</ol>
          </section>
          <section id="availability" className="tt-section" aria-labelledby="tt-availability-title">
            <SectionLabel id="availability" eyebrow="BUYING / DELIVERY / GETTING HELP" />
            <h2 id="tt-availability-title">Choose an edition.<br /><span>Check the details.</span></h2>
            <p className="tt-lead">Start with the base game to play. Campaign tiers add accessories and presentation extras. Confirm the language, contents and total delivered cost for your address.</p>
            <p>Publisher information checked October 12, 2026. Current stock, ordering access and the status of an individual shipment require confirmation from the seller.</p>
            <dl className="tt-availability-list">
              <div><dt>Original campaign</dt><dd><strong>Ended July 23, 2026</strong><p>The campaign ran from June 30 to July 23. The October 8 update announced one day left for late pledges. An old pledge button does not establish that orders are still accepted; check the official ordering destination.</p></dd></div>
              <div><dt>Base game</dt><dd><strong>October 2026 estimated shipping</strong><p>The FAQ gives an estimated shipping window. This is not confirmation that your order has shipped or arrived. The same base game is planned for selected House of MinaLima retail locations.</p></dd></div>
              <div><dt>Collector’s Box & extras</dt><dd><strong>March 2027 estimated second shipment</strong><p>These items have a separate estimated delivery window. The FAQ says the estimated Collector-tier shipping fee includes both shipments; check your exact order and included items.</p></dd></div>
              <div><dt>Price & delivery cost</dt><dd><strong>£75 UK base-game retail reference</strong><p>This recommended price includes UK VAT. It is not a live offer. Campaign shipping, regional sales taxes and applicable import duties are separate; compare the final checkout total, not just a pledge tier.</p></dd></div>
              <div><dt>Language & retail</dt><dd><strong>Initial edition: English</strong><p>Translations are planned without a confirmed date in the FAQ. Selected House of MinaLima retail sales are described for autumn 2026 and wholesale in 2027. Confirm current language and stock with the seller.</p></dd></div>
            </dl>
            <a className="tt-button" href={defendersSources.project.url} target="_blank" rel="noopener noreferrer">Check official ordering<ArrowUpRight size={19} aria-hidden="true" /></a>
            <div className="tt-support-note"><p className="tt-eyebrow">ORDER PROBLEM OR MISSING COMPONENT?</p><h3>Keep the details. Contact the right team.</h3><p>Check components against printed page 4. Prepare your order reference, a clear description and photos of any damage. The campaign FAQ asks for damage or defect reports within seven days of receipt; statutory rights are unaffected.</p><p>For cancellation or return requests, read the full current policy first. The stated September 30 campaign cancellation cutoff has passed. Eligible unopened base-game returns have a 28-day window and a 20% fee, with delivery charges excluded.</p><div className="tt-section-sources"><SourceLink source={defendersSources.backerSupport} /><SourceLink source={defendersSources.support} /></div></div>
            <div className="tt-section-sources"><SourceLink source={defendersSources.faq} /><SourceLink source={defendersSources.latestUpdate} /></div>
          </section>
          <section id="faq" className="tt-section" aria-labelledby="tt-faq-title">
            <SectionLabel id="faq" eyebrow="QUESTIONS / RULES / BUYING & SUPPORT" />
            <h2 id="tt-faq-title">Find your answer.</h2>
            <p className="tt-lead">Search a rule, a resource or an order question. Open an answer to read it; filter by topic to narrow the list.</p>
            <TabletopQuestions faqs={defendersFaqs} supportUrl={defendersSources.support.url} />
            <p className="tt-editor-note">An unresolved card interaction? Record the exact card text, player side, path zone and rulebook page. Ask MinaLima for a ruling instead of assuming an unlisted exception.</p>
            <div className="tt-section-sources"><SourceLink source={defendersSources.rulebook} /><SourceLink source={defendersSources.faq} /><SourceLink source={defendersSources.support} /></div>
          </section>
          <section id="glossary" className="tt-section" aria-labelledby="tt-glossary-title">
            <SectionLabel id="glossary" eyebrow="THE LANGUAGE AT THE TABLE" />
            <h2 id="tt-glossary-title">Know the terms.</h2>
            <dl className="tt-glossary">{defendersTerminology.map((entry) => <div key={entry.term}><dt>{entry.term}</dt><dd>{entry.definition}</dd></div>)}</dl>
            <div className="tt-section-sources"><RulebookLink pages="10–15, 24–25" /></div>
          </section>
          <section id="sources" className="tt-section tt-credits" aria-labelledby="tt-sources-title">
            <SectionLabel id="sources" eyebrow="ORIGINAL RULES / A VIDEO WALKTHROUGH / SUPPORT" />
            <h2 id="tt-sources-title">Keep the originals<br /><span>within reach.</span></h2>
            <p>The official rulebook supplies the rules above. The Meeple Marathon tutorial is a third-party walkthrough recommended by MinaLima in its July 14 announcement. Use it alongside your rulebook.</p>
            <a className="tt-button" href={defendersSources.rulebook.url} target="_blank" rel="noopener noreferrer"><BookOpen size={19} aria-hidden="true" />Open the complete rulebook<ArrowUpRight size={19} aria-hidden="true" /></a>
            <ul>{Object.values(defendersSources).map((source) => <li key={source.url}><SourceLink source={source} /></li>)}</ul>
            <p className="tt-editor-note">Sources checked {DEFENDERS_CHECKED}. Game: MinaLima, developed with David Waterman. Harry Potter characters and world belong to their respective rights holders. Hero artwork is an editorial illustration created for this guide. ZowGame is independent of the publisher.</p>
          </section>
        </article>
      </div>
      <section className="tt-next-guide" aria-labelledby="tt-next-title"><div><p className="tt-eyebrow">YOUR NEXT ADVENTURE</p><h2 id="tt-next-title">Different worlds.<br />More to discover.</h2></div><Link className="tt-button tt-button-outline" href="/#library">Explore the game library<ArrowRight size={19} aria-hidden="true" /></Link></section>
    </main>
    <a href="#guide-directory" className="tt-mobile-contents"><List size={18} aria-hidden="true" />Contents</a>
    <footer className="zg-site-footer"><Link className="zg-wordmark" href="/">ZOW<span>GAME</span></Link><p>Independent game guides. Clear sources. Better next moves.</p><Link href="/#guides">Find another guide<ArrowRight size={16} aria-hidden="true" /></Link></footer>
  </div>;
}

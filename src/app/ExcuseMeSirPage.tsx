"use client";
import Link from "next/link";
import { ArrowRight, Download, ExternalLink, Ghost, Search, AlertTriangle, BookOpen } from "lucide-react";

const pageUrl = "https://zowgame.com/excuse-me-sir/";
const officialUrl = "https://airdorf.itch.io/excuse-me-sir";

const faqs = [
  {
    q: "Is Excuse Me Sir free?",
    a: "Yes, the official itch.io page currently offers the demo as a free download.",
  },
  {
    q: "What platforms support Excuse Me Sir?",
    a: "The official demo is available for Windows and macOS.",
  },
  {
    q: "Is Excuse Me Sir canceled?",
    a: "Yes. The official itch.io page lists the project status as canceled.",
  },
  {
    q: "Can I play Excuse Me Sir on mobile?",
    a: "There is no official mobile version listed on the main itch.io page.",
  },
  {
    q: "Is ZowGame the official site?",
    a: "No. This page is an unofficial guide that links to the official itch.io download page.",
  },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Excuse Me Sir",
    url: pageUrl,
    applicationCategory: "Game",
    genre: ["Horror", "Point-and-click", "Indie"],
    operatingSystem: ["Windows", "macOS"],
    gamePlatform: ["PC", "macOS"],
    author: [
      { "@type": "Organization", name: "Airdorf" },
      { "@type": "Organization", name: "TorpleDook" },
    ],
    isAccessibleForFree: true,
    description:
      "Excuse Me Sir is a creepy point-and-click horror demo for Windows and macOS. This unofficial guide explains how to download it safely and why the name is trending.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Excuse Me Sir a real game?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Excuse Me Sir is a real indie horror demo available on itch.io for Windows and macOS.",
        },
      },
      {
        "@type": "Question",
        name: "Can you play Excuse Me Sir online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The official version is a downloadable demo, not a browser game.",
        },
      },
      {
        "@type": "Question",
        name: "Is Excuse Me Sir canceled?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The official itch.io page marks the project as canceled.",
        },
      },
      {
        "@type": "Question",
        name: "Where can I download Excuse Me Sir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The safest place to download the demo is the official itch.io page by Airdorf.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://zowgame.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Excuse Me Sir",
        item: pageUrl,
      },
    ],
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border ec-border ec-surface backdrop-blur p-6 sm:p-8 hud-corners" style={{ boxShadow: "var(--ec-shadow-card)" }}>
      <span className="hud-c1" /><span className="hud-c2" />
      <h2 className="ec-text text-[26px] sm:text-[34px] tracking-tight mb-4" style={{ fontFamily: "Orbitron", fontWeight: 800 }}>
        {title}
      </h2>
      <div className="space-y-4 ec-text-muted" style={{ fontSize: "17px", lineHeight: 1.8 }}>
        {children}
      </div>
    </section>
  );
}

export function ExcuseMeSirPage() {
  return (
    <div className="eclipse-app min-h-screen w-full relative overflow-x-hidden" style={{ fontFamily: "Rajdhani, sans-serif" }}>
      <script id="schema-excuse-me-sir" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ opacity: "var(--ec-blob-opacity, 1)" }}>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-orange-600/10 blur-[120px]" />
        <div className="hidden md:block absolute -right-[280px] top-[180px] w-[680px] h-[680px] eclipse-ring" aria-hidden="true" style={{ opacity: "var(--ec-eclipse-ring-opacity)" }} />
        <div className="hidden md:block absolute -left-[220px] -bottom-[220px] w-[520px] h-[520px] eclipse-ring" aria-hidden="true" style={{ opacity: "var(--ec-eclipse-ring-2-opacity)", animationDuration: "90s", animationDirection: "reverse" }} />
        <div className="absolute inset-0 ec-grid-overlay" style={{ backgroundSize: "80px 80px" }} />
      </div>

      <main className="relative px-4 sm:px-6 lg:px-10 py-10 sm:py-14 max-w-[1180px] mx-auto">
        <header className="flex items-center justify-between gap-4 mb-10 sm:mb-14">
          <Link href="/" className="group flex items-center gap-3 cursor-pointer" aria-label="Go to homepage">
            <img src="/logo-symbol.svg" alt="ZOWGAME" className="w-11 h-11 transition-transform duration-200 group-hover:scale-105" />
            <div>
              <div className="ec-text tracking-[0.3em]" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "18px" }}>ZOWGAME</div>
              <div className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>GAME DISCOVERY GUIDES</div>
            </div>
          </Link>
          <Link href="/games/cobb-can-move/" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ec-surface border ec-border ec-text hover:ec-hover-surface transition-colors" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>
            PLAY A BROWSER HORROR GAME
            <ArrowRight className="w-4 h-4" />
          </Link>
        </header>

        <section className="rounded-[28px] border ec-border-brand ec-surface backdrop-blur p-6 sm:p-10 lg:p-12 hud-corners mb-8" style={{ boxShadow: "var(--ec-shadow-card)" }}>
          <span className="hud-c1" /><span className="hud-c2" />
          <div className="inline-flex items-center gap-2 rounded-full border ec-border-brand ec-surface px-3 py-1.5 mb-4">
            <Ghost className="w-3.5 h-3.5 text-fuchsia-500" />
            <span className="text-fuchsia-500 tracking-[0.3em]" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>// HORROR DEMO GUIDE</span>
          </div>
          <h1 className="ec-text leading-[0.95] tracking-tight text-[40px] sm:text-[64px] lg:text-[78px]" style={{ fontFamily: "Orbitron", fontWeight: 900 }}>
            Excuse Me Sir Game
          </h1>
          <p className="ec-text-muted max-w-3xl mt-5 mb-7" style={{ fontSize: "19px", lineHeight: 1.75 }}>
            Excuse Me Sir is a short, surreal point-and-click horror demo created by Airdorf and TorpleDook, featuring Molly Moonn. The game is available as a downloadable demo for Windows and macOS on itch.io.
          </p>
          <p className="ec-text-muted max-w-3xl mb-8" style={{ fontSize: "18px", lineHeight: 1.75 }}>
            The project is no longer in active development, but the demo is still available. Recently, the phrase “Excuse Me Sir” has also become popular again because of a separate meme trend, which has brought new attention to the game.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 via-fuchsia-500 to-cyan-400 text-white hover:scale-[1.02] active:scale-95 transition-transform" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "14px", boxShadow: "var(--ec-glow-orange)" }}>
              <Download className="w-5 h-5" />
              Download Official Demo on itch.io
            </a>
            <Link href="/" className="inline-flex items-center gap-3 px-6 py-4 rounded-xl ec-surface border ec-border ec-text hover:ec-hover-surface transition-colors" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "14px" }}>
              <BookOpen className="w-5 h-5" />
              MORE GAME GUIDES
            </Link>
          </div>
          <div className="mt-5 inline-flex items-start gap-2 rounded-2xl border ec-border bg-[rgba(var(--ec-bg-rgb),0.45)] px-4 py-3 max-w-3xl">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="ec-text-faint" style={{ fontSize: "14px", lineHeight: 1.7 }}>
              This is an unofficial guide. We do not host the game files.
            </p>
          </div>
        </section>

        <div className="grid gap-6">
          <Section title="What Is Excuse Me Sir?">
            <p>
              Excuse Me Sir is a creepy indie horror demo built around point-and-click choices, strange FMV-style visuals, and multiple endings. The official itch.io page lists the game as available for Windows and macOS, with Airdorf and TorpleDook as authors.
            </p>
          </Section>

          <Section title="Is Excuse Me Sir a Real Game?">
            <p>
              Yes. Excuse Me Sir is a real game demo, but it is not a full released game. The demo went live in November 2023, and the project was later marked as canceled in January 2024.
            </p>
          </Section>

          <Section title="Can You Play Excuse Me Sir Online?">
            <p>
              Not directly in the browser. Unlike many games on ZowGame, Excuse Me Sir is a downloadable game for Windows and macOS. You need to visit the official itch.io page to download the demo.
            </p>
          </Section>

          <Section title="Why Is Excuse Me Sir Trending?">
            <p>
              The phrase “Excuse Me Sir” recently became popular again because of a meme trend connected to The Boys and Billy Butcher edits. Because the game has the same name, some users are now searching for “Excuse Me Sir game,” “Excuse Me Sir download,” and “Excuse Me Sir itch.io.”
            </p>
          </Section>

          <Section title="Is This the Same as the Billy Butcher Meme?">
            <p>
              No. The game and the meme are different things. The game is a 2023 indie horror demo. The meme trend is newer and mainly connected to social media edits. However, the shared phrase has caused search traffic to overlap.
            </p>
          </Section>

          <Section title="Where Should You Download It?">
            <p>
              The safest place to download the demo is the official itch.io page by Airdorf. ZowGame does not host the Windows or macOS files, and this page exists only to explain what the game is and where the official source is.
            </p>
            <p>
              If you want the real demo, use the official listing and avoid reposted third-party downloads.
            </p>
            <a href={officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-fuchsia-500 hover:text-fuchsia-400 transition-colors" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "13px" }}>
              Visit the official itch.io page
              <ExternalLink className="w-4 h-4" />
            </a>
          </Section>

          <Section title="FAQ">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl border ec-border bg-[rgba(var(--ec-bg-rgb),0.42)] px-4 py-4">
                  <h3 className="ec-text mb-2" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "15px" }}>{faq.q}</h3>
                  <p className="ec-text-faint" style={{ fontSize: "15px", lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </Section>

          <section className="rounded-2xl border ec-border-brand ec-surface backdrop-blur p-6 sm:p-8 hud-corners" style={{ boxShadow: "var(--ec-shadow-card)" }}>
            <span className="hud-c1" /><span className="hud-c2" />
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-cyan-400" />
              <span className="ec-text tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>RELATED DISCOVERY</span>
            </div>
            <p className="ec-text-muted max-w-2xl" style={{ fontSize: "16px", lineHeight: 1.75 }}>
              Looking for something you can actually launch in the browser right away? Visit our playable horror page for Cobb Can Move, or head back to the homepage for more focused game guides.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Link href="/games/cobb-can-move/" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl ec-surface border ec-border ec-text hover:ec-hover-surface transition-colors" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "13px" }}>
                Visit Cobb Can Move
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl ec-surface border ec-border ec-text hover:ec-hover-surface transition-colors" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "13px" }}>
                Back to Homepage
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>

        <footer className="mt-14 pt-8 border-t ec-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between ec-text-dim tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
          <span>© 2026 ZOWGAME // UNOFFICIAL GAME DISCOVERY GUIDE</span>
          <span>This is an unofficial guide. Excuse Me Sir belongs to its original creators.</span>
        </footer>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGameBySlug, getPublishedGames } from "../../../../src/app/data/games";
import { SubPageLayout, SubSection } from "../../../../src/app/components/sub-page-layout";

export function generateStaticParams() {
  return getPublishedGames().map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  return { title: `${game.shortTitle} FAQ`, description: `Frequently asked questions about ${game.shortTitle}: download, Steam vs itch.io, platforms, controls, endings, crew, items, and gameplay mechanics.`, alternates: { canonical: `https://zowgame.com${game.canonicalPath}faq/` } };
}

const faqs = [
  { q: "What is Don't Sleep With The Fishes?", a: "A point-and-click survival horror game by DopplerGhost. Scavenge a sinking ship, choose a crewmate, and survive deadly night events at sea. 35+ items, 12+ endings. itch.io $1.99 / Steam $2.39." },
  { q: "How do I download the game?", a: "Purchase on itch.io (dopplerghost.itch.io) for $1.99, or Steam for $2.39 with achievements and cloud saves." },
  { q: "Is it on Steam?", a: "Yes. Launched June 26, 2026. 12 Steam achievements, cloud saves, Steam Deck Playable. Both versions run v1.1.3." },
  { q: "What platforms?", a: "Windows only. Steam Deck verified as Playable. No Mac/Linux/mobile versions." },
  { q: "What are the controls?", a: "WASD to move. E to pick up/throw items. Hold F to Fast-Forward night event intros (v1.1.3). Left-click to interact. ESC to pause." },
  { q: "How many endings?", a: "12+ known outcomes: Rescue, True Ending, Pay Debt, Ghost Ship, Survivor, and several bad endings." },
  { q: "How to get rescued?", a: "Save Flare Gun and Flashlight. Use during Hope or Other People events to signal aircraft." },
  { q: "S-Tier items?", a: "Anchor, Flare Gun, Flashlight. A-Tier: Duct Tape, Bucket, Bait (effective until Day 60 in v1.1.3), Fishing Rod. First Aid Kit heals 70% (v1.1.3)." },
  { q: "Which crew member is best?", a: "Frederik (all-rounder). Row (monster defense). Laurel (Rescue ending). Captain Whiskers (+1% fishing). Note: v1.1.3 fishing changes reduced Frederik's advantage." },
  { q: "What's new in v1.1.3?", a: "Fast-Forward (hold F), Small Island delegation, First Aid Kit 50%->70%, junk fishing nerf Day 30+, Frederik pipe fix, shipmate visual feedback." },
  { q: "Is there a translation?", a: "No official translations. English only." },
  { q: "Is this the official website?", a: "No. This is an unofficial discovery guide. We do not host game files." },
];

export default async function FAQPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} pageTitle="FAQ" pageDescription={`Frequently asked questions about ${game.shortTitle}.`}>
      {faqs.map(({ q, a }) => (
        <SubSection key={q} title={q}><p>{a}</p></SubSection>
      ))}
      <div className="rounded-2xl border-2 border-foreground bg-primary p-6 text-primary-foreground shadow-[5px_5px_0_#24312c] text-center">
        <p className="font-['Fredoka'] text-xl font-black mb-2">More Questions?</p>
        <p className="font-bold opacity-80">Check the <Link href={`${game.canonicalPath}guide/`} className="underline">Beginner Guide</Link>, <Link href={`${game.canonicalPath}items/`} className="underline">Items</Link>, and <Link href={`${game.canonicalPath}endings/`} className="underline">Endings Guide</Link>.</p>
      </div>
    </SubPageLayout>
  );
}

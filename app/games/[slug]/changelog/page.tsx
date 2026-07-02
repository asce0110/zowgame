import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGameBySlug, getPublishedGames } from "../../../../src/app/data/games";
import { SubPageLayout, SubSection } from "../../../../src/app/components/sub-page-layout";

export function generateStaticParams() {
  return getPublishedGames().filter((g) => g.slug === "dont-sleep-with-the-fishes").map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  return {
    title: `${game.shortTitle} Changelog`,
    description: `Version history for ${game.shortTitle}: v1.1.3 Steam launch, v1.1.2 achievements, and all patch notes.`,
    alternates: { canonical: `https://zowgame.com${game.canonicalPath}changelog/` },
  };
}

const changelog = [
  { version: "v1.1.3", date: "2026-06-26", changes: [
    "Steam launch — now available on Steam for $2.39",
    "Fast-Forward: hold F to skip night event intro animations (enable in Settings)",
    "Small Island delegation: can send your shipmate instead of going yourself",
    "First Aid Kit buffed: heals 50% → 70%",
    "Junk fishing scales slower after Day 30; Bait effective until Day 60",
    "Frederik's pipe smoke bug fixed",
    "Shipmates show visual changes when hungry or sick",
    "Steam achievements: 12 achievements available",
    "Steam Cloud saves supported",
    "Steam Deck verified as Playable by Valve",
  ]},
  { version: "v1.1.2", date: "2026-06-06", changes: [
    "Steam achievements support added",
    "Steam Cloud saves implemented",
    "Bait: only consumed when fish is actually caught (was: always consumed)",
    "Duct Tape: repair use now optional",
    "Duct Tape: chest spawn rate decreased",
    "Swim Ring: added to Treasure Chest loot pool",
    "Flare Gun: rescue ending chance slightly increased",
    "Captain Whiskers: fishing catch chance +1%",
    "Highest Day Reached tracking added to Main Menu",
    "Lore items saved to endings tab after fishing",
    "3 new night events added",
  ]},
  { version: "v1.1.1", date: "2026-05", changes: [
    "Pre-Steam final update",
    "Various balance adjustments",
    "Bug fixes for night event triggers",
    "Highest Day Reached not yet tracked (feature added in v1.1.2)",
  ]},
];

export default async function ChangelogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} pageTitle="Changelog" pageDescription={`Complete version history and patch notes for ${game.shortTitle}. Track every change from v1.1.1 through the Steam launch.`}>
      {changelog.map(({ version, date, changes }) => (
        <SubSection key={version} title={`${version} — ${date}`}>
          <ul className="list-disc pl-5 space-y-2">
            {changes.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </SubSection>
      ))}
    </SubPageLayout>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGameBySlug, getPublishedGames } from "../../../../src/app/data/games";
import { SubPageLayout, SubSection, HighlightBox } from "../../../../src/app/components/sub-page-layout";

export function generateStaticParams() {
  return getPublishedGames().map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  return {
    title: `${game.shortTitle} Beginner Guide`,
    description: `Beginner guide for ${game.shortTitle}: controls, crew selection, day-by-day survival, rescue conditions, and common mistakes. Updated v1.1.3.`,
    alternates: { canonical: `https://zowgame.com${game.canonicalPath}guide/` },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();
  const ver = game.changelog?.[0]?.version ?? "v1.1.3";

  return (
    <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} gameImage={game.ogImage} pageTitle="Beginner Guide" pageDescription={`Controls, ship evacuation, crew selection, and day-by-day survival strategy for ${game.shortTitle}. Updated for ${ver}.`}>
      <SubSection title="Quick Start: Your First Goal">
        <p>You are trapped on a sinking ship. Before it goes under, quickly grab useful items and throw them into your lifeboat. Choose <strong>one crew member</strong> to bring along. Then survive at sea — fish for food, repair your boat, manage your energy, and handle the deadly events that strike each night.</p>
        <p>New players should prioritize flexible survival items: <strong>Fishing Rod, Anchor, Duct Tape, and Bait</strong>. Save rare rescue items like Flare Gun and Flashlight for later — they are critical for the Rescue ending.</p>
      </SubSection>
      <SubSection title="Controls">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>WASD</strong> — Move around the ship</li>
          <li><strong>E</strong> — Pick up and throw items into your lifeboat</li>
          <li><strong>Left-Click</strong> — Interact with objects, crates, and barrels</li>
          <li><strong>F (hold)</strong> — Fast-Forward night event intro animations ({ver}, enable in Settings first)</li>
          <li><strong>ESC</strong> — Pause menu</li>
        </ul>
      </SubSection>
      <SubSection title="Phase 1: Emergency Evacuation">
        <p>You have limited time before the ship sinks. Your scavenging priority should be:</p>
        <HighlightBox variant="danger">
          <p className="font-extrabold text-foreground mb-2">Priority order — grab in this sequence:</p>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li><strong>Fishing Rod + Bait</strong> — Primary food source. Without these, you starve.</li>
            <li><strong>Flare Gun</strong> — Critical for Rescue ending. Do not waste.</li>
            <li><strong>Anchor</strong> — Counters Giant Squid and Whirlpool.</li>
            <li><strong>Duct Tape</strong> — Counters Leak and Eerie Melody. Repair is optional.</li>
            <li><strong>Flashlight</strong> — Backup rescue signal + Shadow Figure defense.</li>
            <li><strong>Medical supplies</strong> — Life-saving in dangerous encounters.</li>
          </ol>
        </HighlightBox>
      </SubSection>
      <SubSection title="Phase 2: Crew Selection">
        <div className="space-y-4">
          {[
            { name: "Frederik", role: "Repair & Crafting — Best All-Rounder", desc: "Better repair efficiency saves energy. Support action guarantees bait catches. Less essential post-v1.1.3 due to fishing nerf." },
            { name: "Row", role: "Combat & Defense", desc: "Defends against Eyes, Anglerfish, and monster events. Repairs cost less energy. Best for monster-heavy nights." },
            { name: "Laurel", role: "Morale & Support", desc: "Improves mood recovery. Strong during Hope rescue events. Food restores more hunger. Best for Rescue/True Ending." },
            { name: "Captain Whiskers", role: "Fishing & Luck", desc: "+1% fishing catch chance. Passive bonus always active. Unique lore interactions. Best for completionist runs." },
          ].map(({ name, role, desc }) => (
            <div key={name} className="rounded-xl border-2 border-border bg-input-background p-4">
              <h3 className="font-['Fredoka'] text-lg font-black text-foreground">{name} ({role})</h3>
              <p className="mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </SubSection>
      <SubSection title="Phase 3: Sea Survival — Day-by-Day">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Fish</strong> — Requires Fishing Rod and Bait. Bait only consumed on catch. Junk fishing scales slower after Day 30 ({ver}).</li>
          <li><strong>Eat</strong> — Maintains health. Track hunger closely — starvation is the most common death.</li>
          <li><strong>Repair the boat</strong> — A damaged boat sinks. Duct Tape repair is optional — save it for event counters.</li>
          <li><strong>Match shipmate to day plan</strong> — Frederik on fishing days, Row on repair days, Laurel on recovery days.</li>
        </ul>
      </SubSection>
      <SubSection title="Common Beginner Mistakes">
        <HighlightBox variant="warning">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Not bringing an Anchor</strong> — Giant Squid and Whirlpool can destroy your boat instantly.</li>
            <li><strong>Wasting Flare Gun early</strong> — Critical for Rescue ending. Do not use on non-Hope events.</li>
            <li><strong>Ignoring Bait</strong> — Without it, fishing fails and you starve.</li>
            <li><strong>Forgetting to repair</strong> — A damaged boat sinks regardless of health.</li>
            <li><strong>Bringing the wrong shipmate</strong> — Different endings require different crew members.</li>
          </ul>
        </HighlightBox>
      </SubSection>
    </SubPageLayout>
  );
}

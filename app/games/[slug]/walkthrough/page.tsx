import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGameBySlug, getPublishedGames } from "../../../../src/app/data/games";
import { SubPageLayout, SubSection, HighlightBox } from "../../../../src/app/components/sub-page-layout";

export function generateStaticParams() {
  return getPublishedGames().filter((g) => g.slug === "dont-sleep-with-the-fishes").map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  return {
    title: `${game.shortTitle} Walkthrough`,
    description: `Step-by-step survival walkthrough for ${game.shortTitle}: ship evacuation, Days 1-10 survival, mid-game events, and rescue conditions.`,
    alternates: { canonical: `https://zowgame.com${game.canonicalPath}walkthrough/` },
  };
}

export default async function WalkthroughPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} pageTitle="Walkthrough" pageDescription={`Step-by-step survival route from ship evacuation to rescue for ${game.shortTitle}. Spoiler-aware.`}>
      <SubSection title="Phase 1: Ship Evacuation — First Scavenge">
        <p>Before the ship sinks, your priority is grabbing key survival items:</p>
        <HighlightBox variant="danger"><ol className="list-decimal pl-5 space-y-1.5"><li><strong>Fishing Rod + Bait</strong> — Without these, you starve.</li><li><strong>Flare Gun</strong> — Critical for Rescue ending. Do not use on anything else.</li><li><strong>Anchor</strong> — Counters Giant Squid and Whirlpool.</li><li><strong>Duct Tape</strong> — Counters Leak and Eerie Melody. v1.1.3: repair is optional.</li><li><strong>Flashlight</strong> — Backup rescue signal + Shadow Figure defense.</li><li><strong>Medical supplies</strong> — Life-saving in dangerous encounters.</li></ol></HighlightBox>
        <p className="mt-4">Food and water are secondary — you can fish later. Choose ONE crew member carefully.</p>
      </SubSection>

      <SubSection title="Phase 2: Days 1-3 — Establish Survival">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Day actions:</strong> Fish (Bait + Rod), Eat, Repair if damaged.</li>
          <li><strong>Chat with your shipmate</strong> — they provide morale and support actions.</li>
          <li>In v1.1.3, Bait is only consumed when you catch a fish — use it aggressively.</li>
          <li>Duct Tape repair is optional — save it for Eerie Melody and Leak counters.</li>
          <li>If you don't have Bait, prioritize finding or trading for it immediately.</li>
        </ul>
      </SubSection>

      <SubSection title="Phase 3: Days 4-10 — Mid-Game Events">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Save Flare Gun and Flashlight</strong> for Hope/Other People events (rescue route).</li>
          <li><strong>Keep Anchor ready</strong> for Giant Squid and Whirlpool.</li>
          <li><strong>Duct Tape</strong> counters Eerie Melody — do NOT use Flashlight or Spyglass during this event.</li>
          <li>Track your food supply — starvation is the most common death cause.</li>
        </ul>
      </SubSection>

      <SubSection title="Phase 4: Late Game — Rescue Conditions">
        <ul className="list-disc pl-5 space-y-2">
          <li>Use <strong>Flare Gun during Hope events</strong> to signal for rescue. Rescue chance slightly increased in v1.1.3.</li>
          <li><strong>Flashlight</strong> works as backup signaling.</li>
          <li>If pursuing <strong>True Ending</strong>, investigate Heart of the Sea and Giant Squid interactions.</li>
          <li>Keep your boat repaired and morale up — both affect ending eligibility.</li>
        </ul>
      </SubSection>

      <SubSection title="Common Failure Points">
        <HighlightBox variant="warning"><ul className="list-disc pl-5 space-y-1.5"><li>Starving because you forgot Bait or a Fishing Rod.</li><li>Boat destroyed by Giant Squid or Whirlpool — always keep Anchor.</li><li>Shipmate killed during Eyes event — stay awake.</li><li>Missing rescue because you used Flare Gun on non-Hope events.</li><li>Wasting Duct Tape on minor repairs instead of saving for Eerie Melody.</li></ul></HighlightBox>
      </SubSection>
    </SubPageLayout>
  );
}

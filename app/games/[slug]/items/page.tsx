import type { Metadata } from "next";
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
  return { title: `${game.shortTitle} Items Guide`, description: `Complete items catalog for ${game.shortTitle}: S/A/B/C priority rankings, night event counters, item sources, and ending uses. Updated for v1.1.3.`, alternates: { canonical: `https://zowgame.com${game.canonicalPath}items/` } };
}

const tiers = [
  { tier: "S", label: "Essential — Bring Every Run", items: "Anchor, Flare Gun, Flashlight", color: "border-accent/30 bg-accent/5" },
  { tier: "A", label: "Strong — High Value", items: "Duct Tape, Bucket, Bait, Fishing Rod", color: "border-primary/30 bg-primary/5" },
  { tier: "B", label: "Situational — Route Dependent", items: "Swim Ring, Scuba Gear, Harpoon Gun, Captain Whiskers", color: "border-border bg-input-background" },
  { tier: "C", label: "Limited / Unknown", items: "Spyglass, Heart Piece, Heart Note, Message in a Bottle", color: "border-border bg-input-background" },
];

const items = [
  { name: "Anchor", tier: "S", source: "Ship / Chest", counters: "Giant Squid, Whirlpool", ending: "True Ending route", desc: "The single most important safety item. Without Anchor, Giant Squid and Whirlpool are run-ending." },
  { name: "Flare Gun", tier: "S", source: "Ship / Chest", counters: "Hope, Other People", ending: "Rescue (primary)", desc: "Primary rescue signaling item. Use during Hope events to signal aircraft. Do not waste on non-rescue events." },
  { name: "Flashlight", tier: "S", source: "Ship", counters: "Hope, Shadow Figure", ending: "Rescue (backup)", desc: "Backup rescue item and Shadow Figure defense." },
  { name: "Duct Tape", tier: "A", source: "Ship / Chest", counters: "Leak, Eerie Melody", desc: "Counters two different night events. Repair use is optional — save for event counters." },
  { name: "Bucket", tier: "A", source: "Ship", counters: "Leak, Eerie Melody", ending: "Heart route", desc: "Versatile item for Leak and Eerie Melody events." },
  { name: "Bait", tier: "A", source: "Ship / Events", desc: "Fishing requires Bait. Only consumed on catch (v1.1.2+). Effective until Day 60 in v1.1.3." },
  { name: "Fishing Rod", tier: "A", source: "Ship", desc: "Daily food gathering. Requires Bait. Primary food source." },
  { name: "First Aid Kit", tier: "A", source: "Ship", desc: "Heals 70% (buffed from 50% in v1.1.3). Critical for surviving dangerous encounters." },
];

const eventCounters = [
  ["Giant Squid", "Anchor", "Repair next day", "Going back to sleep"],
  ["Whirlpool", "Anchor", "Immediate repair", "No anchor"],
  ["Eerie Melody", "Duct Tape", "Bucket / Umbrella", "Flashlight / Spyglass"],
  ["Eyes", "Stay awake", "None known", "Sleeping"],
  ["Hope", "Flare Gun / Flashlight", "Save Flare Gun", "Ignoring the plane"],
  ["Seagull", "Shoo away", "Feed (accepts food drain)", "Letting too many stay"],
  ["Leak", "Duct Tape", "Bucket", "Ignoring it"],
];

export default async function ItemsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();
  const ver = game.changelog?.[0]?.version ?? "v1.1.3";

  return (
    <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} pageTitle="Items & Event Counters" pageDescription={`Complete item catalog for ${game.shortTitle}. Updated for ${ver}.`}>
      <SubSection title="Item Priority Rankings">
        <div className="space-y-3">
          {tiers.map(({ tier, label, items, color }) => (
            <div key={tier} className={`rounded-xl border-2 ${color} p-4`}>
              <span className="font-['Fredoka'] text-lg font-black text-foreground">{tier}-Tier: {label}</span>
              <p className="mt-1">{items}</p>
            </div>
          ))}
        </div>
      </SubSection>
      <SubSection title="Item Details">
        <div className="space-y-4">
          {items.map(({ name, tier, source, counters, ending, desc }) => (
            <div key={name} className="rounded-xl border-2 border-border bg-input-background p-4">
              <h3 className="font-['Fredoka'] text-lg font-black text-foreground">{name} <span className="text-accent text-sm">[{tier}-Tier]</span></h3>
              <p><strong>Source:</strong> {source}{counters ? ` | <strong>Counters:</strong> ${counters}` : ""}{ending ? ` | <strong>Ending:</strong> ${ending}` : ""}</p>
              <p className="mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </SubSection>
      <SubSection title="Night Event Counter Reference">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead><tr className="border-b-2 border-border">{[ "Event", "Best Counter", "Backup", "Avoid" ].map(h => <th key={h} className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold">{h}</th>)}</tr></thead>
            <tbody className="text-sm font-bold text-muted-foreground">
              {eventCounters.map(([event, best, backup, avoid], i) => (
                <tr key={event} className={i < 6 ? "border-b border-border" : ""}>
                  <td className="px-3 py-3 font-extrabold text-foreground">{event}</td>
                  <td className="px-3 py-3 text-primary font-extrabold">{best}</td>
                  <td className="px-3 py-3">{backup}</td>
                  <td className="px-3 py-3 text-accent">{avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SubSection>
    </SubPageLayout>
  );
}

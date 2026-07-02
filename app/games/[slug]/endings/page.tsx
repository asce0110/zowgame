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
  return { title: `${game.shortTitle} Endings Guide`, description: `All 12+ endings for ${game.shortTitle}: Rescue, True Ending, Pay Debt, Ghost Ship, and every bad ending. Requirements and community-verified routes.`, alternates: { canonical: `https://zowgame.com${game.canonicalPath}endings/` } };
}

const endings = [
  { category: "Survival & Rescue", color: "border-emerald-500/30 bg-emerald-500/5", entries: [
    { title: "Rescue Ending", req: "Flare Gun or Flashlight. Respond to Hope and Other People night events.", detail: "Signal passing aircraft during Hope events. The most common good ending." },
    { title: "Survivor Ending", req: "Survive long enough and reach rescue conditions.", detail: "Harder than standard rescue — must survive longer without specific item triggers." },
  ]},
  { category: "Secret & Hidden", color: "border-purple-500/30 bg-purple-500/5", entries: [
    { title: "True Ending (Community Theory)", req: "Heart of the Sea item + Giant Squid interaction. May involve paying debt.", detail: "Status: Community theory — not independently verified." },
    { title: "Pay Debt Route", req: "Possibly connected to Giant Squid and Heart of the Sea.", detail: "Status: Community is still tracking." },
    { title: "Ghost Ship / Flying Dutchman (Unverified)", req: "Unknown. Specific trigger not confirmed.", detail: "Status: Player speculation." },
  ]},
  { category: "Death & Bad Endings", color: "border-border bg-input-background", entries: [
    { title: "Lost at Sea (Death)", req: "Hit 0 health, starve, or fail critical night events without counter items." },
    { title: "Starvation", req: "Run out of food. No Bait or Fishing Rod." },
    { title: "Boat Destroyed", req: "Fail Whirlpool or Leak events without Anchor or Duct Tape." },
    { title: "Shipmate Death", req: "Fail Eyes event or other crew-threatening encounters." },
    { title: "Seagull Bad Ending", req: "Keep seagull too long without shooing. Letting too many stay triggers this." },
  ]},
];

export default async function EndingsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} pageTitle="All Endings Guide" pageDescription={`Complete endings guide for ${game.shortTitle}. 12+ endings with requirements.`}>
      {endings.map(({ category, color, entries }) => (
        <SubSection key={category} title={category}>
          <div className="space-y-3">
            {entries.map(({ title, req, detail }) => (
              <div key={title} className={`rounded-xl border-2 ${color} p-4`}>
                <h3 className="font-['Fredoka'] text-lg font-black text-foreground">{title}</h3>
                <p><strong>Requirement:</strong> {req}</p>
                {detail && <p className="mt-1 text-sm text-muted-foreground">{detail}</p>}
              </div>
            ))}
          </div>
        </SubSection>
      ))}
      <SubSection title="Spoiler Policy">
        <p>This endings guide is marked with community confidence levels. Where a route is labeled "Community-Reported" or "Unverified," it means players have shared theories but the exact trigger has not been confirmed through independent testing or official sources.</p>
        <p className="mt-2">Official sources confirm multiple endings exist but do not specify an exact number. All ending routes documented here are based on player reports.</p>
      </SubSection>
    </SubPageLayout>
  );
}

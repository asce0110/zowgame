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
    title: `${game.shortTitle} Achievements Guide`,
    description: `Achievement and completion guide for ${game.shortTitle}: ending checklist, highest day record, lore items, and community records.`,
    alternates: { canonical: `https://zowgame.com${game.canonicalPath}achievements/` },
  };
}

export default async function AchievementsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} pageTitle="Achievements & Completion" pageDescription={`Achievement tracking and completion checklist for ${game.shortTitle}. Ending routes, records, lore items, and community world records.`}>
      <SubSection title="Completion Tracking (v1.1.3)">
        <div className="overflow-x-auto"><table className="w-full border-collapse"><thead><tr className="border-b-2 border-border"><th className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold">Feature</th><th className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold">Status</th></tr></thead><tbody className="text-sm font-bold text-muted-foreground">{[["Steam achievements","12 achievements on Steam store page"],["Lore item tracking","Saved to endings tab after fishing"],["Highest Day Reached","Tracked in Main Menu from v1.1.2+"],["Ending checklist","Multiple endings exist, community tracking ongoing"],["Community records","Self-reported: 52, 68, 75 days (unverified)"]].map(([f,s],i)=>(<tr key={f} className={i<4?"border-b border-border":""}><td className="px-3 py-2 font-extrabold text-foreground">{f}</td><td className="px-3 py-2">{s}</td></tr>))}</tbody></table></div>
      </SubSection>

      <SubSection title="Endings Checklist">
        <div className="space-y-2">{[
          { name:"Rescue Ending", status:"Official route; community-tested" },
          { name:"True Ending", status:"Community-reported; Heart of the Sea theory" },
          { name:"Pay Debt Route", status:"Community-reported; Giant Squid connected" },
          { name:"Ghost Ship / Flying Dutchman", status:"Player speculation; unverified" },
          { name:"Survivor Ending", status:"Survive long enough, reach rescue" },
          { name:"Lost at Sea (Death)", status:"Hit 0 health or starve" },
          { name:"Seagull Bad Ending", status:"Keep too many seagulls" },
          { name:"Boat Destroyed", status:"Fail Whirlpool/Leak without Anchor/Duct Tape" },
          { name:"Starvation", status:"No Bait or Fishing Rod" },
          { name:"Shipmate Death", status:"Fail Eyes event" },
        ].map(e=>(<div key={e.name} className="rounded-xl border-2 border-border bg-input-background p-3 flex justify-between items-center"><span className="font-extrabold text-sm">{e.name}</span><span className="font-mono text-[10px] text-muted-foreground">{e.status}</span></div>))}</div>
      </SubSection>

      <HighlightBox variant="info"><p className="font-extrabold text-foreground mb-2">Tracking Tips</p><ul className="list-disc pl-5 space-y-1 text-sm"><li>Highest Day Reached: check Main Menu on v1.1.2 or newer after each run.</li><li>Lore items: fished items are saved to the endings tab — check after each fishing session.</li><li>v1.1.1 runs are NOT recorded by the tracking feature — only v1.1.2+.</li><li>No official leaderboard exists. All world records are self-reported and unverified.</li></ul></HighlightBox>
    </SubPageLayout>
  );
}

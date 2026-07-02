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
    title: `${game.shortTitle} Tips & Tricks`,
    description: `Advanced tips and tricks for ${game.shortTitle}: bait strategy, shipmate support, Duct Tape uses, and v1.1.3 changes.`,
    alternates: { canonical: `https://zowgame.com${game.canonicalPath}tips-tricks/` },
  };
}

const tips = [
  { t:"Use Bait More Aggressively in v1.1.3", d:"Bait is safer to use because it is only consumed when you actually catch a fish. This makes early-game fishing much more forgiving and reduces starvation risk." },
  { t:"Save Duct Tape for High-Value Uses", d:"In v1.1.3, Duct Tape repair is optional and chest spawns are less generous. Save Duct Tape for Eerie Melody and Leak counters — these events are far more dangerous than minor hull damage." },
  { t:"Use Shipmate Support Based on Day Plan", d:"Frederik on fishing days (bait guarantee), Row on repair days (energy discount), Laurel on recovery days (more hunger restored). Matching support to your plan maximizes efficiency." },
  { t:"Anchor Is an S-Tier Safety Item", d:"Counters the two most dangerous events: Giant Squid and Whirlpool. Without Anchor, either event can destroy your boat instantly. Bring it every run." },
  { t:"Save Flashlight and Flare Gun for Rescue", d:"Use Flashlight first for Hope events and save Flare Gun for stronger rescue opportunities. Wasting Flare Gun on non-rescue events permanently locks the Rescue ending." },
  { t:"Do Not Feed Every Seagull", d:"Seagulls can stay on the boat, eat your food, and become dangerous if too many remain. The Seagull Bad Ending triggers when you accumulate too many. Shoo them away unless you specifically want the bad ending." },
  { t:"Open Chests Only When You Can Afford the Energy", d:"Chests cost energy to open. v1.1.3 adjusted the Treasure Chest drop pool. Open them when you have surplus energy — not when you need to fish or repair." },
  { t:"Captain Whiskers Is No Longer Useless", d:"The cat gives +1% fishing catch chance in v1.1.3. Small but permanent. Over a 50+ day run, this adds up to multiple extra catches. Best for long survival records." },
  { t:"Use v1.1.3 for Highest-Day Records", d:"The Highest Day Reached tracker was added in v1.1.2. v1.1.1 runs are not recorded. Always play on the latest version for accurate tracking." },
];

export default async function TipsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} pageTitle="Tips & Tricks" pageDescription={`Advanced tips and strategies for ${game.shortTitle}. Bait management, shipmate support, item priority, and community-tested survival techniques.`}>
      <SubSection title="Official Tips (v1.1.3)">
        <div className="space-y-4">{tips.map(({t,d})=>(<div key={t} className="rounded-xl border-2 border-border bg-input-background p-4"><h3 className="font-['Fredoka'] text-base font-black text-foreground">{t}</h3><p className="mt-2 text-sm">{d}</p></div>))}</div>
      </SubSection>

      <SubSection title="Shipmate Support Quick Reference">
        <div className="overflow-x-auto"><table className="w-full border-collapse"><thead><tr className="border-b-2 border-border"><th className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold">Shipmate</th><th className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold">Support Use</th><th className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold">Best Day Plan</th></tr></thead><tbody className="text-sm font-bold text-muted-foreground">{[["Frederik","Bait guarantees a catch","Fishing day"],["Laurel","Food restores more hunger","Recovery day"],["Row","Repairs cost less energy","Repair day"]].map(([n,s,d],i)=>(<tr key={n} className={i<2?"border-b border-border":""}><td className="px-3 py-2 font-extrabold text-foreground">{n}</td><td className="px-3 py-2">{s}</td><td className="px-3 py-2">{d}</td></tr>))}</tbody></table></div>
      </SubSection>

      <HighlightBox variant="warning"><p className="font-extrabold text-foreground mb-2">Community Warning</p><p className="text-sm">Do not assume every community ending route is confirmed. Heart of the Sea, Pay Debt, and Giant Squid routes still need in-game verification. Label unverified strategies clearly when sharing.</p></HighlightBox>
    </SubPageLayout>
  );
}

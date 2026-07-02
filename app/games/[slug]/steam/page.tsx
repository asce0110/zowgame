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
    title: `${game.shortTitle} Steam Guide`,
    description: `${game.shortTitle} on Steam: price, achievements, cloud saves, Steam Deck compatibility, and itch.io comparison. Released June 2026.`,
    alternates: { canonical: `https://zowgame.com${game.canonicalPath}steam/` },
  };
}

export default async function SteamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} pageTitle="Steam Guide" pageDescription={`Everything about ${game.shortTitle} on Steam: pricing, achievements, cloud saves, Steam Deck, and itch.io comparison.`}>
      <SubSection title="Steam Release Info">
        <p><strong>Release date:</strong> June 26, 2026. <strong>Price:</strong> $2.39 (was $2.15 during -10% launch sale). The Steam version runs v1.1.3 with 12 achievements, Steam Cloud saves, and automatic updates. Steam Deck is verified as Playable by Valve (via Proton).</p>
      </SubSection>

      <SubSection title="Steam vs itch.io">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead><tr className="border-b-2 border-border"><th className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold">Feature</th><th className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold">Steam</th><th className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold">itch.io</th></tr></thead>
            <tbody className="text-sm font-bold text-muted-foreground">
              {[["Price","$2.39","$1.99"],["DRM","Steam DRM","DRM-Free"],["Updates","Auto","Manual"],["Achievements","12 Steam","N/A"],["Cloud Saves","Steam Cloud","Manual"],["Steam Deck","Playable ✓","Manual Proton"],["Dev Revenue","~70%","~90%+"]].map(([f,s,i],idx) => (<tr key={f} className={idx<6?"border-b border-border":""}><td className="px-3 py-2 font-extrabold text-foreground">{f}</td><td className="px-3 py-2">{s}</td><td className="px-3 py-2">{i}</td></tr>))}
            </tbody>
          </table>
        </div>
      </SubSection>

      <SubSection title="Steam Deck">
        <p>Don't Sleep With The Fishes is <strong>verified as Playable</strong> by Valve on Steam Deck. It runs via Proton but has not been natively optimized. Expect minor text scaling issues on the 7-inch screen. Performance is stable at 60fps.</p>
      </SubSection>

      <SubSection title="Steam Achievements">
        <p>The Steam version includes <strong>12 achievements</strong> covering endings, survival milestones, and hidden objectives. The exact achievement list is viewable on the Steam store page. v1.1.3 tracks achievement progress through Steam's native system — no external tracker needed.</p>
      </SubSection>
    </SubPageLayout>
  );
}

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
    title: `${game.shortTitle} Characters Guide`,
    description: `Complete crew guide for ${game.shortTitle}: Frederik, Row, Laurel, Captain Whiskers. Skills, support actions, and who to bring for each ending.`,
    alternates: { canonical: `https://zowgame.com${game.canonicalPath}characters/` },
  };
}

const crew = [
  { name: "Frederik", role: "Repair & Crafting", best: "Best all-rounder", color: "border-primary/30 bg-primary/5", pros: "Better repair efficiency. Support action guarantees bait catches. Good for Pay Debt routes.", cons: "No morale or combat bonuses. Less impact if you stockpile Duct Tape.", skills: "Repair efficiency up, Bait guarantee on fishing days" },
  { name: "Row", role: "Combat & Defense", best: "Monster-heavy routes", color: "border-accent/30 bg-accent/5", pros: "Defends against Eyes, Anglerfish, and monster events. Repairs cost less energy. Best for surviving high-threat nights.", cons: "No fishing or food bonuses. Less useful on peaceful nights. Minimal morale support.", skills: "Monster defense, Repair energy discount" },
  { name: "Laurel", role: "Morale & Support", best: "Rescue ending", color: "border-emerald-500/30 bg-emerald-500/5", pros: "Boosts morale recovery. Strong during Hope rescue events. Food restores more hunger. Best for Rescue and True Ending routes.", cons: "No combat or repair help. Less useful on repair-heavy days. Hunger management still requires fishing.", skills: "Morale boost, Food restores more hunger" },
  { name: "Captain Whiskers", role: "Fishing & Luck", best: "Long survival runs", color: "border-yellow-500/30 bg-yellow-500/5", pros: "+1% fishing catch chance (v1.1.3). Passive bonus always active. Unique lore interactions. Adds up in long runs.", cons: "Smallest mechanical impact. No active support action. No defense or repair help. 1% is negligible for short runs.", skills: "+1% fishing catch (passive), Unique lore dialogue" },
];

export default async function CharactersPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} pageTitle="Characters & Crew" pageDescription={`Complete crew guide for ${game.shortTitle}. Each shipmate's skills, support actions, pros/cons, and which ending they're best for.`}>
      <SubSection title="Quick Pick">
        <HighlightBox variant="info">
          <p><strong>Frederik</strong> is the best all-rounder for most players. <strong>Row</strong> if you're scared of monster events. <strong>Laurel</strong> if going for Rescue. <strong>Captain Whiskers</strong> for completion and long survival.</p>
        </HighlightBox>
      </SubSection>

      {crew.map((c) => (
        <SubSection key={c.name} title={`${c.name} — ${c.role}`}>
          <div className="rounded-xl border-2 border-border bg-input-background p-4 mb-4">
            <p className="font-extrabold text-foreground text-sm">Support action: {c.skills}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="font-['Fredoka'] text-sm font-black text-emerald-600 mb-2">Pros</p>
              <p className="text-sm">{c.pros}</p>
            </div>
            <div className="rounded-xl border-2 border-accent/30 bg-accent/5 p-4">
              <p className="font-['Fredoka'] text-sm font-black text-accent mb-2">Cons</p>
              <p className="text-sm">{c.cons}</p>
            </div>
          </div>
          <p className="mt-3 text-sm"><strong>Best for:</strong> {c.best}</p>
        </SubSection>
      ))}
    </SubPageLayout>
  );
}

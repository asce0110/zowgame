import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGameBySlug, getPublishedGames } from "../../../../src/app/data/games";
import { SubPageLayout, SubSection } from "../../../../src/app/components/sub-page-layout";
import { FishesGuidePage, fishesGuideMetadata } from "../../../../src/app/components/fishes-guide-page";

export function generateStaticParams() { return getPublishedGames().map((game) => ({ slug: game.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "dont-sleep-with-the-fishes") return fishesGuideMetadata("guide");
  const game = getGameBySlug(slug);
  if (!game) return {};
  return { title: `${game.shortTitle} Beginner Guide`, description: game.guideIntro, alternates: { canonical: `https://zowgame.com${game.canonicalPath}guide/` } };
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "dont-sleep-with-the-fishes") return <FishesGuidePage pageKey="guide" />;
  const game = getGameBySlug(slug);
  if (!game) notFound();
  return <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} pageTitle={game.guideTitle} pageDescription={game.guideIntro}>
    <SubSection title={game.objectiveTitle}><p>{game.objectiveBody}</p></SubSection>
    {game.guideSteps.map((step) => <SubSection key={step.title} title={step.title}><p>{step.body}</p></SubSection>)}
    <SubSection title={game.controlsHeading}><ul>{game.controlsTable.map((control) => <li key={control.label}><strong>{control.label}:</strong> {control.value}</li>)}</ul></SubSection>
  </SubPageLayout>;
}

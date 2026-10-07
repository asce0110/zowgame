import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGameBySlug, getPublishedGames } from "../../../../src/app/data/games";
import { SubPageLayout, SubSection } from "../../../../src/app/components/sub-page-layout";
import { FishesGuidePage, fishesGuideMetadata } from "../../../../src/app/components/fishes-guide-page";

export function generateStaticParams() { return getPublishedGames().map((game) => ({ slug: game.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "dont-sleep-with-the-fishes") return fishesGuideMetadata("faq");
  const game = getGameBySlug(slug);
  if (!game) return {};
  return { title: `${game.shortTitle} FAQ`, description: `Common questions about ${game.shortTitle}, controls and gameplay.`, alternates: { canonical: `https://zowgame.com${game.canonicalPath}faq/` } };
}
export default async function FAQPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "dont-sleep-with-the-fishes") return <FishesGuidePage pageKey="faq" />;
  const game = getGameBySlug(slug);
  if (!game) notFound();
  return <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} pageTitle="FAQ" pageDescription={`Frequently asked questions about ${game.shortTitle}.`}>
    {game.content.faqs.map((faq) => <SubSection key={faq.q} title={faq.q}><p>{faq.a}</p></SubSection>)}
  </SubPageLayout>;
}

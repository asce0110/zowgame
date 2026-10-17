import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGameBySlug, getPublishedGames } from "../../../../src/app/data/games";
import { SubPageLayout, SubSection } from "../../../../src/app/components/sub-page-layout";
import { FishesGuidePage, fishesGuideMetadata } from "../../../../src/app/components/fishes-guide-page";
import { KrillionGamePage, krillionMetadata } from "../../../../src/app/components/krillion-game-page";
import { HoodWarfarePage, hoodMetadata } from "../../../../src/app/components/hood-warfare-2-page";
import { createPageMetadata } from "../../../../src/app/lib/seo";

export function generateStaticParams() { return getPublishedGames().filter((game) => game.accessMode !== "tabletop").map((game) => ({ slug: game.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "hood-warfare-2") return hoodMetadata("faq");
  if (slug === "krillion") return krillionMetadata("faq");
  if (slug === "dont-sleep-with-the-fishes") return fishesGuideMetadata("faq");
  const game = getGameBySlug(slug);
  if (!game || game.accessMode === "tabletop") notFound();
  return createPageMetadata({ title: `${game.shortTitle} FAQ`, description: `Common questions about ${game.shortTitle}, controls and gameplay.`, path: `${game.canonicalPath}faq/`, image: game.ogImage });
}
export default async function FAQPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "hood-warfare-2") return <HoodWarfarePage pageKey="faq" />;
  if (slug === "krillion") return <KrillionGamePage pageKey="faq" />;
  if (slug === "dont-sleep-with-the-fishes") return <FishesGuidePage pageKey="faq" />;
  const game = getGameBySlug(slug);
  if (!game || game.accessMode === "tabletop") notFound();
  return <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} pageTitle="FAQ" pageDescription={`Frequently asked questions about ${game.shortTitle}.`}>
    {game.content.faqs.map((faq) => <SubSection key={faq.q} title={faq.q}><p>{faq.a}</p></SubSection>)}
  </SubPageLayout>;
}

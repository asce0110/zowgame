import type { Metadata } from "next";
import { notFound } from "next/navigation";
import App from "../../../src/app/App";
import { FishesOverview } from "../../../src/app/components/fishes-guide-page";
import { TabletopGamePage } from "../../../src/app/components/tabletop-game-page";
import { KrillionGamePage, krillionMetadata } from "../../../src/app/components/krillion-game-page";
import { HoodWarfarePage, hoodMetadata } from "../../../src/app/components/hood-warfare-2-page";
import { getGameBySlug, getPublishedGames } from "../../../src/app/data/games";
import { createPageMetadata } from "../../../src/app/lib/seo";

export function generateStaticParams() {
  return getPublishedGames().map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "hood-warfare-2") return hoodMetadata("overview");
  if (slug === "krillion") return krillionMetadata("overview");
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return createPageMetadata({ title: game.content.seoTitle, description: game.content.seoDescription, path: game.canonicalPath, image: game.ogImage });
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();
  if (slug === "hood-warfare-2") return <HoodWarfarePage />;
  if (slug === "krillion") return <KrillionGamePage />;
  if (game.accessMode === "tabletop") return <TabletopGamePage game={game} />;
  if (slug === "dont-sleep-with-the-fishes") return <FishesOverview game={game} />;
  return <App game={game} />;
}

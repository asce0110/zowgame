import type { Metadata } from "next";
import { notFound } from "next/navigation";
import App from "../../../src/app/App";
import { getGameBySlug, getPublishedGames } from "../../../src/app/data/games";

export function generateStaticParams() {
  return getPublishedGames().map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};

  return {
    title: game.content.seoTitle,
    description: game.content.seoDescription,
    alternates: { canonical: `https://zowgame.com${game.canonicalPath}` },
    openGraph: {
      title: game.content.seoTitle,
      description: game.content.seoDescription,
      url: `https://zowgame.com${game.canonicalPath}`,
      images: [game.ogImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: game.content.seoTitle,
      description: game.content.seoDescription,
      images: [game.ogImage],
    },
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();
  return <App game={game} />;
}

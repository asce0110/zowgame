import type { Metadata } from "next";
import { notFound } from "next/navigation";
import App from "../../../src/app/App";
import { getGameBySlug, getPublishedGames } from "../../../src/app/data/games";

export function generateStaticParams() {
  return getPublishedGames().map((game) => ({ slug: game.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const game = getGameBySlug(params.slug);
  if (!game) return {};

  return {
    title: game.content.seoTitle,
    description: game.content.seoDescription,
    keywords: game.keywords,
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

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug);
  if (!game) notFound();
  return <App game={game} />;
}

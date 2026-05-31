import type { Metadata } from "next";
import { HomePage } from "../src/app/HomePage";
import { getPublishedGames } from "../src/app/data/games";

const games = getPublishedGames();
const featuredGame = games[0];

export const metadata: Metadata = {
  title: "ZowGame - Play Free Browser Games Online",
  description:
    `Play fast, free browser games on ZowGame. Featured now: ${featuredGame.shortTitle}, plus focused browser game pages with guides, controls, and instant-play access.`,
  keywords: [
    "ZowGame",
    "free browser games",
    "online games",
    "play games online",
    ...featuredGame.keywords,
  ],
  alternates: { canonical: "https://zowgame.com/" },
};

export default function Page() {
  return <HomePage />;
}

import type { Metadata } from "next";
import App from "../../src/app/App";

export const metadata: Metadata = {
  title: "Cobb Can Move - Play Online Free in Browser",
  description:
    "Play Cobb Can Move online for free in your browser. Explore a dark pixel dungeon, collect coal, keep the light alive, and survive Cobb as the rules change every level.",
  alternates: { canonical: "https://zowgame.com/cobb-can-move/" },
};

export default function Page() {
  return <App />;
}

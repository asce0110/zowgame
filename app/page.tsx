import type { Metadata } from "next";
import { HomePage } from "../src/app/HomePage";

export const metadata: Metadata = {
  title: "ZowGame - Play Free Browser Games Online",
  description:
    "Play fast, free browser games on ZowGame. Start with Cobb Can Move, a tense pixel horror game you can launch instantly online.",
  keywords: [
    "ZowGame",
    "free browser games",
    "online games",
    "play games online",
    "horror browser games",
    "Cobb Can Move",
  ],
  alternates: { canonical: "https://zowgame.com/" },
};

export default function Page() {
  return <HomePage />;
}

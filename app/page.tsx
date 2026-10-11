import type { Metadata } from "next";
import Script from "next/script";
import { HomePage } from "../src/app/HomePage";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZowGame",
  url: "https://zowgame.com",
  description: "Independent game guides for browser, download and tabletop games, with links to their official creators.",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ZowGame",
  url: "https://zowgame.com",
  description: "Explore browser, download and tabletop games. Find first-session guides, walkthroughs and survival manuals.",
};

export const metadata: Metadata = {
  title: "Games & Player Guides — Defenders of Hogwarts",
  description:
    "Looking for the Harry Potter Defenders RPG game? Explore MinaLima's Defenders of Hogwarts board game, browser games, survival guides and puzzle walkthroughs.",
  alternates: { canonical: "https://zowgame.com/" },
};

export default function Page() {
  return (
    <>
      <Script
        id="schema-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema]),
        }}
      />
      <HomePage />
    </>
  );
}

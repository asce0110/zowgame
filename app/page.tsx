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
  title: "Games, Player Guides & Steam Stats",
  description:
    "Explore AION 2 Steam launch stats, the Harry Potter Defenders RPG game explained, browser games, survival guides and puzzle walkthroughs.",
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

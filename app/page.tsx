import type { Metadata } from "next";
import Script from "next/script";
import { HomePage } from "../src/app/HomePage";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZowGame",
  url: "https://zowgame.com",
  description: "Independent browser games and player guides, with official download links for downloadable games.",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ZowGame",
  url: "https://zowgame.com",
  description: "Explore independent games, play browser titles, and find controls, walkthroughs, and survival guides.",
};

export const metadata: Metadata = {
  title: "Indie Games & Player Guides",
  description:
    "Find your next indie game on ZowGame. Play browser games, explore survival guides and puzzle walkthroughs, or visit official download stores.",
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

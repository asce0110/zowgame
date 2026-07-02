import type { Metadata } from "next";
import Script from "next/script";
import { HomePage } from "../src/app/HomePage";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZowGame",
  url: "https://zowgame.com",
  description: "Curated browser game portal with guides. Play free online games instantly, no downloads required.",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ZowGame",
  url: "https://zowgame.com",
  description: "Play free browser games online. Survival horror, puzzle, arcade, and roguelite games with guides and instant-play access.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://zowgame.com/#discover",
    "query-input": "required name=search_term",
  },
};

export const metadata: Metadata = {
  title: "Play Free Browser Games Online | ZowGame",
  description:
    "Play free browser games instantly on ZowGame. Survival horror, puzzle, arcade — every game includes controls, guides, and tips. No download needed.",
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

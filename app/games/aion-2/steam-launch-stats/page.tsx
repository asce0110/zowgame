import type { Metadata } from "next";
import { Aion2StatsPage } from "../../../../src/app/components/aion-2-stats-page";
import { AION_2_FAQ, AION_2_STATS_PATH } from "../../../../src/app/data/aion-2-stats";
import { AION_2_HELP_CHECKED, AION_2_HELP_GUIDES } from "../../../../src/app/data/aion-2-player-help";

const title = "AION 2 Steam Launch Stats: Players, Updates & Help";
const description = "Check AION 2 Steam players and peak CCU. Read launch updates, login and crash checks, character recovery, server-transfer rules and EU compensation guidance.";
const canonical = `https://zowgame.com${AION_2_STATS_PATH}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonical,
    inLanguage: "en",
    dateModified: AION_2_HELP_CHECKED,
    about: { "@type": "VideoGame", name: "AION 2", url: "https://store.steampowered.com/app/3393110/" },
    publisher: { "@type": "Organization", name: "ZowGame", url: "https://zowgame.com/" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...AION_2_FAQ, ...AION_2_HELP_GUIDES.map((guide) => ({ q: guide.title, a: `${guide.answer} ${guide.steps.join(" ")} ${guide.boundary}` }))].map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zowgame.com/" },
      { "@type": "ListItem", position: 2, name: "AION 2 Steam launch stats", item: canonical },
    ],
  },
];

export default function Page() {
  return <>
    <script id="schema-aion-2-stats" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <Aion2StatsPage />
  </>;
}

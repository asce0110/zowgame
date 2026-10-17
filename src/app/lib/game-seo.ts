import type { GameRecord } from "../data/games";
import { breadcrumbSchema, canonicalUrl, SITE_URL } from "./seo";

/** Editorial star labels have no verified review source, so no aggregate rating is emitted. */
export function gameStructuredData(game: GameRecord) {
  const pageUrl = canonicalUrl(game.canonicalPath);
  const image = new URL(game.cardImage || game.content.coverImg || game.ogImage, SITE_URL).href;
  const primary = game.accessMode === "tabletop" ? {
    "@context": "https://schema.org", "@type": "Article", headline: game.content.seoTitle,
    description: game.content.seoDescription, url: pageUrl, image,
    author: { "@type": "Organization", name: "ZowGame", url: `${SITE_URL}/` },
    ...(game.lastUpdated ? { dateModified: game.lastUpdated } : {}),
    about: { "@type": "Game", name: game.shortTitle, creator: { "@type": "Organization", name: game.schema.developer } },
  } : {
    "@context": "https://schema.org", "@type": "VideoGame", name: game.content.title,
    description: game.content.seoDescription, genre: game.schema.genre, url: pageUrl, image,
    applicationCategory: "Game", operatingSystem: game.schema.operatingSystems,
    gamePlatform: game.schema.platforms, playMode: game.schema.playMode,
    creator: game.schema.developer.split(",").map((name) => ({ "@type": "Thing", name: name.trim() })),
  };
  return [
    primary,
    ...(game.accessMode !== "tabletop" && (game.accessMode === "download" || game.externalSourceUrl) ? [{
      "@context": "https://schema.org", "@type": "WebPage", name: game.content.seoTitle,
      url: pageUrl, description: game.content.seoDescription, about: { "@type": "VideoGame", name: game.content.title },
    }] : []),
    ...(game.content.faqs.length ? [{
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: game.content.faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
    }] : []),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: game.shortTitle, path: game.canonicalPath }]),
  ];
}

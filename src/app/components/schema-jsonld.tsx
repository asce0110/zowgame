import { GameRecord } from "../data/games";

export function SchemaJsonLd({ game }: { game: GameRecord }) {
  if (game.accessMode === "tabletop") {
    const pageUrl = `https://zowgame.com${game.canonicalPath}`;
    const schema = [
      { "@context": "https://schema.org", "@type": "Article", headline: game.content.seoTitle, description: game.content.seoDescription, url: pageUrl, ...(game.lastUpdated ? { dateModified: game.lastUpdated } : {}), image: new URL(game.cardImage || game.ogImage, "https://zowgame.com").href, author: { "@type": "Organization", name: "ZowGame", url: "https://zowgame.com/" }, about: { "@type": "Game", name: game.shortTitle, creator: { "@type": "Organization", name: game.schema.developer } } },
      { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: game.content.faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://zowgame.com/" }, { "@type": "ListItem", position: 2, name: game.shortTitle, item: pageUrl }] },
    ];
    return <script id={`schema-${game.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
  }
  const ratingValue = parseFloat(game.content.rating) || 0;
  const pageUrl = `https://zowgame.com${game.canonicalPath}`;
  const isDownloadGuide = game.accessMode === "download";

  const videoGame = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.content.title,
    description: game.content.seoDescription,
    genre: game.schema.genre,
    url: pageUrl,
    image: new URL(game.content.coverImg || game.ogImage, "https://zowgame.com").href,
    applicationCategory: "Game",
    operatingSystem: game.schema.operatingSystems,
    gamePlatform: game.schema.platforms,
    playMode: game.schema.playMode,
    author: game.schema.developer.includes(",")
      ? game.schema.developer.split(",").map((name) => ({
          "@type": "Organization",
          name: name.trim(),
        }))
      : {
          "@type": "Person",
          name: game.schema.developer,
        },
    offers: {
      "@type": "Offer",
      price: game.schema.price,
      priceCurrency: game.schema.priceCurrency,
      availability: "https://schema.org/InStock",
      url: isDownloadGuide && game.externalSourceUrl ? game.externalSourceUrl : pageUrl,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      bestRating: 5,
      worstRating: 1,
      ratingCount: game.schema.ratingCount,
    },
  };

  const webPage = isDownloadGuide
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: game.content.seoTitle,
        url: pageUrl,
        description: game.content.seoDescription,
        about: game.content.title,
      }
    : null;

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: game.content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://zowgame.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: game.shortTitle,
        item: pageUrl,
      },
    ],
  };

  return (
    <script
      id={`schema-${game.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([videoGame, ...(webPage ? [webPage] : []), faqPage, breadcrumb]) }}
    />
  );
}

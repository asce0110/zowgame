import { HomePage } from "../src/app/HomePage";
import { filterAtlasGames, parseAtlasFilters, type AtlasSearchParams } from "../src/app/data/atlas";
import { createPageMetadata, itemListSchema, safeJsonLd, SITE_URL } from "../src/app/lib/seo";

import { featuredGameSlug, featuredHomeGames, homeGuideFilter } from "../src/app/data/level-select";
import { getPageTd } from "../src/app/data/page-seo";

type Props = { searchParams: Promise<AtlasSearchParams> };
const homeTd = getPageTd("/")!;
const description = homeTd.description;

export async function generateMetadata({ searchParams }: Props) {
  const params = (await searchParams) || {};
  return createPageMetadata({
    title: homeTd.title,
    description,
    path: "/",
    noindex: Object.keys(params).length > 0,
  });
}

export default async function Page({ searchParams }: Props) {
  const params = (await searchParams) || {};
  const filters = parseAtlasFilters(params);
  const games = featuredHomeGames(filterAtlasGames({ query: "", genre: filters.genre }));
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": SITE_URL + "/#organization",
      name: "ZowGame",
      url: SITE_URL + "/",
      description: "Independent player guides with links to official game creators and clearly identified sources.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": SITE_URL + "/#website",
      name: "ZowGame",
      url: SITE_URL + "/",
      description,
      publisher: { "@id": SITE_URL + "/#organization" },
    },
    itemListSchema({
      name: "Featured games and guides on ZowGame",
      path: "/",
      items: games.map((game) => ({ name: game.title, path: game.href, image: game.image, description: game.description })),
    }),
  ];
  return <><script id="schema-home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schemas) }} /><HomePage genre={filters.genre} game={featuredGameSlug(params.game, games)} type={homeGuideFilter(params.type)} /></>;
}

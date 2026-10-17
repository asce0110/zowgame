import Link from "next/link";
import { notFound } from "next/navigation";
import { AtlasShell } from "../../src/app/components/atlas-shell";
import { GuideList } from "../../src/app/components/atlas-cards";
import { ATLAS_GENRES, ATLAS_GUIDE_TYPES, atlasCanonicalPath, atlasDirectoryHref, atlasPaginationPages, filterAtlasGuides, paginateAtlas, parseAtlasFilters, type AtlasSearchParams } from "../../src/app/data/atlas";
import { breadcrumbSchema, createPageMetadata, itemListSchema, safeJsonLd } from "../../src/app/lib/seo";
import { getDirectoryTd } from "../../src/app/data/page-seo";

type Props = { searchParams: Promise<AtlasSearchParams> };
export async function generateMetadata({ searchParams }: Props) {
  const filters = parseAtlasFilters(await searchParams, "guides");
  const result = paginateAtlas(filterAtlasGuides(filters), filters.page);
  if (result.page > result.totalPages) notFound();
  return createPageMetadata({ ...getDirectoryTd("guides", filters), path: atlasCanonicalPath("/guides/", filters), noindex: filters.noindex });
}
export default async function GuidesPage({ searchParams }: Props) {
  const filters = parseAtlasFilters(await searchParams, "guides");
  const result = paginateAtlas(filterAtlasGuides(filters), filters.page);
  if (result.page > result.totalPages) notFound();
  const pages = atlasPaginationPages(result.page, result.totalPages);
  const schema = [breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Player guides", path: "/guides/" }]), itemListSchema({ name: "ZowGame player guides", path: atlasDirectoryHref("/guides/", filters, result.page), items: result.items.map((guide) => ({ name: guide.title, path: guide.href, image: guide.image, description: guide.description })) })];
  return <AtlasShell active="guides" genre={filters.genre} query={filters.query} searchAction="/guides/">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />
    <header className="atlas-section-heading"><div><p className="atlas-eyebrow">THE GAME ATLAS / PLAYER GUIDES</p><h1>Guides for your next move.</h1></div><p>Start a game, learn its rules or work through a stuck point. Every entry opens an existing guide or chapter.</p></header>
    <form className="atlas-filter-form" action="/guides/" method="get" role="search" aria-label="Filter player guides">
      <label htmlFor="atlas-guide-query"><span>Search guides</span><input id="atlas-guide-query" type="search" name="q" defaultValue={filters.query} maxLength={180} placeholder="Game, mechanic or question" /></label>
      <label htmlFor="atlas-guide-genre"><span>Genre</span><select id="atlas-guide-genre" name="genre" defaultValue={filters.genre}>{ATLAS_GENRES.map((genre) => <option key={genre.id} value={genre.id}>{genre.label}</option>)}</select></label>
      <label htmlFor="atlas-guide-type"><span>Guide type</span><select id="atlas-guide-type" name="type" defaultValue={filters.type}>{ATLAS_GUIDE_TYPES.map((type) => <option key={type.id} value={type.id}>{type.label}</option>)}</select></label>
      <button className="atlas-button" type="submit">Find guides</button><Link className="atlas-text-link" href="/guides/">Clear filters</Link>
    </form>
    <section className="atlas-results" aria-labelledby="atlas-guide-results"><div className="atlas-results-summary"><h2 id="atlas-guide-results">{result.total} {result.total === 1 ? "guide" : "guides"}{filters.query ? ` matching “${filters.query}”` : " to explore"}</h2><p>{result.total > 0 ? `Showing ${(result.page - 1) * result.pageSize + 1}–${Math.min(result.page * result.pageSize, result.total)}. Choose the chapter that answers your question.` : "No matching chapter found."}</p></div>
      {result.items.length ? <GuideList guides={result.items} /> : <div className="atlas-empty"><h3>No guides match these filters.</h3><p>Try a game name, “rules”, “voice chat” or “keys”. Clearing filters restores every published guide.</p><Link className="atlas-button" href="/guides/">Show all guides</Link></div>}
    </section>
    {result.totalPages > 1 && <nav className="atlas-pagination" aria-label="Player guide pages"><p>Page {result.page} of {result.totalPages}</p>{result.page > 1 && <a href={atlasDirectoryHref("/guides/", filters, result.page - 1)} rel="prev">Previous</a>}{pages.map((page, index) => <span key={page}>{index > 0 && page > pages[index - 1] + 1 && <span aria-hidden="true">…</span>}<a href={atlasDirectoryHref("/guides/", filters, page)} aria-current={page === result.page ? "page" : undefined} aria-label={`Page ${page}`}>{page}</a></span>)}{result.page < result.totalPages && <a href={atlasDirectoryHref("/guides/", filters, result.page + 1)} rel="next">Next</a>}</nav>}
  </AtlasShell>;
}

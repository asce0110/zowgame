import Link from "next/link";
import { notFound } from "next/navigation";
import { AtlasShell } from "../../src/app/components/atlas-shell";
import { GameCard } from "../../src/app/components/atlas-cards";
import { ATLAS_FORMATS, ATLAS_GENRES, atlasCanonicalPath, atlasDirectoryHref, atlasPaginationPages, filterAtlasGames, paginateAtlas, parseAtlasFilters, type AtlasSearchParams } from "../../src/app/data/atlas";
import { breadcrumbSchema, createPageMetadata, itemListSchema, safeJsonLd } from "../../src/app/lib/seo";
import { getDirectoryTd } from "../../src/app/data/page-seo";

type Props = { searchParams: Promise<AtlasSearchParams> };
export async function generateMetadata({ searchParams }: Props) {
  const filters = parseAtlasFilters(await searchParams);
  const result = paginateAtlas(filterAtlasGames(filters), filters.page);
  if (result.page > result.totalPages) notFound();
  return createPageMetadata({ ...getDirectoryTd("games", filters), path: atlasCanonicalPath("/games/", filters), noindex: filters.noindex });
}
export default async function GamesPage({ searchParams }: Props) {
  const filters = parseAtlasFilters(await searchParams);
  const result = paginateAtlas(filterAtlasGames(filters), filters.page);
  if (result.page > result.totalPages) notFound();
  const pages = atlasPaginationPages(result.page, result.totalPages);
  const schema = [breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Game library", path: "/games/" }]), itemListSchema({ name: "ZowGame game library", path: atlasDirectoryHref("/games/", filters, result.page), items: result.items.map((game) => ({ name: game.title, path: game.href, image: game.image, description: game.description })) })];
  return <AtlasShell active="games" genre={filters.genre} query={filters.query} searchAction="/games/">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />
    <header className="atlas-section-heading"><div><p className="atlas-eyebrow">THE GAME ATLAS / LIBRARY</p><h1>Find your next game.</h1></div><p>Browse by genre, choose a format, then follow the game and its guides.</p></header>
    <form className="atlas-filter-form" action="/games/" method="get" role="search" aria-label="Filter the game library">
      <label htmlFor="atlas-game-query"><span>Search games</span><input id="atlas-game-query" type="search" name="q" defaultValue={filters.query} maxLength={180} placeholder="Game, creator or keyword" /></label>
      <label htmlFor="atlas-game-genre"><span>Genre</span><select id="atlas-game-genre" name="genre" defaultValue={filters.genre}>{ATLAS_GENRES.map((genre) => <option key={genre.id} value={genre.id}>{genre.label}</option>)}</select></label>
      <label htmlFor="atlas-game-format"><span>Format</span><select id="atlas-game-format" name="format" defaultValue={filters.format}>{ATLAS_FORMATS.map((format) => <option key={format.id} value={format.id}>{format.label}</option>)}</select></label>
      <button className="atlas-button" type="submit">Find games</button><Link className="atlas-text-link" href="/games/">Clear filters</Link>
    </form>
    <section className="atlas-results" aria-labelledby="atlas-game-results"><div className="atlas-results-summary"><h2 id="atlas-game-results">{result.total} {result.total === 1 ? "game" : "games"}{filters.query ? ` matching “${filters.query}”` : " in the library"}</h2><p>Choose a cover to open the game overview.</p></div>
      {result.items.length ? <div className="atlas-game-grid">{result.items.map((game, index) => <GameCard key={game.slug} game={game} priority={index < 3} />)}</div> : <div className="atlas-empty"><h3>No games match these filters.</h3><p>Try “Harry Potter”, “horror” or “trivia”, or clear the filters to see the full library.</p><Link className="atlas-button" href="/games/">Show all games</Link></div>}
    </section>
    {result.totalPages > 1 && <nav className="atlas-pagination" aria-label="Game library pages"><p>Page {result.page} of {result.totalPages}</p>{result.page > 1 && <a href={atlasDirectoryHref("/games/", filters, result.page - 1)} rel="prev">Previous</a>}{pages.map((page, index) => <span key={page}>{index > 0 && page > pages[index - 1] + 1 && <span aria-hidden="true">…</span>}<a href={atlasDirectoryHref("/games/", filters, page)} aria-current={page === result.page ? "page" : undefined} aria-label={`Page ${page}`}>{page}</a></span>)}{result.page < result.totalPages && <a href={atlasDirectoryHref("/games/", filters, result.page + 1)} rel="next">Next</a>}</nav>}
  </AtlasShell>;
}

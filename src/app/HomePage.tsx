import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AtlasShell } from "./components/atlas-shell";
import { LevelSelect, HomeGuideFinder } from "./components/level-select";
import { ATLAS_GAMES, ATLAS_GENRES, ATLAS_GUIDES, filterAtlasGames, type AtlasGenreId } from "./data/atlas";
import { featuredGameSlug, featuredHomeGames, homeStateHref, type HomeGuideFilter } from "./data/level-select";

export function HomePage({ genre = "all", game, type = "featured" }: { genre?: AtlasGenreId; game?: string; type?: HomeGuideFilter }) {
  const catalog = filterAtlasGames({ query: "", genre });
  const games = featuredHomeGames(catalog);
  const gameSlugs = new Set(catalog.map((entry) => entry.slug));
  const guides = ATLAS_GUIDES.filter((entry) => gameSlugs.has(entry.gameSlug));
  const initialGame = featuredGameSlug(game, games);
  return <AtlasShell active="home" genre={genre} genrePath="/" query="" searchAction="/guides/" showRoute={false}>
    {games.length > 0 && <LevelSelect key={`${genre}-${initialGame}-${type}`} games={games} initialGame={initialGame} genre={genre} guideType={type} />}
    <div className="ls-home-content">
      <div className="ls-library-controls"><nav className="ls-genres" aria-label="Game genres">{ATLAS_GENRES.map((entry) => <Link key={entry.id} href={homeStateHref({ genre: entry.id })} aria-current={genre === entry.id ? "true" : undefined}>{entry.label}</Link>)}</nav><p>{catalog.length} {catalog.length === 1 ? "game" : "games"}<span aria-hidden="true"> · </span>{genre === "all" ? `${ATLAS_GUIDES.length} guides & topics` : `${guides.length} guides`}</p></div>
      {genre !== "all" && <p className="ls-category-note">Showing {ATLAS_GENRES.find((entry) => entry.id === genre)?.label.toLowerCase()}. <Link href="/">Explore all {ATLAS_GAMES.length} games</Link>.</p>}
      <HomeGuideFinder key={`${genre}-${type}`} guides={guides} genre={genre} initialType={type} initialGame={initialGame} />
      <aside id="updates" className="ls-data-strip" aria-label="Updates and data"><Link href="/updates/" className="ls-kicker">Updates & data</Link><Link href="/games/aion-2/steam-launch-stats/">AION 2 Steam launch stats<ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" /></Link><p>Independent game guides<span aria-hidden="true"> / </span>Play smarter. Go further.</p></aside>
    </div>
  </AtlasShell>;
}
export default HomePage;

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AtlasGame, AtlasGuide } from "../data/atlas";
import { GameCover } from "./game-cover";
export function GameCard({ game, priority = false }: { game: AtlasGame; priority?: boolean }) {
  return <article className="atlas-game-card"><Link className="atlas-game-image" href={game.href} aria-label={`Explore ${game.title} and its guides`}><GameCover src={game.image} title={game.title} priority={priority} retry={false} /></Link><h3><Link href={game.href}>{game.title}</Link></h3><p className="atlas-game-genre">{game.format === "tabletop" ? "Physical board game" : game.genreId === "puzzle-trivia" ? game.slug === "krillion" ? "Daily trivia" : "Spatial puzzle" : game.genreId === "shooters" ? "Multiplayer FPS" : "Survival horror"}</p><nav className="atlas-game-links" aria-label={`${game.title} quick guides`}>{game.links.slice(0, 2).map((link) => <Link key={link.href} href={link.href}>{link.label}<ArrowRight aria-hidden="true" size={15} /></Link>)}</nav></article>;
}
export function GuideList({ guides }: { guides: readonly AtlasGuide[] }) {
  return <ul className="atlas-guide-list">{guides.map((guide) => <li key={guide.id}><Link className="atlas-guide-thumb" href={guide.href} aria-label={guide.title}><GameCover src={guide.image} title={guide.gameTitle} retry={false} /></Link><div className="atlas-guide-game"><span>{guide.gameTitle}</span><small>{guide.type.replaceAll("-", " ")}</small></div><div className="atlas-guide-title"><h3><Link href={guide.href}>{guide.title}</Link></h3><p>{guide.description}</p></div><Link className="atlas-read-guide" href={guide.href} aria-label={`Read ${guide.title}`}>Read guide<ArrowRight aria-hidden="true" size={16} /></Link></li>)}</ul>;
}

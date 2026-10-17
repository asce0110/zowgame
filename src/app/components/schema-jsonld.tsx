import type { GameRecord } from "../data/games";
import { gameStructuredData } from "../lib/game-seo";
import { safeJsonLd } from "../lib/seo";

export function SchemaJsonLd({ game }: { game: GameRecord }) {
  return <script id={`schema-${game.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(gameStructuredData(game)) }} />;
}

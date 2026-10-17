import { getPublishedGames } from "../data/games";
import { fishesGuidePages } from "../data/fishes-guide";
import { AION_2_STATS_PATH } from "../data/aion-2-stats";

export type IndexableRoute = { path: string; title: string; kind: "home" | "directory" | "game" | "guide" | "stats" | "legal"; gameSlug?: string };

const sectionTitles: Record<string, string> = {
  guide: "Beginner guide", faq: "FAQ", walkthrough: "Walkthrough", purchase: "Buying and download", weapons: "Weapons", maps: "Maps", modes: "Game modes", news: "News and updates", items: "Items and supplies", events: "Night events", characters: "Crew and support", endings: "Ending routes", "tips-tricks": "Tips and strategy", achievements: "Achievements", steam: "Get the game", changelog: "Patch notes",
};

/** Mirrors supported App Router pages, rather than multiplying every game by every section. */
export function getIndexableRoutes(): IndexableRoute[] {
  const routes: IndexableRoute[] = [
    { path: "/", title: "ZowGame", kind: "home" },
    { path: "/games/", title: "Game library", kind: "directory" },
    { path: "/guides/", title: "Player guides", kind: "directory" },
    { path: "/updates/", title: "Game updates", kind: "directory" },
    { path: "/privacy/", title: "Privacy policy", kind: "legal" },
    { path: AION_2_STATS_PATH, title: "AION 2 Steam launch stats", kind: "stats", gameSlug: "aion-2" },
  ];
  for (const game of getPublishedGames()) {
    routes.push({ path: game.canonicalPath, title: game.shortTitle, kind: "game", gameSlug: game.slug });
    let sections = game.accessMode === "tabletop" ? [] : ["guide", "faq"];
    if (game.slug === "dont-sleep-with-the-fishes") sections = Object.keys(fishesGuidePages);
    if (game.slug === "all-the-gold-in-fort-locks") sections.push("walkthrough");
    if (game.slug === "hood-warfare-2") sections.push("purchase", "weapons", "maps", "modes", "news");
    for (const section of sections) routes.push({ path: `${game.canonicalPath}${section}/`, title: `${game.shortTitle}: ${sectionTitles[section] || section}`, kind: "guide", gameSlug: game.slug });
  }
  return routes;
}

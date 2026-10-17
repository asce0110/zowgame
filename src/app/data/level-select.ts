import type { AtlasGame, AtlasGenreId, AtlasGuide } from "./atlas";

export type FeaturedScene = { slug: string; lines: string[]; shortLines: string[]; genre: string; scene: string; thumbnail: string; position?: string; links: { label: string; href: string }[] };
// Six curated slots. Adding games to the full catalog does not expand this roster.
export const FEATURED_SCENES: readonly FeaturedScene[] = [
  { slug: "hood-warfare-2", lines: ["Hood", "Warfare 2"], shortLines: ["Hood", "Warfare 2"], genre: "Multiplayer FPS", scene: "/level-select/hood-scene.webp", thumbnail: "/level-select/hood-thumb.webp", position: "48% 50%", links: [
    { label: "First-match checklist", href: "/games/hood-warfare-2/guide/" }, { label: "Weapons & attachments", href: "/games/hood-warfare-2/weapons/" }, { label: "Game modes", href: "/games/hood-warfare-2/modes/" },
  ] },
  { slug: "dont-sleep-with-the-fishes", lines: ["Don't sleep", "with the", "fishes"], shortLines: ["Don't sleep", "with the fishes"], genre: "Survival horror", scene: "/level-select/fishes-scene.webp", thumbnail: "/level-select/fishes-thumb.webp", position: "0% 50%", links: [
    { label: "First-night survival", href: "/games/dont-sleep-with-the-fishes/guide/" }, { label: "Items & supplies", href: "/games/dont-sleep-with-the-fishes/items/" }, { label: "Ending routes", href: "/games/dont-sleep-with-the-fishes/endings/" },
  ] },
  { slug: "krillion", lines: ["Krillion"], shortLines: ["Krillion"], genre: "Daily trivia", scene: "/krillion-official.jpg", thumbnail: "/krillion-official.jpg", links: [
    { label: "How to play & score", href: "/games/krillion/guide/" }, { label: "Today's official prompts", href: "/games/krillion/#daily" }, { label: "Daily-game questions", href: "/games/krillion/faq/" },
  ] },
  { slug: "defenders-of-hogwarts", lines: ["Defenders of", "Hogwarts"], shortLines: ["Defenders of", "Hogwarts"], genre: "Physical board game", scene: "/defenders-official.webp", thumbnail: "/defenders-official.webp", position: "50% 48%", links: [
    { label: "Set up your first game", href: "/games/defenders-of-hogwarts/#setup" }, { label: "Turns & victory conditions", href: "/games/defenders-of-hogwarts/#rules" }, { label: "Rulebook questions", href: "/games/defenders-of-hogwarts/#faq" },
  ] },
  { slug: "cobb-can-move", lines: ["Cobb", "can move"], shortLines: ["Cobb", "can move"], genre: "Survival horror", scene: "/atlas/cobb-card.webp", thumbnail: "/atlas/cobb-card.webp", links: [
    { label: "Learn the changing rules", href: "/games/cobb-can-move/guide/" }, { label: "Controls & common questions", href: "/games/cobb-can-move/faq/" }, { label: "Official play & game details", href: "/games/cobb-can-move/" },
  ] },
  { slug: "all-the-gold-in-fort-locks", lines: ["All the gold", "in Fort Locks"], shortLines: ["All the gold", "in Fort Locks"], genre: "Spatial puzzle", scene: "/atlas/fort-card.webp", thumbnail: "/atlas/fort-card.webp", links: [
    { label: "Keys, doors & overlapping rooms", href: "/games/all-the-gold-in-fort-locks/guide/" }, { label: "Key-by-key walkthrough", href: "/games/all-the-gold-in-fort-locks/walkthrough/" }, { label: "Controls & puzzle questions", href: "/games/all-the-gold-in-fort-locks/faq/" },
  ] },
];
export const HOME_GUIDE_FILTERS = [{ id: "featured", label: "Featured" }, { id: "getting-started", label: "Getting started" }, { id: "rules", label: "Rules" }, { id: "strategy", label: "Strategy" }, { id: "troubleshooting", label: "Fix a problem" }] as const;
export function featuredHomeGames(games: readonly AtlasGame[]): AtlasGame[] {
  return FEATURED_SCENES.flatMap((scene) => { const game = games.find((entry) => entry.slug === scene.slug); return game ? [game] : []; });
}
export type HomeGuideFilter = (typeof HOME_GUIDE_FILTERS)[number]["id"];
export function homeGuideFilter(value: string | string[] | undefined): HomeGuideFilter {
  const raw = Array.isArray(value) ? value[0] : value;
  return HOME_GUIDE_FILTERS.some((entry) => entry.id === raw) ? raw as HomeGuideFilter : "featured";
}
export function featuredGameSlug(value: string | string[] | undefined, games: readonly AtlasGame[]): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return games.some((game) => game.slug === raw) ? raw! : games[0]?.slug || "hood-warfare-2";
}
export function homeStateHref({ game, genre = "all", type = "featured", anchor }: { game?: string; genre?: AtlasGenreId; type?: HomeGuideFilter; anchor?: string }): string {
  const params = new URLSearchParams();
  if (genre !== "all") params.set("genre", genre);
  if (game) params.set("game", game);
  if (type !== "featured") params.set("type", type);
  return "/" + (params.size ? "?" + params.toString() : "") + (anchor ? "#" + anchor : "");
}
const preferred = ["hood-warfare-2-guide", "dont-sleep-with-the-fishes-guide", "krillion-guide", "defenders-of-hogwarts-setup"];
export function homeGuides(guides: readonly AtlasGuide[], type: HomeGuideFilter): AtlasGuide[] {
  if (type !== "featured") return guides.filter((guide) => guide.type === type).slice(0, 4);
  const order = new Map(preferred.map((id, index) => [id, index]));
  return [...guides].sort((a, b) => (order.get(a.id) ?? 99) - (order.get(b.id) ?? 99)).slice(0, 4);
}
export function homeGuideCopy(guide: AtlasGuide): { title: string; description: string } {
  const copies: Record<string, { title: string; description: string }> = {
    "hood-warfare-2-guide": { title: "Your first match: checklist", description: "Controls, practice and objectives before your first match." },
    "dont-sleep-with-the-fishes-guide": { title: "Your first night: survival guide", description: "Evacuate, budget energy and choose an ending route." },
    "krillion-guide": { title: "How to play and choose a rare answer", description: "Understand the timer and curated scoring tiers." },
    "defenders-of-hogwarts-setup": { title: "Setup and rules", description: "Prepare the board, follow turns and check victory conditions." },
  };
  return copies[guide.id] || guide;
}

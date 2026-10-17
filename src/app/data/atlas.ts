import { getPublishedGames, type GameRecord } from "./games";
import { fishesGuidePages, fishesSources, FISHES_CHECKED } from "./fishes-guide";
import { hoodSources, HOOD_CHECKED } from "./hood-warfare-2";
import { AION_2_SOURCES, AION_2_STATS_PATH } from "./aion-2-stats";

export const ATLAS_GENRES = [
  { id: "all", label: "All games" },
  { id: "shooters", label: "Shooters" },
  { id: "survival-horror", label: "Survival & horror" },
  { id: "puzzle-trivia", label: "Puzzles & trivia" },
  { id: "tabletop", label: "Tabletop" },
] as const;
export type AtlasGenreId = (typeof ATLAS_GENRES)[number]["id"];
export type AtlasFormat = "browser" | "download" | "tabletop";
export const ATLAS_FORMATS = [
  { id: "all", label: "All formats" },
  { id: "browser", label: "Browser games" },
  { id: "download", label: "Download games" },
  { id: "tabletop", label: "Physical tabletop" },
] as const;
export const ATLAS_GUIDE_TYPES = [
  { id: "all", label: "All guide types" },
  { id: "getting-started", label: "Getting started" },
  { id: "rules", label: "Rules" },
  { id: "strategy", label: "Strategy" },
  { id: "troubleshooting", label: "Questions & troubleshooting" },
  { id: "walkthrough", label: "Walkthroughs" },
  { id: "updates", label: "Patch notes & updates" },
] as const;
export type AtlasGuideType = Exclude<(typeof ATLAS_GUIDE_TYPES)[number]["id"], "all">;
export type AtlasGame = {
  slug: string;
  title: string;
  href: string;
  image: string;
  genreId: Exclude<AtlasGenreId, "all">;
  genreLabel: string;
  format: AtlasFormat;
  description: string;
  aliases: string[];
  links: { label: string; href: string }[];
};
export type AtlasGuide = {
  id: string;
  title: string;
  gameSlug: string;
  gameTitle: string;
  href: string;
  image: string;
  type: AtlasGuideType;
  description: string;
  genreId?: Exclude<AtlasGenreId, "all">;
  searchTerms?: string[];
};

type GameEntry = Pick<AtlasGame, "slug" | "genreId" | "aliases" | "links"> & Partial<Pick<AtlasGame, "description" | "image">>;
// Add a game here after its overview and linked chapters have been published.
const gameEntries: GameEntry[] = [
  { slug: "hood-warfare-2", genreId: "shooters", image: "/hood-warfare-2-cover.jpg", aliases: ["Hood Warfare", "HW2", "Trapstar Games", "Chicago FPS", "guns", "attachments", "loadouts"], description: "Learn the six objectives, prepare your loadout and follow official Steam announcements.", links: [{ label: "Beginner guide", href: "/games/hood-warfare-2/guide/" }, { label: "Weapons", href: "/games/hood-warfare-2/weapons/" }] },
  { slug: "dont-sleep-with-the-fishes", genreId: "survival-horror", aliases: ["Don't Sleep With The Fishes", "Dont Sleep With The Fishes", "DSWTF", "Fishes", "DopplerGhost", "Taiki", "lifeboat", "Heart Parts", "Kraken"], image: "/fishes-steam-header.jpg", description: "Pack the lifeboat, manage each day's resources and prepare for an ending with the survival manual.", links: [{ label: "Survival guide", href: "/games/dont-sleep-with-the-fishes/guide/" }, { label: "Ending routes", href: "/games/dont-sleep-with-the-fishes/endings/" }] },
  { slug: "krillion", genreId: "puzzle-trivia", image: "/krillion-official.jpg", aliases: ["Krillion game", "daily trivia", "rare answers", "kp", "daily puzzle", "score calculator"], description: "Understand the seven-question daily run, scoring tiers and rare-answer decisions. Play on Krillion's official site.", links: [{ label: "How to play", href: "/games/krillion/guide/" }, { label: "Daily prompts", href: "/games/krillion/#daily" }] },
  { slug: "defenders-of-hogwarts", genreId: "tabletop", aliases: ["Harry Potter", "Harry Potter Defenders RPG game", "Defenders", "Hogwarts", "MinaLima", "board game", "Dark Arts"], image: "/defenders-official.webp", description: "Read the physical board game's setup, turns, victory conditions and rulebook-based answers.", links: [{ label: "Read the rules", href: "/games/defenders-of-hogwarts/#rules" }, { label: "Rule questions", href: "/games/defenders-of-hogwarts/#faq" }] },
  { slug: "cobb-can-move", genreId: "survival-horror", image: "/atlas/cobb-card.webp", aliases: ["Cobb", "Cobb Can Move online", "furnace", "coal", "pixel horror", "roguelite"], description: "Keep the furnace burning and learn how Cobb's changing rules affect your next move.", links: [{ label: "How to play", href: "/games/cobb-can-move/guide/" }, { label: "Common questions", href: "/games/cobb-can-move/faq/" }] },
  { slug: "all-the-gold-in-fort-locks", genreId: "puzzle-trivia", image: "/atlas/fort-card.webp", aliases: ["Fort Locks", "All the Gold", "Draknek", "keys", "doors", "portal puzzle"], description: "Navigate overlapping rooms and coloured keys, then use the walkthrough when a puzzle stops you.", links: [{ label: "Walkthrough", href: "/games/all-the-gold-in-fort-locks/walkthrough/" }, { label: "Getting started", href: "/games/all-the-gold-in-fort-locks/guide/" }] },
];

const publishedGames = new Map<string, GameRecord>(getPublishedGames().map((game) => [game.slug, game]));
export const ATLAS_GAMES: AtlasGame[] = gameEntries.map((entry) => {
  const game = publishedGames.get(entry.slug);
  if (!game) throw new Error(`Atlas entry requires a published game: ${entry.slug}`);
  return {
    slug: game.slug, title: game.shortTitle, href: game.canonicalPath,
    image: entry.image || game.cardImage || game.content.coverImg || game.ogImage,
    genreId: entry.genreId,
    genreLabel: ATLAS_GENRES.find((genre) => genre.id === entry.genreId)!.label,
    format: game.accessMode || "browser",
    description: entry.description || game.content.description,
    aliases: [...entry.aliases, ...game.keywords], links: entry.links,
  };
});

type Chapter = { path: string; title: string; type: AtlasGuideType; description: string };
const chapters: Record<string, Chapter[]> = {
  "hood-warfare-2": [
    { path: "guide/", title: "Your first Hood Warfare 2 match", type: "getting-started", description: "Bot practice, an eight-step checklist, controls and three progression tracks." },
    { path: "modes/", title: "Hood Warfare 2: all six mode objectives", type: "rules", description: "Compare turf, team kills, free-for-all, bag runs, bombs and chain pickups." },
    { path: "weapons/", title: "Hood Warfare 2 weapons and attachments", type: "strategy", description: "Separate weapon unlocks, attachment challenges and skins, with unverified values clearly marked." },
    { path: "maps/", title: "Hood Warfare 2 map and route practice", type: "strategy", description: "Learn the published settings and practise approaches, sightlines and retreat routes." },
    { path: "purchase/", title: "Buying and installing Hood Warfare 2", type: "getting-started", description: "Check the official Steam listing, China-region price, requirements and installation steps." },
    { path: "faq/", title: "Hood Warfare 2 questions and technical help", type: "troubleshooting", description: "Find answers about voice chat, saved loadouts, progression display, anti-cheat and purchases." },
    { path: "news/", title: "Hood Warfare 2 official news and patch summaries", type: "updates", description: "Open the developer feed and reviewed explanations of published announcements." },
  ],
  "dont-sleep-with-the-fishes": [
    { path: "guide/", title: "Your first night in Don't Sleep With The Fishes", type: "getting-started", description: fishesGuidePages.guide.description },
    { path: "walkthrough/", title: "Don't Sleep With The Fishes survival walkthrough", type: "walkthrough", description: fishesGuidePages.walkthrough.description },
    { path: "items/", title: "Fishes items and survival supplies", type: "strategy", description: fishesGuidePages.items.description },
    { path: "events/", title: "Fishes night events and encounter choices", type: "strategy", description: fishesGuidePages.events.description },
    { path: "characters/", title: "Fishes shipmates and support abilities", type: "strategy", description: fishesGuidePages.characters.description },
    { path: "endings/", title: "Don't Sleep With The Fishes ending routes", type: "walkthrough", description: fishesGuidePages.endings.description },
    { path: "tips-tricks/", title: "Fishes resource and rescue decisions", type: "strategy", description: fishesGuidePages["tips-tricks"].description },
    { path: "achievements/", title: "Fishes achievements and completion", type: "strategy", description: fishesGuidePages.achievements.description },
    { path: "steam/", title: "Buying and updating Don't Sleep With The Fishes", type: "getting-started", description: fishesGuidePages.steam.description },
    { path: "faq/", title: "Fishes versions, mechanics and support questions", type: "troubleshooting", description: fishesGuidePages.faq.description },
    { path: "changelog/", title: "Don't Sleep With The Fishes patch history", type: "updates", description: fishesGuidePages.changelog.description },
  ],
  krillion: [
    { path: "guide/", title: "How to play Krillion and choose a rare answer", type: "getting-started", description: "Learn the timer, curated scoring tiers and a seven-step answer routine." },
    { path: "faq/", title: "Krillion scoring, spelling and daily-game questions", type: "troubleshooting", description: "Check daily resets, missing answers, optional accounts and access to other modes." },
  ],
  "defenders-of-hogwarts": [
    { path: "#setup", title: "Set up Defenders of Hogwarts", type: "getting-started", description: "Prepare the board, choose sides and check player-count adjustments against the rulebook." },
    { path: "#rules", title: "Defenders of Hogwarts turns and victory conditions", type: "rules", description: "Start the rulebook-based guide to House turns, Dark Arts turns and both victory conditions." },
    { path: "#strategy", title: "Defenders of Hogwarts first-game strategy", type: "strategy", description: "Read editorial decisions derived from the rules, with source pages linked." },
    { path: "#faq", title: "Defenders of Hogwarts rules questions", type: "troubleshooting", description: "Find answers to rules, buying and support questions for the physical tabletop game." },
  ],
  "cobb-can-move": [
    { path: "guide/", title: "How to play Cobb Can Move", type: "getting-started", description: "Read each level's rule, collect coal and plan around Cobb's changing behaviour." },
    { path: "faq/", title: "Cobb Can Move controls and gameplay questions", type: "troubleshooting", description: "Find common answers about controls and keeping the light alive." },
  ],
  "all-the-gold-in-fort-locks": [
    { path: "guide/", title: "Getting started with All The Gold In Fort Locks", type: "getting-started", description: "Understand keys, doors and overlapping rooms before tackling the fort." },
    { path: "walkthrough/", title: "All The Gold In Fort Locks key-by-key walkthrough", type: "walkthrough", description: "Follow the Blue, Green, Orange, Red, Purple and Yellow key stages." },
    { path: "faq/", title: "Fort Locks controls and puzzle questions", type: "troubleshooting", description: "Find common questions about moving, undoing actions and solving room puzzles." },
  ],
};

export const ATLAS_GUIDES: AtlasGuide[] = [
  ...ATLAS_GAMES.flatMap((game) => (chapters[game.slug] || []).map((chapter) => ({
    id: `${game.slug}-${chapter.path.replace(/[#/]/g, "")}`,
    title: chapter.title, gameSlug: game.slug, gameTitle: game.title,
    href: `${game.href}${chapter.path}`, image: game.image, type: chapter.type, description: chapter.description,
    genreId: game.genreId,
  }))),
  {
    id: "aion-2-steam-launch-stats", title: "AION 2 Steam launch stats: players, updates and help",
    gameSlug: "aion-2", gameTitle: "AION 2", href: AION_2_STATS_PATH,
    // An editorial topic thumbnail, not an official AION 2 cover.
    image: "/atlas/social-card.jpg", type: "updates",
    description: "Read dated Steam player counts and launch peaks, official updates, and player help for login, characters and server transfers.",
    searchTerms: ["AION2", "AION 2", "Steam launch stats", "MMORPG", "concurrent players", "CCU", "peak", "PURPLE", "login", "server transfers"],
  },
];

export const ATLAS_INTENTS = [
  { id: "getting-started", label: "Get started", description: "Controls, setup and your first session.", href: "/guides/?type=getting-started" },
  { id: "rules", label: "Learn the rules", description: "Understand objectives, turns and scoring.", href: "/guides/?type=rules" },
  { id: "troubleshooting", label: "Get unstuck", description: "Answers about controls, play and technical issues.", href: "/guides/?type=troubleshooting" },
  { id: "updates", label: "Follow updates", description: "Read patch history and official announcements.", href: "/updates/" },
] as const;

export const ATLAS_UPDATE_CHANNELS = [
  { id: "hood-warfare-2", title: "Hood Warfare 2", href: "/games/hood-warfare-2/news/", sourceHref: hoodSources.news.url, sourceLabel: "Steam developer announcements", checkedAt: HOOD_CHECKED, description: "An automatically refreshed official feed beside separately reviewed patch explanations. Feed observation times do not revise the editorial review date." },
  { id: "dont-sleep-with-the-fishes", title: "Don't Sleep With The Fishes", href: "/games/dont-sleep-with-the-fishes/changelog/", sourceHref: fishesSources.official.url, sourceLabel: "Developer's itch.io page and devlogs", checkedAt: FISHES_CHECKED, description: "A reviewed version history through v1.1.4.4, with each entry linked to its developer source. This history is edited rather than a live feed." },
  { id: "aion-2", title: "AION 2 Steam launch stats", href: `${AION_2_STATS_PATH}#official-news`, sourceHref: AION_2_SOURCES.news, sourceLabel: "Steam official announcements", checkedAt: "2026-10-12", description: "Official headlines, reviewed update briefs and dated Steam player readings. Observation times and editorial fact-check dates are shown separately." },
] as const;

export type AtlasSearchParams = Record<string, string | string[] | undefined>;
export type AtlasFilters = {
  query: string;
  genre: AtlasGenreId;
  format: AtlasFormat | "all";
  type: AtlasGuideType | "all";
  page: number;
  noindex: boolean;
};
export const ATLAS_PAGE_SIZE = 12;
function first(value: string | string[] | undefined): string { return (Array.isArray(value) ? value[0] : value) || ""; }
function searchable(value: string): string {
  return value.normalize("NFKD").toLowerCase().replace(/[\u0300-\u036f]/g, "").replace(/['’]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
export function atlasQueryTokens(query: string): string[] { return [...new Set(searchable(query).split(/\s+/).filter(Boolean))]; }
function matchesQuery(query: string, text: string): boolean {
  const haystack = searchable(text);
  const tokens = atlasQueryTokens(query);
  return (!query.trim() || tokens.length > 0) && tokens.every((token) => haystack.includes(token));
}
export function parseAtlasFilters(params: AtlasSearchParams = {}, directory: "games" | "guides" = "games"): AtlasFilters {
  const query = Array.from(first(params.q).trim().replace(/\s+/g, " ")).slice(0, 180).join("");
  const rawGenre = first(params.genre);
  const rawFormat = first(params.format);
  const rawType = first(params.type);
  const rawPage = first(params.page);
  const genre = ATLAS_GENRES.some((item) => item.id === rawGenre) ? rawGenre as AtlasGenreId : "all";
  const format = directory === "games" && ATLAS_FORMATS.some((item) => item.id === rawFormat) ? rawFormat as AtlasFormat | "all" : "all";
  const type = directory === "guides" && ATLAS_GUIDE_TYPES.some((item) => item.id === rawType) ? rawType as AtlasGuideType | "all" : "all";
  const page = /^[1-9]\d{0,5}$/.test(rawPage) ? Number(rawPage) : 1;
  const validKeys = new Set(["q", "genre", "page", directory === "games" ? "format" : "type"]);
  const unexpected = Object.entries(params).some(([key, value]) => !validKeys.has(key) && !!first(value));
  const invalid = (!!rawGenre && rawGenre !== genre) || (directory === "games" && !!rawFormat && rawFormat !== format)
    || (directory === "guides" && !!rawType && rawType !== type) || (!!rawPage && !/^[1-9]\d{0,5}$/.test(rawPage))
    || Object.values(params).some((value) => Array.isArray(value) && value.length > 1);
  return { query, genre, format, type, page, noindex: !!query || genre !== "all" || format !== "all" || type !== "all" || unexpected || invalid };
}
export function filterAtlasGames(filters: Pick<AtlasFilters, "query" | "genre"> & Partial<Pick<AtlasFilters, "format">>): AtlasGame[] {
  return ATLAS_GAMES.filter((game) => (filters.genre === "all" || game.genreId === filters.genre)
    && (!filters.format || filters.format === "all" || game.format === filters.format)
    && matchesQuery(filters.query, [game.title, game.description, game.genreLabel, game.format, ...game.aliases, ...game.links.map((link) => link.label)].join(" ")));
}
export function filterAtlasGuides(filters: Pick<AtlasFilters, "query" | "genre" | "type">): AtlasGuide[] {
  return ATLAS_GUIDES.filter((guide) => {
    const game = ATLAS_GAMES.find((entry) => entry.slug === guide.gameSlug);
    const genreId = guide.genreId || game?.genreId;
    const genreLabel = ATLAS_GENRES.find((genre) => genre.id === genreId)?.label || "";
    return (filters.genre === "all" || genreId === filters.genre) && (filters.type === "all" || guide.type === filters.type)
      && matchesQuery(filters.query, [guide.title, guide.description, guide.gameTitle, guide.type, genreLabel, ...(game?.aliases || []), ...(guide.searchTerms || [])].join(" "));
  });
}
export function paginateAtlas<T>(items: readonly T[], page: number, pageSize = ATLAS_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  return { items: items.slice((page - 1) * pageSize, page * pageSize), page, pageSize, total: items.length, totalPages };
}
export function atlasDirectoryHref(path: "/games/" | "/guides/", filters: AtlasFilters, page = 1): string {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.genre !== "all") params.set("genre", filters.genre);
  if (path === "/games/" && filters.format !== "all") params.set("format", filters.format);
  if (path === "/guides/" && filters.type !== "all") params.set("type", filters.type);
  if (page > 1) params.set("page", String(page));
  return `${path}${params.size ? `?${params.toString()}` : ""}`;
}
export function atlasCanonicalPath(path: "/games/" | "/guides/", filters: AtlasFilters): string {
  return !filters.noindex && filters.page > 1 ? `${path}?page=${filters.page}` : path;
}
export function atlasPaginationPages(current: number, total: number): number[] {
  return [...new Set([1, current - 1, current, current + 1, total])].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
}

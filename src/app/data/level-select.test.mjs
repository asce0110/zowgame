import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const previousLoader = Module._extensions[".ts"];
Module._extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, filename);
let atlas, level, routes;
try {
  atlas = require("./atlas.ts");
  level = require("./level-select.ts");
  routes = require("../lib/seo-routes.ts");
} finally {
  if (previousLoader) Module._extensions[".ts"] = previousLoader;
  else delete Module._extensions[".ts"];
}
const root = path.resolve(import.meta.dirname, "../../..");
const canonicalPaths = new Set(routes.getIndexableRoutes().map((route) => route.path));

test("Level Select preserves the six featured games, 30 guide topics and 37 canonical pages", () => {
  assert.deepEqual(level.FEATURED_SCENES.map((scene) => scene.slug), atlas.ATLAS_GAMES.map((game) => game.slug));
  assert.equal(level.FEATURED_SCENES.length, 6);
  assert.equal(new Set(level.FEATURED_SCENES.map((scene) => scene.slug)).size, 6);
  assert.equal(atlas.ATLAS_GUIDES.length, 30);
  assert.equal(canonicalPaths.size, 37);
  assert.equal(level.FEATURED_SCENES.some((scene) => scene.slug === "aion-2"), false);
});

test("100 additional catalog games do not expand or reorder the curated home roster and genre subsets", () => {
  const additional = Array.from({ length: 100 }, (_, index) => ({
    ...atlas.ATLAS_GAMES[index % atlas.ATLAS_GAMES.length],
    slug: `future-catalog-game-${index}`,
    title: `Future catalog game ${index}`,
    href: `/games/future-catalog-game-${index}/`,
  }));
  const expanded = [...additional.slice(0, 50), ...[...atlas.ATLAS_GAMES].reverse(), ...additional.slice(50)];
  const original = [...expanded];
  const expectedByGenre = {
    all: ["hood-warfare-2", "dont-sleep-with-the-fishes", "krillion", "defenders-of-hogwarts", "cobb-can-move", "all-the-gold-in-fort-locks"],
    shooters: ["hood-warfare-2"],
    "survival-horror": ["dont-sleep-with-the-fishes", "cobb-can-move"],
    "puzzle-trivia": ["krillion", "all-the-gold-in-fort-locks"],
    tabletop: ["defenders-of-hogwarts"],
  };
  assert.equal(expanded.length, 106);
  for (const [genre, expected] of Object.entries(expectedByGenre)) {
    const matchingCatalog = expanded.filter((game) => genre === "all" || game.genreId === genre);
    const featured = level.featuredHomeGames(matchingCatalog);
    assert.deepEqual(featured.map((game) => game.slug), expected, genre);
    assert.ok(featured.every((game) => atlas.ATLAS_GAMES.includes(game)), genre);
  }
  assert.deepEqual(expanded, original, "selecting home slots must not mutate catalog ordering");
});

test("every featured scene has three distinct real destinations belonging to that game", () => {
  for (const scene of level.FEATURED_SCENES) {
    const game = atlas.ATLAS_GAMES.find((entry) => entry.slug === scene.slug);
    assert.equal(scene.links.length, 3, scene.slug);
    assert.equal(new Set(scene.links.map((link) => link.href)).size, 3, scene.slug);
    assert.ok(canonicalPaths.has(game.href), game.href);
    for (const link of scene.links) {
      const url = new URL(link.href, "https://zowgame.com");
      assert.equal(url.origin, "https://zowgame.com");
      assert.ok(canonicalPaths.has(url.pathname), link.href);
      assert.ok(url.pathname.startsWith(game.href), link.href);
      assert.ok(link.label.trim().length > 0);
      if (url.hash) {
        const source = scene.slug === "krillion"
          ? fs.readFileSync(path.join(root, "src/app/components/krillion-tools.tsx"), "utf8")
          : fs.readFileSync(path.join(root, "src/app/components/tabletop-game-page.tsx"), "utf8") + fs.readFileSync(path.join(root, "src/app/data/defenders-guide.ts"), "utf8");
        const id = url.hash.slice(1);
        assert.ok(source.includes(`id="${id}"`) || source.includes(`id: "${id}"`), link.href);
      }
    }
  }
});

test("selected slugs are constrained to the visible genre with deterministic fallbacks", () => {
  assert.equal(level.featuredGameSlug(undefined, atlas.ATLAS_GAMES), "hood-warfare-2");
  assert.equal(level.featuredGameSlug("dont-sleep-with-the-fishes", atlas.ATLAS_GAMES), "dont-sleep-with-the-fishes");
  assert.equal(level.featuredGameSlug(["krillion", "hood-warfare-2"], atlas.ATLAS_GAMES), "krillion");
  assert.equal(level.featuredGameSlug("not-a-published-game", atlas.ATLAS_GAMES), "hood-warfare-2");
  const tabletop = atlas.filterAtlasGames(atlas.parseAtlasFilters({ genre: "tabletop" }));
  assert.equal(level.featuredGameSlug("hood-warfare-2", tabletop), "defenders-of-hogwarts");
  const survival = atlas.filterAtlasGames(atlas.parseAtlasFilters({ genre: "survival-horror" }));
  assert.equal(level.featuredGameSlug("krillion", survival), "dont-sleep-with-the-fishes");
});

test("guide types accept only the five home topics, including safe array/default parsing", () => {
  assert.deepEqual(level.HOME_GUIDE_FILTERS.map((filter) => filter.id), ["featured", "getting-started", "rules", "strategy", "troubleshooting"]);
  assert.equal(level.homeGuideFilter("rules"), "rules");
  assert.equal(level.homeGuideFilter(["strategy", "rules"]), "strategy");
  for (const value of [undefined, "", "not-a-type", "__proto__", "walkthrough"]) assert.equal(level.homeGuideFilter(value), "featured");
});

test("selection links preserve explicit game, genre and topic through native GET navigation", () => {
  const href = level.homeStateHref({ game: "dont-sleep-with-the-fishes", genre: "survival-horror", type: "rules", anchor: "guides" });
  const url = new URL(href, "https://zowgame.com");
  assert.equal(url.pathname, "/");
  assert.equal(url.hash, "#guides");
  assert.deepEqual(Object.fromEntries(url.searchParams), { genre: "survival-horror", game: "dont-sleep-with-the-fishes", type: "rules" });
  assert.equal(level.homeStateHref({}), "/");
  const escaped = new URL(level.homeStateHref({ game: 'a&game=other"<script>' }), "https://zowgame.com");
  assert.equal(escaped.origin, "https://zowgame.com");
  assert.equal(escaped.searchParams.get("game"), 'a&game=other"<script>');
  assert.equal(escaped.searchParams.size, 1);
});

test("featured guide order matches the approved four starting points without mutating the directory", () => {
  const original = atlas.ATLAS_GUIDES.map((guide) => guide.id);
  assert.deepEqual(level.homeGuides(atlas.ATLAS_GUIDES, "featured").map((guide) => guide.id), ["hood-warfare-2-guide", "dont-sleep-with-the-fishes-guide", "krillion-guide", "defenders-of-hogwarts-setup"]);
  assert.deepEqual(atlas.ATLAS_GUIDES.map((guide) => guide.id), original);
});

test("topic and genre guide previews contain actual matching chapters, with an honest empty result", () => {
  for (const type of ["getting-started", "rules", "strategy", "troubleshooting"]) {
    const entries = level.homeGuides(atlas.ATLAS_GUIDES, type);
    assert.ok(entries.length > 0 && entries.length <= 4);
    assert.ok(entries.every((guide) => guide.type === type && atlas.ATLAS_GUIDES.includes(guide)));
  }
  const tabletop = atlas.filterAtlasGuides(atlas.parseAtlasFilters({ genre: "tabletop" }, "guides"));
  assert.ok(level.homeGuides(tabletop, "featured").every((guide) => guide.gameSlug === "defenders-of-hogwarts"));
  assert.deepEqual(level.homeGuides([], "rules"), []);
  assert.equal(atlas.filterAtlasGuides(atlas.parseAtlasFilters({ q: "AION2" }, "guides"))[0].href, "/games/aion-2/steam-launch-stats/");
});

test("home guide copy adds context without changing the underlying guide destination", () => {
  for (const guide of level.homeGuides(atlas.ATLAS_GUIDES, "featured")) {
    const href = guide.href;
    const copy = level.homeGuideCopy(guide);
    assert.ok(copy.title.trim() && copy.description.trim());
    assert.equal(guide.href, href);
  }
  const topic = atlas.ATLAS_GUIDES.find((guide) => guide.gameSlug === "aion-2");
  assert.equal(level.homeGuideCopy(topic).title, topic.title);
});

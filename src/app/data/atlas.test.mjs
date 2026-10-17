import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import Module, { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const previousLoader = Module._extensions[".ts"];
Module._extensions[".ts"] = (module, filename) => {
  const source = readFileSync(filename, "utf8");
  const result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  module._compile(result.outputText, filename);
};
const atlas = require("./atlas.ts");
const { getPublishedGames } = require("./games.ts");
const { getIndexableRoutes } = require("../lib/seo-routes.ts");
if (previousLoader) Module._extensions[".ts"] = previousLoader;
else delete Module._extensions[".ts"];
const sourceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

test("the atlas covers the published catalog in the selected six-cover order", () => {
  assert.deepEqual(atlas.ATLAS_GAMES.map((game) => game.slug), ["hood-warfare-2", "dont-sleep-with-the-fishes", "krillion", "defenders-of-hogwarts", "cobb-can-move", "all-the-gold-in-fort-locks"]);
  assert.deepEqual(new Set(atlas.ATLAS_GAMES.map((game) => game.slug)), new Set(getPublishedGames().map((game) => game.slug)));
  for (const game of atlas.ATLAS_GAMES) {
    assert.ok(game.title && game.description && game.image);
    assert.ok(atlas.ATLAS_GENRES.some((genre) => genre.id === game.genreId));
    if (game.image.startsWith("/")) assert.ok(existsSync(resolve(sourceRoot, "../public", game.image.slice(1))), game.image);
  }
});

test("aliases, punctuation and separated query terms work with AND semantics", () => {
  assert.deepEqual(atlas.filterAtlasGames(atlas.parseAtlasFilters({ q: "Harry Potter" })).map((game) => game.slug), ["defenders-of-hogwarts"]);
  assert.deepEqual(atlas.filterAtlasGames(atlas.parseAtlasFilters({ q: "DONT sleep fishes" })).map((game) => game.slug), ["dont-sleep-with-the-fishes"]);
  assert.deepEqual(atlas.filterAtlasGames(atlas.parseAtlasFilters({ q: "Hood attachments" })).map((game) => game.slug), ["hood-warfare-2"]);
  assert.equal(atlas.filterAtlasGames(atlas.parseAtlasFilters({ q: "Hood Harry Potter" })).length, 0);
  assert.equal(atlas.filterAtlasGames(atlas.parseAtlasFilters({ q: "!!!" })).length, 0);
  const matches = atlas.filterAtlasGuides(atlas.parseAtlasFilters({ q: "Hood voice" }, "guides"));
  assert.deepEqual(matches.map((guide) => guide.href), ["/games/hood-warfare-2/faq/"]);
});

test("genre, format and guide-type filters intersect rather than replace each other", () => {
  assert.deepEqual(atlas.filterAtlasGames(atlas.parseAtlasFilters({ genre: "survival-horror", format: "browser" })).map((game) => game.slug), ["cobb-can-move"]);
  assert.equal(atlas.filterAtlasGames(atlas.parseAtlasFilters({ genre: "shooters", format: "tabletop" })).length, 0);
  const guides = atlas.filterAtlasGuides(atlas.parseAtlasFilters({ genre: "puzzle-trivia", type: "walkthrough" }, "guides"));
  assert.deepEqual(guides.map((guide) => guide.href), ["/games/all-the-gold-in-fort-locks/walkthrough/"]);
});

test("standalone AION 2 topics remain searchable without adding a seventh game or a false genre", () => {
  assert.equal(atlas.ATLAS_GAMES.length, 6);
  assert.equal(atlas.ATLAS_GUIDES.length, 30);
  assert.equal(atlas.ATLAS_GAMES.some((game) => game.slug === "aion-2"), false);
  for (const query of ["AION2", "AION 2", "aion 2 steam launch stats", "AION2 CCU"]) {
    const matches = atlas.filterAtlasGuides(atlas.parseAtlasFilters({ q: query }, "guides"));
    assert.deepEqual(matches.map((guide) => guide.href), ["/games/aion-2/steam-launch-stats/"]);
    assert.equal(matches[0].image, "/atlas/social-card.jpg");
    assert.ok(existsSync(resolve(sourceRoot, "../public", matches[0].image.slice(1))));
  }
  assert.ok(atlas.filterAtlasGuides(atlas.parseAtlasFilters({ type: "updates" }, "guides")).some((guide) => guide.gameSlug === "aion-2"));
  for (const genre of atlas.ATLAS_GENRES.filter((entry) => entry.id !== "all")) {
    assert.equal(atlas.filterAtlasGuides(atlas.parseAtlasFilters({ genre: genre.id }, "guides")).some((guide) => guide.gameSlug === "aion-2"), false);
  }
  assert.equal(atlas.filterAtlasGuides(atlas.parseAtlasFilters({ q: "AION2", type: "rules" }, "guides")).length, 0);
});

test("canonical and indexing rules distinguish filters from real pagination", () => {
  const base = atlas.parseAtlasFilters({}, "guides");
  assert.equal(base.noindex, false);
  assert.equal(atlas.atlasCanonicalPath("/guides/", base), "/guides/");
  const second = atlas.parseAtlasFilters({ page: "2" }, "guides");
  assert.equal(second.noindex, false);
  assert.equal(atlas.atlasCanonicalPath("/guides/", second), "/guides/?page=2");
  for (const params of [{ q: "Harry Potter" }, { genre: "tabletop" }, { type: "rules" }, { sort: "random" }, { page: "nope" }, { genre: "unknown" }, { q: ["Hood", "Krillion"] }]) {
    const filters = atlas.parseAtlasFilters(params, "guides");
    assert.equal(filters.noindex, true, JSON.stringify(params));
    assert.equal(atlas.atlasCanonicalPath("/guides/", filters), "/guides/");
  }
});

test("GET pagination preserves valid filters and generates no phantom game page", () => {
  const filtered = atlas.parseAtlasFilters({ q: "Harry Potter", genre: "tabletop", type: "rules", page: "2" }, "guides");
  assert.equal(atlas.atlasDirectoryHref("/guides/", filtered, 2), "/guides/?q=Harry+Potter&genre=tabletop&type=rules&page=2");
  assert.equal(atlas.paginateAtlas(atlas.ATLAS_GAMES, 1).totalPages, 1);
  assert.equal(atlas.paginateAtlas(atlas.ATLAS_GAMES, 2).items.length, 0);
  const guidePages = atlas.paginateAtlas(atlas.ATLAS_GUIDES, 1);
  assert.equal(guidePages.items.length, 12);
  assert.deepEqual([1, 2, 3].map((page) => atlas.paginateAtlas(atlas.ATLAS_GUIDES, page).items.length), [12, 12, 6]);
  const allPages = Array.from({ length: guidePages.totalPages }, (_, index) => atlas.paginateAtlas(atlas.ATLAS_GUIDES, index + 1).items).flat();
  assert.deepEqual(allPages, atlas.ATLAS_GUIDES);
  assert.equal(atlas.paginateAtlas([], 1).totalPages, 1);
});

test("all directory destinations are registered routes or existing tabletop chapters", () => {
  const paths = new Set(getIndexableRoutes().map((route) => route.path));
  const links = [...atlas.ATLAS_GAMES.map((game) => ({ href: game.href })), ...atlas.ATLAS_GAMES.flatMap((game) => game.links), ...atlas.ATLAS_GUIDES, ...atlas.ATLAS_UPDATE_CHANNELS];
  const tabletop = readFileSync(resolve(sourceRoot, "app/components/tabletop-game-page.tsx"), "utf8");
  const ruleSections = readFileSync(resolve(sourceRoot, "app/data/defenders-guide.ts"), "utf8");
  for (const link of links) {
    const url = new URL(link.href, "https://zowgame.com");
    assert.ok(paths.has(url.pathname), link.href);
    if (url.pathname === "/games/defenders-of-hogwarts/" && url.hash) {
      const id = url.hash.slice(1);
      assert.ok(tabletop.includes(`id="${id}"`) || ruleSections.includes(`id: "${id}"`), link.href);
    }
  }
  assert.equal(new Set(atlas.ATLAS_GUIDES.map((guide) => guide.id)).size, atlas.ATLAS_GUIDES.length);
  assert.equal(new Set(atlas.ATLAS_GUIDES.map((guide) => guide.href)).size, atlas.ATLAS_GUIDES.length);
});

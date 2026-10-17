import assert from "node:assert/strict";
import fs from "node:fs";
import Module, { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const previousLoader = Module._extensions[".ts"];
Module._extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, filename);
let registry, seo, routes, atlas;
try {
  registry = require("../data/page-seo.ts");
  seo = require("./seo.ts");
  routes = require("./seo-routes.ts");
  atlas = require("../data/atlas.ts");
} finally {
  if (previousLoader) Module._extensions[".ts"] = previousLoader;
  else delete Module._extensions[".ts"];
}

const { PAGE_TD, getPageTd, getDirectoryTd } = registry;
const brandCount = (value) => [...value.matchAll(/\bZowGame\b/gi)].length;
const normalized = (value) => value.trim().replace(/\s+/g, " ").toLowerCase();

test("TD registry covers exactly 37 canonical pages and the two real unfiltered guide pagination views", () => {
  assert.ok(Array.isArray(PAGE_TD));
  assert.equal(PAGE_TD.length, 39);
  const expected = [...routes.getIndexableRoutes().map((route) => route.path), "/guides/?page=2", "/guides/?page=3"].sort();
  assert.equal(new Set(expected).size, 39);
  assert.deepEqual(PAGE_TD.map((entry) => entry.path).sort(), expected);
});

test("each published TD is distinct, readable and within the agreed editorial ranges", () => {
  assert.equal(new Set(PAGE_TD.map((entry) => normalized(entry.title))).size, PAGE_TD.length, "Duplicate title");
  assert.equal(new Set(PAGE_TD.map((entry) => normalized(entry.description))).size, PAGE_TD.length, "Duplicate description");
  for (const entry of PAGE_TD) {
    assert.ok(entry.title.length >= 45 && entry.title.length <= 65, `${entry.path}: title length ${entry.title.length}`);
    assert.ok(entry.description.length >= 140 && entry.description.length <= 160, `${entry.path}: description length ${entry.description.length}`);
    assert.ok(entry.title.endsWith(" | ZowGame"), entry.path);
    assert.equal(brandCount(entry.title), 1, entry.path);
    assert.equal(entry.title, entry.title.trim());
    assert.equal(entry.description, entry.description.trim());
    assert.equal(/[<>\r\n\t]/.test(entry.title + entry.description), false, entry.path);
    assert.ok(typeof entry.primaryKeyword === "string" && entry.primaryKeyword.trim(), entry.path);
    assert.ok(Array.isArray(entry.secondaryKeywords) && entry.secondaryKeywords.every((keyword) => typeof keyword === "string" && keyword.trim()), entry.path);
    assert.ok(Array.isArray(entry.contentEvidence) && entry.contentEvidence.length > 0 && entry.contentEvidence.every((evidence) => typeof evidence === "string" && evidence.trim()), entry.path);
  }
});

test("TD lookup normalizes a missing trailing slash without inventing filtered or unsupported pages", () => {
  for (const entry of PAGE_TD) {
    assert.equal(getPageTd(entry.path), entry, entry.path);
    const url = new URL(entry.path, seo.SITE_URL);
    const withoutSlash = url.pathname === "/" ? "/" : url.pathname.slice(0, -1);
    assert.equal(getPageTd(withoutSlash + url.search), entry, entry.path);
  }
  for (const candidate of ["/not-a-published-page/", "/guides/?page=1", "/guides/?page=02", "/guides/?page=999", "/guides/?page=2&page=3", "/guides/?page=2&q=keys", "/guides/?q=Harry%20Potter", "/guides/#results", "/games/?genre=tabletop", "/?game=krillion", "https://example.com/guides/"]) {
    assert.equal(Boolean(getPageTd(candidate)), false, candidate);
  }
});

test("registered indexable pages use registry TD consistently in page and sharing metadata fields", () => {
  for (const entry of PAGE_TD) {
    const metadata = seo.createPageMetadata({ path: entry.path, title: "Caller fallback title", description: "Caller fallback description.", image: "/fishes-steam-header.jpg" });
    assert.deepEqual(metadata.title, { absolute: entry.title }, entry.path);
    assert.equal(metadata.description, entry.description, entry.path);
    assert.equal(metadata.alternates.canonical, new URL(entry.path, seo.SITE_URL).href, entry.path);
    assert.equal(metadata.openGraph.title, entry.title, entry.path);
    assert.equal(metadata.openGraph.description, entry.description, entry.path);
    assert.equal(metadata.openGraph.url, metadata.alternates.canonical, entry.path);
    assert.equal(metadata.twitter.title, entry.title, entry.path);
    assert.equal(metadata.twitter.description, entry.description, entry.path);
    assert.deepEqual(metadata.robots, { index: true, follow: true }, entry.path);
    assert.deepEqual(metadata.openGraph.images, [seo.SITE_URL + "/fishes-steam-header.jpg"], entry.path);
    assert.equal("keywords" in metadata, false, entry.path);
    assert.equal("primaryKeyword" in metadata || "secondaryKeywords" in metadata || "contentEvidence" in metadata, false, entry.path);
  }
});

test("noindex facet metadata preserves caller context, follows links and emits no keyword tag", () => {
  const metadata = seo.createPageMetadata({ path: "/guides/", title: "Filtered player questions | ZowGame", description: "Guide results for this selection.", noindex: true });
  assert.deepEqual(metadata.title, { absolute: "Filtered player questions | ZowGame" });
  assert.equal(brandCount(metadata.title.absolute), 1);
  assert.equal(metadata.description, "Guide results for this selection.");
  assert.equal(metadata.openGraph.title, metadata.title.absolute);
  assert.equal(metadata.twitter.description, metadata.description);
  assert.deepEqual(metadata.robots, { index: false, follow: true });
  assert.equal(metadata.alternates.canonical, seo.SITE_URL + "/guides/");
  assert.equal("keywords" in metadata, false);
});

test("unknown paths retain safe fallback TD and append the brand once without changing canonical ownership", () => {
  for (const title of ["Unpublished preview", "Unpublished preview | ZowGame"]) {
    const metadata = seo.createPageMetadata({ path: "/qa-unpublished-preview", title, description: "Preview details supplied by the caller." });
    assert.deepEqual(metadata.title, { absolute: "Unpublished preview | ZowGame" });
    assert.equal(brandCount(metadata.title.absolute), 1);
    assert.equal(metadata.description, "Preview details supplied by the caller.");
    assert.equal(metadata.openGraph.title, metadata.title.absolute);
    assert.equal(metadata.twitter.description, metadata.description);
    assert.equal(metadata.alternates.canonical, seo.SITE_URL + "/qa-unpublished-preview/");
    assert.equal("keywords" in metadata, false);
  }
  assert.throws(() => seo.createPageMetadata({ path: "https://example.com/", title: "Wrong origin", description: "Wrong origin." }));
});

test("real guide pagination has differentiated titles and descriptions without creating filtered entries", () => {
  const pages = [getPageTd("/guides/"), getPageTd("/guides/?page=2"), getPageTd("/guides/?page=3")];
  assert.equal(new Set(pages.map((page) => page.title)).size, 3);
  assert.equal(new Set(pages.map((page) => page.description)).size, 3);
  assert.match(pages[1].title, /Page 2/);
  assert.match(pages[2].title, /Page 3/);
  assert.deepEqual(PAGE_TD.filter((entry) => entry.path.includes("?")).map((entry) => entry.path).sort(), ["/guides/?page=2", "/guides/?page=3"]);
});

const codePoints = (value) => Array.from(value).length;
const hasLoneSurrogate = (value) => Array.from(value).some((character) => /^[\uD800-\uDFFF]$/.test(character));

test("directory search TD caps long context after normalizing query whitespace", () => {
  for (const kind of ["games", "guides"]) {
    const filters = atlas.parseAtlasFilters({ q: `  Cobb\n\t${"survival rules ".repeat(1000)}  ` }, kind);
    assert.equal(codePoints(filters.query), 180);
    assert.equal(/[\r\n\t]/.test(filters.query), false);
    assert.ok(filters.query.startsWith("Cobb survival rules"));
    const td = getDirectoryTd(kind, filters);
    assert.ok(td.title.includes("Cobb survival rules"));
    assert.ok(td.title.includes("…"));
    assert.ok(codePoints(td.title) <= 65, `${kind}: title ${codePoints(td.title)}`);
    assert.ok(codePoints(td.description) <= 160, `${kind}: description ${codePoints(td.description)}`);
    assert.equal(/[\r\n\t]/.test(td.title + td.description), false);
  }
});

test("directory query clipping counts Unicode code points without splitting emoji surrogate pairs", () => {
  const queries = ["🎮".repeat(1000), "Cobb 🦈 rules ".repeat(1000), "👨‍👩‍👧‍👦".repeat(1000)];
  for (const kind of ["games", "guides"]) {
    for (const q of queries) {
      const filters = atlas.parseAtlasFilters({ q }, kind);
      assert.equal(codePoints(filters.query), 180);
      const td = getDirectoryTd(kind, filters);
      for (const value of [filters.query, td.title, td.description]) assert.equal(hasLoneSurrogate(value), false);
      assert.ok(codePoints(td.title) <= 65, `${kind}: title ${codePoints(td.title)}`);
      assert.ok(codePoints(td.description) <= 160, `${kind}: description ${codePoints(td.description)}`);
      assert.ok(td.title.includes("…") && td.description.includes("…"));
    }
  }
});

test("directory facet TD uses meaningful displayed labels rather than raw filter identifiers", () => {
  const cases = [
    { kind: "games", params: { genre: "survival-horror", format: "download" }, labels: ["Survival & horror", "PC downloads"], raw: ["survival-horror"] },
    { kind: "games", params: { format: "browser" }, labels: ["Browser games"], raw: [] },
    { kind: "guides", params: { genre: "tabletop", type: "rules" }, labels: ["Tabletop", "Rules"], raw: [] },
    { kind: "guides", params: { type: "getting-started" }, labels: ["Getting started"], raw: ["getting-started"] },
    { kind: "guides", params: { type: "troubleshooting" }, labels: ["Player help"], raw: ["troubleshooting"] },
  ];
  for (const item of cases) {
    const td = getDirectoryTd(item.kind, atlas.parseAtlasFilters(item.params, item.kind));
    for (const label of item.labels) assert.ok(td.title.includes(label), `${item.kind}: ${label}`);
    for (const value of item.raw) assert.equal(td.title.includes(value), false, value);
    assert.ok(codePoints(td.title) <= 65);
    assert.ok(codePoints(td.description) <= 160);
  }
});

test("identical tabletop genre and format labels are not repeated in directory snippets", () => {
  const td = getDirectoryTd("games", atlas.parseAtlasFilters({ genre: "tabletop", format: "tabletop" }));
  assert.equal(td.title.includes("Tabletop, Tabletop"), false, td.title);
  assert.equal(td.description.includes("Tabletop, Tabletop"), false, td.description);
});

test("directory context stays noindex and cannot mutate registered base or pagination TD", () => {
  const snapshot = JSON.stringify(PAGE_TD);
  for (const kind of ["games", "guides"]) {
    const basePath = `/${kind}/`;
    const base = getPageTd(basePath);
    for (const params of [{ q: "Cobb" }, { genre: "tabletop" }, { unrecognized: "context" }]) {
      const filters = atlas.parseAtlasFilters(params, kind);
      const td = getDirectoryTd(kind, filters);
      assert.equal(filters.noindex, true);
      const metadata = seo.createPageMetadata({ ...td, path: atlas.atlasCanonicalPath(basePath, filters), noindex: filters.noindex });
      assert.deepEqual(metadata.title, { absolute: td.title });
      assert.equal(metadata.description, td.description);
      assert.deepEqual(metadata.robots, { index: false, follow: true });
      assert.equal(metadata.alternates.canonical, seo.SITE_URL + basePath);
      assert.equal(metadata.openGraph.title, td.title);
      assert.equal(metadata.twitter.description, td.description);
      assert.equal("keywords" in metadata, false);
      assert.equal(getPageTd(basePath), base);
    }
    assert.equal(getDirectoryTd(kind, atlas.parseAtlasFilters({}, kind)), base);
  }
  for (const page of [2, 3]) {
    const filters = atlas.parseAtlasFilters({ page: String(page) }, "guides");
    const td = getDirectoryTd("guides", filters);
    assert.equal(td, getPageTd(`/guides/?page=${page}`));
    const metadata = seo.createPageMetadata({ ...td, path: atlas.atlasCanonicalPath("/guides/", filters), noindex: filters.noindex });
    assert.equal(metadata.title.absolute, td.title);
    assert.equal(metadata.description, td.description);
    assert.deepEqual(metadata.robots, { index: true, follow: true });
    assert.equal(metadata.alternates.canonical, `${seo.SITE_URL}/guides/?page=${page}`);
  }
  assert.equal(JSON.stringify(PAGE_TD), snapshot);
});

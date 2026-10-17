import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "../../..");
const cache = new Map();

// Load the real, dependency-free SEO/data modules without a framework server.
function load(relative) {
  const filename = path.resolve(root, relative);
  if (!fs.existsSync(filename)) return {};
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = { exports: {} };
  cache.set(filename, module);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: filename,
  }).outputText;
  const localRequire = (specifier) => {
    if (!specifier.startsWith(".")) return require(specifier);
    const absolute = path.resolve(path.dirname(filename), specifier);
    const resolved = [absolute, `${absolute}.ts`, `${absolute}.tsx`].find((candidate) => fs.existsSync(candidate));
    assert.ok(resolved, `Unresolved local SEO dependency: ${specifier}`);
    return load(path.relative(root, resolved));
  };
  new Function("require", "module", "exports", source)(localRequire, module, module.exports);
  return module.exports;
}

const seo = load("src/app/lib/seo.ts");
const routes = load("src/app/lib/seo-routes.ts");
const gameSeo = load("src/app/lib/game-seo.ts");

function required(module, name) {
  assert.equal(typeof module[name], "function", `${name} must be available`);
  return module[name];
}

test("JSON-LD cannot terminate its script and preserves the original data", () => {
  const value = { name: "</script><img src=x onerror=alert(1)>", note: "A&B\u2028\u2029" };
  const serialized = required(seo, "safeJsonLd")(value);
  assert.equal(serialized.includes("<"), false);
  assert.equal(/[\u2028\u2029]/u.test(serialized), false);
  assert.deepEqual(JSON.parse(serialized), value);
});

test("fallback metadata uses its own canonical and absolute title without parent title duplication", () => {
  const result = required(seo, "createPageMetadata")({ title: "Player guides", description: "Find a guide.", path: "/qa-metadata-fixture", image: "/fishes-steam-header.jpg" });
  assert.deepEqual(result.title, { absolute: "Player guides | ZowGame" });
  assert.equal(result.alternates.canonical, "https://zowgame.com/qa-metadata-fixture/");
  assert.equal(result.openGraph.url, result.alternates.canonical);
  assert.equal(result.openGraph.images[0], "https://zowgame.com/fishes-steam-header.jpg");
  assert.equal(result.robots.index, true);
});

test("search pages may be noindex while crawlers can follow links", () => {
  const result = required(seo, "createPageMetadata")({ title: "Search | ZowGame", description: "Filtered games.", path: "/games/", noindex: true });
  assert.deepEqual(result.title, { absolute: "Search | ZowGame" });
  assert.deepEqual(result.robots, { index: false, follow: true });
  assert.equal(result.alternates.canonical, "https://zowgame.com/games/");
});

test("canonical pagination stays on this site and strips fragments", () => {
  const canonical = required(seo, "canonicalUrl");
  assert.equal(canonical("/guides?page=2#results"), "https://zowgame.com/guides/?page=2");
  assert.throws(() => canonical("https://example.com/games/"));
  assert.throws(() => canonical("//example.com/games/"));
});

test("breadcrumb and item lists contain ordered crawlable page URLs", () => {
  const breadcrumb = required(seo, "breadcrumbSchema")([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }]);
  assert.equal(breadcrumb["@type"], "BreadcrumbList");
  assert.deepEqual(breadcrumb.itemListElement.map((item) => [item.position, item.item]), [[1, "https://zowgame.com/"], [2, "https://zowgame.com/guides/"]]);
  const list = required(seo, "itemListSchema")({ name: "Games", path: "/games/", items: [{ name: "Krillion", path: "/games/krillion/", image: "/krillion-cover.png" }, { name: "Setup", path: "/games/defenders-of-hogwarts/#setup" }] });
  assert.equal(list.numberOfItems, 2);
  assert.equal(list.itemListElement[0].url, "https://zowgame.com/games/krillion/");
  assert.equal(list.itemListElement[1].url, "https://zowgame.com/games/defenders-of-hogwarts/#setup");
});

test("game schemas do not turn unsourced editorial stars into aggregate reviews", () => {
  const games = load("src/app/data/games.ts").getPublishedGames();
  const schemas = required(gameSeo, "gameStructuredData");
  for (const game of games) {
    const data = schemas({ ...game, content: { ...game.content, rating: "4.9" }, schema: { ...game.schema, ratingCount: 30000 } });
    assert.equal(JSON.stringify(data).includes("aggregateRating"), false, game.slug);
    const breadcrumbs = data.find((item) => item["@type"] === "BreadcrumbList");
    assert.equal(breadcrumbs.itemListElement.at(-1).item, `https://zowgame.com${game.canonicalPath}`);
  }
});

test("tabletop guides describe a board game without classifying it as a video game", () => {
  const game = load("src/app/data/games.ts").getGameBySlug("defenders-of-hogwarts");
  const data = required(gameSeo, "gameStructuredData")(game);
  assert.equal(JSON.stringify(data).includes('"@type":"VideoGame"'), false);
  assert.equal(data[0].about["@type"], "Game");
});

test("game JSON-LD is present in server-rendered HTML before hydration", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const { SchemaJsonLd } = load("src/app/components/schema-jsonld.tsx");
  const game = load("src/app/data/games.ts").getGameBySlug("cobb-can-move");
  const html = renderToStaticMarkup(React.createElement(SchemaJsonLd, { game }));
  const script = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  assert.ok(script, "Structured data must not depend on a client effect");
  const data = JSON.parse(script[1]);
  assert.equal(data[0].name, game.content.title);
  assert.equal(script[1].includes("aggregateRating"), false);
});

test("ordinary game guides expose their own SSR sharing URL and reject unsupported slugs", async () => {
  const games = load("src/app/data/games.ts");
  for (const section of ["", "guide", "faq", "walkthrough"]) {
    const filename = path.join(root, `app/games/[slug]/${section}/page.tsx`);
    const source = fs.readFileSync(filename, "utf8");
    const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const generator = ast.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === "generateMetadata");
    const code = `${section === "walkthrough" ? 'const WALKTHROUGH_GAMES = ["dont-sleep-with-the-fishes", "all-the-gold-in-fort-locks"];' : ""}\n${generator.getText(ast).replace(/^export\s+/, "")}\nreturn generateMetadata;`;
    const js = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
    const generate = new Function("getGameBySlug", "createPageMetadata", "notFound", js)(games.getGameBySlug, seo.createPageMetadata, () => { throw new Error("PAGE_NOT_FOUND"); });
    const slug = section === "walkthrough" ? "all-the-gold-in-fort-locks" : "cobb-can-move";
    const metadata = await generate({ params: Promise.resolve({ slug }) });
    assert.equal(metadata.openGraph?.url, `https://zowgame.com/games/${slug}/${section ? `${section}/` : ""}`);
    await assert.rejects(generate({ params: Promise.resolve({ slug: "not-a-published-game" }) }), /PAGE_NOT_FOUND/);
    if (section === "walkthrough") await assert.rejects(generate({ params: Promise.resolve({ slug: "hood-warfare-2" }) }), /PAGE_NOT_FOUND/);
  }
});

function actualPagePaths() {
  const appDir = path.join(root, "app");
  const games = load("src/app/data/games.ts");
  const result = [];
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) { if (entry.name !== "api") walk(filename); continue; }
      if (entry.name !== "page.tsx") continue;
      const relative = path.relative(appDir, directory).replaceAll(path.sep, "/");
      const source = fs.readFileSync(filename, "utf8");
      if (/\bredirect\s*\(/.test(source)) continue;
      if (!relative.includes("[slug]")) { result.push(`/${relative}${relative ? "/" : ""}`); continue; }
      const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const generator = ast.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === "generateStaticParams");
      assert.ok(generator, `Dynamic page needs explicit supported slugs: ${relative}`);
      const constants = ast.statements.filter((node) => ts.isVariableStatement(node) && node.declarationList.declarations.some((decl) => decl.name.getText(ast) === "WALKTHROUGH_GAMES")).map((node) => node.getText(ast)).join("\n");
      const js = ts.transpileModule(`${constants}\n${generator.getText(ast).replace(/^export\s+/, "")}\nreturn generateStaticParams();`, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
      const params = new Function("getPublishedGames", js)(games.getPublishedGames);
      for (const param of params) result.push(`/${relative.replace("[slug]", param.slug)}/`);
    }
  }
  walk(appDir);
  return result.sort();
}

test("sitemap registry covers exactly the real static and generated canonical pages", () => {
  const registry = required(routes, "getIndexableRoutes")();
  const paths = registry.map((route) => route.path).sort();
  assert.equal(new Set(paths).size, paths.length, "Duplicate canonical page");
  assert.deepEqual(paths, actualPagePaths());
  assert.ok(paths.includes("/games/"));
  assert.ok(paths.includes("/guides/"));
  assert.ok(paths.includes("/updates/"));
  assert.ok(paths.includes("/games/dont-sleep-with-the-fishes/items/"));
  assert.equal(paths.includes("/games/defenders-of-hogwarts/guide/"), false);
  assert.equal(paths.includes("/games/hood-warfare-2/walkthrough/"), false);
});

test("sitemap emits canonical URLs without invented dates, parameters or redirect aliases", () => {
  const entries = required(load("app/sitemap.ts"), "default")();
  assert.ok(entries.length > 30);
  for (const entry of entries) {
    assert.equal(new URL(entry.url).origin, "https://zowgame.com");
    assert.equal(new URL(entry.url).search, "");
    assert.equal(new URL(entry.url).hash, "");
    assert.equal("lastModified" in entry, false);
  }
  assert.equal(entries.some((entry) => entry.url === "https://zowgame.com/cobb-can-move/"), false);
  assert.equal(fs.existsSync(path.join(root, "public/sitemap.xml")), false);
  assert.equal(fs.existsSync(path.join(root, "public/robots.txt")), false);
});

test("robots links the sitemap and permits crawling pages carrying noindex", () => {
  const robots = required(load("app/robots.ts"), "default")();
  assert.equal(robots.sitemap, "https://zowgame.com/sitemap.xml");
  assert.equal(robots.rules.userAgent, "*");
  assert.equal(robots.rules.allow, "/");
  assert.equal(robots.rules.disallow, undefined, "Do not block resources used to render live page content");
});

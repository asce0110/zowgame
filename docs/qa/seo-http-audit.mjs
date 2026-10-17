import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import ts from "typescript";

// Only local, side-effect-free catalog data is loaded; no page/client code runs.
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "../..");
const previousTsLoader = Module._extensions[".ts"];
Module._extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, filename);
let atlas, level;
try {
  atlas = require(path.join(root, "src/app/data/atlas.ts"));
  level = require(path.join(root, "src/app/data/level-select.ts"));
} finally {
  if (previousTsLoader) Module._extensions[".ts"] = previousTsLoader;
  else delete Module._extensions[".ts"];
}

const base = new URL(process.argv[2] || "http://127.0.0.1:3000");
if (!["127.0.0.1", "localhost", "[::1]"].includes(base.hostname)) throw new Error("This audit only requests a local server.");
const destination = path.resolve(process.argv[3] || "docs/qa/seo-http-audit-2026-10-17.json");
const report = { checkedAt: new Date().toISOString(), baseUrl: base.origin, scope: "Raw HTTP responses; no browser, hydration, page-script execution, or upstream API requests", checks: [], pages: [], images: [], limitations: [], notes: [] };
const responses = new Map();
const localImages = new Set();
let requests = 0;
const decode = (text = "") => text.replace(/&(?:amp|quot|apos|lt|gt|#x[0-9a-f]+|#\d+);/gi, (entity) => ({ "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">" }[entity.toLowerCase()] ?? String.fromCodePoint(parseInt(entity.slice(2, -1).replace(/^x/i, ""), /^&#x/i.test(entity) ? 16 : 10))));
const check = (name, ok, detail) => report.checks.push({ name, ok: Boolean(ok), ...(detail === undefined ? {} : { detail }) });
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)].map((m) => [m[1].toLowerCase(), decode(m[2] ?? m[3] ?? m[4] ?? "")]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => attrs(m[0]));
const text = (html) => decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const hasClass = (tag, name) => tag.class?.split(/\s+/).includes(name);
function elementContent(html, tagName, className) {
  let depth = 0, start = -1;
  for (const match of html.matchAll(new RegExp(`<(/?)${tagName}\\b([^>]*)>`, "gi"))) {
    if (start < 0) {
      if (!match[1] && hasClass(attrs(match[2]), className)) { start = match.index + match[0].length; depth = 1; }
    } else {
      depth += match[1] ? -1 : 1;
      if (depth === 0) return html.slice(start, match.index);
    }
  }
  return "";
}

async function request(urlPath, method = "GET") {
  const url = new URL(urlPath, base);
  if (url.origin !== base.origin || url.pathname.startsWith("/api/")) throw new Error(`Out-of-scope request: ${url.href}`);
  requests++;
  const response = await fetch(url, { method, redirect: "manual", signal: AbortSignal.timeout(25000), headers: { "user-agent": "ZowGame-Local-HTTP-SEO-Audit/1.0" } });
  return { status: response.status, contentType: response.headers.get("content-type"), contentLength: response.headers.get("content-length"), body: method === "HEAD" ? "" : await response.text() };
}

function inspect(urlPath, response) {
  const scripts = [...response.body.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
  const html = response.body.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, "");
  const links = tags(html, "link");
  const metas = tags(html, "meta");
  const parsed = { path: urlPath, status: response.status, bytes: Buffer.byteLength(response.body), title: [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((m) => text(m[1])), h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => text(m[1])), canonical: links.filter((tag) => tag.rel === "canonical").map((tag) => tag.href), robots: metas.filter((tag) => tag.name === "robots").map((tag) => tag.content), descriptions: metas.filter((tag) => tag.name === "description").map((tag) => tag.content), gameCards: tags(html, "article").filter((tag) => tag.class?.split(/\s+/).includes("atlas-game-card")).length, guideLinks: tags(html, "a").filter((tag) => tag.class?.split(/\s+/).includes("atlas-read-guide")).map((tag) => tag.href), pagination: tags(html, "a").filter((tag) => /^Page \d+$/.test(tag["aria-label"] || "")).map((tag) => ({ href: tag.href, current: tag["aria-current"] })), jsonLd: [], html };
  const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((match) => ({ ...attrs(match[1]), cover: tags(match[2], "img")[0] }));
  const hero = tags(html, "div").find((tag) => hasClass(tag, "ls-hero"));
  parsed.homeSelection = {
    heroSlug: hero?.class?.split(/\s+/).find((name) => name.startsWith("ls-hero-") && name !== "ls-hero-info")?.slice("ls-hero-".length),
    heroTitle: text(elementContent(html, "h2", "ls-game-title")),
    heroArtwork: tags(elementContent(html, "div", "ls-scene-art"), "img")[0],
    quickGuides: tags(elementContent(html, "nav", "ls-quick-guides"), "a").map((tag) => tag.href),
    heroOverview: anchors.find((tag) => hasClass(tag, "ls-overview"))?.href,
    selectors: anchors.filter((tag) => hasClass(tag, "ls-slot-select")).map(({ href, cover, ...tag }) => ({ href, current: tag["aria-current"], label: tag["aria-label"], cover })),
    overviewLinks: anchors.filter((tag) => hasClass(tag, "ls-slot-overview")).map((tag) => tag.href),
    guideTabs: tags(elementContent(html, "nav", "ls-guide-tabs"), "a").map((tag) => ({ href: tag.href, current: tag["aria-current"] })),
    searchActions: tags(html, "form").map((tag) => ({ action: tag.action, method: tag.method })),
  };
  for (const match of scripts) {
    if (attrs(match[1]).type !== "application/ld+json") continue;
    try {
      const data = JSON.parse(match[2]);
      check(`${urlPath}: JSON-LD parses without literal HTML delimiters`, !match[2].includes("<"));
      check(`${urlPath}: no unsourced aggregate rating`, !JSON.stringify(data).includes('"aggregateRating"'));
      parsed.jsonLd.push(data);
    } catch (error) { check(`${urlPath}: JSON-LD parses`, false, String(error)); }
  }
  for (const image of tags(html, "img")) {
    if (!image.src) continue;
    const url = new URL(image.src, base);
    if (url.origin === base.origin && !url.pathname.startsWith("/api/") && !url.pathname.startsWith("/_next/image")) localImages.add(url.pathname + url.search);
  }
  report.pages.push({ ...parsed, html: undefined, jsonLd: parsed.jsonLd.map((data) => ({ topLevelTypes: (Array.isArray(data) ? data : [data]).map((node) => node["@type"]) })) });
  return parsed;
}

async function getPage(urlPath) {
  if (responses.has(urlPath)) return responses.get(urlPath);
  const result = inspect(urlPath, await request(urlPath));
  responses.set(urlPath, result);
  return result;
}

async function batch(values, operation, concurrency = 4) {
  for (let i = 0; i < values.length; i += concurrency) {
    const outcomes = await Promise.allSettled(values.slice(i, i + concurrency).map(operation));
    for (let j = 0; j < outcomes.length; j++) if (outcomes[j].status === "rejected") check(`${values[i + j]}: request completed`, false, String(outcomes[j].reason));
  }
}

try {
  const sitemap = await request("/sitemap.xml");
  const locations = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
  check("sitemap status 200", sitemap.status === 200);
  check("sitemap contains 37 unique canonical pages", locations.length === 37 && new Set(locations).size === 37, locations.length);
  check("sitemap has no invented lastmod", !sitemap.body.includes("<lastmod>"));
  check("sitemap contains only production canonical paths without query/hash", locations.every((location) => { const url = new URL(location); return url.origin === "https://zowgame.com" && !url.search && !url.hash; }));
  const canonicalPaths = locations.map((location) => new URL(location).pathname);
  const featuredSlugs = level.FEATURED_SCENES.map((scene) => scene.slug);
  const homeCases = [
    { path: "/", slug: "hood-warfare-2", visible: featuredSlugs, type: "featured" },
    ...featuredSlugs.map((slug) => ({ path: `/?game=${slug}`, slug, visible: featuredSlugs, type: "featured" })),
    { path: "/?genre=tabletop", slug: "defenders-of-hogwarts", visible: ["defenders-of-hogwarts"], type: "featured" },
    { path: "/?genre=tabletop&game=hood-warfare-2", slug: "defenders-of-hogwarts", visible: ["defenders-of-hogwarts"], type: "featured" },
    { path: "/?type=rules", slug: "hood-warfare-2", visible: featuredSlugs, type: "rules" },
    { path: "/?game=dont-sleep-with-the-fishes&type=rules", slug: "dont-sleep-with-the-fishes", visible: featuredSlugs, type: "rules" },
  ];
  const aionSearchPaths = ["/guides/?q=AION2", "/guides/?q=AION%202", "/guides/?q=aion%202%20steam%20launch%20stats"];
  const special = [...homeCases.map((entry) => entry.path), "/games/", "/guides/", "/guides/?page=2", "/guides/?page=3", "/guides/?q=Harry%20Potter", "/guides/?q=zzzznomatch", "/guides/?page=999", ...aionSearchPaths];
  await batch([...new Set([...canonicalPaths, ...special])], getPage);
  for (const urlPath of special.filter((value) => value.includes("?") && value !== "/guides/?page=999")) {
    const page = responses.get(urlPath);
    check(`${urlPath}: one server-rendered H1 and one canonical/robots/title/description`, page?.h1.length === 1 && page.canonical.length === 1 && page.robots.length === 1 && page.title.length === 1 && page.descriptions.length === 1);
  }
  for (const location of locations) {
    const url = new URL(location);
    const page = responses.get(url.pathname);
    if (!page) continue;
    check(`${url.pathname}: status 200`, page.status === 200, page.status);
    check(`${url.pathname}: one H1`, page.h1.length === 1, page.h1);
    check(`${url.pathname}: unique self canonical`, page.canonical.length === 1 && page.canonical[0] === location, page.canonical);
    check(`${url.pathname}: unique indexable robots`, page.robots.length === 1 && !page.robots[0].includes("noindex"), page.robots);
    check(`${url.pathname}: one nonempty title and description`, page.title.length === 1 && Boolean(page.title[0]) && page.descriptions.length === 1 && Boolean(page.descriptions[0]));
  }
  for (const [urlPath, canonical] of [...homeCases.filter((entry) => entry.path !== "/").map((entry) => [entry.path, "https://zowgame.com/"]), ["/guides/?q=Harry%20Potter", "https://zowgame.com/guides/"], ["/guides/?q=zzzznomatch", "https://zowgame.com/guides/"], ...aionSearchPaths.map((urlPath) => [urlPath, "https://zowgame.com/guides/"])]) {
    const page = responses.get(urlPath);
    check(`${urlPath}: status 200 and unique noindex follow`, page?.status === 200 && page.robots.length === 1 && page.robots[0].includes("noindex") && page.robots[0].includes("follow"), page?.robots);
    check(`${urlPath}: canonical to standard directory`, page?.canonical.length === 1 && page.canonical[0] === canonical, page?.canonical);
  }
  const home = responses.get("/");
  const games = responses.get("/games/");
  check("game directory retains six server-rendered overview cards", games?.gameCards === 6, games?.gameCards);
  for (const page of [games]) {
    const cards = [...page.html.matchAll(/<article\b([^>]*)>([\s\S]*?)<\/article>/gi)].filter((match) => attrs(match[1]).class?.split(/\s+/).includes("atlas-game-card"));
    const covers = cards.map((match) => tags(match[2], "img")[0]);
    check(`${page.path}: six distinct real image elements with descriptive alt text`, covers.length === 6 && covers.every((image) => image?.src && image?.alt) && new Set(covers.map((image) => image?.src)).size === 6, covers.map((image) => image?.src));
  }
  for (const expected of homeCases) {
    const page = responses.get(expected.path);
    if (!page) continue;
    const selection = page.homeSelection;
    const scene = level.FEATURED_SCENES.find((entry) => entry.slug === expected.slug);
    const selected = selection.selectors.filter((entry) => entry.current === "true");
    const selectorSlugs = selection.selectors.map((entry) => new URL(entry.href, base).searchParams.get("game"));
    check(`${expected.path}: native selection links represent the exact visible featured games`, page.status === 200 && JSON.stringify(selectorSlugs) === JSON.stringify(expected.visible) && new Set(selection.selectors.map((entry) => entry.href)).size === expected.visible.length, selectorSlugs);
    check(`${expected.path}: one selected game agrees with the server-rendered hero`, selected.length === 1 && new URL(selected[0].href, base).searchParams.get("game") === expected.slug && selection.heroSlug === expected.slug, { selected: selected.map((entry) => entry.href), heroSlug: selection.heroSlug });
    check(`${expected.path}: hero heading and artwork belong to the selected game`, selection.heroTitle === scene.lines.join(" ") && selection.heroArtwork?.src === scene.scene && Boolean(selection.heroArtwork?.alt), { title: selection.heroTitle, image: selection.heroArtwork?.src });
    check(`${expected.path}: all three quick guides are the selected game's real links`, JSON.stringify(selection.quickGuides) === JSON.stringify(scene.links.map((entry) => entry.href)), selection.quickGuides);
    check(`${expected.path}: selected overview and every thumbnail overview are real canonical pages`, selection.heroOverview === `/games/${expected.slug}/` && JSON.stringify(selection.overviewLinks) === JSON.stringify(expected.visible.map((slug) => `/games/${slug}/`)), selection.overviewLinks);
    check(`${expected.path}: visible thumbnails are distinct images with accessible selection labels`, selection.selectors.every((entry) => entry.cover?.src && entry.cover?.alt && entry.label?.startsWith("Select ")) && new Set(selection.selectors.map((entry) => entry.cover?.src)).size === expected.visible.length);
    check(`${expected.path}: selectors preserve the current guide topic through native GET`, selection.selectors.every((entry) => { const url = new URL(entry.href, base); return url.pathname === "/" && url.origin === base.origin && (url.searchParams.get("type") || "featured") === expected.type; }));
    check(`${expected.path}: global game/question search still targets the full guide directory`, selection.searchActions.some((entry) => entry.action === "/guides/" && entry.method?.toLowerCase() === "get"));
    const visibleGames = atlas.ATLAS_GAMES.filter((game) => expected.visible.includes(game.slug));
    const visibleGuidePool = expected.visible.length === featuredSlugs.length ? atlas.ATLAS_GUIDES : atlas.ATLAS_GUIDES.filter((guide) => expected.visible.includes(guide.gameSlug));
    const preview = level.homeGuides(visibleGuidePool, expected.type);
    check(`${expected.path}: guide topic preview uses actual matching chapters in SSR HTML`, JSON.stringify(page.guideLinks) === JSON.stringify(preview.map((guide) => guide.href)), page.guideLinks);
    const lists = page.jsonLd.flatMap((data) => Array.isArray(data) ? data : [data]).filter((entry) => entry["@type"] === "ItemList");
    check(`${expected.path}: game ItemList matches the visible featured catalog without extra games`, lists.some((list) => JSON.stringify(list.itemListElement.map((item) => item.url)) === JSON.stringify(visibleGames.map((game) => `https://zowgame.com${game.href}`))));
    check(`${expected.path}: existing home section anchors remain available`, ["library", "guides", "updates"].every((id) => page.html.includes(`id="${id}"`)));
    if (expected.slug === "dont-sleep-with-the-fishes") check(`${expected.path}: native guide-tab links retain the chosen game`, selection.guideTabs.length === level.HOME_GUIDE_FILTERS.length && selection.guideTabs.every((entry) => new URL(entry.href, base).searchParams.get("game") === expected.slug), selection.guideTabs);
    for (const href of selection.quickGuides) {
      const url = new URL(href, base);
      const target = responses.get(url.pathname);
      check(`${expected.path}: quick-guide destination ${href} exists`, target?.status === 200 && (!url.hash || target.html.includes(`id="${url.hash.slice(1)}"`)));
    }
  }
  const guidePaths = ["/guides/", "/guides/?page=2", "/guides/?page=3"];
  const guidePages = guidePaths.map((urlPath) => responses.get(urlPath));
  const guideLinks = guidePages.flatMap((page) => page?.guideLinks || []);
  check("guide index pages contain exactly 12/12/6 visible guide links", JSON.stringify(guidePages.map((page) => page?.guideLinks.length)) === "[12,12,6]", guidePages.map((page) => page?.guideLinks.length));
  check("all 30 guide index destinations are unique server HTML links", guideLinks.length === 30 && new Set(guideLinks).size === 30);
  check("all 30 guide destinations resolve to fetched canonical pages and existing section IDs", guideLinks.every((href) => {
    const url = new URL(href, base);
    const target = responses.get(url.pathname);
    return target?.status === 200 && (!url.hash || target.html.includes(`id="${url.hash.slice(1)}"`));
  }));
  for (const page of guidePages) {
    const list = page?.jsonLd.flatMap((data) => Array.isArray(data) ? data : [data]).find((data) => data["@type"] === "ItemList");
    check(`${page?.path}: JSON-LD guide items match visible HTML links including anchors`, JSON.stringify(list?.itemListElement.map((item) => item.url)) === JSON.stringify(page?.guideLinks.map((href) => new URL(href, "https://zowgame.com").href)));
  }
  for (let index = 1; index < guidePages.length; index++) {
    const page = guidePages[index];
    const expected = `https://zowgame.com/guides/?page=${index + 1}`;
    check(`guide page ${index + 1}: self canonical, unique indexable robots and differentiated title`, page?.status === 200 && page.canonical.length === 1 && page.canonical[0] === expected && page.robots.length === 1 && !page.robots[0].includes("noindex") && page.title[0].includes(`Page ${index + 1}`));
  }
  check("guide pagination exposes real second and third page anchors", ["/guides/?page=2", "/guides/?page=3"].every((href) => guidePages[0]?.pagination.some((link) => link.href === href)));
  const harry = responses.get("/guides/?q=Harry%20Potter");
  check("Harry Potter query renders four existing tabletop chapters", harry?.guideLinks.length === 4 && harry.guideLinks.every((href) => href.startsWith("/games/defenders-of-hogwarts/#")), harry?.guideLinks);
  for (const urlPath of aionSearchPaths) {
    const page = responses.get(urlPath);
    check(`${urlPath}: returns the existing AION 2 stats topic without adding a game card`, page?.guideLinks.length === 1 && page.guideLinks[0] === "/games/aion-2/steam-launch-stats/" && page.gameCards === 0, page?.guideLinks);
  }
  const empty = responses.get("/guides/?q=zzzznomatch");
  check("empty query has no fabricated results and a recovery link", empty?.guideLinks.length === 0 && empty.html.includes("No guides match these filters.") && empty.html.includes('href="/guides/"'));
  const invalid = responses.get("/guides/?page=999");
  check("out-of-range pagination returns 404 with noindex", invalid?.status === 404 && invalid.robots.some((value) => value.includes("noindex")), { status: invalid?.status, robots: invalid?.robots });
  if (invalid?.robots.length > 1) report.notes.push({ path: invalid.path, note: `The 404 response has multiple robots tags, including Next's automatic noindex. ${invalid.h1.length ? "An SSR error heading is present." : "Its error HTML has no H1; any RSC fallback text is not SSR markup."} These are recorded separately from the H1/metadata uniqueness checks on 200 pages.`, robots: invalid.robots, h1Count: invalid.h1.length, canonical: invalid.canonical });
  const robots = await request("/robots.txt");
  check("robots status 200 and declares the production sitemap", robots.status === 200 && robots.body.includes("Sitemap: https://zowgame.com/sitemap.xml"));
  check("robots permits page and rendering-resource crawling", /Allow:\s*\//i.test(robots.body) && !/Disallow:\s*\S+/i.test(robots.body), robots.body.trim());
  await batch([...localImages], async (urlPath) => {
    const response = await request(urlPath, "HEAD");
    report.images.push({ path: urlPath, status: response.status, contentType: response.contentType, contentLength: response.contentLength });
    check(`${urlPath}: local image HTTP 200`, response.status === 200 && response.contentType?.startsWith("image/"), response.status);
  });
  report.limitations.push("These checks inspect complete raw HTTP responses. They do not prove browser visibility with JavaScript disabled, hydration behavior, keyboard access, responsive visuals, or runtime client API results.");
  report.limitations.push("Only same-origin image src resources were requested, using HEAD. External images, CSS backgrounds, video, iframe contents, scripts, and upstream APIs were not fetched.");
  report.summary = { totalHttpRequests: requests, htmlPages: responses.size, sitemapCanonicalPages: locations.length, localImageHeadRequests: report.images.length, parsedJsonLdScripts: report.pages.reduce((sum, page) => sum + page.jsonLd.length, 0), checks: report.checks.length, passed: report.checks.filter((item) => item.ok).length, failed: report.checks.filter((item) => !item.ok).length };
} catch (error) {
  check("audit completed", false, String(error));
  report.fatalError = { message: String(error), cause: String(error.cause || "") };
} finally {
  report.completedAt = new Date().toISOString();
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, JSON.stringify(report, null, 2) + "\n");
  const failures = report.checks.filter((item) => !item.ok);
  process.stdout.write(JSON.stringify({ resultFile: destination, summary: report.summary, failures, notes: report.notes, fatalError: report.fatalError }, null, 2) + "\n");
  process.exitCode = failures.length ? 1 : 0;
}

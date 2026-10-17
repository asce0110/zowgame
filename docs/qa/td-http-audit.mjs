import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import ts from "typescript";

// Pure local data only: never import page components or execute client code.
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "../..");
const previousLoader = Module._extensions[".ts"];
Module._extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, filename);
let PAGE_TD, SITE_URL;
try {
  ({ PAGE_TD } = require(path.join(root, "src/app/data/page-seo.ts")));
  ({ SITE_URL } = require(path.join(root, "src/app/lib/seo.ts")));
} finally {
  if (previousLoader) Module._extensions[".ts"] = previousLoader;
  else delete Module._extensions[".ts"];
}

const base = new URL(process.argv[2] || "http://127.0.0.1:3000");
if (!["127.0.0.1", "localhost", "[::1]"].includes(base.hostname)) throw new Error("This audit is restricted to a local HTTP server.");
if (!["http:", "https:"].includes(base.protocol) || base.username || base.password || base.pathname !== "/" || base.search || base.hash) throw new Error("Use a plain local server origin as the audit base URL.");
const destination = path.resolve(process.argv[3] || "docs/qa/td-http-audit-2026-10-17.json");
const report = { checkedAt: new Date().toISOString(), baseUrl: base.origin, scope: "Raw local HTTP responses for 37 sitemap pages and two real guide pagination views; no browser or page-script execution", pages: [], checks: [], limitations: [] };
let requests = 0;
const check = (name, ok, detail) => report.checks.push({ name, ok: Boolean(ok), ...(detail === undefined ? {} : { detail }) });
const decode = (value = "") => value.replace(/&(?:amp|quot|apos|lt|gt|#x[0-9a-f]+|#\d+);/gi, (entity) => {
  const named = { "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">" }[entity.toLowerCase()];
  if (named !== undefined) return named;
  const code = parseInt(entity.slice(2, -1).replace(/^x/i, ""), /^&#x/i.test(entity) ? 16 : 10);
  return Number.isFinite(code) && code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
});
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)].map((match) => [match[1].toLowerCase(), decode(match[2] ?? match[3] ?? match[4] ?? "")]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => attributes(match[0]));
const plainText = (html = "") => decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const stripNonContent = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, "").replace(/<!--[\s\S]*?-->/g, "");
const normalize = (value) => value.toLowerCase().replace(/[’']/g, "").replace(/([a-z])(\d)/g, "$1 $2").replace(/(\d)([a-z])/g, "$1 $2").replace(/[^a-z0-9]+/g, " ").trim();
const stopWords = new Set(["a", "an", "the", "in", "of", "to", "for", "with", "and", "or", "on", "at", "by", "how", "all", "can", "is", "are"]);
const stem = (word) => word.length > 4 && word.endsWith("s") ? word.slice(0, -1) : word;
const tokens = (value) => [...new Set(normalize(value).split(" ").filter((word) => word && !stopWords.has(word)).map(stem))];

function semanticTerms(urlPath) {
  const url = new URL(urlPath, SITE_URL);
  if (url.pathname === "/") return ["guide", "walkthrough", "rule", "help"];
  if (url.pathname === "/games/") return ["genre", "format", "library"];
  if (url.pathname === "/guides/") return ["chapter", "guide", "walkthrough", "question"];
  if (url.pathname === "/updates/") return ["announcement", "update", "patch", "news"];
  if (url.pathname === "/privacy/") return ["analytics", "cookie", "privacy", "third party"];
  const section = url.pathname.split("/").filter(Boolean).at(-1);
  return ({
    guide: ["beginner", "guide", "objective", "learn", "start"],
    faq: ["question", "answer", "faq", "help"],
    walkthrough: ["walkthrough", "stage", "key", "route", "day"],
    purchase: ["buy", "download", "install", "price"],
    weapons: ["weapon", "attachment", "unlock", "loadout"],
    maps: ["map", "area", "route", "spawn"],
    modes: ["mode", "objective", "team"],
    news: ["announcement", "update", "patch", "news"],
    items: ["item", "suppl", "food", "water"],
    events: ["event", "night", "encounter"],
    characters: ["crew", "character", "support"],
    endings: ["ending", "rescue", "route", "heart"],
    "tips-tricks": ["tip", "strategy", "resource", "survival"],
    achievements: ["achievement", "milestone", "steam"],
    steam: ["download", "itch", "steam", "play", "buy"],
    changelog: ["patch", "version", "update", "changelog"],
    "steam-launch-stats": ["player", "peak", "steam", "launch", "count"],
  })[section] || ["game", "guide", "rule", "player", "survival", "daily", "puzzle"];
}

function inspect(entry, response) {
  const html = stripNonContent(response.body);
  const meta = tags(html, "meta");
  const values = (name) => meta.filter((tag) => (tag.name || tag.property || "").toLowerCase() === name).map((tag) => tag.content);
  const main = [...html.matchAll(/<main\b[^>]*>([\s\S]*?)<\/main\s*>/gi)].map((match) => match[1]).join(" ");
  const mainText = plainText(main.replace(/<svg\b[^>]*>[\s\S]*?<\/svg\s*>/gi, ""));
  const mainWords = new Set(tokens(mainText));
  const primaryTokens = tokens(entry.primaryKeyword);
  const matchedPrimaryTokens = primaryTokens.filter((word) => mainWords.has(word));
  const entity = new URL(entry.path, SITE_URL).pathname.match(/^\/games\/([^/]+)\//)?.[1];
  const entityTokens = entity ? tokens(entity) : [];
  const matchedEntityTokens = entityTokens.filter((word) => mainWords.has(word));
  const semantics = semanticTerms(entry.path);
  const normalizedMain = normalize(mainText);
  const matchedSemanticTerms = semantics.filter((term) => tokens(term).every((word) => mainWords.has(word)) || normalizedMain.includes(normalize(term)));
  return {
    path: entry.path, status: response.status, bytes: Buffer.byteLength(response.body), contentType: response.contentType,
    title: [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/gi)].map((match) => plainText(match[1])),
    description: values("description"), canonical: tags(html, "link").filter((tag) => tag.rel?.toLowerCase() === "canonical").map((tag) => tag.href),
    robots: values("robots"), ogTitle: values("og:title"), ogDescription: values("og:description"), ogUrl: values("og:url"), twitterTitle: values("twitter:title"), twitterDescription: values("twitter:description"),
    rawKeywordMetaCount: tags(response.body, "meta").filter((tag) => (tag.name || "").toLowerCase() === "keywords").length,
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1\s*>/gi)].map((match) => plainText(match[1])),
    content: { mainPresent: Boolean(main), mainCharacters: mainText.length, primaryKeyword: entry.primaryKeyword, primaryTokens, matchedPrimaryTokens, entityTokens, matchedEntityTokens, semanticTerms: semantics, matchedSemanticTerms },
    ...(response.status !== 200 ? { errorExcerpt: mainText.slice(0, 300) || plainText(html).slice(0, 300) } : {}),
  };
}

async function request(urlPath) {
  const url = new URL(urlPath, base);
  if (url.origin !== base.origin || url.pathname.startsWith("/api/")) throw new Error(`Out-of-scope request: ${url.href}`);
  requests++;
  const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(25000), headers: { "user-agent": "ZowGame-Local-TD-Audit/1.0" } });
  return { status: response.status, contentType: response.headers.get("content-type"), body: await response.text() };
}

try {
  check("registry has exactly 39 unique TD paths", Array.isArray(PAGE_TD) && PAGE_TD.length === 39 && new Set(PAGE_TD.map((entry) => entry.path)).size === 39);
  check("registry has unique titles and descriptions", new Set(PAGE_TD.map((entry) => normalize(entry.title))).size === PAGE_TD.length && new Set(PAGE_TD.map((entry) => normalize(entry.description))).size === PAGE_TD.length);
  const sitemap = await request("/sitemap.xml");
  check("sitemap returns HTTP 200", sitemap.status === 200, sitemap.status);
  const locations = [...sitemap.body.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((match) => decode(match[1]));
  const canonicalPaths = locations.map((location) => { const url = new URL(location); if (url.origin !== SITE_URL || url.search || url.hash) throw new Error(`Unexpected sitemap canonical: ${location}`); return url.pathname; });
  check("sitemap retains 37 unique canonical pages", canonicalPaths.length === 37 && new Set(canonicalPaths).size === 37, canonicalPaths.length);
  const expectedPaths = [...canonicalPaths, "/guides/?page=2", "/guides/?page=3"].sort();
  check("registry matches the exact sitemap and real pagination views", JSON.stringify(PAGE_TD.map((entry) => entry.path).sort()) === JSON.stringify(expectedPaths));
  for (let index = 0; index < PAGE_TD.length; index += 4) {
    const outcomes = await Promise.allSettled(PAGE_TD.slice(index, index + 4).map(async (entry) => {
      const page = inspect(entry, await request(entry.path));
      report.pages.push(page);
      const prefix = entry.path;
      check(`${prefix}: HTTP 200 HTML`, page.status === 200 && page.contentType?.includes("text/html"), { status: page.status, contentType: page.contentType });
      check(`${prefix}: one visible-content H1 in raw server HTML`, page.h1.length === 1 && Boolean(page.h1[0]), page.h1);
      check(`${prefix}: exactly one title matches the registry`, page.title.length === 1 && page.title[0] === entry.title, page.title);
      check(`${prefix}: exactly one description matches the registry`, page.description.length === 1 && page.description[0] === entry.description, page.description);
      check(`${prefix}: editorial title/description ranges and one brand suffix`, entry.title.length >= 45 && entry.title.length <= 65 && entry.description.length >= 140 && entry.description.length <= 160 && [...entry.title.matchAll(/\bZowGame\b/gi)].length === 1 && entry.title.endsWith(" | ZowGame"), { titleLength: entry.title.length, descriptionLength: entry.description.length });
      check(`${prefix}: unique self canonical and indexable robots`, page.canonical.length === 1 && page.canonical[0] === new URL(entry.path, SITE_URL).href && page.robots.length === 1 && !page.robots[0].toLowerCase().includes("noindex"), { canonical: page.canonical, robots: page.robots });
      check(`${prefix}: single Open Graph TD matches the registry`, page.ogTitle.length === 1 && page.ogTitle[0] === entry.title && page.ogDescription.length === 1 && page.ogDescription[0] === entry.description && page.ogUrl.length === 1 && page.ogUrl[0] === new URL(entry.path, SITE_URL).href, { title: page.ogTitle, description: page.ogDescription, url: page.ogUrl });
      check(`${prefix}: single Twitter TD matches the registry`, page.twitterTitle.length === 1 && page.twitterTitle[0] === entry.title && page.twitterDescription.length === 1 && page.twitterDescription[0] === entry.description, { title: page.twitterTitle, description: page.twitterDescription });
      check(`${prefix}: raw HTML emits no Keywords meta tag`, page.rawKeywordMetaCount === 0, page.rawKeywordMetaCount);
      const content = page.content;
      check(`${prefix}: main content covers the primary topic without requiring a literal query phrase`, content.mainPresent && content.primaryTokens.length > 0 && content.matchedPrimaryTokens.length >= Math.ceil(content.primaryTokens.length * 0.6) && content.matchedEntityTokens.length === content.entityTokens.length, content);
      check(`${prefix}: main content contains the page intent and semantic subject words`, content.mainCharacters > 80 && content.matchedSemanticTerms.length > 0, { mainCharacters: content.mainCharacters, terms: content.matchedSemanticTerms });
    }));
    for (let offset = 0; offset < outcomes.length; offset++) {
      const outcome = outcomes[offset];
      if (outcome.status === "rejected") check(`${PAGE_TD[index + offset].path}: request and parse completed`, false, String(outcome.reason));
    }
  }
  report.pages.sort((a, b) => a.path.localeCompare(b.path));
  check("all 39 registered views were independently inspected", report.pages.length === 39, report.pages.length);
  report.limitations.push("This is raw HTTP inspection. It does not prove post-hydration metadata, keyboard access, browser visibility, responsive layout, indexing, search-result snippets, or ranking.");
  report.limitations.push("Body coverage is an editorial heuristic: at least 60% of meaningful primary-keyword tokens, every game-entity token and a route-specific intent term must appear in main content. It checks relevance rather than exact search-phrase repetition or gameplay accuracy.");
  report.limitations.push("Only the local sitemap and 39 local page URLs are requested. No images, styles, scripts, browser APIs or /api/ routes are requested, and no upstream API is called by this script.");
} catch (error) {
  check("TD audit completed", false, String(error));
  report.fatalError = { message: String(error), cause: String(error.cause || "") };
} finally {
  report.completedAt = new Date().toISOString();
  report.summary = { totalHttpRequests: requests, expectedIndexableViews: 39, inspectedHtmlPages: report.pages.length, checks: report.checks.length, passed: report.checks.filter((entry) => entry.ok).length, failed: report.checks.filter((entry) => !entry.ok).length };
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, JSON.stringify(report, null, 2) + "\n");
  const failures = report.checks.filter((entry) => !entry.ok);
  process.stdout.write(JSON.stringify({ resultFile: destination, summary: report.summary, failures, fatalError: report.fatalError }, null, 2) + "\n");
  process.exitCode = failures.length ? 1 : 0;
}

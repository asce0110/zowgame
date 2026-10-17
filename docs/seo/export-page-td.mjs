import fs from "node:fs";
import path from "node:path";
import Module from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

// Registry is the only source of page copy. No draft, route or page module runs.
const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, "../..");
const registryPath = path.join(root, "src/app/data/page-seo.ts");
let date = "2026-10-17";
let check = false;
const args = process.argv.slice(2);
for (let index = 0; index < args.length; index++) {
  if (args[index] === "--date") date = args[++index] || "";
  else if (args[index] === "--check") check = true;
  else if (args[index] === "--help") {
    console.log("Usage: node docs/seo/export-page-td.mjs [--date YYYY-MM-DD] [--check]\nDefault snapshot date: 2026-10-17. --check compares both exports without writing.");
    process.exit(0);
  } else throw new Error(`Unknown argument: ${args[index]}`);
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`)) || new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date) {
  throw new Error("--date must be a valid YYYY-MM-DD calendar date.");
}

const compiled = ts.transpileModule(fs.readFileSync(registryPath, "utf8"), {
  fileName: registryPath,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const registryModule = new Module(registryPath);
registryModule.filename = registryPath;
registryModule.paths = Module._nodeModulePaths(path.dirname(registryPath));
registryModule._compile(compiled, registryPath);
const records = registryModule.exports.PAGE_TD;
if (!Array.isArray(records) || !records.length) throw new Error("PAGE_TD must be a nonempty array.");

const codepoints = (value) => Array.from(value).length;
const seen = new Set();
for (const entry of records) {
  for (const field of ["path", "primaryKeyword", "title", "description"]) {
    if (typeof entry[field] !== "string" || !entry[field].trim()) throw new Error(`Missing ${field} on ${entry.path || "registry entry"}.`);
  }
  for (const field of ["secondaryKeywords", "contentEvidence", "notes"]) {
    if (!Array.isArray(entry[field]) || entry[field].some((value) => typeof value !== "string")) throw new Error(`Invalid ${field} on ${entry.path}.`);
  }
  const url = new URL(entry.path, "https://zowgame.com");
  if (!entry.path.startsWith("/") || url.origin !== "https://zowgame.com" || url.hash) throw new Error(`Invalid page path: ${entry.path}`);
  if (seen.has(entry.path)) throw new Error(`Duplicate page path: ${entry.path}`);
  seen.add(entry.path);
}

const baseCount = records.filter((entry) => !new URL(entry.path, "https://zowgame.com").search).length;
const paginated = records.filter((entry) => new URL(entry.path, "https://zowgame.com").search);
const titleLengths = records.map((entry) => codepoints(entry.title));
const descriptionLengths = records.map((entry) => codepoints(entry.description));
const warnings = records.flatMap((entry) => {
  const title = codepoints(entry.title), description = codepoints(entry.description);
  return [
    ...(title < 45 || title > 60 ? [`${entry.path}: title ${title}; target 45–60, editorial ceiling 65.`] : []),
    ...(description < 140 || description > 160 ? [`${entry.path}: description ${description}; target 140–160.`] : []),
  ];
});
const csvCell = (value) => `"${String(value).replace(/\r\n|\r|\n/g, "\r\n").replaceAll('"', '""')}"`;
const mdCell = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("|", "\\|").replace(/\r\n|\r|\n/g, "<br>");
const mdArray = (items) => items.map(mdCell).join("<br>");
const headers = ["Path", "Primary keyword", "Secondary keywords (planning)", "Title", "T length", "Description", "D length", "Content evidence / landing sections", "Notes"];
const csv = "\uFEFF" + [headers, ...records.map((entry) => [entry.path, entry.primaryKeyword, entry.secondaryKeywords.join("\n"), entry.title, codepoints(entry.title), entry.description, codepoints(entry.description), entry.contentEvidence.join("\n"), entry.notes.join("\n")])].map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
const basename = `page-td-${date}`;
const markdown = [
  `# ZowGame page titles and descriptions — ${date}`,
  "",
  `Generated from [PAGE_TD](../../src/app/data/page-seo.ts) by [export-page-td.mjs](./export-page-td.mjs). This registry is the only source of page copy in this export. Download the [UTF-8 BOM CSV](./${basename}.csv). Do not edit either generated export by hand.`,
  "",
  `This snapshot contains **${records.length} page views: ${baseCount} base routes + ${paginated.length} real pagination views** (${paginated.map((entry) => `\`${entry.path}\``).join(", ")}). The base routes are sitemap candidates; pagination views have their own canonicals and crawlable links rather than being additional sitemap base routes.`,
  "",
  "Search, genre, format, topic and other filtered/invalid query variants remain `noindex,follow` with their clean directory canonical. Homepage parameter variants use the root canonical and `noindex,follow`. Out-of-range pagination returns a real 404. Do not block these URLs in robots.txt if crawlers need to read their noindex directive.",
  "",
  "Primary and secondary keywords record editorial intent only. They are not meta keywords, and no `K`/`<meta name=\"keywords\">` output is generated. These descriptions do not establish search volume, competition, rankings or a promise of ranking improvement.",
  "",
  "T length and D length count Unicode code points with `Array.from(text).length`, including spaces, punctuation and the ` | ZowGame` suffix. The editorial target is 45–60 for a full title (65 maximum) and 140–160 for a description (160 maximum). These are project writing standards, not Google hard limits or guaranteed display lengths. Google can generate different title links and snippets for a query or device.",
  "",
  `Current ranges: titles **${Math.min(...titleLengths)}–${Math.max(...titleLengths)}**; descriptions **${Math.min(...descriptionLengths)}–${Math.max(...descriptionLengths)}** code points. Export date labels this snapshot; it does not refresh source checks, prices, news reviews or gameplay verification. Evidence and cautions below are preserved verbatim from the registry.`,
  "",
  "## Update and regenerate",
  "",
  "1. Inspect the actual page and its sources. Edit `src/app/data/page-seo.ts`, keeping its path, primary intent, visible H1/intro, title, description, evidence and notes consistent.",
  "2. Keep filter indexing/canonical behavior in the route layer. A new published route also needs its real page and route/sitemap registration; adding TD alone does not create a route.",
  "3. Regenerate this snapshot, then confirm it matches the registry:",
  "",
  "```sh",
  `node docs/seo/export-page-td.mjs --date ${date}`,
  `node docs/seo/export-page-td.mjs --date ${date} --check`,
  "```",
  "",
  "The exporter is independent of the working directory. It requires the project's installed TypeScript dependency; on PowerShell use `node.exe` if a shell shim is restricted. Change `--date` for a new snapshot. The default date remains `2026-10-17` so the initial delivery can be regenerated deterministically.",
  "",
  "## Google Search Central references",
  "",
  "- [Title links](https://developers.google.com/search/docs/appearance/title-link): descriptive titles, keyword stuffing, and how displayed titles are generated.",
  "- [Meta descriptions and snippets](https://developers.google.com/search/docs/appearance/snippet): page-specific descriptions and device-dependent truncation.",
  "- [Supported and unsupported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags): Google does not use the meta-keyword tag for indexing or ranking.",
  "- [Noindex and crawler access](https://developers.google.com/search/docs/crawling-indexing/block-indexing): a crawler must be allowed to fetch the page to see noindex.",
  "",
  "## Complete registry table",
  "",
  `| ${headers.join(" | ")} |`,
  "|---|---|---|---|---:|---|---:|---|---|",
  ...records.map((entry) => `| \`${mdCell(entry.path)}\` | ${mdCell(entry.primaryKeyword)} | ${mdArray(entry.secondaryKeywords)} | ${mdCell(entry.title)} | ${codepoints(entry.title)} | ${mdCell(entry.description)} | ${codepoints(entry.description)} | ${mdArray(entry.contentEvidence)} | ${mdArray(entry.notes)} |`),
  "",
  ...(warnings.length ? ["## Editorial length checks", "", ...warnings.map((warning) => `- ${warning}`), ""] : []),
].join("\n");
const outputs = [[`${basename}.csv`, csv], [`${basename}.md`, markdown]];
for (const [filename, content] of outputs) {
  const destination = path.join(directory, filename);
  if (check) {
    if (!fs.existsSync(destination) || fs.readFileSync(destination, "utf8") !== content) throw new Error(`Export is missing or stale: ${filename}. Run the exporter without --check.`);
  } else fs.writeFileSync(destination, content, "utf8");
}
console.log(JSON.stringify({ status: check ? "verified" : "exported", source: "src/app/data/page-seo.ts", date, entries: records.length, baseRoutes: baseCount, paginationViews: paginated.length, titleCodepointRange: [Math.min(...titleLengths), Math.max(...titleLengths)], descriptionCodepointRange: [Math.min(...descriptionLengths), Math.max(...descriptionLengths)], csvEncoding: "UTF-8 with BOM", files: outputs.map(([filename]) => path.relative(root, path.join(directory, filename)).replaceAll("\\", "/")), warnings }, null, 2));

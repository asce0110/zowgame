import { existsSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

// Deliberately bounded: this checks the atlas release surface, not the whole repo.
// Run from any working directory: node docs/qa/check-atlas-types.mjs
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const scope = [
  "src/app/data/atlas.ts",
  "src/app/data/level-select.ts",
  "src/app/data/page-seo.ts",
  "src/app/data/all-the-gold-in-fort-locks.ts",
  "src/app/HomePage.tsx",
  "src/app/components/atlas-cards.tsx",
  "src/app/components/atlas-shell.tsx",
  "src/app/components/atlas-status.tsx",
  "src/app/components/level-select.tsx",
  "src/app/components/site-header.tsx",
  "src/app/components/game-cover.tsx",
  "src/app/components/schema-jsonld.tsx",
  "src/app/components/seo-head.tsx",
  "src/app/components/content-editor.tsx",
  "src/app/components/fishes-guide-page.tsx",
  "src/app/components/krillion-game-page.tsx",
  "src/app/components/hood-warfare-2-page.tsx",
  "src/app/components/sub-page-layout.tsx",
  "src/app/lib/seo.ts",
  "src/app/lib/seo-routes.ts",
  "src/app/lib/game-seo.ts",
  "app/page.tsx",
  "app/layout.tsx",
  "app/games/page.tsx",
  "app/games/aion-2/steam-launch-stats/page.tsx",
  "app/guides/page.tsx",
  "app/updates/page.tsx",
  "app/error.tsx",
  "app/not-found.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "app/privacy/page.tsx",
  "app/games/[slug]/page.tsx",
  "app/games/[slug]/guide/page.tsx",
  "app/games/[slug]/faq/page.tsx",
  "app/games/[slug]/walkthrough/page.tsx",
];
// Include any final directory error/layout boundaries without requiring an experiment to remain.
for (const directory of ["games", "guides", "updates"]) {
  for (const file of ["layout.tsx", "error.tsx", "not-found.tsx"]) {
    const candidate = `app/${directory}/${file}`;
    if (existsSync(resolve(root, candidate))) scope.push(candidate);
  }
}
const roots = scope.map((file) => resolve(root, file));
const missing = roots.filter((file) => !existsSync(file));
if (missing.length) throw new Error("Missing scoped files: " + missing.map((file) => relative(root, file)).join(", "));
const config = ts.readConfigFile(resolve(root, "tsconfig.json"), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config || {}, ts.sys, root);
const configErrors = [...(config.error ? [config.error] : []), ...parsed.errors];
const program = ts.createProgram({ rootNames: roots, options: { ...parsed.options, incremental: false, noEmit: true } });
const rootSet = new Set(roots);
const diagnostics = ts.getPreEmitDiagnostics(program).filter((item) => item.category === ts.DiagnosticCategory.Error);
const scoped = diagnostics.filter((item) => !item.file || rootSet.has(resolve(item.file.fileName)));
const outside = diagnostics.filter((item) => item.file && !rootSet.has(resolve(item.file.fileName)));
const failures = [...configErrors, ...scoped];
console.log(JSON.stringify({
  status: failures.length ? "failed" : "passed",
  checkedFiles: scope.length,
  scopedErrors: scoped.length,
  configurationErrors: configErrors.length,
  excludedDependencyErrors: outside.map((item) => ({ file: relative(root, item.file.fileName).replaceAll("\\", "/"), code: item.code })),
}, null, 2));
if (failures.length) {
  console.error(ts.formatDiagnostics(failures, { getCanonicalFileName: (file) => file, getCurrentDirectory: () => root, getNewLine: () => "\n" }));
  process.exitCode = 1;
}

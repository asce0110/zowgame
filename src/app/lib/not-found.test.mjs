import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const filename = path.resolve(import.meta.dirname, "../../../app/not-found.tsx");
let notFound = {};
let shellProps;
if (fs.existsSync(filename)) {
  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const module = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === "next/link") return ({ children, href, ...props }) => React.createElement("a", { href, ...props }, children);
    if (specifier.endsWith("/atlas-shell")) return { AtlasShell: (props) => { shellProps = props; return React.createElement("main", null, props.children); } };
    return require(specifier);
  };
  new Function("require", "module", "exports", compiled)(localRequire, module, module.exports);
  notFound = module.exports;
}

function renderError() {
  assert.equal(typeof notFound.default, "function", "A custom server-renderable 404 component must exist");
  return renderToStaticMarkup(React.createElement(notFound.default));
}

test("the 404 has one meaningful H1 and direct game/guide recovery links in SSR HTML", () => {
  const html = renderError();
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(headings.length, 1);
  assert.equal(headings[0][1], "This page isn’t in the atlas.");
  assert.match(html, /href="\/games\/"/);
  assert.match(html, /href="\/guides\/"/);
  assert.match(html, /class="atlas-empty"/);
});

test("error metadata overrides the root title and index flag without inventing a canonical", () => {
  assert.ok(notFound.metadata, "The error page must supply its own metadata");
  assert.match(notFound.metadata.title.absolute, /404.*ZowGame/);
  assert.equal(notFound.metadata.robots.index, false);
  assert.equal(notFound.metadata.robots.follow, true);
  assert.ok(notFound.metadata.description);
  assert.equal(notFound.metadata.alternates?.canonical, undefined);
});

test("the 404 uses the existing atlas shell with the question route row hidden", () => {
  renderError();
  assert.equal(shellProps.active, "games");
  assert.equal(shellProps.showRoute, false);
  assert.equal(shellProps.hardNavigation, true, "404 recovery must reload the target segment to clear a query-level not-found boundary");
});

function directoryMetadata(directory) {
  const previousLoader = Module._extensions[".ts"];
  Module._extensions[".ts"] = (module, file) => module._compile(ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, file);
  let atlas, seo, pageSeo;
  try { atlas = require("../data/atlas.ts"); seo = require("./seo.ts"); pageSeo = require("../data/page-seo.ts"); }
  finally { if (previousLoader) Module._extensions[".ts"] = previousLoader; else delete Module._extensions[".ts"]; }
  const file = path.resolve(import.meta.dirname, `../../../app/${directory}/page.tsx`);
  const source = fs.readFileSync(file, "utf8");
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const generator = ast.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === "generateMetadata");
  const code = ts.transpileModule(`${generator.getText(ast).replace(/^export\s+/, "")}\nreturn generateMetadata;`, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const dependencies = { ...atlas, getDirectoryTd: pageSeo.getDirectoryTd, createPageMetadata: seo.createPageMetadata, notFound: () => { throw new Error("PAGE_NOT_FOUND"); } };
  return new Function(...Object.keys(dependencies), code)(...Object.values(dependencies));
}

test("directory metadata rejects missing pages before emitting indexable page metadata", async () => {
  for (const directory of ["games", "guides"]) {
    const generate = directoryMetadata(directory);
    await assert.rejects(generate({ searchParams: Promise.resolve({ page: "999" }) }), /PAGE_NOT_FOUND/);
    await assert.rejects(generate({ searchParams: Promise.resolve({ q: "Harry Potter", page: "2" }) }), /PAGE_NOT_FOUND/);
  }
});

test("valid pagination and empty first-page searches retain their canonical and noindex rules", async () => {
  const generate = directoryMetadata("guides");
  const second = await generate({ searchParams: Promise.resolve({ page: "2" }) });
  assert.equal(second.alternates.canonical, "https://zowgame.com/guides/?page=2");
  assert.equal(second.robots.index, true);
  for (const query of ["Harry Potter", "zzzznomatch"]) {
    const filtered = await generate({ searchParams: Promise.resolve({ q: query }) });
    assert.equal(filtered.alternates.canonical, "https://zowgame.com/guides/");
    assert.equal(filtered.robots.index, false);
  }
});

const base = process.env.ZOW_NOT_FOUND_BASE_URL;
for (const route of ["/this-page-is-not-in-the-atlas/", "/guides/?page=999", "/games/?page=999", "/guides/?q=Harry%20Potter&page=2", "/games/not-a-published-game/"]) {
  test(`HTTP ${route} preserves 404/noindex and separately reports SSR recovery`, { skip: !base }, async (context) => {
    const url = new URL(route, base);
    assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(url.hostname), "Only a local verification server is allowed");
    const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(30000) });
    const raw = await response.text();
    const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
    assert.equal(response.status, 404, "An error page must not become a 200 soft 404");
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
    assert.match(html, /<title>404[^<]*ZowGame<\/title>/);
    assert.match(html, /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/);
    assert.doesNotMatch(html, /<meta[^>]*name="robots"[^>]*content="index(?:,|\s|")/);
    if (route === "/this-page-is-not-in-the-atlas/" || headings.length > 0) {
      assert.equal(headings.length, 1);
      assert.equal(headings[0][1], "This page isn’t in the atlas.");
      assert.match(html, /href="\/games\/"/);
      assert.match(html, /href="\/guides\/"/);
    } else {
      // Next 15's getErrorRSCPayload can return an empty SSR error document for
      // a matched route's notFound(). RSC data is explicitly not SSR markup.
      assert.match(html, /__next_error__/);
      assert.ok(raw.includes("This page isn’t in the atlas."), "Brand fallback must still be present in the RSC payload");
      context.diagnostic("KNOWN LIMITATION: matched-route 404 has no H1/recovery links in raw SSR HTML. Brand fallback exists only in RSC data; browser hydration has not been verified by this HTTP test.");
    }
  });
}

# ZowGame

ZowGame helps players discover browser, download and tabletop games, with independent guides and links to their original creators.

The library includes **Cobb Can Move**, **Don't Sleep With The Fishes**, **All the Gold in Fort Locks**, and MinaLima's physical **Defenders of Hogwarts** board game.

## Defenders of Hogwarts player guide

[Read the Defenders of Hogwarts rules and player guide](https://www.zowgame.com/games/defenders-of-hogwarts/).

The guide identifies MinaLima's physical Harry Potter game and explains setup, House and Dark Arts turns, movement, resource collection and win conditions. Forty searchable answers cover common rules questions, editions, ordering and support. Printed-page references link to the official rulebook, and planning suggestions are marked as deductions from the rules rather than playtest results.

Readers searching for "Harry Potter Defenders RPG game" can also check the distinction between this tabletop game and a digital RPG. Publisher availability and delivery notes are dated October 12, 2026; follow the linked official sources for current information.

## Live URLs

Production:

```text
https://zowgame.com/
```

Featured game page:

```text
https://zowgame.com/games/cobb-can-move/
```

## Project Purpose

ZowGame is designed as a lightweight browser game platform.

The homepage introduces the ZowGame brand and sends players to the featured game.

Each game page is built as a dedicated playable page with the game embed, controls, gameplay explanation, tips, rules, FAQ, and related game information.

## Current Game

| Game | Route | Genre | Status |
|---|---|---|---|
| Cobb Can Move | `/games/cobb-can-move/` | Pixel Survival Horror | Featured |

## Recommended URL Structure

```text
/
```

Homepage and platform entry page.

```text
/games/cobb-can-move/
```

Main playable game page for Cobb Can Move.

Future examples:

```text
/horror-games/
/browser-games/
/game-name/
```

## Page Responsibilities

| Page | Purpose |
|---|---|
| `/` | Brand homepage, featured game, quick entry |
| `/games/cobb-can-move/` | Main game page, gameplay content, SEO landing page, iframe embed |

## Homepage Content Strategy

The homepage should focus on ZowGame as a player-facing browser game site.

Recommended homepage sections:

```text
Header
Hero
Featured Game
Why Play on ZowGame
Footer
```

Recommended homepage H tags:

```text
H1: Play Fast Browser Games Online
H2: Featured Game
H3: Cobb Can Move
H2: Why Play on ZowGame
H3: Instant Browser Play
H3: Clear Controls and Tips
H3: Focused Game Pages
```

Avoid showing internal SEO language on the public homepage, such as:

```text
SEO landing pages
high-intent search traffic
canonical strategy
sitemap control
URL strategy
```

Use player-facing language instead:

```text
Fast browser play
No download required
Clear controls
Helpful tips
Instant game access
```

## Cobb Can Move Page Structure

Recommended sections for `/games/cobb-can-move/`:

```text
H1: Cobb Can Move

Game iframe or play area

H2: About Cobb Can Move

H2: How to Play Cobb Can Move

H2: Cobb Can Move Controls

H2: Tips & Tricks to Survive Cobb Can Move

H2: Cobb's Changing Rules

H2: What Players Are Saying

H2: Cobb Can Move FAQ
```

## SEO Metadata

The canonical source for page titles and descriptions is [`src/app/data/page-seo.ts`](src/app/data/page-seo.ts). Its `PAGE_TD` registry covers 37 base routes and two real, unfiltered guide-pagination views: `/guides/?page=2` and `/guides/?page=3`. The shared `createPageMetadata` helper resolves page copy by canonical path; keep the visible page introduction and source evidence consistent with that copy.

Each entry records a primary search intent, secondary planning terms, the full branded title, description, content evidence and editorial cautions. Keyword fields are editorial planning only: do not render a meta-keywords tag. Google documents that the [meta-keyword tag has no effect on indexing or ranking](https://developers.google.com/search/docs/crawling-indexing/special-tags).

The writing target is 45–60 Unicode code points for a full title (65 maximum, including ` | ZowGame`) and 140–160 for a description (160 maximum). These are internal editorial standards, not Google's hard limits. Google may generate a different [title link](https://developers.google.com/search/docs/appearance/title-link) or [snippet](https://developers.google.com/search/docs/appearance/snippet); this work does not promise indexing, a ranking position or ranking improvement.

Base pages use their canonical route, for example `https://zowgame.com/games/cobb-can-move/`. Valid unfiltered pagination has a self-referencing canonical and crawlable links. Search, genre, format, topic and other filtered/invalid parameter variants remain `noindex,follow` with the clean directory canonical; homepage parameter variants use the root canonical. Out-of-range pagination must return a real 404. Keep these pages crawlable so Google can [read their noindex directive](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

To update metadata:

1. Review the actual page, its visible H1/intro and source boundaries.
2. Edit the corresponding `PAGE_TD` entry. Preserve a distinct purpose for an overview, beginner guide, FAQ, reference page or news page. Do not advertise missing answers, unverified game data or playable copies that the page does not provide.
3. For a new page, also create its real route and update route/sitemap registration. Registry copy alone does not create a page.
4. Regenerate the delivery exports and check they match the registry:

```sh
node docs/seo/export-page-td.mjs --date 2026-10-17
node docs/seo/export-page-td.mjs --date 2026-10-17 --check
```

The exporter reads the registry directly and counts code points with `Array.from(text).length`. It creates the [complete Markdown table](docs/seo/page-td-2026-10-17.md) and [UTF-8 BOM CSV](docs/seo/page-td-2026-10-17.csv), including keywords, lengths, landing evidence and cautions. Use a new `--date` for a later snapshot; do not edit generated files or the historical draft JSON files as a substitute for updating the registry.

## Game Embed

The Cobb Can Move page can embed the browser game through an iframe.

Example:

```html
<iframe
  src="https://s.cobb-can-move.com/games/cobb-can-move/index.html"
  title="Cobb Can Move"
  width="100%"
  height="650"
  loading="lazy"
  allow="fullscreen; gamepad; autoplay"
  allowfullscreen>
</iframe>
```

Make sure the playable iframe is placed inside the main game page and not used as the primary SEO URL.

The SEO page should be:

```text
https://zowgame.com/games/cobb-can-move/
```

The iframe URL should only be treated as the game runtime source.

## Content Guidelines

Write for players first.

Keep game pages useful, clear, and easy to scan.

Use original descriptions, tips, FAQs, and guide content.

Do not copy full text from other game websites.

Do not claim to be the official developer or publisher unless authorized.

Credit the original creator where appropriate.

Recommended credit text:

```text
Cobb Can Move was created by abho and contributors. Visit the official itch.io page for the original release, downloads, and developer updates.
```

Official source:

```text
https://abho.itch.io/cobb-can-move
```

## Technical SEO Checklist

Before launch, confirm the following:

```text
Homepage has one H1.
Game page has one H1.
Each page has a unique title tag.
Each page has a unique meta description.
Canonical tags point to the preferred HTTPS URLs.
Sitemap includes only indexable pages.
Robots.txt does not block important pages.
Images have descriptive alt text.
Game iframe does not replace crawlable page content.
Mobile layout does not hide important text.
Game page includes helpful text below the iframe.
```

Recommended sitemap entries:

```xml
<url>
  <loc>https://zowgame.com/</loc>
</url>
<url>
  <loc>https://zowgame.com/games/cobb-can-move/</loc>
</url>
```

Recommended robots.txt:

```txt
User-agent: *
Allow: /

Sitemap: https://zowgame.com/sitemap.xml
```

## Image Guidelines

Recommended cover image filename:

```text
cobb-can-move-cover.webp
```

Recommended alt text:

```text
Cobb Can Move cover art with Cobb chasing the player
```

Recommended gameplay screenshot alt text:

```text
Cobb Can Move gameplay in a dark dungeon
```

```text
Cobb Can Move furnace and coal survival gameplay
```

```text
Cobb Can Move monster chasing the player
```

## Structured Data

Recommended schema types:

```text
VideoGame
BreadcrumbList
ImageObject
```

Use `FAQPage` only if the FAQ content is visible on the page and written for users.

Avoid fake ratings, fake reviews, or unsupported aggregate rating data.

## Development

Install dependencies:

```bash
npm install
```

Run local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Update these commands if the project uses a different framework or deployment setup.

## Deployment Notes

Recommended production domain:

```text
https://zowgame.com/
```

Preferred canonical format:

```text
https://zowgame.com/
https://zowgame.com/games/cobb-can-move/
```

Redirect these variants to the canonical URLs:

```text
http://zowgame.com/
https://www.zowgame.com/
https://zowgame.com/games/cobb-can-move
https://www.zowgame.com/games/cobb-can-move/
```

## License And Credits

ZowGame website code belongs to the site owner.

Cobb Can Move and related game assets belong to their respective creator and rights holders.

Cobb Can Move official page:

```text
https://abho.itch.io/cobb-can-move
```

## Status

Current status:

```text
Single featured game site
Homepage active
Cobb Can Move page active
More browser games can be added later
```

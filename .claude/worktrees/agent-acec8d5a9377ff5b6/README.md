# ZowGame

ZowGame is a browser game website focused on fast online play, clear game information, and helpful player guides.

The site currently features **Cobb Can Move**, a pixel survival horror browser game where players explore a dark dungeon, collect coal, keep the light alive, and survive Cobb as the rules change.

## Live URLs

Production:

```text
https://zowgame.com/
```

Featured game page:

```text
https://zowgame.com/cobb-can-move/
```

## Project Purpose

ZowGame is designed as a lightweight browser game platform.

The homepage introduces the ZowGame brand and sends players to the featured game.

Each game page is built as a dedicated playable page with the game embed, controls, gameplay explanation, tips, rules, FAQ, and related game information.

## Current Game

| Game | Route | Genre | Status |
|---|---|---|---|
| Cobb Can Move | `/cobb-can-move/` | Pixel Survival Horror | Featured |

## Recommended URL Structure

```text
/
```

Homepage and platform entry page.

```text
/cobb-can-move/
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
| `/cobb-can-move/` | Main game page, gameplay content, SEO landing page, iframe embed |

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

Recommended sections for `/cobb-can-move/`:

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

Homepage:

```html
<title>ZowGame - Play Free Browser Games Online</title>
<meta name="description" content="Play fast, free browser games on ZowGame. Start with Cobb Can Move, a tense pixel horror game you can launch instantly online.">
<meta name="keywords" content="ZowGame, free browser games, online games, play games online, horror browser games, Cobb Can Move">
<link rel="canonical" href="https://zowgame.com/">
```

Cobb Can Move page:

```html
<title>Cobb Can Move - Play Online Free in Browser</title>
<meta name="description" content="Play Cobb Can Move online for free. Survive a dark pixel dungeon, collect coal, keep the light alive, and escape Cobb as the rules change.">
<meta name="keywords" content="Cobb Can Move, play Cobb Can Move online, Cobb Can Move game, Cobb Can Move free, browser horror game, survival horror game, pixel horror game">
<link rel="canonical" href="https://zowgame.com/cobb-can-move/">
```

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
https://zowgame.com/cobb-can-move/
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
  <loc>https://zowgame.com/cobb-can-move/</loc>
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
https://zowgame.com/cobb-can-move/
```

Redirect these variants to the canonical URLs:

```text
http://zowgame.com/
https://www.zowgame.com/
https://zowgame.com/cobb-can-move
https://www.zowgame.com/cobb-can-move/
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

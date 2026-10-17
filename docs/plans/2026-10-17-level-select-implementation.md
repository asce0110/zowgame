# ZowGame Level Select implementation

## Confirmed direction
The user selected the refined game-selection reference and authorized development. White reading surfaces, black condensed italic display type, lime selected states, a diagonal real-game scene, and a six-slot featured roster define the direction. English remains the site language. Existing game content, routes and automatic source feeds are preserved.

## Implementation
- Server-rendered homepage composition in `src/app/HomePage.tsx`; small interactive islands in `src/app/components/level-select.tsx`.
- `src/app/data/level-select.ts` owns the curated scenes, real quick-guide destinations, selected-game resolution, topic preview and native fallback URLs.
- Six curated slots are independent of the full catalog. The game directory continues to use search, genre/format filters and pagination. A 106-entry data test guards this distinction.
- Game selection updates scene, title, overview and three real chapter links. Arrow keys, Home and End operate the roster; native links support reload, opening a new tab and JavaScript-free navigation. No autoplay.
- Topic links render their initial results on the server and preserve selected-game state during client interaction. Empty topics provide a Featured recovery and full-library link.
- One GET search in the shared header searches the full guide catalog, including AION 2. Game/guide directories retain real pagination and existing query semantics.
- `src/styles/level-select.css` defines color, typography, spacing, radius, shadow and motion tokens and the homepage layout. `level-select-shell.css` supplies shared chrome and directories; `atlas-guide.css` supplies readable article surfaces.
- Local Barlow Condensed and Manrope fonts retain their licenses. Hero and small cover variants are converted from existing official assets to WebP. The favicon extends the existing repository Z artwork with the new palette.
- Artwork loading and failure states retain guide access and provide a retry. Existing offline notification and route recovery remain available. Motion respects reduced-motion preferences.

## SEO contract
The homepage remains dynamic SSR. Game and chapter pages retain server-generated content. One meaningful H1, natural page-specific metadata, production canonicals, safe source-backed JSON-LD, robots and the 37 canonical sitemap routes remain in place. Home selection/filter variants canonicalize to `/` and use noindex/follow. Unfiltered directory pagination remains indexable and self-canonical. No invented ratings, routes, article dates or statistics are introduced.

## Extension notes
Add verified game records and published chapters to the existing registry before adding catalog entries. Feature a game by adding its scene descriptor with actual assets and three existing destinations; keep the featured roster curated rather than displaying the full catalog. Update tokens instead of introducing isolated colors. Preserve all state labels, native hrefs and keyboard focus behavior when extending components. Changing the approved art direction requires a new visual target, not arbitrary component restyling.

## Verification
See project-root `design-qa.md` for the final paired visual comparisons and browser evidence, and `docs/qa/level-select-*2026-10-17*` for HTTP, type and test results. The final preview uses a production build on localhost:3000. No deployment or Git push is included in this request.

# ZowGame Quest Atlas implementation

Approved target: `exec-6e8608bb-bcd2-452a-b949-98a55d40ff72.png`, a midnight navy and brass atlas with six equal cover cards in a three-column, two-row grid. Fixed genre navigation scales independently from the number of games. The game grid and thumbnail article list are separate. English remains the site language.

The server renders the homepage, game library, guide directory, article text and navigational links. GET search/filter forms and real pagination work without JavaScript. Search aliases connect player vocabulary such as Harry Potter with the actual physical tabletop game. Existing game and guide URLs remain available. Small client components handle artwork recovery and offline feedback only.

SEO: truthful unique metadata; explicit canonicals; indexable unfiltered directories and self-canonical pagination; noindex/follow for search/faceted variants; sitemap derived from supported routes; server-emitted JSON-LD without unverifiable ratings or fabricated dates. Official feeds retain their source/freshness boundaries. No ranking guarantee or invented content volume.

Steps: typed catalog and server directories; optimized independent atlas decoration/real covers/local fonts; shared semantic UI and article shell; metadata/route registry/sitemap/robots; production build and response-level checks; desktop/mobile visual comparison and functional QA. Keep a local preview running for user review.

Out of scope: unverified game facts, changes to live feeds, deployment or GitHub push.

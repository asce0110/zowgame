# Design QA — ZowGame editorial homepage

Date: 2026-10-11. This report supersedes the first implementation review.

## Art direction

Selected direction 1: a game editorial desk. Charcoal/pine surfaces, bone-white poster typography, lime actions, a large castle/map feature and a compact recommendation rail. Anton 400 supplies the main headline; Barlow Condensed, DM Sans and JetBrains Mono provide the heading, reading and utility layers. The functional signature is the next-move navigation: discover games, filter tabletop introductions, or jump to actual player guides. Hover scale is restrained; reduced-motion removes transitions. Real raster artwork supplies the atmosphere.

## Current comparison evidence

- Source visual truth: `C:/Users/Administrator/.codex/generated_images/01a1147b-eae2-7dd2-99d0-cbc7a1f45493/exec-e9a4bee7-0268-4bec-8159-d2a70e128716.png` (1229 × 1280).
- Implementation URL: `http://127.0.0.1:3000/`.
- Latest browser render: `C:/Users/Administrator/.codex/visualizations/2026/10/07/01a1147b-eae2-7dd2-99d0-cbc7a1f45493/homepage-final.png` (1219 × 1562).
- Viewport: 1229 × 1280; default all-games state; four games and all images loaded. The browser scrollbar accounts for the 10 px content-width difference.
- Full comparison: `C:/Users/Administrator/.codex/visualizations/2026/10/07/01a1147b-eae2-7dd2-99d0-cbc7a1f45493/comparison-full.png`. Reference left, latest browser render right, equal 700 px widths.
- Focused comparison: `C:/Users/Administrator/.codex/visualizations/2026/10/07/01a1147b-eae2-7dd2-99d0-cbc7a1f45493/comparison-hero.png`. Both features normalized to 842 px width, preserving their natural heights.
- Both combined images were opened and reviewed after the final poster refinements.
- Latest mobile capture: 390 × 844 viewport, 380 × 3712 content. Focused evidence: `C:/Users/Administrator/.codex/visualizations/2026/10/07/01a1147b-eae2-7dd2-99d0-cbc7a1f45493/mobile-preview.png`. Tablet 768 px and small phone 320 px widths were also checked.

## Findings and patches

The first review accepted excessive layout drift. This iteration fixes the following:

- P2 typography: replaced the broad first-version display treatment with Anton 400 and a tighter two-line rhythm. Hero height is now 474.8 px; the source is 454 px.
- P2 composition: converted separate image/text cards into four compact poster cards and removed a repeated standalone guide section. Full-page height dropped from 2174 px to 1562 px at the same viewport.
- P2 hierarchy: added the lime wordmark accent, active navigation underline, outlined header search, larger action type and bone-white intent icons.
- P2 navigation: `#guides` now points to the actual three-guide START HERE list, rather than recent updates.
- P2 focus behavior: Browse all games uses focus with preventScroll. Browser verification measured 333 px scroll before and after the action.
- P2 readability: removed hard horizontal poster overlay edges in favor of a continuous dark gradient; increased desktop poster introductions to 13 px with 1.5 line-height. Mobile reading copy remains 14 px.
- P2 boot state: search and local filter controls wait for client hydration. The search has a deliberate loading placeholder and disabled state.
- P2 recovery: explicit 44 px clear-search control, visible image-failure copy above poster text, inset focus outlines that survive card clipping, and 44 px tabletop wordmark targets.
- Prior fixes retained: distinct browser/download/tabletop CTAs, mobile navigation, image errors occurring before hydration, and first-session wording that does not promise a verified complete rulebook.

No remaining actionable P0/P1/P2 website findings after the final combined-image review. Pink floating browser-extension controls are injected outside the website and are excluded from product QA.

## Fidelity surfaces

- **Fonts/typography:** Anton 400 is confirmed loaded in the browser. Barlow Condensed and DM Sans maintain consistent heading/body roles. The main title is slightly wider than the raster source, an acceptable P3 optical difference. Desktop poster body is 13 px; mobile is 14 px.
- **Spacing/layout rhythm:** asymmetric feature/rail, ruled intent strip, four equal desktop posters and split update region preserve direction 1. The source contains three fictional cards; the implementation contains four real games plus functional format filters. Breakpoints at 1100/860/600 px retain narrative order. No horizontal overflow at desktop, 768, 390 or 320 px.
- **Colors/tokens:** charcoal `#111716`, bone `#f0eee3`, lime `#d9ef84` and named muted/focus/success/warning/danger tokens form a single system. Gradients serve text readability over real photos. Contrast and focus remain visible in default, hover and keyboard states.
- **Image quality:** the 185 KB castle/map WebP follows the selected concept; real game screenshots replace invented concept artwork. MinaLima product photography identifies the physical game. Editorial imagery is labeled separately. Poster crop and text backing are coherent across all four games.
- **Copy/content:** the exact requested keyword is visible in the hero and searchable catalog. The tabletop topic contains an overview, four first-session preparation steps, dated availability/price/shipping/language notes, seven FAQs and four official sources. It does not claim complete verified tactical rules, a playable online version, current stock or a first-hand review score.

## Verification

- Production build passed after the final CSS changes, generating 27 pages including `/games/defenders-of-hogwarts/`.
- Exact keyword search returns Defenders; Browser returns two games; Tabletop returns one. Clear search, no-match guidance, show-all recovery and category reset passed.
- Guide navigation reaches three actual guide links. Browse-all preserves scroll. Keyboard focus has a visible 2 px solid outline.
- Mobile homepage navigation opens the actual tabletop route; first-session anchor and FAQ expansion passed. Topic contains seven FAQs and four source links and has no horizontal overflow.
- Offline warning appears and clears on reconnection. An actual missing image produces usable fallback text above poster copy; reload restores every image with nonzero natural width.
- Browser lazy loading reserves image dimensions. Loading, failure and empty states are contextual and on brand.
- Canonical, Article/Game/FAQ schema, sitemap and static generation align with the physical-game overview. No fake rating, VideoGame or InStock claims. Tabletop duplicate `/guide/` and `/faq/` routes remain excluded.
- `git diff --check` passed. No new dependency was added.
- Next configuration skips lint/type gates. Separate TypeScript checking still reports three pre-existing errors in `particle-bg.tsx` and `game-input.test.ts`; no modified file appears in that output. Full repository type validation is not claimed.

## Extension notes

New games should use the shared GameRecord and accessMode classification. Extend named tokens rather than one-off colors; retain honest CTA behavior for browser, download and tabletop formats. Add complete tabletop strategy only after official rules and actual gameplay are verified.

final result: passed

## 2026-10-12 — Defenders player guide completion

Scope: extend the selected editorial direction and existing tabletop topic into an actionable guide. The pine, bone and lime palette, condensed display type, ruled index and progress compass remain the shared visual language. Four intent links route readers to identification, setup, rules questions and buying/support. No new route or asset dependency was introduced.

### Content and source gate

- Six rulebook sections contain 42 original rule explanations: setup, House turn, Dark Arts turn, movement, resources and ending.
- Forty searchable FAQs cover game identification, standard rules, buying, delivery, missing components, returns and support; 11 glossary entries and five explicitly inferred strategy notes supplement the rules.
- Source: MinaLima's public English rulebook, retrieved 2026-10-12. Printed pages 6–23 were rendered for setup, movement, item, Loyalty, turn and end-condition verification. Independent audit confirmed personal two-shield victory, asymmetric Replenish order, one Main Action, one bump-acquisition reward, Room of Requirement participation/closure, Event order and the final-hand exceptions. The 3/2/1 target description follows the Location Card acquisition timing without inventing an automatic later reduction or permanent locking rule.
- The publisher FAQ was checked for prices, language, delivery and return/support terms. The original campaign and estimated shipping windows are dated. No live stock, currently open late pledges, solo rules, online edition, tested winning strategy or first-hand review is claimed.
- Each rule section links to printed source pages; each FAQ contains direct actionable source/support links. Unresolved card combinations have an explicit publisher-ruling path. Full card text and all possible combinations are not reproduced.

### Live UI and interaction gate

- Opened and visually inspected desktop hero, rule brief, FAQ and 390 px mobile hero/setup/FAQ captures. The new sections preserve the existing heading/body pairing, borders, spacing and contrast. The combined `defenders-home-comparison.png` compares prior/current 1219 × 1562 home captures in the same state: only updated guide copy, CTAs and update date differ; grid rhythm and imagery remain aligned.
- Thirteen section anchors resolve. The sticky desktop compass scrolls when needed. A 44 px mobile Contents link returns from deep FAQ content to the directory; navigating from there to the Dark Arts section passed.
- No horizontal overflow at 1229, 768, 390 or 320 px. Touch filters and clear-search controls are at least 44 px. Native details expand by keyboard; filter pressed states, labeled search, visible 2 px focus and live result count are present.
- Verified natural searches: `where to buy` (2 answers), `How do I get a refund` (1), `missing pieces` (1), `setup` (1), `How do I win?` (3), `2 shields` (3), and `Loyalty 5` (2). Singular/plural shield results match. Complete-word matching prevents `win` from matching shipping `window`. Non-Latin unknown queries show the deliberate empty state instead of all answers. Show-all clears query/category and restores input focus.
- A missing hero image showed useful fallback copy; Retry artwork restored nonzero image dimensions. Offline warning appeared, local question search remained usable, and reconnection cleared the warning. No page errors or hydration errors were observed.

### Production and discovery gate

- Final production build succeeded and generated 27 routes. Directly inspected generated HTML after stripping scripts: all 40 native FAQ details and rule sections are present. Content is available before client hydration.
- Canonical stays `https://zowgame.com/games/defenders-of-hogwarts/`; Article dateModified and sitemap lastmod are 2026-10-12. FAQ schema includes the same 40 visible questions. No tabletop VideoGame, fake rating or InStock offer is emitted.
- Homepage hero, game card and update entry lead to the expanded guide. `git diff --check` passed.
- Separate TypeScript validation reports the same three existing diagnostics in `particle-bg.tsx` and `game-input.test.ts`; none reference changed files. Next configuration still skips repository lint/type gates, so a fully clean type check is not claimed.

Extension: add new verified questions with their direct source links in the shared data. Extend search term normalization only for real reader queries. Keep official rules, editorial deductions and dated buying information distinguishable. Re-check the source date and source links when publisher rules or availability change.

2026-10-12 guide result: passed, with the existing repository type-check limitation above.

## 2026-10-12 — AION 2 Steam launch stats

Scope: an existing-homepage entry and `/games/aion-2/steam-launch-stats/`. The first release uses official Steam current-player, Most Played and official-announcement feeds; complete historical charts open at SteamDB. There is no local historical sampling database.

Art direction: extend the portal's pine, bone and lime palette with its existing Barlow Condensed / DM Sans / JetBrains Mono pairing. The signature is a large, dated current-player reading beside separately labeled daily and historical peaks. Ruled sections, a numbered directory and restrained link/refresh feedback preserve the editorial rhythm. Shared tokens drive focus, loading, warning and surface states; motion respects reduced-motion preferences.

Data and content: AppID 3393110 only. Steam/PURPLE, main game/Playtest and test/early access/global launch are explicitly distinguished. The 397,905 historical reference is attributed to SteamDB and remains dated October 5, checked October 12, 2026; it is not presented as a live all-time record or a verified first-24-hour maximum. The page includes a launch timeline, ten FAQs, source links and dated official news titles with short previews.

Verification:

- Final production Next build succeeded: 28 prerendered pages, the new static topic and a dynamic `/api/aion-2` route. The bundled pnpm wrapper attempted a modules purge without a TTY, so validation used the same installed Next binary directly with `ZOW_BUILD_DIR=.next-verify`, preserving the running dev server.
- Ten server tests passed, covering cache/in-flight reuse, stale expiry/recovery, independent partial failures, absent/invalid chart entries, safe integer counts including legitimate zero, upstream HTTP/JSON failure, official news URL/source validation and empty feeds.
- Actual local API returned 200 with ready current-player and daily-peak readings plus six official announcements. Observation time and Steam chart update time are separate. Each source uses a ten-minute process cache; a failed refresh retains its original time for up to an hour. This cache is not historical storage and does not persist across server instances.
- HTTP HTML contains the exact topic, canonical, ten visible native FAQ details and the same ten-question FAQ schema. The sitemap includes the canonical topic. API responses use no-store and noindex headers.
- Live browser checks confirmed the homepage entry and AION search result, existing Browser (two games), Tabletop (one game) and all-game (four games) filters, section navigation and native FAQ keyboard expansion with a visible 2 px focus outline. Both homepage and topic had no horizontal overflow at desktop, tablet and 320 px; 390 px homepage was also checked.
- Homepage requests have a 15-second client timeout with failure/retry recovery; topic handles loading, offline, partial feeds, empty news and old readings. Network/source failure paths were verified in service tests; device-offline UI was not forced in this browser run.
- SteamDB's standalone licensed widget displayed previously, but the actual topic iframe failed with connection reset. The final release removes the iframe and uses a direct full-history link, matching the confirmed first-release scope and avoiding a browser error panel.
- Independent review found no P1 issues. The homepage timeout finding was corrected; the suspected narrow navigation overflow did not reproduce at 320 px. `git diff --check` passed. No dependency was added.
- Separate final TypeScript checking reports the same three pre-existing diagnostics in `particle-bg.tsx` and `game-input.test.ts`; none reference the new feature. Repository-wide clean typing/linting is not claimed because Next currently skips those gates.

Extension: add durable sampling only with an explicit storage and scheduled-collection plan. Never backfill unobserved historical points from a current-count endpoint. Keep source times, delayed/unavailable labels and statistical scope alongside future graphs; validate any third-party embed inside the actual topic before enabling it. These checks cover local validation before publication; production deployment is outside their scope.

## 2026-10-12 — AION 2 update explanations and player help

Scope: extend the existing stats topic so readers can understand official notices and complete common checks within ZowGame. The main keyword still targets Steam launch performance: current players, launch peak, the historical trend and release boundaries. Player troubleshooting is a supporting section after the data and news. The original art direction, fonts, tokens and large dated count remain in place.

Content:

- Five original, dated explanations cover six checked Steam notices: Nezekan resolved issues, transfer planning and Q&A, restrictions versus security locks, EU compensation, and new EU servers. Each has its direct source and a checked date. The six current feed headlines open their matching local explanation; future unreviewed notices keep their original source link.
- Eight searchable help guides cover login, PC launch/crashes, Block Codes, characters after account relinking, transfer availability, transfer preparation, account review and compensation. Official facts and the editorial order of checks are distinguished. Configuration requirements, published PDT application windows, the affected EU server list and the mailed chest contents are available locally.
- Nezekan's report is identified as resolved, not a current outage. Transfers open after the specified maintenance, not an invented midnight. The schedule retains PDT because the source's CEST/CET labels span Europe's clock change. No individual restriction reason, guaranteed repair, compensation deadline or confirmed delivery is invented.
- A blank support checklist can be copied or selected manually if copying fails. No inquiry is submitted by the site. Account decisions and recovery stay with the official support team.

Verification:

- Final isolated Next production build succeeded with 28 prerendered pages. Generated HTML contains five explanations, all 18 native questions, matching 18-question FAQ schema, the canonical and the help text before hydration. Every static fragment link resolves.
- Ten existing data-service tests passed. Actual local topic and API returned 200, with a ready dated Steam count and six official announcements.
- Separate final repository TypeScript validation reports only the same three existing errors in `particle-bg.tsx` and `game-input.test.ts`. New feature files have no diagnostics; Next still skips full lint/type gates.
- Live browser searches verified `I can’t log in`, `The game keeps crashing`, `I can’t find my character`, `How do I change servers?`, `Block Code 1005` and an unknown non-Latin query. The first relevant guide appears first for the crash, missing-character, transfer and Block Code cases. The empty state restores all help and focuses the input.
- Keyboard Enter expands a guide with a visible 2 px focus outline. A news-to-transfer link clears an Accounts filter and query, restores eight guides, opens the destination and moves focus to its heading. The support-checklist copy succeeded in the browser. Clipboard-denial recovery is implemented as visible selectable text but was not forced in this run.
- Desktop, 768 px, 390 px and 320 px layouts have no page-level horizontal overflow. Help controls measured at least 44 px. The three-column PC requirements table was replaced by labeled minimum/recommended rows below 560 px after narrow-screen inspection; labels and values remain intact. Compensation and transfer tables remain within the content width.
- The changed homepage entry stays within a 320 px viewport and its Stats & player help link opens the actual topic. No browser page or hydration errors were observed during these checks.

Extension: update the checked editorial data when an official notice changes; do not let a refreshed feed timestamp imply that manual help content was re-verified. Own historical curves still need a durable database and background scheduler. The process cache and visitor polling cannot provide historical coverage. Local validation does not establish production deployment.

Publication preparation: the user requested GitHub synchronization on October 12. A fresh production build and all ten data-service tests passed; the same three existing repository TypeScript diagnostics remain. The release targets `origin/main` and requires the existing Next.js server runtime for `/api/aion-2/`.

## 2026-10-12 — Krillion game and guide

Scope: add a homepage entry, `/games/krillion/`, `/games/krillion/guide/` and `/games/krillion/faq/`. Original gameplay opens at krillion.io. ZowGame provides an independent rules guide, seven-step answer strategy, ten searchable FAQs, the current official prompt preview and a seven-answer score calculator. It does not provide a verified daily answer bank or a cloned playable game.

Art direction: extend the portal's pine, bone and lime editorial system, using its existing Anton / Barlow Condensed / DM Sans / JetBrains Mono typography and named tokens. A real original-game screenshot accompanies an asymmetric hero. The functional signature is the depth calculator: selected answer tiers update the total points, depth and progress reading. Ruled sections, a numbered directory, restrained feedback and reduced-motion support preserve the shared rhythm. Layout breakpoints at 1100, 800 and 560 px retain the section hierarchy.

Sources and boundaries:

- The original home page and FAQ were checked on October 12. Daily rules are seven prompts, 25 seconds per answer and one daily attempt; 700 points yields 7,000 m. The six accepted-answer tiers are 10/15/30/60/85/100 points. Rarity is curated, not a live measure of today's player answer frequency. Creator credit uses the official pseudonym kp. No fabricated review score, user count or paid-mode price appears.
- Only the public `/api/today` prompt summary is read. Answers and hidden question banks are not fetched. The seven prompts remain hidden until readers choose to reveal them. The page labels this as a question preview and directs answer review to the original game.
- The upstream endpoint is not a documented stable public API. Five-minute process caching, request timeout, coalescing, a short failure backoff and explicit recovery states handle unavailable data. Stale data is allowed for at most an hour and only before the same New York game date/reset expires. It is never presented as a new day's set.
- Reset follows America/New_York midnight, including daylight saving changes. Observation time, game date and UTC reset time are separate. The cache is not persistent history storage.
- Original-game response headers currently restrict framing to the same origin. PlayDaily's inspected page renders its own hosted game without an iframe, with different scoring and additional modes. Its code origin and authorization were not established; no such conclusion is published on ZowGame.

Verification:

- Final isolated production build passed with 31 prerendered routes, including all three Krillion pages and the dynamic `/api/krillion` endpoint. No dependency was added.
- Ten server tests passed: public-field validation, cache/in-flight reuse, stale expiry/backoff/recovery, New York midnight, UTC date boundaries, requests crossing reset, daylight saving, expired resets, malformed data and HTTP/JSON/network failures.
- Actual browser preview retrieved Dive #89 and its seven prompts. Reveal/hide works. Seven 100-point answers produce 7,000 m / 700 points; a mixed 100/85/60/30/15/10/0 set produces 3,000 m / 300 points. Reset restores the empty selection.
- FAQ search for spelling returns the intended question. An unknown query shows a contextual recovery state; Show all restores ten answers. Native disclosure keyboard expansion and the visible 2 px focus outline passed. Guide navigation reaches the actual guide route. Homepage search finds Krillion, and its entries use the game-and-guide CTA.
- Actual visible-tab viewport checks at 1280, 1100, 768, 390 and 320 px show no page-level horizontal overflow. Native calculator selects measure 46 px tall. The homepage and guide also remain within the 320 px viewport. Temporary viewport overrides were reset after testing.
- Browser error/warning logs were empty during final inspection. Service failure and reset behavior were tested; device-offline and denied-network UI were not forced in the browser.
- Independent review confirmed canonical URLs, sitemap and visible FAQ/schema alignment. Krillion emits no aggregateRating. The metadata promises daily rules and help rather than verified daily answers. `git diff --check` passed.
- Separate TypeScript validation reports only the same three existing diagnostics in particle-bg.tsx and game-input.test.ts. Next skips the repository type/lint gates; a fully clean repository check is not claimed.

Extension: retain the official source date and explicit game/guide boundary. A locally playable practice game would require independently authored code and questions, with separate identity and scoring claims. A future daily answer service needs a verified editorial source and date discipline. These checks establish local validation; production deployment is outside their scope.

Publication preparation, October 13: the user requested GitHub synchronization. A fresh isolated production build passed with 31 prerendered routes, and all 20 Krillion/AION data-service tests passed. Independent release-scope review found no blocking issue or sensitive data. Separate TypeScript validation still reports only the same three existing repository diagnostics. The target is origin/main, and the daily preview requires the existing Next.js Node server runtime.

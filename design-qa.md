# Design QA — ZowGame

Latest review: **2026-10-17 Level Select production**, appended at the end of this file. Earlier entries are retained as historical reviews and do not describe the current homepage.

Date: 2026-10-11. This report supersedes the first implementation review.

## Art direction

Selected direction 1: a game editorial desk. Charcoal/pine surfaces, bone-white poster typography, lime actions, a large castle/map feature and a compact recommendation rail. Anton 400 supplies the main headline; Barlow Condensed, DM Sans and JetBrains Mono provide the heading, reading and utility layers. The functional signature is the next-move navigation: discover games, filter tabletop introductions, or jump to actual player guides. Hover scale is restrained; reduced-motion removes transitions. Real raster artwork supplies the atmosphere.

## Current comparison evidence

- Source visual truth: `local archive: exec-e9a4bee7-0268-4bec-8159-d2a70e128716.png` (1229 × 1280).
- Implementation URL: `http://127.0.0.1:3000/`.
- Latest browser render: `local archive: homepage-final.png` (1219 × 1562).
- Viewport: 1229 × 1280; default all-games state; four games and all images loaded. The browser scrollbar accounts for the 10 px content-width difference.
- Full comparison: `local archive: comparison-full.png`. Reference left, latest browser render right, equal 700 px widths.
- Focused comparison: `local archive: comparison-hero.png`. Both features normalized to 842 px width, preserving their natural heights.
- Both combined images were opened and reviewed after the final poster refinements.
- Latest mobile capture: 390 × 844 viewport, 380 × 3712 content. Focused evidence: `local archive: mobile-preview.png`. Tablet 768 px and small phone 320 px widths were also checked.

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

## 2026-10-14 — Hood Warfare 2 Chinese guide and official data

Scope: a homepage entry, searchable catalog game and eight canonical pages under `/games/hood-warfare-2/`: overview, purchase, guide, weapons, maps, modes, news and FAQ. The Chinese player manual extends the approved ZowGame editorial design. Pine, bone and lime tokens, Anton/Barlow identity, Noto Serif SC / Noto Sans SC reading, real official game screenshots and ruled sections preserve the site narrative. The functional signature is a six-mode objective briefing; the first-match checklist saves eight steps on the same browser.

Sources: Steam App 5155360, Trapstar Games only, checked October 14. All six officially described modes are covered. Four store scene descriptions do not prove a complete map list; the supermarket patch mention is not counted as a fifth map. Weapon progression and four attachment categories are explained, while full gun names, damage, TTK, unlock levels and killstreak thresholds remain unverified. Editorial practice advice is distinguished from official objectives. No first-hand playtest, review rating or complete weapon/map database is claimed. Three developer announcements have original Chinese explanations, separate checked dates and Beijing publication times.

Automatic updates: one dynamic Node API synchronizes the Steam developer feed and CN app details independently. It exposes actual observation times and separate ready/stale/unavailable states. Ten-minute warm caches, one-hour stale expiry, source timeouts, coalescing and short failure backoff are tested. The shared client checks on entry, every ten minutes while visible, and on return/reconnection; it has loading, failure, empty and retry states. The hero derives the latest announcement from this feed. Price, discount, platforms, language and minimum/recommended requirements update on the purchase page. CNY integer-cent validation prevents absent prices becoming zero. This is visitor-driven synchronization, not persistent historical collection or a background scheduler. Server hosting and outbound access to Steam are required. The user chose original news synchronization and manual Chinese review: new notices retain their original title/preview and a pending-review label rather than pretend to be reviewed translations.

Verification:

- The isolated production build passed with 39 prerendered pages and the dynamic API. Generated HTML contains all eight canonicals, all sitemap entries, native guide content and 22 visible FAQ disclosures matching 22 schema questions. No fictional offers or aggregate ratings are emitted.
- All 40 AION/Krillion/Hood news/Hood store service tests passed, including cache/stale recovery, source validation, partial failures, legitimate zero/unknown price distinctions and actual combined-route response statuses/headers.
- The local combined API returned HTTP 200 with three ready official announcements and independently dated CN store fields. The purchase page displayed the returned price, discount, Windows, English and both requirement lists. Manual refresh worked and retained the real source cache time.
- Live browser navigation checked all eight pages. Six mode controls worked with keyboard focus; the checklist restored two checked steps after reload and reset to zero. FAQ search matched voice help, unknown-query recovery restored all 22 answers, and keyboard Enter opened a native disclosure with a visible 2 px outline. Announcement links reached their matching local explanation and preserved the sticky-navigation offset.
- Homepage search for `hood warfare 2` returned the one intended game from six. Clear restored six; the dedicated homepage entry opened the actual topic. Its desktop FPS mark did not overlap the copy. The catalog CTA now opens the overview with buying and guide entry points.
- Actual desktop, 1100 px, 768 px, 390 px and 320 px geometry checks showed no page-level horizontal overflow. Purchase configuration panels stack on narrow screens; native screenshots confirmed readable mobile price and configuration layout. Checkbox labels measured 52 px, navigation 48 px and refresh controls 44 px. Reduced-motion and image-failure recovery are implemented. Source-failure paths were verified in service tests; device-offline UI was not forced in the browser.
- Existing Krillion and new Hood screenshots were compared for inherited typography, palette, rule lines and button language. This is a topic extension with original Chinese layout, not a pixel clone. Temporary viewport overrides were reset before handoff.
- Independent code review found no P1/P2 issues in provider lifecycles, late-request isolation, expiry, partial failures, metadata or keyboard behavior. During implementation, intermediate hot-reload errors were resolved after the provider/import integration. A fresh final reload retrieved the latest official announcement and produced no new browser errors or warnings.
- TypeScript checking still reports only the same three existing diagnostics in `particle-bg.tsx` and `game-input.test.ts`. Next skips full type/lint gates; repository-wide clean typing is not claimed. No dependency was added. These are local checks, not proof of GitHub publication or production deployment.

Extension: add verified weapon or map records with their direct source and version. Keep new original announcements automatic and Chinese interpretations separately dated. Durable history or unattended collection requires a separate persistence and scheduling implementation. Do not let live timestamps imply that static guide advice was rechecked.

## 2026-10-14 — Hood Warfare 2 English presentation

The user changed the complete Hood topic and its homepage entries to English. All eight page bodies, guide steps, mode/map/weapon descriptions, 22 FAQs, three reviewed patch summaries, navigation, image descriptions, interaction states, recovery copy and metadata now use English. HTML and structured data use `en`, with Open Graph `en_US`. Chinese font overrides were removed in favor of the existing Anton / Barlow Condensed / DM Sans system. English headlines and short navigation labels preserve the original layout. Announcement dates still retain their explicit UTC+8 scope; CN/CNY prices remain clearly labeled because this was a language change, not a region change.

Verification: the final isolated production build passed with 39 prerendered pages. Generated HTML for all eight pages and the homepage contains no Chinese visitor text; canonicals remain valid, metadata/schema languages are English, and 22 FAQ disclosures match the 22-question English schema. All 20 Hood news/store service tests passed. TypeScript checking reports only the same three pre-existing repository errors, outside the Hood feature. Source files and `git diff --check` passed the final language/whitespace scan.

Actual browser checks confirmed the English homepage entry and matching search result, voice-help search, native keyboard expansion, empty-result recovery and restoration of all 22 answers. The FAQ input now has a stable accessible name even when its Clear button appears. The six-mode briefing remained keyboard-operable. Current official price, region, platform, language and field-by-field configuration readings display in English. The latest official four-part version `1.0.1.4` is shown in full, correcting the previous truncation while retaining `1.0.10` support. Unreviewed announcements show an official excerpt and a pending editorial-review label; automatic retrieval labels are distinct from manual review dates.

Desktop, 768 px and 320 px layouts showed no horizontal overflow. Native mobile screenshots verified navigation, the longer latest-announcement title and stacked configuration panels; refresh targets measured 44 px. A fresh loaded FAQ produced no new browser errors or warnings. Temporary viewport overrides were reset, and the English overview was left as the local preview deliverable. No source cache, request cadence, stored checklist key or external publication changed in this language pass.

## 2026-10-14 — Compact homepage game-library cards

The homepage library now uses section-scoped size, title, padding and gap tokens. Actual desktop cards measure 260 px high instead of 320 px; tablet cards measure 250 px instead of 295 px, and narrow cards 260 px instead of 310 px. Existing four/two/one-column layouts and the cover-image visual language remain. Descriptions show a three-line preview, and long genre labels use a single-line ellipsis; full titles, source copy and destination links remain in the document. Reduced padding and smaller headings retain the existing body-copy size and 44 px guide-link target.

The final isolated build passed with 39 prerendered pages. Default desktop and 768/320 px browser checks showed no horizontal overflow. All six cards matched their intended height; narrow-screen type badges and genre labels had at least 10 px of clearance after inspection. A title link opened the actual Hood Warfare 2 page. Native before/after screenshots were compared at the same default viewport and library anchor. Viewport overrides were reset and the deliverable was positioned at `/#library`. This pass changed only library CSS and this QA record; no functional service tests were added for this style adjustment.

Further size adjustment: the user requested smaller cards again. The library now uses six desktop columns, three tablet columns and two mobile columns. At the default 1280 px viewport, actual cards measure 193 × 220 px, compared with 292 × 260 px in the previous compact version. Titles use 22 px, summaries show two lines and CTA spacing is reduced while the 44 px target remains. The cards reserve top space for format badges and allow natural height growth for long titles; 320 px cards measure 130 px wide and 220–243 px high, with all badges inside their cards and at least 18 px of clearance from the copy. Full titles and links remain visible. No page overflow was observed at 1280, 768 or 320 px. The final isolated production build passed with 39 prerendered pages; before/after screenshots were compared at the same desktop library anchor and viewport overrides were reset.


## 2026-10-17 — Quest Atlas collection redesign (current)

### Art direction brief

The approved direction is an illustrated player atlas: midnight navy, brass rules, rust actions and parchment reading surfaces. Fraunces supplies the book-like display voice; Manrope supplies legible controls and prose. Both variable fonts are self-hosted with their OFL licenses. Illustration is a real optimized raster masthead and coastline, with a restrained paper texture. The functional signature is the question-based route strip plus prominent search: start playing, understand rules, plan a strategy or fix a problem. Genre navigation remains a fixed taxonomy rather than a growing list of game names.

Motion uses short color feedback and restrained image scaling; focus is visible, and reduced-motion removes transitions and transforms. Color, type, spacing, focus, surface, radius and timing tokens are centralized in atlas.css. This is an English site.

### Visual source and comparison

- Approved source: docs/design/quest-atlas-approved.png (1122 × 1402), copied from the user-approved final ImageGen option.
- Production page: http://127.0.0.1:3000/ ; default All games state, requested viewport 1122 × 1402, all six covers loaded, local fonts confirmed loaded, one H1 and no horizontal overflow.
- Final raw browser capture: docs/design/atlas-final-homepage.jpg (1112 × 1330). The IAB screenshot excludes the scrollbar/window area; this is a capture difference, not a claim of a 1402px screenshot.
- Paired comparison: docs/design/atlas-final-comparison.jpg. Source left and actual page right; the source was proportionally resized to the live capture width and both top regions cropped to the same height. No rendered content was redrawn or retouched. The focused comparison is docs/design/atlas-final-comparison-focus.jpg. Both combined images were opened and reviewed after the final build.
- Responsive captures: atlas-mobile-final.jpg (390px requested viewport), atlas-tablet-final.jpg (768px requested viewport). The 320px guide-directory layout was also measured in the browser: 310px document width and 46px filter controls, with no overflow.
- Reading-page captures: atlas-general-guide-mobile.jpg, atlas-fishes-guide-mobile.jpg, atlas-hood-guide-desktop.jpg and atlas-aion-desktop.jpg in docs/design/. These were visually checked for readable contrast, heading rhythm, stable navigation and retained specialist tools.

The navy/brass/parchment system, six-card 3 × 2 desktop grid, separate thumbnail guide list and fixed genre navigation follow the selected direction. Real Krillion screenshots and MinaLima product photography replace the concept's invented cover artwork. The wordmark, corner ornamentation and lower coastline are simpler than the raster concept; these are visible P3 fidelity differences, not a claim of pixel-identical reproduction. Functional links and longer, accurate guide titles use more vertical space than the concept's abbreviated copy.

### Findings fixed

- Removed fixed title heights that produced large gaps between short game titles and their guide links.
- Reduced the update region to a short heading and three actual coverage links; removed an unintended unstyled tall list.
- Increased small link/prose sizes and retained 44px mobile targets. Mobile genres wrap instead of presenting a page-wide horizontal scrollbar.
- Overrode legacy CSS that hid the last header navigation link on narrow screens; Games, Guides and Updates are all visible.
- Removed legacy general-guide rules that added accidental boxes around navs and article sections. General reading sections now use deliberate bottom rules and paper padding.
- Added a focusable general-guide skip target; the homepage skip link was verified to focus atlas-main with a visible 3px focus outline.
- Removed the global loading boundary after it caused invalid pagination to stream as a 200 soft 404. Invalid paths now return real 404 responses with noindex.
- Browser testing found that a Next Link back to the same directory could retain its query-level not-found boundary. The 404 shell and recovery links now use full document navigation; clicking recovery was verified to show the real guide directory.
- Restored AION 2 discovery in the shared search index. It is an independent data topic, uses the site's editorial thumbnail, and is not assigned a fabricated game genre or added as a seventh homepage cover card.
- Applied the shared type and color tokens to AION 2's data page so removed web-font imports cannot leave it in the old display fallback.

### SEO and functionality

The homepage, game directory and guide directory are server components. Their text, cover links, GET search/filter forms and pagination anchors are present in raw HTML. Article routes retain static/server-rendered content. Small client islands cover image recovery, connection feedback and existing game-specific tools.

There are six homepage games, 29 existing guide/chapter entries and one AION 2 data topic. The guide index contains 30 destinations over real 12 / 12 / 6 pagination. Harry Potter finds the four existing tabletop chapters; AION2, AION 2 and the full Steam stats term find the real data topic. Unknown queries have useful empty-state recovery. No new game facts or current-feed claims were invented by the redesign.

Unfiltered directory pages are indexable, with differentiated paginated titles and self canonicals. Search/faceted variants use noindex,follow and base canonicals. Thirty-seven supported canonical URLs form the sitemap; no arbitrary fresh lastmod or unsupported routes are emitted. Robots permits crawling, JSON-LD is escaped and matches visible lists, and unverified aggregate ratings were removed. Existing guide URLs and truthful physical-tabletop identity are preserved.

### Verification and limits

- Final standard production build passed: 44 generated static pages, with the homepage and both directories rendered on demand. Local production preview remains on port 3000.
- All seven Node test files passed: **69 / 69**, no failures or skipped tests, including five local HTTP not-found cases.
- HTTP SEO audit: **299 / 299** checks, 59 requests, 46 HTML responses, 37 sitemap canonical destinations, 11 local image HEAD checks and 29 parsed JSON-LD scripts. Evidence: docs/qa/seo-http-audit-2026-10-17.json; reproducible script: docs/qa/seo-http-audit.mjs.
- Bounded TypeScript validation passed for 26 release files with no scoped/configuration errors. Script: docs/qa/check-atlas-types.mjs. The repository's existing build configuration skips global lint/type gates; a fully clean repository-wide type check is not claimed.
- Browser checks covered real search submission, combined genre/type filters, empty results and recovery, next-page navigation and canonical changes, loaded cover assets, mobile/tablet/320px overflow, keyboard skip navigation, readable specialist guides, and hydrated branded 404 recovery.
- Known framework boundary: Next 15 matched-route 404 responses have a real 404 status and noindex, but their raw HTML can have an empty error body; the branded recovery UI is available after hydration. A top-level unknown URL includes the full branded server HTML. Tests and docs/qa/not-found-regression-2026-10-17.json distinguish these cases. No RSC serialization was counted as visible SSR content.
- Raw HTTP checks do not prove JavaScript-disabled browser behavior, complete WCAG certification, upstream API correctness, rankings or indexing in Search Console. Existing live-feed behavior was preserved; this redesign does not create historical sampling storage.
- A concurrent development/build run produced one transient prerender failure; diagnostic and subsequent standard builds completed. The final package was built with the development server stopped and verified through the production server.

### Extension notes

Publish a real game overview and verified chapters before adding its catalog entry. Add supported paths to the shared SEO route registry, retain source/review dates, and extend the shared tokens instead of hard-coding a new visual system. Independent data topics may be searchable without pretending to be a new game in the six-card homepage selection. Larger catalogs use directory pagination and genre filters; they do not add one sidebar item per game. Feed observation time and human editorial review time remain distinct.

Current implementation result: passed, with the explicit matched-route 404 SSR limitation above.

final result: passed


---

## 2026-10-17 — Level Select production acceptance

### Source truth and rendered evidence

Confirmed direction: the refined game-selection reference, followed by the user's explicit instruction to develop. This review compares the approved image to a running implementation; it does not substitute a fresh visual direction.

- Source desktop: `docs/design/level-select-approved-desktop.png`.
- Source long-title state: `docs/design/level-select-approved-fishes.png`.
- Source phone: `docs/design/level-select-approved-mobile.png`.
- Actual production: `http://127.0.0.1:3000/`, with the Don't Sleep With The Fishes state at `/?game=dont-sleep-with-the-fishes`.
- Actual desktop: `docs/design/level-select-desktop-final.jpg`.
- Actual long-title state: `docs/design/level-select-fishes-final.jpg`.
- Actual phone: `docs/design/level-select-mobile-final.jpg`.
- Tablet: `docs/design/level-select-tablet-final.jpg`.
- Small phone: `docs/design/level-select-small-phone-final.jpg`.
- Failure evidence: `docs/design/level-select-artwork-error.jpg`; the original artwork was restored and Retry artwork then visibly loaded it successfully.

Requested desktop viewport: 1331 × 1182. The browser capture is 1321 × 1173 because its capture surface excludes scrollbar/chrome pixels. Reference and actual are normalized to the same 1321-pixel content width, preserving aspect ratio, then cropped to their common height. Default Hood and selected Fishes states are compared separately at scroll position zero, with loaded fonts and artwork. Phone viewport: 390 × 844; source normalized to 380 × 821, actual capture 380 × 822, common comparison 380 × 821. No screenshot content was retouched.

The following paired inputs were created, opened and reviewed with source left / implementation right:

- Full desktop: `docs/design/level-select-comparison-desktop.jpg` (2642 × 1173).
- Long-title full desktop: `docs/design/level-select-comparison-fishes.jpg` (2642 × 1173).
- Full phone: `docs/design/level-select-comparison-mobile.jpg` (760 × 821).
- Focused hero, typography and controls: `docs/design/level-select-comparison-hero.jpg`.
- Focused guide hierarchy, spacing and copy: `docs/design/level-select-comparison-guides.jpg`.

### Findings and patches

No actionable P0/P1/P2 findings remain after the following fixes:

- [Fixed P1] A three-line game title made the Fishes scene and information panel extend over the featured-roster heading. Reduced title scale/padding and constrained the desktop grid row. Final 800-pixel measurements: hero bottom 559, artwork bottom 558, information bottom 558.13, roster top 559. At 1331 pixels the entire information panel also fits inside the hero.
- [Fixed P2] The first brand implementation was too small, the navigation sat too far right, and category styles filled the entire selected label. Enlarged the authored wordmark, moved navigation, expanded search, and scoped directory styles so the homepage retains its lime underline.
- [Fixed P2] Small utility text was excessively heavy because only 800/900 font files existed. Added licensed local 500/600 weights and assigned display/body roles deliberately. Guide descriptions and headings were enlarged/refined separately.
- [Fixed P2] A cached scene could leave its loading text visible after hydration. Added an image completeness check and verified the loaded state in the production browser.
- [Fixed P2] Native topic links initially dropped the selected game. Both native hrefs and enhanced interaction now preserve game/genre/topic state; real SSR responses verify this contract.
- [Fixed P2] The six-slot roster compressed titles on tablets. Intermediate widths now use a contained horizontal roster showing about four slots, while phones show about two and a portion of the next slot.
- [Fixed P2] At 320 pixels, the Hood title and overview action extended into the horizontal scrollbar area. Added the small-phone title/action treatment. Final document scrollWidth equals clientWidth, 310 pixels, and both actions fit inside their container.
- [Fixed P2] Increased mobile artwork-overview links and the search input to at least 44 pixels. Verified navigation, three quick guides, primary/secondary actions, roster-overview links, topic controls and update links with browser rectangles. The search input is also exactly 44 pixels high.

### Five fidelity surfaces

- **Typography:** self-hosted Barlow Condensed supplies the heavy italic display and compact utility type, with Manrope for reading. The 500/600/800/900 weights and italic font files load successfully. The wordmark, two-line Hood title, three-line Fishes title and lower guide hierarchy reproduce the approved roles. The generated reference's unidentified display face has slightly different cap-height/width metrics; this is accepted P3 optical drift, not a claim of pixel-perfect font identity.
- **Spacing/layout:** the desktop scene/information split, diagonal cut, joined six-slot roster, genre line, asymmetrical next-move introduction and four guide rows are present. 1331, 800, 390 and 320-pixel layouts were inspected. Mobile uses larger touch controls and a directly editable search field, so content reaches lower in the viewport than in the reference; that difference is intentional for touch access. The page has no horizontal overflow; only the roster/topic/category scrollers scroll within their own bounds.
- **Colors/tokens:** white, near-black and lime #c7ff36 form the shared system. Muted reading text, borders, focus and status colors have explicit roles. Specialist guide surfaces and the shared shell use the same visual family; header lime is kept independent of specialist reading-link colors. No default purple gradient, parchment framing, glass UI, emoji icons or heavy background effects are introduced.
- **Images/assets:** real existing game screenshots, cover artwork, physical board-game packaging and the red Fort Locks puzzle room are used. Optimized WebP scene/thumbnail variants retain the source imagery. The reference's enhanced portraits/clean logo panels are not fabricated as replacement game evidence; the original screenshots include their real HUD and framing. Lucide supplies consistent functional arrows/search/retry icons. The new favicon recolors the existing editable Z geometry rather than inventing an unrelated asset.
- **Copy/content:** all displayed quick links point to existing guides or real overview sections. Physical tabletop is labelled correctly. AION 2 remains a separate news/data topic and searchable guide entry. Counts are six published games and 30 guides/topics. No fake game routes, ratings, dates, statistics or filler text were added.

### Interaction and accessibility evidence

- Clicked Fishes, Fort Locks and other roster choices; scene, title, number, selected state, overview and the three real quick links update together.
- Used ArrowRight and End from focused roster choices. End reaches slot six on a phone, focuses its selector, scrolls the roster to 557 pixels, and keeps page scrollWidth at its 380-pixel clientWidth.
- Selected Rules after selecting Fishes; Fishes remains selected and two matching published rule chapters appear. Native links reflect the same state.
- Combined Puzzles & trivia with Rules to produce an honest empty state and a Featured recovery.
- Submitted the header search for Harry Potter; the guide directory displayed four Defenders of Hogwarts chapters with real anchor destinations.
- Tested a missing local scene against the running production build. The styled failure explained that guides remain available, provided a retry, and successfully loaded the restored artwork after Retry artwork was clicked. The temporary file move was completely restored.
- Existing guide content and chapter navigation remain accessible. A real Fishes guide was opened; its white reading surface, real content, source links and navigation were verified, with no page overflow at tablet width.
- Semantic controls, labels, meaningful alt text, native href fallback, visible focus and reduced-motion CSS are present. Reduced-motion and full-device-offline modes were inspected in source rather than browser-emulated; no broader accessibility certification is claimed.
- The small arrow on each roster slot is a separate, labelled real overview link, with an explicit tooltip and a 44-pixel mobile target. Selecting the main cover changes the scene; clicking that arrow navigates. This intentional production affordance also exposes every game's canonical page in SSR HTML.

### Technical verification and limits

- Final production build succeeded; 44 pages were pre-generated and the homepage/directory requests remain SSR. Final local preview is running on port 3000.
- 78/78 tests passed, including five live HTTP route tests; 0 failures and 0 skips. `docs/qa/level-select-tests-2026-10-17.tap`.
- Bounded release-surface TypeScript: 28 files, 0 scoped/configuration/dependency errors. This is not a claim of a new repository-wide lint pass. `docs/qa/level-select-types-2026-10-17.json`.
- Final local HTTP audit: 72 requests, 55 HTML responses, 37 canonical sitemap routes, 15 local image checks and 38 JSON-LD scripts. 502/502 assertions passed. `docs/qa/level-select-http-audit-2026-10-17.json`.
- Existing matched-route Next error limitation is preserved and reported: an out-of-range guide page returns a real 404 and noindex, but its raw error HTML has no H1; client recovery content is not described as SSR markup. Ordinary 200 pages and canonical metadata are checked separately.
- An isolated development cache wrote a corrupt generated prerender manifest during concurrent route compilation. That dev server was stopped. The final production build and full HTTP audit passed; the failed dev audit remains historical evidence, not a successful release check.
- Existing upstream feed functionality was preserved. This layout task does not establish new claims about upstream freshness, external-service uptime, deployment, search ranking or indexing results.

### Follow-up polish

- P3: dedicated social-sharing artwork could later follow the new direction; existing valid sharing images remain in metadata.
- P3: the generated reference's optical type metrics and close-up cover compositions can be refined if the user requests another visual iteration. The shipped assets remain the actual game artwork.

### Implementation checklist

- [x] Functional Level Select signature and curated scaling model.
- [x] Token-based colors, typography, spacing and motion.
- [x] Real game imagery and contextual English copy.
- [x] SSR content, crawlable destinations and preserved canonical routes.
- [x] Keyboard controls, focus, touch layouts and native fallback URLs.
- [x] Loading/error/retry and honest empty states.
- [x] Source/actual paired full and focused comparisons reviewed.
- [x] Production preview and verification reports available.

final result: passed

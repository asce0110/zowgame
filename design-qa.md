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

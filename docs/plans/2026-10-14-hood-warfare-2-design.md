# Hood Warfare 2 player field manual

Extend the approved ZowGame editorial portal, not a separate domain or a redesign of unrelated games. The visitor should be able to identify the correct Steam game, check buying conditions, learn the six objectives, follow a first-match routine and understand official changes in English. The user switched the complete topic and homepage entry to English on October 14.

## Art direction

Pine, bone and lime follow the existing named tokens. Anton/Barlow Condensed and the existing refined body face preserve the portal's English typography. Real Steam screenshots and ruled sections create a field-manual rhythm. The functional signature is a six-mode objective briefing. Hover/pressed/focus, progress, failure and recovery use the same palette. Three breakpoint ranges preserve the sequence; reduced motion disables transitions.

## Scope

Eight canonical pages under /games/hood-warfare-2/: overview, purchase, guide, weapons, maps, modes, news and FAQ. Shared catalog integration supplies a homepage entry and searchable game. Native disclosures expose all 22 answers before hydration; a local checklist saves eight first-match steps. Mode controls show the selected goal and editorial practice advice. Existing routes, fonts/tokens, image recovery and headers are extended rather than copied wholesale.

## Source contract

Only AppID 5155360, Trapstar Games. Official store and three developer announcements were checked on 2026-10-14. China-region price and store fields are synchronized from official app details, with their own actual observation time; they are not a global checkout offer. Six modes are confirmed. Four store scene descriptions are not a complete map count; supermarket in the patch cannot be assumed to be a fifth map. Complete gun names, damage, TTK, unlock levels, attachment effects and killstreak thresholds remain unverified. Keep those gaps visible rather than copy conflicting wiki claims. Original practice advice is labeled separately from official rules. Purchase/download stays on Steam; no game embed or installer is hosted.

## Live data

One dynamic Node API reads the official Steam developer feed and China-region app details in parallel. News and store data keep independent states and observation times. Ten-minute warm-process caches, one-hour stale limits, request coalescing, eight-second source timeouts and short failure backoff. A shared client provider reads on entry and every ten minutes while visible, refreshes on return/reconnection and exposes loading/failure/empty/retry states. Prices are validated CNY integer cents; absent prices remain unknown. Platforms, language, release status, developers and configuration update with the store response. The latest-announcement hero derives from the live feed instead of a hardcoded patch number. API is no-store/noindex and it does not store history or collect in the background without visitors. Reviewed editorial summaries match known announcement IDs; unseen announcements link to original text and are marked pending editorial review. A fresh feed timestamp must never imply manual content has been rechecked. The user chose this source-sync/manual-review boundary on October 14, then switched the presentation language to English. Prices retain the explicit CN/CNY region; changing the UI language is not a currency or region change.

## Verification

Build in .next-verify so the existing local preview is preserved. Check generated HTML, canonical/schema/sitemap, route navigation, live source failure tests, keyboard disclosure, search recovery, checklist restoration and actual desktop/tablet/mobile geometry. Compare the new page with the captured existing style reference. Report existing unrelated TypeScript diagnostics separately. Local completion does not establish GitHub push or production deployment.

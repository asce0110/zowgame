# ZowGame game-content synchronization — 2026-11-01

This is an editorial source review of all six published games and the AION 2 data topic. A source-check date, an announcement publication date and a game release date are distinct. Existing detailed-review dates are retained where a source was not reread. Site text remains English and the established design and 39-view metadata contract are preserved.

| Topic | Verified public-source result | Project synchronization |
|---|---|---|
| Don't Sleep With The Fishes | The itch.io downloads still list v1.1.4.4. All six official Steam announcements were read; the latest patch was published 2026-08-15 at 06:14:16 UTC. Valve currently labels the Steam build Playable on Deck, with button-prompt and small-text caveats. | Rechecked the overview and eleven guide routes; added a dated no-newer-patch result, Deck help and an explicitly unreleased future-update note. Updated the itch.io rating snapshot to 4.8/5 from 79 ratings. |
| Hood Warfare 2 | Four omitted announcements lead to 1.0.2.0, published 2026-10-23 at 00:53:58 UTC. | All eight pages now cover the 75-point Chain Snatch change, Draco/ARP, Party and private lobbies, official servers, map/gameplay changes and 26 FAQ answers. Seven summaries retain their original publication times. |
| Krillion | The official site exposes a separate limited-time Puffer Party beta. Daily Dive's seven-prompt structure is unchanged. | Three existing pages gained mode-specific rules and official entry points. The daily preview remains dynamic; no answer key or gameplay copy was added. Exact tier reference dates remain separate. |
| Defenders of Hogwarts | Official MinaLima retail is available; the base-game listing displayed £75 before delivery. | Retail links, buying/support questions and language resources updated. Retail availability is not treated as proof that Kickstarter rewards have shipped. |
| Cobb Can Move | The public devlog still ends at v1.7 on 2026-05-19; the Windows download is named v1.7 webview2. | Download/source text and the 4.7/5, 853-rating snapshot updated. Unattributed review cards removed; session duration follows the publisher's qualitative label. No browser version number was invented. |
| All The Gold In Fort Locks | No numbered release or new public patch was established by the official page; its devlog path returns a missing-page message. | The 4.5/5, 46-rating snapshot and source notes updated. Unsupported aggregate developer-certification and completion-time promises removed. Lack of a devlog is not proof that a browser build never changed silently. |
| AION 2 Steam topic | The official feed contains later notices and revised earlier posts, including the end of the October transfer offer. | Seven new briefs, revised known-issues/transfer help and per-item review dates. Future November 4 content remains a preview; historical peak and live sampling numbers were not manually refreshed. |

## Primary sources

- Fishes: [developer downloads](https://dopplerghost.itch.io/dont-sleep-with-the-fishes), [latest patch](https://dopplerghost.itch.io/dont-sleep-with-the-fishes/devlog/1621472/50000-copies-sold-small-game-fixes), [official Steam news](https://store.steampowered.com/news/app/4834070), [Steam store](https://store.steampowered.com/app/4834070/Dont_Sleep_With_The_Fishes/), [Valve Deck report](https://store.steampowered.com/saleaction/ajaxgetdeckappcompatibilityreport?nAppID=4834070).
- Hood: [1.0.2.0 announcement](https://steamcommunity.com/games/5155360/announcements/detail/678513130127496365), [1.0.1.8 weapons and scoring](https://steamcommunity.com/games/5155360/announcements/detail/672882996184876314), [store](https://store.steampowered.com/app/5155360/Hood_Warfare_2/).
- Krillion: [Daily Dive](https://krillion.io/), [Puffer Party](https://krillion.io/party), [creator FAQ](https://krillion.io/faq).
- Defenders: [publisher](https://minalima.com/defenders-of-hogwarts/), [retail](https://minalima.com/product/board-game-defenders-of-hogwarts), [rules resources](https://www.minalima.com/defenders-of-hogwarts/rules).
- Cobb: [official game](https://abho.itch.io/cobb-can-move), [v1.7](https://abho.itch.io/cobb-can-move/devlog/1527864/v17).
- Fort Locks: [official game](https://draknek.itch.io/all-the-gold-in-fort-locks).
- AION 2: [later patch](https://steamcommunity.com/games/3393110/announcements/detail/675136064593068108), [known issues revised October 26](https://steamcommunity.com/games/3393110/announcements/detail/712288224875120014), [November 1 NA maintenance](https://steamcommunity.com/games/3393110/announcements/detail/675136064593068553).

Detailed boundaries and source receipts are in [Cobb/Fort/Defenders audit](2026-11-01-cobb-fort-defenders-official-audit.md) and [Krillion/AION audit](krillion-aion-source-review-2026-11-01.md). Raw public-page/API captures remain in ignored `.firecrawl/` research storage. Community Fishes route observations remain labelled and are not promoted to developer guarantees. The fresh achievement extraction omitted some hidden objectives; the store still explicitly lists twelve, and the existing objective reference was preserved rather than invented anew.

## Metadata and update index

The update index now distinguishes all seven source-review outcomes. Eleven descriptions and two Krillion titles were revised to match changed content; no meta-keywords tag is emitted. The [current TD CSV](../seo/page-td-2026-11-01.csv) and [full mapping](../seo/page-td-2026-11-01.md) are generated from the canonical registry. Titles remain 47–56 code points; descriptions remain 145–159. These are editorial lengths, not a guarantee of search-result display.

## Production observation

Read-only checks on November 1 followed the public domain redirect to www.zowgame.com. The homepage returned HTTP 200 with the older title “Games, Player Guides & Steam Stats”; `/games/hood-warfare-2/` and `/api/hood-warfare-2/` returned HTTP 404. This is separate from local code verification. The installed Vercel CLI reported an invalid existing token when checking `whoami`; no login, deployment, DNS change, commit or push was performed as part of this source synchronization. The local build and preview are not described as an online release.

## Verification

- Production build passed: 44 generated pages; homepage and directories retain request-time SSR.
- Existing suite: 90/90 tests, zero failures/skips, including the local HTTP cases. See [test output](../qa/content-sync-tests-2026-11-01.tap).
- Scoped TypeScript: 50 roots, zero scoped/configuration/dependency errors. The existing build still skips global lint/types; a repository-wide clean type check is not claimed.
- [TD HTTP audit](../qa/td-http-audit-2026-11-01.json): 435/435 checks across all 39 published views.
- [SEO HTTP regression](../qa/seo-http-audit-2026-11-01.json): 502/502 checks. The existing matched-route 404 raw-body limitation is retained and reported separately.
- [Browser review](../qa/content-sync-browser-2026-11-01.json): 1280, 768 and 390-pixel widths; no overflow on inspected pages. Updates-to-Party navigation, Chain Snatch selection and the expired-transfer disclosure were exercised. Three unedited screenshots are listed in that record.
- [Local source API observations](../qa/source-api-observations-2026-11-01.json): all three endpoints returned HTTP 200 with ready readings for their checked fields. This is a dated local observation, separate from production.
- Current TD export matches the registry: 39 entries, full titles 47–56 and descriptions 145–159 code points, no warnings.

A successful upstream response establishes only the fields read at that observation time, not perpetual beta access, current account/server health, delivery completion, search indexing or rankings.

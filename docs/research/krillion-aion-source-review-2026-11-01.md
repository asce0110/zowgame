# Krillion and AION 2 source review — November 1, 2026

Scope: the existing three Krillion pages and the existing AION 2 Steam launch-statistics page. No new route, embedded copy of a game, hand-written daily answer key or sampled player count was added. This is an editorial source review, not a claim that a new game version was released on November 1.

## Source dates and retrieval

The raw responses in `.firecrawl/` are ignored research material. The source receipt records URL, final URL, HTTP status and UTC retrieval time (approximately 15:01 UTC / 23:01 China time on November 1). The official Steam news API provides original publication timestamps; an amended post can keep its original publication date. A source-check date is neither that publication date nor proof that an individual order, reward or account issue has been resolved.

| Source | Local evidence | Result and limitation |
|---|---|---|
| [Krillion Daily Dive](https://krillion.io/) | `.firecrawl/krillion-official-2026-11-01.html`; Firecrawl rendered scrape `01a1979d-66d3-763e-bee2-a03b54cce125` | The current screen confirms 7 prompts, 25 seconds each, one daily attempt and 10 metres per point. The Puffer Party entry is labelled Beta / limited time. |
| [Creator FAQ](https://krillion.io/faq) | `.firecrawl/krillion-faq-2026-11-01.html` | Preset curation/rarity, aliases and missing-answer explanations remain consistent with the guide. The general multiplayer FAQ still talks about future plans; the specific, functioning Party landing page is the stronger evidence for this separate beta. |
| [Puffer Party](https://krillion.io/party) | `.firecrawl/krillion-party-2026-11-01.html`; Firecrawl rendered scrape `01a1979c-87be-7494-8f51-602b151dbb2f` | The official entry screen and instructions were read. It offers matchmaking, Quick Play, hosting, codes and public rooms. No room was joined and no match was played. A publication/launch date was not supplied. |
| [Themed packs](https://krillion.io/packs) | `.firecrawl/krillion-packs-2026-11-01.html` | Words & Language, Movies, Sports and Geography remain visible. Music is marked Coming Soon; it is not described as released. No new claim about pricing was made. |
| [Public daily summary](https://krillion.io/api/today) | `.firecrawl/krillion-daily-2026-11-01.json` | HTTP 200 returned date November 1, day 109, seven prompts, and reset `2026-11-02T05:00:00Z`. This observation is research evidence only; the page continues to retrieve the current set dynamically. No answer-key field was present. |
| [Steam official news API](https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=3393110&count=100&maxlength=0&feeds=steam_community_announcements) | `.firecrawl/aion-2-steam-news-2026-11-01.json` | HTTP 200, AppID 3393110, 87 official announcements returned. Only selected relevant notices receive new editorial summaries. A fresh headline is not automatically a freshly reviewed summary. |
| [Steam store](https://store.steampowered.com/app/3393110/AION_2/) and [official appdetails](https://store.steampowered.com/api/appdetails?appids=3393110&cc=us&l=en) | `.firecrawl/aion-2-steam-store-2026-11-01.html`; `.firecrawl/aion-2-steam-appdetails-2026-11-01.json` | A direct store fetch redirected to agecheck; that is not treated as a full-body review. Official appdetails separately returned success and confirmed the existing PC requirements and October 5 release date. No requirement values were changed. |

## What changed on the site

### Krillion: a parallel beta, not new Daily rules

- Added an official Puffer Party entry, a brief rule explanation and two FAQ answers across the existing overview, guide and FAQ. The overview and guide contain a `#puffer-party` section; the FAQ links to it.
- Puffer Party uses a pass-the-puffer survival format. Its repeat-answer restriction and heart progression are explained as its own rules, without applying Daily Dive's timer, depth or maximum score to it.
- Core Daily format, creator FAQ and the separate mode entry were checked November 1. Exact Daily tier values were not freshly established, so `KRILLION_SCORE_CHECKED` remains October 12 and is shown separately.
- The daily API remains live retrieval of prompts, with date/reset validation and expiry. Its November 1 set was not hard-coded into the guide. Existing regression checks already cover the 25-hour New York fall-back day and local-midnight expiry; the server behavior did not need to change.
- Play stays on `krillion.io`. No iframe, copied implementation, guaranteed beta availability, launch date, party heart threshold or free-all-modes claim was added.

### AION 2: source revisions and expired transfer advice

The page now exports `AION_2_NEWS_CHECKED = 2026-11-01`. New or reread notices use that check date; three untouched older editorial summaries retain October 12. Help answers carry individual check dates. Block-code and account-relink checks retain October 12 because their NC support pages exposed only a JavaScript shell to the web reader. The older compensation answer also preserves its original review date and is explicitly framed as a historical notice.

| Official notice | Original publication (UTC) | Synchronization |
|---|---|---|
| [NA West maintenance](https://steamcommunity.com/games/3393110/announcements/detail/675136064593068553) / [NA East maintenance](https://steamcommunity.com/games/3393110/announcements/detail/675136064593068551) | Oct 31, 00:42:21 / 00:42:04; displayed as Oct 30 in PDT | A combined brief records both notices as marked Completed at the November 1 check. The maintenance event times remain separate from publication; this does not become a live server-health claim. |
| [Account restrictions](https://steamcommunity.com/games/3393110/announcements/detail/675136064593068541) | Oct 29, 03:04:13 | Added the later dated report and refreshed the account-help source. Its 4,651 count is not added to an older report as a cumulative total. |
| [New pass](https://steamcommunity.com/games/3393110/announcements/detail/675136064593068103) | Oct 29, 03:00:52 | Added a concise explanation distinguishing the free Basic track, Premium terms, mission progress and maintenance cutoff. |
| [Halloween Drops](https://steamcommunity.com/games/3393110/announcements/detail/675135430408018896) | Oct 28, 14:00:13 | Added the distinct viewing and claiming deadlines. No individual delivery is promised. |
| [October 27 PDT / 28 CET patch](https://steamcommunity.com/games/3393110/announcements/detail/675136064593068108) | Oct 28, 06:43:27 | Added a source-backed gameplay-change summary. Transfer advice now explains that the October offer ended; old daily hours are explicitly archival. |
| [Transfer revision](https://steamcommunity.com/games/3393110/announcements/detail/675135430408018666) | Oct 26, 19:24:26 | The level-45 revision and temporary resumption are subordinated to the later closure. Original level-10/application advice is not presented as a current offer. |
| [Ludra preview](https://steamcommunity.com/games/3393110/announcements/detail/675135430408017339) | Oct 23, 19:00:05; amendments labelled Oct 27 and Oct 30 PDT | Added dated preparation/reward context. November 4 is still an announced future date at this review, not a completed release. |
| [Launch Known Issues](https://steamcommunity.com/games/3393110/announcements/detail/712288224875120014) | Oct 9, 19:21:10; current title says Updated: 10/26 | The original post now lists intermittent EU chat issues. Replaced the stale claim that the new-issues section is empty; Nezekan reports remain in the resolved section. |
| [Original transfer terms](https://steamcommunity.com/games/3393110/announcements/detail/712288859283523637) / [Q&A](https://steamcommunity.com/games/3393110/announcements/detail/712288859283523640) | Oct 9, 18:40:52 / 18:40:14; later schedule corrections | Reframed as historical terms and post-transfer record checks, with the published reward-ticket expiry pointed out for affected players. Not an open November service. |

Historical launch timeline and the dated SteamDB peak were preserved. No new current-player, peak-today or record number was inserted. Cached observations still retain their original times, and unavailable data remains unavailable.

## Verification boundaries

- Successful raw Steam API and official appdetails reads establish the selected source contents at this check, not production deployment or current account/server state.
- Individual Steam Community pages sometimes exposed a near-empty shell or failed in the web reader. Their contents were verified through the official Steam news API, whose external-post links were followed to the direct announcement URLs above. A reader failure is not treated as no announcement or an offline site.
- The Puffer Party instructions and public entry were inspected without playing. Beta access conditions can change.
- No route count, design system or SEO registry was changed by this subtask. The existing 39-view TD contract remains the parent task's responsibility.

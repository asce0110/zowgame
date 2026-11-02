export const AION_2_NEWS_CHECKED = "2026-11-01";

export type AionUpdateBrief = {
  id: string;
  title: string;
  publishedAt: string;
  checkedAt: string;
  sourceUpdateNote?: string;
  summary: string;
  takeaway: string;
  sourceLabel: string;
  sourceUrl: string;
  relatedSources?: { label: string; url: string }[];
  helpId?: "login" | "transfer" | "belongings" | "account" | "compensation";
  feedIds: string[];
};

// Original, dated summaries of specific official announcements. These are not
// current server-status readings; feed IDs only connect the live news feed to
// the matching interpretation. Keep later help text within each source budget.
export const AION_2_BRIEFS: AionUpdateBrief[] = [
  {
    id: "november-clock-change-maintenance",
    title: "November 1 NA maintenance: completion notices, not live status",
    publishedAt: "2026-10-31T00:42:21.000Z",
    checkedAt: AION_2_NEWS_CHECKED,
    sourceUpdateNote: "Both notices were marked Completed when checked November 1. Their original publication date is October 30 in PDT / October 31 in UTC.",
    summary: "NC’s NA West and NA East notices describe maintenance for the change from daylight to standard time. Both are marked Completed at this check. The scheduled starts were November 1 at 01:30 PDT for NA West and October 31 at 22:30 PDT for NA East; both listed a 2-hour-30-minute duration.",
    takeaway: "Match the notice to your region and session time. A completed maintenance notice records that event’s recovery; it does not prove every server or individual login is healthy now.",
    sourceLabel: "Steam · NA West November 1 maintenance",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/675136064593068553",
    relatedSources: [{ label: "Steam · NA East October 31 / November 1 maintenance", url: "https://steamcommunity.com/games/3393110/announcements/detail/675136064593068551" }],
    helpId: "login",
    feedIds: ["1847920302240919", "1847920302240918"],
  },
  {
    id: "account-restrictions-october-28",
    title: "A later restriction report, with the same appeal boundary",
    publishedAt: "2026-10-29T03:04:13.000Z",
    checkedAt: AION_2_NEWS_CHECKED,
    summary: "The October 28 PDT / October 29 CET notice reports 4,651 restricted accounts after review of prohibited activity. It again distinguishes policy sanctions from precautionary security locks. This is a separate dated report, not a cumulative count to add to the October 11 figure below.",
    takeaway: "Use the account message to distinguish a sanction from a security lock, then contact official support for individual review. A public total cannot explain one account’s outcome.",
    sourceLabel: "Steam · October 28 / 29 Account Restrictions",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/675136064593068541",
    helpId: "account",
    feedIds: ["1847920302233335"],
  },
  {
    id: "prelude-to-flight-pass",
    title: "Prelude to Flight: a dated pass, with separate Basic and Premium tracks",
    publishedAt: "2026-10-29T03:00:52.000Z",
    checkedAt: AION_2_NEWS_CHECKED,
    summary: "The announced Daeva Pass has a free Basic track and a Premium track priced at 1,000 Quna, once per character. Missions earn Pass EXP up to level 50, followed by repeatable rewards. The notice places reward claiming at the December 1 PST / December 2 CET maintenance cutoff.",
    takeaway: "Check Subscribe in the game for your character’s track, progress and current terms. Buying Premium does not complete its missions; a sales period and the maintenance cutoff should be read together.",
    sourceLabel: "Steam · October 28 New Pass Product Info",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/675136064593068103",
    feedIds: ["1847920302233325"],
  },
  {
    id: "halloween-drops-october-28",
    title: "Halloween Drops: watching and claiming have different deadlines",
    publishedAt: "2026-10-28T14:00:13.000Z",
    checkedAt: AION_2_NEWS_CHECKED,
    summary: "The Halloween Twitch Drops viewing period runs October 28 at 10:00 PDT to November 3 at 23:59 PST / November 4 at 08:59 CET. Listed rewards extend to an eight-hour viewing tier. The notice separately asks players to claim Drops from Twitch inventory before November 17 at 23:59 PST / November 18 at 08:59 CET.",
    takeaway: "Check eligible streams and Twitch inventory at the source. Finishing watch time and claiming a Drop are separate steps; this guide does not establish delivery to your game account.",
    sourceLabel: "Steam · Global Halloween Twitch Drops",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/675135430408018896",
    feedIds: ["1847920302231105"],
  },
  {
    id: "october-28-patch",
    title: "October 28: dungeon changes, stricter limits and the transfer period’s end",
    publishedAt: "2026-10-28T06:43:27.000Z",
    checkedAt: AION_2_NEWS_CHECKED,
    summary: "The patch adds Urugugu Canyon and Vakron Sky Island Hard mode at item level 2,700, adjusts boss balance and adds the Odylium Repository daily dungeon. It also raises Gathering’s minimum level to 45, limits gathering to 1,000 times per server daily and reduces the inactivity return-to-lobby threshold from three hours to 30 minutes. The Server Transfer shop tab is removed as the offer ends.",
    takeaway: "Recheck entry requirements and gathering eligibility before repeating an old routine. A missing transfer tab is now explained by the ended October offer, rather than its old daily application hours.",
    sourceLabel: "Steam · October 27 PDT / October 28 CET Patch Notes",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/675136064593068108",
    helpId: "transfer",
    feedIds: ["1847920302229808"],
  },
  {
    id: "october-26-transfer-revision",
    title: "October 26 transfer revision: level 45 before the offer ended",
    publishedAt: "2026-10-26T19:24:26.000Z",
    checkedAt: AION_2_NEWS_CHECKED,
    summary: "An amended October 26 notice says transfers resume with Europe, then the normal next periods for NA East, NA West and South America, after an earlier hold. It raises the transfer level requirement to 45. The later October 28 patch removes the transfer tab; the resumption notice is now historical.",
    takeaway: "Use the later patch when interpreting current availability. Do not read this temporary resumption as an open November transfer service or use the original level-10 requirement.",
    sourceLabel: "Steam · Server Transfers Update, October 26",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/675135430408018666",
    relatedSources: [{ label: "Steam · later October 28 patch", url: "https://steamcommunity.com/games/3393110/announcements/detail/675136064593068108" }],
    helpId: "transfer",
    feedIds: ["1847286114046487"],
  },
  {
    id: "ludra-november-4-preview",
    title: "November 4 Ludra preview: an announced release and preparation rewards",
    publishedAt: "2026-10-23T19:00:05.000Z",
    checkedAt: AION_2_NEWS_CHECKED,
    sourceUpdateNote: "Publisher amendments include October 27 and October 30 PDT; the October 30 update changes reward packaging and event title names.",
    summary: "NC announces Ludra for November 4, with normal and hard entry at item levels 2,800 and 3,000. Its revised preparation event gives four Odyle Energy per account daily from October 28 until the November 10 PST / November 11 CET maintenance, with event mail expiring seven days after receipt. The October 30 amendment groups some Twitch rewards into boxes without changing the redeemable items.",
    takeaway: "At the November 1 review, Ludra’s date is still upcoming. Check the in-game mail expiry for preparation rewards; the separate November 4–17 PST check-in track contains seven rewards across fourteen days.",
    sourceLabel: "Steam · Ludra Awakens on November 4th",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/675135430408017339",
    feedIds: ["1847286114037691"],
  },
  {
    id: "nezekan-resolved-report",
    title: "Known issues revised October 26: EU chat and resolved Nezekan reports",
    publishedAt: "2026-10-09T19:21:10.000Z",
    checkedAt: AION_2_NEWS_CHECKED,
    sourceUpdateNote: "Original publication: October 9. The publisher’s current title says Updated: 10/26.",
    summary: "The revised known-issues notice lists intermittent EU chat availability as under investigation. NA West Nezekan character-selection and latency reports remain in its resolved section.",
    takeaway: "Match the region and symptom: an EU chat issue is different from a login failure. The notice is a dated issue report, not a universal repair procedure or a live server-health reading.",
    sourceLabel: "Steam · Launch Known Issues, revised October 26",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/712288224875120014",
    helpId: "login",
    feedIds: ["1846018067934466"],
  },
  {
    id: "transfer-planning",
    title: "The original October transfer offer, preserved as an archive",
    publishedAt: "2026-10-09T18:40:52.000Z",
    checkedAt: AION_2_NEWS_CHECKED,
    sourceUpdateNote: "The original Products Info and Q&A include publisher schedule corrections dated October 14 and October 20.",
    // Dates and pricing derive from Products Info; button interpretation below
    // derives from the separate Q&A. Both sources remain visible to readers.
    summary: "The original offer covered separate Early Access and Launch-server weeks, ending before October 27 PDT / October 28 CET maintenance. It listed a 0-Quna transfer once per account and 1,000 Quna for each extra destination character slot. Later revisions and the offer’s closure take precedence over its original application instructions.",
    takeaway: "Read these terms only when reviewing an October transfer or preparing a support inquiry. They do not establish a new application window or a standing free-transfer offer.",
    sourceLabel: "Steam · Server Transfer Products Info",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/712288859283523637",
    relatedSources: [{ label: "Steam · Server Transfer Q&A", url: "https://steamcommunity.com/games/3393110/announcements/detail/712288859283523640" }, { label: "Steam · later offer closure", url: "https://steamcommunity.com/games/3393110/announcements/detail/675136064593068108" }],
    helpId: "transfer",
    feedIds: ["1846018067934366", "1846018067934365"],
  },
  {
    id: "restrictions-and-security-locks",
    title: "A security lock and a sanction differ",
    publishedAt: "2026-10-11T06:00:26.000Z",
    checkedAt: "2026-10-12",
    summary: "NC distinguishes reviewed policy sanctions from precautionary security locks. Its October 11 notice reports 4,996 restricted accounts and identifies botting, unauthorized programs, gold farming, RMT and economy abuse. A security lock instead protects an account while suspicious access is checked; the notice does not establish why any individual player was affected.",
    takeaway: "If your account is locked or you dispute a restriction, submit a Customer Support ticket. The notice promises individual review, not automatic restoration or a published response deadline.",
    sourceLabel: "Steam · Account Restrictions",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/712288859283524486",
    helpId: "account",
    feedIds: ["1846018067937860"],
  },
  {
    id: "eu-compensation-scope",
    title: "EU compensation depends on eligibility",
    publishedAt: "2026-10-08T17:17:04.000Z",
    checkedAt: "2026-10-12",
    summary: "The October 8 notice covers selected EU servers. Active memberships and activated pet auto-loot get one extra day at upcoming maintenance; a supply chest arrives by mail. The notice does not confirm delivery to an individual account.",
    takeaway: "Check the server list and service conditions in the guide below. The announcement supplies no claim deadline; do not assume a deadline from a different compensation notice.",
    sourceLabel: "Steam · October 8 EU Service Outage Compensation",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/712288859283523340",
    helpId: "compensation",
    feedIds: ["1846018067930785"],
  },
  {
    id: "eu-new-server-notice",
    title: "Two new EU servers, with a dated opening notice",
    publishedAt: "2026-10-08T15:00:18.000Z",
    checkedAt: "2026-10-12",
    summary: "The October 8 notice scheduled Nathara for Elyos and Tassin for Asmodian in Europe, at 09:00 PDT / 18:00 CEST. It records the announced opening time, not the current population or available character slots on either server.",
    takeaway: "Check the region and faction in the game’s server selection. This announcement cannot establish today’s queue, transfer eligibility or spare capacity; use the current in-game message for those decisions.",
    sourceLabel: "Steam · New Servers Opening, Europe",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/712288859283522425",
    helpId: "login",
    feedIds: ["1846018067930039"],
  },
];

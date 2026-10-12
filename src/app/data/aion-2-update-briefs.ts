export type AionUpdateBrief = {
  id: string;
  title: string;
  publishedAt: string;
  checkedAt: string;
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
    id: "nezekan-resolved-report",
    title: "Nezekan: a resolved report with a specific scope",
    publishedAt: "2026-10-09T19:21:10.000Z",
    checkedAt: "2026-10-12",
    summary: "NC’s October 9 update places the NA West Nezekan character-selection and latency problems in its resolved section. The new-issues section is empty in the checked notice. This is a dated statement about those symptoms on that server, rather than confirmation that every login problem has been fixed.",
    takeaway: "Match your region, server and symptom before applying an old report. A new login failure needs current evidence; this notice supplies no universal repair steps or live server-status check.",
    sourceLabel: "Steam · Launch Known Issues, updated October 9",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/712288224875120014",
    helpId: "login",
    feedIds: ["1846018067934466"],
  },
  {
    id: "transfer-planning",
    title: "Plan the transfer before its window opens",
    publishedAt: "2026-10-09T18:40:52.000Z",
    checkedAt: "2026-10-12",
    // Dates and pricing derive from Products Info; button interpretation below
    // derives from the separate Q&A. Both sources remain visible to readers.
    summary: "Transfers are announced for two weeks: Early Access servers after October 13 PDT / October 14 CEST maintenance, then Launch servers after October 20 / 21 maintenance. The transfer itself costs 0 Quna once per account; extra destination character slots cost 1,000 Quna each. Availability was still upcoming at the October 12 check.",
    takeaway: "An unavailable transfer button can reflect the regional application window, closed departure applications or server capacity. Owning a character at the destination does not bypass transfer limits; check the matching schedule.",
    sourceLabel: "Steam · Server Transfer Products Info",
    sourceUrl: "https://steamcommunity.com/games/3393110/announcements/detail/712288859283523637",
    relatedSources: [{ label: "Steam · Server Transfer Q&A", url: "https://steamcommunity.com/games/3393110/announcements/detail/712288859283523640" }],
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

export const AION_2_HELP_CHECKED = "2026-11-01";
export const AION_2_REQUIREMENTS_CHECKED = "2026-11-01";
export const AION_2_SUPPORT = "https://help.plaync.com/qna/ticket?service=aion2global";

export const AION_2_HELP_GROUPS = [
  { id: "all", label: "All help" },
  { id: "access", label: "Access & launch" },
  { id: "accounts", label: "Accounts" },
  { id: "transfers", label: "Transfers" },
  { id: "rewards", label: "Rewards" },
] as const;

export type AionHelpGroup = typeof AION_2_HELP_GROUPS[number]["id"];
export type AionHelpGuide = {
  id: string;
  group: Exclude<AionHelpGroup, "all">;
  title: string;
  checkedAt: string;
  answer: string;
  steps: string[];
  boundary: string;
  keywords: string;
  sources: { label: string; url: string }[];
};

const sources = {
  known: "https://steamcommunity.com/games/3393110/announcements/detail/712288224875120014",
  transfer: "https://steamcommunity.com/games/3393110/announcements/detail/712288859283523637",
  transferQa: "https://steamcommunity.com/games/3393110/announcements/detail/712288859283523640",
  account: "https://steamcommunity.com/games/3393110/announcements/detail/675136064593068541",
  compensation: "https://steamcommunity.com/games/3393110/announcements/detail/712288859283523340",
  transferRevision: "https://steamcommunity.com/games/3393110/announcements/detail/675135430408018666",
  octoberPatch: "https://steamcommunity.com/games/3393110/announcements/detail/675136064593068108",
  maintenanceNaw: "https://steamcommunity.com/games/3393110/announcements/detail/675136064593068553",
  maintenanceNae: "https://steamcommunity.com/games/3393110/announcements/detail/675136064593068551",
};

// Dated official facts, followed by an editorial order of checks. No live
// maintenance, individual-account decision or guaranteed repair is inferred.
export const AION_2_HELP_GUIDES: AionHelpGuide[] = [
  {
    id: "login", group: "access", title: "I cannot log in, or character selection is stuck. What should I check?",
    checkedAt: "2026-11-01",
    answer: "Identify whether the failure is regional, account-related or local. The November 1 NA maintenance notices are marked Completed at this check. The revised known-issues notice lists EU chat interruptions separately; its Nezekan login and latency reports remain resolved.",
    steps: [
      "Record the region, server, Steam or PURPLE client, exact message and time with its time zone. A player-count drop alone cannot confirm an outage.",
      "Match the newest official notice to that region and time. A past maintenance notice is not a live status reading. If a current notice covers your session, follow its stated recovery update.",
      "If there is no matching notice, finish pending client updates and retry once. For a repeated failure, send the recorded details to AION 2 Global support; use the block-code or account guide below if that is the message shown.",
    ],
    boundary: "These are triage steps. This tracker has no server-health API and cannot diagnose a login failure from concurrent-player numbers.",
    keywords: "login log in logging maintenance outage connection connect disconnect disconnected queue queued stuck latency server status nezekan chat europe eu daylight time clock",
    sources: [{ label: "NC · known issues, revised October 26", url: sources.known }, { label: "NC · November 1 NA West maintenance", url: sources.maintenanceNaw }, { label: "NC · NA East clock-change maintenance", url: sources.maintenanceNae }, { label: "NC · newest Steam notices", url: "https://steamcommunity.com/app/3393110/allnews/" }],
  },
  {
    id: "startup", group: "access", title: "AION 2 will not launch or crashes on my PC. What can I try?",
    checkedAt: "2026-10-12",
    answer: "Use a local installation check before assuming a server outage. Steam recommends checking requirements, updating the operating system and drivers, and verifying installed files for launch problems.",
    steps: [
      "Compare your PC with the minimum and recommended requirements below. Record your Windows version, CPU, GPU and RAM for a repeatable report.",
      "Restart the PC, launch Steam and complete pending game updates. Install Windows and graphics-driver updates through their official channels when needed.",
      "In Steam: Library → AION 2 → Properties → Installed Files → Verify integrity of game files. Let verification finish, then test the same launch again.",
      "If the game still fails, record whether it exits before or after the launcher, the exact error and the time. Use the block-code guide for a displayed Block Code; otherwise submit those details to the game’s support team.",
    ],
    boundary: "File verification repairs installation problems; it cannot remove an account restriction or guarantee a fix for every crash.",
    keywords: "launch launching wont will not start startup crash crashing pc computer fps performance requirements specs minimum recommended ram gpu files verify installation download",
    sources: [{ label: "Steam · launch troubleshooting", url: "https://help.steampowered.com/en/faqs/view/5814-D9A3-BE42-62DF" }, { label: "Steam · verify installed files", url: "https://help.steampowered.com/en/faqs/view/0C48-FCBD-DA71-93EB" }, { label: "Steam · PC requirements rechecked November 1", url: "https://store.steampowered.com/app/3393110/AION_2/" }, { label: "NC · system requirements", url: "https://help.plaync.com/faq/aion2global?faqNo=7083" }],
  },
  {
    id: "block-code", group: "access", title: "The game closes with a Block Code. What should I do?",
    checkedAt: "2026-10-12",
    answer: "NC directs players to look up the exact displayed Block Code and follow the guidance for that code. Different codes can require different checks.",
    steps: [
      "Save the complete code and message before closing the pop-up. Include when it appears: launching the client, signing in or entering the game.",
      "Use NC’s Block Code guidance linked from the official help article. Follow the entry for your exact code rather than a fix for a different error.",
      "If the listed action does not help, submit an inquiry with the code, client, PC details, timestamp and steps already attempted.",
    ],
    boundary: "ZowGame does not maintain an official code database. No universal bypass or code-specific fix is claimed here.",
    keywords: "block code blockcode error popup pop up message closed closes blocked execution",
    sources: [{ label: "NC · failed launch with a Block Code", url: "https://help.plaync.com/faq/aion2global/view?faqNo=7153" }],
  },
  {
    id: "character", group: "accounts", title: "My character disappeared after changing my Steam account link. Is it lost?",
    checkedAt: "2026-10-12",
    answer: "NC says characters belong to the NC account used to create them. Linking Steam to a different NC account does not move those characters. A different account view is not proof of deletion.",
    steps: [
      "Identify the original NC account and login method, then confirm the region and server you previously used.",
      "For Steam-created characters on PURPLE, choose Steam login and sign in with the same Steam account. Creating another character is not required just to change clients.",
      "If you changed the account link, follow NC’s relinking sequence: recover access to the original account, establish another login method before unlinking Steam, then connect your intended Steam account to the NC account holding the character. Ask support if you cannot identify or access that original account.",
    ],
    boundary: "Account relinking changes access, not ownership of game data. Account recovery and identity verification must be handled by NC.",
    keywords: "missing lost disappeared character characters steam link linking unlink relink account purple progress save deleted",
    sources: [{ label: "NC · missing characters after relinking", url: "https://help.plaync.com/faq/aion2global/view?faqNo=7240" }, { label: "NC · use a Steam character on PURPLE", url: "https://help.plaync.com/faq/aion2global/view?faqNo=7176" }],
  },
  {
    id: "transfer", group: "transfers", title: "Why is server transfer unavailable after the October offer?",
    checkedAt: "2026-11-01",
    answer: "The October offer has ended. The October 28 patch removes the Server Transfer shop tab. The earlier October 26 resumption also raised the level requirement to 45; it does not establish an open November application window.",
    steps: [
      "Check the newest official notice before planning another transfer. No new application window is established by the sources reviewed here on November 1.",
      "If you applied during October and have an unresolved transfer, record your source and destination servers, character names and exact application or error message for support.",
      "Use the original offer’s region, faction and capacity conditions only to review that past transaction. Owning a destination character did not override the offer’s capacity limits.",
    ],
    boundary: "The hours below archive the ended October offer, including its original PDT labels. They are not a current schedule; first-day and maintenance-day corrections remain in the linked original notices.",
    keywords: "transfer transfers transferring server unavailable grey gray disabled button destination source region faction early access launch schedule times time ended closed november level 45",
    sources: [{ label: "NC · October 28 patch / transfer closure", url: sources.octoberPatch }, { label: "NC · October 26 level-45 revision", url: sources.transferRevision }, { label: "NC · historical offer and eligibility", url: sources.transfer }, { label: "NC · historical windows and limits", url: sources.transferQa }],
  },
  {
    id: "belongings", group: "transfers", title: "What moved in the October transfer, and what should I check now?",
    checkedAt: "2026-11-01",
    answer: "The ended October offer moved character inventory and Character Storage, not items in Server Storage. It listed a 0-Quna transfer and 1,000 Quna per extra destination character slot. These historical terms do not establish a new transfer offer.",
    steps: [
      "For an October transfer problem, identify whether the missing item was in character inventory, Character Storage or Server Storage. Keep screenshots or transaction details for support.",
      "Review the original destination slot capacity and naming terms. Purchased departure-server character slots stayed there, and a transferred character received a temporary name before renaming.",
      "If you received a Pet Reward Ticket or Skin (Single) Reward Ticket, check its stated November 24 PST / November 25 CET maintenance expiry in the original notice. Eligible pet refunds require Customer Support; a ticket is not an automatic refund.",
    ],
    boundary: "The Server Transfer tab was removed by the October 28 patch. This is a record-checking and support guide, not a promise of current applications or recovery of every server-level item.",
    keywords: "transfer item items storage inventory cube kina quna cost price free slot slots character name rename preparation market mail mission",
    sources: [{ label: "NC · historical pricing, items and ticket expiry", url: sources.transfer }, { label: "NC · storage, slots and names", url: sources.transferQa }, { label: "NC · October offer closure", url: sources.octoberPatch }],
  },
  {
    id: "account", group: "accounts", title: "My account is restricted or security-locked. How do I request a review?",
    checkedAt: "2026-11-01",
    answer: "NC distinguishes policy sanctions from precautionary security locks. A security lock is not a penalty. The public restriction announcement cannot identify the reason for your individual account.",
    steps: [
      "Record the exact restriction or lock message and when it appeared.",
      "Open an AION 2 Global Customer Support inquiry. Explain the problem and whether you are disputing a sanction or requesting access after a security lock.",
      "Provide the account information requested through that official support process. Keep the inquiry reference so you can follow its individual review.",
    ],
    boundary: "NC decides the outcome. No guaranteed restoration time is published in the checked notice.",
    keywords: "account ban banned restricted restriction sanction locked lock security suspended appeal review support ticket",
    sources: [{ label: "NC · sanctions and security locks", url: sources.account }],
  },
  {
    id: "compensation", group: "rewards", title: "Am I eligible for the October 8 EU outage compensation?",
    checkedAt: "2026-10-12",
    answer: "The October 8 notice announced an extra day for eligible active memberships and activated pet auto-loot, plus a supply chest by in-game mail. The server list below records that historical offer; it is not a new November reward announcement.",
    steps: [
      "Match your server and active-service condition to the October notice. It said that the extensions required no player action.",
      "For an expected historical reward that is missing, report your server and the specific reward to support. Do not infer that another compensation event has the same conditions.",
    ],
    boundary: "The notice sets no claim deadline or eligibility snapshot time and does not confirm delivery to your account.",
    keywords: "compensation reward rewards chest mail pet membership extension missing europe eu outage loot",
    sources: [{ label: "NC · October 8 EU compensation", url: sources.compensation }],
  },
];

export const AION_2_TRANSFER_HOURS = [
  { region: "NA East / NA West / South America", hours: "09:00–13:00 and 15:00–19:00" },
  { region: "Europe", hours: "03:00–07:00 and 09:00–13:00" },
  { region: "Asia", hours: "20:00–00:00 (next day) and 02:00–06:00" },
];
export const AION_2_REQUIREMENTS = [
  { part: "OS", minimum: "Windows 10/11, 64-bit", recommended: "Windows 10/11, 64-bit" },
  { part: "CPU", minimum: "Ryzen 5 2600 / Core i5-10500", recommended: "Ryzen 7 3700X / Core i7-11700" },
  { part: "Memory", minimum: "8 GB RAM", recommended: "16 GB RAM" },
  { part: "Graphics", minimum: "GTX 1050 Ti, 4 GB", recommended: "RTX 2070, 8 GB" },
  { part: "Other", minimum: "DirectX 12; broadband; 100 GB free", recommended: "DirectX 12; broadband; 100 GB free" },
];
export const AION_2_COMPENSATION_SERVERS = {
  Elyos: "Nezekan, Kaisinel, Ariel, Meslamtaeda, Nania, Luteros, Daminu, Bakarma, Kochi, Tiamat",
  Asmodian: "Zikel, Lumiel, Azphel, Beritra, Ulgorn, Odar, Kromede, Baba, Fafnir, Agnita, Atiel",
};
export const AION_2_COMPENSATION_REWARDS = [
  { item: "Life Crystal", amount: 20 },
  { item: "Resurrection Spiritstone", amount: 10 },
  { item: "Battle Enhance Scroll", amount: 20 },
  { item: "Content Usage Ticket Selection Chest", amount: 5 },
  { item: "Odyle Energy", amount: 5 },
];
export const AION_2_SUPPORT_CHECKLIST = "AION 2 Global support report\nRegion and server:\nClient: Steam / PURPLE\nTime of issue and time zone:\nExact error or Block Code:\nExpected result / actual result:\nSteps to reproduce:\nChecks already tried:\nWindows / CPU / GPU / RAM (for launch or crash issues):";

const ignoredWords = new Set(["a", "an", "the", "i", "my", "me", "how", "what", "why", "when", "where", "do", "does", "can", "cant", "cannot", "wont", "will", "not", "dont", "doesnt", "is", "are", "am", "im", "to", "for", "of", "and", "it", "its", "should", "please", "on", "after", "with", "in", "at", "be", "been", "still", "keep", "keeps", "kept", "much", "many", "find", "see", "show", "get", "getting", "have", "has", "want", "need", "this", "that", "any"]);
const forms: Record<string, string> = { characters: "character", items: "item", transfers: "transfer", transferring: "transfer", servers: "server", launching: "launch", crashed: "crash", crashes: "crash", crashing: "crash", locked: "lock", banned: "ban", restrictions: "restricted", restriction: "restricted", slots: "slot", requirements: "requirement", rewards: "reward", accounts: "account", linking: "link", relinking: "relink", costs: "cost", prices: "price" };
function searchWords(value: string) {
  return value.toLowerCase().replace(/[’']/g, "").replace(/\blog\s+in\b/g, "login").replace(/\b(?:cant|cannot)\s+(?:find|see)\s+(?:(?:my|a|the|any)\s+)*characters?\b/g, "missing character").replace(/\b(?:change|changing|switch|switching|move|moving)\s+(?:(?:my|to|a|the|another)\s+)*servers?\b/g, "transfer").split(/[^\p{L}\p{N}]+/u).filter((word) => word && !ignoredWords.has(word)).map((word) => forms[word] || word);
}
const searchIndex = AION_2_HELP_GUIDES.map((guide) => ({
  guide,
  words: new Set(searchWords(`${guide.title} ${guide.answer} ${guide.steps.join(" ")} ${guide.keywords}`)),
  directWords: new Set(searchWords(`${guide.title} ${guide.keywords}`)),
}));
const vocabulary = new Set(searchIndex.flatMap((entry) => [...entry.words]));
export function findAionHelp(query: string, group: AionHelpGroup = "all") {
  const terms = searchWords(query);
  // Match useful symptom words, allowing conversational phrasing and an exact
  // error code absent from this guide. A wholly unknown query stays empty.
  const useful = terms.filter((term) => vocabulary.has(term));
  if (terms.length && !useful.length) return [];
  return searchIndex.filter((entry) => (group === "all" || entry.guide.group === group) && useful.every((term) => entry.words.has(term)))
    .sort((a, b) => useful.filter((term) => b.directWords.has(term)).length - useful.filter((term) => a.directWords.has(term)).length)
    .map((entry) => entry.guide);
}

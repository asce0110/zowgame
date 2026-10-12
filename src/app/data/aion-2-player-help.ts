export const AION_2_HELP_CHECKED = "2026-10-12";
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
  account: "https://steamcommunity.com/games/3393110/announcements/detail/712288859283524486",
  compensation: "https://steamcommunity.com/games/3393110/announcements/detail/712288859283523340",
};

// Dated official facts, followed by an editorial order of checks. No live
// maintenance, individual-account decision or guaranteed repair is inferred.
export const AION_2_HELP_GUIDES: AionHelpGuide[] = [
  {
    id: "login", group: "access", title: "I cannot log in, or character selection is stuck. What should I check?",
    answer: "First identify whether the failure is regional, account-related or local. The October 9 Nezekan NA West report is marked resolved; it does not establish the cause of a new login failure.",
    steps: [
      "Record the region, server, Steam or PURPLE client, exact message and time with its time zone. A player-count drop alone cannot confirm an outage.",
      "Match the newest official notice to that region and time. A past maintenance notice is not a live status reading. If a current notice covers your session, follow its stated recovery update.",
      "If there is no matching notice, finish pending client updates and retry once. For a repeated failure, send the recorded details to AION 2 Global support; use the block-code or account guide below if that is the message shown.",
    ],
    boundary: "These are triage steps. This tracker has no server-health API and cannot diagnose a login failure from concurrent-player numbers.",
    keywords: "login log in logging maintenance outage connection connect disconnect disconnected queue queued stuck latency server status nezekan",
    sources: [{ label: "NC · dated Nezekan issue report", url: sources.known }, { label: "NC · newest Steam notices", url: "https://steamcommunity.com/app/3393110/allnews/" }],
  },
  {
    id: "startup", group: "access", title: "AION 2 will not launch or crashes on my PC. What can I try?",
    answer: "Use a local installation check before assuming a server outage. Steam recommends checking requirements, updating the operating system and drivers, and verifying installed files for launch problems.",
    steps: [
      "Compare your PC with the minimum and recommended requirements below. Record your Windows version, CPU, GPU and RAM for a repeatable report.",
      "Restart the PC, launch Steam and complete pending game updates. Install Windows and graphics-driver updates through their official channels when needed.",
      "In Steam: Library → AION 2 → Properties → Installed Files → Verify integrity of game files. Let verification finish, then test the same launch again.",
      "If the game still fails, record whether it exits before or after the launcher, the exact error and the time. Use the block-code guide for a displayed Block Code; otherwise submit those details to the game’s support team.",
    ],
    boundary: "File verification repairs installation problems; it cannot remove an account restriction or guarantee a fix for every crash.",
    keywords: "launch launching wont will not start startup crash crashing pc computer fps performance requirements specs minimum recommended ram gpu files verify installation download",
    sources: [{ label: "Steam · launch troubleshooting", url: "https://help.steampowered.com/en/faqs/view/5814-D9A3-BE42-62DF" }, { label: "Steam · verify installed files", url: "https://help.steampowered.com/en/faqs/view/0C48-FCBD-DA71-93EB" }, { label: "NC · system requirements", url: "https://help.plaync.com/faq/aion2global?faqNo=7083" }],
  },
  {
    id: "block-code", group: "access", title: "The game closes with a Block Code. What should I do?",
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
    id: "transfer", group: "transfers", title: "Why is server transfer unavailable, and when can I apply?",
    answer: "The announced window starts after maintenance on October 13 PDT for Early Access servers, and October 20 PDT for Launch servers. Each lasts until the following week’s maintenance. October 12 is before these openings.",
    steps: [
      "Check server type, same region and same faction. Early Access transfers stay within Early Access servers. The offer allows one transfer per account.",
      "Check the regional application hours below. A closed departure application window or either server reaching its transfer limit can also make the service unavailable.",
      "Read the in-game destination message. Already owning a character there does not override capacity limits.",
    ],
    boundary: "Opening follows maintenance completion, not a fixed midnight. The table preserves published PDT hours; check the game’s current message for availability.",
    keywords: "transfer transfers transferring server unavailable grey gray disabled button destination source region faction early access launch schedule times time",
    sources: [{ label: "NC · transfer offer and eligibility", url: sources.transfer }, { label: "NC · transfer windows and limits", url: sources.transferQa }],
  },
  {
    id: "belongings", group: "transfers", title: "What should I prepare before transferring characters and items?",
    answer: "Character inventory and Character Storage move with the character; Server Storage items do not. Move wanted items to a transferring character first. The transfer costs 0 Quna, but extra destination character slots cost 1,000 Quna each.",
    steps: [
      "Collect outstanding Market items or proceeds, Shop Storage purchases and character mail. Clear active Duty Missions before applying.",
      "Check destination character-slot capacity and select the characters to move. Purchased character slots on the departure server stay there.",
      "Expect a temporary character name, then rename on first login. A previously used name may be taken at the destination.",
    ],
    boundary: "Check the final in-game price and eligibility before confirming a transfer. This checklist does not promise that every form of server-level progress transfers.",
    keywords: "transfer item items storage inventory cube kina quna cost price free slot slots character name rename preparation market mail mission",
    sources: [{ label: "NC · transfer preparation and pricing", url: sources.transfer }, { label: "NC · storage, slots and names", url: sources.transferQa }],
  },
  {
    id: "account", group: "accounts", title: "My account is restricted or security-locked. How do I request a review?",
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
    answer: "Check the EU server list below. Eligible active memberships and activated pet auto-loot receive one extra day at upcoming maintenance; the supply chest arrives through in-game mail.",
    steps: [
      "Match your server and the active-service condition. These extensions need no player action.",
      "Check mail for the chest. If an expected reward is absent, report your server and missing reward to support.",
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

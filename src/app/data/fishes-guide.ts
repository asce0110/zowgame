// Verified against the developer's public pages on this date; no live price feed.
export const FISHES_VERSION = "v1.1.4.4";
export const FISHES_CHECKED = "2026-10-07";
const official = "https://dopplerghost.itch.io/dont-sleep-with-the-fishes";
export const fishesSources = {
  official: { label: "Developer's game page", url: official },
  steam: { label: "Official Steam store", url: "https://store.steampowered.com/app/4834070/Dont_Sleep_With_The_Fishes/" },
  patch1144: { label: "Developer: v1.1.4.4 announcement", url: `${official}/devlog/1621472/50000-copies-sold-small-game-fixes` },
  patch114: { label: "Developer: v1.1.4", url: `${official}/devlog/1603522/version-114` },
  hotfix: { label: "Developer: v1.1.4.2 hotfix", url: `${official}/devlog/1604159/hotfix-1142` },
  patch113: { label: "Developer: v1.1.3 Steam launch", url: `${official}/devlog/1564786/version-113-steam-launch-now` },
  patch112: { label: "Developer: v1.1.2", url: `${official}/devlog/1546268/version-112` },
  achievements: { label: "Steam's 12 achievement objectives", url: "https://steamcommunity.com/stats/4834070/achievements/" },
  community: { label: "Community guide (July 2026; older mechanics)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3752972642" },
  heart: { label: "Players: Heart Parts route", url: "https://steamcommunity.com/app/4834070/discussions/0/570416524212440993/" },
  kraken: { label: "Players: Kraken outcomes", url: "https://steamcommunity.com/app/4834070/discussions/0/570416802712023697/" },
};
type Source = keyof typeof fishesSources;
type Section = { title: string; body?: string; bullets?: string[]; headers?: string[]; rows?: string[][]; sources: Source[]; spoiler?: boolean };
type GuidePage = { title: string; description: string; sections: Section[] };

export const fishesFaqs = [
  { q: "Where can I play or download it?", a: "Buy the Windows download from DopplerGhost on itch.io or Taiki / DopplerGhost on Steam. This site is an unofficial guide and does not host the game." },
  { q: "What is the latest verified version?", a: `The developer's download list provides ${FISHES_VERSION}. Sources last checked ${FISHES_CHECKED}; check the official page for subsequent releases.` },
  { q: "How much does it cost?", a: "itch.io lists a minimum of US$1.99. Steam prices depend on region and promotions; check its store for the current checkout price." },
  { q: "Does it support my device or language?", a: "The official listings support Windows and English. Steam Cloud, native Mac/Linux/mobile support, and a Valve Steam Deck rating were not confirmed in the pages checked." },
  { q: "Do I need to collect a Fishing Rod?", a: "The community guide reports that fishing and repair equipment are already aboard the lifeboat. Spend evacuation time on supplies; bait improves fishing but can be switched off." },
  { q: "What changed for Frederik?", a: "His support now preserves bait on successful catches for that day. The old guaranteed-catch advice is obsolete." },
  { q: "How many endings are there?", a: "The developer confirms multiple endings without an exact total. Steam lists 12 achievements, which include milestones as well as endings." },
  { q: "Is paying the debt a separate ending from True End?", a: "Steam identifies paying back the debt as the True End objective. The developer confirms that collecting Heart Parts can still lead to it after a Kraken encounter in the same run." },
  { q: "What should I do if a new run inherits old status?", a: "Update the game. The v1.1.4.2 hotfix addresses run data incorrectly persisting between runs. If it continues on the current version, record your version and reproduction steps for the developer." },
];

export const fishesChangelog = [
  { version: FISHES_VERSION, date: "2026-08-15", sourceUrl: fishesSources.patch1144.url, summary: "True Ending remains reachable after Kraken; Scuba Gear balance and event fixes.", details: [{ label: "Changes", items: ["Heart Parts can unlock True Ending even after a Kraken encounter in the same run.", "Scuba Gear starts with a 10% lower break chance; the chance of saving one Energy after use rises by 8%.", "Eating your Shipmate occurs more often. Junker journal and duplicate Swimbelt issues fixed.", "Announcement dated August 15 (UTC); the download files are timestamped August 8. Alt+Enter switches to windowed mode."] }] },
  { version: "v1.1.4.2", date: "2026-07-26", sourceUrl: fishesSources.hotfix.url, summary: "Run-state reset fix.", details: [{ label: "Fix", items: ["State that should reset no longer incorrectly carries between runs."] }] },
  { version: "v1.1.4", date: "2026-07-25", sourceUrl: fishesSources.patch114.url, summary: "New events, food, sickness, fishing controls, and revised rescue.", details: [{ label: "Changes", items: ["Friend Found, Junker, and Hunger events added; Frederik's support changed to conserving bait.", "Bait can be toggled off. Coconut added; eating junk can cause sickness that blocks eating for 1–3 days, curable with a First Aid Kit.", "Correct signaling starts a rescue countdown; Flare Gun is faster than Flashlight. Failed flashlight attempts can recover later.", "Invert Y and disable head-bob settings added; night audio volume and bait consumption on Energy Bars fixed."] }] },
  { version: "v1.1.3", date: "2026-06-26", sourceUrl: fishesSources.patch113.url, summary: "Steam launch and survival improvements, also released on itch.io.", details: [{ label: "Changes", items: ["Steam achievements introduced at launch; existing itch.io progress should carry over.", "Enable Fast-Forward in Settings, then hold F during night introductions. Small Island allows sending a shipmate.", "First Aid Kit healing rises from 50% to 70%. Junk scaling after Day 30 slows; bait's default effectiveness lasts until Day 60.", "Hungry or sick shipmates gain visual feedback; Frederik's pipe animation and other bugs fixed."] }] },
  { version: "v1.1.2", date: "2026-06-06", sourceUrl: fishesSources.patch112.url, summary: "Support actions, tracking, and item balance before the Steam release.", details: [{ label: "Changes", items: ["Bait is spent only on fish catches; Duct Tape repairs become optional. Swim Ring joins chest loot.", "Support actions added. Laurel doubles hunger restored by food; Row reduces repair costs by two Energy. Frederik's original catch guarantee is superseded in v1.1.4.", "Captain Whiskers gains a 1% fishing bonus. Lore and highest-day tracking added; older v1.1.1 runs are not recorded.", "Three night events and alternative pickup inputs added. Rescue chances and starvation handling adjusted."] }] },
];

const supportSection: Section = {
  title: "Choose Support for Today's Work",
  body: "Support is offered conditionally, costs one Energy, and expires at the end of the day. Check the shipmate's status board before budgeting actions.",
  headers: ["Shipmate", "Support", "Use when"],
  rows: [["Frederik", "Keep bait on successful catches", "Fishing with bait"], ["Row", "Repairs cost two less Energy", "Boat or item repairs"], ["Laurel", "Food restores twice the hunger", "Eating and recovery"], ["Captain Whiskers", "1% fishing bonus (passive)", "A small extra catch chance"]],
  sources: ["patch114", "patch112"],
};
const rescueSection: Section = {
  title: "Rescue: Airplane and Cargo Ship",
  body: "Signal with a Flare Gun or Flashlight, then keep surviving until rescue. The newer countdown replaces advice that treats every subsequent night as a fresh rescue lottery. No fixed wait length is published in the patch notes.",
  sources: ["patch114"],
};
const heartSection: Section = {
  title: "True End / Pay Back Your Debt",
  body: "These refer to the same Steam objective. The developer confirms that an earlier Kraken encounter no longer closes the route. Keep collecting Heart Parts rather than abandoning the run.",
  bullets: ["Community route: collect three Heart Parts, then reach the relevant Kraken / Heart encounter.", "Players report parts from the red-sea encounter, chests, fishing, and occasionally Row's dialogue. These are random opportunities, not a guaranteed day-by-day sequence.", "Exact drop rates, danger thresholds, and dialogue timing are community observations and are not verified here."],
  sources: ["achievements", "patch1144", "heart"], spoiler: true,
};
const newEvents: Section = {
  title: "New Encounters Since v1.1.4",
  headers: ["Event", "What changes your plan"],
  rows: [["Friend Found", "Leaving alone can allow a later shipmate rescue."], ["Junker", "Offers a use for accumulated junk."], ["Hunger", "Starvation without food can trigger a desperate eating choice."], ["Small Island", "Visit yourself for a chance at Coconut, or send a shipmate."], ["Sickness", "Keep medical supplies available before taking food risks."]],
  sources: ["patch114", "patch1144"],
};
export const fishesGuidePages: Record<string, GuidePage> = {
  guide: {
    title: "Beginner Guide", description: "Evacuate, budget daily energy, and choose a route using current developer notes.",
    sections: [
      { title: "Evacuate With a Plan", body: "Gather supplies, throw them into the lifeboat, and stay near it when evacuation ends. There is room for one human shipmate. Item positions vary, so adapt your route.", bullets: ["Editorial priority: food and bait for recovery, a signaling item for rescue, medical supplies, then tools for encounters.", "Community correction: the lifeboat already has fishing and repair equipment; a Fishing Rod is not a scavenging prerequisite."], sources: ["official", "community"] },
      { title: "Controls and Comfort", headers: ["Action", "Input"], rows: [["Move during scavenging", "W / A / S / D"], ["Pick up and toss supplies", "E, Left-Click, or Right-Shift"], ["Survival choices", "Mouse: point and click"], ["Speed up night introductions", "Hold F after enabling Fast-Forward"], ["Windowed mode", "Alt+Enter"], ["Camera comfort", "Disable head-bob or invert Y in Settings"]], sources: ["official", "patch113", "patch114", "patch1144"] },
      { title: "Read Status Before Spending Energy", body: "Fishing, eating, tasks, and conversation share the daytime budget. Check hunger, health, hull, and shipmate status first. Keep enough capacity for the task that prevents today's immediate failure; survival has no guaranteed calendar.", sources: ["official"] },
      supportSection, rescueSection,
      { title: "Recover From Bad Food Choices", body: "Eating junk is a last resort. Coconut is another food option. Check the medical and food notes before taking these risks, especially if tomorrow's meals are your only recovery plan.", sources: ["patch114"] },
      { title: "Before You Start", body: "The game contains jumpscares, flashing lights, and loud sounds. Use the comfort and audio settings. If an old build carries illness or other state into a fresh run, update before treating it as a gameplay rule.", sources: ["official", "hotfix"] },
    ],
  },
  walkthrough: {
    title: "Survival Walkthrough", description: "A decision-based route through evacuation, daily survival, and ending preparation.",
    sections: [
      { title: "1. Pick Your Goal Before Evacuation", body: "For a first run, plan for recovery and signaling. For a secret-ending attempt, expect additional random opportunities. Avoid a fixed Days 1–10 script: encounters and supplies vary.", sources: ["steam"] },
      { title: "2. Stock the Lifeboat", body: "Use the Beginner Guide's control reference. Bring food, bait, medical supplies, and route tools. Return to the boat before the evacuation ends; choosing supplies is useless if you miss departure.", sources: ["official"] },
      { title: "3. Repeat the Daytime Status Check", bullets: ["Read today's hunger, health, hull, and companion status.", "Check whether support is available and worth its Energy cost.", "Choose fishing, recovery, repair, or another task according to the immediate risk.", "Read night choices carefully; a listed item does not guarantee a safe outcome."], sources: ["official", "patch112"] },
      rescueSection, heartSection,
      { title: "4. Recover After a Dangerous Night", body: "Repair and heal before taking another optional risk. Players report that the Anchor can repel Kraken but can still break or be lost, with severe damage possible. It is not an invulnerability item.", sources: ["kraken"] },
    ],
  },
  items: {
    title: "Items & Supplies", description: "Pack for survival: food, bait, medicine, and the tools your route needs.",
    sections: [
      { title: "Pack for Your Route", headers: ["Purpose", "Items to consider"], rows: [["Recovery", "Food, Bait, First Aid Kit"], ["Signaling", "Flare Gun, Flashlight"], ["Encounters", "Anchor, Bucket, Fishing Net, Duct Tape"], ["Exploration", "Scuba Gear, Map, Compass"], ["True End", "Heart Parts"]], body: "These are editorial priorities, not official rankings. A useful pack depends on your goal and the supplies you can reach.", sources: ["community", "patch114"] },
      { title: "Bait and Built-In Equipment", body: "Fishing does not require bait: switch it off to conserve stock. The community reports a rod and repair kit are already aboard. The older instruction to scavenge a rod or inevitably starve is incorrect.", sources: ["community", "patch114"] },
      { title: "Food and Medicine", body: "Coconut restores substantial hunger and a little health for one Energy. Junk risks illness; First Aid Kits cure it. Healing was increased to 70% in v1.1.3.", sources: ["patch114", "patch113"] },
      { title: "Scuba Gear", body: "v1.1.4.4 improves its initial durability and chance of saving Energy after use. These are relative balance changes, not a published absolute success rate. Treat diving as a calculated risk.", sources: ["patch1144"] },
      { title: "Duct Tape", body: "Repairs using tape are optional from v1.1.2, and its chest drop chance was reduced. Decide whether a repair now is worth using your remaining supply.", sources: ["patch112"] },
      heartSection,
    ],
  },
  events: {
    title: "Night Events Guide", description: "New encounters and a source-labeled reference for risky night choices.",
    sections: [newEvents, rescueSection,
      { title: "Community Counter Notes", headers: ["Encounter", "Reported response", "Caution"], rows: [["Kraken", "Anchor or Harpoon", "Serious damage or item loss remains possible"], ["Anglerfish", "Harpoon or Flashlight", "Item loss and damage vary by outcome"], ["Seagull", "Feed to pursue its ending; repel otherwise", "Keeping birds changes the run"]], body: "These are community observations. Check your health and supplies before acting: a counter may protect you at the cost of damage or equipment.", sources: ["kraken", "community"] },
      heartSection,
      { title: "When You Have No Answer", body: "The developer explicitly allows trying to sleep when you have no useful item. Read the encounter first: sleeping is an available choice, not a universally safe one.", sources: ["official"] },
    ],
  },
  characters: { title: "Characters & Crew", description: "Know your shipmates, their support abilities, and when to ask for help.", sections: [supportSection,
    { title: "One Human Companion", body: "The store describes three human shipmates and room for one beside you. The community guide describes Captain Whiskers as an additional cat passenger. No developer note checked here requires Laurel for rescue or Row for True End.", sources: ["steam", "community"] },
    { title: "Leaving Alone Is Now a Route Choice", body: "Friend Found adds a possible later companion encounter. It is a chance, not a replacement guaranteed to make up for evacuating alone.", sources: ["patch114"] },
  ] },
  endings: { title: "Endings Guide", description: "Official ending objectives, current rescue mechanics, and clearly marked community route details.", sections: [rescueSection, heartSection,
    { title: "Other Official Objectives", headers: ["Objective", "Steam achievement"], rows: [["Reach land", "By your own means"], ["Board another vessel", "Sailing to Safety"], ["Be kidnapped", "Sleeping With Ghosts"], ["Death", "Sleeping With The Fishes"], ["Starvation", "Eating With The Fishes"], ["Sink with the original ship", "Sleeping With Scraps"], ["Too many friends", "Sleeping with Feathers"]], body: "Achievement objectives establish that these outcomes exist; they do not prove a complete route. We do not claim 12 endings simply because there are 12 achievements.", sources: ["achievements"], spoiler: true },
  ] },
  "tips-tricks": { title: "Tips & Tricks", description: "Practical decisions grounded in patch notes, with uncertain route advice labeled.", sections: [supportSection, rescueSection,
    { title: "Reserve Recovery Supplies", body: "Food risks can make tomorrow's plan fail. Keep a First Aid Kit available and check the Items page before eating junk or planning a dive.", sources: ["patch114", "patch1144"] },
    { title: "Keep a Long Run's Goal Clear", body: "A survival record and an ending attempt need different choices. Do not chase every secret at once. Track your highest day from the Main Menu; records from v1.1.1 were not backfilled.", sources: ["patch112"] },
    { title: "Old Guides Need Version Checks", body: "Guaranteed Frederik catches, permanent failed-flashlight lockouts, and mandatory pre-Kraken Heart completion are outdated. The linked developer notes take precedence over older walkthroughs.", sources: ["patch114", "patch1144"] },
  ] },
  achievements: { title: "Achievements & Completion", description: "All 12 Steam achievement names and objectives, separated from ending count.", sections: [
    { title: "Steam Achievement Checklist", headers: ["Achievement", "Objective (paraphrased)"], rows: [["Sleeping With The Fishes", "Death"], ["Eating With The Fishes", "Starvation"], ["Sleeping With Scraps", "Sink on Dorothy"], ["Sleeping with Feathers", "Excessive bird friendships"], ["A Long Sail", "Day 50"], ["Three for one!", "A Swordfish catch"], ["Back to the Company", "Rescue"], ["Sailing to Safety", "Boarding another vessel"], ["By your own means", "Landfall"], ["True End", "Debt repayment"], ["Sleeping With Ghosts", "Abduction"], ["Still Standing", "Complete Drowning difficulty"]], sources: ["achievements"], spoiler: true },
    { title: "Track Your Run", body: "Lore items and highest-day records are available from the Main Menu. The launch notes say prior itch.io progress should grant relevant Steam achievements at startup; this is not a promise of Steam Cloud synchronization.", sources: ["patch112", "patch113"] }, heartSection,
  ] },
  steam: { title: "Steam & Download Guide", description: "Official purchase links, requirements, and a comparison with itch.io.", sections: [
    { title: "Official Distribution", body: "Steam lists Taiki as developer and DopplerGhost as publisher, with a June 26, 2026 release. itch.io offers the Windows download at US$1.99 or more. Steam regional prices and temporary discounts should be checked at checkout.", sources: ["steam", "official"] },
    { title: "Steam vs itch.io", headers: ["Feature", "Steam", "itch.io"], rows: [["Download", "Steam client", "ZIP / RAR from developer"], ["Achievements", "12 listed", "No Steam achievement integration claimed"], ["Updates", "Client-managed", "Download a current build"], ["Language", "English", "English"], ["Cloud / Deck", "Not confirmed in checked sources", "No equivalent feature confirmed"]], sources: ["steam", "official", "achievements"] },
    { title: "Windows Requirements", body: "Minimum: Windows 10 (64-bit), Core i5-4460 or Ryzen 3 1200, 8 GB RAM, GTX 750 Ti / Radeon R7 265 / Intel UHD 620, and 1 GB storage. No verified Steam Deck performance result is available here.", sources: ["steam"] },
    { title: "Updating and Troubleshooting", body: "Check the version in your installed build. itch.io buyers must obtain the current download rather than assume an older archive updates itself. If a fault persists, send the developer the build number and steps that reproduce it.", sources: ["official", "hotfix"] },
  ] },
  faq: { title: "FAQ", description: "Current answers about download, support, versions, and game mechanics.", sections: fishesFaqs.map(({ q, a }) => ({ title: q, body: a, sources: ["official", "steam", "patch114", "patch1144", "achievements"] })) },
  changelog: { title: "Changelog", description: "Developer-sourced version history through v1.1.4.4.", sections: fishesChangelog.map((entry) => ({ title: `${entry.version} — ${entry.date}`, body: entry.summary, bullets: entry.details.flatMap((d) => d.items), sources: [Object.entries(fishesSources).find(([, s]) => s.url === entry.sourceUrl)![0] as Source] })) },
};

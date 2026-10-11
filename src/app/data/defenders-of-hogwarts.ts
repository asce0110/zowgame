import type { GameRecord } from "./games";
import { defendersGuideSections, defendersRuleFaqs } from "./defenders-guide";

export const DEFENDERS_CHECKED = "2026-10-12";

export const defendersSources = {
  project: {
    label: "MinaLima's official Kickstarter project",
    url: "https://www.kickstarter.com/projects/minalima/defenders-of-hogwarts",
  },
  faq: {
    label: "Official availability, editions and shipping FAQ",
    url: "https://www.kickstarter.com/projects/minalima/defenders-of-hogwarts/faqs",
  },
  latestUpdate: {
    label: "October 8 late-pledge announcement",
    url: "https://www.kickstarter.com/projects/minalima/defenders-of-hogwarts/posts/4805669",
  },
  studio: {
    label: "MinaLima's Harry Potter collection",
    url: "https://minalima.com/shop-wizarding-world/shop-by-collection/harry-potter/",
  },
  rulebook: {
    label: "Official Defenders of Hogwarts rulebook",
    url: "https://media.minalima.com/2026/06/Defenders_of_Hogwarts_-_A_board_game_by_MinaLima_-_Rulebook.pdf",
  },
  tutorial: {
    label: "The Meeple Marathon: gameplay tutorial",
    url: "https://www.youtube.com/watch?v=om_BjOG9UuY",
  },
  tutorialAnnouncement: {
    label: "MinaLima's recommended tutorial announcement",
    url: "https://www.kickstarter.com/projects/minalima/defenders-of-hogwarts/posts/4743821",
  },
  support: {
    label: "MinaLima contact and product enquiries",
    url: "https://minalima.com/contact-us/",
  },
  backerSupport: {
    label: "Official campaign backer support",
    url: "https://www.hiveinteractive.net/supporttickets/project/478",
  },
} as const;

type DefendersQuestion = { q: string; a: string; category: "Rules" | "Buying & support" | "About the game"; links?: Array<{ label: string; url: string }> };
export const defendersFaqs: DefendersQuestion[] = [
  {
    q: "Is ‘harry potter defenders rpg game’ an online RPG?",
    category: "About the game",
    a: "If you mean MinaLima's Defenders of Hogwarts, it is a physical Harry Potter board game. It is not a browser RPG or a downloadable video game. This guide explains that distinction and points you to the official project.",
  },
  {
    q: "Who made Defenders of Hogwarts?",
    category: "About the game",
    a: "Defenders of Hogwarts is a board game from MinaLima, the graphic design studio behind the Harry Potter films, developed with designer David Waterman.",
  },
  {
    q: "Can I play it for free on ZowGame?",
    category: "About the game",
    a: "This page is a guide to the physical game. There is no embedded digital version here. Use the official project and publisher links to check the game and its availability.",
  },
  {
    q: "Is the Kickstarter campaign still running?",
    category: "Buying & support",
    a: "The original campaign ran from June 30 to July 23, 2026. The October 8 update announced one day left for late pledges. An old pledge button does not confirm that orders are still accepted. Follow the official project's current ordering link and verify the checkout before paying.",
  },
  {
    q: "How much does the base game cost?",
    category: "Buying & support",
    a: "The official FAQ lists a recommended UK retail price of £75 including UK VAT for the base game. This is a reference price, not a live offer. Shipping, regional taxes, edition and current stock can change the amount you pay.",
  },
  {
    q: "When is delivery expected?",
    category: "Buying & support",
    a: "The official FAQ gives October 2026 as the estimated base-game shipping window. The Collector's Box and related second-shipment extras are estimated for March 2027. These are estimates, not confirmation that a particular order has shipped or arrived.",
  },
  {
    q: "Which languages are available?",
    category: "Buying & support",
    a: "The official FAQ says the initial Kickstarter game is in English. Translated editions are planned for a later release; confirm the language of the edition you intend to order.",
  },
  { q: "How many people can play, how long does it take, and what is the age rating?", category: "About the game", a: "The official rulebook lists 2–5 players, about 90 minutes, and ages 13+. A learning session may take longer. One person plays the Dark Arts side; the other one to four players each choose a Hogwarts house. No official solo mode is described in this rulebook." },
  { q: "Is this the same game as Harry Potter: Hogwarts Battle?", category: "About the game", a: "No. This guide covers MinaLima's Defenders of Hogwarts, designed with David Waterman. Check the full title and publisher on your box before using these rules; similarly named Harry Potter games have different instructions." },
  { q: "Which edition should I choose?", category: "Buying & support", a: "Start with the base game if your goal is to play. The official FAQ says the retail and Kickstarter versions use the same base game. Campaign tiers add accessories and presentation upgrades; compare the actual included items, language, total cost and delivery windows before choosing a tier." },
  { q: "Does the listed price include shipping and every tax?", category: "Buying & support", a: "No. The £75 reference is the recommended UK base-game retail price including UK VAT. Campaign shipping and applicable regional sales taxes or import duties are handled separately. Use the seller's final checkout total for your address." },
  { q: "What should I do if a component is missing, damaged or my order has not arrived?", category: "Buying & support", a: "Compare your copy with the component list on printed page 4 of the official rulebook. Record the item and your order details, then contact the seller. The campaign FAQ asks customers to report damage or defects with a description and photos within 7 days of receipt, without affecting statutory rights. Campaign backers should use the official support-ticket link; general product questions go to MinaLima's contact page. Keep personal order information out of public comments." },
  { q: "Can I cancel a campaign order or return the game?", category: "Buying & support", a: "The campaign FAQ, checked October 12, 2026, gives September 30, 2026 as the cancellation cutoff; that date has passed. Its return policy allows unused, unopened base games within 28 days of receipt, with a 20% administration fee. Shipping, duties and taxes are excluded from the refund, and return postage is not covered. Made-to-order extras have separate exclusions. Contact backer support and read the full current policy before returning anything. For a retail purchase, check your seller's terms." },
  { q: "I have not received the pledge-manager invitation. What next?", category: "Buying & support", a: "Check the inbox and spam folder for the email associated with your pledge, then contact official campaign support with your backer and order details. The FAQ describes the pledge manager as the place to confirm your address, add available extras and pay applicable shipping and taxes. Do not assume a missed email means the game is dispatched; ask support to confirm your order status." },
  { q: "Where is the complete rulebook, and which instructions take priority?", category: "Rules", a: "The complete English PDF is linked in Sources & tutorials below. Page references in this guide use its printed page numbers. If your supplied edition or a later official correction differs, follow those current official instructions. For an unresolved interaction, quote the exact card text and rulebook page when contacting MinaLima." },
  { q: "Where can I buy Defenders of Hogwarts?", category: "Buying & support", a: "Follow MinaLima's official project and its current ordering destination. The original Kickstarter campaign has ended, and the October 8 late-pledge announcement does not establish that orders are still open today. The FAQ describes selected House of MinaLima retail sales from autumn 2026; ask the seller about current stock, language, delivery and total cost before ordering.", links: [defendersSources.project, defendersSources.support] },
  { q: "How do I set up a first game, and who goes first?", category: "Rules", a: "Use the Set up a first game section above and the diagrams on printed pages 6–9. Choose one Dark Arts Player and one to four different Houses, adjust the Dark Arts pawn pool to that count, prepare the board and separate decks, then give every player five starting cards. The House Player on the Dark Arts Player's left starts; turns continue clockwise." },
  { q: "How do House Players collect Defence Shields and win?", category: "Rules", a: "Bring a House pawn to a Defence Shield Space with one Library Book, one Parchment Scroll and the third item pictured on that shield: either a D.A. Coin or the Dark Detector. Exchange all three items and take the shield. You win when your own House has two shields; shields owned by different Houses are not added together. Spending the Detector also moves your Loyalty pawn back three spaces. See printed pages 11–12 and 18–19." },
  { q: "What happens when my Draw Deck is empty?", category: "Rules", a: "When you need to draw and your Draw Deck runs out, shuffle your Discard Pile to create a new Draw Deck. Acquired cards normally go on top of your own Draw Deck, not into your hand. Five cards is the Replenish target rather than a universal hand limit. At the final Dark Arts Path space, Replenish is disabled, but other card-draw effects still work." },
  { q: "How do stunned pawns recover?", category: "Rules", a: "A stunned pawn lies sideways and cannot move through a card's movement value or effect. Replenish stands up that player's own stunned pawns. House Replenish draws cards first, then stands its pawns and advances the Dark Arts Path. Dark Arts Replenish stands its pawns first, then draws to five without discarding unwanted cards or advancing the path." },
  ...defendersRuleFaqs.map((faq) => ({ ...faq, category: "Rules" as const })),
];

// Keep actionable source links beside the answer, including when it is the only search result.
for (const faq of defendersFaqs) {
  if (faq.links) continue;
  faq.links = faq.q.startsWith("What should I do if a component")
    ? [{ label: "Component checklist · printed page 4", url: `${defendersSources.rulebook.url}#page=3` }, defendersSources.backerSupport, defendersSources.support]
    : faq.category === "Buying & support"
    ? [defendersSources.faq, defendersSources.backerSupport]
    : faq.category === "Rules" ? [defendersSources.rulebook] : [defendersSources.project];
}

export const defendersSections = [
  { id: "overview", title: "What is it?" },
  { id: "rules", title: "Rules at a glance" },
  { id: "setup", title: "Set up a first game" },
  { id: "house-turn", title: "House player turn" },
  { id: "dark-turn", title: "Dark Arts turn" },
  { id: "movement", title: "Movement & obstacles" },
  { id: "resources", title: "Items, tokens & loyalty" },
  { id: "ending", title: "Win conditions" },
  { id: "strategy", title: "First-game decisions" },
  { id: "availability", title: "Where to buy" },
  { id: "faq", title: "Questions answered" },
  { id: "glossary", title: "Terms at the table" },
  { id: "sources", title: "Sources & tutorials" },
];

export const defendersOfHogwartsGame = {
  slug: "defenders-of-hogwarts",
  shortTitle: "Defenders of Hogwarts",
  canonicalPath: "/games/defenders-of-hogwarts/",
  ogImage: "/defenders-editorial.webp",
  cardImage: "/defenders-official.webp",
  lastUpdated: DEFENDERS_CHECKED,
  keywords: ["harry potter defenders rpg game", "Harry Potter Defenders of Hogwarts", "Defenders of Hogwarts board game", "MinaLima", "Defenders of Hogwarts rules", "Defenders of Hogwarts availability"],
  heroBadges: ["HARRY POTTER", "PHYSICAL BOARD GAME", "RULEBOOK-BASED GUIDE"],
  primaryCtaLabel: "READ THE GUIDE",
  secondaryCtaLabel: "RULES & SETUP",
  accessMode: "tabletop",
  externalSourceUrl: defendersSources.project.url,
  topBarEyebrow: "// TABLETOP FIELD GUIDE",
  topBarTitle: "DEFENDERS OF HOGWARTS",
  topBarDescription: `A guide to MinaLima's physical Harry Potter board game. Official sources checked ${DEFENDERS_CHECKED}.`,
  notificationFooter: "Official sources linked. Availability and delivery estimates are dated.",
  guideTitle: "How to Play Defenders of Hogwarts",
  guideIntro: "Learn setup, both player turns, movement, resources and winning from the official rulebook. Strategy suggestions are editorial reasoning rather than a first-hand play review.",
  objectiveTitle: "Choose Your Side at Hogwarts",
  objectiveBody: "MinaLima invites players to defend Hogwarts or join the Dark Forces. Read your side's objective in the instructions before planning your first move.",
  guideSteps: defendersGuideSections[0].rules.map(({ title, body }) => ({ title, body })),
  controlsHeading: "Before You Sit Down",
  controlsTable: [{ label: "Format", value: "Physical board game" }, { label: "Publisher", value: "MinaLima" }, { label: "Initial language", value: "English" }, { label: "Instructions", value: "Use the official instructions for your edition" }],
  ruleHeading: "Start With the Official Instructions",
  ruleBody: "Use the setup, turn, movement and win-condition guides below. Each rules section links to the relevant pages in the official rulebook. Follow the instructions for your edition and any later official corrections.",
  tipsHeading: "Prepare Your First Session",
  tipsIntro: "These practical suggestions help you read and learn the game; they are not claims from a completed playtest.",
  tipsOutro: "Use publisher instructions to resolve rule questions. Check the sources below for current ordering and shipping information.",
  tips: [{ title: "Check the language first", body: "The initial Kickstarter edition is English. Make sure your group can comfortably read its cards and instructions." }, { title: "Keep the reference nearby", body: "Read the objectives and setup before beginning, and leave the official instructions open for the first round." }],
  reviewsHeading: "About This Guide",
  reviewsSummary: "Based on official publisher and campaign information. ZowGame has not published a first-hand playtest or a review score for this game.",
  reviews: [],
  quickFactsHeading: "THE BRIEFING",
  quickFacts: [{ label: "Format", value: "Physical board game" }, { label: "Publisher", value: "MinaLima" }, { label: "Designer", value: "David Waterman" }, { label: "Initial language", value: "English" }, { label: "Sources checked", value: DEFENDERS_CHECKED }],
  ambientMessages: ["A physical tabletop game, not an online RPG", "Official ordering information is linked", "Independent guide · no first-hand review score"],
  livePulses: [{ icon: "01", text: "Identify the game before choosing an edition.", weight: "normal" }, { icon: "02", text: "Read the publisher's instructions before your first session.", weight: "normal" }],
  schema: { developer: "MinaLima", genre: ["Board Game", "Fantasy", "Adventure"], operatingSystems: [], platforms: ["Tabletop"], playMode: "MultiPlayer", price: "", priceCurrency: "GBP", ratingCount: 0 },
  content: {
    title: "Harry Potter: Defenders of Hogwarts",
    subtitle: "A castle to defend. A side to choose. A guide to MinaLima's physical Harry Potter board game, with official project and availability sources.",
    genre: "HARRY POTTER · TABLETOP · FANTASY",
    description: "MinaLima's physical Harry Potter board game. Learn setup, turns and win conditions, resolve rules questions, and check official availability.",
    coverImg: "/defenders-editorial.webp",
    iframeUrl: "",
    trailerUrl: "",
    rating: "",
    avgSession: "",
    seoTitle: "Harry Potter Defenders RPG Game: Rules & Player Guide",
    seoDescription: "Defenders of Hogwarts explained: setup, House and Dark Arts turns, win conditions, strategy, rules FAQ and where to buy MinaLima's Harry Potter board game.",
    seoKeywords: "harry potter defenders rpg game, Defenders of Hogwarts, Harry Potter board game, MinaLima rules and availability",
    about: ["Defenders of Hogwarts is a physical Harry Potter board game from MinaLima, developed with David Waterman. This independent guide explains setup, turns, movement and winning from the official rulebook.", "If you searched for ‘harry potter defenders rpg game’, this is a tabletop game rather than a browser RPG or a downloadable video game.", `Official rulebook and publisher sources checked ${DEFENDERS_CHECKED}. Ordering options and delivery estimates can change; verify them with the publisher before buying.`],
    faqs: defendersFaqs,
    notifications: [{ id: "defenders-guide", title: "Rules, turns and answers", body: "A rulebook-based player guide with setup, both turns, win conditions and searchable answers. Availability notes are dated; no first-hand review score.", tag: "Tabletop guide", tone: "emerald", time: DEFENDERS_CHECKED }],
  },
  footerTagline: "© 2026 ZOWGAME · INDEPENDENT GAME GUIDE",
  footerStatus: "BOARD GAME BY MINALIMA",
  activityHeading: "TABLETOP FIELD GUIDE",
  activityCountLabel: "OFFICIAL SOURCES",
  quickActionEyebrow: "BEFORE YOUR FIRST GAME",
  quickActionTitle: "Find the right game.<br />Choose your next question.",
} satisfies GameRecord;

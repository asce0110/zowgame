import type { SiteContent } from "../components/content-store";

export type GameFaqItem = {
  q: string;
  a: string;
};

export type GameNotificationItem = {
  id: string;
  title: string;
  body: string;
  tag: string;
  tone: "fuchsia" | "cyan" | "emerald" | "amber" | "rose";
  time: string;
};

export type GameGuideStep = {
  title: string;
  body: string;
};

export type GameTip = {
  title: string;
  body: string;
};

export type GameReview = {
  name: string;
  date: string;
  rating: number;
  body: string;
};

export type GameQuickFact = {
  label: string;
  value: string;
};

export type GameLivePulse = {
  icon: string;
  text: string;
  weight: "normal" | "hot" | "epic";
};

export type GameSchema = {
  developer: string;
  genre: string[];
  operatingSystems: string[];
  platforms: string[];
  playMode: string;
  price: string;
  priceCurrency: string;
  ratingCount: number;
};

export type GameRecord = {
  slug: string;
  shortTitle: string;
  canonicalPath: string;
  ogImage: string;
  cardImage?: string;
  keywords: string[];
  heroBadges: string[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  accessMode?: "browser" | "download";
  externalSourceUrl?: string;
  topBarEyebrow: string;
  topBarTitle: string;
  topBarDescription: string;
  notificationFooter: string;
  guideTitle: string;
  guideIntro: string;
  objectiveTitle: string;
  objectiveBody: string;
  guideSteps: GameGuideStep[];
  controlsHeading: string;
  controlsTable: GameQuickFact[];
  ruleHeading: string;
  ruleBody: string;
  tipsHeading: string;
  tipsIntro: string;
  tipsOutro: string;
  tips: GameTip[];
  reviewsHeading: string;
  reviewsSummary: string;
  reviews: GameReview[];
  quickFactsHeading: string;
  quickFacts: GameQuickFact[];
  ambientMessages: string[];
  livePulses: GameLivePulse[];
  schema: GameSchema;
  content: SiteContent;
  footerTagline?: string;
  footerStatus?: string;
  activityHeading?: string;
  activityCountLabel?: string;
  quickActionEyebrow?: string;
  quickActionTitle?: string;
};

const cobbContent: SiteContent = {
  title: "COBB CAN MOVE",
  subtitle:
    "Play Cobb Can Move online for free. Survive a dark pixel dungeon, collect coal, keep the furnace alive, and adapt as Cobb gains new rules every level.",
  genre: "SURVIVAL HORROR · ROGUELITE · PIXEL ART",
  description:
    "A survival horror browser game where every level changes the rules and Cobb gains new ways to hunt you.",
  coverImg: "https://img.zowgame.com/cobb-can-move-cover.webp",
  iframeUrl: "https://s.cobb-can-move.com/games/cobb-can-move/index.html",
  trailerUrl: "https://www.youtube.com/watch?v=lyiiHZ2ruAM",
  rating: "4.8",
  avgSession: "18",
  seoTitle: "Cobb Can Move - Play Online Free in Browser",
  seoDescription:
    "Play Cobb Can Move online for free in your browser. Explore a dark pixel dungeon, collect coal, keep the light alive, and survive Cobb as the rules change every level.",
  seoKeywords:
    "Cobb Can Move, play Cobb Can Move online, free horror browser game, pixel horror game, roguelite browser game, play Cobb Can Move free",
  about: [
    "Cobb Can Move is a tense pixel survival horror game where the rules change as you play. You explore a dark dungeon, collect coal, keep the light alive, and avoid Cobb, a red monster that becomes more dangerous with each level.",
    "What makes Cobb Can Move different is its changing rule system. Cobb may hear your movement, see you across open spaces, smell your trail, reach farther than expected, or even duplicate. Each new rule forces you to change your route, your timing, and your survival strategy.",
    "The game is easy to start but hard to master. With simple keyboard controls, short high-pressure levels, and a dark pixel-art atmosphere, Cobb Can Move is built for players who enjoy browser horror games, survival challenges, and unpredictable dungeon runs.",
  ],
  faqs: [
    {
      q: "What is Cobb Can Move?",
      a: "Cobb Can Move is a survival horror browser game where the rules change every level. You explore a dark pixel dungeon, collect coal, keep the furnace lit, and avoid Cobb, a monster that can gain new ways to track you.",
    },
    {
      q: "Where can I play Cobb Can Move online for free?",
      a: "You can play Cobb Can Move online on this page directly in your browser. The official version is also available on itch.io from developer abho.",
    },
    {
      q: "Is Cobb Can Move free to play?",
      a: "Yes. Cobb Can Move is free to play in the browser. The official itch.io page also offers a downloadable Windows version with a name-your-own-price option.",
    },
    {
      q: "How do you play Cobb Can Move?",
      a: "Explore the dungeon, collect coal, bring it to the furnace, and survive while Cobb hunts you. Each level changes the rules, so you must adjust your movement, route, and timing based on Cobb's current ability.",
    },
    {
      q: "What are the controls for Cobb Can Move?",
      a: "Use WASD or the Arrow Keys to move. Use E or Spacebar to interact, pick up items, or drop items. The game is best played on a desktop or laptop with a keyboard, though gamepad input is supported.",
    },
    {
      q: "What does it mean when the rules change in Cobb Can Move?",
      a: "The rule system changes how Cobb behaves. Cobb may hear your footsteps, see you in light, smell your trail, reach farther, or duplicate. Every new rule forces you to change your survival strategy.",
    },
    {
      q: "How do you survive Cobb Can Move?",
      a: "Read the active rule before moving, keep the furnace lit, avoid open spaces when Cobb can see, move carefully when Cobb can hear, and vary your route when Cobb can smell. Surviving depends on adapting quickly.",
    },
    {
      q: "Can I play Cobb Can Move on mobile?",
      a: "Cobb Can Move is an HTML5 game, but it is designed mainly for keyboard or gamepad input. Some mobile browsers may load the game, but desktop play is recommended for better control.",
    },
    {
      q: "Where can I download Cobb Can Move?",
      a: "The official Cobb Can Move download is available on the developer's itch.io page. The game currently supports HTML5 browser play and a Windows download version.",
    },
    {
      q: "Is Cobb Can Move on Steam?",
      a: "As of May 12, 2026, there is no official Steam store page surfaced in public search results. The official distribution source is the developer's itch.io page.",
    },
  ],
  notifications: [
    {
      id: "n1",
      title: "Cobb Can Move is now playable on ZowGame. Play in fullscreen mode for the best horror experience.",
      body: "Move with WASD or Arrow Keys.\nPress E or Spacebar to interact.\nCollect coal and keep the light alive.\nRead the active rule before moving.",
      tag: "Game Notices",
      tone: "cyan",
      time: "now",
    },
  ],
};

const excuseMeSirContent: SiteContent = {
  title: "EXCUSE ME SIR",
  subtitle:
    "Learn what Excuse Me Sir actually is, why the horror demo is trending again, and where to safely download the official Windows and macOS release.",
  genre: "HORROR DEMO · POINT-AND-CLICK · DOWNLOAD GUIDE",
  description:
    "A discovery page for the real Excuse Me Sir horror demo, its official itch.io source, cancellation status, and meme-related search interest.",
  coverImg: "/excuse-me-sir.jpg",
  iframeUrl: "",
  trailerUrl: "",
  rating: "4.3",
  avgSession: "07",
  seoTitle: "Excuse Me Sir Game - Download Demo, Meme Meaning & How to Play",
  seoDescription:
    "Excuse Me Sir is a creepy point-and-click horror demo for Windows and macOS. Learn where to download it safely, why it was canceled, and why the name is trending again as a meme.",
  seoKeywords:
    "excuse me sir game, excuse me sir download, excuse me sir itch.io, is excuse me sir a real game, excuse me sir meme, excuse me sir billy butcher",
  about: [
    "Excuse Me Sir is a short, surreal point-and-click horror demo created by Airdorf and TorpleDook, featuring Molly Moonn. The official release is distributed through itch.io and is available as a downloadable demo for Windows and macOS.",
    "Unlike playable browser titles on ZowGame, this page exists to help users understand what the game is, where the official source lives, and why search traffic for the phrase keeps spiking again.",
    "The project is no longer in active development, but the demo remains available. Search interest also overlaps with a separate meme trend, so this page separates the actual horror game from unrelated viral edits.",
  ],
  faqs: [
    {
      q: "Is Excuse Me Sir free?",
      a: "Yes, the official itch.io page currently offers the demo as a free download.",
    },
    {
      q: "What platforms support Excuse Me Sir?",
      a: "The official demo is available for Windows and macOS.",
    },
    {
      q: "Is Excuse Me Sir canceled?",
      a: "Yes. The official itch.io page lists the project status as canceled.",
    },
    {
      q: "Can I play Excuse Me Sir on mobile?",
      a: "There is no official mobile version listed on the main itch.io page.",
    },
    {
      q: "Is ZowGame the official site?",
      a: "No. This page is an unofficial guide that links to the official itch.io download page.",
    },
  ],
  notifications: [
    {
      id: "excuse-1",
      title: "Excuse Me Sir is a download-first horror demo. Use the official itch.io source for the real files.",
      body: "This page is a guide, not a browser-play embed. The official listing is the safest source for the demo and current project status.",
      tag: "Guide Notes",
      tone: "amber",
      time: "now",
    },
  ],
};

export const GAMES: GameRecord[] = [
  {
    slug: "cobb-can-move",
    shortTitle: "Cobb Can Move",
    canonicalPath: "/games/cobb-can-move/",
    ogImage: "/og-image.png",
    keywords: [
      "Cobb Can Move",
      "play Cobb Can Move online",
      "free horror browser game",
      "pixel horror game",
      "roguelite browser game",
    ],
    heroBadges: ["HTML5 / BROWSER", "FREE TO PLAY", "4.8 / 5 OFFICIAL RATING"],
    primaryCtaLabel: "PLAY COBB CAN MOVE",
    secondaryCtaLabel: "WATCH TRAILER",
    accessMode: "browser",
    topBarEyebrow: "// OFFICIAL SOURCE + PLAY PAGE",
    topBarTitle: "COBB CAN MOVE",
    topBarDescription: "Browser play, controls, rules, FAQ, and download intent coverage.",
    notificationFooter: "Content is aligned to public search intent and official itch.io distribution.",
    guideTitle: "How to Play Cobb Can Move",
    guideIntro:
      "Cobb Can Move is a survival horror game where your goal is to explore the dungeon, collect coal, keep the light alive, and avoid Cobb. The controls are simple, but the challenge comes from the changing rules. Each level gives Cobb a new way to hunt you, so you must read the rule, plan your route, and adapt before the monster catches you.",
    objectiveTitle: "Your Main Objective",
    objectiveBody:
      "Search the dungeon for coal and important objectives, then return to safe areas before the darkness or Cobb becomes too dangerous. The furnace and light sources help you stay alive, but they do not make you completely safe. Cobb can become smarter as the game continues, so every level requires a different survival strategy.",
    guideSteps: [
      {
        title: "Read the rule at the start of the level.",
        body: "Cobb may be able to hear, see, smell, reach, or duplicate, and each rule changes how you should move.",
      },
      {
        title: "Explore the dungeon carefully.",
        body: "Look for coal, switches, batteries, paths, and escape routes before taking big risks.",
      },
      {
        title: "Collect coal and manage the furnace.",
        body: "Coal helps keep the light active, but carrying it at the wrong time can put you in danger.",
      },
      {
        title: "Avoid Cobb instead of fighting him.",
        body: "Cobb Can Move is about survival, not combat. Use walls, corners, distance, and timing to stay alive.",
      },
      {
        title: "Change your strategy when the rules change.",
        body: "A safe route in one level may become dangerous when Cobb can hear your movement or follow your trail.",
      },
      {
        title: "Complete the objective and move to the next level.",
        body: "Do not rush blindly. Finish tasks when the route is safe and reset your plan if Cobb gets too close.",
      },
    ],
    controlsHeading: "Cobb Can Move Controls",
    controlsTable: [
      { label: "Move", value: "WASD or Arrow Keys" },
      { label: "Interact / Pick Up / Drop", value: "E or Spacebar" },
      { label: "Best Device", value: "Desktop or laptop browser" },
      { label: "Input Support", value: "Keyboard and gamepad" },
    ],
    ruleHeading: "Understand Cobb's Rules",
    ruleBody:
      "The most important part of learning how to play Cobb Can Move is understanding the active rule. When Cobb can hear, move carefully and avoid unnecessary steps. When Cobb can see, break line of sight with walls and corners. When Cobb can smell, stop using the same route again and again. When Cobb can reach, keep extra distance. When Cobb can duplicate, slow down and avoid dead ends.",
    tipsHeading: "Tips & Tricks to Survive Cobb Can Move",
    tipsIntro:
      "Cobb Can Move is not a game you can beat by rushing. The key is to understand the current rule, manage your resources, and stay calm when Cobb starts hunting. Each level changes the way danger works, so the best strategy is to adapt before Cobb catches you.",
    tipsOutro:
      "The best way to win Cobb Can Move is to stay flexible. The game is built around changing rules, so no single strategy works forever. Learn the map, protect your light, manage coal carefully, and change your plan every time Cobb gains a new ability.",
    tips: [
      {
        title: "Read the Rule First",
        body: "Each level changes Cobb's behavior. Before moving, check whether Cobb can hear, see, smell, reach, or duplicate.",
      },
      {
        title: "Use the Furnace as a Checkpoint",
        body: "Keep track of the furnace and use it as your main reference point when the dungeon gets confusing.",
      },
      {
        title: "Save Coal When Possible",
        body: "Coal keeps you alive, but carrying it at the wrong time can put you in danger. Plan when to collect and return it.",
      },
      {
        title: "Avoid Dead Ends",
        body: "Dead ends are dangerous when Cobb is close. Learn escape routes before exploring deeper rooms.",
      },
      {
        title: "Adapt to Cobb's Ability",
        body: "Do not use the same strategy every level. A safe route under one rule may become deadly under the next.",
      },
      {
        title: "Stay Calm Under Pressure",
        body: "Cobb Can Move is designed to make you panic. Move with purpose, reset when needed, and do not rush into darkness.",
      },
    ],
    reviewsHeading: "What Players Are Saying",
    reviewsSummary:
      "Based on 142 public ratings from the official page. These player impressions focus on the game's rule system, horror pacing, and short-run tension.",
    reviews: [
      {
        name: "Player One",
        date: "Recent",
        rating: 5,
        body: "The rules keep changing, so every run feels different. Just when I think I understand Cobb, the game finds a new way to scare me.",
      },
      {
        name: "Player Two",
        date: "Recent",
        rating: 5,
        body: "Cobb Can Move is simple to start, but the tension builds fast. Collecting coal in the dark feels way more stressful than it should.",
      },
      {
        name: "Player Three",
        date: "Recent",
        rating: 5,
        body: "The moment Cobb can hear you, the whole game changes. I started thinking about every step instead of just running around.",
      },
      {
        name: "Player Four",
        date: "Recent",
        rating: 5,
        body: "I love how short and intense each level feels. It is easy to play for a few minutes, but hard to stop after one run.",
      },
      {
        name: "Player Five",
        date: "Recent",
        rating: 5,
        body: "The pixel art makes it look cute at first, then Cobb shows up and suddenly the dungeon feels unsafe everywhere.",
      },
      {
        name: "Player Six",
        date: "Recent",
        rating: 5,
        body: "What makes this game work is the rule system. Cobb is not just chasing you. He learns new ways to make you panic.",
      },
      {
        name: "Player Seven",
        date: "Recent",
        rating: 5,
        body: "Keeping the furnace alive while Cobb is nearby creates a perfect horror loop. You always need one more piece of coal.",
      },
      {
        name: "Player Eight",
        date: "Recent",
        rating: 5,
        body: "Every new rule forced me to change my strategy. Cobb can see, Cobb can hear, Cobb can smell... none of them feel fair, and that is the fun.",
      },
    ],
    quickFactsHeading: "QUICK FACTS",
    quickFacts: [
      { label: "Controls", value: "WASD / Arrows + E / Space" },
      { label: "Input", value: "Keyboard and gamepad" },
      { label: "Platform", value: "HTML5 Browser + Windows" },
    ],
    ambientMessages: [
      "Official page: itch.io / developer: abho",
      "Browser play available + Windows download on the official page",
      "Desktop recommended for clearer control in late-run pressure",
      "Read the active rule before you rush the next room",
      "Use walls, darkness, and route changes to break pursuit",
    ],
    livePulses: [
      { icon: "🎮", text: "Keyboard and gamepad both supported", weight: "normal" },
      { icon: "🕯️", text: "Keep the furnace alive to survive deeper floors", weight: "hot" },
      { icon: "👁️", text: "Some floors let Cobb see you in open sight lines", weight: "epic" },
      { icon: "👂", text: "When Cobb can hear, movement discipline matters", weight: "hot" },
      { icon: "🪵", text: "Collect coal, return safely, and keep moving", weight: "normal" },
      { icon: "🧩", text: "The rule set changes every level", weight: "epic" },
    ],
    schema: {
      developer: "abho",
      genre: ["Survival Horror", "Roguelite", "Pixel Art"],
      operatingSystems: ["Web Browser", "Windows"],
      platforms: ["Web Browser", "PC"],
      playMode: "SinglePlayer",
      price: "0",
      priceCurrency: "USD",
      ratingCount: 142,
    },
    content: cobbContent,
    footerTagline: "© 2026 COBB CAN MOVE // FAN LANDING PAGE FOR DISCOVERY",
    footerStatus: "PLAY IN BROWSER · DESKTOP RECOMMENDED",
    activityHeading: "PLAYING NOW",
    activityCountLabel: "PLAYING NOW",
    quickActionEyebrow: "PLAY INSTANTLY",
    quickActionTitle: "No download for browser play.<br />Desktop recommended.",
  },
  {
    slug: "excuse-me-sir",
    shortTitle: "Excuse Me Sir",
    canonicalPath: "/games/excuse-me-sir/",
    ogImage: "/og-image.png",
    cardImage: "/excuse-me-sir-cover.jpg",
    keywords: [
      "excuse me sir game",
      "excuse me sir download",
      "excuse me sir itch.io",
      "is excuse me sir a real game",
      "excuse me sir meme",
      "excuse me sir billy butcher",
      "point and click horror demo",
      "airdorf excuse me sir",
    ],
    heroBadges: ["DOWNLOAD DEMO", "UNOFFICIAL GUIDE", "WINDOWS + macOS"],
    primaryCtaLabel: "OPEN OFFICIAL DEMO PAGE",
    secondaryCtaLabel: "BACK TO HOME",
    accessMode: "download",
    externalSourceUrl: "https://airdorf.itch.io/excuse-me-sir",
    topBarEyebrow: "// DISCOVERY PAGE + OFFICIAL SOURCE",
    topBarTitle: "EXCUSE ME SIR",
    topBarDescription: "Official source guidance, platform info, cancellation status, and search-intent coverage.",
    notificationFooter: "This page does not host files and points users to the official itch.io listing.",
    guideTitle: "How to Get Excuse Me Sir Safely",
    guideIntro:
      "Excuse Me Sir is a short horror demo distributed as a download, not an instant-play browser game. The goal of this page is to help users identify the real game, understand its status, and reach the official source without confusing it with unrelated meme traffic.",
    objectiveTitle: "What This Page Helps You Do",
    objectiveBody:
      "Confirm that Excuse Me Sir is a real downloadable horror demo, check which platforms it supports, understand that the project is canceled, and use the official itch.io page if you want the original Windows or macOS files.",
    guideSteps: [
      {
        title: "Confirm you are looking at the real game.",
        body: "Excuse Me Sir is an indie horror demo by Airdorf and TorpleDook, not just a viral phrase or meme caption.",
      },
      {
        title: "Use the official itch.io page.",
        body: "The official listing is the safest place to verify the project status and download the original demo files.",
      },
      {
        title: "Choose the correct platform build.",
        body: "The public demo is listed for Windows and macOS rather than browser play or mobile devices.",
      },
      {
        title: "Expect a short demo, not a full release.",
        body: "The project was canceled, so this page should be treated as a preservation and discovery guide for the released demo.",
      },
      {
        title: "Avoid third-party reposts.",
        body: "If a random mirror or bundle claims to host the files, use the official source instead of downloading from unknown reuploads.",
      },
    ],
    controlsHeading: "Excuse Me Sir Quick Facts",
    controlsTable: [
      { label: "Access", value: "Download from official itch.io page" },
      { label: "Platforms", value: "Windows and macOS" },
      { label: "Browser Play", value: "Not officially supported" },
      { label: "Project Status", value: "Canceled demo" },
    ],
    ruleHeading: "What Makes Excuse Me Sir Different",
    ruleBody:
      "Excuse Me Sir is not an always-on browser game like Cobb Can Move. It is a short, surreal point-and-click horror demo with FMV-style imagery and multiple endings, so the most important guidance is where to download it safely and how to separate the game from the unrelated meme trend around the same phrase.",
    tipsHeading: "Before You Download Excuse Me Sir",
    tipsIntro:
      "Most confusion around Excuse Me Sir comes from mixed search intent. Some users want the actual horror demo, while others are following meme traffic. Use these checks to make sure you end up on the real source page.",
    tipsOutro:
      "If you only remember one thing, remember this: use the official itch.io page and treat anything else as unverified. This page is here to help with discovery, not to mirror or redistribute the files.",
    tips: [
      {
        title: "Use the Official Source",
        body: "Open the official itch.io page instead of downloading from reposted file sites or random mirrors.",
      },
      {
        title: "Do Not Expect Browser Play",
        body: "Excuse Me Sir is a download-first demo, so a page promising instant browser play is probably misleading.",
      },
      {
        title: "Check Platform Support First",
        body: "The listed demo targets Windows and macOS, which matters if you found the page from mobile search results.",
      },
      {
        title: "Understand the Project Status",
        body: "The demo remains available, but the project is canceled, so do not expect an actively updated full release.",
      },
      {
        title: "Separate Game from Meme Traffic",
        body: "If you came from Billy Butcher or The Boys edits, know that those posts are unrelated to the actual horror game.",
      },
    ],
    reviewsHeading: "What Players Notice First",
    reviewsSummary:
      "These summary notes reflect the demo's reputation in public discussion: unsettling presentation, surreal tone, and curiosity driven by renewed search traffic.",
    reviews: [
      {
        name: "Discovery Note 1",
        date: "Recent",
        rating: 4,
        body: "Most people notice the strange FMV-style horror atmosphere first. It feels more like a surreal cursed discovery than a traditional jump-scare game.",
      },
      {
        name: "Discovery Note 2",
        date: "Recent",
        rating: 4,
        body: "The biggest challenge is not how to beat it. It is figuring out which page is official and which search results are just meme spillover.",
      },
      {
        name: "Discovery Note 3",
        date: "Recent",
        rating: 4,
        body: "Once you know it is a short canceled demo, the page makes more sense. It is a real game, just not a full live-service release.",
      },
      {
        name: "Discovery Note 4",
        date: "Recent",
        rating: 4,
        body: "The name trends because of meme overlap, but the real value here is having a clean route to the official itch.io listing.",
      },
    ],
    quickFactsHeading: "SOURCE SNAPSHOT",
    quickFacts: [
      { label: "Source", value: "Official itch.io page by Airdorf" },
      { label: "Format", value: "Downloadable horror demo" },
      { label: "Platforms", value: "Windows + macOS" },
    ],
    ambientMessages: [
      "Official source: airdorf.itch.io/excuse-me-sir",
      "This page is an unofficial guide and does not host files",
      "Windows and macOS are the listed demo platforms",
      "Search traffic overlaps with a separate meme trend",
      "Use the official itch.io page to verify status and files",
    ],
    livePulses: [
      { icon: "🧷", text: "Official source points to itch.io, not browser embed play", weight: "normal" },
      { icon: "💾", text: "Download-first demo for Windows and macOS", weight: "hot" },
      { icon: "🕯️", text: "Short surreal horror demo with strong cult-search interest", weight: "normal" },
      { icon: "⚠️", text: "Project is canceled, but the demo remains available", weight: "epic" },
      { icon: "🔎", text: "Meme traffic and game traffic overlap for this title", weight: "hot" },
    ],
    schema: {
      developer: "Airdorf, TorpleDook",
      genre: ["Horror", "Point-and-click", "Indie"],
      operatingSystems: ["Windows", "macOS"],
      platforms: ["PC", "macOS"],
      playMode: "SinglePlayer",
      price: "0",
      priceCurrency: "USD",
      ratingCount: 12,
    },
    content: excuseMeSirContent,
    footerTagline: "© 2026 ZOWGAME // UNOFFICIAL GAME DISCOVERY GUIDE",
    footerStatus: "OFFICIAL DOWNLOAD SOURCE · NO FILE HOSTING",
    activityHeading: "DISCOVERY NOW",
    activityCountLabel: "SEARCH INTEREST",
    quickActionEyebrow: "OFFICIAL SOURCE",
    quickActionTitle: "Use the official itch.io page.<br />This guide does not host files.",
  },
];

export function getGameBySlug(slug: string) {
  return GAMES.find((game) => game.slug === slug);
}

export function getPublishedGames() {
  return GAMES;
}

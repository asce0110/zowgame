import type { SiteContent } from "../components/content-store";
import { dontSleepWithTheFishesGame } from "./dont-sleep-with-the-fishes";

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
    "Play Cobb Can Move online free — survive a dark pixel dungeon, collect coal, keep the furnace lit, escape Cobb as rules change every level. No download.",
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
    changelog: [
      {
        version: "v1.7",
        date: "2026-05-19",
        summary: "Smell nerf, pursuit acceleration nerf, rock stun bug fix.",
        details: [
          { label: "Tweaks", items: [
            "Nerfed \"Cobb can smell\" (less frequent sniffs, less persistence when smelled at close range).",
            "Nerfed Cobb's acceleration when in pursuit for a long time, slightly.",
          ]},
          { label: "Fixes", items: [
            "Fixed rocks sometimes not stunning Cobb when in pursuit.",
          ]},
        ],
      },
      {
        version: "v1.6",
        date: "2026-05-16",
        summary: "Rocks stun Cobb, coal spawn balancing, international keyboard support, duplicate fix, multiple bug fixes.",
        details: [
          { label: "New", items: [
            "Rocks can now stun Cobb with a direct hit for a short period of time.",
            "Rocks actually sound loud now, so it's more obvious they make noise.",
            "International keyboard layouts such as AZERTY should feel more comfortable to use.",
          ]},
          { label: "Tweaks", items: [
            "Coal is less likely to spawn right next to the furnace.",
            "Cobb will get slightly faster if in pursuit for a long time.",
            "Cobb's random wandering state is faster in larger maps.",
            "Cobb takes larger steps when \"reach\" is active, but with less speed.",
          ]},
          { label: "Fixes", items: [
            "Duplicates push each other, fixing the issue of them basically merging back into one Cobb.",
            "Fixed Cobb not killing after grabbing player sometimes, again.",
            "Blast furnace in ending has a larger hitbox to prevent getting lost behind it.",
            "Fixed some rendering issues with some text/sprites.",
          ]},
        ],
      },
    ],
  },
  dontSleepWithTheFishesGame,
];
export function getGameBySlug(slug: string) {
  return GAMES.find((game) => game.slug === slug);
}

export function getPublishedGames() {
  return GAMES;
}

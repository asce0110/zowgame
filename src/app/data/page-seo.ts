/** Editorial page TD. Keyword fields are planning data, never meta keywords. */
export type PageTd = {
  path: string; primaryKeyword: string; secondaryKeywords: string[];
  title: string; description: string; contentEvidence: string[]; notes: string[];
};

export const PAGE_TD: readonly PageTd[] = [
  {
    "path": "/",
    "primaryKeyword": "game guides",
    "secondaryKeywords": [
      "game walkthroughs",
      "game rules",
      "player help"
    ],
    "title": "Game Guides, Walkthroughs & Player Help | ZowGame",
    "description": "Find independent game guides, walkthroughs, rules and player help for shooters, horror, puzzles and tabletop games, with links to official sources.",
    "contentEvidence": [
      "src/app/HomePage.tsx: featured game selector, guide finder and updates/data link",
      "src/app/components/level-select.tsx: real guide links and game-guide/walkthrough introduction",
      "src/app/data/atlas.ts: shooters, survival-horror, puzzle-trivia and physical-tabletop categories"
    ],
    "notes": [
      "Keep the base homepage indexable; any game/genre/type or unknown query remains noindex,follow with the clean root canonical. Do not put all six game names into the title."
    ]
  },
  {
    "path": "/games/",
    "primaryKeyword": "game library",
    "secondaryKeywords": [
      "browser games",
      "PC games",
      "tabletop games",
      "official game links"
    ],
    "title": "Game Library: Browser, PC & Tabletop Games | ZowGame",
    "description": "Browse browser, PC and physical tabletop games by genre or format. Open each overview for player guides, rules, walkthroughs and official game links.",
    "contentEvidence": [
      "app/games/page.tsx: genre/format search, overview links and published game cards",
      "src/app/data/atlas.ts: ATLAS_FORMATS distinguishes browser, download and physical tabletop; ATLAS_GAMES links existing overviews"
    ],
    "notes": [
      "Keep genre/format/search facets noindex,follow with the clean directory canonical; do not advertise all catalog titles as metadata keywords."
    ]
  },
  {
    "path": "/games/aion-2/steam-launch-stats/",
    "primaryKeyword": "AION 2 Steam launch stats",
    "secondaryKeywords": [
      "AION 2 Steam player count",
      "AION 2 peak CCU",
      "AION 2 Steam launch date",
      "AION 2 Steam vs PURPLE"
    ],
    "title": "AION 2 Steam Launch Stats & Player Counts | ZowGame",
    "description": "Read AION 2 Steam player counts, a dated launch-peak reference and release timeline. Compare Steam with PURPLE, read update summaries and find player help.",
    "contentEvidence": [
      "src/app/components/aion-2-stats-page.tsx: H1 is 'AION 2 Steam launch stats'; the introduction covers Steam readings, launch numbers, news and player checks.",
      "src/app/components/aion-2-stats-page.tsx: #live-stats separates current players, Peak today and a dated SteamDB record; #history links SteamDB rather than claiming a local history database.",
      "src/app/data/aion-2-stats.ts: AION_2_REPORTED_PEAK is a dated, attributed reference, not a live all-time-peak API value.",
      "src/app/components/aion-2-stats-page.tsx: #timeline distinguishes Playtest, early access and launch; #scope excludes PURPLE-only players and does not supply regional counts.",
      "src/app/components/aion-2-stats-page.tsx, src/app/data/aion-2-update-briefs.ts and src/app/data/aion-2-player-help.ts: reviewed update explanations and player-help checklists are rendered with sources and dates."
    ],
    "notes": [
      "Primary intent: define Steam launch statistics and compare time-bounded readings. Player help is useful secondary content, not a separate claim about current service health.",
      "H1 and introduction directly cover the primary query. No H1/intro topic gap was found.",
      "The draft deliberately avoids 'live' and 'real-time'. The current-player feed is client-loaded and needs runtime validation before such a promise; missing or dated readings must not be advertised as current.",
      "A launch-date peak is not automatically a first-24-hours maximum. Do not describe Steam-only figures as total AION 2 population, sales, DAU, regional totals or a Steam-and-PURPLE combined count."
    ]
  },
  {
    "path": "/games/all-the-gold-in-fort-locks/",
    "primaryKeyword": "All The Gold In Fort Locks",
    "secondaryKeywords": [
      "Fort Locks puzzle game",
      "overlapping rooms",
      "Fort Locks controls"
    ],
    "title": "All The Gold In Fort Locks: Game & Guide | ZowGame",
    "description": "Explore All The Gold In Fort Locks, a puzzle about keys and overlapping rooms. Find controls, beginner tips, common stuck points and the itch.io source.",
    "contentEvidence": [
      "src/app/data/all-the-gold-in-fort-locks.ts: overview, controls, six key stages, tips, FAQs and externalSourceUrl to draknek.itch.io",
      "src/app/components/hero.tsx and src/app/App.tsx: external/browser entry behavior; draft intentionally promises game information and source links rather than locally hosted gameplay"
    ],
    "notes": [
      "The game record has an external itch.io source; use a neutral discovery-and-guide description rather than Play here/no-download guarantees. No fresh official-source revalidation is implied."
    ]
  },
  {
    "path": "/games/all-the-gold-in-fort-locks/faq/",
    "primaryKeyword": "All The Gold In Fort Locks FAQ",
    "secondaryKeywords": [
      "Fort Locks orange key",
      "red and purple keys",
      "Fort Locks checkpoints"
    ],
    "title": "All The Gold In Fort Locks FAQ & Controls | ZowGame",
    "description": "Find All The Gold In Fort Locks answers about colored keys, overlapping rooms, controls and checkpoints, plus orange-key and red/purple puzzle guidance.",
    "contentEvidence": [
      "app/games/[slug]/faq/page.tsx: renders Fort Locks content.faqs without inventing a separate answer database",
      "src/app/data/all-the-gold-in-fort-locks.ts: questions cover keys, orange-key and red/purple sequences, controls and checkpoints"
    ],
    "notes": [
      "Describe the existing questions and puzzle topics without guaranteeing that the page resolves every possible stuck state."
    ]
  },
  {
    "path": "/games/all-the-gold-in-fort-locks/guide/",
    "primaryKeyword": "All The Gold In Fort Locks guide",
    "secondaryKeywords": [
      "Fort Locks beginner tips",
      "colored keys",
      "undo and reset"
    ],
    "title": "All The Gold In Fort Locks Beginner Guide | ZowGame",
    "description": "Learn All The Gold In Fort Locks basics, from the blue key to the yellow key. Understand overlapping rooms, key handling, movement, undo and reset controls.",
    "contentEvidence": [
      "app/games/[slug]/guide/page.tsx: Fort Locks objective, six guideSteps and controlsTable rendered as beginner sections",
      "src/app/data/all-the-gold-in-fort-locks.ts: blue through yellow keys, overlapping-room rule and movement/undo/reset controls"
    ],
    "notes": [
      "Keep the beginner overview distinct from the dedicated screenshot/video walkthrough. Avoid unverified developer-confirmed or guaranteed solution claims in TD."
    ]
  },
  {
    "path": "/games/all-the-gold-in-fort-locks/walkthrough/",
    "primaryKeyword": "All The Gold In Fort Locks walkthrough",
    "secondaryKeywords": [
      "Fort Locks key solutions",
      "green key",
      "orange key",
      "red and purple key puzzle"
    ],
    "title": "All The Gold In Fort Locks Walkthrough: Keys | ZowGame",
    "description": "Follow the All The Gold In Fort Locks walkthrough through six key stages, including green, orange, red and purple puzzles, with screenshots and a video.",
    "contentEvidence": [
      "app/games/[slug]/walkthrough/page.tsx: six fortLocksStages with ordered steps, keyframe images and embedded walkthrough video",
      "app/games/[slug]/walkthrough/page.tsx: separate green, orange, red/purple, purple-door and yellow/finale sections"
    ],
    "notes": [
      "Screenshots and a video are actually rendered. Do not turn video chapter timestamps into guaranteed completion times, or call community material official."
    ]
  },
  {
    "path": "/games/cobb-can-move/",
    "primaryKeyword": "Cobb Can Move",
    "secondaryKeywords": [
      "Cobb Can Move controls",
      "changing rules",
      "coal and furnace"
    ],
    "title": "Cobb Can Move: Controls, Rules & Player Guide | ZowGame",
    "description": "Explore Cobb Can Move's changing rules, coal and furnace basics, controls and survival tips. Find the beginner guide, common questions and play options.",
    "contentEvidence": [
      "src/app/data/games.ts: Cobb content.about, faqs, controlsTable, guideIntro, objectiveBody and changing-rule tips",
      "app/games/[slug]/page.tsx: Cobb overview renders the shared App game page with guide and FAQ navigation"
    ],
    "notes": [
      "Avoid guarantees of locally hosted play, current distribution availability, ratings or the latest version in TD; this draft is supported by the existing guide content."
    ]
  },
  {
    "path": "/games/cobb-can-move/faq/",
    "primaryKeyword": "Cobb Can Move FAQ",
    "secondaryKeywords": [
      "Cobb Can Move download",
      "Cobb controls",
      "mobile limitations"
    ],
    "title": "Cobb Can Move FAQ: Controls, Rules & Downloads | ZowGame",
    "description": "Get Cobb Can Move answers about controls, changing rules, browser play, mobile limitations and the itch.io download, with practical survival guidance.",
    "contentEvidence": [
      "app/games/[slug]/faq/page.tsx: renders Cobb content.faqs as question-and-answer sections",
      "src/app/data/games.ts: Cobb questions cover controls, changing rules, browser and mobile play, survival and developer itch.io downloads"
    ],
    "notes": [
      "Downloads means guidance to the developer's external source, not a download hosted by ZowGame. Avoid stale no-Steam/version/date claims from older body answers."
    ]
  },
  {
    "path": "/games/cobb-can-move/guide/",
    "primaryKeyword": "Cobb Can Move guide",
    "secondaryKeywords": [
      "how to play Cobb Can Move",
      "Cobb survival tips",
      "furnace basics"
    ],
    "title": "Cobb Can Move Beginner Guide & Survival Tips | ZowGame",
    "description": "Learn how to play Cobb Can Move: read each rule, collect coal, manage the furnace and avoid Cobb. Follow six beginner steps and check the keyboard controls.",
    "contentEvidence": [
      "app/games/[slug]/guide/page.tsx: Cobb objective, six guideSteps and controlsTable rendered as beginner sections",
      "src/app/data/games.ts: reading the active rule, collecting coal, managing the furnace, avoiding Cobb and adapting routes"
    ],
    "notes": [
      "Focus on beginner actions and controls. Do not present a deterministic complete ending walkthrough or promise guaranteed survival."
    ]
  },
  {
    "path": "/games/defenders-of-hogwarts/",
    "primaryKeyword": "Defenders of Hogwarts board game",
    "secondaryKeywords": [
      "Harry Potter Defenders board game",
      "Defenders of Hogwarts rules",
      "harry potter defenders rpg game",
      "MinaLima board game"
    ],
    "title": "Harry Potter Defenders of Hogwarts: Board Game | ZowGame",
    "description": "Learn MinaLima's physical Harry Potter board game, Defenders of Hogwarts: setup, House and Dark Arts turns, win conditions, rule answers and buying support.",
    "contentEvidence": [
      "src/app/components/tabletop-game-page.tsx: H1 names Defenders of Hogwarts; the hero introduction explicitly identifies MinaLima's physical Harry Potter board game.",
      "src/app/components/tabletop-game-page.tsx: #overview directly addresses the 'Harry Potter Defenders RPG game' search and explains that this is not an online RPG or downloadable video game.",
      "src/app/components/tabletop-game-page.tsx and src/app/data/defenders-guide.ts: #setup, #house-turn, #dark-turn, #movement, #resources and #ending explain official-rulebook procedures.",
      "src/app/components/tabletop-game-page.tsx: #faq, #availability and #sources cover rules, editions, dated shipping estimates, official ordering and support."
    ],
    "notes": [
      "Use one consolidated page for game identification, rulebook-based help and buying support; do not invent separate /guide/ or /faq/ routes.",
      "The ambiguous RPG query is a secondary identification intent, answered in the visible overview and FAQ. It should not make the title promise a video RPG or a playable copy.",
      "The H1 and adjacent introduction identify the actual physical Harry Potter board game; the page also answers the ambiguous RPG search explicitly.",
      "Availability and shipping details are dated checks, not confirmation of current stock or shipment. Do not insert a live offer, current pledge access or delivery guarantee into metadata."
    ]
  },
  {
    "path": "/games/dont-sleep-with-the-fishes/",
    "primaryKeyword": "Don't Sleep With The Fishes",
    "secondaryKeywords": [
      "survival horror game",
      "Windows survival game",
      "game overview"
    ],
    "title": "Don't Sleep With The Fishes: Game & Guides | ZowGame",
    "description": "Explore Don't Sleep With The Fishes, a Windows survival horror game. Find beginner help, item notes, ending routes and links to official game sources.",
    "contentEvidence": [
      "src/app/components/fishes-guide-page.tsx:FishesOverview / hero, game credit, GuideIndex, Before You Board",
      "src/app/data/fishes-guide.ts:fishesGuidePages / linked chapter descriptions"
    ],
    "notes": [
      "Overview targets game discovery and chapter navigation; detailed first-run instruction belongs to /guide/."
    ]
  },
  {
    "path": "/games/dont-sleep-with-the-fishes/achievements/",
    "primaryKeyword": "Don't Sleep With The Fishes achievements",
    "secondaryKeywords": [
      "Steam achievement objectives",
      "True End achievement",
      "Drowning difficulty",
      "run tracking"
    ],
    "title": "Don't Sleep With The Fishes: Achievements | ZowGame",
    "description": "Check the 12 listed Steam achievements for Don't Sleep With The Fishes, their objectives and run tracking, including True End and Drowning difficulty.",
    "contentEvidence": [
      "src/app/data/fishes-guide.ts:fishesGuidePages.achievements / Steam Achievement Checklist, Track Your Run",
      "src/app/data/fishes-guide.ts:heartSection"
    ],
    "notes": [
      "The 12 entries are present in the source checklist reviewed on 2026-10-07. This is an achievement count, not a promise of 12 endings."
    ]
  },
  {
    "path": "/games/dont-sleep-with-the-fishes/changelog/",
    "primaryKeyword": "Don't Sleep With The Fishes patch notes",
    "secondaryKeywords": [
      "changelog",
      "update history",
      "rescue changes",
      "Scuba Gear balance"
    ],
    "title": "Don't Sleep With The Fishes: Patch Notes | ZowGame",
    "description": "Read Don't Sleep With The Fishes patch history, covering rescue changes, shipmate support, Scuba Gear balance and run-state fixes from developer announcements.",
    "contentEvidence": [
      "src/app/data/fishes-guide.ts:fishesChangelog / v1.1.2, v1.1.3, v1.1.4, v1.1.4.2, v1.1.4.4",
      "src/app/data/fishes-guide.ts:fishesGuidePages.changelog"
    ],
    "notes": [
      "A manually reviewed history through v1.1.4.4 with sources checked 2026-10-07. No latest-version or automatic-update claim is made."
    ]
  },
  {
    "path": "/games/dont-sleep-with-the-fishes/characters/",
    "primaryKeyword": "Don't Sleep With The Fishes characters",
    "secondaryKeywords": [
      "shipmates",
      "Frederik support",
      "Row support",
      "Laurel support",
      "Captain Whiskers"
    ],
    "title": "Don't Sleep With The Fishes Characters Guide | ZowGame",
    "description": "Compare Don't Sleep With The Fishes shipmates: Frederik, Row, Laurel and Captain Whiskers. Learn support costs, daily limits and companion choices.",
    "contentEvidence": [
      "src/app/data/fishes-guide.ts:supportSection / Choose Support for Today's Work",
      "src/app/data/fishes-guide.ts:fishesGuidePages.characters / One Human Companion, Leaving Alone Is Now a Route Choice"
    ],
    "notes": [
      "Captain Whiskers is an additional cat passenger with a passive bonus, not a fourth human shipmate or a paid daily support action."
    ]
  },
  {
    "path": "/games/dont-sleep-with-the-fishes/endings/",
    "primaryKeyword": "Don't Sleep With The Fishes endings",
    "secondaryKeywords": [
      "True End",
      "Heart Parts",
      "rescue ending",
      "ending objectives"
    ],
    "title": "Don't Sleep With The Fishes: Endings Guide | ZowGame",
    "description": "Explore Don't Sleep With The Fishes ending objectives, rescue signaling and the Heart Parts route to True End, with community details clearly labeled.",
    "contentEvidence": [
      "src/app/data/fishes-guide.ts:fishesGuidePages.endings / Other Official Objectives",
      "src/app/data/fishes-guide.ts:rescueSection, heartSection"
    ],
    "notes": [
      "No exact ending total or complete set of routes is promised. The source distinguishes achievement objectives from ending count."
    ]
  },
  {
    "path": "/games/dont-sleep-with-the-fishes/events/",
    "primaryKeyword": "Don't Sleep With The Fishes night events",
    "secondaryKeywords": [
      "Kraken encounter",
      "Anglerfish",
      "rescue signaling",
      "event choices"
    ],
    "title": "Don't Sleep With The Fishes: Night Events | ZowGame",
    "description": "Check Don't Sleep With The Fishes night events, rescue signals and reported counters for Kraken and Anglerfish. Read the risks before using supplies.",
    "contentEvidence": [
      "src/app/data/fishes-guide.ts:fishesGuidePages.events / Community Counter Notes, When You Have No Answer",
      "src/app/data/fishes-guide.ts:newEvents, rescueSection, heartSection"
    ],
    "notes": [
      "Encounter counters are explicitly community reports with possible damage or equipment loss; the copy does not claim guaranteed safe choices."
    ]
  },
  {
    "path": "/games/dont-sleep-with-the-fishes/faq/",
    "primaryKeyword": "Don't Sleep With The Fishes FAQ",
    "secondaryKeywords": [
      "download questions",
      "Windows support",
      "True End questions",
      "run-state bug"
    ],
    "title": "Don't Sleep With The Fishes FAQ & Support | ZowGame",
    "description": "Get answers about Don't Sleep With The Fishes downloads, Windows support, shipmate changes, True End and run-state bugs, with links to checked sources.",
    "contentEvidence": [
      "src/app/data/fishes-guide.ts:fishesFaqs / download, device support, Frederik, ending objectives, state carried between runs",
      "src/app/data/fishes-guide.ts:fishesGuidePages.faq"
    ],
    "notes": [
      "General question intent rather than purchase comparison, encounter-counter reference or an exhaustive technical troubleshooting guide."
    ]
  },
  {
    "path": "/games/dont-sleep-with-the-fishes/guide/",
    "primaryKeyword": "Don't Sleep With The Fishes beginner guide",
    "secondaryKeywords": [
      "evacuation supplies",
      "controls",
      "daily energy",
      "shipmate support"
    ],
    "title": "Don't Sleep With The Fishes: Beginner Guide | ZowGame",
    "description": "Start Don't Sleep With The Fishes with an evacuation plan. Learn controls, manage daily energy, choose shipmate support and prepare for your first rescue.",
    "contentEvidence": [
      "src/app/data/fishes-guide.ts:fishesGuidePages.guide / Evacuate With a Plan, Controls and Comfort, Read Status Before Spending Energy",
      "src/app/data/fishes-guide.ts:supportSection, rescueSection"
    ],
    "notes": [
      "Targets first-session preparation and controls, rather than the multi-phase survival decisions on /walkthrough/."
    ]
  },
  {
    "path": "/games/dont-sleep-with-the-fishes/items/",
    "primaryKeyword": "Don't Sleep With The Fishes items",
    "secondaryKeywords": [
      "supplies",
      "bait",
      "First Aid Kit",
      "Scuba Gear",
      "Duct Tape"
    ],
    "title": "Don't Sleep With The Fishes: Items & Supplies | ZowGame",
    "description": "Plan your Don't Sleep With The Fishes supplies with notes on food, bait, medicine, Scuba Gear and Duct Tape. Match your pack to rescue or True End.",
    "contentEvidence": [
      "src/app/data/fishes-guide.ts:fishesGuidePages.items / Pack for Your Route, Bait and Built-In Equipment, Food and Medicine, Scuba Gear, Duct Tape",
      "src/app/data/fishes-guide.ts:heartSection"
    ],
    "notes": [
      "The page provides source-labeled priorities and selected item notes, not a complete item database or an official item ranking."
    ]
  },
  {
    "path": "/games/dont-sleep-with-the-fishes/steam/",
    "primaryKeyword": "Don't Sleep With The Fishes download",
    "secondaryKeywords": [
      "Steam purchase",
      "itch.io download",
      "Windows requirements",
      "update game"
    ],
    "title": "Don't Sleep With The Fishes: Steam & Download | ZowGame",
    "description": "Find official Don't Sleep With The Fishes purchase links, compare Steam with itch.io, check Windows requirements and learn how to update your build.",
    "contentEvidence": [
      "src/app/data/fishes-guide.ts:fishesGuidePages.steam / Official Distribution, Steam vs itch.io, Windows Requirements, Updating and Troubleshooting"
    ],
    "notes": [
      "Official buying and download guidance only. No free-play, current-price, Mac/Linux/mobile or Steam Deck compatibility claim is added."
    ]
  },
  {
    "path": "/games/dont-sleep-with-the-fishes/tips-tricks/",
    "primaryKeyword": "Don't Sleep With The Fishes tips and tricks",
    "secondaryKeywords": [
      "survival strategy",
      "recovery supplies",
      "support timing",
      "rescue planning"
    ],
    "title": "Don't Sleep With The Fishes Tips & Tricks | ZowGame",
    "description": "Improve Don't Sleep With The Fishes decisions with shipmate support, recovery supplies and rescue planning. Check advice that changed across versions.",
    "contentEvidence": [
      "src/app/data/fishes-guide.ts:fishesGuidePages.tips-tricks / Reserve Recovery Supplies, Keep a Long Run's Goal Clear, Old Guides Need Version Checks",
      "src/app/data/fishes-guide.ts:supportSection, rescueSection"
    ],
    "notes": [
      "Targets repeat-run decisions and outdated-advice corrections, distinct from beginner controls and the walkthrough's overall run sequence."
    ]
  },
  {
    "path": "/games/dont-sleep-with-the-fishes/walkthrough/",
    "primaryKeyword": "Don't Sleep With The Fishes walkthrough",
    "secondaryKeywords": [
      "survival walkthrough",
      "lifeboat supplies",
      "daily status checks",
      "ending preparation"
    ],
    "title": "Don't Sleep With The Fishes Walkthrough | ZowGame",
    "description": "Follow a decision-based Don't Sleep With The Fishes walkthrough, from stocking the lifeboat to daily status checks, recovery and ending preparation.",
    "contentEvidence": [
      "src/app/data/fishes-guide.ts:fishesGuidePages.walkthrough / Pick Your Goal Before Evacuation, Stock the Lifeboat, Repeat the Daytime Status Check, Recover After a Dangerous Night",
      "src/app/data/fishes-guide.ts:rescueSection, heartSection"
    ],
    "notes": [
      "The article rejects a fixed Days 1–10 script because supplies and encounters vary. Do not promise a guaranteed day-by-day solution."
    ]
  },
  {
    "path": "/games/hood-warfare-2/",
    "primaryKeyword": "Hood Warfare 2 guides",
    "secondaryKeywords": [
      "Hood Warfare 2 guide hub",
      "Hood Warfare 2 beginners",
      "Hood Warfare 2 Steam"
    ],
    "title": "Hood Warfare 2 Guides: Weapons, Maps & Modes | ZowGame",
    "description": "Find independent Hood Warfare 2 guides for your first match, Steam setup, six modes, weapon progression, known areas and developer patch summaries.",
    "contentEvidence": [
      "src/app/components/hood-warfare-2-page.tsx: overview H1 names Hood Warfare 2; the hero introduction describes the field manual.",
      "src/app/components/hood-warfare-2-page.tsx: #directory links to seven dedicated guides; #mode-brief covers six modes; #news-live links official developer announcements."
    ],
    "notes": [
      "Hub intent: help visitors choose a guide. Dedicated pages own detailed beginner, buying, weapons, maps, modes, FAQ and news queries.",
      "The H1 names the game; the adjacent introduction already establishes the guide-hub intent. Do not imply a playable browser copy or an official publisher wiki."
    ]
  },
  {
    "path": "/games/hood-warfare-2/faq/",
    "primaryKeyword": "Hood Warfare 2 FAQ",
    "secondaryKeywords": [
      "Hood Warfare 2 voice chat",
      "Hood Warfare 2 platforms",
      "Hood Warfare 2 support"
    ],
    "title": "Hood Warfare 2 FAQ: Platforms, Voice & Help | ZowGame",
    "description": "Get answers to 22 Hood Warfare 2 questions about platforms, languages, voice chat, weapon progression, saved loadouts, anti-cheat and support options.",
    "contentEvidence": [
      "src/app/components/hood-warfare-2-page.tsx: #questions introduces 22 questions about buying, languages, modes, progression and technical support.",
      "src/app/components/hood-warfare-2-tools.tsx: HoodQuestions renders searchable hoodFaqs as details/summary answers, with a no-JavaScript fallback.",
      "src/app/data/hood-warfare-2.ts: hoodFaqs includes platforms, languages, push-to-talk, loadouts, progression, anti-cheat and official support."
    ],
    "notes": [
      "Primary intent: quick answers and recovery links. Individual FAQ answers may link to the purchase, weapons or modes guide rather than duplicating those guides in metadata.",
      "Visible H1 pairs Hood Warfare 2 with FAQ & Technical Help; the question search and answer sections cover this intent.",
      "Do not present general troubleshooting as a verified fix for every launch problem."
    ]
  },
  {
    "path": "/games/hood-warfare-2/guide/",
    "primaryKeyword": "Hood Warfare 2 beginner guide",
    "secondaryKeywords": [
      "how to play Hood Warfare 2",
      "Hood Warfare 2 bot practice",
      "Hood Warfare 2 first match"
    ],
    "title": "Hood Warfare 2 Beginner Guide & Bot Practice | ZowGame",
    "description": "Prepare for your first Hood Warfare 2 match with eight practical steps, bot practice, controls, objectives and a checklist saved in your browser.",
    "contentEvidence": [
      "src/app/components/hood-warfare-2-page.tsx: guide hero introduction covers bot matches, routes, controls, objectives and progression.",
      "src/app/components/hood-warfare-2-page.tsx: #beginner renders HoodChecklist; #practice renders editorial practice suggestions.",
      "src/app/components/hood-warfare-2-tools.tsx: HoodChecklist renders eight guideSteps, saves progress in localStorage and explains that this does not track in-game progress."
    ],
    "notes": [
      "Primary intent: preparation and a repeatable practice routine, rather than weapon statistics or a match walkthrough.",
      "Visible H1 pairs Hood Warfare 2 with Beginner Guide; the introduction and saved practice checklist support the topic.",
      "Bot practice is confirmed; offline play and whether bot matches count toward progression are not established."
    ]
  },
  {
    "path": "/games/hood-warfare-2/maps/",
    "primaryKeyword": "Hood Warfare 2 maps",
    "secondaryKeywords": [
      "Hood Warfare 2 map areas",
      "Hood Warfare 2 route practice",
      "Hood Warfare 2 spawn protection"
    ],
    "title": "Hood Warfare 2 Maps: Areas & Route Practice | ZowGame",
    "description": "Explore developer-named Hood Warfare 2 areas, learn an approach and retreat route, and use focused bot practice to check cover, sightlines and spawns.",
    "contentEvidence": [
      "src/app/components/hood-warfare-2-page.tsx: Maps distinguishes four store-described areas from a complete map-selection menu.",
      "src/app/data/hood-warfare-2.ts: hoodMapAreas supplies developer-named settings and original route-practice advice.",
      "src/app/components/hood-warfare-2-page.tsx: map support note explains 1.0.10 spawn changes and does not count the separately mentioned supermarket as a confirmed fifth map."
    ],
    "notes": [
      "Primary intent: identifying known settings and learning routes. Complete map names, layouts, spawn positions and protection duration are content gaps.",
      "Visible H1 pairs Hood Warfare 2 with Maps & Routes; the introduction and #maps section explain the known areas and route-practice scope.",
      "Do not turn four described areas into a verified total map count or promise floor plans."
    ]
  },
  {
    "path": "/games/hood-warfare-2/modes/",
    "primaryKeyword": "Hood Warfare 2 game modes",
    "secondaryKeywords": [
      "Hood Warfare 2 mode objectives",
      "Hood Warfare 2 Turf War",
      "Hood Warfare 2 Chain Snatch"
    ],
    "title": "Hood Warfare 2 Game Modes: Six Objectives | ZowGame",
    "description": "Learn all six Hood Warfare 2 modes, compare team and free-for-all objectives, and find beginner tips for Turf War, Chain Snatch and the other modes.",
    "contentEvidence": [
      "src/app/components/hood-warfare-2-page.tsx: #mode-brief provides a selectable briefing; #mode-rules renders all six mode explanations as readable articles.",
      "src/app/data/hood-warfare-2.ts: hoodModes contains Turf War, GangBang, Chaos, Hit A Lick, Destroy The Block and Chain Snatch, with official objectives and editorial advice."
    ],
    "notes": [
      "Primary intent: choosing a mode and understanding its win objective. This page owns the six-mode explanation rather than the general FAQ.",
      "Visible H1 pairs Hood Warfare 2 with Game Modes; the introduction and #mode-rules section describe the six confirmed objectives.",
      "Six modes are supported by the existing official-source-backed content. Do not infer exact score targets, timers or round settings where the text does not establish them."
    ]
  },
  {
    "path": "/games/hood-warfare-2/news/",
    "primaryKeyword": "Hood Warfare 2 news",
    "secondaryKeywords": [
      "Hood Warfare 2 patch notes",
      "Hood Warfare 2 updates",
      "Hood Warfare 2 1.0.10"
    ],
    "title": "Hood Warfare 2 News & Patch Summaries | ZowGame",
    "description": "Read Hood Warfare 2 developer announcements and reviewed patch summaries, including voice chat, spawn protection and loadout fixes in version 1.0.10.",
    "contentEvidence": [
      "src/app/components/hood-warfare-2-page.tsx: #news-live displays the official feed; Updates renders three dated editorial summaries and links their developer announcements.",
      "src/app/data/hood-warfare-2.ts: hoodUpdates includes the 1.0.10 patch, release and pre-release notices, dated separately from the guide review.",
      "src/app/components/hood-warfare-2-tools.tsx: HoodLiveNews keeps retrieval times, original publication dates and editorial-review status distinct."
    ],
    "notes": [
      "Primary intent: changes over time and their practical effects, rather than an evergreen rules guide.",
      "Visible H1 pairs Hood Warfare 2 with News & Patch Notes; the description and dated timeline distinguish the refreshed official feed from reviewed summaries.",
      "The title avoids pinning the entire news page to 1.0.10. Keep that patch in the description only while it remains a meaningful featured summary; do not describe it as the latest patch without a fresh check."
    ]
  },
  {
    "path": "/games/hood-warfare-2/purchase/",
    "primaryKeyword": "Hood Warfare 2 Steam price",
    "secondaryKeywords": [
      "buy Hood Warfare 2",
      "Hood Warfare 2 download",
      "Hood Warfare 2 system requirements"
    ],
    "title": "Hood Warfare 2 Steam Price & Install Guide | ZowGame",
    "description": "Check Hood Warfare 2 on Steam: China-region price, Windows requirements, language support and installation steps, with official purchase and refund help.",
    "contentEvidence": [
      "src/app/components/hood-warfare-2-page.tsx: Purchase renders HoodLiveStore, three Steam purchase/install steps and official game support/refund links.",
      "src/app/components/hood-warfare-2-page.tsx: purchase hero identifies China-region price, Windows requirements, languages and anti-cheat information.",
      "src/app/data/hood-warfare-2.ts: Steam AppID 5155360 and official store/support/refund sources identify the product."
    ],
    "notes": [
      "Primary intent: purchase evaluation and installation. This is a guide to Steam, not a ZowGame checkout, download mirror or key seller.",
      "Visible H1 pairs Hood Warfare 2 with Buying & Download; the introduction and Purchase section cover official access and installation.",
      "China-region/CNY pricing is the existing scope. Do not imply one worldwide price or add a specific current price to evergreen metadata."
    ]
  },
  {
    "path": "/games/hood-warfare-2/weapons/",
    "primaryKeyword": "Hood Warfare 2 weapons",
    "secondaryKeywords": [
      "Hood Warfare 2 attachments",
      "Hood Warfare 2 weapon unlocks",
      "Hood Warfare 2 loadouts"
    ],
    "title": "Hood Warfare 2 Weapons: Unlocks & Attachments | ZowGame",
    "description": "Understand Hood Warfare 2 weapon unlocks, attachment challenges, skins and loadout practice, with confirmed systems separated from unverified gun stats.",
    "contentEvidence": [
      "src/app/components/hood-warfare-2-page.tsx: Weapons explains player-level, weapon-challenge and weapon-kill progression as separate tracks.",
      "src/app/data/hood-warfare-2.ts: hoodWeaponSystems covers sights, magazines, grips, suppressors, equipment and skins with practice methods and explicit unknowns.",
      "src/app/components/hood-warfare-2-page.tsx: the weapons notice states that the full list, count, unlock levels, damage and time to kill remain unverified."
    ],
    "notes": [
      "Primary intent: progression and customization systems. The page cannot yet satisfy a complete gun roster, damage table, TTK ranking or best-loadout query.",
      "Visible H1 pairs Hood Warfare 2 with Weapons & Attachments; the introduction and main section describe confirmed progression and loadout practice.",
      "Avoid 'all weapons', an exact gun count, numerical attachment bonuses or a strongest-build claim until the missing evidence is added."
    ]
  },
  {
    "path": "/games/krillion/",
    "primaryKeyword": "Krillion game",
    "secondaryKeywords": [
      "Krillion daily trivia",
      "Krillion score calculator",
      "Krillion scoring tiers",
      "official Krillion game"
    ],
    "title": "Krillion Game: Daily Trivia & Score Guide | ZowGame",
    "description": "Explore Krillion's daily trivia format, scoring tiers and depth calculator. Learn the rules and rare-answer basics, then play on the official website.",
    "contentEvidence": [
      "src/app/components/krillion-game-page.tsx: overview H1 names Krillion; its introduction identifies a daily browser trivia game by kp.",
      "src/app/components/krillion-game-page.tsx: overview renders KrillionDailyBrief, scoring tiers, KrillionScoreCalculator and official Daily/Unlimited/packs/archive links.",
      "src/app/components/krillion-tools.tsx: daily brief retrieves prompts, not an answer key; the calculator combines seven selected tiers into score and depth.",
      "src/app/data/krillion.ts: FAQ explicitly says ZowGame is independent, play stays on krillion.io and today's answers have not been verified."
    ],
    "notes": [
      "Primary intent: identify Krillion and find the rules, score tools and official play entry. Keep the in-depth decision routine on /guide/ and practical questions on /faq/.",
      "H1 and introductory copy cover the game identity. Daily prompts and calculator are supplementary; neither is an on-site copy of the original game.",
      "Do not target 'Krillion answers today' with an answer-key promise. The current daily widget is a prompt summary; availability depends on its feed and expiry checks.",
      "The daily game is free; some additional modes or unlocks may be paid. Do not label all Krillion modes free."
    ]
  },
  {
    "path": "/games/krillion/faq/",
    "primaryKeyword": "Krillion FAQ",
    "secondaryKeywords": [
      "Krillion daily reset",
      "Krillion Unlimited",
      "Krillion spelling",
      "Krillion missing answers"
    ],
    "title": "Krillion FAQ: Daily Reset, Unlimited & Help | ZowGame",
    "description": "Check Krillion's daily reset, spelling rules, missing-answer help, scoring, optional accounts and Unlimited access, with links to the creator's FAQ.",
    "contentEvidence": [
      "src/app/components/krillion-game-page.tsx: FAQ hero description covers resets, scores, spelling, missing answers, Unlimited and help.",
      "src/app/components/krillion-game-page.tsx: #questions renders searchable krillionFaqs and links the creator's FAQ.",
      "src/app/data/krillion.ts: ten FAQs explain America/New_York midnight resets, optional accounts, curated scoring, spelling/aliases, paid unlock boundaries and official support."
    ],
    "notes": [
      "Primary intent: rule clarification, access and support. 'Answers' in the description means answers to player questions, not the daily puzzle's answer key.",
      "Visible H1 pairs Krillion with FAQ & Help; the introduction and question list cover game access, scoring, resets and player help.",
      "Do not replace America/New_York midnight with a fixed year-round UTC hour or promise free Unlimited access."
    ]
  },
  {
    "path": "/games/krillion/guide/",
    "primaryKeyword": "how to play Krillion",
    "secondaryKeywords": [
      "Krillion rules",
      "Krillion scoring",
      "Krillion rare answer tips",
      "Krillion 25 second timer"
    ],
    "title": "How to Play Krillion: Scoring & Rare Answers | ZowGame",
    "description": "Learn how to play Krillion with seven practical answer steps, the 25-second timer, preset scoring tiers and rare-answer tips that still favour valid choices.",
    "contentEvidence": [
      "src/app/components/krillion-game-page.tsx: guide deck says 'How to play Krillion, one decision at a time.' The guide section renders seven original guideSteps.",
      "src/app/components/krillion-game-page.tsx: scoring and practice sections explain preset tiers and editorial tips, followed by the depth calculator.",
      "src/app/data/krillion.ts: guideSteps cover category qualifiers, a valid fallback, smaller subcategories, spelling, submission and reviewing the matched answer."
    ],
    "notes": [
      "Primary intent: rules, timed answer decisions and understanding scoring, not a checked list of daily answers.",
      "Visible H1 pairs Krillion with How to Play; the introduction and rules explain the rare-answer scoring and daily game flow.",
      "The seven steps are an editorial routine. They do not guarantee a 100-point answer; rarity is assigned in advance rather than calculated from today's player selections."
    ]
  },
  {
    "path": "/guides/",
    "primaryKeyword": "game guides and walkthroughs",
    "secondaryKeywords": [
      "beginner guides",
      "game rules",
      "game troubleshooting",
      "strategy guides"
    ],
    "title": "Game Guides: Rules, Walkthroughs & Tips | ZowGame",
    "description": "Search game guides by title, genre or topic. Find beginner steps, rules, walkthroughs, strategies and troubleshooting across ZowGame's published library.",
    "contentEvidence": [
      "app/guides/page.tsx: search, genre/topic filters, real chapter list and 12-item pagination",
      "src/app/data/atlas.ts: 30 published guide/topic entries, including standalone AION 2 stats coverage"
    ],
    "notes": [
      "The base directory is one of 37 canonical routes. Unfiltered guide pages 2 and 3 are two additional indexable views with page-specific TD and self canonicals. Filtered views remain noindex,follow.",
      "Filtered, unknown-parameter and invalid-parameter results retain noindex,follow and the clean directory canonical. Out-of-range pagination must remain a real 404."
    ]
  },
  {
    "path": "/guides/?page=2",
    "primaryKeyword": "game guides",
    "secondaryKeywords": [
      "walkthroughs",
      "beginner guides",
      "game strategy"
    ],
    "title": "Game Guides: Rules & Walkthroughs, Page 2 | ZowGame",
    "description": "Browse page 2 of ZowGame's guide library for more game rules, survival strategies, walkthroughs and player questions, with direct links to published chapters.",
    "contentEvidence": [
      "app/guides/page.tsx: server-rendered pagination and results",
      "src/app/data/atlas.ts: published guide registry and pagination order"
    ],
    "notes": [
      "Self-canonical, indexable unfiltered pagination; not an additional sitemap base route."
    ]
  },
  {
    "path": "/guides/?page=3",
    "primaryKeyword": "game guides",
    "secondaryKeywords": [
      "walkthroughs",
      "beginner guides",
      "game strategy"
    ],
    "title": "Game Guides: Rules & Walkthroughs, Page 3 | ZowGame",
    "description": "Explore page 3 of ZowGame's guide library for puzzle walkthroughs, controls, player questions and AION 2 Steam launch stats, with direct links to each topic.",
    "contentEvidence": [
      "app/guides/page.tsx: server-rendered pagination and results",
      "src/app/data/atlas.ts: published guide registry and pagination order"
    ],
    "notes": [
      "Self-canonical, indexable unfiltered pagination; not an additional sitemap base route."
    ]
  },
  {
    "path": "/privacy/",
    "primaryKeyword": "ZowGame privacy policy",
    "secondaryKeywords": [
      "Google Analytics cookies",
      "third-party game content",
      "analytics opt-out"
    ],
    "title": "Privacy Policy: Cookies & Third-Party Data | ZowGame",
    "description": "Read ZowGame's privacy policy covering Google Analytics, cookies, external game links and embedded content, including opt-out information and contact guidance.",
    "contentEvidence": [
      "app/privacy/page.tsx: Analytics, Third-Party Links, Embedded Game Content and Contact sections",
      "app/layout.tsx: existing Google Analytics scripts; draft does not claim that the site collects no data"
    ],
    "notes": [
      "Summarize the policy without repeating its broad no-personal-information statement, since the page separately describes analytics cookies and external data collection. These are editorial snippets, not a legal-policy revision."
    ]
  },
  {
    "path": "/updates/",
    "primaryKeyword": "game updates",
    "secondaryKeywords": [
      "official game news",
      "patch notes",
      "Hood Warfare 2 updates",
      "AION 2 news"
    ],
    "title": "Game Updates, Official News & Patch Notes | ZowGame",
    "description": "Find Hood Warfare 2 announcements, Fishes patch history and AION 2 news. Read dated coverage with official source links and separate feed and review times.",
    "contentEvidence": [
      "app/updates/page.tsx: explicit update index and explanation of retrieval versus editorial-review dates",
      "src/app/data/atlas.ts: ATLAS_UPDATE_CHANNELS for Hood Warfare 2 Steam news, Fishes reviewed changelog and AION 2 official news"
    ],
    "notes": [
      "An update index, not a promise that every linked guide is freshly reviewed or that every feed has an editorial summary. Do not describe the edited Fishes history as a live feed."
    ]
  }
];

const byPath = /*#__PURE__*/ new Map(PAGE_TD.map((entry) => [entry.path, entry]));

/** Match published page views only; filter/query variants use their own noindex context. */
export function getPageTd(path: string): PageTd | undefined {
  const url = new URL(path, "https://zowgame.com");
  if (url.origin !== "https://zowgame.com" || url.hash) return undefined;
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  const keys = [...url.searchParams.keys()];
  if (keys.length) {
    if (url.pathname !== "/guides/" || keys.length !== 1 || keys[0] !== "page" || !["2", "3"].includes(url.searchParams.get("page") || "")) return undefined;
    return byPath.get(url.pathname + "?page=" + url.searchParams.get("page"));
  }
  return byPath.get(url.pathname);
}

type DirectoryTdFilters = { query: string; genre: string; format?: string; type?: string; page?: number };
/** Filter views are noindex; their snippets still explain the visible search context. */
export function getDirectoryTd(kind: "games" | "guides", filters: DirectoryTdFilters): Pick<PageTd, "title" | "description"> {
  const basePath = kind === "games" ? "/games/" : "/guides/";
  const labels: Record<string, string> = { shooters: "Shooters", "survival-horror": "Survival & horror", "puzzle-trivia": "Puzzles & trivia", tabletop: "Tabletop", browser: "Browser games", download: "PC downloads", "getting-started": "Getting started", rules: "Rules", strategy: "Strategy", troubleshooting: "Player help", walkthrough: "Walkthroughs", updates: "Game updates" };
  const parts = [...new Set([labels[filters.genre], labels[kind === "games" ? filters.format || "" : filters.type || ""]].filter(Boolean))];
  if (!filters.query && !parts.length) return getPageTd(basePath + (filters.page && filters.page > 1 ? `?page=${filters.page}` : "")) || getPageTd(basePath)!;
  const clip = (value: string, length: number) => Array.from(value).length <= length ? value : Array.from(value).slice(0, length - 1).join("").trimEnd() + "…";
  const context = clip(filters.query || parts.join(", "), 36);
  const queryLabel = filters.query ? `“${context}”` : context;
  const title = `${kind === "games" ? "Game Library" : "Game Guides"}: ${queryLabel} | ZowGame`;
  const subject = clip(filters.query || parts.join(", "), 26);
  const description = kind === "games"
    ? `Search ZowGame's game library for “${subject}”. Browse matching game overviews, filter by format and follow player guides and official links.`
    : `Search ZowGame's published guides for “${subject}”. Browse matching chapters, filter by topic, and open rules, walkthroughs or player help.`;
  return { title, description };
}

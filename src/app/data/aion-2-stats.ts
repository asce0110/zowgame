export const AION_2_APP_ID = 3393110;
export const AION_2_STATS_PATH = "/games/aion-2/steam-launch-stats/";
export const AION_2_SOURCES = {
  steam: "https://store.steampowered.com/app/3393110/AION_2/",
  charts: "https://store.steampowered.com/charts/mostplayed",
  steamdb: "https://steamdb.info/app/3393110/charts/",
  news: "https://steamcommunity.com/app/3393110/allnews/",
  launch: "https://about.ncsoft.com/en/news/article/aion2_update_20260930",
  faq: "https://steamcommunity.com/games/3393110/announcements/detail/680761758839734962",
  playerApi: "https://partner.steamgames.com/doc/webapi/ISteamUserStats#GetNumberOfCurrentPlayers",
};

export type AionMetric = {
  value: number | null;
  observedAt: string | null;
  sourceUpdatedAt?: string | null;
  state: "ready" | "stale" | "unavailable";
};
export type AionNewsItem = { id: string; title: string; url: string; date: string; excerpt: string };
export type AionStatsResponse = {
  generatedAt: string;
  currentPlayers: AionMetric;
  peakToday: AionMetric;
  news: { items: AionNewsItem[]; observedAt: string | null; state: "ready" | "stale" | "unavailable" };
};

// A dated, attributed reference, not a live Steam all-time-peak API result.
export const AION_2_REPORTED_PEAK = { value: 397905, date: "2026-10-05", checked: "2026-10-12", source: AION_2_SOURCES.steamdb };

export const AION_2_FAQ = [
  { q: "What do AION 2 Steam launch stats measure?", a: "They track players concurrently active in AION 2 on Steam. Concurrent players, daily active users, registered accounts and sales are different measures. These Steam counts do not include players using PURPLE." },
  { q: "When did AION 2 launch on Steam?", a: "The global release was October 5, 2026. Founder’s Pack early access ran from September 30 to October 4. The September 17–18 Launch Scale Test was a separate technical test, not the official launch." },
  { q: "Which Steam app is tracked?", a: "This page tracks the main game, AppID 3393110. The separate Playtest app, 4972320, is excluded. Test participation and test progress should not be combined with the main game’s launch statistics." },
  { q: "Is the reported record the first 24 hours after launch?", a: "SteamDB records a peak of 397,905 on October 5, 2026, as checked on October 12. A peak recorded on the release date is not automatically the maximum for the first 24 hours after release. The reference stays dated; check SteamDB for its current record." },
  { q: "How often are the live numbers updated?", a: "The page checks its Steam data feed every five minutes while visible. Steam and the site cache responses, so the displayed count can lag activity in the game. The observation time is shown alongside each number." },
  { q: "Why can the current count differ from SteamDB?", a: "The sources can refresh at different times. Compare the observation time and app ID before comparing values. A temporary difference does not mean either number counts the whole player population." },
  { q: "What does Peak today mean?", a: "This is the label used on Steam’s Most Played chart. It is separate from the all-time record and a launch-day peak. If AION 2 is absent from Steam’s top-game response, the value is unavailable; it is not reported as zero." },
  { q: "Are Steam and PURPLE players on separate servers?", a: "The global launch FAQ says they share servers and game content. That does not make Steam’s player counter a combined Steam-and-PURPLE total. The earlier Korean and Taiwanese releases also have a separate release history." },
  { q: "Can I view the complete history?", a: "Open the SteamDB history linked here. SteamDB controls its own chart coverage and refresh schedule. ZowGame does not currently maintain a historical sampling database." },
  { q: "What happens when a data source is unavailable?", a: "Missing values stay unavailable. A previously successful reading can remain visible with its original observation time and a stale label. You can retry or open the linked source directly." },
];

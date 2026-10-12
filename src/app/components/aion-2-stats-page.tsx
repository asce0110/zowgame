"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Clock3, RefreshCw, WifiOff } from "lucide-react";
import { SiteHeader } from "./site-header";
import { AionPlayerHelp } from "./aion-2-player-help";
import { AION_2_BRIEFS } from "../data/aion-2-update-briefs";
import { AION_2_APP_ID, AION_2_FAQ, AION_2_REPORTED_PEAK, AION_2_SOURCES, type AionMetric, type AionNewsItem, type AionStatsResponse } from "../data/aion-2-stats";
import "../../styles/editorial.css";
import "../../styles/aion-2-stats.css";

const REFRESH_INTERVAL = 300_000;
const numberFormat = new Intl.NumberFormat("en-US");
const sections = [
  { id: "live-stats", label: "Live readings" },
  { id: "history", label: "Player history" },
  { id: "timeline", label: "Launch timeline" },
  { id: "official-news", label: "News explained" },
  { id: "player-help", label: "Player help" },
  { id: "scope", label: "What is counted" },
  { id: "faq", label: "Questions & sources" },
];

function isTimestamp(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function isMetric(value: unknown): value is AionMetric {
  if (!value || typeof value !== "object") return false;
  const metric = value as AionMetric;
  if (!["ready", "stale", "unavailable"].includes(metric.state)) return false;
  if (metric.value !== null && (!Number.isSafeInteger(metric.value) || metric.value < 0)) return false;
  if (metric.observedAt !== null && !isTimestamp(metric.observedAt)) return false;
  if (metric.sourceUpdatedAt !== undefined && metric.sourceUpdatedAt !== null && !isTimestamp(metric.sourceUpdatedAt)) return false;
  return metric.state === "unavailable" ? metric.value === null : metric.value !== null && isTimestamp(metric.observedAt);
}

function isSteamNewsUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && ["steamcommunity.com", "store.steampowered.com"].includes(url.hostname) && !url.username && !url.password;
  } catch { return false; }
}

function isNewsItem(value: unknown): value is AionNewsItem {
  if (!value || typeof value !== "object") return false;
  const item = value as AionNewsItem;
  return typeof item.id === "string" && typeof item.title === "string" && item.title.trim().length > 0 && typeof item.excerpt === "string" && isTimestamp(item.date) && isSteamNewsUrl(item.url);
}

function isStatsResponse(value: unknown): value is AionStatsResponse {
  if (!value || typeof value !== "object") return false;
  const result = value as AionStatsResponse;
  return isTimestamp(result.generatedAt) && isMetric(result.currentPlayers) && isMetric(result.peakToday)
    && !!result.news && ["ready", "stale", "unavailable"].includes(result.news.state)
    && (result.news.observedAt === null || isTimestamp(result.news.observedAt))
    && Array.isArray(result.news.items) && result.news.items.every(isNewsItem);
}

function retainReading(next: AionMetric, previous?: AionMetric): AionMetric {
  return next.state === "unavailable" && previous?.value !== null && previous?.value !== undefined
    ? { ...previous, state: "stale" } : next;
}

function markStale(previous: AionStatsResponse | null): AionStatsResponse | null {
  if (!previous) return null;
  return {
    ...previous,
    currentPlayers: { ...previous.currentPlayers, state: previous.currentPlayers.value === null ? "unavailable" : "stale" },
    peakToday: { ...previous.peakToday, state: previous.peakToday.value === null ? "unavailable" : "stale" },
    news: { ...previous.news, state: previous.news.observedAt ? "stale" : "unavailable" },
  };
}

function utcLabel(value: string): string {
  return `${new Date(value).toISOString().slice(0, 16).replace("T", " ")} UTC`;
}

function newsDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

function newsExcerpt(value: string): string {
  const words = value.trim().split(/\s+/);
  return words.length > 16 ? `${words.slice(0, 16).join(" ")}…` : value;
}

function SourceLink({ href, children, className = "a2-source-link" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;
}

function ReadingTime({ metric, loading }: { metric?: AionMetric; loading: boolean }) {
  if (metric?.observedAt && metric.value !== null) return <p className="a2-reading-time"><Clock3 size={13} aria-hidden="true" /><span>Observed <time dateTime={metric.observedAt}>{utcLabel(metric.observedAt)}</time></span></p>;
  return <p className="a2-reading-time">{loading ? "Waiting for a dated Steam reading." : "No verified reading available."}</p>;
}

function MetricState({ metric, loading }: { metric?: AionMetric; loading: boolean }) {
  const state = metric?.state ?? "unavailable";
  return <span className={`a2-metric-state a2-state-${state}`}>
    <span aria-hidden="true" />{loading ? "Checking source" : state === "ready" ? "Source reading" : state === "stale" ? "Last available reading" : "Unavailable"}
  </span>;
}

export function Aion2StatsPage() {
  const [data, setData] = useState<AionStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offline, setOffline] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let stopped = false;
    let running = false;
    let activeController: AbortController | null = null;
    async function refresh() {
      if (document.hidden || running || stopped) return;
      running = true;
      setLoading(true);
      const controller = new AbortController();
      activeController = controller;
      const timeout = window.setTimeout(() => controller.abort(), 15_000);
      try {
        if (!navigator.onLine) throw new Error("Offline");
        const response = await fetch("/api/aion-2/", { signal: controller.signal, cache: "no-store", headers: { Accept: "application/json" } });
        if (!response.ok && response.status !== 503) throw new Error("Feed unavailable");
        const next: unknown = await response.json();
        if (!isStatsResponse(next)) throw new Error("Invalid feed");
        if (!stopped) {
          setData((previous) => ({
            ...next,
            currentPlayers: retainReading(next.currentPlayers, previous?.currentPlayers),
            peakToday: retainReading(next.peakToday, previous?.peakToday),
            news: next.news.state === "unavailable" && previous?.news.observedAt
              ? { ...previous.news, state: "stale" } : next.news,
          }));
          setError(!response.ok);
        }
      } catch {
        if (!stopped) { setError(true); setData(markStale); }
      } finally {
        window.clearTimeout(timeout);
        running = false;
        activeController = null;
        if (!stopped) setLoading(false);
      }
    }
    const connectionChanged = () => { setOffline(!navigator.onLine); if (navigator.onLine) void refresh(); };
    const visibilityChanged = () => { if (!document.hidden) void refresh(); };
    setOffline(!navigator.onLine);
    void refresh();
    const timer = window.setInterval(() => void refresh(), REFRESH_INTERVAL);
    document.addEventListener("visibilitychange", visibilityChanged);
    window.addEventListener("online", connectionChanged);
    window.addEventListener("offline", connectionChanged);
    return () => {
      stopped = true;
      activeController?.abort();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", visibilityChanged);
      window.removeEventListener("online", connectionChanged);
      window.removeEventListener("offline", connectionChanged);
    };
  }, [attempt]);

  const current = data?.currentPlayers;
  const today = data?.peakToday;
  const news = data?.news;
  const partial = !!data && [current?.state, today?.state, news?.state].some((state) => state !== "ready");
  const refresh = () => setAttempt((value) => value + 1);
  const status = loading ? "Checking Steam readings and official updates."
    : error ? "The data feed could not be refreshed. Previous readings keep their original time."
    : partial ? "Some readings are unavailable or older. Check their labels and observation times."
    : "Steam readings received. This page checks again every five minutes while visible.";

  return <div className="zg-site ed-home a2-page">
    <a className="zg-skip" href="#aion-content">Skip to AION 2 stats</a>
    <SiteHeader officialUrl={AION_2_SOURCES.steam} />
    {offline && <div className="a2-offline" role="status"><WifiOff size={18} aria-hidden="true" /><p>Your device reports that it is offline. The guide text stays available; reconnect to refresh Steam readings.</p></div>}
    <main id="aion-content" className="a2-main">
      <div className="a2-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>AION 2 Steam launch stats</span></div>
      <header className="a2-intro">
        <div className="a2-intro-copy">
          <p className="ed-eyebrow">THE STEAM WATCH / APP {AION_2_APP_ID}</p>
          <h1><span>AION 2</span>Steam launch stats</h1>
          <p className="a2-deck">Who’s playing now, how high did launch go, and what should you do when something fails? Steam readings, news explained and practical player checks in one place.</p>
          <div className="a2-intro-actions"><a className="a2-jump" href="#live-stats">Read the latest numbers<ArrowDown size={18} aria-hidden="true" /></a><a className="a2-jump" href="#player-help">Find help with a problem<ArrowDown size={18} aria-hidden="true" /></a></div>
        </div>
        <aside className="a2-edition" aria-label="Tracker scope">
          <span className="a2-edition-number" aria-hidden="true">02</span>
          <div><p className="ed-eyebrow">GLOBAL STEAM RELEASE</p><p className="a2-edition-date"><time dateTime="2026-10-05">05 OCT 2026</time></p><p>Main game only. Steam players are one part of AION 2’s audience.</p></div>
          <SourceLink href={AION_2_SOURCES.launch}>Read NC’s launch notice</SourceLink>
        </aside>
      </header>

      <nav className="a2-index" aria-label="On this page">{sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</a>)}</nav>

      <section className="a2-readings" id="live-stats" aria-labelledby="a2-readings-title">
        <div className="a2-section-heading"><div><p className="ed-eyebrow">01 / A DATED SNAPSHOT</p><h2 id="a2-readings-title">Players on Steam.</h2></div><button className="a2-button a2-button-secondary" type="button" disabled={loading} onClick={refresh}><RefreshCw size={16} aria-hidden="true" className={loading ? "a2-spin" : undefined} />{loading ? "Checking…" : error || partial ? "Retry readings" : "Refresh readings"}</button></div>
        <div className="a2-readings-grid" aria-busy={loading}>
          <div className="a2-current">
            <div className="a2-metric-heading"><h3>Playing now</h3><MetricState metric={current} loading={loading} /></div>
            <strong className="a2-current-value">{typeof current?.value === "number" ? numberFormat.format(current.value) : "—"}</strong>
            <p className="a2-unit">CONCURRENT PLAYERS · STEAM ONLY</p>
            <ReadingTime metric={current} loading={loading} />
            <SourceLink href={AION_2_SOURCES.playerApi}>Steam current-player API</SourceLink>
          </div>
          <div className="a2-reading-rail">
            <div className="a2-today"><div className="a2-metric-heading"><h3>Peak today</h3><MetricState metric={today} loading={loading} /></div><strong>{typeof today?.value === "number" ? numberFormat.format(today.value) : "—"}</strong><ReadingTime metric={today} loading={loading} />{today?.sourceUpdatedAt && <p className="a2-source-updated">Steam chart updated <time dateTime={today.sourceUpdatedAt}>{utcLabel(today.sourceUpdatedAt)}</time></p>}<SourceLink href={AION_2_SOURCES.charts}>Steam Most Played chart</SourceLink></div>
            <div className="a2-record"><p className="ed-eyebrow">DATED STEAMDB RECORD</p><strong>{numberFormat.format(AION_2_REPORTED_PEAK.value)}</strong><p>Peak recorded <time dateTime={AION_2_REPORTED_PEAK.date}>October 5, 2026</time><br />Checked <time dateTime={AION_2_REPORTED_PEAK.checked}>October 12, 2026</time></p><SourceLink href={AION_2_REPORTED_PEAK.source}>Check the current record</SourceLink></div>
          </div>
        </div>
        <div className={`a2-feed-note${error || partial ? " a2-feed-warning" : ""}`} role="status"><span aria-hidden="true">{error || partial ? <Clock3 size={16} /> : <Check size={16} />}</span><p>{status}</p></div>
        <p className="a2-caption">“Peak today” follows Steam’s chart label. The dated SteamDB record is a separate reference, not a live all-time-peak response or a verified first-24-hours maximum. Missing readings remain unavailable.</p>
        <noscript><p className="a2-noscript">Live readings need JavaScript. Open the Steam sources above for current numbers; the launch timeline and scope notes remain readable below.</p></noscript>
      </section>

      <section className="a2-history" id="history" aria-labelledby="a2-history-title">
        <div className="a2-history-copy"><p className="ed-eyebrow">02 / FOLLOW THE LAUNCH CURVE</p><h2 id="a2-history-title">The number needs<br />a timeline.</h2><p>A single reading cannot show a launch surge or a daily cycle. SteamDB provides historical charts for the main game. ZowGame currently links to that history and does not maintain its own sampling database.</p><SourceLink href={AION_2_SOURCES.steamdb} className="a2-button">Open full history</SourceLink></div>
        <aside className="a2-history-panel"><p className="ed-eyebrow">HISTORY / AT THE SOURCE</p><h3>Compare the same game.</h3><p>Use SteamDB’s chart for main AppID 3393110. Its displayed time range, historical coverage and refresh schedule are controlled by SteamDB.</p><p>Check the launch date and later readings together. The separate Playtest and PURPLE-only players are outside this Steam history.</p></aside>
      </section>

      <section className="a2-timeline" id="timeline" aria-labelledby="a2-timeline-title">
        <div className="a2-section-heading"><div><p className="ed-eyebrow">03 / THREE DIFFERENT STARTS</p><h2 id="a2-timeline-title">Test. Early access. Launch.</h2></div><SourceLink href={AION_2_SOURCES.launch}>Official release dates</SourceLink></div>
        <ol className="a2-timeline-list">
          <li><div className="a2-timeline-date"><time dateTime="2026-09-17">17–18 SEP</time><span>2026</span></div><div><p className="ed-eyebrow">TECHNICAL LAUNCH SCALE TEST</p><h3>A separate Playtest app</h3><p>Limited test windows ran before release. Playtest AppID 4972320 and its wiped progress are excluded from this main-game tracker.</p></div></li>
          <li><div className="a2-timeline-date"><time dateTime="2026-09-30">30 SEP–04 OCT</time><span>2026</span></div><div><p className="ed-eyebrow">FOUNDER’S PACK EARLY ACCESS</p><h3>The main game opens early</h3><p>Founder’s early access ran on Steam and PURPLE. Main-app activity before October 5 belongs to this early-access period, not the public launch day.</p></div></li>
          <li className="a2-timeline-launch"><div className="a2-timeline-date"><time dateTime="2026-10-05">05 OCT</time><span>2026</span></div><div><p className="ed-eyebrow">GLOBAL RELEASE</p><h3>AION 2 launches globally</h3><p>The global Steam release uses AppID 3393110. The earlier Korean and Taiwanese releases have a separate history and should not be treated as this Steam launch.</p></div></li>
        </ol>
      </section>

      <section className="a2-news" id="official-news" aria-labelledby="a2-news-title">
        <div className="a2-section-heading"><div><p className="ed-eyebrow">04 / WHAT THE UPDATE MEANS</p><h2 id="a2-news-title">Read it. Understand it. Act.</h2></div><a className="a2-source-link" href="#latest-announcements">Latest official headlines<ArrowDown size={16} aria-hidden="true" /></a></div>
        <p className="a2-news-note">Original ZowGame notes on checked official announcements. Read the useful distinction here, then follow the player checklist. These dated reports do not measure current server health.</p>
        <div className="a2-brief-list">{AION_2_BRIEFS.map((brief) => <article className="a2-brief" id={`brief-${brief.id}`} key={brief.id} aria-labelledby={`brief-title-${brief.id}`}><div className="a2-brief-date"><p className="ed-eyebrow">ZOWGAME / UPDATE EXPLAINED</p><time dateTime={brief.publishedAt}>{newsDate(brief.publishedAt)}</time><span>Source published in UTC</span><p>Checked <time dateTime={brief.checkedAt}>{brief.checkedAt}</time></p></div><div><h3 id={`brief-title-${brief.id}`}>{brief.title}</h3><p className="a2-brief-summary">{brief.summary}</p><div className="a2-brief-takeaway"><p className="ed-eyebrow">FOR THE PLAYER</p><p>{brief.takeaway}</p></div>{brief.helpId && <a href={`#help-${brief.helpId}`} className="a2-brief-action">Read the player checklist<ArrowDown size={16} aria-hidden="true" /></a>}<div className="a2-brief-sources"><SourceLink href={brief.sourceUrl}>{brief.sourceLabel}</SourceLink>{brief.relatedSources?.map((source) => <SourceLink key={source.url} href={source.url}>{source.label}</SourceLink>)}</div></div></article>)}</div>
        <h3 className="a2-feed-title" id="latest-announcements">Latest from the official feed</h3><p className="a2-news-note">Fresh titles are retrieved from Steam. Reviewed headlines open their explanation above; other titles open the original notice.</p>
        <div className="a2-news-content" aria-busy={loading}>
          {news?.items.length ? <ol className="a2-news-list">{news.items.map((item) => { const brief = AION_2_BRIEFS.find((entry) => entry.feedIds.includes(item.id)); return <li key={item.id}><div className="a2-news-date"><time dateTime={item.date}>{newsDate(item.date)}</time><span>OFFICIAL STEAM UPDATE</span></div><div><h3>{brief ? <a className="a2-source-link" href={`#brief-${brief.id}`}>{item.title}<ArrowDown size={18} aria-hidden="true" /></a> : <SourceLink href={item.url}>{item.title}</SourceLink>}</h3>{brief ? <p className="a2-news-routing">Read the checked ZowGame explanation on this page.</p> : item.excerpt && <p>{newsExcerpt(item.excerpt)}</p>}</div></li>; })}</ol>
            : <div className="a2-news-empty"><p className="ed-eyebrow">{loading ? "CHECKING THE OFFICIAL FEED" : news?.state === "ready" ? "NO ITEMS RETURNED" : "FEED UNAVAILABLE"}</p><h3>{loading ? "Reading Steam announcements…" : news?.state === "ready" ? "No updates in this response." : "Official updates could not be loaded."}</h3><p>{loading ? "The latest available titles will appear here with their original publication date." : "Open the official announcements feed, or retry this page’s data request."}</p>{!loading && <button className="a2-button a2-button-secondary" type="button" onClick={refresh}><RefreshCw size={16} aria-hidden="true" />Retry official feed</button>}</div>}
        </div>
        {news?.observedAt && <p className="a2-caption">Feed observed <time dateTime={news.observedAt}>{utcLabel(news.observedAt)}</time>{news.state === "stale" ? " · Last available feed; refresh unavailable." : ""}</p>}
      </section>

      <AionPlayerHelp />

      <section className="a2-scope" id="scope" aria-labelledby="a2-scope-title">
        <div><p className="ed-eyebrow">06 / READ THE COUNT CORRECTLY</p><h2 id="a2-scope-title">Steam is a window.<br />Not the whole world.</h2><p>Concurrent players are people active at the same time. They are not daily active users, registered accounts or sales. The Steam API does not provide a region breakdown or a combined Steam-and-PURPLE total.</p><SourceLink href={AION_2_SOURCES.playerApi}>Read the API definition</SourceLink></div>
        <dl className="a2-scope-ledger"><div><dt>Included</dt><dd>Main game AppID 3393110, players active through Steam.</dd></div><div><dt>Excluded</dt><dd>Separate Playtest 4972320, PURPLE-only players, and players not connected to Steam.</dd></div><div><dt>Shared servers</dt><dd>The global FAQ says Steam and PURPLE share servers and game content. Shared servers do not turn Steam’s count into a total for both clients.</dd></div><div><dt>Regional limits</dt><dd>No per-region Steam counts are available in this feed. Korea and Taiwan’s earlier release history is separate from the global Steam launch.</dd></div><div><dt>Time boundaries</dt><dd>Reading times are shown in UTC. A peak dated October 5 is not automatically the maximum of the first 24 hours after launch.</dd></div></dl>
      </section>

      <section className="a2-faq" id="faq" aria-labelledby="a2-faq-title"><div className="a2-section-heading"><div><p className="ed-eyebrow">07 / BEFORE YOU COMPARE</p><h2 id="a2-faq-title">Questions about the numbers.</h2></div></div><div className="a2-faq-list">{AION_2_FAQ.map((faq, index) => <details key={faq.q}><summary><span className="a2-faq-number">{String(index + 1).padStart(2, "0")}</span><span>{faq.q}</span><ChevronDown size={18} aria-hidden="true" /></summary><p>{faq.a}</p></details>)}</div></section>

      <section className="a2-method" aria-labelledby="a2-method-title"><div><p className="ed-eyebrow">SOURCES / METHOD</p><h2 id="a2-method-title">Every reading has a source.</h2><p>Current players come from Steam’s current-player API. Peak today comes from Steam’s Most Played chart. News comes from the main app’s official announcements. Each successful feed reading carries its own observation time; a failed refresh does not change that time.</p><p>The 397,905 reference is a SteamDB record dated October 5, checked October 12, 2026. Historical charts remain supplied by SteamDB. Release and client notes are checked against NC and the official global FAQ.</p><p>The update explanations and player-help facts were checked on October 12, 2026. They are edited notes, not an automatically revised support database. Each guide links its evidence; new notices may change availability or eligibility.</p></div><ul><li><SourceLink href={AION_2_SOURCES.steam}>AION 2 main Steam app · 3393110</SourceLink></li><li><SourceLink href={AION_2_SOURCES.playerApi}>Steam API · concurrent-player definition</SourceLink></li><li><SourceLink href={AION_2_SOURCES.charts}>Steam chart · Peak today</SourceLink></li><li><SourceLink href={AION_2_SOURCES.steamdb}>SteamDB · player history & records</SourceLink></li><li><SourceLink href={AION_2_SOURCES.launch}>NC · global release & early access</SourceLink></li><li><SourceLink href={AION_2_SOURCES.faq}>Official global launch FAQ</SourceLink></li><li><SourceLink href={AION_2_SOURCES.news}>Steam · official announcements</SourceLink></li></ul></section>
    </main>
    <footer className="a2-footer"><Link href="/" className="zg-wordmark">ZOW<span>GAME</span></Link><p>Independent game guides and source-backed Steam readings.</p><nav aria-label="Footer navigation"><Link href="/#library">Game library</Link><Link href="/privacy/">Privacy</Link></nav></footer>
  </div>;
}

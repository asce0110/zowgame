import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGameBySlug, getPublishedGames } from "../../../../src/app/data/games";
import { SubPageLayout, SubSection, HighlightBox } from "../../../../src/app/components/sub-page-layout";

export function generateStaticParams() {
  return getPublishedGames()
    .filter((g) => g.slug === "dont-sleep-with-the-fishes")
    .map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  return {
    title: `${game.shortTitle} Night Events Guide`,
    description: `Night event counter guide for ${game.shortTitle}: Giant Squid, Whirlpool, Eerie Melody, Eyes, Hope, Seagull. Best items for every encounter.`,
    alternates: { canonical: `https://zowgame.com${game.canonicalPath}events/` },
  };
}

const events = [
  {
    name: "Giant Squid",
    best: "Anchor",
    backup: "Repair boat next day",
    avoid: "Going back to sleep",
    official: true,
    detail: "A massive tentacled creature attacks your boat at night. Without the Anchor, your boat takes catastrophic damage. The community also reports that Heart of the Sea may open the True Ending route during this encounter — but this is unverified. After surviving, always repair your boat the next day.",
  },
  {
    name: "Whirlpool",
    best: "Anchor",
    backup: "Immediate repair after damage",
    avoid: "No anchor / sleeping through it",
    official: true,
    detail: "A sudden vortex pulls your boat into a spin. The Anchor holds you steady. Without it, the boat takes heavy structural damage. If you survive, repair immediately — a damaged boat sinks fast. This event is especially dangerous if your hull is already weakened.",
  },
  {
    name: "Eerie Melody",
    best: "Duct Tape",
    backup: "Bucket / Umbrella",
    avoid: "Flashlight / Spyglass",
    official: false,
    detail: "A haunting sound drifts across the water. Community reports say using Flashlight or Spyglass during this event triggers a dangerous siren reaction — do NOT use them. Duct Tape or Bucket will block the effect. In v1.1.3, Duct Tape repair use is optional, so saving it exclusively for this event is now viable.",
  },
  {
    name: "Eyes",
    best: "Stay awake",
    backup: "None known",
    avoid: "Going to sleep with a companion on board",
    official: false,
    detail: "Something watches you from the darkness. If you have a shipmate, going to sleep risks them being taken. Staying awake protects your companion but leaves you with low energy the next day. Plan a rest day after this event if possible.",
  },
  {
    name: "Hope / Other People",
    best: "Flashlight / Flare Gun",
    backup: "Save Flare Gun for stronger rescue chances",
    avoid: "Ignoring the plane / distant lights",
    official: true,
    detail: "A passing aircraft or distant ship lights appear. This is your rescue opportunity. Use Flashlight or Flare Gun to signal. Flare Gun gives the strongest rescue chance (slightly increased in v1.1.3). Do NOT use these items on non-rescue events — wasting them locks you out of the Rescue ending.",
  },
  {
    name: "Seagull",
    best: "Shoo it away",
    backup: "Feed it (accepts food drain)",
    avoid: "Letting too many stay on the boat",
    official: false,
    detail: "A seagull lands on your boat. If you shoo it away, it leaves. Feeding it costs food but keeps it friendly. The danger: if too many seagulls accumulate on your boat, they trigger the Seagull Bad Ending. Community reports suggest this is a hidden failure state — keep your bird count low.",
  },
  {
    name: "Leak",
    best: "Duct Tape",
    backup: "Bucket",
    avoid: "Ignoring it",
    official: true,
    detail: "Your boat springs a leak. Duct Tape patches it instantly. Bucket can also bail water but is less effective. Ignoring a leak causes progressive hull damage — combined with other events, this can sink you fast. In v1.1.3, Duct Tape's repair use is optional, so you can save it exclusively for events like this.",
  },
  {
    name: "Shadow Figure",
    best: "Flashlight",
    backup: "Stay awake",
    avoid: "Going back to sleep alone",
    official: false,
    detail: "A dark shape moves at the edge of your vision. The Flashlight drives it back. Staying awake also works but costs energy. Community reports are mixed on whether this event can harm your shipmate — err on the side of caution.",
  },
  {
    name: "Anglerfish",
    best: "Harpoon Gun",
    backup: "Row (crewmate defense)",
    avoid: "No counter / sleeping through it",
    official: false,
    detail: "A bioluminescent predator rises from the depths. The Harpoon Gun is your best defense. If you brought Row as your crewmate, they can help counter this and other monster events. Without a counter, expect significant boat damage or personal injury.",
  },
];

export default async function EventsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} pageTitle="Night Events Guide" pageDescription={`Complete night event counter reference for ${game.shortTitle}. Every event, best item counter, backup strategy, and what to avoid. Updated v1.1.3.`}>
      <SubSection title="Event Counter Quick Reference">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold text-foreground">Event</th>
                <th className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold text-foreground">Best Counter</th>
                <th className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold text-foreground">Backup</th>
                <th className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold text-foreground">Avoid</th>
                <th className="text-left px-3 py-2 font-['JetBrains_Mono'] text-xs font-extrabold text-foreground">Source</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-muted-foreground">
              {events.map((e, i) => (
                <tr key={e.name} className={i < events.length - 1 ? "border-b border-border" : ""}>
                  <td className="px-3 py-3 font-extrabold text-foreground">{e.name}</td>
                  <td className="px-3 py-3 text-primary font-extrabold">{e.best}</td>
                  <td className="px-3 py-3">{e.backup}</td>
                  <td className="px-3 py-3 text-accent">{e.avoid}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${e.official ? "bg-emerald-500/15 text-emerald-600" : "bg-yellow-500/15 text-yellow-600"}`}>
                      {e.official ? "Official" : "Community"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SubSection>

      {events.map((e) => (
        <SubSection key={e.name} title={e.name}>
          <p>{e.detail}</p>
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <span className="rounded-full border-2 border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] font-extrabold text-primary">Best: {e.best}</span>
            <span className="rounded-full border-2 border-border bg-input-background px-3 py-1 font-mono text-[10px] font-extrabold text-muted-foreground">Backup: {e.backup}</span>
            <span className="rounded-full border-2 border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[10px] font-extrabold text-accent">Avoid: {e.avoid}</span>
          </div>
        </SubSection>
      ))}

      <HighlightBox variant="warning">
        <p className="font-extrabold text-foreground mb-2">Source Confidence</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>Official:</strong> Confirmed by developer DopplerGhost through itch.io, devlog, or patch notes.</li>
          <li><strong>Community:</strong> Reported by players on Reddit, itch.io comments, Fandom, or videos. Not independently verified.</li>
        </ul>
        <p className="mt-2 text-sm">v1.1.3 added 3 new night events. Some counters are still being tracked by the community.</p>
      </HighlightBox>
    </SubPageLayout>
  );
}

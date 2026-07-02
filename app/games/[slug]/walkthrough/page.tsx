import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGameBySlug, getPublishedGames } from "../../../../src/app/data/games";
import { SubPageLayout, SubSection, HighlightBox } from "../../../../src/app/components/sub-page-layout";
import { BookOpen } from "lucide-react";

const WALKTHROUGH_GAMES = ["dont-sleep-with-the-fishes", "all-the-gold-in-fort-locks"];

export function generateStaticParams() {
  return getPublishedGames().filter((g) => WALKTHROUGH_GAMES.includes(g.slug)).map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  const desc = slug === "all-the-gold-in-fort-locks"
    ? `Step-by-step walkthrough for ${game.shortTitle}: Blue, Green, Orange, Red, Purple, and Yellow key stages. Developer-confirmed solutions.`
    : `Step-by-step survival walkthrough for ${game.shortTitle}: ship evacuation, Days 1-10, mid-game events, and rescue conditions.`;
  return { title: `${game.shortTitle} Walkthrough`, description: desc, alternates: { canonical: `https://zowgame.com${game.canonicalPath}walkthrough/` } };
}

/* ========== Fort Locks walkthrough ========== */
const fortLocksStages = [
  {
    key: "Blue Key", time: "0:00–0:30", img: "https://img.zowgame.com/all-the-gold-in-fort-locks/keyframe_026.webp",
    steps: ["Explore the room and find the blue key.","Unlock the blue door — this introduces doors as portals to overlapping rooms.","The blue room stacks on top of the current room. Start thinking in layers."],
  },
  {
    key: "Green Key", time: "0:30–2:00", img: "https://img.zowgame.com/all-the-gold-in-fort-locks/keyframe_015.webp",
    steps: ["Find the green key in the green room.","Trap the green key inside the east chamber.","This feels wrong but sets up a later puzzle. Developer confirmed this is correct."],
  },
  {
    key: "Orange Key", time: "2:00–4:00", img: "https://img.zowgame.com/all-the-gold-in-fort-locks/keyframe_082.webp",
    steps: ["The orange key is the first major stuck point.","After grabbing it, you do NOT need to bring it back.","Continue exploring — you're close to the solution. Developer: \"You don't need to rescue the orange key.\""],
  },
  {
    key: "Red & Purple Keys", time: "4:00–6:00", img: "https://img.zowgame.com/all-the-gold-in-fort-locks/keyframe_005.webp",
    steps: ["THE HARDEST puzzle. 1) Insert purple key from below → pushes red forward.","2) Go around. 3) Push red back.","4) Pull purple FIRST. 5) Then pull red. ORDER MATTERS."],
  },
  {
    key: "Purple Door", time: "6:00–8:00", img: "https://img.zowgame.com/all-the-gold-in-fort-locks/keyframe_030.webp",
    steps: ["After red/purple, the purple door unlocks.","The overlapping room mechanic clicks here.","Explore the purple room — you're in the home stretch."],
  },
  {
    key: "Yellow Key & Finale", time: "8:00–12:34", img: "https://img.zowgame.com/all-the-gold-in-fort-locks/keyframe_125.webp",
    steps: ["Use rescued keys to reach the yellow key in the red room.","All previous keys work together for this final puzzle.","Collect remaining gold. Average completion: ~1 hour."],
  },
];

/* ========== DSWTF walkthrough (simplified) ========== */
const dswtfStages = [
  { phase:"Phase 1: Ship Evacuation", detail:"Prioritize: Fishing Rod, Bait, Flare Gun, Anchor, Duct Tape. Food is secondary — you can fish later. Choose ONE crew member." },
  { phase:"Phase 2: Days 1–3", detail:"Fish daily (Bait + Rod). Eat. Repair if damaged. Chat with shipmate for morale. v1.1.3: Bait only consumed on catch. Duct Tape repair is optional." },
  { phase:"Phase 3: Days 4–10", detail:"Save Flare Gun and Flashlight for Hope events. Keep Anchor for Giant Squid/Whirlpool. Duct Tape for Eerie Melody/Leak. Track food supply closely." },
  { phase:"Phase 4: Late Game / Rescue", detail:"Use Flare Gun during Hope events to signal. Flashlight as backup. If pursuing True Ending, investigate Heart of the Sea + Giant Squid." },
];

export default async function WalkthroughPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();
  const isFortLocks = slug === "all-the-gold-in-fort-locks";

  const wikiLinks = isFortLocks ? [{ label: "Walkthrough", href: `${game.canonicalPath}walkthrough/`, icon: BookOpen }] : undefined;

  return (
    <SubPageLayout gameTitle={game.shortTitle} gamePath={game.canonicalPath} wikiLinks={wikiLinks} pageTitle="Walkthrough" pageDescription={isFortLocks ? "Complete step-by-step walkthrough. Blue → Green → Orange → Red → Purple → Yellow. Developer-confirmed solutions for every stuck point." : `Day-by-day survival walkthrough for ${game.shortTitle}. Evacuation, mid-game, and rescue.`}>
      {isFortLocks ? (
        <>
          <SubSection title="Full Walkthrough Video">
            <div className="rounded-xl border-2 border-border overflow-hidden bg-black">
              <video src="https://img.zowgame.com/all-the-gold-in-fort-locks/Video%201080P.mp4" controls className="w-full" poster="https://img.zowgame.com/all-the-gold-in-fort-locks/keyframe_008.webp" preload="metadata">
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Full 12-minute walkthrough covering all 6 key stages. Use the timeline to jump to specific puzzles.</p>
          </SubSection>
          {fortLocksStages.map(({ key, time, img, steps }, i) => (
            <SubSection key={key} title={`Stage ${i + 1}: ${key} (${time})`}>
              <div className="rounded-xl border-2 border-border overflow-hidden mb-4 bg-black/5"><img src={img} alt={key} className="w-full object-contain max-h-[400px]" loading="lazy" /></div>
              <ol className="list-decimal pl-5 space-y-2">{steps.map((s) => <li key={s}>{s}</li>)}</ol>
            </SubSection>
          ))}
          <HighlightBox variant="warning"><p className="font-extrabold mb-2">Stuck?</p><ul className="list-disc pl-5 space-y-1 text-sm"><li>Press <strong>Z</strong> to undo any move.</li><li>Press <strong>R</strong> to reset to last checkpoint.</li><li>Refresh the page to start fresh if soft-locked.</li></ul></HighlightBox>
        </>
      ) : (
        dswtfStages.map(({ phase, detail }) => (
          <SubSection key={phase} title={phase}><p>{detail}</p></SubSection>
        ))
      )}
    </SubPageLayout>
  );
}

"use client";

import { useState } from "react";
import { Keyboard, Mouse, Lightbulb, HelpCircle, MessageSquare, ChevronDown, Star, ArrowRight } from "lucide-react";
import { useContent } from "./content-store";

const controls = [
  { keys: ["W", "A", "S", "D"], action: "Move your character around the map" },
  { keys: ["SPACE"], action: "Jump or activate wingsuit while airborne" },
  { keys: ["SHIFT"], action: "Sprint — drains stamina, useful for clutch escapes" },
  { keys: ["LMB"], action: "Fire your equipped weapon" },
  { keys: ["RMB"], action: "Aim down sights for higher accuracy" },
  { keys: ["R"], action: "Reload — keep an eye on your ammo before peeking" },
  { keys: ["E"], action: "Interact, pick up loot, hack terminals" },
  { keys: ["Q"], action: "Throw equipped grenade or tactical gadget" },
  { keys: ["TAB"], action: "Open scoreboard and squad info" },
];

const tips = [
  { title: "Land on rooftops, not on streets", body: "Most squads sprint for ground loot in the first 30 seconds. Glide one block past them, drop on a rooftop, and you'll loot uncontested while picking off opponents below." },
  { title: "Always carry one suppressed weapon", body: "The grid map shows gunfire pings within 80 meters. A suppressed SMG or pistol lets you clean up early fights without summoning every nearby squad to your location." },
  { title: "Use the hack terminals on West Bridge", body: "Terminals temporarily reveal nearby enemies on your minimap. Most players ignore them. Hacking just one before a rotation can flip the entire match." },
  { title: "Save your ultimate for the final ring", body: "Tempting as it is to use abilities mid-fight, the last circle decides everything. Carrying a full ult into top 5 wins more games than any weapon choice." },
  { title: "Don't over-loot — momentum matters", body: "Three blue items beat eight white items every time. After 90 seconds of looting, drop what you have and start moving. Sitting still in this game gets you killed." },
  { title: "Headphones are not optional", body: "Eclipse Protocol's audio engine is directional and incredibly accurate. Footsteps tell you exactly where opponents are. Playing without good headphones is playing on hard mode." },
];

const reviews = [
  { name: "ShadowFlux", date: "May 7, 2026", rating: 5, body: "Best browser FPS I've played in years. The movement feels tight, the maps actually have personality, and matches are short enough that I can sneak one in during lunch. The fact that this runs in a browser without lag is genuinely insane." },
  { name: "PixelPriestess", date: "May 4, 2026", rating: 5, body: "I've put 60 hours into this and I haven't even bought anything. The free progression is generous, ranked is competitive, and the community is way less toxic than other shooters I've played. The night-mode lobbies hit different at 2am." },
  { name: "VoidByte", date: "April 28, 2026", rating: 4, body: "Solid game with great gunplay. Only docking a star because matchmaking sometimes throws me into lobbies way above my skill — but when the matches are even, this is honestly one of the most fun shooters I've touched all year. Devs ship updates fast." },
  { name: "Kr1mson", date: "April 22, 2026", rating: 5, body: "The wingsuit changes everything. Most BR games make rotations boring — this one turns every rotation into a minigame. Hacking terminals for intel is also clever design. Whoever is leading this team gets it." },
];

const related = [
  { title: "Void Runners", genre: "Racing", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80" },
  { title: "Shadow Protocol", genre: "Stealth", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80" },
  { title: "Photon Blitz", genre: "Esports", img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=600&q=80" },
  { title: "Titan Siege", genre: "Strategy", img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&q=80" },
];

function SectionHeader({ kicker, title, icon: Icon }: { kicker: string; title: string; icon: any }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-indigo-400" />
        <span className="text-indigo-400 uppercase tracking-wider text-xs font-semibold">{kicker}</span>
      </div>
      <h2 className="text-white text-2xl font-bold">{title}</h2>
    </div>
  );
}

const cardCls = "relative rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-8 shadow-xl shadow-slate-950/30";

export function SeoContent() {
  const { content } = useContent();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-8">
      <article className={cardCls}>
        <SectionHeader kicker="Overview" title={`About ${content.title}`} icon={Lightbulb} />
        <div className="flex flex-col gap-4 text-slate-300 max-w-4xl leading-relaxed">
          {content.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <article className={cardCls}>
        <SectionHeader kicker="Controls" title="How to Play Eclipse Protocol" icon={Keyboard} />
        <p className="text-slate-400 max-w-3xl mb-6 leading-relaxed">
          Eclipse Protocol uses a standard FPS control scheme that will feel immediately familiar to anyone who has played Apex, Fortnite, or Call of Duty. The full keyboard and mouse layout is below — touch controls on mobile use a virtual stick and tap-to-shoot, and gamepads are auto-detected.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {controls.map((c) => (
            <div key={c.keys.join("+")} className="flex items-start gap-3 p-4 rounded-lg bg-slate-950/50 border border-slate-800 hover:border-indigo-500/30 transition-colors">
              <div className="flex gap-1 shrink-0">
                {c.keys.map((k) => (
                  <kbd key={k} className="px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono min-w-[32px] text-center shadow-inner">
                    {k}
                  </kbd>
                ))}
              </div>
              <span className="text-slate-300 text-sm leading-snug">{c.action}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <Mouse className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
          <span className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-white">Tip:</strong> Lower your mouse DPI to around 800 and pair it with a 2.5–3.5 in-game sensitivity. Most pros play in this range because it lets you use full arm movement for tracking.
          </span>
        </div>
      </article>

      <article className={cardCls}>
        <SectionHeader kicker="Strategy" title="Tips & Tricks for Winning" icon={Lightbulb} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tips.map((t, i) => (
            <section key={t.title} className="p-5 rounded-lg bg-slate-950/50 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900/70 transition-all hover:-translate-y-0.5">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0 font-semibold text-xs">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-white font-semibold">{t.title}</h3>
              </div>
              <p className="text-slate-400 ml-10 text-sm leading-relaxed">{t.body}</p>
            </section>
          ))}
        </div>
      </article>

      <article className={cardCls}>
        <SectionHeader kicker="FAQ" title="Frequently Asked Questions" icon={HelpCircle} />
        <div className="flex flex-col gap-2 max-w-4xl">
          {content.faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={f.q} className="rounded-lg border border-slate-800 bg-slate-950/40 overflow-hidden hover:border-slate-700 transition-colors">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-900/60 transition-colors"
                >
                  <h3 className="text-slate-100 font-medium">{f.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${isOpen ? "rotate-180 text-indigo-400" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-slate-400 leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </article>

      <article className={cardCls}>
        <SectionHeader kicker="Reviews" title="What Players Are Saying" icon={MessageSquare} />
        <div className="flex items-center gap-6 mb-6 p-5 rounded-lg bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20">
          <div>
            <div className="text-amber-300 text-4xl font-bold">9.4</div>
            <div className="text-amber-400/80 text-xs uppercase tracking-wider">out of 10</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-slate-300 text-sm">
              Based on <strong className="text-white">12,847</strong> verified player reviews. 94% recommend it to a friend.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.map((r) => (
            <section key={r.name} className="p-5 rounded-lg bg-slate-950/50 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-semibold">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{r.name}</div>
                    <div className="text-slate-500 text-xs">{r.date}</div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < r.rating ? "fill-amber-400 text-amber-400" : "text-slate-700"}`} />
                  ))}
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{r.body}</p>
            </section>
          ))}
        </div>
      </article>

      <article className={cardCls}>
        <SectionHeader kicker="Related" title="You May Also Like" icon={ArrowRight} />
        <p className="text-slate-400 max-w-3xl mb-6 leading-relaxed">
          If you enjoy <strong className="text-white">Eclipse Protocol</strong>, you'll probably love these other free browser games we've curated. All of them launch instantly with no download required.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {related.map((g) => (
            <a key={g.title} href="#" className="group rounded-lg overflow-hidden border border-slate-800 bg-slate-950/50 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all hover:-translate-y-0.5">
              <div className="relative h-32 overflow-hidden">
                <img
                  src={g.img.includes("unsplash.com") ? `${g.img}&fm=avif` : g.img}
                  alt={g.title}
                  width={600}
                  height={338}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              </div>
              <div className="p-3">
                <div className="text-indigo-400 text-xs uppercase tracking-wider font-semibold mb-1">{g.genre}</div>
                <h3 className="text-white font-semibold">{g.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </article>
    </div>
  );
}

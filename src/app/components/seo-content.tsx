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
  { title: "Void Runners", genre: "Racing", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80", color: "from-cyan-400 to-blue-500" },
  { title: "Shadow Protocol", genre: "Stealth", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80", color: "from-purple-600 to-fuchsia-500" },
  { title: "Photon Blitz", genre: "Esports", img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=600&q=80", color: "from-sky-400 to-indigo-600" },
  { title: "Titan Siege", genre: "Strategy", img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&q=80", color: "from-orange-500 to-red-600" },
];

function SectionHeader({ kicker, title, icon: Icon }: { kicker: string; title: string; icon: any }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-fuchsia-400" />
        <span className="text-fuchsia-400 tracking-[0.3em]" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// {kicker}</span>
      </div>
      <h2 className="text-white tracking-tight" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "36px" }}>
        {title}
      </h2>
    </div>
  );
}

export function SeoContent() {
  const { content } = useContent();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-12">
      {/* About */}
      <article className="rounded-2xl border border-white/10 bg-[#0f0020]/60 backdrop-blur p-8">
        <SectionHeader kicker="OVERVIEW" title={`About ${content.title}`} icon={Lightbulb} />
        <div className="flex flex-col gap-4 text-white/75 max-w-4xl" style={{ fontFamily: "Rajdhani", fontSize: "16px", lineHeight: 1.7 }}>
          {content.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      {/* How to Play */}
      <article className="rounded-2xl border border-white/10 bg-[#0f0020]/60 backdrop-blur p-8">
        <SectionHeader kicker="CONTROLS" title="How to Play Eclipse Protocol" icon={Keyboard} />
        <p className="text-white/65 max-w-3xl mb-6" style={{ fontFamily: "Rajdhani", fontSize: "15px", lineHeight: 1.7 }}>
          Eclipse Protocol uses a standard FPS control scheme that will feel immediately familiar to anyone who has played Apex, Fortnite, or Call of Duty. The full keyboard and mouse layout is below — touch controls on mobile use a virtual stick and tap-to-shoot, and gamepads are auto-detected.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {controls.map((c) => (
            <div key={c.keys.join("+")} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex gap-1 shrink-0">
                {c.keys.map((k) => (
                  <kbd key={k} className="px-2.5 py-1.5 rounded-md bg-gradient-to-b from-white/15 to-white/5 border border-white/15 text-white tracking-wider min-w-[36px] text-center" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>
                    {k}
                  </kbd>
                ))}
              </div>
              <span className="text-white/75 leading-snug" style={{ fontFamily: "Rajdhani", fontSize: "14px" }}>{c.action}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
          <Mouse className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-white/70" style={{ fontFamily: "Rajdhani", fontSize: "14px" }}>
            <strong className="text-white">Tip:</strong> Lower your mouse DPI to around 800 and pair it with a 2.5–3.5 in-game sensitivity. Most pros play in this range because it lets you use full arm movement for tracking.
          </span>
        </div>
      </article>

      {/* Tips */}
      <article className="rounded-2xl border border-white/10 bg-[#0f0020]/60 backdrop-blur p-8">
        <SectionHeader kicker="STRATEGY" title="Tips & Tricks for Winning" icon={Lightbulb} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tips.map((t, i) => (
            <section key={t.title} className="p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-fuchsia-500/30 transition-colors">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-fuchsia-500 to-cyan-400 flex items-center justify-center shrink-0 text-white" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "12px" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-white" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "15px" }}>{t.title}</h3>
              </div>
              <p className="text-white/65 ml-10" style={{ fontFamily: "Rajdhani", fontSize: "14px", lineHeight: 1.6 }}>
                {t.body}
              </p>
            </section>
          ))}
        </div>
      </article>

      {/* FAQ */}
      <article className="rounded-2xl border border-white/10 bg-[#0f0020]/60 backdrop-blur p-8">
        <SectionHeader kicker="FAQ" title="Frequently Asked Questions" icon={HelpCircle} />
        <div className="flex flex-col gap-2 max-w-4xl">
          {content.faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={f.q} className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.03] transition-colors"
                >
                  <h3 className="text-white" style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "16px" }}>{f.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform ${isOpen ? "rotate-180 text-fuchsia-400" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-white/65" style={{ fontFamily: "Rajdhani", fontSize: "15px", lineHeight: 1.7 }}>{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </article>

      {/* Reviews */}
      <article className="rounded-2xl border border-white/10 bg-[#0f0020]/60 backdrop-blur p-8">
        <SectionHeader kicker="REVIEWS" title="What Players Are Saying" icon={MessageSquare} />
        <div className="flex items-center gap-6 mb-6 p-5 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
          <div>
            <div className="text-yellow-400 mb-1" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "44px" }}>9.4</div>
            <div className="text-white/40 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>OUT OF 10</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-white/70" style={{ fontFamily: "Rajdhani", fontSize: "14px" }}>
              Based on <strong className="text-white">12,847</strong> verified player reviews. 94% of players recommend Eclipse Protocol to a friend.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.map((r) => (
            <section key={r.name} className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-400 flex items-center justify-center text-white" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "13px" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-white" style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "14px" }}>{r.name}</div>
                    <div className="text-white/40" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{r.date}</div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`} />
                  ))}
                </div>
              </div>
              <p className="text-white/70" style={{ fontFamily: "Rajdhani", fontSize: "14px", lineHeight: 1.6 }}>{r.body}</p>
            </section>
          ))}
        </div>
      </article>

      {/* Related */}
      <article className="rounded-2xl border border-white/10 bg-[#0f0020]/60 backdrop-blur p-8">
        <SectionHeader kicker="RELATED" title="You May Also Like" icon={ArrowRight} />
        <p className="text-white/65 max-w-3xl mb-6" style={{ fontFamily: "Rajdhani", fontSize: "15px", lineHeight: 1.7 }}>
          If you enjoy <strong className="text-white">Eclipse Protocol</strong>, you'll probably love these other free browser games we've curated. All of them launch instantly with no download required.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {related.map((g) => (
            <a key={g.title} href="#" className="group rounded-xl overflow-hidden border border-white/10 hover:border-fuchsia-500/40 transition-all">
              <div className="relative h-32 overflow-hidden">
                <img src={g.img.includes("unsplash.com") ? `${g.img}&fm=avif` : g.img} alt={g.title} width={600} height={338} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-br ${g.color} opacity-30 mix-blend-overlay`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0020] via-transparent to-transparent" />
              </div>
              <div className="p-3">
                <div className={`bg-gradient-to-r ${g.color} bg-clip-text text-transparent tracking-[0.2em] mb-1`} style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "10px" }}>{g.genre.toUpperCase()}</div>
                <h3 className="text-white" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "13px" }}>{g.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </article>
    </div>
  );
}

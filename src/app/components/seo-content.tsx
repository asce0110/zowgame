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
];

const reviews = [
  { name: "Player One", date: "Recent", rating: 5, body: "The rules keep changing, so every run feels different. Just when I think I understand Cobb, the game finds a new way to scare me." },
  { name: "Player Two", date: "Recent", rating: 5, body: "Cobb Can Move is simple to start, but the tension builds fast. Collecting coal in the dark feels way more stressful than it should." },
  { name: "Player Three", date: "Recent", rating: 5, body: "The moment Cobb can hear you, the whole game changes. I started thinking about every step instead of just running around." },
  { name: "Player Four", date: "Recent", rating: 5, body: "I love how short and intense each level feels. It is easy to play for a few minutes, but hard to stop after one run." },
  { name: "Player Five", date: "Recent", rating: 5, body: "The pixel art makes it look cute at first, then Cobb shows up and suddenly the dungeon feels unsafe everywhere." },
  { name: "Player Six", date: "Recent", rating: 5, body: "What makes this game work is the rule system. Cobb is not just chasing you. He learns new ways to make you panic." },
  { name: "Player Seven", date: "Recent", rating: 5, body: "Keeping the furnace alive while Cobb is nearby creates a perfect horror loop. You always need one more piece of coal." },
  { name: "Player Eight", date: "Recent", rating: 5, body: "Every new rule forced me to change my strategy. Cobb can see, Cobb can hear, Cobb can smell... none of them feel fair, and that is the fun." },
];

function SectionHeader({ kicker, title, icon: Icon }: { kicker: string; title: string; icon: any }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-fuchsia-500" />
        <span className="text-fuchsia-500 tracking-[0.3em]" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// {kicker}</span>
      </div>
      <h2 className="ec-text tracking-tight" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "36px" }}>
        {title}
      </h2>
    </div>
  );
}

export function SeoContent() {
  const { content } = useContent();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const cardClass = "rounded-2xl border ec-border ec-surface backdrop-blur p-8";

  return (
    <div className="flex flex-col gap-12">
      {/* About */}
      <article id="about-section" className={cardClass} style={{ boxShadow: "var(--ec-shadow-card)", scrollMarginTop: "96px" }}>
        <SectionHeader kicker="OVERVIEW" title={`About ${content.title}`} icon={Lightbulb} />
        <div className="flex flex-col gap-4 ec-text-muted max-w-4xl" style={{ fontFamily: "Rajdhani", fontSize: "16px", lineHeight: 1.7 }}>
          {content.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      {/* How to Play */}
      <article id="how-to-play-section" className={cardClass} style={{ boxShadow: "var(--ec-shadow-card)", scrollMarginTop: "96px" }}>
        <SectionHeader kicker="GAME GUIDE" title="How to Play Cobb Can Move" icon={Keyboard} />
        <p className="ec-text-muted max-w-3xl mb-6" style={{ fontFamily: "Rajdhani", fontSize: "15px", lineHeight: 1.7 }}>
          Cobb Can Move is a survival horror game where your goal is to explore the dungeon, collect coal, keep the light alive, and avoid Cobb. The controls are simple, but the challenge comes from the changing rules. Each level gives Cobb a new way to hunt you, so you must read the rule, plan your route, and adapt before the monster catches you.
        </p>

        <h3 className="ec-text mb-3" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "20px" }}>Your Main Objective</h3>
        <p className="ec-text-muted max-w-4xl mb-6" style={{ fontFamily: "Rajdhani", fontSize: "15px", lineHeight: 1.7 }}>
          Search the dungeon for coal and important objectives, then return to safe areas before the darkness or Cobb becomes too dangerous. The furnace and light sources help you stay alive, but they do not make you completely safe. Cobb can become smarter as the game continues, so every level requires a different survival strategy.
        </p>

        <h3 className="ec-text mb-3" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "20px" }}>Step-by-Step Guide</h3>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
          {[
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
          ].map((item, i) => (
            <li key={item.title} className="rounded-xl border ec-hairline p-4" style={{ background: "var(--ec-input-bg)" }}>
              <div className="flex items-start gap-3 mb-2">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-fuchsia-500 to-cyan-400 flex items-center justify-center shrink-0 text-white" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "12px" }}>
                  {i + 1}
                </div>
                <div>
                  <div className="ec-text" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "14px" }}>{item.title}</div>
                  <p className="ec-text-muted mt-1" style={{ fontFamily: "Rajdhani", fontSize: "14px", lineHeight: 1.6 }}>{item.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="ec-text mt-8 mb-3" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "20px" }}>Cobb Can Move Controls</h3>
        <div className="overflow-hidden rounded-xl border ec-hairline" style={{ background: "var(--ec-input-bg)" }}>
          <table className="w-full border-collapse">
            <tbody>
              {[
                ["Move", "WASD or Arrow Keys"],
                ["Interact / Pick Up / Drop", "E or Spacebar"],
                ["Best Device", "Desktop or laptop browser"],
                ["Input Support", "Keyboard and gamepad"],
              ].map(([label, value], idx) => (
                <tr key={label} className={idx !== 3 ? "border-b ec-hairline" : ""}>
                  <th className="text-left px-4 py-3 ec-text" style={{ fontFamily: "JetBrains Mono", fontSize: "11px", fontWeight: 700, width: "42%" }}>{label}</th>
                  <td className="px-4 py-3 ec-text-muted" style={{ fontFamily: "Rajdhani", fontSize: "14px" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="ec-text mt-8 mb-3" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "20px" }}>Understand Cobb's Rules</h3>
        <p className="ec-text-muted max-w-4xl" style={{ fontFamily: "Rajdhani", fontSize: "15px", lineHeight: 1.7 }}>
          The most important part of learning how to play Cobb Can Move is understanding the active rule. When Cobb can hear, move carefully and avoid unnecessary steps. When Cobb can see, break line of sight with walls and corners. When Cobb can smell, stop using the same route again and again. When Cobb can reach, keep extra distance. When Cobb can duplicate, slow down and avoid dead ends.
        </p>
      </article>

      {/* Tips */}
      <article className={cardClass} style={{ boxShadow: "var(--ec-shadow-card)" }}>
        <SectionHeader kicker="STRATEGY" title="Tips & Tricks to Survive Cobb Can Move" icon={Lightbulb} />
        <p className="ec-text-muted max-w-3xl mb-6" style={{ fontFamily: "Rajdhani", fontSize: "15px", lineHeight: 1.7 }}>
          Cobb Can Move is not a game you can beat by rushing. The key is to understand the current rule, manage your resources, and stay calm when Cobb starts hunting. Each level changes the way danger works, so the best strategy is to adapt before Cobb catches you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tips.map((t, i) => (
            <section key={t.title} className="p-5 rounded-xl border ec-hairline hover:ec-border-brand transition-colors" style={{ background: "var(--ec-input-bg)" }}>
              <div className="flex items-start gap-3 mb-2">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-fuchsia-500 to-cyan-400 flex items-center justify-center shrink-0 text-white" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "12px" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="ec-text" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "15px" }}>{t.title}</h3>
              </div>
              <p className="ec-text-muted ml-10" style={{ fontFamily: "Rajdhani", fontSize: "14px", lineHeight: 1.6 }}>
                {t.body}
              </p>
            </section>
          ))}
        </div>
        <p className="ec-text-muted max-w-4xl mt-6" style={{ fontFamily: "Rajdhani", fontSize: "15px", lineHeight: 1.7 }}>
          The best way to win Cobb Can Move is to stay flexible. The game is built around changing rules, so no single strategy works forever. Learn the map, protect your light, manage coal carefully, and change your plan every time Cobb gains a new ability.
        </p>
      </article>

      {/* FAQ */}
      <article className={cardClass} style={{ boxShadow: "var(--ec-shadow-card)" }}>
        <SectionHeader kicker="FAQ" title="Frequently Asked Questions" icon={HelpCircle} />
        <div className="flex flex-col gap-2 max-w-4xl">
          {content.faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={f.q} className="rounded-xl border ec-hairline overflow-hidden" style={{ background: "var(--ec-input-bg)" }}>
                <button
                  onClick={() => {
                    const nextOpen = isOpen ? null : i;
                    setOpenFaq(nextOpen);
                    if (nextOpen !== null) {
                      trackEvent("faq_expand", { question: f.q, index: i + 1, section: "cobb_can_move_faq" });
                    }
                  }}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left ec-hover-surface transition-colors cursor-pointer"
                >
                  <h3 className="ec-text" style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "16px" }}>{f.q}</h3>
                  <ChevronDown className={`w-5 h-5 ec-text-faint shrink-0 transition-transform ${isOpen ? "rotate-180 text-fuchsia-500" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 -mt-1">
                    <p className="ec-text-muted" style={{ fontFamily: "Rajdhani", fontSize: "15px", lineHeight: 1.7 }}>{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </article>

      {/* Reviews */}
      <article className={cardClass} style={{ boxShadow: "var(--ec-shadow-card)" }}>
        <SectionHeader kicker="REVIEWS" title="What Players Are Saying" icon={MessageSquare} />
        <div className="flex items-center gap-6 mb-6 p-5 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
          <div>
            <div className="text-yellow-500 mb-1" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "44px" }}>4.7</div>
            <div className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>OUT OF 5</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="ec-text-muted" style={{ fontFamily: "Rajdhani", fontSize: "14px" }}>
              Based on <strong className="ec-text">142</strong> public ratings from the official page. These player impressions focus on the game's rule system, horror pacing, and short-run tension.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.map((r) => (
            <section key={r.name} className="p-5 rounded-xl border ec-hairline" style={{ background: "var(--ec-input-bg)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-400 flex items-center justify-center text-white" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "13px" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="ec-text" style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "14px" }}>{r.name}</div>
                    <div className="ec-text-faint" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{r.date}</div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "ec-text-dim"}`} />
                  ))}
                </div>
              </div>
              <p className="ec-text-muted" style={{ fontFamily: "Rajdhani", fontSize: "14px", lineHeight: 1.6 }}>{r.body}</p>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}

"use client";
import { useState } from "react";
import { Keyboard, Lightbulb, HelpCircle, MessageSquare, ChevronDown, Star } from "lucide-react";
import { useContent } from "./content-store";
import { trackEvent } from "../lib/analytics";

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
  const { content, game } = useContent();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const cardClass = "rounded-2xl border ec-border ec-surface backdrop-blur p-8";

  return (
    <div className="flex flex-col gap-12">
      <article id="about-section" className={cardClass} style={{ boxShadow: "var(--ec-shadow-card)", scrollMarginTop: "96px" }}>
        <SectionHeader kicker="OVERVIEW" title={`About ${content.title}`} icon={Lightbulb} />
        <div className="flex flex-col gap-4 ec-text-muted max-w-4xl" style={{ fontFamily: "Rajdhani", fontSize: "16px", lineHeight: 1.7 }}>
          {content.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <article id="how-to-play-section" className={cardClass} style={{ boxShadow: "var(--ec-shadow-card)", scrollMarginTop: "96px" }}>
        <SectionHeader kicker="GAME GUIDE" title={game.guideTitle} icon={Keyboard} />
        <p className="ec-text-muted max-w-3xl mb-6" style={{ fontFamily: "Rajdhani", fontSize: "15px", lineHeight: 1.7 }}>
          {game.guideIntro}
        </p>

        <h3 className="ec-text mb-3" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "20px" }}>{game.objectiveTitle}</h3>
        <p className="ec-text-muted max-w-4xl mb-6" style={{ fontFamily: "Rajdhani", fontSize: "15px", lineHeight: 1.7 }}>
          {game.objectiveBody}
        </p>

        <h3 className="ec-text mb-3" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "20px" }}>Step-by-Step Guide</h3>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
          {game.guideSteps.map((item, i) => (
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

        <h3 className="ec-text mt-8 mb-3" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "20px" }}>{game.controlsHeading}</h3>
        <div className="overflow-hidden rounded-xl border ec-hairline" style={{ background: "var(--ec-input-bg)" }}>
          <table className="w-full border-collapse">
            <tbody>
              {game.controlsTable.map(({ label, value }, idx) => (
                <tr key={label} className={idx !== game.controlsTable.length - 1 ? "border-b ec-hairline" : ""}>
                  <th className="text-left px-4 py-3 ec-text" style={{ fontFamily: "JetBrains Mono", fontSize: "11px", fontWeight: 700, width: "42%" }}>{label}</th>
                  <td className="px-4 py-3 ec-text-muted" style={{ fontFamily: "Rajdhani", fontSize: "14px" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="ec-text mt-8 mb-3" style={{ fontFamily: "Orbitron", fontWeight: 800, fontSize: "20px" }}>{game.ruleHeading}</h3>
        <p className="ec-text-muted max-w-4xl" style={{ fontFamily: "Rajdhani", fontSize: "15px", lineHeight: 1.7 }}>
          {game.ruleBody}
        </p>
      </article>

      <article className={cardClass} style={{ boxShadow: "var(--ec-shadow-card)" }}>
        <SectionHeader kicker="STRATEGY" title={game.tipsHeading} icon={Lightbulb} />
        <p className="ec-text-muted max-w-3xl mb-6" style={{ fontFamily: "Rajdhani", fontSize: "15px", lineHeight: 1.7 }}>
          {game.tipsIntro}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {game.tips.map((t, i) => (
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
          {game.tipsOutro}
        </p>
      </article>

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
                      trackEvent("faq_expand", { question: f.q, index: i + 1, section: `${game.slug}_faq`, game: game.slug });
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

      <article className={cardClass} style={{ boxShadow: "var(--ec-shadow-card)" }}>
        <SectionHeader kicker="REVIEWS" title={game.reviewsHeading} icon={MessageSquare} />
        <div className="flex items-center gap-6 mb-6 p-5 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
          <div>
            <div className="text-yellow-500 mb-1" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "44px" }}>{content.rating}</div>
            <div className="ec-text-faint tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>OUT OF 5</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(parseFloat(content.rating) || 0) ? "fill-yellow-400 text-yellow-400" : "ec-text-dim"}`} />
              ))}
            </div>
            <p className="ec-text-muted" style={{ fontFamily: "Rajdhani", fontSize: "14px" }}>
              {game.reviewsSummary}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {game.reviews.map((r) => (
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

"use client";
import { useState } from "react";
import Link from "next/link";
import { Keyboard, Lightbulb, HelpCircle, MessageSquare, ChevronDown, Star, BookOpen, Package, Flag, MessageCircle, Zap, Users, Trophy, Monitor } from "lucide-react";
import { useContent } from "./content-store";
import { trackEvent } from "../lib/analytics";

function SectionHeader({ kicker, title, icon: Icon }: { kicker: string; title: string; icon: any }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-accent" />
        <span className="text-accent tracking-[0.3em] font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// {kicker}</span>
      </div>
      <h2 className="text-foreground tracking-tight" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "36px" }}>
        {title}
      </h2>
    </div>
  );
}

export function SeoContent() {
  const { content, game } = useContent();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const cardClass = "rounded-2xl border border-amber-700/20 bg-card p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)]";
  const guideCardClass = "rounded-2xl border border-amber-700/20 bg-secondary/50 p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)]";

  return (
    <div className="flex flex-col gap-12">
      {game.slug === "dont-sleep-with-the-fishes" && (
        <div className="rounded-2xl border border-amber-700/20 bg-card p-6 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
          <h3 className="font-['Fredoka'] text-lg font-black mb-4">Explore {game.shortTitle} Guides</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {[
              { label: "Guide", href: `${game.canonicalPath}guide/`, icon: BookOpen },
              { label: "Walkthrough", href: `${game.canonicalPath}walkthrough/`, icon: Zap },
              { label: "Items", href: `${game.canonicalPath}items/`, icon: Package },
              { label: "Events", href: `${game.canonicalPath}events/`, icon: Zap },
              { label: "Characters", href: `${game.canonicalPath}characters/`, icon: Users },
              { label: "Endings", href: `${game.canonicalPath}endings/`, icon: Flag },
              { label: "Tips", href: `${game.canonicalPath}tips-tricks/`, icon: Lightbulb },
              { label: "Achievements", href: `${game.canonicalPath}achievements/`, icon: Trophy },
              { label: "Steam", href: `${game.canonicalPath}steam/`, icon: Monitor },
              { label: "FAQ", href: `${game.canonicalPath}faq/`, icon: MessageCircle },
            ].map(({ label, href, icon: Icon }, i) => (
              <Link key={label} href={href} className={`group rounded-xl border-2 border-border p-3 text-center transition hover:-translate-y-0.5 hover:border-foreground hover:shadow-[2px_2px_0_#24312c] ${i % 2 === 0 ? "bg-input-background" : "bg-secondary/30"}`}>
                <Icon className="w-4 h-4 mx-auto mb-1.5 text-primary group-hover:text-accent transition-colors" />
                <p className="font-['Fredoka'] text-xs font-black text-foreground">{label}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <article id="about-section" className={cardClass} style={{ scrollMarginTop: "96px" }}>
        <SectionHeader kicker="OVERVIEW" title={`About ${content.title}`} icon={Lightbulb} />
        <div className="flex flex-col gap-4 text-muted-foreground max-w-3xl font-bold" style={{ fontSize: "16px", lineHeight: 1.7 }}>
          {content.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <article id="how-to-play-section" className={guideCardClass} style={{ scrollMarginTop: "96px" }}>
        <SectionHeader kicker="GAME GUIDE" title={game.guideTitle} icon={Keyboard} />
        <p className="text-muted-foreground max-w-3xl mb-6 font-bold" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          {game.guideIntro}
        </p>

        <h3 className="text-foreground mb-3" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "20px" }}>{game.objectiveTitle}</h3>
        <p className="text-muted-foreground max-w-3xl mb-6 font-bold" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          {game.objectiveBody}
        </p>

        <h3 className="text-foreground mb-3" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "20px" }}>Step-by-Step Guide</h3>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
          {game.guideSteps.map((item, i) => (
            <li key={item.title} className="rounded-xl border-2 border-border p-4 bg-input-background">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0 text-primary-foreground font-black" style={{ fontFamily: "Nunito", fontSize: "12px" }}>
                  {i + 1}
                </div>
                <div>
                  <div className="text-foreground" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "14px" }}>{item.title}</div>
                  <p className="text-muted-foreground mt-1 font-bold" style={{ fontSize: "14px", lineHeight: 1.6 }}>{item.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="text-foreground mt-8 mb-3" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "20px" }}>{game.controlsHeading}</h3>
        <div className="overflow-hidden rounded-xl border-2 border-border bg-input-background">
          <table className="w-full border-collapse">
            <tbody>
              {game.controlsTable.map(({ label, value }, idx) => (
                <tr key={label} className={idx !== game.controlsTable.length - 1 ? "border-b-2 border-border" : ""}>
                  <th className="text-left px-4 py-3 text-foreground font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "11px", width: "42%" }}>{label}</th>
                  <td className="px-4 py-3 text-muted-foreground font-bold" style={{ fontSize: "14px" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-foreground mt-8 mb-3" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "20px" }}>{game.ruleHeading}</h3>
        <p className="text-muted-foreground max-w-3xl font-bold" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          {game.ruleBody}
        </p>
      </article>

      <article className={cardClass}>
        <SectionHeader kicker="STRATEGY" title={game.tipsHeading} icon={Lightbulb} />
        <p className="text-muted-foreground max-w-3xl mb-6 font-bold" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          {game.tipsIntro}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {game.tips.map((t, i) => (
            <section key={t.title} className="p-5 rounded-xl border-2 border-border hover:border-foreground transition-colors bg-input-background">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0 text-primary-foreground font-black" style={{ fontFamily: "Nunito", fontSize: "12px" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-foreground" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "15px" }}>{t.title}</h3>
              </div>
              <p className="text-muted-foreground ml-10 font-bold" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                {t.body}
              </p>
            </section>
          ))}
        </div>
        <p className="text-muted-foreground max-w-3xl mt-6 font-bold" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          {game.tipsOutro}
        </p>
      </article>

      <article className={cardClass}>
        <SectionHeader kicker="FAQ" title="Frequently Asked Questions" icon={HelpCircle} />
        <div className="flex flex-col gap-2 max-w-3xl">
          {content.faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={f.q} className="rounded-xl border-2 border-border overflow-hidden bg-input-background">
                <button
                  onClick={() => {
                    const nextOpen = isOpen ? null : i;
                    setOpenFaq(nextOpen);
                    if (nextOpen !== null) {
                      trackEvent("faq_expand", { question: f.q, index: i + 1, section: `${game.slug}_faq`, game: game.slug });
                    }
                  }}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-secondary transition-colors cursor-pointer"
                >
                  <h3 className="text-foreground font-bold" style={{ fontSize: "16px" }}>{f.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180 text-accent" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 -mt-1 transition-all duration-300 ease-out">
                    <p className="text-muted-foreground font-bold" style={{ fontSize: "15px", lineHeight: 1.7 }}>{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </article>

      <article className={cardClass}>
        <SectionHeader kicker="REVIEWS" title={game.reviewsHeading} icon={MessageSquare} />
        <div className="flex items-center gap-6 mb-6 p-5 rounded-xl border-2 border-yellow-500/40 bg-yellow-500/10 max-w-3xl">
          <div>
            <div className="text-yellow-600 mb-1" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "44px" }}>{content.rating}</div>
            <div className="text-muted-foreground tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>OUT OF 5</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(parseFloat(content.rating) || 0) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
              ))}
            </div>
            <p className="text-muted-foreground font-bold" style={{ fontSize: "14px" }}>
              {game.reviewsSummary}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {game.reviews.map((r) => (
            <section key={r.name} className="p-5 rounded-xl border-2 border-border bg-input-background">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-extrabold" style={{ fontFamily: "Nunito", fontSize: "13px" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-foreground font-bold" style={{ fontSize: "14px" }}>{r.name}</div>
                    <div className="text-muted-foreground" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{r.date}</div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground font-bold" style={{ fontSize: "14px", lineHeight: 1.6 }}>{r.body}</p>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Save, RotateCcw, Plus, Trash2, Gamepad2, Search, FileText, HelpCircle, Eye, Check } from "lucide-react";
import { useContent, SiteContent } from "./content-store";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center justify-between">
        <span className="text-white/80 tracking-widest" style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "12px" }}>{label.toUpperCase()}</span>
        {hint && <span className="text-white/30" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{hint}</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls = "w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-fuchsia-500/50 transition-colors";
const inputStyle = { fontFamily: "Rajdhani", fontSize: "14px" } as const;

export function ContentEditor() {
  const { content, setContent, reset } = useContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [tab, setTab] = useState<"game" | "seo" | "about" | "faq">("game");
  const [saved, setSaved] = useState(false);

  const dirty = JSON.stringify(draft) !== JSON.stringify(content);
  const update = <K extends keyof SiteContent>(k: K, v: SiteContent[K]) => setDraft({ ...draft, [k]: v });

  const save = () => {
    setContent(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };
  const handleReset = () => {
    if (confirm("Reset all content to defaults? This clears your saved edits.")) {
      reset();
      setTimeout(() => setDraft(JSON.parse(localStorage.getItem("nexus-site-content-v1") || "null") || content), 0);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-fuchsia-400" />
            <span className="text-fuchsia-400 tracking-[0.3em]" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// CONTENT EDITOR</span>
          </div>
          <h1 className="text-white tracking-tight" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "44px" }}>
            EDIT THE <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">HOMEPAGE</span>
          </h1>
          <p className="text-white/50 mt-2" style={{ fontFamily: "Rajdhani", fontSize: "14px" }}>
            Changes are saved to local storage and reflected on the live site instantly.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleReset} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 600, fontSize: "11px" }}>
            <RotateCcw className="w-3.5 h-3.5" />
            RESET
          </button>
          <button
            onClick={save}
            disabled={!dirty}
            className={`px-5 py-2.5 rounded-xl text-white flex items-center gap-2 tracking-widest transition-all ${
              saved ? "bg-emerald-500" :
              dirty ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(217,70,239,0.4)]" :
              "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
            style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}
          >
            {saved ? <><Check className="w-4 h-4" /> SAVED</> : <><Save className="w-4 h-4" /> SAVE CHANGES</>}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {([
          { id: "game", label: "GAME", icon: Gamepad2 },
          { id: "seo", label: "SEO META", icon: Search },
          { id: "about", label: "ABOUT", icon: FileText },
          { id: "faq", label: "FAQ", icon: HelpCircle },
        ] as const).map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 flex items-center gap-2 tracking-widest border-b-2 transition-colors ${isActive ? "text-white border-fuchsia-500" : "text-white/40 border-transparent hover:text-white/70"}`}
              style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "11px" }}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* GAME TAB */}
      {tab === "game" && (
        <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white/10 bg-[#0f0020]/60 p-6">
          <Field label="Title" hint="H1 + Hero">
            <input className={inputCls} style={inputStyle} value={draft.title} onChange={(e) => update("title", e.target.value)} />
          </Field>
          <Field label="Genre / Tag">
            <input className={inputCls} style={inputStyle} value={draft.genre} onChange={(e) => update("genre", e.target.value)} />
          </Field>
          <Field label="Hero Subtitle / Tagline" hint="under 200 chars">
            <textarea className={inputCls + " min-h-[100px]"} style={inputStyle} value={draft.subtitle} onChange={(e) => update("subtitle", e.target.value)} />
          </Field>
          <Field label="Short Description" hint="for cards / og:description">
            <textarea className={inputCls + " min-h-[100px]"} style={inputStyle} value={draft.description} onChange={(e) => update("description", e.target.value)} />
          </Field>
          <Field label="Cover Image URL" hint="hero background">
            <input className={inputCls} style={inputStyle} value={draft.coverImg} onChange={(e) => update("coverImg", e.target.value)} />
          </Field>
          <Field label="Game iframe URL" hint="actual game embed">
            <input className={inputCls} style={inputStyle} value={draft.iframeUrl} onChange={(e) => update("iframeUrl", e.target.value)} />
          </Field>
          <Field label="Rating">
            <input className={inputCls} style={inputStyle} value={draft.rating} onChange={(e) => update("rating", e.target.value)} />
          </Field>
          <Field label="Avg. Session (minutes)">
            <input className={inputCls} style={inputStyle} value={draft.avgSession} onChange={(e) => update("avgSession", e.target.value)} />
          </Field>
        </div>
      )}

      {/* SEO TAB */}
      {tab === "seo" && (
        <div className="rounded-2xl border border-white/10 bg-[#0f0020]/60 p-6 flex flex-col gap-5">
          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 flex items-start gap-3">
            <Eye className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-white mb-1" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "13px" }}>SERP Preview</div>
              <div className="text-blue-300 truncate" style={{ fontFamily: "Rajdhani", fontSize: "16px", fontWeight: 600 }}>{draft.seoTitle}</div>
              <div className="text-emerald-400 text-sm" style={{ fontFamily: "Rajdhani" }}>https://yoursite.com</div>
              <div className="text-white/60 mt-1" style={{ fontFamily: "Rajdhani", fontSize: "13px" }}>{draft.seoDescription}</div>
            </div>
          </div>
          <Field label="Page Title" hint={`${draft.seoTitle.length} chars · keep under 60`}>
            <input className={inputCls} style={inputStyle} value={draft.seoTitle} onChange={(e) => update("seoTitle", e.target.value)} />
          </Field>
          <Field label="Meta Description" hint={`${draft.seoDescription.length} chars · keep 140–160`}>
            <textarea className={inputCls + " min-h-[80px]"} style={inputStyle} value={draft.seoDescription} onChange={(e) => update("seoDescription", e.target.value)} />
          </Field>
          <Field label="Keywords" hint="comma-separated">
            <textarea className={inputCls + " min-h-[60px]"} style={inputStyle} value={draft.seoKeywords} onChange={(e) => update("seoKeywords", e.target.value)} />
          </Field>
        </div>
      )}

      {/* ABOUT TAB */}
      {tab === "about" && (
        <div className="rounded-2xl border border-white/10 bg-[#0f0020]/60 p-6 flex flex-col gap-4">
          <div className="text-white/50" style={{ fontFamily: "Rajdhani", fontSize: "13px" }}>
            Each paragraph appears in the "About this Game" SEO section. Aim for keyword density without keyword stuffing.
          </div>
          {draft.about.map((para, i) => (
            <Field key={i} label={`Paragraph ${i + 1}`} hint={`${para.split(/\s+/).filter(Boolean).length} words`}>
              <textarea
                className={inputCls + " min-h-[140px]"}
                style={inputStyle}
                value={para}
                onChange={(e) => {
                  const next = [...draft.about];
                  next[i] = e.target.value;
                  update("about", next);
                }}
              />
              <button
                onClick={() => update("about", draft.about.filter((_, idx) => idx !== i))}
                className="self-start text-rose-400/70 hover:text-rose-400 flex items-center gap-1 mt-1"
                style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}
              >
                <Trash2 className="w-3 h-3" /> REMOVE
              </button>
            </Field>
          ))}
          <button
            onClick={() => update("about", [...draft.about, ""])}
            className="self-start px-4 py-2.5 rounded-lg border border-dashed border-white/20 text-white/60 hover:text-white hover:border-white/40 flex items-center gap-2 tracking-widest"
            style={{ fontFamily: "Orbitron", fontWeight: 600, fontSize: "11px" }}
          >
            <Plus className="w-4 h-4" /> ADD PARAGRAPH
          </button>
        </div>
      )}

      {/* FAQ TAB */}
      {tab === "faq" && (
        <div className="rounded-2xl border border-white/10 bg-[#0f0020]/60 p-6 flex flex-col gap-4">
          <div className="text-white/50" style={{ fontFamily: "Rajdhani", fontSize: "13px" }}>
            Each Q&A drives one accordion entry on the homepage and is also emitted as Schema.org FAQPage structured data when wired.
          </div>
          {draft.faqs.map((f, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-white/40 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>FAQ #{String(i + 1).padStart(2, "0")}</span>
                <button
                  onClick={() => update("faqs", draft.faqs.filter((_, idx) => idx !== i))}
                  className="text-rose-400/70 hover:text-rose-400 flex items-center gap-1"
                  style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}
                >
                  <Trash2 className="w-3 h-3" /> REMOVE
                </button>
              </div>
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="Question"
                value={f.q}
                onChange={(e) => {
                  const next = [...draft.faqs];
                  next[i] = { ...next[i], q: e.target.value };
                  update("faqs", next);
                }}
              />
              <textarea
                className={inputCls + " min-h-[80px]"}
                style={inputStyle}
                placeholder="Answer"
                value={f.a}
                onChange={(e) => {
                  const next = [...draft.faqs];
                  next[i] = { ...next[i], a: e.target.value };
                  update("faqs", next);
                }}
              />
            </div>
          ))}
          <button
            onClick={() => update("faqs", [...draft.faqs, { q: "", a: "" }])}
            className="self-start px-4 py-2.5 rounded-lg border border-dashed border-white/20 text-white/60 hover:text-white hover:border-white/40 flex items-center gap-2 tracking-widest"
            style={{ fontFamily: "Orbitron", fontWeight: 600, fontSize: "11px" }}
          >
            <Plus className="w-4 h-4" /> ADD FAQ
          </button>
        </div>
      )}
    </div>
  );
}

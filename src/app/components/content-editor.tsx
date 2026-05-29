"use client";

import { useState } from "react";
import { Save, RotateCcw, Plus, Trash2, Gamepad2, Search, FileText, HelpCircle, Eye, Check } from "lucide-react";
import { useContent, SiteContent } from "./content-store";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center justify-between">
        <span className="text-slate-200 text-sm font-medium">{label}</span>
        {hint && <span className="text-slate-500 text-xs">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls = "w-full px-3.5 py-2.5 rounded-lg bg-slate-950/60 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm";

const panelCls = "rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 shadow-xl shadow-slate-950/30";

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
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400 uppercase tracking-wider text-xs font-semibold">Content Editor</span>
          </div>
          <h1 className="text-white text-3xl font-bold">
            Edit the <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Homepage</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Changes are saved to local storage and reflected on the live site instantly.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={save}
            disabled={!dirty}
            className={`px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all font-semibold text-sm ${
              saved
                ? "bg-emerald-500 text-slate-950"
                : dirty
                ? "bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/30"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            {saved ? (<><Check className="w-4 h-4" /> Saved</>) : (<><Save className="w-4 h-4" /> Save Changes</>)}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 -mb-2 overflow-x-auto">
        {([
          { id: "game", label: "Game", icon: Gamepad2 },
          { id: "seo", label: "SEO Meta", icon: Search },
          { id: "about", label: "About", icon: FileText },
          { id: "faq", label: "FAQ", icon: HelpCircle },
        ] as const).map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 flex items-center gap-2 border-b-2 transition-colors text-sm font-medium whitespace-nowrap ${
                isActive ? "text-indigo-300 border-indigo-400" : "text-slate-500 border-transparent hover:text-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "game" && (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${panelCls}`}>
          <Field label="Title" hint="H1 + Hero">
            <input className={inputCls} value={draft.title} onChange={(e) => update("title", e.target.value)} />
          </Field>
          <Field label="Genre / Tag">
            <input className={inputCls} value={draft.genre} onChange={(e) => update("genre", e.target.value)} />
          </Field>
          <Field label="Hero Subtitle / Tagline" hint="under 200 chars">
            <textarea className={inputCls + " min-h-[100px]"} value={draft.subtitle} onChange={(e) => update("subtitle", e.target.value)} />
          </Field>
          <Field label="Short Description" hint="for cards / og:description">
            <textarea className={inputCls + " min-h-[100px]"} value={draft.description} onChange={(e) => update("description", e.target.value)} />
          </Field>
          <Field label="Cover Image URL" hint="hero background">
            <input className={inputCls} value={draft.coverImg} onChange={(e) => update("coverImg", e.target.value)} />
          </Field>
          <Field label="Game iframe URL" hint="actual game embed">
            <input className={inputCls} value={draft.iframeUrl} onChange={(e) => update("iframeUrl", e.target.value)} />
          </Field>
          <Field label="Rating">
            <input className={inputCls} value={draft.rating} onChange={(e) => update("rating", e.target.value)} />
          </Field>
          <Field label="Avg. Session (minutes)">
            <input className={inputCls} value={draft.avgSession} onChange={(e) => update("avgSession", e.target.value)} />
          </Field>
        </div>
      )}

      {tab === "seo" && (
        <div className={`${panelCls} flex flex-col gap-5`}>
          <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
            <Eye className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm mb-2">SERP Preview</div>
              <div className="text-blue-300 truncate font-medium">{draft.seoTitle}</div>
              <div className="text-emerald-400 text-sm">https://yoursite.com</div>
              <div className="text-slate-300 mt-1 text-sm">{draft.seoDescription}</div>
            </div>
          </div>
          <Field label="Page Title" hint={`${draft.seoTitle.length} chars · keep under 60`}>
            <input className={inputCls} value={draft.seoTitle} onChange={(e) => update("seoTitle", e.target.value)} />
          </Field>
          <Field label="Meta Description" hint={`${draft.seoDescription.length} chars · keep 140–160`}>
            <textarea className={inputCls + " min-h-[80px]"} value={draft.seoDescription} onChange={(e) => update("seoDescription", e.target.value)} />
          </Field>
          <Field label="Keywords" hint="comma-separated">
            <textarea className={inputCls + " min-h-[60px]"} value={draft.seoKeywords} onChange={(e) => update("seoKeywords", e.target.value)} />
          </Field>
        </div>
      )}

      {tab === "about" && (
        <div className={`${panelCls} flex flex-col gap-4`}>
          <div className="text-slate-400 text-sm">
            Each paragraph appears in the "About this Game" SEO section. Aim for keyword density without keyword stuffing.
          </div>
          {draft.about.map((para, i) => (
            <Field key={i} label={`Paragraph ${i + 1}`} hint={`${para.split(/\s+/).filter(Boolean).length} words`}>
              <textarea
                className={inputCls + " min-h-[140px]"}
                value={para}
                onChange={(e) => {
                  const next = [...draft.about];
                  next[i] = e.target.value;
                  update("about", next);
                }}
              />
              <button
                onClick={() => update("about", draft.about.filter((_, idx) => idx !== i))}
                className="self-start text-rose-400 hover:text-rose-300 flex items-center gap-1 text-xs mt-1"
              >
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            </Field>
          ))}
          <button
            onClick={() => update("about", [...draft.about, ""])}
            className="self-start px-4 py-2.5 rounded-lg border border-dashed border-slate-700 text-slate-400 hover:text-indigo-300 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add Paragraph
          </button>
        </div>
      )}

      {tab === "faq" && (
        <div className={`${panelCls} flex flex-col gap-4`}>
          <div className="text-slate-400 text-sm">
            Each Q&A drives one accordion entry on the homepage and is also emitted as Schema.org FAQPage structured data when wired.
          </div>
          {draft.faqs.map((f, i) => (
            <div key={i} className="rounded-lg border border-slate-800 bg-slate-950/50 p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-indigo-400 text-xs font-medium uppercase tracking-wider">FAQ #{String(i + 1).padStart(2, "0")}</span>
                <button
                  onClick={() => update("faqs", draft.faqs.filter((_, idx) => idx !== i))}
                  className="text-rose-400 hover:text-rose-300 flex items-center gap-1 text-xs"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
              <input
                className={inputCls}
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
            className="self-start px-4 py-2.5 rounded-lg border border-dashed border-slate-700 text-slate-400 hover:text-indigo-300 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add FAQ
          </button>
        </div>
      )}
    </div>
  );
}

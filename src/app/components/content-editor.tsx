"use client";
import { useEffect, useState } from "react";
import { Save, RotateCcw, Plus, Trash2, Gamepad2, Search, FileText, HelpCircle, Eye, Check, Bell, ArrowUp, ArrowDown, Download, Copy } from "lucide-react";
import { useContent, SiteContent, NotificationItem } from "./content-store";
import { serializeContentModule } from "../data/content-serializer";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center justify-between">
        <span className="text-foreground tracking-widest font-bold" style={{ fontSize: "12px" }}>{label}</span>
        {hint && <span className="text-white/30" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{hint}</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls = "w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-fuchsia-500/50 transition-colors";
const inputStyle = { fontFamily: "Nunito", fontSize: "14px" } as const;

export function ContentEditor() {
  const { content, setContent, reset } = useContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [tab, setTab] = useState<"game" | "seo" | "about" | "faq" | "notifications">("game");
  const [saved, setSaved] = useState(false);
  const [exported, setExported] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedToFile, setSavedToFile] = useState(false);
  const [saveFileError, setSaveFileError] = useState("");

  useEffect(() => {
    setDraft(content);
  }, [content]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(content);
  const update = <K extends keyof SiteContent>(k: K, v: SiteContent[K]) => setDraft({ ...draft, [k]: v });

  const save = () => {
    setContent(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const exportSource = serializeContentModule("../data/cobb-can-move-content", "DEFAULT_CONTENT", draft);

  const downloadSource = () => {
    const blob = new Blob([exportSource], { type: "text/typescript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cobb-can-move-content.ts";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 1800);
  };

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(exportSource);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const saveToCodeFile = async () => {
    setSaveFileError("");
    try {
      const res = await fetch("http://127.0.0.1:41751/__save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: draft }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Save failed");
      setSavedToFile(true);
      setTimeout(() => setSavedToFile(false), 1800);
    } catch (err) {
      setSaveFileError(String(err));
    }
  };
  const handleReset = () => {
    if (confirm("确定要将所有内容恢复为默认值吗?这将清除你已保存的修改。")) {
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
            <span className="text-fuchsia-400 tracking-[0.3em]" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// 内容编辑器</span>
          </div>
          <h1 className="text-white tracking-tight" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "44px" }}>
            编辑<span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">首页内容</span>
          </h1>
          <p className="text-white/50 mt-2" style={{ fontFamily: "Nunito", fontSize: "14px" }}>
            所有修改会先保存到浏览器本地存储并实时应用。若要真正写进代码仓库，请使用下方的“导出代码文件”或“复制代码”操作覆盖 <code className="text-fuchsia-300 px-1.5 py-0.5 rounded bg-white/5">src/app/data/cobb-can-move-content.ts</code>。
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleReset} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 tracking-widest" style={{ fontFamily: "Fredoka", fontWeight: 600, fontSize: "11px" }}>
            <RotateCcw className="w-3.5 h-3.5" />
            重置
          </button>
          <button onClick={copySource} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 tracking-widest" style={{ fontFamily: "Fredoka", fontWeight: 600, fontSize: "11px" }}>
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "已复制" : "复制代码"}
          </button>
          <button onClick={downloadSource} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 tracking-widest" style={{ fontFamily: "Fredoka", fontWeight: 600, fontSize: "11px" }}>
            {exported ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            {exported ? "已导出" : "导出代码文件"}
          </button>
          <button onClick={saveToCodeFile} className="px-4 py-2.5 rounded-xl bg-white/5 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-colors flex items-center gap-2 tracking-widest" style={{ fontFamily: "Fredoka", fontWeight: 600, fontSize: "11px" }}>
            {savedToFile ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {savedToFile ? "已写入代码" : "保存到代码文件"}
          </button>
          <button
            onClick={save}
            disabled={!dirty}
            className={`px-5 py-2.5 rounded-xl text-white flex items-center gap-2 tracking-widest transition-all ${
              saved ? "bg-emerald-500" :
              dirty ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(217,70,239,0.4)]" :
              "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
            style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: "12px" }}
          >
            {saved ? <><Check className="w-4 h-4" /> 已保存草稿</> : <><Save className="w-4 h-4" /> 保存草稿</>}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 flex items-start gap-3">
        <FileText className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-white/70" style={{ fontFamily: "Nunito", fontSize: "14px", lineHeight: 1.65 }}>
          <div className="text-white mb-1" style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: "13px" }}>如何真正保存到代码里</div>
          本地编辑完成后，推荐先点 <strong className="text-white">保存到代码文件</strong>。这会调用本地开发保存服务并直接覆盖
          <code className="text-fuchsia-300 px-1.5 py-0.5 rounded bg-white/5 mx-1">src/app/data/cobb-can-move-content.ts</code>
          。如果保存服务没有启动，也可以使用 <strong className="text-white">导出代码文件</strong> 或 <strong className="text-white">复制代码</strong> 手动覆盖该文件。
          {saveFileError && (
            <div className="mt-2 text-rose-300" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>
              保存到代码文件失败：{saveFileError}
              <br />
              请先在另一个终端运行 <code className="px-1 py-0.5 rounded bg-white/5">npm run dev:content-save</code>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {([
          { id: "game", label: "游戏", icon: Gamepad2 },
          { id: "seo", label: "SEO", icon: Search },
          { id: "about", label: "关于", icon: FileText },
          { id: "faq", label: "常见问题", icon: HelpCircle },
          { id: "notifications", label: "通知", icon: Bell },
        ] as const).map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 flex items-center gap-2 tracking-widest border-b-2 transition-colors ${isActive ? "text-white border-fuchsia-500" : "text-white/40 border-transparent hover:text-white/70"}`}
              style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: "11px" }}
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
          <Field label="游戏标题" hint="H1 + Hero">
            <input className={inputCls} style={inputStyle} value={draft.title} onChange={(e) => update("title", e.target.value)} />
          </Field>
          <Field label="类型 / 标签">
            <input className={inputCls} style={inputStyle} value={draft.genre} onChange={(e) => update("genre", e.target.value)} />
          </Field>
          <Field label="Hero 副标题 / 宣传语" hint="200 字以内">
            <textarea className={inputCls + " min-h-[100px]"} style={inputStyle} value={draft.subtitle} onChange={(e) => update("subtitle", e.target.value)} />
          </Field>
          <Field label="简短描述" hint="用于卡片 / og:description">
            <textarea className={inputCls + " min-h-[100px]"} style={inputStyle} value={draft.description} onChange={(e) => update("description", e.target.value)} />
          </Field>
          <Field label="封面图片地址" hint="Hero 背景图">
            <input className={inputCls} style={inputStyle} value={draft.coverImg} onChange={(e) => update("coverImg", e.target.value)} />
            {draft.coverImg && (
              <img
                src={draft.coverImg}
                alt="封面预览"
                className="mt-2 w-full h-32 object-cover rounded-lg border border-white/10"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            )}
          </Field>
          <Field label="游戏 iframe 地址" hint="实际嵌入的游戏页面">
            <input className={inputCls} style={inputStyle} value={draft.iframeUrl} onChange={(e) => update("iframeUrl", e.target.value)} />
          </Field>
          <Field label="预告片嵌入地址" hint="YouTube embed 链接">
            <input className={inputCls} style={inputStyle} value={draft.trailerUrl} onChange={(e) => update("trailerUrl", e.target.value)} />
          </Field>
          <Field label="评分">
            <input className={inputCls} style={inputStyle} value={draft.rating} onChange={(e) => update("rating", e.target.value)} />
          </Field>
          <Field label="平均时长(分钟)">
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
              <div className="text-white mb-1" style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: "13px" }}>搜索结果预览</div>
              <div className="text-blue-300 truncate" style={{ fontFamily: "Nunito", fontSize: "16px", fontWeight: 600 }}>{draft.seoTitle}</div>
              <div className="text-emerald-400 text-sm" style={{ fontFamily: "Nunito" }}>https://yoursite.com</div>
              <div className="text-white/60 mt-1" style={{ fontFamily: "Nunito", fontSize: "13px" }}>{draft.seoDescription}</div>
            </div>
          </div>
          <Field label="页面标题" hint={`${draft.seoTitle.length} 字符 · 建议 60 以内`}>
            <input className={inputCls} style={inputStyle} value={draft.seoTitle} onChange={(e) => update("seoTitle", e.target.value)} />
          </Field>
          <Field label="Meta 描述" hint={`${draft.seoDescription.length} 字符 · 建议 140-160`}>
            <textarea className={inputCls + " min-h-[80px]"} style={inputStyle} value={draft.seoDescription} onChange={(e) => update("seoDescription", e.target.value)} />
          </Field>
          <Field label="关键词" hint="使用英文逗号分隔">
            <textarea className={inputCls + " min-h-[60px]"} style={inputStyle} value={draft.seoKeywords} onChange={(e) => update("seoKeywords", e.target.value)} />
          </Field>
        </div>
      )}

      {/* ABOUT TAB */}
      {tab === "about" && (
        <div className="rounded-2xl border border-white/10 bg-[#0f0020]/60 p-6 flex flex-col gap-4">
          <div className="text-white/50" style={{ fontFamily: "Nunito", fontSize: "13px" }}>
            每个段落会显示在「关于本游戏」SEO 区块中。注意关键词密度,避免堆砌。
          </div>
          {draft.about.map((para, i) => (
            <Field key={i} label={`段落 ${i + 1}`} hint={`${para.split(/\s+/).filter(Boolean).length} 词`}>
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
                <Trash2 className="w-3 h-3" /> 删除
              </button>
            </Field>
          ))}
          <button
            onClick={() => update("about", [...draft.about, ""])}
            className="self-start px-4 py-2.5 rounded-lg border border-dashed border-white/20 text-white/60 hover:text-white hover:border-white/40 flex items-center gap-2 tracking-widest"
            style={{ fontFamily: "Fredoka", fontWeight: 600, fontSize: "11px" }}
          >
            <Plus className="w-4 h-4" /> 添加段落
          </button>
        </div>
      )}

      {/* FAQ TAB */}
      {tab === "faq" && (
        <div className="rounded-2xl border border-white/10 bg-[#0f0020]/60 p-6 flex flex-col gap-4">
          <div className="text-white/50" style={{ fontFamily: "Nunito", fontSize: "13px" }}>
            每条问答会作为首页折叠面板中的一项显示,同时输出为 Schema.org FAQPage 结构化数据。
          </div>
          {draft.faqs.map((f, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-white/40 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>问答 #{String(i + 1).padStart(2, "0")}</span>
                <button
                  onClick={() => update("faqs", draft.faqs.filter((_, idx) => idx !== i))}
                  className="text-rose-400/70 hover:text-rose-400 flex items-center gap-1"
                  style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}
                >
                  <Trash2 className="w-3 h-3" /> 删除
                </button>
              </div>
              <input
                className={inputCls}
                style={inputStyle}
                placeholder="问题"
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
                placeholder="答案"
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
            style={{ fontFamily: "Fredoka", fontWeight: 600, fontSize: "11px" }}
          >
            <Plus className="w-4 h-4" /> 添加问答
          </button>
        </div>
      )}

      {/* NOTIFICATIONS TAB */}
      {tab === "notifications" && (
        <div className="rounded-2xl border border-white/10 bg-[#0f0020]/60 p-6 flex flex-col gap-4">
          <div className="text-white/50" style={{ fontFamily: "Nunito", fontSize: "13px" }}>
            这些内容会显示在首页右上角的铃铛弹窗中。用户每打开一次铃铛会自动标记为已读,徽章数随之归零;无需管理员手动清理。删除条目即从列表中移除。
          </div>
          {draft.notifications.map((n, i) => {
            const updateAt = (patch: Partial<NotificationItem>) => {
              const next = [...draft.notifications];
              next[i] = { ...next[i], ...patch };
              update("notifications", next);
            };
            const move = (dir: -1 | 1) => {
              const j = i + dir;
              if (j < 0 || j >= draft.notifications.length) return;
              const next = [...draft.notifications];
              [next[i], next[j]] = [next[j], next[i]];
              update("notifications", next);
            };
            return (
              <div key={n.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>通知 #{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => move(-1)} disabled={i === 0} className="text-white/40 hover:text-white disabled:opacity-30" title="上移"><ArrowUp className="w-3.5 h-3.5" /></button>
                    <button onClick={() => move(1)} disabled={i === draft.notifications.length - 1} className="text-white/40 hover:text-white disabled:opacity-30" title="下移"><ArrowDown className="w-3.5 h-3.5" /></button>
                    <button
                      onClick={() => update("notifications", draft.notifications.filter((_, idx) => idx !== i))}
                      className="text-rose-400/70 hover:text-rose-400 flex items-center gap-1"
                      style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}
                    >
                      <Trash2 className="w-3 h-3" /> 删除
                    </button>
                  </div>
                </div>
                <input
                  className={inputCls}
                  style={inputStyle}
                  placeholder="标题(例:第 4 赛季 // 霓虹回响)"
                  value={n.title}
                  onChange={(e) => updateAt({ title: e.target.value })}
                />
                <textarea
                  className={inputCls + " min-h-[70px]"}
                  style={inputStyle}
                  placeholder="正文 — 一两句话"
                  value={n.body}
                  onChange={(e) => updateAt({ body: e.target.value })}
                />
                <div className="grid grid-cols-3 gap-3">
                  <Field label="标签" hint="简短大写英文">
                    <input className={inputCls} style={inputStyle} placeholder="RELEASE" value={n.tag} onChange={(e) => updateAt({ tag: e.target.value })} />
                  </Field>
                  <Field label="主题色">
                    <select
                      className={inputCls}
                      style={inputStyle}
                      value={n.tone}
                      onChange={(e) => updateAt({ tone: e.target.value as NotificationItem["tone"] })}
                    >
                      <option value="fuchsia">品红</option>
                      <option value="cyan">青色</option>
                      <option value="emerald">翡翠</option>
                      <option value="amber">琥珀</option>
                      <option value="rose">玫红</option>
                    </select>
                  </Field>
                  <Field label="时间标签" hint="例:2 分钟前 / 1h">
                    <input className={inputCls} style={inputStyle} placeholder="2m" value={n.time} onChange={(e) => updateAt({ time: e.target.value })} />
                  </Field>
                </div>
              </div>
            );
          })}
          <button
            onClick={() =>
              update("notifications", [
                ...draft.notifications,
                { id: `n_${Date.now()}`, title: "", body: "", tag: "INFO", tone: "fuchsia", time: "now" },
              ])
            }
            className="self-start px-4 py-2.5 rounded-lg border border-dashed border-white/20 text-white/60 hover:text-white hover:border-white/40 flex items-center gap-2 tracking-widest"
            style={{ fontFamily: "Fredoka", fontWeight: 600, fontSize: "11px" }}
          >
            <Plus className="w-4 h-4" /> 添加通知
          </button>
        </div>
      )}
    </div>
  );
}

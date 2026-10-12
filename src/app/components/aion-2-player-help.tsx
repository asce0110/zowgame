"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Copy, Search, X } from "lucide-react";
import { AION_2_COMPENSATION_REWARDS, AION_2_COMPENSATION_SERVERS, AION_2_HELP_CHECKED, AION_2_HELP_GROUPS, AION_2_HELP_GUIDES, AION_2_REQUIREMENTS, AION_2_SUPPORT, AION_2_SUPPORT_CHECKLIST, AION_2_TRANSFER_HOURS, findAionHelp, type AionHelpGroup } from "../data/aion-2-player-help";

export function AionPlayerHelp() {
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<AionHelpGroup>("all");
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const [copyState, setCopyState] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const search = useRef<HTMLInputElement>(null);
  const visible = findAionHelp(query, group);

  useEffect(() => {
    setReady(true);
    let frame: number | undefined;
    function reveal(id: string) {
      if (!AION_2_HELP_GUIDES.some((guide) => `help-${guide.id}` === id)) return;
      setQuery("");
      setGroup("all");
      setOpened((previous) => ({ ...previous, [id.slice(5)]: true }));
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(id);
        target?.scrollIntoView({ block: "start" });
        target?.querySelector("summary")?.focus({ preventScroll: true });
      });
    }
    const fromHash = () => reveal(window.location.hash.slice(1));
    const fromClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#help-"]') : null;
      if (anchor) reveal(anchor.hash.slice(1));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", fromClick);
    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", fromClick);
    };
  }, []);

  function reset() {
    setQuery(""); setGroup("all"); search.current?.focus({ preventScroll: true });
  }
  async function copyChecklist() {
    setCopyState("copying");
    try {
      await navigator.clipboard.writeText(AION_2_SUPPORT_CHECKLIST);
      setCopyState("copied");
    } catch { setCopyState("error"); }
  }

  return <section className="a2-help" id="player-help" aria-labelledby="a2-help-title">
    <div className="a2-section-heading"><div><p className="ed-eyebrow">05 / THE PLAYER HELP DESK</p><h2 id="a2-help-title">A problem. A next step.</h2></div><p className="a2-checked">Sources checked <time dateTime={AION_2_HELP_CHECKED}>12 OCT 2026</time></p></div>
    <p className="a2-help-intro">Find the symptom, read the checks here, and keep the details that support will need. Official facts are dated; the order of checks is ZowGame’s guidance.</p>
    <div className="a2-help-grid">
      <div className="a2-help-tools">
        <div className="a2-help-search"><Search size={18} aria-hidden="true" /><label className="zg-sr-only" htmlFor="aion-help-search">Search AION 2 player help</label><input id="aion-help-search" ref={search} type="search" disabled={!ready} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ready ? "Try: login, missing character…" : "Preparing help search…"} />{query && <button type="button" aria-label="Clear help search" onClick={() => { setQuery(""); search.current?.focus({ preventScroll: true }); }}><X size={18} aria-hidden="true" /></button>}</div>
        <div className="a2-help-filters" role="group" aria-label="Player help topic">{AION_2_HELP_GROUPS.map((item) => <button type="button" key={item.id} disabled={!ready} aria-pressed={group === item.id} onClick={() => setGroup(item.id)}>{item.label}<span aria-hidden="true">{item.id === "all" ? AION_2_HELP_GUIDES.length : AION_2_HELP_GUIDES.filter((guide) => guide.group === item.id).length}</span></button>)}</div>
        <p className="a2-help-count" role="status">{visible.length} {visible.length === 1 ? "guide" : "guides"}{query ? ` matching “${query}”` : " ready to read"}</p>
        <p className="a2-help-scope">A Steam count measures players, not server health. Account decisions and recovery belong to NC’s support team.</p>
      </div>
      <div className="a2-help-answers">
        {visible.map((guide) => <details id={`help-${guide.id}`} key={guide.id} open={!!opened[guide.id]} onToggle={(event) => { const isOpen = event.currentTarget.open; setOpened((previous) => !!previous[guide.id] === isOpen ? previous : { ...previous, [guide.id]: isOpen }); }}>
          <summary><span className="a2-help-number">{String(AION_2_HELP_GUIDES.findIndex((item) => item.id === guide.id) + 1).padStart(2, "0")}</span><span>{guide.title}</span><ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="a2-help-answer"><p className="a2-help-direct">{guide.answer}</p><h3>Work through these checks</h3><ol>{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            {guide.id === "startup" && <div className="a2-help-table-wrap"><table className="a2-help-table a2-requirements-table"><caption>Official PC requirements · checked October 12, 2026</caption><thead><tr><th scope="col">Part</th><th scope="col">Minimum</th><th scope="col">Recommended</th></tr></thead><tbody>{AION_2_REQUIREMENTS.map((row) => <tr key={row.part}><th scope="row">{row.part}</th><td>{row.minimum}</td><td>{row.recommended}</td></tr>)}</tbody></table><div className="a2-requirements-mobile"><p className="a2-mobile-caption">Official PC requirements · checked October 12, 2026</p><dl>{AION_2_REQUIREMENTS.map((row) => <div key={row.part}><dt>{row.part}</dt><dd><span>Minimum</span>{row.minimum}</dd><dd><span>Recommended</span>{row.recommended}</dd></div>)}</dl></div><p className="a2-caption">NC recommends an SSD. Its FHD guidance uses Very Low for minimum hardware and Low for the recommended configuration.</p></div>}
            {guide.id === "transfer" && <div className="a2-help-table-wrap"><table className="a2-help-table"><caption>Published daily application hours · PDT (UTC−7)</caption><thead><tr><th scope="col">Region</th><th scope="col">Application windows</th></tr></thead><tbody>{AION_2_TRANSFER_HOURS.map((row) => <tr key={row.region}><th scope="row">{row.region}</th><td>{row.hours}</td></tr>)}</tbody></table><p className="a2-caption">These hours apply within the relevant transfer week. The official notice mixes CEST/CET labels across Europe’s October clock change, so this table retains PDT rather than inventing a conversion.</p></div>}
            {guide.id === "compensation" && <><dl className="a2-help-server-list">{Object.entries(AION_2_COMPENSATION_SERVERS).map(([faction, servers]) => <div key={faction}><dt>EU / {faction}</dt><dd>{servers}</dd></div>)}</dl><div className="a2-help-table-wrap"><table className="a2-help-table"><caption>Announced supply-chest contents · all items Bound</caption><thead><tr><th scope="col">Quantity</th><th scope="col">Item</th></tr></thead><tbody>{AION_2_COMPENSATION_REWARDS.map((reward) => <tr key={reward.item}><th scope="row">{reward.amount}</th><td>{reward.item}</td></tr>)}</tbody></table></div></>}
            <p className="a2-help-boundary">{guide.boundary}</p><div className="a2-help-sources">{guide.sources.map((source) => <a className="a2-source-link" href={source.url} key={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}<a className="a2-source-link" href={AION_2_SUPPORT} target="_blank" rel="noopener noreferrer">Contact AION 2 Global support<ArrowUpRight size={14} aria-hidden="true" /></a></div>
          </div>
        </details>)}
        {!visible.length && <div className="a2-help-empty"><h3>No guide matches this search.</h3><p>Try “login”, “character”, “transfer” or “Block Code”. For an unlisted error, use the support checklist below.</p><button type="button" className="a2-button a2-button-secondary" onClick={reset}>Show all player help</button></div>}
      </div>
    </div>
    <aside className="a2-support-kit" aria-labelledby="a2-support-kit-title"><div><p className="ed-eyebrow">STILL STUCK / MAKE THE REPORT USEFUL</p><h3 id="a2-support-kit-title">Give support the missing context.</h3><p>Copy this blank checklist and fill it in when you contact NC. This page sends no report. Keep passwords and recovery codes out of your message.</p><div className="a2-support-actions"><button className="a2-button a2-button-secondary" type="button" onClick={copyChecklist} disabled={!ready || copyState === "copying"}>{copyState === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}{copyState === "copying" ? "Copying…" : copyState === "copied" ? "Copy checklist again" : "Copy support checklist"}</button><a href={AION_2_SUPPORT} className="a2-source-link" target="_blank" rel="noopener noreferrer">Open official support<ArrowUpRight size={16} aria-hidden="true" /></a></div><p className={`a2-copy-status${copyState === "error" ? " a2-copy-error" : ""}`} role={copyState === "error" ? "alert" : "status"}>{copyState === "error" ? "Copy was blocked. Select the checklist text and copy it manually." : copyState === "copied" ? "Blank checklist copied. Complete it in your own support inquiry." : "The checklist is also available as selectable text."}</p></div><pre>{AION_2_SUPPORT_CHECKLIST}</pre></aside>
    <noscript><p className="a2-noscript">Search needs JavaScript. All eight guides remain readable through their question headings.</p></noscript>
  </section>;
}

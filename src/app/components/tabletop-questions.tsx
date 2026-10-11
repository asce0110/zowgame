"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";

type Question = { q: string; a: string; category?: string; links?: Array<{ label: string; url: string }> };
const groups = ["All questions", "Rules", "Buying & support", "About the game"];
const ignoredWords = new Set(["how", "what", "why", "when", "where", "is", "are", "the", "a", "an", "do", "does", "can", "i", "my", "to", "of", "it", "get", "please"]);
const searchForms: Record<string, string> = {
  win: "win", wins: "win", winning: "win", victory: "win",
  card: "card", cards: "card", pawn: "pawn", pawns: "pawn", shield: "shield", shields: "shield",
  token: "token", tokens: "token", scroll: "scroll", scrolls: "scroll", book: "book", books: "book",
  move: "movement", moves: "movement", moving: "movement", movement: "movement",
  replenish: "replenish", replenishing: "replenish", replenishes: "replenish",
  ship: "shipping", ships: "shipping", shipping: "shipping", delivery: "shipping", dispatched: "shipping",
  setup: "setup", setting: "setup",
  buy: "buy", purchase: "buy", purchasing: "buy",
  piece: "component", pieces: "component", component: "component", components: "component",
  refunds: "refund", returns: "return", cost: "price", costs: "price",
  player: "player", players: "player",
  one: "1", first: "1", two: "2", second: "2", three: "3", four: "4", five: "5", fifth: "5",
};
function searchWords(text: string) {
  return text.toLowerCase().replace(/\bset\s+up\b/g, "setup").split(/[^\p{L}\p{N}]+/u).filter((word) => word && !ignoredWords.has(word)).map((word) => searchForms[word] || word);
}

export function TabletopQuestions({ faqs, supportUrl }: { faqs: Question[]; supportUrl: string }) {
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All questions");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => setReady(true), []);
  const tokens = searchWords(query);
  const visible = faqs.filter((faq) => {
    const words = new Set(searchWords(`${faq.q} ${faq.a}`));
    return (group === "All questions" || faq.category === group) && tokens.every((word) => words.has(word));
  });
  function reset() { setQuery(""); setGroup("All questions"); input.current?.focus({ preventScroll: true }); }

  return <div className="tt-questions">
    <div className="tt-question-search">
      <Search size={19} aria-hidden="true" />
      <label className="zg-sr-only" htmlFor="tabletop-question-search">Search game questions</label>
      <input ref={input} id="tabletop-question-search" type="search" disabled={!ready} placeholder={ready ? "Search: shields, movement, shipping…" : "Loading question search…"} value={query} onChange={(event) => setQuery(event.target.value)} />
      {query && <button type="button" aria-label="Clear question search" onClick={() => { setQuery(""); input.current?.focus({ preventScroll: true }); }}><X size={19} aria-hidden="true" /></button>}
    </div>
    <div className="tt-question-filters" role="group" aria-label="Question topic">{groups.map((item) => <button key={item} disabled={!ready} aria-pressed={group === item} onClick={() => setGroup(item)}>{item}</button>)}</div>
    <p className="tt-question-count" role="status">{visible.length} {visible.length === 1 ? "answer" : "answers"}{query ? ` matching “${query}”` : " ready to read"}</p>
    <div className="tt-faq-list">{visible.map((faq) => <details key={faq.q}><summary><span>{faq.q}</span><span className="tt-faq-symbol" aria-hidden="true" /></summary><p>{faq.a}</p>{faq.links && <div className="tt-section-sources tt-faq-links">{faq.links.map((link) => <a key={link.url} className="tt-source" href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div>}</details>)}</div>
    {!visible.length && <div className="tt-question-empty"><h3>No answer matches that search.</h3><p>Try one term such as “shield”, “token” or “shipping”, or show every question.</p><button className="tt-button" onClick={reset}>Show all questions</button><a className="tt-source" href={supportUrl} target="_blank" rel="noopener noreferrer">Ask MinaLima about an unresolved issue</a></div>}
  </div>;
}

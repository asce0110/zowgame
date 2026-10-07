"use client";
import Link from "next/link";
import { Home, BookOpen, Info, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useContent } from "./content-store";

export type ViewId = "home" | "how-to-play" | "about";
export type SidebarView = ViewId;
export function Sidebar({ active, onChange }: { active: SidebarView; onChange: (view: SidebarView) => void }) {
  const { game } = useContent();
  const items = [{ id: "home" as const, label: "Game overview", icon: Home }, { id: "how-to-play" as const, label: "How to play", icon: BookOpen }, { id: "about" as const, label: "About the game", icon: Info }];
  return <aside className="zg-sidebar"><p className="zg-eyebrow">PLAYER'S INDEX</p><h2 className="zg-sidebar-title">{game.shortTitle}</h2><nav aria-label="Game page navigation">{items.map(({ id, label, icon: Icon }) => <button key={id} aria-current={active === id ? "page" : undefined} onClick={() => onChange(id)}><Icon size={17} aria-hidden="true" />{label}</button>)}<Link href={`${game.canonicalPath}${game.slug === "all-the-gold-in-fort-locks" ? "walkthrough" : "guide"}/`}><BookOpen size={17} aria-hidden="true" />{game.slug === "all-the-gold-in-fort-locks" ? "Walkthrough" : "Beginner guide"}<ArrowUpRight size={13} aria-hidden="true" /></Link></nav><div className="zg-sidebar-footer"><p className="zg-eyebrow">BROWSER GAME</p><p>Launch on this page, then explore the controls and player guide below.</p><Link href="/#library"><ArrowLeft size={16} aria-hidden="true" />Back to game library</Link></div></aside>;
}

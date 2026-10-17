import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import "../../styles/site-ui.css";

export type SiteHeaderActive = "home" | "games" | "guides" | "updates";
type SiteHeaderProps = {
  gameTitle?: string;
  officialUrl?: string;
  editorial?: boolean;
  search?: ReactNode;
  locale?: "en" | "zh-CN";
  active?: SiteHeaderActive;
  hardNavigation?: boolean;
};

export function SiteSearch({ query = "", action = "/guides/", locale = "en" }: {
  query?: string;
  action?: "/games/" | "/guides/";
  locale?: "en" | "zh-CN";
}) {
  const zh = locale === "zh-CN";
  const label = zh ? "搜索游戏或问题" : "Search a game or a question";
  return <form className="ls-header-search" action={action} method="get" role="search" aria-label={zh ? "搜索 ZowGame" : "Search ZowGame"}>
    <Search aria-hidden="true" size={18} strokeWidth={1.8} />
    <label className="zg-sr-only" htmlFor="ls-global-search">{label}</label>
    <input id="ls-global-search" type="search" name="q" defaultValue={query} placeholder={label} maxLength={180} enterKeyHint="search" />
    <button type="submit" aria-label={zh ? "搜索" : action === "/games/" ? "Search games" : "Search guides"}><ArrowRight aria-hidden="true" size={20} /></button>
  </form>;
}

export function SiteHeader({ gameTitle, officialUrl, editorial, search, locale = "en", active, hardNavigation = false }: SiteHeaderProps) {
  const NavLink = hardNavigation ? "a" : Link;
  const zh = locale === "zh-CN";
  const links = [
    { id: "games", href: "/games/", label: zh ? "游戏" : "Games" },
    { id: "guides", href: "/guides/", label: zh ? "攻略" : "Guides" },
    { id: "updates", href: "/updates/", label: zh ? "更新" : "Updates" },
  ] as const;
  return <header className="zg-site-header atlas-site-header ls-header" data-editorial={editorial || undefined}>
    <div className="ls-header-inner">
      <NavLink href="/" className="atlas-wordmark ls-wordmark" aria-label={zh ? "ZowGame 首页" : "ZowGame home"} aria-current={active === "home" ? "page" : undefined}><span className="atlas-brand-name">ZOWGAME</span></NavLink>
      <nav className="ls-primary-nav" aria-label={zh ? "网站导航" : "Site navigation"}>{links.map((link) => <NavLink key={link.id} href={link.href} className={active === "home" && link.id === "games" ? "is-active" : undefined} aria-current={active === link.id ? "page" : undefined}>{link.label}</NavLink>)}</nav>
      <div className="ls-header-search-slot">{search ?? <SiteSearch locale={locale} />}</div>
    </div>
    {(gameTitle || officialUrl) && <div className="ls-game-context">
      {gameTitle && <span className="zg-current-game atlas-current-game">{gameTitle}</span>}
      {officialUrl && <a className="ls-official-link" href={officialUrl} target="_blank" rel="noopener noreferrer">{zh ? "官方游戏" : "Official game"}<ArrowUpRight size={14} aria-hidden="true" /></a>}
    </div>}
  </header>;
}

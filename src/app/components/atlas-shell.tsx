import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ATLAS_GENRES, type AtlasGenreId } from "../data/atlas";
import { SiteHeader, SiteSearch } from "./site-header";
import { AtlasConnection } from "./atlas-status";

const routes = [
  { label: "Getting started", href: "/guides/?type=getting-started" },
  { label: "Game rules", href: "/guides/?type=rules" },
  { label: "Strategies", href: "/guides/?type=strategy" },
  { label: "Troubleshooting", href: "/guides/?type=troubleshooting" },
];

export function AtlasSearch({ query = "", action = "/guides/" }: { query?: string; action?: "/games/" | "/guides/" }) {
  return <SiteSearch query={query} action={action} />;
}

export function AtlasFooter({ hardNavigation = false }: { hardNavigation?: boolean } = {}) {
  const NavLink = hardNavigation ? "a" : Link;
  return <footer className="atlas-footer ls-footer"><div className="ls-footer-inner">
    <p>Independent guides. Original games belong to their creators.</p>
    <nav aria-label="Footer navigation"><NavLink href="/games/">Games</NavLink><NavLink href="/guides/">Guides</NavLink><NavLink href="/updates/">Sources & updates</NavLink><NavLink href="/privacy/">Privacy</NavLink></nav>
    <small>© {new Date().getUTCFullYear()} ZowGame</small>
  </div></footer>;
}

export function AtlasShell({ children, active = "home", genre = "all", query = "", searchAction = "/guides/", genrePath, showRoute = true, hardNavigation = false, fullBleed = false }: {
  children: ReactNode; active?: "home" | "games" | "guides" | "updates"; genre?: AtlasGenreId; query?: string;
  searchAction?: "/games/" | "/guides/"; genrePath?: "/" | "/games/" | "/guides/"; showRoute?: boolean; hardNavigation?: boolean; fullBleed?: boolean;
}) {
  const NavLink = hardNavigation ? "a" : Link;
  const categoryPath = genrePath || (active === "guides" ? "/guides/" : "/games/");
  const isHome = active === "home";
  return <div className={`atlas-site ls-shell ${isHome ? "ls-shell-home" : "ls-shell-directory"}${fullBleed ? " ls-shell-full-bleed" : ""}`}>
    <a className="atlas-skip ls-skip" href="#atlas-main">Skip to content</a>
    <SiteHeader editorial active={active} hardNavigation={hardNavigation} search={<AtlasSearch query={query} action={searchAction} />} />
    <AtlasConnection />
    {!isHome && active !== "updates" && <div className="ls-directory-bar"><nav className="ls-genres" aria-label="Game genres">{ATLAS_GENRES.map(({ id, label }) => <NavLink key={id} href={id === "all" ? categoryPath : `${categoryPath}?genre=${id}`} aria-current={genre === id ? "true" : undefined}>{label}</NavLink>)}</nav><span className="ls-directory-label">SELECT YOUR NEXT GAME.</span></div>}
    <main id="atlas-main" className="atlas-main ls-main" tabIndex={-1}>{children}</main>
    {showRoute && !isHome && <nav className="ls-guide-shortcuts" aria-label="Find a guide by question"><span>What’s your next move?</span>{routes.map(({ label, href }) => <NavLink key={href} href={href}>{label}<ArrowRight size={14} aria-hidden="true" /></NavLink>)}</nav>}
    <AtlasFooter hardNavigation={hardNavigation} />
  </div>;
}

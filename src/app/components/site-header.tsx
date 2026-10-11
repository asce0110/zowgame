import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import "../../styles/site-ui.css";

export function SiteHeader({ gameTitle, officialUrl, editorial, search }: { gameTitle?: string; officialUrl?: string; editorial?: boolean; search?: ReactNode }) {
  return <header className={`zg-site-header${editorial ? " ed-site-header" : ""}`}><Link href="/" className="zg-wordmark" aria-label="ZowGame home">ZOW<span>GAME</span><small>{editorial ? "Games worth your time." : "PLAY / EXPLORE / GET UNSTUCK"}</small></Link><nav aria-label="Site navigation">{editorial && <Link href="/" aria-current="page">Discover</Link>}<Link href="/#library">Game library</Link><Link href="/#guides">Player guides</Link>{officialUrl && <a href={officialUrl} target="_blank" rel="noopener noreferrer">Official game<ArrowUpRight size={14} aria-hidden="true" /></a>}</nav>{search}{gameTitle && <span className="zg-current-game">{gameTitle}</span>}</header>;
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "../../styles/site-ui.css";

export function SiteHeader({ gameTitle, officialUrl }: { gameTitle?: string; officialUrl?: string }) {
  return <header className="zg-site-header"><Link href="/" className="zg-wordmark" aria-label="ZowGame home">ZOW<span>GAME</span><small>PLAY / EXPLORE / GET UNSTUCK</small></Link><nav aria-label="Site navigation"><Link href="/#library">Game library</Link><Link href="/#guides">Player guides</Link>{officialUrl && <a href={officialUrl} target="_blank" rel="noopener noreferrer">Official game<ArrowUpRight size={14} aria-hidden="true" /></a>}</nav>{gameTitle && <span className="zg-current-game">{gameTitle}</span>}</header>;
}

import Link from "next/link";
import { AtlasShell } from "../../src/app/components/atlas-shell";
import { ATLAS_GUIDES, ATLAS_UPDATE_CHANNELS } from "../../src/app/data/atlas";
import { GuideList } from "../../src/app/components/atlas-cards";
import { breadcrumbSchema, createPageMetadata, itemListSchema, safeJsonLd } from "../../src/app/lib/seo";

export const metadata = createPageMetadata({ title: "Game Updates: Official News & Reviewed Patch History", description: "Find Hood Warfare 2 announcements, Don't Sleep With The Fishes patch history and AION 2 official news, with source and review dates kept separate.", path: "/updates/" });
export default function UpdatesPage() {
  const schema = [breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Game updates", path: "/updates/" }]), itemListSchema({ name: "Game update sources and guides", path: "/updates/", items: ATLAS_UPDATE_CHANNELS.map((channel) => ({ name: channel.title, path: channel.href, description: channel.description })) })];
  return <AtlasShell active="updates" genre="all" query="" searchAction="/guides/">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />
    <header className="atlas-section-heading"><div><p className="atlas-eyebrow">THE GAME ATLAS / UPDATE INDEX</p><h1>Read the game updates.</h1></div><p>Patch notes, new modes, buying changes and release checks across the library. Each entry separates a source-review date from an actual release date.</p></header>
    <section className="atlas-update-index" aria-labelledby="atlas-update-sources"><h2 id="atlas-update-sources">Follow the source.</h2><p className="atlas-note">This is a dated review index for all six games and the AION 2 data topic. “No newer release found” describes the public sources checked, not a promise that no unannounced change exists. Automatic feeds display their own retrieval times.</p><div className="atlas-update-list">{ATLAS_UPDATE_CHANNELS.map((channel) => <article className="atlas-update-channel" key={channel.id}><p className="atlas-eyebrow">EDITORIAL SOURCES CHECKED <time dateTime={channel.checkedAt}>{channel.checkedAt}</time></p><h3><Link href={channel.href}>{channel.title}</Link></h3><p><strong>{channel.status}</strong></p><p>{channel.description}</p><div className="atlas-update-links"><Link className="atlas-text-link" href={channel.href}>Read the reviewed page</Link><a className="atlas-text-link" href={channel.sourceHref} target="_blank" rel="noopener noreferrer">{channel.sourceLabel}</a></div></article>)}</div></section>
    <section className="atlas-update-guides" aria-labelledby="atlas-update-reading"><div className="atlas-section-heading"><div><p className="atlas-eyebrow">KEEP READING</p><h2 id="atlas-update-reading">Patch notes in the library.</h2></div><Link className="atlas-text-link" href="/guides/?type=updates">Browse update guides</Link></div><GuideList guides={ATLAS_GUIDES.filter((guide) => guide.type === "updates")} /></section>
  </AtlasShell>;
}

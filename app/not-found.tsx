import type { Metadata } from "next";
import { AtlasShell } from "../src/app/components/atlas-shell";

export const metadata: Metadata = {
  title: { absolute: "404 — Page not found | ZowGame" },
  description: "Find your way back to ZowGame's game library and independent player guides.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <AtlasShell active="games" showRoute={false} hardNavigation>
    <section className="atlas-empty" aria-labelledby="atlas-not-found-heading">
      <header className="atlas-section-heading"><div>
        <p className="atlas-eyebrow">404 / UNCHARTED PAGE</p>
        <h1 id="atlas-not-found-heading">This page isn’t in the atlas.</h1>
      </div></header>
      <p>This link may have changed. Find a game or a guide to get back on course.</p>
      <div className="atlas-update-links">
        <a className="atlas-button" href="/games/">Explore the game library</a>
        <a className="atlas-text-link" href="/guides/">Find a player guide</a>
      </div>
    </section>
  </AtlasShell>;
}

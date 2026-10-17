"use client";
import { RefreshCw } from "lucide-react";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="atlas-failure"><a className="atlas-footer-brand" href="/">ZOWGAME</a><p className="atlas-eyebrow">THE ATLAS / PAGE INTERRUPTED</p><h1>We couldn’t open this page.</h1><p>Try loading it again. You can also browse the game library or search the player guides.</p><div className="atlas-failure-actions"><button className="atlas-button" onClick={reset}><RefreshCw size={17} aria-hidden="true" />Try again</button><a className="atlas-text-link" href="/games/">Game library</a><a className="atlas-text-link" href="/guides/">Find a guide</a></div></main>;
}

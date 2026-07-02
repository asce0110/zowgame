import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | ZowGame",
  description: "ZowGame privacy policy — how we handle data, cookies, and third-party services.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16 max-w-3xl mx-auto" style={{ fontFamily: "Nunito, sans-serif" }}>
      <Link href="/" className="text-accent font-extrabold text-sm mb-8 inline-block">← Back to ZowGame</Link>
      <h1 className="font-['Fredoka'] text-4xl font-black mb-8">Privacy Policy</h1>

      <section className="space-y-6 text-muted-foreground leading-relaxed">
        <p>ZowGame is a game discovery and aggregation website. We do not host game files, collect personal information, or require user accounts.</p>

        <h2 className="font-['Fredoka'] text-xl font-black text-foreground mt-8">Analytics</h2>
        <p>We use Google Analytics to understand how visitors find and use the site. Google Analytics uses cookies and may collect anonymized data including pages visited, time on site, and referral sources. You can opt out via the Google Analytics Opt-out Browser Add-on.</p>

        <h2 className="font-['Fredoka'] text-xl font-black text-foreground mt-8">Third-Party Links</h2>
        <p>Game pages may link to external platforms such as itch.io. We are not responsible for the privacy practices or content of these external sites.</p>

        <h2 className="font-['Fredoka'] text-xl font-black text-foreground mt-8">Embedded Game Content</h2>
        <p>Some games are played via iframe from their original hosting servers. These embedded games may set their own cookies or collect gameplay data according to their own policies.</p>

        <h2 className="font-['Fredoka'] text-xl font-black text-foreground mt-8">Contact</h2>
        <p>For privacy inquiries, reach out via the official ZowGame GitHub repository or contact channels listed on the homepage.</p>
      </section>
    </main>
  );
}

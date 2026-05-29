import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Gaming Website - Play Free Online Games",
    template: "%s | Gaming Website",
  },
  description:
    "Play free online games in your browser. No downloads, no signup — instant play. Discover the latest action, puzzle, and arcade titles.",
  keywords: ["online games", "free games", "browser games", "HTML5 games", "play online"],
  openGraph: {
    type: "website",
    siteName: "Gaming Website",
    locale: "en_US",
    title: "Gaming Website - Play Free Online Games",
    description:
      "Play free online games in your browser. No downloads, no signup — instant play.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}

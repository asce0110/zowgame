import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../src/styles/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zowgame.com"),
  title: {
    default: "ZowGame - Indie Games & Player Guides",
    template: "%s | ZowGame",
  },
  description:
    "Discover independent games, play browser titles, and get unstuck with player guides and walkthroughs.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "ZowGame",
    locale: "en_US",
    images: ["/og-image.png"],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#111716",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground m-0 min-h-screen">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CKQ5TM1XTP"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CKQ5TM1XTP');`}
        </Script>
        {children}
      </body>
    </html>
  );
}

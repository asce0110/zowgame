import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { getPageTd } from "../src/app/data/page-seo";
import "../src/styles/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zowgame.com"),
  title: {
    default: getPageTd("/")!.title,
    template: "%s | ZowGame",
  },
  description: getPageTd("/")!.description,
  icons: {
    icon: [
      { url: "/level-select/favicon.svg", type: "image/svg+xml" },
      { url: "/level-select/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/level-select/icon-16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/level-select/icon-32.png",
    apple: "/level-select/icon-180.png",
  },
  manifest: "/level-select/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "ZowGame",
    locale: "en_US",
    images: [{ url: "/atlas/social-card.jpg", width: 1200, height: 630, alt: "ZowGame — game guides and walkthroughs" }],
  },
  twitter: { card: "summary_large_image", images: ["/atlas/social-card.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><link rel="preload" href="/fonts/barlow-condensed-900-italic-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/fonts/barlow-condensed-800-normal-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head>
      <body className="atlas-theme m-0 min-h-screen">
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

import type { Metadata } from "next";
import { getPageTd } from "../data/page-seo";

export const SITE_URL = "https://zowgame.com";

/** Canonicals belong to this site; callers explicitly choose any pagination query. */
export function canonicalUrl(path: string): string {
  const url = new URL(path, SITE_URL);
  if (url.origin !== SITE_URL) throw new Error("A canonical URL must belong to ZowGame.");
  url.hash = "";
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  return url.href;
}

/** Keep JSON valid while preventing a string value from closing its script tag. */
export function safeJsonLd(value: unknown): string {
  return (JSON.stringify(value) ?? "null")
    .replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

type PageMetadataOptions = { title: string; description: string; path: string; image?: string; noindex?: boolean };

export function createPageMetadata({ title, description, path, image = "/atlas/social-card.jpg", noindex = false }: PageMetadataOptions): Metadata {
  const editorial = noindex ? undefined : getPageTd(path);
  const pageTitle = editorial?.title || title;
  const pageDescription = editorial?.description || description;
  const fullTitle = /\bZowGame\b/i.test(pageTitle) ? pageTitle : `${pageTitle} | ZowGame`;
  const canonical = canonicalUrl(path);
  const images = image ? [new URL(image, SITE_URL).href] : undefined;
  return {
    title: { absolute: fullTitle }, description: pageDescription, alternates: { canonical }, robots: { index: !noindex, follow: true },
    openGraph: { title: fullTitle, description: pageDescription, url: canonical, siteName: "ZowGame", type: "website", ...(images ? { images } : {}) },
    twitter: { card: "summary_large_image", title: fullTitle, description: pageDescription, ...(images ? { images } : {}) },
  };
}

export type SchemaLink = { name: string; path: string };

export function breadcrumbSchema(items: readonly SchemaLink[]) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: canonicalUrl(item.path) })),
  };
}

type ItemListOptions = { name: string; path: string; items: readonly (SchemaLink & { image?: string; description?: string })[] };

export function itemListSchema({ name, path, items }: ItemListOptions) {
  return {
    "@context": "https://schema.org", "@type": "ItemList", name, url: canonicalUrl(path), numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name,
      url: `${canonicalUrl(item.path)}${new URL(item.path, SITE_URL).hash}`,
      ...(item.image ? { image: new URL(item.image, SITE_URL).href } : {}),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

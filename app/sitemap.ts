import type { MetadataRoute } from "next";
import { canonicalUrl } from "../src/app/lib/seo";
import { getIndexableRoutes } from "../src/app/lib/seo-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  // A build date is not evidence of a significant content update.
  return getIndexableRoutes().map((route) => ({ url: canonicalUrl(route.path) }));
}

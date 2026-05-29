"use client";
import { useEffect } from "react";

type CanonicalProps = {
  title: string;
  canonical: string;
  description?: string;
  keywords?: string;
};

export function SeoHead({ title, canonical, description, keywords }: CanonicalProps) {
  useEffect(() => {
    document.title = title;

    const ensureLink = (rel: string) => {
      let el = document.querySelector(`link[rel=\"${rel}\"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      return el;
    };

    const ensureMeta = (name: string) => {
      let el = document.querySelector(`meta[name=\"${name}\"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      return el;
    };

    const canonicalLink = ensureLink("canonical");
    canonicalLink.href = canonical;

    if (description) ensureMeta("description").content = description;
    if (keywords) ensureMeta("keywords").content = keywords;
  }, [title, canonical, description, keywords]);

  return null;
}

"use client";
import { useEffect } from "react";
import { useContent } from "./content-store";

const SCRIPT_ID = "nexus-schema-jsonld";

export function SchemaJsonLd() {
  const { content } = useContent();

  useEffect(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const ratingValue = parseFloat(content.rating) || 0;

    const videoGame = {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      name: content.title,
      description: content.seoDescription,
      genre: ["Survival Horror", "Roguelite", "Pixel Art"],
      url,
      image: content.coverImg,
      applicationCategory: "Game",
      operatingSystem: ["Web Browser", "Windows"],
      gamePlatform: ["Web Browser", "PC"],
      playMode: "SinglePlayer",
      author: {
        "@type": "Person",
        name: "abho",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue,
        bestRating: 5,
        worstRating: 1,
        ratingCount: 142,
      },
      keywords: content.seoKeywords,
    };

    const faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    };

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://zowgame.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Cobb Can Move",
          item: "https://zowgame.com/cobb-can-move/",
        },
      ],
    };

    const payload = JSON.stringify([videoGame, faqPage, breadcrumb]);

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = payload;
  }, [content]);

  return null;
}

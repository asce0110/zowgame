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
      genre: content.genre,
      url,
      image: content.coverImg,
      applicationCategory: "Game",
      operatingSystem: "Web Browser",
      gamePlatform: ["Web Browser", "PC", "Mobile"],
      playMode: "MultiPlayer",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: ratingValue,
        bestRating: 10,
        worstRating: 1,
        ratingCount: 12847,
      },
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

    const payload = JSON.stringify([videoGame, faqPage]);

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

"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export function TrailerModal({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const embedUrl = url.includes("?") ? `${url}&autoplay=1&rel=0` : `${url}?autoplay=1&rel=0`;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8 animate-[fadeIn_0.2s_ease]"
      onClick={onClose}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-11 h-11 rounded-lg bg-black/60 border border-white/15 text-white/80 hover:text-white hover:bg-black/80 flex items-center justify-center"
        aria-label="Close trailer"
      >
        <X className="w-5 h-5" />
      </button>
      <div
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-fuchsia-500/30 shadow-[0_0_80px_rgba(217,70,239,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={embedUrl}
          title={`${title} — trailer`}
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}

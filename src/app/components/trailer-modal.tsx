import { useEffect } from "react";
import { X } from "lucide-react";

function normalizeYouTubeUrl(url: string) {
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) {
        return `https://www.youtube.com${u.pathname}`;
      }
      if (u.pathname === "/watch") {
        const id = u.searchParams.get("v");
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/")[2];
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
    }

    return url;
  } catch {
    return url;
  }
}

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

  const normalized = normalizeYouTubeUrl(url);
  const embedUrl = normalized.includes("?") ? `${normalized}&autoplay=1&rel=0` : `${normalized}?autoplay=1&rel=0`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-sm p-4 sm:p-8 animate-[fadeIn_0.2s_ease]" style={{ background: "rgba(2, 0, 8, 0.88)" }} onClick={onClose}>
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
      <button onClick={onClose} className="absolute top-4 right-4 w-11 h-11 rounded-xl bg-black/60 border border-fuchsia-500/25 text-white/85 hover:text-white hover:bg-black/80 hover:border-fuchsia-500/50 flex items-center justify-center cursor-pointer transition-colors shadow-[0_0_20px_rgba(217,70,239,0.18)]" aria-label="Close trailer">
        <X className="w-5 h-5" />
      </button>
      <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-fuchsia-500/40 shadow-[0_0_80px_rgba(217,70,239,0.5)] hud-corners" onClick={(e) => e.stopPropagation()}>
        <span className="hud-c1" /><span className="hud-c2" />
        <iframe src={embedUrl} title={`${title} — trailer`} className="absolute inset-0 w-full h-full border-0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      </div>
    </div>
  );
}

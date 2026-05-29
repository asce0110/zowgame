"use client";
import { Heart, Play, Trash2 } from "lucide-react";
import { useLibrary } from "./library-store";
import { vibrate } from "../lib/haptics";

export function FavoritesView({ onPlayGame }: { onPlayGame: (id: string) => void }) {
  const { favorites, removeFavorite, recordPlay } = useLibrary();

  return (
    <section className="flex flex-col gap-6">
      <div>
        <div className="text-rose-500 tracking-[0.3em] mb-2" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// YOUR FAVORITES</div>
        <h2 className="ec-text tracking-tight mb-2" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "32px" }}>
          Saved <span className="bg-gradient-to-r from-rose-500 to-fuchsia-500 bg-clip-text text-transparent">for later</span>
        </h2>
        <p className="ec-text-muted max-w-2xl" style={{ fontFamily: "Rajdhani", fontSize: "15px" }}>
          Tap the heart icon on any game card to save it here. Stored locally on this device — no account required.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="relative rounded-2xl border ec-border ec-surface p-10 sm:p-16 text-center hud-corners">
          <span className="hud-c1" /><span className="hud-c2" />
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 border border-rose-400/30 flex items-center justify-center">
            <Heart className="w-6 h-6 text-rose-500" />
          </div>
          <h3 className="ec-text mb-2" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "20px" }}>Nothing saved yet</h3>
          <p className="ec-text-faint max-w-sm mx-auto" style={{ fontFamily: "Rajdhani", fontSize: "14px" }}>
            Hover or tap any game card and hit the heart to start your collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {favorites.map((g) => (
            <div
              key={g.id}
              className="group relative rounded-2xl overflow-hidden border ec-border hover:ec-border-brand ec-surface-elevated transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: "var(--ec-shadow-card)" }}
            >
              <button
                onClick={() => { vibrate(10); recordPlay({ id: g.id, title: g.title, img: g.img, genre: g.genre }); onPlayGame(g.id); }}
                className="block w-full text-left cursor-pointer"
                aria-label={`Play ${g.title}`}
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={g.img.includes("unsplash.com") ? `${g.img}&fm=avif` : g.img}
                    alt={g.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--ec-surface-elevated), transparent)" }} />
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/0 via-purple-500/0 to-rose-500/0 group-hover:from-fuchsia-500/20 group-hover:via-purple-500/20 group-hover:to-rose-500/20 transition-colors duration-300 mix-blend-overlay" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-[0_0_22px_rgba(217,70,239,0.6)]">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  {g.genre && (
                    <div className="text-fuchsia-500 tracking-[0.2em] mb-1 truncate" style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "10px" }}>{g.genre}</div>
                  )}
                  <h3 className="ec-text tracking-wide truncate" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "13px" }}>{g.title}</h3>
                </div>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); vibrate(6); removeFavorite(g.id); }}
                aria-label={`Remove ${g.title} from favorites`}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-rose-500/30 border border-rose-400/60 text-rose-100 dark:text-rose-300 backdrop-blur flex items-center justify-center hover:bg-rose-500/50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

"use client";
import { Heart, Play, Trash2 } from "lucide-react";
import { useLibrary } from "./library-store";
import { vibrate } from "../lib/haptics";

export function FavoritesView({ onPlayGame }: { onPlayGame: (id: string) => void }) {
  const { favorites, removeFavorite, recordPlay } = useLibrary();

  return (
    <section className="flex flex-col gap-6">
      <div>
        <div className="text-accent tracking-[0.3em] mb-2 font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// YOUR FAVORITES</div>
        <h2 className="text-foreground tracking-tight mb-2" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "32px" }}>
          Saved <span className="text-accent">for later</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl font-bold" style={{ fontSize: "15px" }}>
          Tap the heart icon on any game card to save it here. Stored locally on this device — no account required.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="relative rounded-2xl border-2 border-foreground bg-card p-10 sm:p-16 text-center shadow-[5px_5px_0_#24312c]">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl border-2 border-foreground bg-accent/10 flex items-center justify-center shadow-[3px_3px_0_#24312c]">
            <Heart className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-foreground mb-2" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "20px" }}>Nothing saved yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto font-bold" style={{ fontSize: "14px" }}>
            Hover or tap any game card and hit the heart to start your collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {favorites.map((g) => (
            <div
              key={g.id}
              className="group relative rounded-2xl overflow-hidden border-2 border-foreground bg-card transition-all duration-300 hover:-translate-y-1 shadow-[4px_4px_0_#24312c] hover:shadow-[6px_6px_0_#24312c]"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-primary border-2 border-foreground flex items-center justify-center shadow-[3px_3px_0_#24312c]">
                      <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  {g.genre && (
                    <div className="text-accent tracking-[0.2em] mb-1 truncate font-extrabold" style={{ fontSize: "10px" }}>{g.genre}</div>
                  )}
                  <h3 className="text-foreground tracking-wide truncate" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "13px" }}>{g.title}</h3>
                </div>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); vibrate(6); removeFavorite(g.id); }}
                aria-label={`Remove ${g.title} from favorites`}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-accent/20 border-2 border-accent text-accent flex items-center justify-center hover:bg-accent/40 transition-colors cursor-pointer"
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

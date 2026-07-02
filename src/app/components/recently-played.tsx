"use client";
import { Play, X, Heart } from "lucide-react";
import { useLibrary } from "./library-store";
import { vibrate } from "../lib/haptics";

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function RecentlyPlayedStrip({ onPlayGame }: { onPlayGame: (id: string) => void }) {
  const { recent, removeRecent, clearRecent, toggleFavorite, isFavorite } = useLibrary();

  if (recent.length === 0) return null;

  return (
    <section className="mb-8 sm:mb-10">
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-accent tracking-[0.3em] mb-1 font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>// RECENTLY PLAYED</div>
          <h2 className="text-foreground tracking-tight" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "22px" }}>
            Continue where you left off
          </h2>
        </div>
        <button
          onClick={() => { vibrate(6); clearRecent(); }}
          className="text-muted-foreground hover:text-foreground tracking-widest transition-colors cursor-pointer font-extrabold"
          style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}
        >
          CLEAR ALL
        </button>
      </div>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
        {recent.map((g) => {
          const fav = isFavorite(g.id);
          return (
            <div
              key={g.id}
              className="group relative shrink-0 w-[220px] sm:w-[240px] snap-start rounded-xl overflow-hidden border-2 border-foreground bg-card transition-all shadow-[4px_4px_0_#24312c] hover:shadow-[6px_6px_0_#24312c]"
            >
              <button
                onClick={() => { vibrate(10); onPlayGame(g.id); }}
                className="block w-full text-left cursor-pointer"
                aria-label={`Continue playing ${g.title}`}
              >
                <div className="relative h-28 sm:h-32 overflow-hidden">
                  <img
                    src={g.img.includes("unsplash.com") ? `${g.img}&fm=avif` : g.img}
                    alt={g.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-primary border-2 border-foreground flex items-center justify-center shadow-[3px_3px_0_#24312c]">
                      <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
                    </div>
                  </div>

                  {g.genre && (
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded border-2 border-foreground bg-card text-foreground tracking-widest font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>
                      {g.genre}
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="text-foreground truncate" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "13px" }}>{g.title}</h3>
                  <div className="text-muted-foreground tabular-nums font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
                    {timeAgo(g.playedAt)}
                  </div>
                </div>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); vibrate(6); toggleFavorite({ id: g.id, title: g.title, img: g.img, genre: g.genre }); }}
                aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                className={`absolute top-2 right-2 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                  fav
                    ? "bg-accent/20 border-accent text-accent shadow-[2px_2px_0_#24312c]"
                    : "bg-card border-foreground text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${fav ? "fill-accent" : ""}`} />
              </button>

              <button
                onClick={() => { vibrate(4); removeRecent(g.id); }}
                aria-label={`Remove ${g.title} from recently played`}
                className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-card border-2 border-foreground text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all cursor-pointer flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

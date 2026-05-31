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
          <div className="text-orange-500 tracking-[0.3em] mb-1" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>// RECENTLY PLAYED</div>
          <h2 className="ec-text tracking-tight" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "22px" }}>
            Continue where you left off
          </h2>
        </div>
        <button
          onClick={() => { vibrate(6); clearRecent(); }}
          className="ec-text-faint hover:ec-text tracking-widest transition-colors cursor-pointer"
          style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}
        >
          CLEAR ALL
        </button>
      </div>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
        {recent.map((g) => {
          const fav = isFavorite(g.id);
          return (
            <div
              key={g.id}
              className="group relative shrink-0 w-[220px] sm:w-[240px] snap-start rounded-xl overflow-hidden border ec-border hover:ec-border-brand ec-surface-elevated transition-colors"
              style={{ boxShadow: "var(--ec-shadow-card)" }}
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
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--ec-surface-elevated), transparent)" }} />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-[0_0_24px_rgba(217,70,239,0.6)]">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                  </div>

                  {g.genre && (
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur border border-white/10 text-white/90 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>
                      {g.genre}
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="ec-text truncate" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "13px" }}>{g.title}</h3>
                  <div className="ec-text-faint tabular-nums" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
                    {timeAgo(g.playedAt)}
                  </div>
                </div>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); vibrate(6); toggleFavorite({ id: g.id, title: g.title, img: g.img, genre: g.genre }); }}
                aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                className={`absolute top-2 right-2 w-8 h-8 rounded-full backdrop-blur border flex items-center justify-center transition-all cursor-pointer ${
                  fav
                    ? "bg-rose-500/30 border-rose-400/60 text-rose-300"
                    : "bg-black/60 border-white/15 text-white/70 hover:text-white hover:bg-black/80"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${fav ? "fill-rose-300" : ""}`} />
              </button>

              <button
                onClick={() => { vibrate(4); removeRecent(g.id); }}
                aria-label={`Remove ${g.title} from recently played`}
                className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/50 hover:text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer flex items-center justify-center"
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

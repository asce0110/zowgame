"use client";
import { Play, Star, Users, Heart } from "lucide-react";
import { LibraryGame, slugify, useLibrary } from "./library-store";
import { vibrate } from "../lib/haptics";

const games = [
  { title: "NEON DRIFT", genre: "RACING", players: "24K", rating: 4.8, img: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=80", color: "from-cyan-500 to-blue-600" },
  { title: "SHADOW PROTOCOL", genre: "STEALTH", players: "89K", rating: 4.9, img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80", color: "from-purple-600 to-fuchsia-500" },
  { title: "TITAN SIEGE", genre: "STRATEGY", players: "156K", rating: 4.7, img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80", color: "from-orange-500 to-red-600" },
  { title: "PIXEL HUNTERS", genre: "ARCADE", players: "43K", rating: 4.6, img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", color: "from-emerald-500 to-cyan-500" },
  { title: "STARFALL", genre: "SPACE SIM", players: "67K", rating: 4.8, img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&q=80", color: "from-indigo-500 to-purple-600" },
  { title: "RUNE BREAKER", genre: "PUZZLE", players: "12K", rating: 4.5, img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80", color: "from-rose-500 to-pink-600" },
  { title: "GHOST CIRCUIT", genre: "CYBER", players: "31K", rating: 4.7, img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80", color: "from-violet-500 to-fuchsia-600" },
  { title: "IRON COVENANT", genre: "MMO", players: "98K", rating: 4.8, img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80", color: "from-amber-500-to-orange-600" },
  { title: "ABYSS WALKER", genre: "HORROR", players: "21K", rating: 4.6, img: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800&q=80", color: "from-slate-500 to-zinc-700" },
  { title: "PHOTON BLITZ", genre: "ESPORTS", players: "201K", rating: 4.9, img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80", color: "from-sky-400 to-indigo-600" },
  { title: "CHRONO FORGE", genre: "RPG", players: "54K", rating: 4.7, img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80", color: "from-teal-500 to-emerald-600" },
  { title: "VENOM SQUAD", genre: "TACTICAL", players: "78K", rating: 4.6, img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80", color: "from-lime-500 to-green-600" },
];

export const CATALOG: (LibraryGame & { rating: number; players: string; color: string })[] = games.map((g) => ({
  id: slugify(g.title),
  title: g.title,
  genre: g.genre,
  img: g.img,
  rating: g.rating,
  players: g.players,
  color: g.color,
}));

export function GameGrid({ onPlayGame }: { onPlayGame?: (id: string) => void }) {
  const { toggleFavorite, isFavorite, recordPlay } = useLibrary();

  const handlePlay = (g: typeof CATALOG[number]) => {
    vibrate(10);
    recordPlay({ id: g.id, title: g.title, img: g.img, genre: g.genre });
    onPlayGame?.(g.id);
  };

  return (
    <section>
      <div className="flex items-end justify-between mb-6 sm:mb-8 flex-wrap gap-3">
        <div>
          <div className="text-accent tracking-[0.3em] mb-2 font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// CATALOG</div>
          <h2 className="text-foreground tracking-tight" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "32px" }}>
            POPULAR <span className="text-accent">RIGHT NOW</span>
          </h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["ALL", "ACTION", "STRATEGY", "RPG", "INDIE"].map((c, i) => (
            <button
              key={c}
              className={`px-3 sm:px-4 py-2 rounded-lg tracking-widest transition-all cursor-pointer min-h-[36px] font-extrabold border-2 ${
                i === 0
                  ? "text-card bg-foreground border-foreground shadow-[2px_2px_0_#24312c]"
                  : "text-muted-foreground bg-card border-border hover:text-foreground hover:border-foreground"
              }`}
              style={{ fontFamily: "Nunito", fontSize: "11px" }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATALOG.map((g, i) => {
          const fav = isFavorite(g.id);
          return (
            <div
              key={g.id}
              className="group relative rounded-2xl overflow-hidden border-2 border-foreground bg-card transition-all duration-300 hover:-translate-y-1 shadow-[4px_4px_0_#24312c] hover:shadow-[6px_6px_0_#24312c]"
            >
              <button onClick={() => handlePlay(g)} className="block w-full text-left cursor-pointer" aria-label={`Play ${g.title}`}>
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={g.img.includes("unsplash.com") ? `${g.img}&fm=avif` : g.img}
                    alt={g.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded border-2 border-foreground bg-card">
                    <span className="text-foreground tracking-widest font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "8px" }}>#{String(i + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-11 h-11 rounded-full bg-primary border-2 border-foreground flex items-center justify-center shadow-[3px_3px_0_#24312c]">
                      <Play className="w-4 h-4 text-primary-foreground fill-primary-foreground ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-accent tracking-[0.2em] truncate font-extrabold" style={{ fontSize: "9px" }}>{g.genre}</span>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-muted-foreground font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{g.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-foreground mb-2 tracking-wide truncate" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "12px" }}>{g.title}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-3 h-3 shrink-0" />
                    <span className="truncate font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{g.players} playing</span>
                  </div>
                </div>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); vibrate(6); toggleFavorite({ id: g.id, title: g.title, img: g.img, genre: g.genre }); }}
                aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                className={`absolute top-2 right-2 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                  fav
                    ? "bg-accent/20 border-accent text-accent shadow-[2px_2px_0_#24312c]"
                    : "bg-card border-foreground text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 focus:opacity-100"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${fav ? "fill-accent" : ""}`} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

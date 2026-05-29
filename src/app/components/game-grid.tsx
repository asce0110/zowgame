"use client";

import { Play, Star, Users } from "lucide-react";

const games = [
  { title: "NEON DRIFT", genre: "RACING", players: "24K", rating: 4.8, img: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=80", color: "from-cyan-500 to-blue-600" },
  { title: "SHADOW PROTOCOL", genre: "STEALTH", players: "89K", rating: 4.9, img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80", color: "from-purple-600 to-fuchsia-500" },
  { title: "TITAN SIEGE", genre: "STRATEGY", players: "156K", rating: 4.7, img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80", color: "from-orange-500 to-red-600" },
  { title: "PIXEL HUNTERS", genre: "ARCADE", players: "43K", rating: 4.6, img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", color: "from-emerald-500 to-cyan-500" },
  { title: "STARFALL", genre: "SPACE SIM", players: "67K", rating: 4.8, img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&q=80", color: "from-indigo-500 to-purple-600" },
  { title: "RUNE BREAKER", genre: "PUZZLE", players: "12K", rating: 4.5, img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80", color: "from-rose-500 to-pink-600" },
  { title: "GHOST CIRCUIT", genre: "CYBER", players: "31K", rating: 4.7, img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80", color: "from-violet-500 to-fuchsia-600" },
  { title: "IRON COVENANT", genre: "MMO", players: "98K", rating: 4.8, img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80", color: "from-amber-500 to-orange-600" },
  { title: "ABYSS WALKER", genre: "HORROR", players: "21K", rating: 4.6, img: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800&q=80", color: "from-slate-500 to-zinc-700" },
  { title: "PHOTON BLITZ", genre: "ESPORTS", players: "201K", rating: 4.9, img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80", color: "from-sky-400 to-indigo-600" },
  { title: "CHRONO FORGE", genre: "RPG", players: "54K", rating: 4.7, img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80", color: "from-teal-500 to-emerald-600" },
  { title: "VENOM SQUAD", genre: "TACTICAL", players: "78K", rating: 4.6, img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80", color: "from-lime-500 to-green-600" },
];

export function GameGrid() {
  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-fuchsia-400 tracking-[0.3em] mb-2" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// CATALOG</div>
          <h2 className="text-white tracking-tight" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "42px" }}>
            POPULAR <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">RIGHT NOW</span>
          </h2>
        </div>
        <div className="flex gap-2">
          {["ALL", "ACTION", "STRATEGY", "RPG", "INDIE"].map((c, i) => (
            <button key={c} className={`px-4 py-2 rounded-lg tracking-widest transition-all ${i === 0 ? "bg-white text-black" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"}`} style={{ fontFamily: "Orbitron", fontWeight: 600, fontSize: "11px" }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {games.map((g, i) => (
          <div key={g.title} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0f0020] hover:border-fuchsia-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-1">
            <div className="relative h-32 overflow-hidden">
              <img src={g.img} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0020] via-[#0f0020]/40 to-transparent" />
              <div className={`absolute inset-0 bg-gradient-to-br ${g.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300 mix-blend-overlay`} />

              <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 hover:bg-fuchsia-500 hover:border-fuchsia-400">
                <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
              </button>

              <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur border border-white/10">
                <span className="text-white/90 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "8px" }}>#{String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className={`bg-gradient-to-r ${g.color} bg-clip-text text-transparent tracking-[0.2em] truncate`} style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "9px" }}>{g.genre}</span>
                <div className="flex items-center gap-0.5 shrink-0">
                  <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white/80" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{g.rating}</span>
                </div>
              </div>
              <h3 className="text-white mb-2 tracking-wide truncate" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}>{g.title}</h3>
              <div className="flex items-center gap-1 text-white/50">
                <Users className="w-3 h-3 shrink-0" />
                <span className="truncate" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{g.players} playing</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

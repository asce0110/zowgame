import { Trophy, Clock, Target, Flame, TrendingUp, Award, Gamepad2, Calendar } from "lucide-react";

const recentGames = [
  { title: "Eclipse Protocol", result: "VICTORY", kd: "12/3", time: "23m", date: "2h ago", color: "from-emerald-500 to-cyan-500" },
  { title: "Void Runners", result: "P2", kd: "—", time: "8m", date: "5h ago", color: "from-cyan-500 to-blue-500" },
  { title: "Ashes of Aether", result: "VICTORY", kd: "8/2", time: "47m", date: "Yesterday", color: "from-emerald-500 to-cyan-500" },
  { title: "Eclipse Protocol", result: "DEFEAT", kd: "4/9", time: "18m", date: "Yesterday", color: "from-rose-500 to-red-500" },
  { title: "Titan Siege", result: "VICTORY", kd: "—", time: "1h 12m", date: "2d ago", color: "from-emerald-500 to-cyan-500" },
];

const achievements = [
  { name: "First Blood", desc: "Win 100 ranked matches", progress: 100, icon: Trophy, color: "from-yellow-400 to-orange-500" },
  { name: "Untouchable", desc: "Reach Diamond rank", progress: 87, icon: Award, color: "from-cyan-400 to-blue-500" },
  { name: "Marathon", desc: "Play 1000 hours total", progress: 89, icon: Clock, color: "from-fuchsia-500 to-purple-600" },
  { name: "Sharpshooter", desc: "Achieve K/D ratio 4.0+", progress: 96, icon: Target, color: "from-rose-500 to-pink-600" },
];

const friends = [
  { name: "VoidWalker", status: "Eclipse Protocol", online: true },
  { name: "NeonByte", status: "In Lobby", online: true },
  { name: "Ph4nt0m_X", status: "Void Runners", online: true },
  { name: "MidnightMage", status: "Offline · 2h", online: false },
  { name: "QuantumQueen", status: "Ashes of Aether", online: true },
];

export function UserDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="text-cyan-400 tracking-[0.3em] mb-2" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// PLAYER CONSOLE</div>
        <h1 className="text-white tracking-tight" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "48px" }}>
          WELCOME BACK, <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">KAIROSx9</span>
        </h1>
        <p className="text-white/50 mt-2" style={{ fontFamily: "Nunito", fontSize: "16px" }}>You have 3 active tournaments and 12 unread messages</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: "TOTAL WINS", value: "1,247", trend: "+12%", icon: Trophy, color: "from-yellow-400 to-orange-500" },
          { label: "PLAYTIME", value: "892h", trend: "+47h", icon: Clock, color: "from-cyan-400 to-blue-500" },
          { label: "K/D RATIO", value: "3.84", trend: "+0.21", icon: Target, color: "from-fuchsia-500 to-purple-600" },
          { label: "WIN STREAK", value: "14", trend: "ACTIVE", icon: Flame, color: "from-rose-500 to-pink-600" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="relative rounded-2xl border border-white/10 bg-[#0f0020]/80 p-5 overflow-hidden group hover:border-fuchsia-500/40 transition-colors">
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${s.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{s.trend}</span>
                </div>
                <div className="text-white mb-1" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "32px" }}>{s.value}</div>
                <div className="text-white/40 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Matches */}
        <div className="col-span-2 rounded-2xl border border-white/10 bg-[#0f0020]/60 p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-fuchsia-400" />
              <h3 className="text-white tracking-widest" style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: "14px" }}>RECENT MATCHES</h3>
            </div>
            <button className="text-white/50 hover:text-white tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>VIEW ALL →</button>
          </div>
          <div className="flex flex-col gap-2">
            {recentGames.map((g, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className={`w-1 self-stretch rounded-full bg-gradient-to-b ${g.color}`} />
                <div className="flex-1">
                  <div className="text-white" style={{ fontFamily: "Nunito", fontWeight: 600, fontSize: "15px" }}>{g.title}</div>
                  <div className="text-white/40 tracking-wider" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{g.date} · {g.time}</div>
                </div>
                <div className="text-white/60" style={{ fontFamily: "JetBrains Mono", fontSize: "12px" }}>{g.kd}</div>
                <div className={`px-3 py-1 rounded-md bg-gradient-to-r ${g.color} text-white tracking-widest`} style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: "10px" }}>
                  {g.result}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Friends */}
        <div className="rounded-2xl border border-white/10 bg-[#0f0020]/60 p-6">
          <h3 className="text-white tracking-widest mb-5" style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: "14px" }}>FRIENDS · {friends.filter(f => f.online).length} ONLINE</h3>
          <div className="flex flex-col gap-3">
            {friends.map((f) => (
              <div key={f.name} className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fuchsia-600 to-cyan-500 p-[1.5px]">
                    <div className="w-full h-full rounded-lg bg-[#0f0020] flex items-center justify-center text-white" style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: "11px" }}>{f.name[0]}</div>
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0f0020] ${f.online ? "bg-emerald-400" : "bg-zinc-600"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white truncate" style={{ fontFamily: "Nunito", fontWeight: 600, fontSize: "13px" }}>{f.name}</div>
                  <div className={`truncate ${f.online ? "text-cyan-400" : "text-white/30"}`} style={{ fontFamily: "Nunito", fontSize: "11px" }}>{f.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-2xl border border-white/10 bg-[#0f0020]/60 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-400" />
            <h3 className="text-white tracking-widest" style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: "14px" }}>ACHIEVEMENTS IN PROGRESS</h3>
          </div>
          <span className="text-white/40 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>34 / 120 UNLOCKED</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {achievements.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.name} className="rounded-xl border border-white/10 p-4 hover:border-fuchsia-500/40 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${a.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white truncate" style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: "13px" }}>{a.name}</div>
                    <div className="text-white/40 truncate" style={{ fontFamily: "Nunito", fontSize: "11px" }}>{a.desc}</div>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mb-1">
                  <div className={`h-full bg-gradient-to-r ${a.color} rounded-full`} style={{ width: `${a.progress}%` }} />
                </div>
                <div className="flex justify-between" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
                  <span className="text-white/40">PROGRESS</span>
                  <span className="text-white">{a.progress}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

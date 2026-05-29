"use client";
import { Users, Gamepad2, DollarSign, Activity, AlertTriangle, Server, Shield, Ban, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

const liveTraffic = [38, 45, 52, 48, 61, 67, 72, 80, 75, 88, 92, 85, 91, 96, 102, 98, 110, 105, 118, 124, 119, 132, 128, 140];

const usersData = [
  { id: "U-7281", name: "Ph4nt0m_X", email: "phantom@nexus.gg", level: 87, status: "ACTIVE", joined: "2024-03-12", flag: null },
  { id: "U-7282", name: "VoidWalker", email: "void@nexus.gg", level: 81, status: "ACTIVE", joined: "2024-04-02", flag: null },
  { id: "U-7283", name: "X_R4ger99", email: "rage@spam.tld", level: 12, status: "FLAGGED", joined: "2026-05-08", flag: "Suspected bot" },
  { id: "U-7284", name: "NeonByte", email: "neon@nexus.gg", level: 79, status: "ACTIVE", joined: "2024-05-19", flag: null },
  { id: "U-7285", name: "ToxicTroll", email: "tox@nexus.gg", level: 34, status: "BANNED", joined: "2025-01-04", flag: "Harassment ×3" },
  { id: "U-7286", name: "Kr1msonRaven", email: "raven@nexus.gg", level: 73, status: "ACTIVE", joined: "2024-06-30", flag: null },
];

const reports = [
  { id: "R-2041", reporter: "VoidWalker", target: "X_R4ger99", reason: "Aimbot suspected", severity: "HIGH", time: "12m ago" },
  { id: "R-2040", reporter: "NeonByte", target: "ToxicTroll", reason: "Chat harassment", severity: "MED", time: "47m ago" },
  { id: "R-2039", reporter: "MidnightMage", target: "GhostAFK", reason: "Match griefing", severity: "LOW", time: "1h ago" },
  { id: "R-2038", reporter: "Ph4nt0m_X", target: "X_R4ger99", reason: "Wallhacks suspected", severity: "HIGH", time: "2h ago" },
];

const servers = [
  { region: "NA-WEST", load: 67, ping: 24, status: "ok" },
  { region: "NA-EAST", load: 82, ping: 31, status: "ok" },
  { region: "EU-CENTRAL", load: 91, ping: 42, status: "warn" },
  { region: "ASIA-PAC", load: 54, ping: 67, status: "ok" },
  { region: "SA-EAST", load: 38, ping: 88, status: "ok" },
  { region: "AF-SOUTH", load: 96, ping: 112, status: "crit" },
];

export function AdminDashboard() {
  const [tab, setTab] = useState<"users" | "reports">("users");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-fuchsia-400" />
            <span className="text-fuchsia-400 tracking-[0.3em]" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>// ADMIN CONSOLE · CLEARANCE Ω</span>
          </div>
          <h1 className="text-white tracking-tight" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "48px" }}>
            COMMAND <span className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">CENTER</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>ALL SYSTEMS NOMINAL</span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: "TOTAL USERS", value: "2.84M", trend: "+18.2K TODAY", icon: Users, color: "from-cyan-400 to-blue-500" },
          { label: "ACTIVE NOW", value: "847,392", trend: "PEAK 1.1M", icon: Activity, color: "from-fuchsia-500 to-purple-600" },
          { label: "REVENUE (24H)", value: "$284,991", trend: "+12.4%", icon: DollarSign, color: "from-emerald-400 to-cyan-500" },
          { label: "OPEN REPORTS", value: "127", trend: "23 HIGH PRIORITY", icon: AlertTriangle, color: "from-rose-500 to-orange-500" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="relative rounded-2xl border border-white/10 bg-[#0f0020]/80 p-5 overflow-hidden">
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${s.color} opacity-10 blur-2xl`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-white mb-1" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "30px" }}>{s.value}</div>
                <div className="text-white/40 tracking-widest mb-2" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{s.label}</div>
                <div className="text-emerald-400 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{s.trend}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Live traffic chart */}
        <div className="col-span-2 rounded-2xl border border-white/10 bg-[#0f0020]/60 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "14px" }}>CONCURRENT PLAYERS</h3>
              <div className="text-white/40 tracking-widest mt-1" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>LAST 24 HOURS · UPDATED 4s AGO</div>
            </div>
            <div className="flex gap-2">
              {["24H", "7D", "30D"].map((t, i) => (
                <button key={t} className={`px-3 py-1.5 rounded-md tracking-widest ${i === 0 ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40" : "text-white/40 hover:text-white"}`} style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-48 flex items-end gap-1.5">
            {liveTraffic.map((v, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-fuchsia-600 via-purple-500 to-cyan-400 hover:opacity-80 transition-opacity relative group" style={{ height: `${v}%` }}>
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black border border-white/20 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>
                  {(v * 9).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-white/40" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>NOW</span>
          </div>
        </div>

        {/* Server status */}
        <div className="rounded-2xl border border-white/10 bg-[#0f0020]/60 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Server className="w-4 h-4 text-cyan-400" />
            <h3 className="text-white tracking-widest" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "14px" }}>SERVER FLEET</h3>
          </div>
          <div className="flex flex-col gap-3">
            {servers.map((s) => (
              <div key={s.region}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.status === "ok" ? "bg-emerald-400" : s.status === "warn" ? "bg-yellow-400" : "bg-red-500 animate-pulse"}`} />
                    <span className="text-white tracking-wider" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>{s.region}</span>
                  </div>
                  <span className="text-white/50" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>{s.ping}ms · {s.load}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className={`h-full rounded-full ${s.load > 90 ? "bg-red-500" : s.load > 75 ? "bg-yellow-400" : "bg-gradient-to-r from-emerald-400 to-cyan-400"}`} style={{ width: `${s.load}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Users / Reports */}
      <div className="rounded-2xl border border-white/10 bg-[#0f0020]/60 overflow-hidden">
        <div className="flex border-b border-white/10">
          {([
            { id: "users", label: "USER MANAGEMENT", icon: Users },
            { id: "reports", label: "MODERATION QUEUE", icon: AlertTriangle },
          ] as const).map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-6 py-4 flex items-center gap-2 tracking-widest border-b-2 transition-colors ${isActive ? "text-white border-fuchsia-500" : "text-white/40 border-transparent hover:text-white/70"}`}
                style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "12px" }}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === "users" ? (
          <div>
            <div className="grid grid-cols-[120px_1fr_1fr_80px_120px_140px_120px] gap-4 px-6 py-3 border-b border-white/5 text-white/40 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
              <span>USER ID</span><span>HANDLE</span><span>EMAIL</span><span>LVL</span><span>STATUS</span><span>JOINED</span><span>ACTIONS</span>
            </div>
            {usersData.map((u) => (
              <div key={u.id} className="grid grid-cols-[120px_1fr_1fr_80px_120px_140px_120px] gap-4 px-6 py-4 border-b border-white/5 items-center hover:bg-white/[0.02]">
                <span className="text-white/50" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>{u.id}</span>
                <div>
                  <div className="text-white" style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "14px" }}>{u.name}</div>
                  {u.flag && <div className="text-rose-400 tracking-wider" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>⚠ {u.flag}</div>}
                </div>
                <span className="text-white/60 truncate" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>{u.email}</span>
                <span className="text-white" style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: "13px" }}>{u.level}</span>
                <span className={`px-2 py-1 rounded inline-block tracking-widest w-fit ${
                  u.status === "ACTIVE" ? "bg-emerald-500/15 text-emerald-400" :
                  u.status === "FLAGGED" ? "bg-yellow-500/15 text-yellow-400" :
                  "bg-rose-500/15 text-rose-400"
                }`} style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{u.status}</span>
                <span className="text-white/50" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>{u.joined}</span>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="Approve">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-md bg-white/5 hover:bg-rose-500/20 text-white/60 hover:text-rose-400 transition-colors" title="Ban">
                    <Ban className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="Delete">
                    <XCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-[120px_1fr_1fr_2fr_100px_120px_120px] gap-4 px-6 py-3 border-b border-white/5 text-white/40 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>
              <span>REPORT</span><span>REPORTER</span><span>TARGET</span><span>REASON</span><span>SEVERITY</span><span>FILED</span><span>ACTIONS</span>
            </div>
            {reports.map((r) => (
              <div key={r.id} className="grid grid-cols-[120px_1fr_1fr_2fr_100px_120px_120px] gap-4 px-6 py-4 border-b border-white/5 items-center hover:bg-white/[0.02]">
                <span className="text-white/50" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>{r.id}</span>
                <span className="text-cyan-400" style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "13px" }}>{r.reporter}</span>
                <span className="text-rose-400" style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "13px" }}>{r.target}</span>
                <span className="text-white/70" style={{ fontFamily: "Rajdhani", fontSize: "13px" }}>{r.reason}</span>
                <span className={`px-2 py-1 rounded inline-block tracking-widest w-fit ${
                  r.severity === "HIGH" ? "bg-rose-500/15 text-rose-400" :
                  r.severity === "MED" ? "bg-yellow-500/15 text-yellow-400" :
                  "bg-cyan-500/15 text-cyan-400"
                }`} style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>{r.severity}</span>
                <span className="text-white/50" style={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}>{r.time}</span>
                <div className="flex gap-2">
                  <button className="px-2 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>RESOLVE</button>
                  <button className="px-2 py-1 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 tracking-widest" style={{ fontFamily: "JetBrains Mono", fontSize: "9px" }}>ACT</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

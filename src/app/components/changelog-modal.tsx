"use client";
import { X } from "lucide-react";
import type { GameChangelogEntry } from "../data/games";

export function ChangelogModal({ entry, onClose }: { entry: GameChangelogEntry; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-[2rem] border-2 border-foreground bg-card p-6 sm:p-8 shadow-[8px_8px_0_#24312c]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-xl border-2 border-foreground bg-secondary hover:bg-accent hover:text-accent-foreground transition cursor-pointer">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[11px] font-extrabold px-3 py-1 rounded-full border-2 border-foreground bg-accent text-accent-foreground">{entry.version}</span>
          <span className="font-mono text-[10px] tracking-[.12em] text-muted-foreground">{entry.date}</span>
        </div>
        <p className="font-bold text-foreground mb-6" style={{ fontSize: "15px" }}>{entry.summary}</p>
        {entry.details ? (
          <div className="grid gap-5">
            {entry.details.map((section) => (
              <div key={section.label}>
                <h3 className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-accent mb-3">{section.label}</h3>
                <ul className="grid gap-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-[14px] font-bold text-foreground/80 leading-relaxed">
                      <span className="text-accent shrink-0 mt-1">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

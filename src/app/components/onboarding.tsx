"use client";
import { useEffect, useState } from "react";
import { X, ChevronRight, Zap, Keyboard, HelpCircle } from "lucide-react";
import { vibrate } from "../lib/haptics";

const ONBOARD_KEY = "eclipse-onboarded-v1";

const slides = [
  {
    icon: Zap,
    kicker: "STEP 01",
    title: "Play instantly in browser",
    body: "Cobb Can Move loads directly in your browser. No download is needed for the HTML5 version.",
    accent: "from-primary to-accent",
  },
  {
    icon: Keyboard,
    kicker: "STEP 02",
    title: "Learn the controls fast",
    body: "Move with WASD or Arrow Keys. Use E or Spacebar to interact. Desktop play is recommended for the cleanest input.",
    accent: "from-primary to-emerald-400",
  },
  {
    icon: HelpCircle,
    kicker: "STEP 03",
    title: "Read the active rule first",
    body: "Each floor changes how Cobb hunts you. Before you rush the next room, check the current rule and adapt.",
    accent: "from-accent to-primary",
  },
];

export function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let seen = "";
    try { seen = localStorage.getItem(ONBOARD_KEY) || ""; } catch {}
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 700);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    try { localStorage.setItem(ONBOARD_KEY, "1"); } catch {}
    setOpen(false);
  };

  const next = () => {
    vibrate(8);
    if (step < slides.length - 1) setStep(step + 1);
    else close();
  };

  if (!open) return null;
  const s = slides[step];
  const Icon = s.icon;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: "rgba(36, 49, 44, 0.7)" }} role="dialog" aria-modal="true">
      <div className="relative w-full max-w-md rounded-2xl border-2 border-foreground bg-card overflow-hidden shadow-[8px_8px_0_#24312c]" style={{ animation: "ntfIn 240ms cubic-bezier(0.16,1,0.3,1) both" }}>
        <style>{`@keyframes ntfIn { from { opacity: 0; transform: translateY(8px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }`}</style>

        <button onClick={close} aria-label="Skip" className="absolute top-3 right-3 z-10 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer">
          <X className="w-4 h-4" />
        </button>

        <div className="relative h-32 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-20`} />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${s.accent} flex items-center justify-center border-2 border-foreground shadow-[4px_4px_0_#24312c] p-3`}>
              <img src="/logo-symbol.svg" alt="ZOWGAME" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 -mt-2">
          <div className="text-accent tracking-[0.3em] mb-2 font-extrabold" style={{ fontFamily: "JetBrains Mono", fontSize: "10px" }}>// {s.kicker}</div>
          <h2 className="text-foreground mb-3" style={{ fontFamily: "Fredoka", fontWeight: 900, fontSize: "26px" }}>{s.title}</h2>
          <p className="text-muted-foreground mb-6 font-bold" style={{ fontSize: "15px", lineHeight: 1.6 }}>{s.body}</p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setStep(i)} className={`h-1.5 rounded-full transition-all cursor-pointer ${i === step ? "w-8 bg-primary" : "w-1.5 bg-border hover:bg-primary/50"}`} aria-label={`Go to step ${i + 1}`} />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={close} className="px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground tracking-widest transition-colors min-h-[40px] cursor-pointer font-extrabold" style={{ fontFamily: "Nunito", fontSize: "11px" }}>
                SKIP
              </button>
              <button onClick={next} className="group flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-foreground bg-primary text-primary-foreground font-black tracking-widest hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] shadow-[3px_3px_0_#24312c] transition-all min-h-[40px] cursor-pointer" style={{ fontFamily: "Nunito", fontSize: "11px" }}>
                {step === slides.length - 1 ? "START PLAYING" : "NEXT"}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

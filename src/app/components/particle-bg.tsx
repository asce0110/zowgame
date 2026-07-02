"use client";
import { useMemo } from "react";
import Particles from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export function ParticleBg() {
  const options: ISourceOptions = useMemo(() => ({
    fullScreen: { enable: true, zIndex: 0 },
    fpsLimit: 60,
    particles: {
      number: { value: 25, density: { enable: true } },
      color: { value: "#24312c" },
      opacity: { value: { min: 0.04, max: 0.12 } },
      size: { value: { min: 0.5, max: 1.5 } },
      move: {
        enable: true,
        speed: 0.3,
        direction: "none" as const,
        random: true,
        straight: false,
        outModes: { default: "bounce" as const },
      },
      shape: { type: "circle" },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "bubble" } },
      modes: {
        bubble: { distance: 180, size: 6, opacity: 0.15, duration: 2 },
      },
    },
    detectRetina: true,
  }), []);

  return (
    <Particles
      id="tsparticles"
      init={async (engine) => {
        await loadSlim(engine);
      }}
      options={options}
    />
  );
}

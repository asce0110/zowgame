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
      number: { value: 40, density: { enable: true } },
      color: { value: ["#c39a2f", "#c64f2f", "#8a6a3f", "#e8a840"] },
      opacity: {
        value: { min: 0.03, max: 0.18 },
        animation: { enable: true, speed: 0.3, sync: false, minimumValue: 0.02 },
      },
      size: {
        value: { min: 1, max: 3 },
        animation: { enable: true, speed: 0.8, sync: false, minimumValue: 0.5 },
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
        drift: 0.3,
      },
      shape: { type: ["circle", "triangle"] },
      wobble: { enable: true, distance: 3, speed: 2 },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "bubble" } },
      modes: {
        bubble: {
          distance: 200, size: 8, opacity: 0.25, duration: 2,
          color: { value: ["#c39a2f", "#c64f2f"] },
        },
      },
    },
    detectRetina: true,
  }), []);

  return (
    <Particles
      id="tsparticles"
      init={async (engine) => { await loadSlim(engine); }}
      options={options}
    />
  );
}

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let rx = 0, ry = 0, dx = 0, dy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      dx = e.clientX;
      dy = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      }
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest("a, button, [role='button'], input, label, kbd, select, textarea");
      setHovering(interactive);
    };
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const animate = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [visible]);

  return (
    <>
      <style>{`
        html, body, * { cursor: none !important; }
        @media (hover: none) { html, body, * { cursor: auto !important; } }
      `}</style>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] transition-[width,height,border-color,background-color] duration-200 ease-out"
        style={{
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          borderRadius: "9999px",
          border: `1.5px solid ${hovering ? "rgba(34,211,238,0.95)" : "rgba(217,70,239,0.85)"}`,
          background: hovering ? "rgba(34,211,238,0.08)" : "transparent",
          boxShadow: hovering
            ? "0 0 24px rgba(34,211,238,0.55), inset 0 0 12px rgba(34,211,238,0.25)"
            : "0 0 18px rgba(217,70,239,0.5)",
          opacity: visible ? 1 : 0,
          transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)",
          mixBlendMode: "screen",
        }}
      >
        {/* corner ticks */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-1.5 bg-current opacity-80" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-1.5 bg-current opacity-80" />
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-1.5 bg-current opacity-80" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-1.5 bg-current opacity-80" />
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] transition-[width,height,background-color] duration-150"
        style={{
          width: clicked ? 4 : hovering ? 4 : 6,
          height: clicked ? 4 : hovering ? 4 : 6,
          borderRadius: "9999px",
          background: hovering ? "#22d3ee" : "#f0abfc",
          boxShadow: hovering ? "0 0 10px #22d3ee" : "0 0 10px #f0abfc",
          opacity: visible ? 1 : 0,
          transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)",
        }}
      />
    </>
  );
}

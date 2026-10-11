"use client";
import { useEffect, useRef, useState } from "react";
export function GameCover({ src, title, priority = false, retry = true }: { src: string; title: string; priority?: boolean; retry?: boolean }) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) setFailed(true);
  }, [src, failed]);
  return failed ? <div className="zg-cover-fallback"><strong>{title}</strong><span>Artwork unavailable. The game page is still available.</span>{retry && <button onClick={() => setFailed(false)}>Retry artwork</button>}</div> : <img ref={imageRef} src={src} alt={`${title} game artwork`} width={960} height={540} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" onError={() => setFailed(true)} />;
}

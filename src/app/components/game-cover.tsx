"use client";
import { useEffect, useRef, useState } from "react";
export function GameCover({ src, title, priority = false, retry = true, locale = "en" }: { src: string; title: string; priority?: boolean; retry?: boolean; locale?: "en" | "zh-CN" }) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) setFailed(true);
  }, [src, failed]);
  return failed ? <div className="zg-cover-fallback"><strong>{title}</strong><span>{locale === "zh-CN" ? "图片暂时无法加载，攻略正文仍可阅读。" : "Artwork unavailable. The game page is still available."}</span>{retry && <button onClick={() => setFailed(false)}>{locale === "zh-CN" ? "重试图片" : "Retry artwork"}</button>}</div> : <img ref={imageRef} src={src} alt={locale === "zh-CN" ? title : `${title} game artwork`} width={960} height={540} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" onError={() => setFailed(true)} />;
}

"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, RefreshCw } from "lucide-react";
import { HOOD_PATH, hoodSources, hoodUpdates } from "../data/hood-warfare-2";
import type { HoodNewsResponse } from "../lib/hood-warfare-2-server";
import type { HoodStoreResponse } from "../lib/hood-warfare-2-store-server";

type LiveResponse = HoodNewsResponse & { store: HoodStoreResponse };
type LiveValue = { data: LiveResponse | null; loading: boolean; failed: boolean; now: number | null; reload: () => Promise<void> };
const LiveContext = createContext<LiveValue | null>(null);
export function useHoodLive() { const value = useContext(LiveContext); if (!value) throw new Error("Hood live provider missing"); return value; }
export function recentHoodSource(observedAt: string | null, now: number | null) { return observedAt !== null && now !== null && now - Date.parse(observedAt) >= 0 && now - Date.parse(observedAt) <= 3600000; }

function validResponse(value: unknown): value is LiveResponse {
  if (!value || typeof value !== "object") return false;
  const r = value as LiveResponse;
  if (!["ready","stale","unavailable"].includes(r.state) || !Array.isArray(r.items) || r.items.length>6) return false;
  if (r.state!=="unavailable" && (typeof r.observedAt!=="string" || !Number.isFinite(Date.parse(r.observedAt)))) return false;
  if (!r.items.every(item=>{
    if (!item || typeof item.id!=="string" || !/^\d{1,30}$/.test(item.id) || typeof item.title!=="string" || !item.title.trim() || typeof item.excerpt!=="string" || typeof item.date!=="string" || !Number.isFinite(Date.parse(item.date))) return false;
    try {const u=new URL(item.url);return u.protocol==="https:"&&!u.username&&!u.password&&!u.port&&["store.steampowered.com","steamcommunity.com"].includes(u.hostname);}catch{return false;}
  })) return false;
  const s=r.store;
  if(!s || !["ready","stale","unavailable"].includes(s.state)) return false;
  if(s.state==="unavailable") return s.data===null;
  const d=s.data;
  if(!d || typeof s.observedAt!=="string" || !Number.isFinite(Date.parse(s.observedAt)) || typeof d.name!=="string" || typeof d.isFree!=="boolean" || typeof d.comingSoon!=="boolean" || typeof d.releaseDate!=="string" || typeof d.supportedLanguages!=="string" || !d.platforms || ![d.platforms.windows,d.platforms.mac,d.platforms.linux].every(v=>typeof v==="boolean") || !d.pcRequirements || typeof d.pcRequirements.minimum!=="string" || typeof d.pcRequirements.recommended!=="string" || !Array.isArray(d.developers) || !d.developers.every(v=>typeof v==="string") || !Array.isArray(d.publishers) || !d.publishers.every(v=>typeof v==="string")) return false;
  return d.price===null || (d.price.currency==="CNY" && Number.isSafeInteger(d.price.initial) && d.price.initial>=0 && Number.isSafeInteger(d.price.final) && d.price.final>=0 && Number.isInteger(d.price.discountPercent) && d.price.discountPercent>=0 && d.price.discountPercent<=100);
}

export function HoodLiveProvider({ children, enabled = true }: { children: ReactNode; enabled?: boolean }) {
  const [data,setData]=useState<LiveResponse|null>(null);
  const [loading,setLoading]=useState(true);
  const [failed,setFailed]=useState(false);
  const [now,setNow]=useState<number|null>(null);
  const current=useRef<AbortController|null>(null);
  const active=useRef(false);
  const reload=useCallback(async()=>{
    if(current.current)return;
    const controller=new AbortController(); current.current=controller;
    setLoading(true);setFailed(false);
    const timeout=window.setTimeout(()=>controller.abort(),12000);
    try{const response=await fetch("/api/hood-warfare-2/",{cache:"no-store",signal:controller.signal});const result:unknown=await response.json();if((!response.ok&&response.status!==503)||!validResponse(result))throw new Error("Invalid live data");if(active.current&&current.current===controller)setData(result);}
    catch{if(active.current&&current.current===controller)setFailed(true);}
    finally{window.clearTimeout(timeout);if(current.current===controller){current.current=null;if(active.current){setLoading(false);setNow(Date.now());}}}
  },[]);
  useEffect(()=>{
    if(!enabled) { setLoading(false); return; }
    active.current=true;setNow(Date.now());void reload();
    const interval=window.setInterval(()=>{if(!document.hidden)void reload();},600000);
    const clock=window.setInterval(()=>setNow(Date.now()),30000);
    const visible=()=>{if(!document.hidden){setNow(Date.now());void reload();}};
    window.addEventListener("online",visible);document.addEventListener("visibilitychange",visible);
    return()=>{active.current=false;current.current?.abort();current.current=null;window.clearInterval(interval);window.clearInterval(clock);window.removeEventListener("online",visible);document.removeEventListener("visibilitychange",visible);};
  },[reload,enabled]);
  return <LiveContext.Provider value={{data,loading,failed,now,reload}}>{children}</LiveContext.Provider>;
}

export function HoodLatestBrief() {
  const {data,loading,failed,now}=useHoodLive();
  const usable=data&&data.state!=="unavailable"&&recentHoodSource(data.observedAt,now);
  const latest=usable?data.items[0]:undefined;
  const reviewed=latest&&hoodUpdates.find(item=>item.id===latest.id);
  const version=latest?.title.match(/\b\d+(?:\.\d+){2,}\b/)?.[0];
  return <div className="hw-version" role="status"><span>{usable&&(failed||data.state==="stale")?"LAST RETRIEVED ANNOUNCEMENT":"LATEST OFFICIAL ANNOUNCEMENT / AUTO SYNC"}</span><strong>{version||(latest?"New announcement":"—")}</strong>{latest?<>{reviewed?<Link href={`${HOOD_PATH}news/#update-${latest.id}`}>{reviewed.title}<ArrowRight size={15} aria-hidden="true" /></Link>:<a href={latest.url} target="_blank" rel="noopener noreferrer">{latest.title}<ArrowUpRight size={15} aria-hidden="true" /></a>}<p className="hw-note">{new Date(Date.parse(latest.date)+8*3600000).toISOString().slice(0,16).replace("T"," ")} UTC+8 · {reviewed?"Reviewed editorial summary":"Official announcement, pending editorial review"}</p></>:<Link href={`${HOOD_PATH}news/`}>{loading?"Checking Steam announcements…":usable?"No announcements returned. Browse the reviewed timeline.":"No verified announcement available. Browse the reviewed timeline."}<ArrowRight size={15} aria-hidden="true" /></Link>}</div>;
}

function formatRequirement(text: string) {
  return text.replace(/^(Minimum|Recommended):\s*/i, "")
    .replace(/\b(OS|Processor|Memory|Graphics|DirectX|Network|Storage|Sound Card|Additional Notes):/g, "\n$1:")
    .trim();
}

export function HoodLiveStore() {
  const {data,loading,failed,now,reload}=useHoodLive();
  const source=data?.store;
  const usable=source&&source.state!=="unavailable"&&source.data&&recentHoodSource(source.observedAt,now);
  const store=usable?source.data!:null;
  const stale=!!usable&&(failed||source.state==="stale");
  const platforms=store?[store.platforms.windows?"Windows":null,store.platforms.mac?"macOS":null,store.platforms.linux?"Linux":null].filter(Boolean).join(" / "):"";
  return <div className="hw-live-store" aria-busy={loading}><div className="hw-live-head"><p className="ed-eyebrow" role="status">{loading&&!store?"READING STEAM STORE DETAILS":stale?"LAST RETRIEVED STORE DETAILS / REFRESH FAILED":store?"STORE DETAILS / AUTO SYNC / CN REGION, CNY":"STORE DETAILS UNAVAILABLE"}</p><button type="button" className="ed-text-link" disabled={loading} onClick={()=>void reload()}>{loading?"Reading…":"Refresh store details"}<RefreshCw size={15} aria-hidden="true" /></button></div>{store?<><div className="hw-price"><span>{store.name} · {store.comingSoon?"Steam lists this game as coming soon":"Steam lists this game as released"}</span><strong>{store.isFree?"Free":store.price?`¥${(store.price.final/100).toFixed(2)}`:"Price not returned"}<small>Current official reading · CNY</small></strong><p>{store.price?`CN list price ¥${(store.price.initial/100).toFixed(2)} · ${store.price.discountPercent}% off.`:"Steam has not returned a CN-region price."} Prices and promotions vary by region. Your Steam store determines the checkout price.</p></div><p className="hw-note">Store checked: {source.observedAt!.replace("T"," ").slice(0,16)} UTC. Checks every 10 minutes while this page is visible, retaining the actual reading time.</p>{stale&&<p className="hw-notice">Steam could not be refreshed. These details retain their original reading time and are hidden after one hour. Check the official store before buying.</p>}<dl className="hw-store-facts"><div><dt>Platforms</dt><dd>{platforms||"Steam has not listed supported platforms"}</dd></div><div><dt>Languages</dt><dd>{store.supportedLanguages||"Steam has not provided language details"}</dd></div><div><dt>Release date</dt><dd>{store.releaseDate||"Steam has not provided a release date"}</dd></div><div><dt>Developer / publisher</dt><dd>{store.developers.join(", ")||"Not provided"} / {store.publishers.join(", ")||"Not provided"}</dd></div></dl><h3 className="hw-subheading">Official Steam requirements, synced with the store.</h3><div className="hw-live-requirements"><div><h4>Minimum requirements</h4><p>{store.pcRequirements.minimum?formatRequirement(store.pcRequirements.minimum):"Steam has not returned minimum requirements."}</p></div><div><h4>Recommended requirements</h4><p>{store.pcRequirements.recommended?formatRequirement(store.pcRequirements.recommended):"Steam has not returned recommended requirements."}</p></div></div><p className="hw-note">Requirements and language listings are quoted from Steam. ZowGame has not independently tested frame rates or compatibility on every device.</p></>:<p className={loading?"hw-note":"hw-notice"}>{loading?"Checking official prices, platforms, languages and requirements.":"No verified store details are available. Refresh to try again or open Steam directly; an old price will not be presented as a new reading."}</p>}<a className="ed-text-link" href={hoodSources.store.url} target="_blank" rel="noopener noreferrer">Check and buy on Steam<ArrowUpRight size={15} aria-hidden="true" /></a><noscript><p className="hw-notice">Live store details need JavaScript. Open the official Steam store directly.</p></noscript></div>;
}

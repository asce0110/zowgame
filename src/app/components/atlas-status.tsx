"use client";
import { useEffect, useState } from "react";
import { RefreshCw, WifiOff } from "lucide-react";
export function AtlasConnection() {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update(); window.addEventListener("online", update); window.addEventListener("offline", update);
    return () => { window.removeEventListener("online", update); window.removeEventListener("offline", update); };
  }, []);
  if (!offline) return null;
  return <div className="atlas-offline ls-offline" role="status"><WifiOff size={18} aria-hidden="true" /><p>You’re offline. You can read this page; reconnect to search or open another guide.</p><button type="button" onClick={() => window.location.reload()}><RefreshCw size={15} aria-hidden="true" />Try again</button></div>;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Start loader on internal link clicks (capture phase)
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented) return;
      const el = (e.target as HTMLElement)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!el) return;

      const href = el.getAttribute("href") || "";
      const target = el.getAttribute("target");
      const isInternal = href.startsWith("/") && !href.startsWith("//");
      const isNewTab = target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

      if (!isInternal || isNewTab) return;
      start(); // show loader immediately on click
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  function start() {
    if (timerRef.current !== null) return;
    // tiny delay to avoid flicker on super-fast transitions
    timerRef.current = window.setTimeout(() => {
      setVisible(true);
      document.documentElement.classList.add("route-loading");
    }, 80);
  }

  // Hide when the URL actually changes (new route mounted)
  useEffect(() => {
    if (timerRef.current === null && !visible) return;

    const stop = () => {
      setVisible(false);
      document.documentElement.classList.remove("route-loading");
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    // keep it on-screen briefly so it feels smooth
    const t = window.setTimeout(stop, visible ? 300 : 0);
    return () => window.clearTimeout(t);
  }, [pathname, visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 select-none">
        <img
          src="/favicon.ico"
          alt="Loading"
          className="h-10 w-10"
        />
        <div className="h-8 w-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        <p className="text-white/80 text-xs tracking-wide">Loading…</p>
      </div>
    </div>
  );
}

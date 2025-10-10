"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const SHOW_DELAY = 80;         // avoid micro flicker
const MIN_VISIBLE = 350;       // keep at least this long once visible
const HARD_TIMEOUT = 20000;    // safety: never stuck forever

export default function RouteLoader() {
  const pathname = usePathname();
  const [active, setActive] = useState(false); // overlay visible?
  const shownAtRef = useRef<number>(0);
  const showDelayRef = useRef<number | null>(null);
  const hideDelayRef = useRef<number | null>(null);
  const hardTimeoutRef = useRef<number | null>(null);

  const show = useMemo(
    () => () => {
      if (showDelayRef.current || active) return;
      showDelayRef.current = window.setTimeout(() => {
        shownAtRef.current = Date.now();
        setActive(true);
        document.documentElement.classList.add("route-loading");
        // hard safety
        hardTimeoutRef.current = window.setTimeout(forceHide, HARD_TIMEOUT);
      }, SHOW_DELAY);
    },
    [active]
  );

  const hide = useMemo(
    () => () => {
      // clear pending show if it hasn't actually shown yet
      if (showDelayRef.current) {
        window.clearTimeout(showDelayRef.current);
        showDelayRef.current = null;
      }
      const elapsed = Date.now() - shownAtRef.current;
      const wait = Math.max(0, MIN_VISIBLE - elapsed);
      if (hideDelayRef.current) {
        window.clearTimeout(hideDelayRef.current);
      }
      hideDelayRef.current = window.setTimeout(() => {
        setActive(false);
        document.documentElement.classList.remove("route-loading");
        if (hardTimeoutRef.current) {
          window.clearTimeout(hardTimeoutRef.current);
          hardTimeoutRef.current = null;
        }
      }, wait);
    },
    []
  );

  const forceHide = () => {
    setActive(false);
    document.documentElement.classList.remove("route-loading");
    if (showDelayRef.current) {
      window.clearTimeout(showDelayRef.current);
      showDelayRef.current = null;
    }
    if (hideDelayRef.current) {
      window.clearTimeout(hideDelayRef.current);
      hideDelayRef.current = null;
    }
    if (hardTimeoutRef.current) {
      window.clearTimeout(hardTimeoutRef.current);
      hardTimeoutRef.current = null;
    }
  };

  // 1) Internal link clicks -> start
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented) return;
      const anchor = (e.target as HTMLElement)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const target = anchor.getAttribute("target") || "";
      const isNewTab = target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

      if (isNewTab) return;
      if (href.startsWith("#")) return; // same-page anchor

      // resolve absolute to compare
      const url = new URL(href, window.location.origin);
      const isInternal = url.origin === window.location.origin;
      if (!isInternal) return;

      // same path + only hash change → ignore
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      show();
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [show]);

  // 2) Full page unloads (external nav / reload)
  useEffect(() => {
    const onBeforeUnload = () => show();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [show]);

  // 3) React to real route change: keep shown (if already) and set a fallback hide.
  //    If app/loading.tsx fires stop event, that will hide sooner.
  useEffect(() => {
    if (!active) return;
    const fallback = window.setTimeout(hide, 600); // in case no loading.tsx runs (instant cached pages)
    return () => window.clearTimeout(fallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, active]);

  // 4) Listen to global events from app/loading.tsx
  useEffect(() => {
    const onStart = () => show();
    const onStop = () => hide();
    window.addEventListener("route-loader:start", onStart);
    window.addEventListener("route-loader:stop", onStop);
    return () => {
      window.removeEventListener("route-loader:start", onStart);
      window.removeEventListener("route-loader:stop", onStop);
    };
  }, [show, hide]);

  // Overlay is ALWAYS mounted → favicon loads once, no flicker
  return (
    <div
      id="route-loader"
      aria-hidden={!active}
      aria-busy={active}
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-200
        ${active ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <div className="relative flex flex-col items-center gap-3 select-none">
        {/* keep the img in DOM always → instant */}
        <img src="/favicon.ico" alt="Loading" className="h-10 w-10" />
        <div className="h-8 w-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        <p className="text-white/80 text-xs tracking-wide">Loading…</p>
      </div>
    </div>
  );
}

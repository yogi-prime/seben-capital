"use client";
import { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    // tell the global overlay that real route/data loading started
    window.dispatchEvent(new Event("route-loader:start"));
    document.documentElement.classList.add("route-loading");
    return () => {
      // tell it to stop when the new route is ready/hydrated
      document.documentElement.classList.remove("route-loading");
      window.dispatchEvent(new Event("route-loader:stop"));
    };
  }, []);
  return null; // UI overlay is provided globally by RouteLoader
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    // Fire-and-forget pageview for the lightweight dashboard traffic tab.
    // (This is not a replacement for real analytics; it's a starter.)
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        ref: typeof document !== "undefined" ? document.referrer : undefined,
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}



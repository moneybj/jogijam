"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function BuyNowButton({
  merchandiseId,
  quantity = 1,
  className,
  children = "Buy now",
}: {
  merchandiseId: string;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className={className}>
      <button
        type="button"
        disabled={loading}
        onClick={async () => {
          setError(null);
          setLoading(true);
          try {
            const res = await fetch("/api/shopify/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ merchandiseId, quantity }),
            });
            const json = (await res.json()) as
              | { checkoutUrl: string }
              | { error: string };
            if (!res.ok || "error" in json) {
              throw new Error("error" in json ? json.error : "Checkout failed.");
            }
            window.location.href = json.checkoutUrl;
          } catch (e) {
            setError(e instanceof Error ? e.message : "Checkout failed.");
          } finally {
            setLoading(false);
          }
        }}
        className={cn(
          "inline-flex w-full items-center justify-center rounded bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-background hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {loading ? "Redirecting…" : children}
      </button>
      {error ? (
        <p className="mt-2 text-xs text-foreground/70">
          {error} (Check Shopify env vars.)
        </p>
      ) : null}
    </div>
  );
}



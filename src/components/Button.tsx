import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30";

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  children: ReactNode;
}) {
  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-foreground/90"
      : variant === "secondary"
        ? "bg-transparent text-foreground ring-1 ring-black/20 hover:bg-black/5"
        : "text-foreground/70 hover:text-foreground";

  return (
    <Link href={href} className={cn(base, styles, className)}>
      {children}
    </Link>
  );
}



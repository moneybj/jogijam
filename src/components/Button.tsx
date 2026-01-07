import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jjb-berry/40";

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
      ? "bg-jjb-berry text-white hover:bg-jjb-berry/90"
      : variant === "secondary"
        ? "bg-white/70 text-foreground ring-1 ring-black/10 hover:bg-white"
        : "text-foreground/80 hover:text-foreground";

  return (
    <Link href={href} className={cn(base, styles, className)}>
      {children}
    </Link>
  );
}



import Link from "next/link";

export function BrandMark({
  withTagline = false,
  className,
}: {
  withTagline?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={[
        "group inline-flex items-center gap-3 no-underline",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Jogi Jam Bars home"
    >
      <span
        className="grid size-11 place-items-center rounded-2xl bg-white text-foreground ring-1 ring-black/15"
        aria-hidden="true"
      >
        {/* Simple mascot mark (baby elephant trunk) */}
        <svg
          viewBox="0 0 64 64"
          className="size-7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M42.6 38.9c3.7-3 6-7.6 6-12.8C48.6 16.1 40.6 10 32 10S15.4 16.1 15.4 26.1c0 8.6 5.9 15.8 13.9 15.8 3.4 0 6.6-1.2 9-3.3"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M40 36c2.5 3.1 2.8 7 .3 9.4-2.9 2.8-7.9 2.2-11.2-1.4"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="25" cy="26" r="2.4" fill="currentColor" />
          <circle cx="39" cy="26" r="2.4" fill="currentColor" />
        </svg>
      </span>

      <span className="leading-none">
        <span className="block font-[var(--font-display)] text-lg tracking-tight text-foreground">
          Jogi Jam Bars
        </span>
        {withTagline ? (
          <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-foreground/60">
            Jam‑packed with joy &amp; goodness.
          </span>
        ) : null}
      </span>
    </Link>
  );
}



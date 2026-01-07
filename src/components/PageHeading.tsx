import { cn } from "@/lib/cn";

export function PageHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="text-sm font-semibold text-foreground/85">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 font-[var(--font-display)] text-4xl tracking-tight sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-foreground/85 sm:text-foreground/75">
          {description}
        </p>
      ) : null}
    </div>
  );
}



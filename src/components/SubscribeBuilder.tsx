"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Cadence = "weekly" | "monthly";
type Mode = "subscription" | "alacarte";

type Flavor = {
  id: string;
  name: string;
  line: "Kids" | "Family";
};

type CustomBar = {
  id: string;
  nickname: string;
  base: "Date + Oat" | "Date + Nut/Seed" | "Date + Coconut";
  addIns: Array<
    | "Cacao nibs"
    | "Coconut flakes"
    | "Chia"
    | "Pumpkin seed"
    | "Almond"
    | "Cashew"
    | "Strawberry"
    | "Mango"
    | "Coffee"
  >;
  spiceNote: "None" | "Light" | "Cozy";
  spiceFocus: "Cinnamon" | "Cardamom" | "Turmeric" | "Ginger";
  nutFree: boolean;
  qty: number;
};

const flavors: Flavor[] = [
  { id: "kids-strawberry", name: "Strawberry Jammin’", line: "Kids" },
  { id: "kids-cocoa", name: "Cocoa Loco", line: "Kids" },
  { id: "kids-mango", name: "Mighty Mango", line: "Kids" },
  { id: "kids-banana", name: "Banana Monkey Madness", line: "Kids" },
  { id: "fam-chai", name: "Golden Chai Bliss", line: "Family" },
  { id: "fam-mocha", name: "Mocha Morning", line: "Family" },
  { id: "fam-cardamom", name: "Cardamom Crunch", line: "Family" },
  { id: "fam-fig", name: "Fig & Walnut Fiesta", line: "Family" },
];

const boxSizes = [8, 12, 24] as const;

function formatLines(body: string) {
  // Mail clients can be picky; keep it simple.
  return body.replace(/\n/g, "\r\n");
}

function Section({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[22px] border border-black/10 bg-white",
        className,
      )}
    >
      <div className="border-b border-black/10 bg-jjb-surface px-6 py-5 sm:px-8">
        <p className="font-[var(--font-display)] text-xl tracking-tight sm:text-2xl">
          {title}
        </p>
        {subtitle ? (
          <p className="mt-2 text-sm leading-6 text-foreground/70">{subtitle}</p>
        ) : null}
      </div>
      <div className="p-6 sm:p-8">{children}</div>
    </section>
  );
}

function Chip({
  selected,
  children,
  onClick,
}: {
  selected?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
        selected
          ? "border-black/40 bg-black/5 text-foreground"
          : "border-black/15 bg-white text-foreground/70 hover:bg-black/5 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Stepper({
  value,
  onChange,
  min = 0,
  max = 99,
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label?: string;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">
          {label}
        </span>
      ) : null}
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid size-9 place-items-center rounded border border-black/15 bg-white text-foreground hover:bg-black/5"
        aria-label="Decrease"
      >
        −
      </button>
      <div className="grid size-9 place-items-center rounded border border-black/10 bg-jjb-surface text-sm font-semibold">
        {value}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="grid size-9 place-items-center rounded border border-black/15 bg-white text-foreground hover:bg-black/5"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

export function SubscribeBuilder() {
  const [mode, setMode] = useState<Mode>("subscription");
  const [cadence, setCadence] = useState<Cadence>("monthly");
  const [boxSize, setBoxSize] = useState<(typeof boxSizes)[number]>(12);

  const [qty, setQty] = useState<Record<string, number>>(() =>
    Object.fromEntries(flavors.map((f) => [f.id, 0])),
  );

  const [customBars, setCustomBars] = useState<CustomBar[]>([]);
  const [showCustom, setShowCustom] = useState(false);

  const newId = () =>
    globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

  const [draftCustom, setDraftCustom] = useState<CustomBar>(() => ({
    id: newId(),
    nickname: "My Custom Bar",
    base: "Date + Oat",
    addIns: ["Cacao nibs", "Coconut flakes"],
    spiceNote: "Light",
    spiceFocus: "Cardamom",
    nutFree: false,
    qty: 2,
  }));

  const totalPreset = useMemo(
    () => Object.values(qty).reduce((a, b) => a + b, 0),
    [qty],
  );

  const totalCustom = useMemo(
    () => customBars.reduce((a, b) => a + b.qty, 0),
    [customBars],
  );

  const total = totalPreset + totalCustom;
  const remaining = mode === "subscription" ? Math.max(0, boxSize - total) : 0;

  const grouped = useMemo(() => {
    const kids = flavors.filter((f) => f.line === "Kids");
    const family = flavors.filter((f) => f.line === "Family");
    return { kids, family };
  }, []);

  const orderSummary = useMemo(() => {
    const lines: string[] = [];
    lines.push(`Mode: ${mode === "subscription" ? "Subscription" : "À la carte"}`);
    if (mode === "subscription") {
      lines.push(`Cadence: ${cadence}`);
      lines.push(`Box size: ${boxSize} bars`);
      lines.push(`Filled: ${total}/${boxSize}`);
    } else {
      lines.push(`Bars selected: ${total}`);
    }

    lines.push("");
    lines.push("Mix & Match:");
    for (const f of flavors) {
      const n = qty[f.id] ?? 0;
      if (n > 0) lines.push(`- ${f.name}: ${n}`);
    }

    if (customBars.length) {
      lines.push("");
      lines.push("Custom bars:");
      for (const c of customBars) {
        lines.push(
          `- ${c.nickname} (x${c.qty}) | base: ${c.base} | add-ins: ${c.addIns.join(
            ", ",
          )} | spice: ${c.spiceNote} ${c.spiceFocus} | nut-free: ${c.nutFree ? "yes" : "no"}`,
        );
      }
    }

    lines.push("");
    lines.push("Notes:");
    lines.push("- Please confirm allergens and final nutrition facts per flavor.");
    return lines.join("\n");
  }, [boxSize, cadence, customBars, mode, qty, total]);

  const mailto = useMemo(() => {
    const subject =
      mode === "subscription"
        ? `Jogi Jam Bars subscription (${cadence})`
        : "Jogi Jam Bars à la carte order";

    const body = formatLines(orderSummary);
    return `mailto:hello@jogijambars.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }, [cadence, mode, orderSummary]);

  function clampToBox(nextQty: Record<string, number>, nextCustom: CustomBar[]) {
    if (mode !== "subscription") return { nextQty, nextCustom };
    const presetTotal = Object.values(nextQty).reduce((a, b) => a + b, 0);
    const customTotal = nextCustom.reduce((a, b) => a + b.qty, 0);
    const nextTotal = presetTotal + customTotal;
    if (nextTotal <= boxSize) return { nextQty, nextCustom };
    return { nextQty, nextCustom }; // allow overfill but warn; keeps UX simple
  }

  const overfill = mode === "subscription" ? total > boxSize : false;

  return (
    <div className="grid gap-6">
      <Section
        title="Choose how you want to order"
        subtitle="Subscribe for weekly/monthly delivery, or keep it simple with à la carte."
      >
        <div className="flex flex-wrap gap-2">
          <Chip selected={mode === "subscription"} onClick={() => setMode("subscription")}>
            Subscription
          </Chip>
          <Chip selected={mode === "alacarte"} onClick={() => setMode("alacarte")}>
            À la carte
          </Chip>
        </div>

        {mode === "subscription" ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[18px] border border-black/10 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                Delivery cadence
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip selected={cadence === "weekly"} onClick={() => setCadence("weekly")}>
                  Weekly
                </Chip>
                <Chip selected={cadence === "monthly"} onClick={() => setCadence("monthly")}>
                  Monthly
                </Chip>
              </div>
              <p className="mt-3 text-sm leading-6 text-foreground/70">
                Mix & match a box and we’ll deliver it automatically.
              </p>
            </div>

            <div className="rounded-[18px] border border-black/10 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                Box size (mix & match)
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {boxSizes.map((n) => (
                  <Chip key={n} selected={boxSize === n} onClick={() => setBoxSize(n)}>
                    {n} bars
                  </Chip>
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-foreground/70">
                You can include both Kids + Family flavors in the same box.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-[18px] border border-black/10 bg-jjb-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
              À la carte stays available
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/70">
              Pick any number of bars — mix and match freely. (Subscriptions are optional.)
            </p>
          </div>
        )}
      </Section>

      <Section
        title="Mix & match flavors"
        subtitle={
          mode === "subscription"
            ? "Fill your box. Add a custom bar if you want."
            : "Pick your favorites. Add a custom bar anytime."
        }
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
              {mode === "subscription" ? "Progress" : "Selection"}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {mode === "subscription" ? (
                <>
                  Filled <span className="font-semibold text-foreground">{total}</span> of{" "}
                  <span className="font-semibold text-foreground">{boxSize}</span> bars{" "}
                  {remaining > 0 ? (
                    <>
                      · <span className="font-semibold text-foreground">{remaining}</span>{" "}
                      remaining
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  Selected <span className="font-semibold text-foreground">{total}</span>{" "}
                  bars
                </>
              )}
            </p>
            {overfill ? (
              <p className="mt-2 text-sm text-foreground/70">
                You’re over by{" "}
                <span className="font-semibold text-foreground">
                  {total - boxSize}
                </span>
                . Adjust quantities to fit your box size.
              </p>
            ) : null}
          </div>

          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70 hover:text-foreground"
            onClick={() => {
              setQty(Object.fromEntries(flavors.map((f) => [f.id, 0])));
              setCustomBars([]);
            }}
          >
            Clear selections
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[18px] border border-black/10 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
              Kids line
            </p>
            <div className="mt-4 grid gap-4">
              {grouped.kids.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between gap-4 border-b border-black/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-semibold">{f.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-foreground/60">
                      Date-sweetened
                    </p>
                  </div>
                  <Stepper
                    value={qty[f.id] ?? 0}
                    onChange={(next) => {
                      const nextQty = { ...qty, [f.id]: next };
                      const { nextQty: clamped } = clampToBox(nextQty, customBars);
                      setQty(clamped);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[18px] border border-black/10 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
              Family line
            </p>
            <div className="mt-4 grid gap-4">
              {grouped.family.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between gap-4 border-b border-black/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-semibold">{f.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-foreground/60">
                      Cozy spices
                    </p>
                  </div>
                  <Stepper
                    value={qty[f.id] ?? 0}
                    onChange={(next) => {
                      const nextQty = { ...qty, [f.id]: next };
                      const { nextQty: clamped } = clampToBox(nextQty, customBars);
                      setQty(clamped);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[18px] border border-black/10 bg-jjb-surface p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                Custom bar option
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground/70">
                Add one “build-your-own” bar recipe to your order (great for dietary preferences or adventurous flavors).
              </p>
            </div>
            <Chip selected={showCustom} onClick={() => setShowCustom((s) => !s)}>
              {showCustom ? "Hide builder" : "Customize a bar"}
            </Chip>
          </div>

          {showCustom ? (
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[18px] border border-black/10 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                  Build details
                </p>

                <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">
                  Nickname
                  <input
                    value={draftCustom.nickname}
                    onChange={(e) =>
                      setDraftCustom((c) => ({ ...c, nickname: e.target.value }))
                    }
                    className="mt-2 w-full rounded border border-black/15 bg-white px-4 py-3 text-sm"
                  />
                </label>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">
                      Base
                    </p>
                    <div className="mt-2 grid gap-2">
                      {(["Date + Oat", "Date + Nut/Seed", "Date + Coconut"] as const).map(
                        (b) => (
                          <Chip
                            key={b}
                            selected={draftCustom.base === b}
                            onClick={() => setDraftCustom((c) => ({ ...c, base: b }))}
                          >
                            {b}
                          </Chip>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">
                      Quantity
                    </p>
                    <div className="mt-2">
                      <Stepper
                        value={draftCustom.qty}
                        min={1}
                        max={mode === "subscription" ? 24 : 99}
                        onChange={(next) => setDraftCustom((c) => ({ ...c, qty: next }))}
                      />
                    </div>
                    <label className="mt-4 flex items-center gap-2 text-sm text-foreground/70">
                      <input
                        type="checkbox"
                        checked={draftCustom.nutFree}
                        onChange={(e) =>
                          setDraftCustom((c) => ({ ...c, nutFree: e.target.checked }))
                        }
                      />
                      Nut-free preference (we’ll adapt add-ins)
                    </label>
                  </div>
                </div>
              </div>

              <div className="rounded-[18px] border border-black/10 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                  Flavor direction
                </p>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">
                    Add-ins (pick a few)
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(
                      [
                        "Cacao nibs",
                        "Coconut flakes",
                        "Chia",
                        "Pumpkin seed",
                        "Almond",
                        "Cashew",
                        "Strawberry",
                        "Mango",
                        "Coffee",
                      ] as const
                    ).map((a) => {
                      const selected = draftCustom.addIns.includes(a);
                      return (
                        <Chip
                          key={a}
                          selected={selected}
                          onClick={() =>
                            setDraftCustom((c) => ({
                              ...c,
                              addIns: selected
                                ? c.addIns.filter((x) => x !== a)
                                : [...c.addIns, a],
                            }))
                          }
                        >
                          {a}
                        </Chip>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">
                      Spice note
                    </p>
                    <div className="mt-2 grid gap-2">
                      {(["None", "Light", "Cozy"] as const).map((s) => (
                        <Chip
                          key={s}
                          selected={draftCustom.spiceNote === s}
                          onClick={() => setDraftCustom((c) => ({ ...c, spiceNote: s }))}
                        >
                          {s}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">
                      Spice focus
                    </p>
                    <div className="mt-2 grid gap-2">
                      {(["Cinnamon", "Cardamom", "Turmeric", "Ginger"] as const).map(
                        (s) => (
                          <Chip
                            key={s}
                            selected={draftCustom.spiceFocus === s}
                            onClick={() =>
                              setDraftCustom((c) => ({ ...c, spiceFocus: s }))
                            }
                          >
                            {s}
                          </Chip>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70 hover:text-foreground"
                    onClick={() =>
                      setDraftCustom((c) => ({
                        ...c,
                        addIns: ["Cacao nibs", "Coconut flakes"],
                        spiceNote: "Light",
                        spiceFocus: "Cardamom",
                        nutFree: false,
                      }))
                    }
                  >
                    Reset
                  </button>
                </div>

                <button
                  type="button"
                  className="mt-3 w-full rounded bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-background hover:bg-foreground/90"
                  onClick={() => {
                    const next = [...customBars, { ...draftCustom, id: newId() }];
                    const { nextCustom } = clampToBox(qty, next);
                    setCustomBars(nextCustom);
                    setShowCustom(false);
                    setDraftCustom((c) => ({
                      ...c,
                      id: newId(),
                      nickname: "My Custom Bar",
                      qty: 2,
                    }));
                  }}
                >
                  Add custom bar to {mode === "subscription" ? "box" : "order"}
                </button>
              </div>
            </div>
          ) : null}

          {customBars.length ? (
            <div className="mt-6 rounded-[18px] border border-black/10 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                Your custom bars
              </p>
              <div className="mt-4 grid gap-3">
                {customBars.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col justify-between gap-3 rounded-[18px] border border-black/10 bg-white p-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="text-sm font-semibold">
                        {c.nickname} <span className="text-foreground/60">(x{c.qty})</span>
                      </p>
                      <p className="mt-1 text-sm text-foreground/70">
                        {c.base} · {c.addIns.join(", ")} · {c.spiceNote} {c.spiceFocus}
                        {c.nutFree ? " · nut-free pref" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Stepper
                        value={c.qty}
                        min={1}
                        max={mode === "subscription" ? 24 : 99}
                        onChange={(next) => {
                          const nextCustom = customBars.map((x) =>
                            x.id === c.id ? { ...x, qty: next } : x,
                          );
                          const { nextCustom: clamped } = clampToBox(qty, nextCustom);
                          setCustomBars(clamped);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setCustomBars((arr) => arr.filter((x) => x.id !== c.id))}
                        className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60 hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Section>

      <Section
        title="Checkout (placeholder)"
        subtitle="No payment flow is wired yet — but you can send us your selections and we’ll confirm pricing, allergens, and delivery."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
              Summary
            </p>
            <pre className="mt-3 whitespace-pre-wrap rounded-[18px] border border-black/10 bg-jjb-surface p-5 text-sm leading-6 text-foreground/80">
              {orderSummary}
            </pre>
          </div>
          <div className="rounded-[18px] border border-black/10 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
              Next step
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground/70">
              Tap below to email your order summary.
            </p>

            <div className="mt-5 grid gap-3">
              <button
                type="button"
                disabled={overfill}
                onClick={() => {
                  if (overfill) return;
                  window.location.href = mailto;
                }}
                className={cn(
                  "inline-flex items-center justify-center rounded bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-background hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60",
                )}
              >
                Email my {mode === "subscription" ? "subscription" : "order"}
              </button>
              <p className="text-xs text-foreground/60">
                Tip: Want a different box size or a nut-free mix? Mention it in the email.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}



"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type Tab = "seo" | "llm" | "traffic" | "keywords" | "prompts";

type Prompt = {
  id: string;
  title: string;
  prompt: string;
  tags: string[];
};

type Keyword = {
  id: string;
  phrase: string;
  intent: "informational" | "commercial" | "navigational";
  notes?: string;
};

const STORAGE_KEY = "jjb_dashboard_v1";

function uid() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function Card({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[22px] border border-black/10 bg-white", className)}>
      <div className="border-b border-black/10 bg-jjb-surface px-6 py-5 sm:px-8">
        <p className="font-[var(--font-display)] text-xl tracking-tight sm:text-2xl">
          {title}
        </p>
        {subtitle ? (
          <p className="mt-2 text-sm leading-6 text-foreground/70">{subtitle}</p>
        ) : null}
      </div>
      <div className="p-6 sm:p-8">{children}</div>
    </div>
  );
}

function Pill({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
        active
          ? "border-black/40 bg-black/5 text-foreground"
          : "border-black/15 bg-white text-foreground/70 hover:bg-black/5 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function ScoreRow({ label, ok, note }: { label: string; ok: boolean; note?: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-black/10 py-3 last:border-b-0">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        {note ? <p className="mt-1 text-sm text-foreground/70">{note}</p> : null}
      </div>
      <span
        className={cn(
          "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
          ok ? "border-black/20 bg-white text-foreground" : "border-black/15 bg-jjb-surface text-foreground/70",
        )}
      >
        {ok ? "OK" : "Needs work"}
      </span>
    </div>
  );
}

export function DashboardApp() {
  const [tab, setTab] = useState<Tab>("seo");
  const [keywords, setKeywords] = useState<Keyword[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as { keywords?: Keyword[] };
      return parsed.keywords ?? [];
    } catch {
      return [];
    }
  });
  const [prompts, setPrompts] = useState<Prompt[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as { prompts?: Prompt[] };
      return parsed.prompts ?? [];
    } catch {
      return [];
    }
  });
  const [traffic, setTraffic] = useState<{
    days: number;
    totalViews: number;
    topPages: Array<{ path: string; views: number }>;
    note: string;
  } | null>(null);

  const [newKeyword, setNewKeyword] = useState("");
  const [newPromptTitle, setNewPromptTitle] = useState("Homepage rewrite prompt");
  const [newPromptText, setNewPromptText] = useState(
    "Rewrite the Jogi Jam Bars homepage copy in a warm, honest, playful voice. Avoid medical claims. Keep it concise and parent-trustworthy. Include: hero headline, subheadline, 3 benefit bullets, and one CTA.",
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ keywords, prompts }));
  }, [keywords, prompts]);

  useEffect(() => {
    if (tab !== "traffic") return;
    fetch("/api/track?days=7")
      .then((r) => r.json())
      .then((j) => setTraffic(j))
      .catch(() => setTraffic(null));
  }, [tab]);

  const seoChecks = useMemo(() => {
    // Lightweight “health checks” based on known features we added.
    // (A full crawler audit is out of scope without external tooling.)
    return [
      {
        label: "robots.txt present",
        ok: true,
        note: "Served by Next metadata route at /robots.txt",
      },
      {
        label: "sitemap.xml present",
        ok: true,
        note: "Served by Next metadata route at /sitemap.xml",
      },
      {
        label: "Canonical + metadataBase set",
        ok: true,
        note: "Configure SITE_URL in production for correct canonical URLs",
      },
      {
        label: "Structured data (JSON-LD)",
        ok: false,
        note: "Recommended next: Organization + Product schema on key pages",
      },
      {
        label: "Core Web Vitals monitoring",
        ok: false,
        note: "Recommended next: connect GA4 or a privacy-first analytics tool",
      },
    ] as const;
  }, []);

  const llmChecks = useMemo(() => {
    return [
      {
        label: "llms.txt present",
        ok: true,
        note: "High-signal brand + page index at /llms.txt",
      },
      {
        label: "FAQ-style content",
        ok: true,
        note: "FAQ page supports direct answers in search and LLMs",
      },
      {
        label: "Prompt packs maintained",
        ok: prompts.length > 0,
        note: "Store prompts for consistent, on-brand generation",
      },
      {
        label: "Keyword + entity coverage maintained",
        ok: keywords.length > 0,
        note: "Track target phrases + brand entities for GEO visibility",
      },
    ] as const;
  }, [keywords.length, prompts.length]);

  function exportJson() {
    const blob = new Blob([JSON.stringify({ keywords, prompts }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jjb-dashboard-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importJson(file: File) {
    const text = await file.text();
    const parsed = JSON.parse(text) as { keywords?: Keyword[]; prompts?: Prompt[] };
    setKeywords(parsed.keywords ?? []);
    setPrompts(parsed.prompts ?? []);
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-2">
        <Pill active={tab === "seo"} onClick={() => setTab("seo")}>
          SEO
        </Pill>
        <Pill active={tab === "llm"} onClick={() => setTab("llm")}>
          GEO / LLM
        </Pill>
        <Pill active={tab === "traffic"} onClick={() => setTab("traffic")}>
          Traffic
        </Pill>
        <Pill active={tab === "keywords"} onClick={() => setTab("keywords")}>
          Keywords
        </Pill>
        <Pill active={tab === "prompts"} onClick={() => setTab("prompts")}>
          Prompt packs
        </Pill>

        <div className="ml-auto flex flex-wrap gap-2">
          <Pill onClick={exportJson}>Export</Pill>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) importJson(f);
              }}
            />
            <span className="inline-flex rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70 hover:bg-black/5 hover:text-foreground">
              Import
            </span>
          </label>
        </div>
      </div>

      {tab === "seo" ? (
        <Card
          title="SEO scorecard"
          subtitle="This is a lightweight checklist. For full audits, connect Google Search Console + a crawler."
        >
          <div className="grid gap-2">
            {seoChecks.map((c) => (
              <ScoreRow key={c.label} label={c.label} ok={c.ok} note={c.note} />
            ))}
          </div>
        </Card>
      ) : null}

      {tab === "llm" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card
            title="GEO / LLM optimization"
            subtitle="Keep brand facts easy to find and consistent across pages."
          >
            <div className="grid gap-2">
              {llmChecks.map((c) => (
                <ScoreRow key={c.label} label={c.label} ok={c.ok} note={c.note} />
              ))}
            </div>
          </Card>

          <Card title="llms.txt preview" subtitle="Served at /llms.txt">
            <pre className="whitespace-pre-wrap rounded-[18px] border border-black/10 bg-jjb-surface p-5 text-sm leading-6 text-foreground/80">
              {`# Jogi Jam Bars

High-signal brand facts, pages, and writing guidelines.

Open: /llms.txt`}
            </pre>
            <p className="mt-3 text-sm text-foreground/70">
              Tip: keep this factual and up-to-date (products, policies, contact).
            </p>
          </Card>
        </div>
      ) : null}

      {tab === "traffic" ? (
        <Card
          title="Traffic (lightweight)"
          subtitle="Counts pageviews recorded by a simple in-app beacon. Not a replacement for GA4/Plausible."
        >
          {traffic ? (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-[18px] border border-black/10 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">
                  Last {traffic.days} days
                </p>
                <p className="mt-3 font-[var(--font-display)] text-3xl tracking-tight">
                  {traffic.totalViews}
                </p>
                <p className="mt-2 text-sm text-foreground/70">Total pageviews</p>
              </div>
              <div className="lg:col-span-2 rounded-[18px] border border-black/10 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">
                  Top pages
                </p>
                <div className="mt-4 grid gap-2">
                  {traffic.topPages.map((p) => (
                    <div
                      key={p.path}
                      className="flex items-center justify-between border-b border-black/10 py-2 last:border-b-0"
                    >
                      <span className="text-sm font-semibold">{p.path}</span>
                      <span className="text-sm text-foreground/70">{p.views}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-foreground/60 lg:col-span-3">{traffic.note}</p>
            </div>
          ) : (
            <p className="text-sm text-foreground/70">No traffic data yet.</p>
          )}
        </Card>
      ) : null}

      {tab === "keywords" ? (
        <Card
          title="Keywords"
          subtitle="Track the phrases you want the site and AI assistants to associate with Jogi Jam Bars."
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="e.g. organic date bars for kids"
              className="w-full rounded border border-black/15 bg-white px-4 py-3 text-sm"
            />
            <button
              type="button"
              className="rounded bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-background hover:bg-foreground/90"
              onClick={() => {
                const phrase = newKeyword.trim();
                if (!phrase) return;
                setKeywords((k) => [
                  { id: uid(), phrase, intent: "commercial" },
                  ...k,
                ]);
                setNewKeyword("");
              }}
            >
              Add
            </button>
          </div>

          <div className="mt-6 grid gap-3">
            {keywords.length ? (
              keywords.map((k) => (
                <div
                  key={k.id}
                  className="flex flex-col gap-2 rounded-[18px] border border-black/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold">{k.phrase}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-foreground/60">
                      {k.intent}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60 hover:text-foreground"
                    onClick={() => setKeywords((arr) => arr.filter((x) => x.id !== k.id))}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-foreground/70">No keywords yet.</p>
            )}
          </div>
        </Card>
      ) : null}

      {tab === "prompts" ? (
        <Card
          title="Prompt packs"
          subtitle="Save reusable prompts for consistent LLM outputs (copy, ads, product descriptions, SEO briefs)."
        >
          <div className="grid gap-3">
            <input
              value={newPromptTitle}
              onChange={(e) => setNewPromptTitle(e.target.value)}
              className="w-full rounded border border-black/15 bg-white px-4 py-3 text-sm"
              placeholder="Prompt title"
            />
            <textarea
              value={newPromptText}
              onChange={(e) => setNewPromptText(e.target.value)}
              className="min-h-40 w-full rounded border border-black/15 bg-white px-4 py-3 text-sm leading-6"
              placeholder="Prompt text"
            />
            <button
              type="button"
              className="rounded bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-background hover:bg-foreground/90"
              onClick={() => {
                const title = newPromptTitle.trim();
                const prompt = newPromptText.trim();
                if (!title || !prompt) return;
                setPrompts((p) => [{ id: uid(), title, prompt, tags: [] }, ...p]);
              }}
            >
              Save prompt
            </button>
          </div>

          <div className="mt-8 grid gap-3">
            {prompts.length ? (
              prompts.map((p) => (
                <div key={p.id} className="rounded-[18px] border border-black/10 bg-white p-4">
                  <div className="flex items-start justify-between gap-6">
                    <p className="text-sm font-semibold">{p.title}</p>
                    <button
                      type="button"
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60 hover:text-foreground"
                      onClick={() => setPrompts((arr) => arr.filter((x) => x.id !== p.id))}
                    >
                      Remove
                    </button>
                  </div>
                  <pre className="mt-3 whitespace-pre-wrap rounded-[14px] border border-black/10 bg-jjb-surface p-4 text-sm leading-6 text-foreground/80">
                    {p.prompt}
                  </pre>
                  <button
                    type="button"
                    className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60 hover:text-foreground"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(p.prompt);
                      } catch {
                        // ignore
                      }
                    }}
                  >
                    Copy
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-foreground/70">No prompts yet.</p>
            )}
          </div>
        </Card>
      ) : null}
    </div>
  );
}



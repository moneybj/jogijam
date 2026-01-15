import { NextResponse } from "next/server";

type TrackEvent = {
  t: number; // timestamp ms
  path: string;
  ref?: string;
};

function store(): TrackEvent[] {
  const g = globalThis as unknown as { __jjb_events__?: TrackEvent[] };
  if (!g.__jjb_events__) g.__jjb_events__ = [];
  return g.__jjb_events__;
}

export async function POST(req: Request) {
  let body: { path?: string; ref?: string };
  try {
    body = (await req.json()) as { path?: string; ref?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const path = typeof body.path === "string" ? body.path.slice(0, 200) : "/";
  const ref = typeof body.ref === "string" ? body.ref.slice(0, 200) : undefined;

  store().push({ t: Date.now(), path, ref });
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const days = Math.max(1, Math.min(90, Number(url.searchParams.get("days") ?? 7)));
  const since = Date.now() - days * 24 * 60 * 60 * 1000;

  const events = store().filter((e) => e.t >= since);
  const byPath: Record<string, number> = {};
  for (const e of events) byPath[e.path] = (byPath[e.path] ?? 0) + 1;

  const top = Object.entries(byPath)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([path, views]) => ({ path, views }));

  return NextResponse.json({
    days,
    totalViews: events.length,
    topPages: top,
    note:
      "This is a lightweight, in-memory counter (good for dev/demo). For production analytics, connect GA4/Plausible/PostHog.",
  });
}



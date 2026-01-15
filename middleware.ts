import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="JogiJamBars Dashboard"',
    },
  });
}

export function middleware(req: NextRequest) {
  // Protect only the dashboard routes (optional).
  const auth = process.env.DASHBOARD_BASIC_AUTH; // format: "user:pass"
  if (!auth) return NextResponse.next();

  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return unauthorized();

  const encoded = header.slice("Basic ".length).trim();
  const decoded = Buffer.from(encoded, "base64").toString("utf8");

  if (decoded !== auth) return unauthorized();
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};



/**
 * Middleware: only protect /admin/**.
 * Everything else passes straight through, preventing accidental 404s.
 */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  // Allow every route except /admin/**
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return res;
}

// Only match /admin/**
export const config = {
  matcher: ["/admin/:path*"]
};

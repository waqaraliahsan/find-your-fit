/**
 * Middleware: only protect /admin/**.
 * Everything else goes straight through—prevents accidental 404s for /
 */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
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

export const config = {
  matcher: ["/admin/:path*"]
};

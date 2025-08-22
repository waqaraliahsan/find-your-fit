/**
 * Middleware: protect /admin/** using Supabase session.
 * Non-admins are redirected to '/'.
 * This is a minimal placeholder; next batch adds role checks via DB.
 */
import { NextResponse, NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  const url = new URL(req.url);
  const isAdminPath = url.pathname.startsWith("/admin");

  if (isAdminPath) {
    if (!session) {
      const signIn = new URL("/auth/sign-in", req.url);
      signIn.searchParams.set("redirectedFrom", url.pathname);
      return NextResponse.redirect(signIn);
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"]
};

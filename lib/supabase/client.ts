/**
 * Supabase browser client for client components (auth pages).
 * Uses public URL + anon key.
 */
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

export function supabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient(url, anon);
}

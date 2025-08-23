/**
 * Supabase browser client for client components (auth pages).
 * Uses the vanilla JS SDK to avoid helper API differences.
 */
import { createClient } from "@supabase/supabase-js";

export function supabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, anon);
}

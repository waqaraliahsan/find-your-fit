/**
 * Server-side Supabase client using auth-helpers (reads cookies).
 * Use in server actions, loaders, and RSC.
 */
import { cookies } from "next/headers";
import { createServerComponentClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const supabaseServerComponent = () =>
  createServerComponentClient({ cookies: () => cookies() });

export const supabaseRouteHandler = () =>
  createRouteHandlerClient({ cookies: () => cookies() });

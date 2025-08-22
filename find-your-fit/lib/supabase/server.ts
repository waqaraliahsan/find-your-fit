/**
 * Supabase server-side helpers for Next.js App Router.
 * - Server Components (RSC)
 * - Route Handlers
 * - Server Actions
 */
import { cookies } from "next/headers";
import {
  createServerComponentClient,
  createRouteHandlerClient,
  createServerActionClient
} from "@supabase/auth-helpers-nextjs";

export const supabaseServerComponent = () =>
  createServerComponentClient({ cookies: () => cookies() });

export const supabaseRouteHandler = () =>
  createRouteHandlerClient({ cookies: () => cookies() });

export const supabaseServerAction = () =>
  createServerActionClient({ cookies: () => cookies() });

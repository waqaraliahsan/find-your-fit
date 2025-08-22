"use client";

/**
 * Sign In page: email/password + Google OAuth.
 * Minimal, accessible UI. Redirects to "/" on success.
 */
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabaseBrowser } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SignInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters")
});
type SignInValues = z.infer<typeof SignInSchema>;

export default function SignInPage() {
  const supabase = supabaseBrowser();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" }
  });

  async function onSubmit(values: SignInValues) {
    setError(null);
    setBusy(true);
    const { data, error } = await supabase.auth.signInWithPassword(values);
    setBusy(false);
    if (error) return setError(error.message);
    if (data.session) window.location.href = "/";
  }

  async function signInWithGoogle() {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/` }
    });
    if (error) setError(error.message);
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3" aria-label="Sign in form">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-xs text-red-600">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...form.register("password")} />
              {form.formState.errors.password && (
                <p className="text-xs text-red-600">{form.formState.errors.password.message}</p>
              )}
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <div className="flex items-center gap-2">
              <Button type="submit" disabled={busy}>
                {busy ? "Signing in..." : "Sign in"}
              </Button>
              <Button type="button" variant="secondary" onClick={signInWithGoogle} aria-label="Continue with Google">
                Continue with Google
              </Button>
            </div>
          </form>

          <p className="text-sm">
            No account?{" "}
            <Link className="text-blue underline" href="/auth/sign-up" aria-label="Go to Sign Up">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

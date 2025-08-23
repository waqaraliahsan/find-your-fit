/**
 * Root layout for Next.js App Router.
 */
import "@/styles/globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find Your Fit",
  description: "Connect mentors and mentees in Pakistan",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <header className="bg-white border-b">
          <div className="container flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-2" aria-label="Go to home">
              <img src="/logo.svg" alt="Find Your Fit" className="h-6 w-6" />
              <span className="text-navy font-semibold tracking-tight">Find Your Fit</span>
            </Link>
            <nav className="flex items-center gap-3">
              <Link href="/auth/sign-in" className="px-3 py-1.5 rounded-md text-white bg-blue hover:opacity-90">
                Sign In
              </Link>
              <Link
                href="/mentor/apply"
                className="px-3 py-1.5 rounded-md border border-aqua text-navy hover:bg-aqua/10"
              >
                Become a Mentor
              </Link>
              <Link href="/admin" className="px-3 py-1.5 rounded-md border hover:bg-white">
                Admin
              </Link>
              <Link href="/profile" className="px-3 py-1.5 rounded-md border hover:bg-white">
                Profile
              </Link>
            </nav>
          </div>
        </header>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}

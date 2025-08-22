/** Root layout: applies global styles and a minimal header. */
import "@/styles/globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find Your Fit",
  description: "Connect mentors and mentees in Pakistan",
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <header className="bg-white border-b">
          <div className="container flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="Find Your Fit" className="h-6 w-6" />
              <span className="text-navy font-semibold tracking-tight">Find Your Fit</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/auth/sign-in"
                className="px-3 py-1.5 rounded-md text-white bg-blue hover:opacity-90"
                aria-label="Sign In"
              >
                Sign In
              </Link>
              <Link
                href="/mentor/apply"
                className="px-3 py-1.5 rounded-md border border-aqua text-navy hover:bg-aqua/10"
                aria-label="Become a Mentor"
              >
                Become a Mentor
              </Link>
            </nav>
          </div>
        </header>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}

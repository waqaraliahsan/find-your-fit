/** Public mentee home placeholder: search-first layout without hero. */
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <label htmlFor="q" className="sr-only">
          Search mentors
        </label>
        <input
          id="q"
          name="q"
          placeholder="Search mentors by skill, domain, education..."
          className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue outline-none"
        />
        <div className="flex gap-2 flex-wrap">
          <button className="px-3 py-1.5 rounded-full border text-sm hover:bg-white">
            Karachi
          </button>
          <button className="px-3 py-1.5 rounded-full border text-sm hover:bg-white">Female</button>
          <button className="px-3 py-1.5 rounded-full border text-sm hover:bg-white">
            Software
          </button>
          <button className="px-3 py-1.5 rounded-full border text-sm hover:bg-white">
            Experience 5+ yrs
          </button>
          <button className="px-3 py-1.5 rounded-full border text-sm hover:bg-white">
            Clear all
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <p className="text-sm opacity-80">
          This is the minimal shell. Next batch adds full discovery, forms, auth, admin, and DB
          integration.
        </p>
        <Link href="/mentor/apply" className="text-blue underline">
          Ready to become a mentor? Apply here.
        </Link>
      </div>
    </div>
  );
}

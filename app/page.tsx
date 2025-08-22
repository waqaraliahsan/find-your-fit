/**
 * Root homepage (Mentee discovery).
 */
import { getMentors } from "@/lib/queries/discovery";
import { MentorCard } from "@/components/mentor-card";
import { SearchBar } from "@/components/search-bar";
import { FilterPanel } from "@/components/filter-panel";
import { EmptyState } from "@/components/empty-state";

export const runtime = "edge";

type Search = { q?: string; page?: string };

export default async function HomePage({ searchParams }: { searchParams?: Search }) {
  const q = searchParams?.q || "";
  const page = Number(searchParams?.page || "1");
  const mentors = await getMentors(q, page);

  return (
    <div className="space-y-6">
      <SearchBar />
      <FilterPanel />
      {!mentors || mentors.length === 0 ? (
        <EmptyState message="No mentors match those filters. Try widening your search." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label="Mentor results">
          {mentors.map((m: any) => (
            <MentorCard key={m.id} mentor={m} />
          ))}
        </div>
      )}
    </div>
  );
}

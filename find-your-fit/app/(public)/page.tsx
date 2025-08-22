import { getMentors } from "@/lib/queries/discovery";
import { MentorCard } from "@/components/mentor-card";
import { SearchBar } from "@/components/search-bar";
import { FilterPanel } from "@/components/filter-panel";
import { EmptyState } from "@/components/empty-state";

export default async function HomePage({searchParams}:{searchParams:{q?:string,page?:string}}){
  const q = searchParams.q;
  const page = Number(searchParams.page||"1");
  const mentors = await getMentors(q,page);
  return(
    <div className="space-y-6">
      <SearchBar/>
      <FilterPanel/>
      {(!mentors||mentors.length===0) && <EmptyState message="No mentors match those filters. Try widening your search."/>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mentors?.map((m)=>(<MentorCard key={m.id} mentor={m}/>))}
      </div>
    </div>
  )
}

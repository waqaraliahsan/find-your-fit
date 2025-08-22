import { supabaseServerComponent } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { requestConnection } from "@/lib/actions/request-connection";
import { Button } from "@/components/ui/button";
export default async function MentorProfilePage({params}:{params:{username:string}}){
  const supabase = supabaseServerComponent();
  const { data: profile } = await supabase.from("profiles").select("*").eq("username",params.username).single();
  if(!profile) return notFound();
  async function connect(){
    "use server";
    return requestConnection(profile.id);
  }
  return(
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{profile.full_name}</h1>
      <p>{profile.headline}</p>
      <p>{profile.profession}</p>
      <p>{profile.education}</p>
      <p>{profile.experience_years} years experience</p>
      <p>City: {profile.location_city}</p>
      <p>Rate: PKR {profile.hourly_rate}</p>
      <form action={connect}>
        <Button type="submit">Request Mentorship</Button>
      </form>
    </div>
  )
}

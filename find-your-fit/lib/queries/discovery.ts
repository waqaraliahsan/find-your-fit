import { supabaseServerComponent } from "@/lib/supabase/server";

export async function getMentors(search?:string, page:number=1, limit:number=6){
  const supabase = supabaseServerComponent();
  let query = supabase.from("profiles").select("*").eq("can_mentor",true);

  if(search){
    query = query.ilike("full_name", `%${search}%`);
  }
  const from=(page-1)*limit;
  const to=from+limit-1;
  const {data,error,count} = await query.range(from,to);
  if(error) throw error;
  return data;
}

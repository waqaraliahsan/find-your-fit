import { supabaseServerComponent } from "@/lib/supabase/server";
export async function getMentors(){
  const supabase = supabaseServerComponent();
  const { data, error } = await supabase.from('profiles').select('*').eq('can_mentor',true);
  if(error) throw error;
  return data;
}

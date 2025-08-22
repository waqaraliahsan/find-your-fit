"use server";
import { supabaseServerAction } from "@/lib/supabase/server";
export async function rejectApplication(appId:number, notes?:string){
  const supabase = supabaseServerAction();
  const { error } = await supabase.from("mentor_applications").update({
    status:"rejected",
    review_notes:notes||null,
    reviewed_at:new Date().toISOString()
  }).eq("id",appId);
  if(error) return {ok:false,error:error.message};
  return {ok:true};
}

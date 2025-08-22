"use server";
import { supabaseServerAction } from "@/lib/supabase/server";
export async function requestConnection(mentorId:string){
  const supabase = supabaseServerAction();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) return {ok:false,error:"Not signed in"};
  const { error } = await supabase.from("connections").insert({
    mentor_id: mentorId,
    mentee_id: user.id,
    status: "requested"
  });
  if(error) return {ok:false,error:error.message};
  return {ok:true};
}

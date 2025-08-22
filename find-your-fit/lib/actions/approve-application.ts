"use server";
import { supabaseServerAction } from "@/lib/supabase/server";
export async function approveApplication(appId:number){
  const supabase = supabaseServerAction();
  const { error } = await supabase.rpc('approve_mentor_app', { app_id: appId });
  if(error) return {ok:false,error:error.message};
  return {ok:true};
}

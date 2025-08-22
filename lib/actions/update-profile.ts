"use server";
import { supabaseServerAction } from "@/lib/supabase/server";
export async function updateProfile(data:{full_name?:string,bio?:string,profession?:string,education?:string,experience_years?:number}){
  const supabase = supabaseServerAction();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) return {ok:false,error:"Not signed in"};
  const { error } = await supabase.from("profiles").update(data).eq("id",user.id);
  if(error) return {ok:false,error:error.message};
  return {ok:true};
}

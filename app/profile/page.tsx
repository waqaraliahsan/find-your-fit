import { supabaseServerComponent } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { updateProfile } from "@/lib/actions/update-profile";
import { Button } from "@/components/ui/button";
export default async function ProfilePage(){
  const supabase = supabaseServerComponent();
  const { data: { session } } = await supabase.auth.getSession();
  if(!session) redirect("/auth/sign-in");
  const { data: profile } = await supabase.from("profiles").select("*").eq("id",session.user.id).single();
  async function action(formData:FormData){
    "use server";
    const data={
      full_name: formData.get("full_name") as string,
      bio: formData.get("bio") as string,
      profession: formData.get("profession") as string,
      education: formData.get("education") as string,
      experience_years: Number(formData.get("experience_years")||0)
    };
    return updateProfile(data);
  }
  return(
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Your Profile</h1>
      <form action={action} className="space-y-2">
        <input name="full_name" defaultValue={profile?.full_name||""} className="border rounded w-full p-2"/>
        <textarea name="bio" defaultValue={profile?.bio||""} className="border rounded w-full p-2"/>
        <input name="profession" defaultValue={profile?.profession||""} className="border rounded w-full p-2"/>
        <input name="education" defaultValue={profile?.education||""} className="border rounded w-full p-2"/>
        <input type="number" name="experience_years" defaultValue={profile?.experience_years||0} className="border rounded w-full p-2"/>
        <Button type="submit">Update</Button>
      </form>
    </div>
  )
}

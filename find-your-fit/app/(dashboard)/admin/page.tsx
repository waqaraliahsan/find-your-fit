import { supabaseServerComponent } from "@/lib/supabase/server";
import { ApplicationsList } from "@/components/admin/applications-list";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function AdminPage(){
  const supabase = supabaseServerComponent();
  const { data:{session} } = await supabase.auth.getSession();
  if(!session) redirect("/auth/sign-in");

  const { data: apps } = await supabase.from("mentor_applications").select("*").order("submitted_at",{ascending:false}).limit(10);

  return(
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Pending Applications</CardTitle></CardHeader>
        <CardContent>
          {apps && <ApplicationsList apps={apps}/>}
        </CardContent>
      </Card>
    </div>
  )
}

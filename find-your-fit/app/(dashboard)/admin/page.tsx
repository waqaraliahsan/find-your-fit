/**
 * Admin dashboard shell with stats and placeholders
 */
import { supabaseServerComponent } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminPage() {
  const supabase = supabaseServerComponent();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/auth/sign-in");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Mentors</CardTitle></CardHeader>
          <CardContent>--</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Mentees</CardTitle></CardHeader>
          <CardContent>--</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pending Applications</CardTitle></CardHeader>
          <CardContent>--</CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Connections Graph</CardTitle></CardHeader>
        <CardContent>Placeholder graph</CardContent>
      </Card>
    </div>
  );
}

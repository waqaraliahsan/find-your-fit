import { approveApplication } from "@/lib/actions/approve-application";
import { rejectApplication } from "@/lib/actions/reject-application";
import { Button } from "@/components/ui/button";

export function ApplicationsList({apps}:{apps:any[]}){
  return(
    <div className="space-y-4">
      {apps.map(app=>(
        <div key={app.id} className="border p-4 rounded space-y-2">
          <p><b>{app.headline}</b> - {app.education} ({app.experience_years} yrs)</p>
          <p>Status: {app.status}</p>
          <form action={async()=>approveApplication(app.id)}>
            <Button type="submit" variant="primary">Approve</Button>
          </form>
          <form action={async()=>rejectApplication(app.id)}>
            <Button type="submit" variant="secondary">Reject</Button>
          </form>
        </div>
      ))}
    </div>
  )
}

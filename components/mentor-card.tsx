import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type Mentor = {
  id: string;
  full_name: string;
  username: string;
  headline?: string;
  education?: string;
  profession?: string;
  experience_years?: number;
  location_city?: string;
  hourly_rate?: number;
  can_mentor?: boolean;
};

export function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <Card className="hover:shadow transition">
      <CardHeader>
        <CardTitle>{mentor.full_name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <p className="font-medium text-slateText">{mentor.headline}</p>
        <p>{mentor.profession}</p>
        <p>{mentor.education}</p>
        <p>{mentor.experience_years} years experience</p>
        <p>City: {mentor.location_city}</p>
        <p className="text-blue">PKR {mentor.hourly_rate}</p>
      </CardContent>
    </Card>
  );
}

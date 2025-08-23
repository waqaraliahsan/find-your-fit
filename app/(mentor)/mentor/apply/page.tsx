/**
 * Become a Mentor form (server component).
 * - Requires signed-in user (redirect to /auth/sign-in if not)
 * - Submits via Server Action to create a pending application
 * - Plain HTML inputs (no client JS) for reliability on first deploy
 */
import { redirect } from "next/navigation";
import { supabaseServerComponent } from "@/lib/supabase/server";
import { submitMentorApplication } from "@/lib/actions/mentor-apply";

export const runtime = "edge";

const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Peshawar",
  "Quetta",
  "Multan",
  "Faisalabad",
  "Sialkot"
] as const;

const genders = ["male", "female", "other"] as const;

export default async function MentorApplyPage() {
  const supabase = supabaseServerComponent();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  // If an application exists and is not rejected, show status instead of form
  const { data: apps } = await supabase
    .from("mentor_applications")
    .select("id,status,review_notes,submitted_at")
    .eq("applicant_id", session!.user.id)
    .order("submitted_at", { ascending: false })
    .limit(1);

  const latest = apps?.[0]; // <- safe access

  if (latest && latest.status !== "rejected") {
    return (
      <div className="mx-auto max-w-2xl space-y-3">
        <h1 className="text-xl font-semibold">Mentor Application</h1>
        <p className="text-sm">
          Status: <b className="uppercase">{latest.status}</b>
        </p>
        {latest.review_notes ? <p className="text-sm">Notes: {latest.review_notes}</p> : null}
        <p className="text-sm opacity-70">You’ll be notified when an admin reviews your application.</p>
      </div>
    );
  }

  async function action(formData: FormData) {
    "use server";
    const obj: Record<string, any> = {};
    formData.forEach((v, k) => (obj[k] = v));
    obj.experience_years = Number(obj.experience_years ?? 0);
    obj.hourly_rate = Number(obj.hourly_rate ?? 0);
    obj.domains = String(obj.domains || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    obj.skills = String(obj.skills || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const res = await submitMentorApplication({
      full_name: String(obj.full_name || ""),
      username: String(obj.username || ""),
      location_city: obj.location_city,
      gender: obj.gender,
      headline: String(obj.headline || ""),
      domains: obj.domains,
      skills: obj.skills,
      education: String(obj.education || ""),
      experience_years: obj.experience_years,
      linkedin_url: String(obj.linkedin_url || ""),
      portfolio_url: String(obj.portfolio_url || ""),
      website_url: String(obj.website_url || ""),
      hourly_rate: obj.hourly_rate
    });

    return res;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold">Become a Mentor</h1>

      <form action={action} className="space-y-6" aria-label="Mentor application form">
        {/* Personal */}
        <section className="space-y-3">
          <h2 className="font-semibold">Personal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field name="full_name" label="Full name" required />
            <Field name="username" label="Username" required helper="Letters, numbers, - and _" />
            <Select name="location_city" label="City" options={cities as unknown as string[]} />
            <Select name="gender" label="Gender" options={genders as unknown as string[]} />
          </div>
        </section>

        {/* Professional */}
        <section className="space-y-3">
          <h2 className="font-semibold">Professional</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field name="headline" label="Headline" required placeholder="e.g. Senior Data Analyst" />
            <Field name="education" label="Education" required placeholder="e.g. BS Computer Science" />
            <NumberField name="experience_years" label="Years of experience" min={0} />
            <NumberField name="hourly_rate" label="Hourly rate (PKR)" min={0} />
          </div>
          <Field
            name="domains"
            label="Domains (comma-separated)"
            placeholder="e.g. Data, Product, Design"
            helper="We’ll parse by commas"
          />
          <Field
            name="skills"
            label="Skills (comma-separated)"
            placeholder="e.g. SQL, React, Figma"
            helper="We’ll parse by commas"
          />
          <Textarea name="bio" label="Short bio (optional)" placeholder="Few lines about your experience" />
        </section>

        {/* Links */}
        <section className="space-y-3">
          <h2 className="font-semibold">Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field name="linkedin_url" label="LinkedIn URL" placeholder="https://linkedin.com/in/..." />
            <Field name="portfolio_url" label="Portfolio URL" placeholder="https://..." />
            <Field name="website_url" label="Website (optional)" placeholder="https://..." />
          </div>
        </section>

        <button type="submit" className="px-4 py-2 rounded-md bg-blue text-white hover:opacity-90">
          Submit application
        </button>
      </form>

      <p className="text-xs opacity-70">
        Submitting creates a pending application. An admin can approve you to unlock mentor capabilities. Currency shown in PKR.
      </p>
    </div>
  );
}

/** Lightweight field components */
function Field({
  name,
  label,
  placeholder,
  required,
  helper
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  helper?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slateText">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue"
        required={required}
      />
      {helper ? <p className="text-xs opacity-70">{helper}</p> : null}
    </div>
  );
}

function NumberField({
  name,
  label,
  min
}: {
  name: string;
  label: string;
  min?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slateText">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="number"
        min={min}
        className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue"
      />
    </div>
  );
}

function Select({
  name,
  label,
  options
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slateText">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue bg-white"
        defaultValue={options[0]}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea({
  name,
  label,
  placeholder
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slateText">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        className="min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue outline-none"
      />
    </div>
  );
}

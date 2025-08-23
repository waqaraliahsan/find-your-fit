"use server";

/**
 * Server Action: submitMentorApplication
 * - Validates input with Zod
 * - Requires an authenticated user
 * - Upserts basic profile fields (name/username/city/gender)
 * - Inserts a pending row in mentor_applications
 * - Upserts skills (separate select after upsert to fetch id)
 */

import { supabaseServerAction } from "@/lib/supabase/server";
import {
  MentorApplicationSchema,
  type MentorApplicationInput
} from "@/lib/validators/mentor-application";

export async function submitMentorApplication(raw: MentorApplicationInput) {
  // Validate input
  const parsed = MentorApplicationSchema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    return { ok: false, error: msg };
  }
  const input = parsed.data;

  const supabase = supabaseServerAction();

  // Must be signed in
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in" };

  // Upsert profile core fields
  {
    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          full_name: input.full_name,
          username: input.username,
          location_city: input.location_city,
          gender: input.gender
        },
        { onConflict: "id" }
      );
    if (error) return { ok: false, error: `Profile update failed: ${error.message}` };
  }

  // Insert mentor application (pending)
  {
    const { error } = await supabase.from("mentor_applications").insert({
      applicant_id: user.id,
      headline: input.headline,
      domains: input.domains,
      education: input.education,
      experience_years: input.experience_years,
      portfolio_url: input.portfolio_url || null,
      linkedin_url: input.linkedin_url || null,
      hourly_rate: input.hourly_rate ?? 0,
      status: "pending",
      review_notes: null
    });
    if (error) return { ok: false, error: `Application insert failed: ${error.message}` };
  }

  // Upsert skills and link to profile (two-step to avoid chaining filters on upsert())
  if (input.skills && input.skills.length > 0) {
    for (const name of input.skills) {
      const trimmed = name.trim();
      if (!trimmed) continue;

      // 1) Upsert by name
      const { error: upErr } = await supabase
        .from("skills")
        .upsert({ name: trimmed }, { onConflict: "name" });
      if (upErr) continue; // skip this skill if upsert failed

      // 2) Fetch id by name
      const { data: skill, error: selErr } = await supabase
        .from("skills")
        .select("id")
        .eq("name", trimmed)
        .single();

      if (selErr || !skill) continue;

      // 3) Link to profile
      await supabase
        .from("profile_skills")
        .upsert(
          { profile_id: user.id, skill_id: skill.id },
          { onConflict: "profile_id,skill_id" }
        );
    }
  }

  return { ok: true };
}

/**
 * Zod schema + types for the Become a Mentor form.
 * Matches table columns and server action expectations.
 */
import { z } from "zod";

export const MentorApplicationSchema = z.object({
  // Personal
  full_name: z.string().min(2, "Full name is required"),
  username: z
    .string()
    .min(3, "Username is required")
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, - and _"),
  location_city: z.enum([
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Peshawar",
    "Quetta",
    "Multan",
    "Faisalabad",
    "Sialkot"
  ]),
  gender: z.enum(["male", "female", "other"]),

  // Professional
  headline: z.string().min(3, "Headline is required"),
  domains: z.array(z.string().min(1)).default([]),
  skills: z.array(z.string().min(1)).default([]),
  education: z.string().min(2, "Education is required"),
  experience_years: z
    .number({ invalid_type_error: "Years must be a number" })
    .int()
    .min(0, "Years must be >= 0"),

  // Links
  linkedin_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  portfolio_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  website_url: z.string().url("Invalid URL").optional().or(z.literal("")),

  // Commercials
  hourly_rate: z
    .number({ invalid_type_error: "Rate must be a number" })
    .nonnegative("Rate must be >= 0")
    .optional()
});

export type MentorApplicationInput = z.infer<typeof MentorApplicationSchema>;

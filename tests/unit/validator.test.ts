import { describe, it, expect } from "vitest";
import { MentorApplicationSchema } from "@/lib/validators/mentor-application";

describe("MentorApplicationSchema", () => {
  it("validates a correct object", () => {
    const input = {
      full_name: "Ali Khan",
      username: "alikhan",
      location_city: "Karachi",
      gender: "male",
      headline: "Software Engineer",
      domains: ["Tech"],
      skills: ["React"],
      education: "BS CS",
      experience_years: 3,
      linkedin_url: "",
      portfolio_url: "",
      website_url: "",
      hourly_rate: 1000
    };
    expect(MentorApplicationSchema.parse(input)).toBeTruthy();
  });

  it("rejects missing fields", () => {
    expect(() => MentorApplicationSchema.parse({})).toThrow();
  });
});

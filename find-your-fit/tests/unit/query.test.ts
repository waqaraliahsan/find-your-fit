import { describe, it, expect } from "vitest";
import { getMentors } from "@/lib/queries/discovery";

describe("getMentors query", () => {
  it("is a function", () => {
    expect(typeof getMentors).toBe("function");
  });
});

import { describe, expect, it } from "vitest";
import { parseResumeReviewJson } from "@/lib/ai/resume-shared";

describe("parseResumeReviewJson", () => {
  it("parses valid resume review JSON", () => {
    const raw = JSON.stringify({
      overallScore: 72,
      categories: [
        { name: "ATS & readability", score: 80, summary: "Clear sections." },
      ],
      topFixes: ["Add metrics to bullet 2"],
      missingKeywords: ["TypeScript"],
      strongPoints: ["Good project descriptions"],
      oneLineVerdict: "Solid mid-level resume.",
    });

    const result = parseResumeReviewJson(raw);
    expect(result.overallScore).toBe(72);
    expect(result.categories).toHaveLength(1);
    expect(result.topFixes[0]).toContain("metrics");
  });

  it("throws on invalid overallScore", () => {
    expect(() =>
      parseResumeReviewJson(JSON.stringify({ overallScore: 200, categories: [] })),
    ).toThrow();
  });
});

import { describe, expect, it } from "vitest";
import { parsePatternExplainJson } from "@/lib/ai/pattern-explain-shared";

describe("parsePatternExplainJson", () => {
  it("parses valid pattern explain JSON", () => {
    const raw = JSON.stringify({
      deepDive: "Paragraph one.\n\nParagraph two.",
      mentalModel: "Think of two boundaries.",
      whenYouSeeIt: ["sorted array", "pair sum", "in-place"],
      howToApply: ["init pointers", "move left", "move right", "stop"],
      exampleWalkthrough: "On input [1,2,3], we start at ends.",
      interviewTips: ["State O(n) time", "Mention sorted requirement"],
      pitfallsExpanded: ["Infinite loop", "Wrong pointer move"],
      whenToPickSomethingElse: "Use hashing if unsorted.",
    });

    const result = parsePatternExplainJson(raw);
    expect(result.deepDive).toContain("Paragraph one");
    expect(result.whenYouSeeIt).toHaveLength(3);
    expect(result.howToApply).toHaveLength(4);
  });

  it("rejects invalid JSON", () => {
    expect(() => parsePatternExplainJson("not json")).toThrow();
  });
});

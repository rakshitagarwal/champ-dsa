import { describe, expect, it } from "vitest";
import { extractJson, parseAnimationJson } from "@/lib/ai/grok-animation";

const validPayload = {
  title: "Binary Search",
  steps: [
    {
      label: "initialized pointers",
      svg: '<svg viewBox="0 0 680 320"><rect /></svg>',
    },
    {
      label: "moved left pointer",
      svg: '<svg viewBox="0 0 680 320"><circle /></svg>',
    },
  ],
  totalSteps: 2,
};

describe("extractJson", () => {
  it("parses raw JSON", () => {
    const raw = JSON.stringify(validPayload);
    expect(extractJson(raw)).toBe(raw);
  });

  it("strips markdown fences", () => {
    const inner = JSON.stringify(validPayload);
    const fenced = "```json\n" + inner + "\n```";
    expect(JSON.parse(extractJson(fenced))).toEqual(validPayload);
  });

  it("extracts object from surrounding text", () => {
    const inner = JSON.stringify(validPayload);
    expect(JSON.parse(extractJson("Here: " + inner + " done"))).toEqual(
      validPayload,
    );
  });
});

describe("parseAnimationJson", () => {
  it("accepts valid animation JSON", () => {
    const result = parseAnimationJson(JSON.stringify(validPayload));
    expect(result).not.toBeNull();
    expect(result!.title).toBe("Binary Search");
    expect(result!.steps).toHaveLength(2);
    expect(result!.totalSteps).toBe(2);
  });

  it("rejects empty steps", () => {
    expect(
      parseAnimationJson(JSON.stringify({ title: "X", steps: [] })),
    ).toBeNull();
  });

  it("filters steps without svg", () => {
    const result = parseAnimationJson(
      JSON.stringify({
        title: "Test",
        steps: [{ label: "bad", svg: "not svg" }],
      }),
    );
    expect(result).toBeNull();
  });

  it("parses fenced JSON", () => {
    const fenced =
      "```json\n" + JSON.stringify(validPayload) + "\n```";
    const result = parseAnimationJson(fenced);
    expect(result?.steps).toHaveLength(2);
  });
});

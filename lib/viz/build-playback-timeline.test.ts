import { describe, expect, it } from "vitest";
import {
  buildPlaybackTimeline,
  traceStepToScene,
} from "@/lib/viz/build-playback-timeline";
import { traceFastSlowMiddleList } from "@/lib/tracer/manual/fast-slow-linked-list";
import type { TraceStep } from "@/lib/tracer/types";

describe("traceStepToScene", () => {
  it("maps manual linked list steps to linkedList structure", () => {
    const steps = traceFastSlowMiddleList([1, 2, 3, 4, 5]);
    expect(steps.length).toBeGreaterThan(3);
    const scene = traceStepToScene(steps[0]!, 0);
    const list = scene.structures.find((s) => s.kind === "linkedList");
    expect(list).toBeDefined();
    expect(scene.pointers.some((p) => p.name === "slow")).toBe(true);
    expect(scene.pointers.some((p) => p.name === "fast")).toBe(true);
  });
});

describe("buildPlaybackTimeline manual tracer", () => {
  it("uses bc-054 fast-slow tracer", () => {
    const steps = buildPlaybackTimeline({
      trace: null,
      profile: null,
      questionId: "bc-054-middle-of-the-linked-list",
      patternSlug: "fast-slow-pointers",
      sampleRaw: "head = [1,2,3,4,5]",
    });
    expect(steps.length).toBeGreaterThan(5);
    expect(steps[0]?.scene.structures.some((s) => s.kind === "linkedList")).toBe(
      true,
    );
  });
});

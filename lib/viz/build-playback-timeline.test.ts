import { describe, expect, it } from "vitest";
import { buildPlaybackTimeline } from "@/lib/viz/build-playback-timeline";
import { buildDefaultVizProfile } from "@/lib/viz/default-viz-profile";
import { runCodeSync } from "@/lib/tracer/run-sync";

describe("buildPlaybackTimeline", () => {
  it("builds steps with scenes for maxArea", () => {
    const code = `var maxArea = function (height) {
  let l = 0, r = height.length - 1, best = 0;
  while (l < r) {
    best = Math.max(best, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l++; else r--;
  }
  return best;
};`;
    const r = runCodeSync(code, "height = [1,8,6,2,5,4,8,3,7]", {
      leetcodeFunctionName: "maxArea",
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const profile = buildDefaultVizProfile(r.trace, "Two Pointers");
    const steps = buildPlaybackTimeline({ trace: r.trace, profile, curated: true });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.line).toBeGreaterThanOrEqual(1);
    const hasArray = steps.some((s) =>
      s.scene.structures.some((st) => st.kind === "array"),
    );
    expect(hasArray).toBe(true);
  });

  it("caps steps at 200", () => {
    const events = Array.from({ length: 500 }, (_, i) => ({
      step: i,
      line: 2 + (i % 5),
      type: "statement" as const,
      variables: { nums: [1, 2, 3], i: i % 3 },
      callStack: [],
    }));
    const trace = { events, stdout: "", returnValue: 0 };
    const profile = buildDefaultVizProfile(trace, "Arrays");
    const steps = buildPlaybackTimeline({ trace, profile, curated: true });
    expect(steps.length).toBeLessThanOrEqual(200);
  });
});

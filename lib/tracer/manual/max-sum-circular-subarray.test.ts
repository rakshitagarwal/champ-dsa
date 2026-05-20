import { describe, expect, it } from "vitest";
import {
  BC019_TRACE_CODE,
  traceMaxSumCircularSubarray,
} from "@/lib/tracer/manual/max-sum-circular-subarray";

describe("traceMaxSumCircularSubarray", () => {
  const maxLine = BC019_TRACE_CODE.split("\n").length;

  it("produces valid steps for circular kadane", () => {
    const steps = traceMaxSumCircularSubarray([5, -3, 5]);
    expect(steps.length).toBeGreaterThan(0);
    for (const s of steps) {
      expect(s.line).toBeGreaterThanOrEqual(1);
      expect(s.line).toBeLessThanOrEqual(maxLine);
      expect(s.ds.hashmaps?.[0]?.entries.length).toBeGreaterThan(0);
    }
    const last = steps[steps.length - 1]!;
    expect(last.vars.answer).toBe(10);
  });
});

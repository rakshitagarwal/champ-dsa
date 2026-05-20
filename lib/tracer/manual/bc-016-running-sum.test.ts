import { describe, expect, it } from "vitest";
import {
  BC016_TRACE_CODE,
  traceRunningSumOf1DArray,
} from "@/lib/tracer/manual/bc-016-running-sum";

describe("traceRunningSumOf1DArray", () => {
  const maxLine = BC016_TRACE_CODE.split("\n").length;

  it("produces steps with valid line numbers", () => {
    const steps = traceRunningSumOf1DArray([1, 2, 3, 4]);
    expect(steps.length).toBeGreaterThan(0);
    for (const s of steps) {
      expect(s.line).toBeGreaterThanOrEqual(1);
      expect(s.line).toBeLessThanOrEqual(maxLine);
      expect(s.description).toBeTruthy();
      expect(s.ds.arrays?.length).toBeGreaterThan(0);
    }
  });

  it("computes running sum in-place", () => {
    const steps = traceRunningSumOf1DArray([1, 2, 3, 4]);
    const last = steps[steps.length - 1]!;
    const nums = last.ds.arrays?.[0]?.values;
    expect(nums).toEqual([1, 3, 6, 10]);
  });
});

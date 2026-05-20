import { describe, expect, it } from "vitest";
import { executionToTraceSteps } from "@/lib/viz/trace/execution-to-trace-steps";
import { buildDefaultVizProfile } from "@/lib/viz/default-viz-profile";
import { runCodeSync } from "@/lib/tracer/run-sync";
import type { ExecutionTrace } from "@/types/execution";

describe("executionToTraceSteps", () => {
  it("converts array-only trace to TraceStep[]", () => {
    const trace: ExecutionTrace = {
      events: [
        {
          step: 0,
          line: 2,
          type: "statement",
          variables: { nums: [1, 2, 3], i: 0 },
          callStack: [],
          highlights: { array: "nums", indices: [0] },
          viz: { stacks: {} },
        },
        {
          step: 1,
          line: 3,
          type: "loop",
          variables: { nums: [1, 2, 3], i: 1 },
          callStack: [],
          highlights: { array: "nums", indices: [1] },
        },
      ],
      stdout: "",
      returnValue: [1, 2, 3],
    };
    const profile = buildDefaultVizProfile(trace, "Arrays");
    const steps = executionToTraceSteps(trace, profile, true);
    expect(steps).not.toBeNull();
    expect(steps!.length).toBeGreaterThan(0);
    expect(steps![0]!.line).toBeGreaterThanOrEqual(1);
    expect(steps![0]!.ds.arrays?.length).toBeGreaterThan(0);
  });

  it("does not leak instrumented function source for calculator", () => {
    const code = `var calculate = function (s) {
  let num = 0, sign = 1, res = 0, st = [1];
  for (const ch of s + '+') {
    if (ch >= '0' && ch <= '9') num = num * 10 + +ch;
    else {
      res += sign * num; num = 0;
      if (ch === '+') sign = st[st.length - 1];
      else if (ch === '-') sign = -st[st.length - 1];
      else if (ch === '(') st.push(sign);
      else if (ch === ')') st.pop();
    }
  }
  return res;
};`;
    const r = runCodeSync(code, 's = "1 + 1"', {
      leetcodeFunctionName: "calculate",
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const profile = buildDefaultVizProfile(r.trace, "Recursion");
    const steps = executionToTraceSteps(r.trace, profile, true);
    expect(steps).not.toBeNull();
    const withStack = steps!.find((st) => (st.ds.stacks?.length ?? 0) > 0);
    expect(withStack).toBeDefined();
    const withString = steps!.find((st) =>
      st.ds.arrays?.some((a) => a.id.startsWith("string:")),
    );
    expect(withString).toBeDefined();
    const s = withStack!;
    expect(s.ds.hashmaps?.[0]?.entries.some((e) => e.key === "num")).toBe(true);
    for (const hm of s.ds.hashmaps ?? []) {
      for (const e of hm.entries) {
        expect(String(e.value)).not.toContain("__trace");
        expect(String(e.value).length).toBeLessThan(200);
      }
    }
    for (const arr of s.ds.arrays ?? []) {
      for (const v of arr.values) {
        expect(String(v)).not.toContain("__trace");
      }
    }
  });

  it("shows l/r pointers and best for maxArea", () => {
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
    const steps = executionToTraceSteps(r.trace, profile, true);
    const mid = steps!.find((st) => (st.ds.pointers?.length ?? 0) >= 2);
    expect(mid).toBeDefined();
    const names = mid!.ds.pointers!.map((p) => p.name);
    expect(names).toContain("l");
    expect(names).toContain("r");
    expect(mid!.ds.hashmaps?.[0]?.entries.some((e) => e.key === "best")).toBe(
      true,
    );
  });
});

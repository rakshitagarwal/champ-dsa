import { describe, expect, it } from "vitest";
import { instrumentCode } from "./instrument";
import { runCodeSync } from "./run-sync";

describe("instrumentCode", () => {
  it("instruments a simple loop", () => {
    const result = instrumentCode(`
let sum = 0;
for (let i = 0; i < 3; i++) {
  sum += i;
}
`);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.code).toContain("__trace");
    }
  });

  it("rejects unsafe syntax", () => {
    const result = instrumentCode(`import fs from 'fs';`);
    expect(result.ok).toBe(false);
  });
});

describe("runCodeSync", () => {
  it("produces execution events for solve()", () => {
    const code = `function solve(nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum;
}`;
    const result = runCodeSync(code, JSON.stringify({ nums: [1, 2, 3] }));
    if (!result.ok) {
      expect.fail(`run failed: ${result.error}`);
    }
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.trace.events.length).toBeGreaterThan(0);
    }
  });

  it("traces recursion enter/exit", () => {
    const code = `function solve(n) {
  if (n <= 1) return n;
  return solve(n - 1) + solve(n - 2);
}`;
    const result = runCodeSync(code, JSON.stringify({ n: 3 }));
    expect(result.ok).toBe(true);
    if (result.ok) {
      const enters = result.trace.events.filter((e) => e.type === "enter");
      expect(enters.length).toBeGreaterThan(1);
    }
  });
});

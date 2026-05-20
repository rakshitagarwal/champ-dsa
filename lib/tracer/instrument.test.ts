import { describe, expect, it } from "vitest";
import { instrumentCode } from "./instrument";
import { runCodeSync } from "./run-sync";
import { buildRunnerTail, parseStdin } from "./parse-stdin";
import { buildRunnerSandbox } from "./runner-runtime";
import { MAX_STEPS } from "./safety";

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

  it("runs merge two lists under instrumentation", () => {
    const code = `function solve(input) {
  const out = [];
  let i = 0, j = 0;
  while (i < input.l1.length && j < input.l2.length) {
    if (input.l1[i] <= input.l2[j]) out.push(input.l1[i++]);
    else out.push(input.l2[j++]);
  }
  return out.concat(input.l1.slice(i), input.l2.slice(j));
}`;
    const stdin = JSON.stringify({ l1: [1, 2, 4], l2: [1, 3, 4] });
    const result = runCodeSync(code, stdin);
    if (!result.ok) expect.fail(result.error);
    expect(result.ok).toBe(true);
  });

  it("instruments solve() with loops without stack overflow", () => {
    const result = instrumentCode(`function solve(nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum;
}`);
    expect(result.ok).toBe(true);
  });
});

describe("runCodeSync", () => {
  it("does not throw TDZ when tracing for (let i ...)", () => {
    const code = `function solve(nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum;
}`;
    const result = runCodeSync(code, JSON.stringify({ nums: [1, 2, 3] }));
    if (!result.ok) expect.fail(result.error);
    expect(result.ok).toBe(true);
  });

  it("emits loop and condition events", () => {
    const code = `function solve(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) return i;
  }
  return -1;
}`;
    const result = runCodeSync(
      code,
      JSON.stringify({ nums: [1, 2, 3], target: 2 }),
    );
    if (!result.ok) expect.fail(result.error);
    const types = new Set(result.trace.events.map((e) => e.type));
    expect(types.has("loop")).toBe(true);
    expect(types.has("condition")).toBe(true);
  });

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

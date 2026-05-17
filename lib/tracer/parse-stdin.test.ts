import { describe, expect, it } from "vitest";
import { buildSolveCallExpr } from "./parse-stdin";

describe("buildSolveCallExpr", () => {
  it("passes string param for s", () => {
    expect(buildSolveCallExpr({ s: "lee(t(c)o)de)" })).toBe("solve(input.s)");
  });

  it("passes nums and target separately", () => {
    expect(buildSolveCallExpr({ nums: [1, 2], target: 3 })).toBe(
      "solve(input.nums, input.target)",
    );
  });

  it("passes single array as nums", () => {
    expect(buildSolveCallExpr({ nums: [1, 2, 3] })).toBe("solve(input.nums)");
  });
});

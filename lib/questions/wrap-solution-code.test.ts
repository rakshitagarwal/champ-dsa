import { describe, expect, it } from "vitest";
import {
  extractSolutionBody,
  solutionCodeForStarter,
  stripLeadingJsDoc,
} from "./wrap-solution-code";

const TRAP_STARTER = "function solve(height) {\n\n  // TODO\n\n}";

const TRAP_SOLUTION = `/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let left = 0
    let right = height.length - 1
    let water = 0
    while (left < right) {
        left++
    }
    return water
};`;

describe("solutionCodeForStarter", () => {
  it("strips JSDoc and matches solve() starter shell", () => {
    const out = solutionCodeForStarter(
      TRAP_STARTER,
      TRAP_SOLUTION,
      "trap",
    );
    expect(out).toContain("function solve(height)");
    expect(out).not.toContain("/**");
    expect(out).not.toContain("var trap");
    expect(out).toContain("let left = 0");
    expect(out).toContain("return water");
  });

  it("extractSolutionBody prefers entryFunction name", () => {
    const body = extractSolutionBody(TRAP_SOLUTION, "trap");
    expect(body).toContain("let left = 0");
    expect(body).not.toContain("var trap");
  });

  it("stripLeadingJsDoc removes block comment", () => {
    expect(stripLeadingJsDoc(TRAP_SOLUTION)).not.toContain("@param");
  });
});

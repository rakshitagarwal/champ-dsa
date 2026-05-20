import { describe, expect, it } from "vitest";
import {
  buildEntryCallExpr,
  buildSolveCallExpr,
  normalizeRunnerInput,
  parseStdin,
} from "./parse-stdin";
import { detectEntryFunction } from "./detect-entry";
import { runCodeSync } from "./run-sync";

describe("buildEntryCallExpr", () => {
  it("passes full input for string-only sheet payloads", () => {
    expect(buildSolveCallExpr({ s: "lee(t(c)o)de)" })).toBe("solve(input)");
  });

  it("passes nums and target separately for 1D two-sum style", () => {
    expect(buildSolveCallExpr({ nums: [1, 2], target: 3 })).toBe(
      "solve(input.nums, input.target)",
    );
  });

  it("passes full input for 2D nums + target", () => {
    expect(
      buildSolveCallExpr({
        nums: [
          [1, 3],
          [10, 11],
        ],
        target: 3,
      }),
    ).toBe("solve(input)");
  });

  it("passes multi-field object as input for solve(input)", () => {
    expect(buildSolveCallExpr({ a: [1, 3], b: [2] })).toBe("solve(input)");
  });

  it("passes coins and amount as input for coin DP sheet problems", () => {
    expect(buildSolveCallExpr({ coins: [1, 2, 5], amount: 11 })).toBe(
      "solve(input)",
    );
  });

  it("calls mergeTwoLists with ListNode wrappers for list params", () => {
    expect(
      buildEntryCallExpr({ list1: [1, 2], list2: [3] }, "mergeTwoLists"),
    ).toBe(
      "mergeTwoLists(arrayToList(Array.isArray(input.list1) ? input.list1 : []), arrayToList(Array.isArray(input.list2) ? input.list2 : []))",
    );
  });

  it("passes plain arrays for solve(list1, list2) array merge", () => {
    expect(
      buildEntryCallExpr(
        { list1: [1, 2], list2: [3] },
        "solve",
        { paramNames: ["list1", "list2"] },
      ),
    ).toBe("solve(input.list1, input.list2)");
  });

  it("passes full input for sheet l1/l2 merge", () => {
    expect(buildSolveCallExpr({ l1: [1, 2, 4], l2: [1, 3, 4] })).toBe(
      "solve(input)",
    );
  });

  it("wraps list params with arrayToList for mergeTwoLists", () => {
    expect(
      buildEntryCallExpr({ list1: [1, 2], list2: [3] }, "mergeTwoLists"),
    ).toBe(
      "mergeTwoLists(arrayToList(Array.isArray(input.list1) ? input.list1 : []), arrayToList(Array.isArray(input.list2) ? input.list2 : []))",
    );
  });

  it("normalizes list1 to l1 alias", () => {
    const n = normalizeRunnerInput({ list1: [1], list2: [2] }) as Record<
      string,
      unknown
    >;
    expect(n.l1).toEqual([1]);
    expect(n.l2).toEqual([2]);
  });
});

describe("detectEntryFunction", () => {
  it("prefers mergeTwoLists when present", () => {
    const code = `function mergeTwoLists(a, b) { return a; }`;
    expect(detectEntryFunction(code)).toBe("mergeTwoLists");
  });

  it("falls back to solve", () => {
    expect(detectEntryFunction(`function solve(nums) { return nums; }`)).toBe(
      "solve",
    );
  });
});

describe("ListNode prelude", () => {
  it("runs mergeTwoLists with ListNode dummy node", () => {
    const code = `
function mergeTwoLists(list1, list2) {
  let dummy = new ListNode(-1);
  let tail = dummy;
  while (list1 && list2) {
    if (list1.val < list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }
  tail.next = list1 || list2;
  return dummy.next;
}`;
    const stdin = "list1 = [1,2,4]\nlist2 = [1,3,4]";
    const result = runCodeSync(code, stdin);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.trace.stdout.trim()).toContain("[1,1,2,3,4,4]");
      expect(result.trace.events.length).toBeGreaterThan(0);
    }
  });
});

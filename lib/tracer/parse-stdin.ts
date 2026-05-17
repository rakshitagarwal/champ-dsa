import { parseHumanInput } from "@/lib/io/human-input";

export function parseStdin(stdin: string): unknown {
  const trimmed = stdin.trim();
  if (!trimmed) return {};
  if (!trimmed.startsWith("{")) {
    const human = parseHumanInput(trimmed);
    if (human && typeof human === "object" && Object.keys(human as object).length > 0) {
      return human;
    }
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    const lines = trimmed.split("\n").map((l) => l.trim());
    if (lines.length === 1) {
      const nums = lines[0].split(/[\s,]+/).map(Number);
      if (nums.every((n) => !Number.isNaN(n))) {
        return { nums, target: nums[nums.length - 1] };
      }
    }
    return { raw: trimmed, lines };
  }
}

export function buildRunnerTail(input: unknown): string {
  return `
try {
  var input = ${JSON.stringify(input)};
  if (typeof solve === "function") {
    if (input.tree !== undefined) {
      var __result = solve(input.tree);
    } else if (input.graph !== undefined) {
      var __result = solve(input.graph, input.start);
    } else if (Array.isArray(input.coins) && typeof input.amount === "number") {
      var __result = solve(input.coins, input.amount);
    } else if (Array.isArray(input.nums) && typeof input.target === "number") {
      var __result = solve(input.nums, input.target);
    } else if (Array.isArray(input.nums)) {
      var __result = solve(input.nums);
    } else if (typeof input.n === "number") {
      var __result = solve(input.n);
    } else {
      var __result = solve(input);
    }
    if (typeof console !== "undefined" && console.log) console.log(__result);
  }
} catch (__runErr) {
  __trace({ line: 1, type: "throw", variables: { error: String(__runErr) } });
  throw __runErr;
}
`;
}

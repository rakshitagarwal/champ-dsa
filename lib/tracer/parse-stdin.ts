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

function isPassableArg(v: unknown): boolean {
  if (v === null) return true;
  const t = typeof v;
  return t === "string" || t === "number" || t === "boolean" || Array.isArray(v);
}

/** Build `solve(...)` call from parsed input — matches `function solve(s)` not only `solve(input)`. */
export function buildSolveCallExpr(input: unknown): string {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return "solve(input)";
  }
  const obj = input as Record<string, unknown>;

  if (obj.tree !== undefined) return "solve(input.tree)";
  if (obj.graph !== undefined) {
    return obj.start !== undefined
      ? "solve(input.graph, input.start)"
      : "solve(input.graph)";
  }
  if (Array.isArray(obj.coins) && typeof obj.amount === "number") {
    return "solve(input.coins, input.amount)";
  }
  if (Array.isArray(obj.nums) && typeof obj.target === "number") {
    return "solve(input.nums, input.target)";
  }
  if (Array.isArray(obj.nums) && typeof obj.k === "number") {
    return "solve(input.nums, input.k)";
  }
  if (Array.isArray(obj.nums)) return "solve(input.nums)";
  if (typeof obj.n === "number") return "solve(input.n)";
  if (typeof obj.s === "string") return "solve(input.s)";
  if (typeof obj.str === "string") return "solve(input.str)";

  const keys = Object.keys(obj);
  if (keys.length === 1) {
    const k = keys[0]!;
    if (isPassableArg(obj[k])) return `solve(input.${k})`;
  }
  if (
    keys.length > 0 &&
    keys.length <= 5 &&
    keys.every((k) => isPassableArg(obj[k]))
  ) {
    return `solve(${keys.map((k) => `input.${k}`).join(", ")})`;
  }

  return "solve(input)";
}

export function buildRunnerTail(input: unknown): string {
  const solveCall = buildSolveCallExpr(input);
  return `
try {
  var input = ${JSON.stringify(input)};
  if (typeof solve === "function") {
    var __result = ${solveCall};
    if (typeof console !== "undefined" && console.log) {
      console.log(typeof __result === "object" && __result !== null
        ? JSON.stringify(__result)
        : __result);
    }
  }
} catch (__runErr) {
  __trace({ line: 1, type: "throw", variables: { error: String(__runErr) } });
  throw __runErr;
}
`;
}

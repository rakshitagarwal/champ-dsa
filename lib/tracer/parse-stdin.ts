import { parseHumanInput } from "@/lib/io/human-input";

const LIST_PARAM_KEYS = new Set([
  "list1",
  "list2",
  "l1",
  "l2",
  "head",
  "list",
]);

export function parseStdin(stdin: string): unknown {
  const trimmed = stdin.trim();
  if (!trimmed) return {};
  if (!trimmed.startsWith("{")) {
    const human = parseHumanInput(trimmed);
    if (human && typeof human === "object" && Object.keys(human as object).length > 0) {
      return normalizeRunnerInput(human);
    }
  }
  try {
    return normalizeRunnerInput(JSON.parse(trimmed));
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

/** Alias list1/list2 and l1/l2 for LeetCode vs sheet naming. */
export function normalizeRunnerInput(input: unknown): unknown {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return input;
  }
  const obj = { ...(input as Record<string, unknown>) };
  if (obj.list1 !== undefined && obj.l1 === undefined) obj.l1 = obj.list1;
  if (obj.list2 !== undefined && obj.l2 === undefined) obj.l2 = obj.list2;
  if (obj.l1 !== undefined && obj.list1 === undefined) obj.list1 = obj.l1;
  if (obj.l2 !== undefined && obj.list2 === undefined) obj.list2 = obj.l2;
  return obj;
}

function isPassableArg(v: unknown): boolean {
  if (v === null) return true;
  const t = typeof v;
  return t === "string" || t === "number" || t === "boolean" || Array.isArray(v);
}

function argExpr(key: string): string {
  const v = `input.${key}`;
  if (LIST_PARAM_KEYS.has(key)) {
    return `arrayToList(Array.isArray(${v}) ? ${v} : [])`;
  }
  return v;
}

/** Build entry function call from parsed stdin. */
export function buildEntryCallExpr(
  input: unknown,
  entryName: string = "solve",
): string {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return `${entryName}(input)`;
  }
  const obj = input as Record<string, unknown>;

  if (obj.tree !== undefined) {
    return `${entryName}(input.tree)`;
  }
  if (obj.graph !== undefined) {
    return obj.start !== undefined
      ? `${entryName}(input.graph, input.start)`
      : `${entryName}(input.graph)`;
  }
  if (Array.isArray(obj.coins) && typeof obj.amount === "number") {
    return `${entryName}(input.coins, input.amount)`;
  }
  if (Array.isArray(obj.nums) && typeof obj.target === "number") {
    return `${entryName}(input.nums, input.target)`;
  }
  if (Array.isArray(obj.nums) && typeof obj.k === "number") {
    return `${entryName}(input.nums, input.k)`;
  }
  if (Array.isArray(obj.nums)) return `${entryName}(input.nums)`;
  if (typeof obj.n === "number") return `${entryName}(input.n)`;
  if (typeof obj.s === "string") return `${entryName}(input.s)`;
  if (typeof obj.str === "string") return `${entryName}(input.str)`;

  const keys = Object.keys(obj).filter((k) => k !== "raw" && k !== "lines");
  if (keys.length === 1) {
    const k = keys[0]!;
    if (isPassableArg(obj[k])) return `${entryName}(${argExpr(k)})`;
  }
  if (
    keys.length > 0 &&
    keys.length <= 6 &&
    keys.every((k) => isPassableArg(obj[k]))
  ) {
    return `${entryName}(${keys.map((k) => argExpr(k)).join(", ")})`;
  }

  return `${entryName}(input)`;
}

/** @deprecated Use buildEntryCallExpr */
export function buildSolveCallExpr(input: unknown): string {
  return buildEntryCallExpr(input, "solve");
}

export function buildRunnerTail(
  input: unknown,
  entryName: string = "solve",
): string {
  const call = buildEntryCallExpr(input, entryName);
  const solveFallback = buildEntryCallExpr(input, "solve");
  return `
try {
  var input = ${JSON.stringify(input)};
  if (typeof ${entryName} === "function") {
    var __result = ${call};
    __printResult(__result);
  } else if (typeof solve === "function") {
    var __result = ${solveFallback};
    __printResult(__result);
  }
} catch (__runErr) {
  __trace({ line: 1, type: "throw", variables: { error: String(__runErr) } });
  throw __runErr;
}
`;
}

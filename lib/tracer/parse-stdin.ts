import { parseHumanInput } from "@/lib/io/human-input";

/** LeetCode ListNode params only — sheet uses plain arrays on input.l1/l2/head */
const LIST_PARAM_KEYS = new Set(["list1", "list2", "list"]);

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

/** Map LeetCode param names to keys present in parsed stdin. */
function inputKeyForParam(
  param: string,
  obj: Record<string, unknown>,
): string | null {
  if (obj[param] !== undefined) return param;
  if (param === "list1" && obj.l1 !== undefined) return "l1";
  if (param === "list2" && obj.l2 !== undefined) return "l2";
  if (param === "accounts" && obj.nums !== undefined) return "nums";
  if (param === "grid" && obj.nums !== undefined) return "nums";
  if (param === "mat" && obj.nums !== undefined) return "nums";
  if (param === "head" && obj.head !== undefined) return "head";
  return null;
}

/** Build entry function call from parsed stdin. */
export function buildEntryCallExpr(
  input: unknown,
  entryName: string = "solve",
  options?: { paramNames?: string[] },
): string {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return `${entryName}(input)`;
  }
  const obj = input as Record<string, unknown>;
  const keys = Object.keys(obj).filter((k) => k !== "raw" && k !== "lines");

  if (
    options?.paramNames?.length &&
    !(options.paramNames.length === 1 && options.paramNames[0] === "input")
  ) {
    const args = options.paramNames.map((param) => {
      const key = inputKeyForParam(param, obj);
      if (!key) return "undefined";
      const useListNode =
        entryName === "mergeTwoLists" ||
        entryName === "mergeKLists" ||
        entryName === "addTwoNumbers";
      if (useListNode && (LIST_PARAM_KEYS.has(param) || LIST_PARAM_KEYS.has(key))) {
        return argExpr(key);
      }
      return `input.${key}`;
    });
    return `${entryName}(${args.join(", ")})`;
  }

  const nums1d =
    Array.isArray(obj.nums) &&
    obj.nums.length > 0 &&
    !Array.isArray(obj.nums[0]);
  if (
    keys.length === 2 &&
    nums1d &&
    keys.includes("nums") &&
    keys.includes("target") &&
    typeof obj.target === "number"
  ) {
    return `${entryName}(input.nums, input.target)`;
  }
  if (keys.length === 1 && Array.isArray(obj.nums)) {
    return `${entryName}(input.nums)`;
  }
  if (keys.length === 1 && typeof obj.n === "number") {
    return `${entryName}(input.n)`;
  }

  if (keys.length === 1) {
    const k = keys[0]!;
    if (
      isPassableArg(obj[k]) &&
      (k === "nums" ||
        k === "n" ||
        k === "numRows" ||
        LIST_PARAM_KEYS.has(k))
    ) {
      return `${entryName}(${argExpr(k)})`;
    }
  }
  if (
    obj.list1 !== undefined &&
    obj.list2 !== undefined &&
    entryName === "mergeTwoLists"
  ) {
    return `${entryName}(${argExpr("list1")}, ${argExpr("list2")})`;
  }
  if (keys.length > 1) {
    return `${entryName}(input)`;
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
  options?: { paramNames?: string[] },
): string {
  const call = buildEntryCallExpr(input, entryName, options);
  const solveFallback = buildEntryCallExpr(input, "solve", options);
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

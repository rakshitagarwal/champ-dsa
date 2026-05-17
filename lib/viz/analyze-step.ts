import type { ExecutionEvent } from "@/types/execution";

export type CellChange = {
  arrayName: string;
  index: number;
  before: unknown;
  after: unknown;
};

export type PointerMove = {
  name: string;
  from: number | null;
  to: number;
};

export type StepDiff = {
  changedVars: { key: string; before: unknown; after: unknown }[];
  cellChanges: CellChange[];
  pointerMoves: PointerMove[];
  windowRange: { left: number; right: number } | null;
};

const POINTER_NAMES = [
  "i",
  "j",
  "left",
  "right",
  "low",
  "high",
  "mid",
  "start",
  "end",
];

export function analyzeStepDiff(
  prev: ExecutionEvent | null,
  curr: ExecutionEvent,
): StepDiff {
  const prevVars = prev?.variables ?? {};
  const currVars = curr.variables;

  const changedVars: StepDiff["changedVars"] = [];
  for (const key of Object.keys(currVars)) {
    if (key.startsWith("__")) continue;
    const before = prevVars[key];
    const after = currVars[key];
    if (JSON.stringify(before) !== JSON.stringify(after)) {
      changedVars.push({ key, before, after });
    }
  }

  const cellChanges: CellChange[] = [];
  for (const [key, val] of Object.entries(currVars)) {
    if (!Array.isArray(val)) continue;
    const prevArr = prevVars[key];
    if (!Array.isArray(prevArr)) continue;
    const len = Math.max(val.length, prevArr.length);
    for (let i = 0; i < len; i++) {
      if (JSON.stringify(val[i]) !== JSON.stringify(prevArr[i])) {
        cellChanges.push({
          arrayName: key,
          index: i,
          before: prevArr[i],
          after: val[i],
        });
      }
    }
  }

  const pointerMoves: PointerMove[] = [];
  for (const name of POINTER_NAMES) {
    const to = currVars[name];
    if (typeof to !== "number") continue;
    const fromVal = prevVars[name];
    const from = typeof fromVal === "number" ? fromVal : null;
    if (from !== to) pointerMoves.push({ name, from, to });
  }

  let windowRange: StepDiff["windowRange"] = null;
  const left = currVars.left ?? currVars.start;
  const right = currVars.right ?? currVars.end ?? currVars.j;
  if (typeof left === "number" && typeof right === "number" && left <= right) {
    windowRange = { left, right };
  } else if (
    typeof currVars.i === "number" &&
    typeof currVars.j === "number" &&
    currVars.i <= currVars.j
  ) {
    windowRange = { left: currVars.i, right: currVars.j };
  }

  return { changedVars, cellChanges, pointerMoves, windowRange };
}

export function findPrimaryArray(
  vars: Record<string, unknown>,
): { name: string; values: unknown[] } | null {
  const candidates = Object.entries(vars).filter(([, v]) => Array.isArray(v));
  if (candidates.length === 0) return null;
  const [name, values] = candidates.sort(
    (a, b) => (b[1] as unknown[]).length - (a[1] as unknown[]).length,
  )[0];
  return { name, values: values as unknown[] };
}

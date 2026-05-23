import type { TraceStep } from "@/lib/tracer/types";

/** Pedagogical two-pointer walkthrough (fast/slow on a linked list). */
export const FAST_SLOW_TRACE_CODE = `var middleNode = function (head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};`;

function buildListSteps(
  head: (number | string)[],
  line: number,
  desc: string,
  slowIdx: number,
  fastIdx: number,
  extraVars: Record<string, unknown> = {},
): TraceStep {
  return {
    line,
    description: desc,
    vars: { head: [...head], slow: slowIdx, fast: fastIdx, ...extraVars },
    ds: {
      linkedLists: [
        {
          id: "head",
          label: "head",
          values: [...head],
          highlightedNodeIndices: [slowIdx, fastIdx].filter(
            (v, i, a) => a.indexOf(v) === i,
          ),
        },
      ],
      listPointers: [
        { listId: "head", name: "slow", nodeIndex: slowIdx, color: "#60a5fa" },
        { listId: "head", name: "fast", nodeIndex: fastIdx, color: "#1D9E75" },
      ],
      arrays: [],
      pointers: [],
      stacks: [],
      hashmaps: [],
    },
  };
}

export function traceFastSlowMiddleList(head: (number | string)[]): TraceStep[] {
  const steps: TraceStep[] = [];
  if (head.length === 0) return steps;

  steps.push(
    buildListSteps(
      head,
      1,
      "Initialize slow and fast at head",
      0,
      0,
    ),
  );

  let slow = 0;
  let fast = 0;
  let loopCount = 0;

  while (fast < head.length - 1 && loopCount < 12) {
    loopCount++;
    const nextFast = Math.min(head.length - 1, fast + 2);
    steps.push(
      buildListSteps(
        head,
        4,
        `Loop ${loopCount}: fast can advance (fast at index ${fast})`,
        slow,
        fast,
      ),
    );

    fast = nextFast;
    steps.push(
      buildListSteps(
        head,
        5,
        `Moved fast two nodes forward (index ${fast})`,
        slow,
        fast,
      ),
    );

    if (slow < head.length - 1) {
      slow += 1;
      steps.push(
        buildListSteps(
          head,
          6,
          `Moved slow one node forward (index ${slow})`,
          slow,
          fast,
        ),
      );
    }

    if (fast >= head.length - 1) break;
  }

  steps.push(
    buildListSteps(
      head,
      8,
      `Done — middle node at index ${slow}`,
      slow,
      Math.min(fast, head.length - 1),
    ),
  );

  return steps;
}

export function parseHeadInput(raw: unknown): { head: (number | string)[] } {
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as { head?: unknown };
      if (Array.isArray(parsed.head)) {
        return { head: parsed.head as (number | string)[] };
      }
    } catch {
      const m = raw.match(/\[([^\]]+)\]/);
      if (m) {
        return {
          head: m[1]!.split(",").map((s) => {
            const t = s.trim();
            const n = Number(t);
            return Number.isFinite(n) ? n : t;
          }),
        };
      }
    }
    const kv = raw.match(/head\s*=\s*\[([^\]]+)\]/i);
    if (kv) {
      return {
        head: kv[1]!.split(",").map((s) => Number(s.trim())),
      };
    }
  }
  if (raw && typeof raw === "object" && "head" in raw) {
    const h = (raw as { head: unknown }).head;
    if (Array.isArray(h)) return { head: h as (number | string)[] };
  }
  return { head: [] };
}

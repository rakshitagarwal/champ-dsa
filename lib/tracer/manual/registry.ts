import type { TraceStep } from "@/lib/tracer/types";
import {
  BC016_TRACE_CODE,
  traceRunningSumOf1DArray,
} from "@/lib/tracer/manual/bc-016-running-sum";
import {
  BC019_TRACE_CODE,
  traceMaxSumCircularSubarray,
} from "@/lib/tracer/manual/max-sum-circular-subarray";
import {
  FAST_SLOW_TRACE_CODE,
  parseHeadInput,
  traceFastSlowMiddleList,
} from "@/lib/tracer/manual/fast-slow-linked-list";

export type ManualTracerInput = { nums?: number[]; head?: (number | string)[]; [key: string]: unknown };

export type ManualTracer = (input: ManualTracerInput) => TraceStep[];

export type ManualTracerMeta = {
  tracer: ManualTracer;
  traceCode: string;
  parseInput: (raw: unknown) => ManualTracerInput;
};

const BY_QUESTION: Record<string, ManualTracerMeta> = {
  "bc-016-running-sum-of-1d-array": {
    tracer: (input) => traceRunningSumOf1DArray(input.nums ?? []),
    traceCode: BC016_TRACE_CODE,
    parseInput: (raw) => {
      if (typeof raw === "string") {
        try {
          return JSON.parse(raw) as ManualTracerInput;
        } catch {
          const m = raw.match(/\[([^\]]+)\]/);
          if (m) {
            const nums = m[1]!.split(",").map((s) => Number(s.trim()));
            return { nums };
          }
        }
      }
      if (raw && typeof raw === "object" && "nums" in raw) {
        return raw as ManualTracerInput;
      }
      return { nums: Array.isArray(raw) ? (raw as number[]) : [] };
    },
  },
  "bc-019-maximum-sum-circular-subarray": {
    tracer: (input) => traceMaxSumCircularSubarray(input.nums ?? []),
    traceCode: BC019_TRACE_CODE,
    parseInput: (raw) => {
      if (typeof raw === "string") {
        try {
          return JSON.parse(raw) as ManualTracerInput;
        } catch {
          const m = raw.match(/\[([^\]]+)\]/);
          if (m) {
            const nums = m[1]!.split(",").map((s) => Number(s.trim()));
            return { nums };
          }
        }
      }
      if (raw && typeof raw === "object" && "nums" in raw) {
        return raw as ManualTracerInput;
      }
      return { nums: [] };
    },
  },
  "bc-054-middle-of-the-linked-list": {
    tracer: (input) => traceFastSlowMiddleList(input.head ?? []),
    traceCode: FAST_SLOW_TRACE_CODE,
    parseInput: parseHeadInput,
  },
};

const BY_PATTERN: Record<string, ManualTracerMeta> = {
  "fast-slow-pointers": {
    tracer: (input) =>
      traceFastSlowMiddleList(
        input.head ?? (input.nums as (number | string)[] | undefined) ?? [],
      ),
    traceCode: FAST_SLOW_TRACE_CODE,
    parseInput: parseHeadInput,
  },
};

export function getManualTracerMeta(
  questionId: string,
  patternSlug?: string | null,
): ManualTracerMeta | null {
  if (questionId in BY_QUESTION) {
    return BY_QUESTION[questionId] ?? null;
  }
  if (patternSlug && patternSlug in BY_PATTERN) {
    return BY_PATTERN[patternSlug] ?? null;
  }
  return null;
}

export function hasManualTracer(
  questionId: string,
  patternSlug?: string | null,
): boolean {
  return getManualTracerMeta(questionId, patternSlug) !== null;
}

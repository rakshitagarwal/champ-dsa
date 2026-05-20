import type { TraceStep } from "@/lib/tracer/types";
import {
  BC016_TRACE_CODE,
  traceRunningSumOf1DArray,
} from "@/lib/tracer/manual/bc-016-running-sum";
import {
  BC019_TRACE_CODE,
  traceMaxSumCircularSubarray,
} from "@/lib/tracer/manual/max-sum-circular-subarray";

export type ManualTracerInput = { nums?: number[]; [key: string]: unknown };

export type ManualTracer = (input: ManualTracerInput) => TraceStep[];

export type ManualTracerMeta = {
  tracer: ManualTracer;
  traceCode: string;
  parseInput: (raw: unknown) => ManualTracerInput;
};

const MANUAL: Record<string, ManualTracerMeta> = {
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
};

export function getManualTracerMeta(
  questionId: string,
): ManualTracerMeta | null {
  return MANUAL[questionId] ?? null;
}

export function hasManualTracer(questionId: string): boolean {
  return questionId in MANUAL;
}

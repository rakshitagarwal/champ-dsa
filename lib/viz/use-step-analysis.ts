"use client";

import { useMemo } from "react";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { explainStep } from "@/lib/explain/heuristics";
import {
  analyzeStepDiff,
  findPrimaryArray,
} from "@/lib/viz/analyze-step";
import { filterChangedVars } from "@/lib/viz/display-vars";
import type { ExecutionEvent } from "@/types/execution";

export function getLineSnippet(code: string, line: number): string | null {
  const lines = code.split("\n");
  if (line < 1 || line > lines.length) return null;
  return lines[line - 1]?.trim() || null;
}

export function useStepAnalysis() {
  const current = useVisualizerStore((s) => s.currentEvent());
  const previous = useVisualizerStore((s) => s.previousEvent());
  const stepIndex = useVisualizerStore((s) => s.stepIndex);
  const trace = useVisualizerStore((s) => s.trace);
  const patternName = useVisualizerStore((s) => s.patternName);
  const code = useVisualizerStore((s) => s.code);

  return useMemo(() => {
    const totalSteps = trace?.events.length ?? 0;
    if (!current) {
      return {
        current: null as ExecutionEvent | null,
        previous,
        stepIndex,
        totalSteps,
        diff: null,
        visibleChanges: [] as { key: string; before: unknown; after: unknown }[],
        primary: null as ReturnType<typeof findPrimaryArray>,
        pointers: [] as { name: string; from: number | null; to: number }[],
        changedIndices: new Set<number>(),
        explanation: "",
        lineSnippet: null as string | null,
        showCallStack: false,
      };
    }

    const diff = analyzeStepDiff(previous, current);
    const visibleChanges = filterChangedVars(diff.changedVars, current.type);
    const primary =
      findPrimaryArray(current.variables) ??
      stringAsArray(current.variables.s, "s");
    const explanation = explainStep(previous, current, patternName);
    const pointers = diff.pointerMoves.length
      ? diff.pointerMoves
      : getPointerPositions(current.variables, primary?.values.length ?? 0);
    const changedIndices = new Set(
      diff.cellChanges
        .filter((c) => !primary || c.arrayName === primary.name)
        .map((c) => c.index),
    );
    const showCallStack =
      current.callStack.length > 0 &&
      (current.type !== "enter" || current.callStack.length > 1);
    const lineSnippet =
      current.type !== "enter" ? getLineSnippet(code, current.line) : null;

    return {
      current,
      previous,
      stepIndex,
      totalSteps,
      diff,
      visibleChanges,
      primary,
      pointers,
      changedIndices,
      explanation,
      lineSnippet,
      showCallStack,
    };
  }, [current, previous, stepIndex, trace, patternName, code]);
}

function stringAsArray(
  v: unknown,
  name: string,
): { name: string; values: unknown[] } | null {
  if (typeof v !== "string" || v.length === 0) return null;
  return { name, values: [...v] };
}

function getPointerPositions(
  vars: Record<string, unknown>,
  len: number,
): { name: string; from: number | null; to: number }[] {
  const names = ["i", "j", "left", "right", "low", "high", "mid"];
  return names
    .filter((n) => typeof vars[n] === "number")
    .map((n) => ({
      name: n,
      from: null,
      to: vars[n] as number,
    }))
    .filter((p) => p.to >= 0 && p.to < len);
}

"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { explainStep } from "@/lib/explain/heuristics";
import {
  analyzeStepDiff,
  findPrimaryArray,
} from "@/lib/viz/analyze-step";
import {
  filterChangedVars,
  formatDisplayVar,
} from "@/lib/viz/display-vars";
import { StackPanel } from "./stack-panel";
import { cn } from "@/lib/utils";
import type { ExecutionEvent } from "@/types/execution";

const CELL_W = 48;
const CELL_GAP = 6;

export function AnimationStage() {
  const current = useVisualizerStore((s) => s.currentEvent());
  const previous = useVisualizerStore((s) => s.previousEvent());
  const stepIndex = useVisualizerStore((s) => s.stepIndex);
  const trace = useVisualizerStore((s) => s.trace);
  const patternName = useVisualizerStore((s) => s.patternName);

  const totalSteps = trace?.events.length ?? 0;

  if (!current) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center">
        <p className="text-lg font-medium text-foreground">Step-by-step walkthrough</p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Click <strong>Run</strong> on your solution to see how each line
          executes on the example input. Use the toolbar to step forward and
          back.
        </p>
      </div>
    );
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

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-gradient-to-b from-muted/15 to-background">
      <div className="shrink-0 border-b border-border/80 bg-muted/30 px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {current.type !== "enter" ? (
              <span className="inline-flex items-center rounded bg-primary/90 px-2 py-0.5 font-mono text-xs font-semibold text-primary-foreground">
                Line {current.line}
              </span>
            ) : (
              <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 font-mono text-xs font-medium text-foreground">
                {current.frameName ?? "solve"}()
              </span>
            )}
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {current.type}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground">
            Step {stepIndex + 1} / {totalSteps}
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-snug text-foreground/95">
          {explanation}
        </p>

        {visibleChanges.length > 0 ? (
          <VariableDiffList changes={visibleChanges} current={current} />
        ) : null}
      </div>

      <div className="relative flex min-h-0 flex-1 gap-3 overflow-y-auto p-4">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center">
          {primary && primary.values.length > 0 ? (
            <ArrayCanvas
              primary={primary}
              diff={diff}
              changedIndices={changedIndices}
              pointers={pointers}
            />
          ) : (
            <NoArrayCanvas current={current} hasVarChanges={visibleChanges.length > 0} />
          )}
        </div>

        {showCallStack ? (
          <aside className="w-[min(11rem,28%)] shrink-0 overflow-y-auto rounded-lg border border-border/70 bg-card/50 p-2">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Call stack
            </p>
            <StackPanel
              frames={current.callStack}
              activeFrameId={
                current.callStack[current.callStack.length - 1]?.id ?? null
              }
            />
          </aside>
        ) : null}
      </div>
    </div>
  );
}

function VariableDiffList({
  changes,
  current,
}: {
  changes: { key: string; before: unknown; after: unknown }[];
  current: ExecutionEvent;
}) {
  return (
    <ul className="mt-2 flex flex-wrap gap-1.5">
      {changes.slice(0, 6).map((c) => (
        <li
          key={c.key}
          className="rounded border border-border bg-background/80 px-2 py-0.5 font-mono text-[11px] text-foreground"
        >
          <span className="text-muted-foreground">{c.key}</span>
          <span className="mx-1 text-muted-foreground/70">→</span>
          <span>{formatDisplayVar(current.variables[c.key])}</span>
        </li>
      ))}
    </ul>
  );
}

function ArrayCanvas({
  primary,
  diff,
  changedIndices,
  pointers,
}: {
  primary: { name: string; values: unknown[] };
  diff: ReturnType<typeof analyzeStepDiff>;
  changedIndices: Set<number>;
  pointers: { name: string; from: number | null; to: number }[];
}) {
  return (
    <div className="w-full overflow-x-auto">
      <p className="mb-3 text-center text-xs font-medium text-muted-foreground">
        {primary.name}
      </p>

      {diff.windowRange && primary.values.length > 0 && (
        <WindowBracket
          left={diff.windowRange.left}
          right={diff.windowRange.right}
          length={primary.values.length}
        />
      )}

      <div
        className="relative mx-auto flex items-end justify-center"
        style={{
          gap: CELL_GAP,
          minWidth: primary.values.length * (CELL_W + CELL_GAP) - CELL_GAP,
        }}
      >
        {primary.values.slice(0, 32).map((cell, idx) => {
          const isChanged = changedIndices.has(idx);
          const pointerHere = pointers.filter((p) => p.to === idx);
          const isInWindow =
            diff.windowRange &&
            idx >= diff.windowRange.left &&
            idx <= diff.windowRange.right;

          return (
            <div
              key={idx}
              className="relative flex flex-col items-center"
              style={{ width: CELL_W }}
            >
              <div className="mb-1 flex min-h-[22px] flex-wrap justify-center gap-0.5">
                <AnimatePresence mode="popLayout">
                  {pointerHere.map((p) => (
                    <motion.span
                      key={p.name}
                      layoutId={`ptr-${p.name}`}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-full bg-amber-500/90 px-1.5 py-px text-[9px] font-bold text-amber-950"
                    >
                      {p.name}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div
                layout
                animate={isChanged ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "flex h-12 w-full items-center justify-center rounded-md border font-mono text-sm font-medium",
                  isChanged && "border-amber-500/60 bg-amber-500/15",
                  !isChanged && isInWindow && "border-primary/50 bg-primary/10",
                  !isChanged &&
                    !isInWindow &&
                    pointerHere.length > 0 &&
                    "border-amber-500/30 bg-amber-500/5",
                  !isChanged &&
                    !isInWindow &&
                    !pointerHere.length &&
                    "border-border bg-card",
                )}
              >
                {formatCell(cell)}
              </motion.div>
              <span className="mt-0.5 font-mono text-[9px] text-muted-foreground">
                {idx}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatCell(cell: unknown): string {
  if (typeof cell === "string" && cell.length <= 2) return cell;
  return String(cell);
}

function stringAsArray(
  v: unknown,
  name: string,
): { name: string; values: unknown[] } | null {
  if (typeof v !== "string" || v.length === 0) return null;
  return { name, values: [...v] };
}

function NoArrayCanvas({
  current,
  hasVarChanges,
}: {
  current: ExecutionEvent;
  hasVarChanges: boolean;
}) {
  if (current.type === "return" && current.returnValue !== undefined) {
    return (
      <p className="text-center font-mono text-sm">
        return {formatDisplayVar(current.returnValue)}
      </p>
    );
  }

  if (hasVarChanges) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        State updated — see changes above.
      </p>
    );
  }

  if (current.type === "enter") {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Press <strong>Next</strong> to run the first line of the function.
      </p>
    );
  }

  return (
    <p className="text-center text-sm text-muted-foreground">
      Watch the highlighted line in the editor.
    </p>
  );
}

function WindowBracket({
  left,
  right,
  length,
}: {
  left: number;
  right: number;
  length: number;
}) {
  const startX = left * (CELL_W + CELL_GAP) + CELL_W / 2;
  const endX = right * (CELL_W + CELL_GAP) + CELL_W / 2;
  const width = endX - startX + CELL_W;

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.3 }}
      animate={{ opacity: 1, scaleX: 1 }}
      className="relative mx-auto mb-2 h-5"
      style={{
        width: length * (CELL_W + CELL_GAP) - CELL_GAP,
        maxWidth: "100%",
      }}
    >
      <div
        className="absolute top-1.5 h-2.5 rounded-t border-2 border-b-0 border-primary"
        style={{ left: startX, width }}
      />
    </motion.div>
  );
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

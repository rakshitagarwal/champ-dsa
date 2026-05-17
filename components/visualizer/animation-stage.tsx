"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { explainStep } from "@/lib/explain/heuristics";
import {
  analyzeStepDiff,
  findPrimaryArray,
} from "@/lib/viz/analyze-step";
import { VariablesCorner } from "./variables-corner";
import { cn } from "@/lib/utils";
import type { ExecutionEvent } from "@/types/execution";
import type { StepDiff } from "@/lib/viz/analyze-step";

const CELL_W = 56;
const CELL_GAP = 8;

export function AnimationStage() {
  const current = useVisualizerStore((s) => s.currentEvent());
  const previous = useVisualizerStore((s) => s.previousEvent());
  const stepIndex = useVisualizerStore((s) => s.stepIndex);
  const patternName = useVisualizerStore((s) => s.patternName);

  if (!current) {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center">
        <p className="text-lg font-medium text-foreground">
          Animation canvas
        </p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Click <strong>Run</strong>, then use <strong>Next</strong> to watch
          each line change the data structure — like a code animation video.
        </p>
      </div>
    );
  }

  const diff = analyzeStepDiff(previous, current);
  const primary = findPrimaryArray(current.variables);
  const explanation = explainStep(previous, current, patternName);
  const pointers = diff.pointerMoves.length
    ? diff.pointerMoves
    : getPointerPositions(current.variables, primary?.values.length ?? 0);

  const changedIndices = new Set(
    diff.cellChanges
      .filter((c) => !primary || c.arrayName === primary.name)
      .map((c) => c.index),
  );

  return (
    <div className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-xl border border-border bg-gradient-to-b from-muted/20 to-background">
      {/* Step banner — ties animation to current line */}
      <div className="border-b border-primary/30 bg-primary/10 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-primary px-2.5 py-1 font-mono text-sm font-bold text-primary-foreground shadow-sm">
            Line {current.line}
          </span>
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            {current.type}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-foreground">
          {explanation}
        </p>
      </div>

      {/* Main animation area */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-6">
        {primary ? (
          <div className="w-full overflow-x-auto pb-4">
            <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
              {primary.name}
              <span className="text-foreground">[]</span>
            </p>

            {/* Window bracket */}
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
                minWidth:
                  primary.values.length * (CELL_W + CELL_GAP) - CELL_GAP,
              }}
            >
              {primary.values.slice(0, 20).map((cell, idx) => {
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
                    {/* Pointer labels */}
                    <div className="mb-2 flex min-h-[28px] flex-wrap justify-center gap-1">
                      <AnimatePresence mode="popLayout">
                        {pointerHere.map((p) => (
                          <motion.span
                            key={p.name}
                            layoutId={`ptr-${p.name}`}
                            initial={{ opacity: 0, y: -8, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-amber-950 shadow-md"
                          >
                            {p.name}
                            {p.from !== null && p.from !== p.to && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="ml-1 opacity-70"
                              >
                                ←
                              </motion.span>
                            )}
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>

                    <motion.div
                      layout
                      animate={
                        isChanged
                          ? {
                              scale: [1, 1.12, 1],
                              boxShadow: [
                                "0 0 0 0 rgba(250,204,21,0)",
                                "0 0 24px 4px rgba(250,204,21,0.6)",
                                "0 0 0 0 rgba(250,204,21,0)",
                              ],
                            }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.55, ease: "easeOut" }}
                      className={cn(
                        "flex w-full items-center justify-center rounded-lg border-2 font-mono text-lg font-semibold transition-colors",
                        isChanged && "border-amber-400 bg-amber-400/25",
                        !isChanged &&
                          isInWindow &&
                          "border-primary/60 bg-primary/15",
                        !isChanged &&
                          !isInWindow &&
                          pointerHere.length > 0 &&
                          "border-amber-500/50 bg-amber-500/10",
                        !isChanged &&
                          !isInWindow &&
                          pointerHere.length === 0 &&
                          "border-border bg-card",
                      )}
                      style={{ height: 64 }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={String(cell)}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                        >
                          {String(cell)}
                        </motion.span>
                      </AnimatePresence>
                    </motion.div>
                    <span className="mt-1.5 font-mono text-[10px] text-muted-foreground">
                      {idx}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Change chips */}
            <AnimatePresence>
              {diff.cellChanges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 flex flex-wrap justify-center gap-2"
                >
                  {diff.cellChanges.slice(0, 6).map((c) => (
                    <span
                      key={`${c.arrayName}-${c.index}`}
                      className="rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 font-mono text-xs text-amber-200"
                    >
                      {c.arrayName}[{c.index}]: {String(c.before)} →{" "}
                      <strong>{String(c.after)}</strong>
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <RecursionOrStackFallback current={current} diff={diff} />
        )}

        {/* Variables — corner overlay */}
        <div className="absolute bottom-3 right-3 z-10">
          <VariablesCorner />
        </div>
      </div>
    </div>
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
      className="relative mx-auto mb-2 h-6"
      style={{ width: length * (CELL_W + CELL_GAP) - CELL_GAP, maxWidth: "100%" }}
    >
      <div
        className="absolute top-2 h-3 rounded-t-md border-2 border-b-0 border-primary"
        style={{ left: startX, width }}
      />
      <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-primary">
        window
      </span>
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

function RecursionOrStackFallback({
  current,
  diff,
}: {
  current: ExecutionEvent;
  diff: StepDiff;
}) {
  if (current.callStack.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-3 text-center"
      >
        <p className="text-sm font-medium">Call stack</p>
        <div className="flex flex-col items-center gap-2">
          {current.callStack.map((frame, i) => (
            <motion.div
              key={`${frame.name}-${i}`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-lg border-2 border-primary/40 bg-primary/10 px-6 py-2 font-mono text-sm"
            >
              {frame.name}() <span className="text-muted-foreground">L{frame.line}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <p className="text-sm text-muted-foreground">
      {diff.changedVars.length > 0
        ? `Updated: ${diff.changedVars.map((c) => c.key).join(", ")}`
        : "Step recorded — check variables in the corner."}
    </p>
  );
}

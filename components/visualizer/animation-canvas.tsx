"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStepAnalysis } from "@/lib/viz/use-step-analysis";
import { formatDisplayVar } from "@/lib/viz/display-vars";
import { StackPanel } from "./stack-panel";
import { cn } from "@/lib/utils";
import type { ExecutionEvent } from "@/types/execution";
import type { analyzeStepDiff } from "@/lib/viz/analyze-step";

const CELL_W = 48;
const CELL_GAP = 6;

/** Array / pointer animation only — used in fullscreen modal. */
export function AnimationCanvas() {
  const {
    current,
    diff,
    visibleChanges,
    primary,
    pointers,
    changedIndices,
    showCallStack,
  } = useStepAnalysis();

  if (!current || !diff) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
        Run your code to open the visualization.
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-gradient-to-b from-muted/10 to-background">
      <div className="relative flex min-h-0 flex-1 gap-3 overflow-y-auto overscroll-contain p-4">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col items-start justify-start">
          {primary && primary.values.length > 0 ? (
            <ArrayCanvas
              primary={primary}
              diff={diff}
              changedIndices={changedIndices}
              pointers={pointers}
            />
          ) : (
            <NoArrayCanvas
              current={current}
              hasVarChanges={visibleChanges.length > 0}
            />
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
                      layoutId={`ptr-fs-${p.name}`}
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
        No array on screen — state changed in variables.
      </p>
    );
  }

  if (current.type === "enter") {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Press <strong>Next</strong> to start stepping through lines.
      </p>
    );
  }

  return (
    <p className="text-center text-sm text-muted-foreground">
      Follow the highlighted line in the code panel.
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

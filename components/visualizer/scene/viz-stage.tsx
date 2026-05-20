"use client";

import { motion } from "framer-motion";
import { analyzeStepDiff } from "@/lib/viz/analyze-step";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import type { VizScene } from "@/types/viz-scene";
import { StackPanel } from "../stack-panel";
import { ArrayView } from "./array-view";
import { GraphView } from "./graph-view";
import { HeapView } from "./heap-view";
import { LinkedListView } from "./linked-list-view";
import { StackView } from "./stack-view";
import { TreeView } from "./tree-view";
import { StringStackView } from "./string-stack-view";
import { QueueView, isQueueVariable } from "./queue-view";
import type { SceneStepDiff } from "@/lib/viz/scene/step-diff";

type Props = {
  scene: VizScene | null;
  changedIndices?: Set<number>;
  stepDiff?: SceneStepDiff | null;
  darkStage?: boolean;
};

export function VizStage({
  scene,
  changedIndices,
  stepDiff,
  darkStage = false,
}: Props) {
  const isRunning = useVisualizerStore((s) => s.isRunning);
  const vizSetupError = useVisualizerStore((s) => s.vizSetupError);
  const solutionFilled = useVisualizerStore((s) => s.solutionFilled);

  if (isRunning) {
    return <VizSetupLoader message="Running solution…" />;
  }

  if (!scene) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
        {vizSetupError ? (
          <span className="text-amber-600 dark:text-amber-400">{vizSetupError}</span>
        ) : solutionFilled ? (
          "Preparing animation…"
        ) : (
          "Use Fill Solution, then Visualize."
        )}
      </div>
    );
  }

  const stackStruct = scene.structures.find(
    (s): s is Extract<typeof s, { kind: "stack" }> => s.kind === "stack",
  );
  const useStringStack = scene.stringWalk && stackStruct;

  const stageBg = darkStage
    ? "bg-[#161b22]"
    : "bg-gradient-to-b from-slate-950/40 via-background to-background";

  return (
    <div className={`relative flex h-full min-h-0 flex-col overflow-hidden ${stageBg}`}>
      <div className="relative flex min-h-0 flex-1 gap-3 overflow-y-auto overscroll-contain p-4 md:p-6">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-8">
          {useStringStack ? (
            <StringStackView
              stringWalk={scene.stringWalk!}
              stack={stackStruct}
              caption={scene.caption}
            />
          ) : null}
          {scene.structures.map((s) => {
            if (useStringStack && s.kind === "stack") return null;
            switch (s.kind) {
              case "array":
                if (isQueueVariable(s.variable)) {
                  return (
                    <QueueView
                      key={s.id}
                      structure={s}
                      pointers={scene.pointers}
                      highlights={scene.highlights}
                      changedIndices={
                        stepDiff?.changedArrayCells.get(s.id) ??
                        changedIndices
                      }
                    />
                  );
                }
                return (
                  <ArrayView
                    key={s.id}
                    structure={s}
                    pointers={scene.pointers}
                    highlights={scene.highlights}
                    changedIndices={
                      stepDiff?.changedArrayCells.get(s.id) ?? changedIndices
                    }
                  />
                );
              case "linkedList":
                return (
                  <LinkedListView
                    key={s.id}
                    structure={s}
                    pointers={scene.pointers}
                    highlights={scene.highlights}
                    changedNodeIds={stepDiff?.changedListNodeIds}
                  />
                );
              case "stack":
                return (
                  <StackView
                    key={s.id}
                    structure={s}
                    lastAction={stepDiff?.stackAction ?? undefined}
                  />
                );
              case "tree":
                return (
                  <TreeView
                    key={s.id}
                    structure={s}
                    pointers={scene.pointers}
                    highlights={scene.highlights}
                  />
                );
              case "heap":
                return (
                  <HeapView
                    key={s.id}
                    structure={s}
                    pointers={scene.pointers}
                    highlights={scene.highlights}
                  />
                );
              case "graph":
                return (
                  <GraphView
                    key={s.id}
                    structure={s}
                    pointers={scene.pointers}
                    highlights={scene.highlights}
                  />
                );
              default:
                return null;
            }
          })}
          {scene.structures.length === 0 && (
            <p className="text-sm text-muted-foreground">No structures to display.</p>
          )}
        </div>

        {scene.showCallStack && scene.callStack && scene.callStack.length > 0 ? (
          <aside className="w-[min(11rem,26%)] shrink-0 overflow-y-auto rounded-lg border border-border/70 bg-card/40 p-2 backdrop-blur-sm">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              stack
            </p>
            <StackPanel
              frames={scene.callStack}
              activeFrameId={
                scene.callStack[scene.callStack.length - 1]?.id ?? null
              }
            />
          </aside>
        ) : null}
      </div>

      {scene.scalars && Object.keys(scene.scalars).length > 0 && (
        <div className="absolute bottom-3 right-4 flex flex-wrap gap-3 font-mono text-sm text-teal-400/90">
          {Object.entries(scene.scalars).map(([k, v]) => (
            <span key={k}>
              {k} = {v}
            </span>
          ))}
        </div>
      )}

      {scene.caption && !useStringStack && (
        <motion.p
          key={scene.caption}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="shrink-0 border-t border-border/50 bg-muted/20 px-4 py-2 text-center font-mono text-xs text-muted-foreground"
        >
          {scene.caption}
        </motion.p>
      )}
    </div>
  );
}

function VizSetupLoader({ message = "Preparing animation…" }: { message?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-teal-500/30 border-t-teal-500" />
      <p className="text-base font-medium text-foreground">{message}</p>
    </div>
  );
}

export function useSceneChangedIndices(
  scene: VizScene | null,
): Set<number> {
  const trace = useVisualizerStore((s) => s.trace);
  const stepIndex = useVisualizerStore((s) => s.stepIndex);
  const eventIndices = useVisualizerStore((s) => s.compactedEventIndices);

  if (!scene || !trace) return new Set();

  const rawIdx = eventIndices[stepIndex] ?? stepIndex;
  const prev = rawIdx > 0 ? trace.events[rawIdx - 1]! : null;
  const curr = trace.events[rawIdx];
  if (!curr) return new Set();

  const diff = analyzeStepDiff(prev, curr);
  const arr = scene.structures.find((s) => s.kind === "array");
  if (!arr || arr.kind !== "array") return new Set();

  return new Set(
    diff.cellChanges
      .filter((c) => c.arrayName === arr.variable)
      .map((c) => c.index),
  );
}

"use client";

import { useEffect, useState } from "react";
import { roadmapOrder, getRoadmapPrerequisites } from "@/data/roadmap";
import { isPatternDone, LEARNING_UPDATED_EVENT } from "@/lib/storage/learning-store";
import { RoadmapNodeCard } from "./roadmap-node-card";

export function RoadmapGraph() {
  const [doneSet, setDoneSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    const refresh = () => {
      setDoneSet(
        new Set(roadmapOrder.filter((n) => isPatternDone(n.slug)).map((n) => n.slug)),
      );
    };
    refresh();
    window.addEventListener(LEARNING_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(LEARNING_UPDATED_EVENT, refresh);
  }, []);

  const prereqs = getRoadmapPrerequisites();

  return (
    <div className="relative space-y-6">
      {roadmapOrder.map((node, i) => {
        const locked = node.prerequisites.some((p) => !doneSet.has(p));
        return (
          <div key={node.slug} className="relative pl-8">
            {i < roadmapOrder.length - 1 && (
              <div
                className="absolute left-3 top-10 h-[calc(100%+0.5rem)] w-px bg-border"
                aria-hidden
              />
            )}
            <div
              className="absolute left-0 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-xs font-medium"
              aria-hidden
            >
              {node.order}
            </div>
            <RoadmapNodeCard node={node} locked={locked} />
          </div>
        );
      })}
    </div>
  );
}

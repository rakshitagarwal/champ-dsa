"use client";

import type { DataStructureSnapshot } from "@/lib/tracer/types";
import { ArrayVisualizer } from "./ArrayVisualizer";
import { StackVisualizer } from "./StackVisualizer";

type Props = {
  snapshot: DataStructureSnapshot;
};

export function AnimationPanel({ snapshot }: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 bg-[#161b22] p-8">
      {snapshot.arrays?.map((arr) => (
        <ArrayVisualizer
          key={arr.id}
          snapshot={arr}
          pointers={(snapshot.pointers ?? []).filter((p) => p.arrayId === arr.id)}
        />
      ))}
      {snapshot.stacks?.map((stk) => (
        <StackVisualizer key={stk.id} snapshot={stk} />
      ))}
    </div>
  );
}

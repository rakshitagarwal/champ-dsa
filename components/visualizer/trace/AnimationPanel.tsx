"use client";

import type { DataStructureSnapshot } from "@/lib/tracer/types";
import { ArrayVisualizer } from "./ArrayVisualizer";
import { StackVisualizer } from "./StackVisualizer";
import { HashmapVisualizer } from "./HashmapVisualizer";

type Props = {
  snapshot: DataStructureSnapshot;
};

export function AnimationPanel({ snapshot }: Props) {
  const stringArrays =
    snapshot.arrays?.filter((a) => a.id.startsWith("string:")) ?? [];
  const dataArrays =
    snapshot.arrays?.filter((a) => !a.id.startsWith("string:")) ?? [];
  const hasStack = (snapshot.stacks?.length ?? 0) > 0;
  const showStringStackRow = stringArrays.length > 0 && hasStack;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 bg-[#161b22] p-8">
      {showStringStackRow ? (
        <div className="flex w-full max-w-2xl flex-wrap items-start justify-center gap-10">
          {stringArrays.map((arr) => (
            <ArrayVisualizer
              key={arr.id}
              snapshot={arr}
              pointers={(snapshot.pointers ?? []).filter(
                (p) => p.arrayId === arr.id,
              )}
            />
          ))}
          {snapshot.stacks?.map((stk) => (
            <StackVisualizer key={stk.id} snapshot={stk} />
          ))}
        </div>
      ) : null}

      {!showStringStackRow
        ? stringArrays.map((arr) => (
            <ArrayVisualizer
              key={arr.id}
              snapshot={arr}
              pointers={(snapshot.pointers ?? []).filter(
                (p) => p.arrayId === arr.id,
              )}
            />
          ))
        : null}

      {!showStringStackRow
        ? snapshot.stacks?.map((stk) => (
            <StackVisualizer key={stk.id} snapshot={stk} />
          ))
        : null}

      {dataArrays.map((arr) => (
        <ArrayVisualizer
          key={arr.id}
          snapshot={arr}
          pointers={(snapshot.pointers ?? []).filter((p) => p.arrayId === arr.id)}
        />
      ))}

      {snapshot.hashmaps?.map((hm) => (
        <HashmapVisualizer key={hm.id} snapshot={hm} />
      ))}
    </div>
  );
}

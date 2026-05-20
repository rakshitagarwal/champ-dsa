"use client";

import { TreeView } from "./tree-view";
import { ArrayView } from "./array-view";
import type { PointerBinding, SceneHighlight, VizStructure } from "@/types/viz-scene";

type Props = {
  structure: Extract<VizStructure, { kind: "heap" }>;
  pointers: PointerBinding[];
  highlights: SceneHighlight[];
};

/** Heap uses tree layout; optional source array row below. */
export function HeapView({ structure, pointers, highlights }: Props) {
  const asTree: Extract<VizStructure, { kind: "tree" }> = {
    kind: "tree",
    id: structure.id,
    variable: structure.variable,
    label: structure.label,
    nodes: structure.nodes.map((n) => ({
      id: n.id,
      val: n.val,
      leftId: n.leftId,
      rightId: n.rightId,
    })),
    edges: structure.edges,
    rootId: structure.nodes[0]?.id ?? null,
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <TreeView structure={asTree} pointers={pointers} highlights={highlights} />
      {structure.arrayValues && structure.arrayValues.length > 0 && (
        <ArrayView
          structure={{
            kind: "array",
            id: `${structure.id}-arr`,
            variable: structure.variable,
            label: `${structure.label}[]`,
            values: structure.arrayValues,
          }}
          pointers={[]}
          highlights={[]}
        />
      )}
    </div>
  );
}

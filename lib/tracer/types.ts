export type ArrayHighlightKind =
  | "active"
  | "comparing"
  | "result"
  | "min"
  | "max"
  | "visited"
  | "swap";

export interface ArraySnapshot {
  id: string;
  label: string;
  values: (number | string | null)[];
  highlights: Partial<Record<number, ArrayHighlightKind>>;
}

export interface StackSnapshot {
  id: string;
  label: string;
  items: (number | string)[];
  lastAction?: "push" | "pop" | null;
}

export interface HashmapSnapshot {
  id: string;
  label: string;
  entries: { key: string; value: unknown; highlight?: boolean }[];
}

export interface PointerSnapshot {
  arrayId: string;
  name: string;
  index: number;
  color: string;
}

export interface LinkedListSnapshot {
  id: string;
  label: string;
  values: (number | string)[];
  highlightedNodeIndices?: number[];
}

export interface ListNodePointerSnapshot {
  listId: string;
  name: string;
  nodeIndex: number;
  color?: string;
}

export interface TreeSnapshot {
  id: string;
  label: string;
  levelOrder: (number | null)[];
  highlightedNodeIds?: string[];
}

export interface TreePointerSnapshot {
  treeId: string;
  name: string;
  nodeId: string;
  color?: string;
}

export interface GraphSnapshot {
  id: string;
  label: string;
  nodes: { id: string; label: string; val?: number | string }[];
  edges: { from: string; to: string }[];
  visitedNodeIds?: string[];
  activeNodeId?: string;
}

export interface DataStructureSnapshot {
  arrays?: ArraySnapshot[];
  stacks?: StackSnapshot[];
  hashmaps?: HashmapSnapshot[];
  pointers?: PointerSnapshot[];
  linkedLists?: LinkedListSnapshot[];
  listPointers?: ListNodePointerSnapshot[];
  trees?: TreeSnapshot[];
  treePointers?: TreePointerSnapshot[];
  graphs?: GraphSnapshot[];
}

export interface TraceStep {
  /** 1-indexed line to highlight in the code panel */
  line: number;
  description: string;
  vars: Record<string, unknown>;
  ds: DataStructureSnapshot;
}

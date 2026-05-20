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

export interface DataStructureSnapshot {
  arrays?: ArraySnapshot[];
  stacks?: StackSnapshot[];
  hashmaps?: HashmapSnapshot[];
  pointers?: PointerSnapshot[];
}

export interface TraceStep {
  /** 1-indexed line to highlight in the code panel */
  line: number;
  description: string;
  vars: Record<string, unknown>;
  ds: DataStructureSnapshot;
}

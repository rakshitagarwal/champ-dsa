/** Keys we never show in the step walkthrough UI. */
const SKIP_KEYS = new Set([
  "input",
  "arguments",
  "solve",
  "__result",
  "__events",
  "__step",
]);

export function shouldShowVariable(key: string): boolean {
  if (key.startsWith("__")) return false;
  if (SKIP_KEYS.has(key)) return false;
  return true;
}

export function filterChangedVars(
  changed: { key: string; before: unknown; after: unknown }[],
  eventType: string,
): { key: string; before: unknown; after: unknown }[] {
  if (eventType === "enter") return [];
  return changed.filter((c) => shouldShowVariable(c.key));
}

/** Human-readable value for step chips (compact, no raw trace blobs). */
export function formatDisplayVar(v: unknown): string {
  if (v === undefined) return "—";
  if (v === null) return "null";
  if (typeof v === "string") {
    return v.length > 48 ? JSON.stringify(v.slice(0, 45) + "…") : JSON.stringify(v);
  }
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) {
    const s = JSON.stringify(v);
    return s.length > 56 ? s.slice(0, 53) + "…" : s;
  }
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    const keys = Object.keys(o);
    if (keys.length === 1) {
      const inner = o[keys[0]!];
      if (typeof inner === "string" || typeof inner === "number") {
        return formatDisplayVar(inner);
      }
    }
    const s = JSON.stringify(v);
    return s.length > 56 ? s.slice(0, 53) + "…" : s;
  }
  return String(v);
}

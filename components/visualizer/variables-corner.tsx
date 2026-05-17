"use client";

import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { analyzeStepDiff } from "@/lib/viz/analyze-step";

const SKIP_KEYS = new Set(["solve", "arguments", "__result"]);

function shouldShowVar(key: string, val: unknown): boolean {
  if (key.startsWith("__")) return false;
  if (SKIP_KEYS.has(key)) return false;
  if (typeof val === "function") return false;
  return true;
}

export function VariablesCorner() {
  const current = useVisualizerStore((s) => s.currentEvent());
  const previous = useVisualizerStore((s) => s.previousEvent());

  const diff = current ? analyzeStepDiff(previous, current) : null;
  const changedSet = new Set(diff?.changedVars.map((c) => c.key) ?? []);

  const entries = current
    ? Object.keys(current.variables)
        .filter((k) => shouldShowVar(k, current.variables[k]))
        .sort((a, b) => {
          const ac = changedSet.has(a) ? 0 : 1;
          const bc = changedSet.has(b) ? 0 : 1;
          if (ac !== bc) return ac - bc;
          return a.localeCompare(b);
        })
        .slice(0, 8)
    : [];

  return (
    <div className="w-52 rounded-lg border border-border/80 bg-card/95 shadow-xl backdrop-blur-md">
      <div className="border-b border-border/60 bg-muted/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Variables
      </div>
      <div className="max-h-[200px] overflow-y-auto p-2">
        {!current ? (
          <p className="px-1 py-2 text-[11px] text-muted-foreground">
            Run code to see state
          </p>
        ) : entries.length === 0 ? (
          <p className="px-1 py-2 text-[11px] text-muted-foreground">
            No simple variables in this step
          </p>
        ) : (
          entries.map((key) => {
            const val = current.variables[key];
            const changed = changedSet.has(key);
            return (
              <div
                key={key}
                className={`mb-1 rounded px-2 py-1 font-mono text-[11px] ${
                  changed
                    ? "bg-amber-500/20 ring-1 ring-amber-500/40"
                    : "bg-muted/30"
                }`}
              >
                <span className="text-muted-foreground">{key}</span>
                <span className="mx-1">=</span>
                <span className="text-primary">{formatShort(val)}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function formatShort(v: unknown): string {
  if (Array.isArray(v)) {
    const s = JSON.stringify(v);
    return s.length > 24 ? s.slice(0, 21) + "…" : s;
  }
  if (typeof v === "object" && v !== null) return "{…}";
  return String(v);
}

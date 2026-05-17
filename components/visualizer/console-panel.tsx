"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import {
  duplicatesArray,
  fibInput,
  randomArray,
  sortedArray,
} from "@/lib/input-generators";

export function ConsolePanel() {
  const stdin = useVisualizerStore((s) => s.stdin);
  const setStdin = useVisualizerStore((s) => s.setStdin);
  const trace = useVisualizerStore((s) => s.trace);
  const error = useVisualizerStore((s) => s.error);

  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => setStdin(randomArray())}>
          Random array
        </Button>
        <Button variant="outline" size="sm" onClick={() => setStdin(sortedArray())}>
          Sorted array
        </Button>
        <Button variant="outline" size="sm" onClick={() => setStdin(duplicatesArray())}>
          Duplicates
        </Button>
        <Button variant="outline" size="sm" onClick={() => setStdin(fibInput())}>
          Fib input
        </Button>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex min-h-[88px] flex-col">
          <label className="mb-1 text-xs font-medium text-muted-foreground">
            Input
          </label>
          <Textarea
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            className="min-h-[88px] flex-1 resize-none font-mono text-sm leading-relaxed"
            placeholder={`nums = [2, 7, 11, 15]\ntarget = 9`}
            spellCheck={false}
          />
        </div>
        <div className="flex min-h-[88px] flex-col">
          <label className="mb-1 text-xs font-medium text-muted-foreground">
            Output
          </label>
          <pre className="min-h-[88px] flex-1 overflow-auto rounded-md border border-border bg-muted/30 p-3 font-mono text-sm leading-relaxed">
            {error ? (
              <span className="text-destructive">{error}</span>
            ) : (
              trace?.stdout?.trim() || "Run to see output here"
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

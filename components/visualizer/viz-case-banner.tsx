"use client";

import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { formatSampleOutput } from "@/lib/questions/problem-display";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "dark" | "light";
};

export function VizCaseBanner({ variant = "dark" }: Props) {
  const problemTitle = useVisualizerStore((s) => s.problemTitle);
  const humanInput = useVisualizerStore((s) => s.problemHumanInput);
  const stdin = useVisualizerStore((s) => s.stdin);
  const sampleOutput = useVisualizerStore((s) => s.problemSampleOutput);
  const examples = useVisualizerStore((s) => s.problemExamples);

  const input = (humanInput ?? stdin).trim() || "—";
  const output = formatSampleOutput(
    sampleOutput ?? examples?.[0]?.output,
  );

  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "flex shrink-0 flex-wrap items-start gap-6 border-b px-6 py-2.5",
        isDark ? "border-gray-800 bg-[#161b22]" : "border-border bg-muted/30",
      )}
    >
      {problemTitle ? (
        <p
          className={cn(
            "w-full text-xs font-medium",
            isDark ? "text-gray-400" : "text-muted-foreground",
          )}
        >
          {problemTitle}
        </p>
      ) : null}
      <div className="min-w-[140px] flex-1">
        <p
          className={cn(
            "mb-1 text-[10px] font-semibold uppercase tracking-wider",
            isDark ? "text-gray-500" : "text-muted-foreground",
          )}
        >
          Input
        </p>
        <pre
          className={cn(
            "whitespace-pre-wrap font-mono text-sm leading-relaxed",
            isDark ? "text-blue-200" : "text-foreground",
          )}
        >
          {input}
        </pre>
      </div>
      <div className="min-w-[140px] flex-1">
        <p
          className={cn(
            "mb-1 text-[10px] font-semibold uppercase tracking-wider",
            isDark ? "text-gray-500" : "text-muted-foreground",
          )}
        >
          Expected output
        </p>
        <pre
          className={cn(
            "whitespace-pre-wrap font-mono text-sm leading-relaxed",
            isDark ? "text-green-400" : "text-emerald-600 dark:text-emerald-400",
          )}
        >
          {output}
        </pre>
      </div>
    </div>
  );
}

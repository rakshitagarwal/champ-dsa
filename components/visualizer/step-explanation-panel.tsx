"use client";

import { useStepAnalysis } from "@/lib/viz/use-step-analysis";
import { formatDisplayVar } from "@/lib/viz/display-vars";
import { cn } from "@/lib/utils";

export function StepExplanationPanel({
  layout = "viewport",
}: {
  layout?: "document" | "viewport";
}) {
  const isDocument = layout === "document";
  const {
    current,
    stepIndex,
    totalSteps,
    visibleChanges,
    explanation,
    lineSnippet,
    diff,
  } = useStepAnalysis();

  if (!current) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-6 text-center",
          !isDocument && "h-full min-h-0",
        )}
      >
        <p className="text-sm font-medium text-foreground">Step-by-step execution</p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          After a successful <strong className="text-foreground">Run</strong>, use
          the walkthrough controls to see why each line runs and what changes.
          Open <strong className="text-foreground">Fullscreen viz</strong> for the
          array animation.
        </p>
      </div>
    );
  }

  const triggerLabel =
    current.type === "enter"
      ? `Entering ${current.frameName ?? "solve"}()`
      : current.type === "return" || current.type === "exit"
        ? "Returning from function"
        : `Line ${current.line} executes`;

  return (
    <div
      className={cn(
        "flex flex-col",
        isDocument ? "min-h-0" : "h-full min-h-0 overflow-y-auto",
      )}
    >
      <div className="shrink-0 border-b border-border/80 bg-muted/20 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {current.type !== "enter" ? (
              <span className="inline-flex items-center rounded bg-primary/90 px-2 py-0.5 font-mono text-xs font-semibold text-primary-foreground">
                Line {current.line}
              </span>
            ) : (
              <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 font-mono text-xs font-medium">
                {current.frameName ?? "solve"}()
              </span>
            )}
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {current.type}
            </span>
          </div>
          {!isDocument ? (
            <span className="text-[11px] text-muted-foreground">
              Step {stepIndex + 1} / {totalSteps}
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-4 p-4">
        <section>
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Why this step runs
          </h3>
          <p className="mt-1.5 text-sm font-medium text-foreground">{triggerLabel}</p>
          {lineSnippet ? (
            <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-editor/80 px-3 py-2 font-mono text-xs leading-relaxed text-foreground/95">
              {lineSnippet}
            </pre>
          ) : null}
        </section>

        <section>
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            What happens
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/95">
            {explanation}
          </p>
        </section>

        {visibleChanges.length > 0 ? (
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              What changed
            </h3>
            <ul className="mt-2 space-y-2">
              {visibleChanges.slice(0, 8).map((c) => (
                <li
                  key={c.key}
                  className="rounded-lg border border-border bg-card/60 px-3 py-2"
                >
                  <span className="font-mono text-xs font-semibold text-primary">
                    {c.key}
                  </span>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {formatDisplayVar(c.before)} →{" "}
                    <span className="text-foreground">
                      {formatDisplayVar(c.after)}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {diff?.cellChanges && diff.cellChanges.length > 0 ? (
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Array updates
            </h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {diff.cellChanges.slice(0, 12).map((c) => (
                <li
                  key={`${c.arrayName}-${c.index}`}
                  className={cn(
                    "rounded border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono text-[11px]",
                  )}
                >
                  {c.arrayName}[{c.index}]: {String(c.before)} → {String(c.after)}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {current.type === "return" && current.returnValue !== undefined ? (
          <section className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              Return value
            </h3>
            <p className="mt-1 font-mono text-sm">
              {formatDisplayVar(current.returnValue)}
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}

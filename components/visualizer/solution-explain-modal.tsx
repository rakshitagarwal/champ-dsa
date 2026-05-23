"use client";

import { useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { cn } from "@/lib/utils";
import type { AiExplainCommentary } from "@/types/ai-explain";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function ExplainContent({
  explanation,
  patternName,
}: {
  explanation: AiExplainCommentary;
  patternName: string | null;
}) {
  const patternLabel = patternName ?? "DSA pattern";

  return (
    <article className="space-y-5 text-sm leading-relaxed text-foreground/95">
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Problem &amp; approach
        </h3>
        <p className="mt-2 whitespace-pre-wrap">{explanation.summary}</p>
      </section>
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Step-by-step walkthrough
        </h3>
        <p className="mt-2 whitespace-pre-wrap font-mono text-[13px] leading-relaxed">
          {explanation.whyItWorks}
        </p>
      </section>
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Full dry run
        </h3>
        <p className="mt-2 whitespace-pre-wrap">
          {explanation.howExamplesAreSatisfied}
        </p>
      </section>
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Complexity &amp; key ideas
          {patternName ? ` · ${patternLabel}` : null}
        </h3>
        {explanation.keyIdeas.length > 0 ? (
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            {explanation.keyIdeas.map((idea, i) => (
              <li key={i}>{idea}</li>
            ))}
          </ul>
        ) : null}
      </section>
    </article>
  );
}

export function SolutionExplainModal({ open, onOpenChange }: Props) {
  const code = useVisualizerStore((s) => s.code);
  const problemTitle = useVisualizerStore((s) => s.problemTitle);
  const patternName = useVisualizerStore((s) => s.patternName);
  const savedAiExplanation = useVisualizerStore((s) => s.savedAiExplanation);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-background/85 backdrop-blur-sm"
        aria-label="Close explanation"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Solution explanation"
        className={cn(
          "relative z-10 flex h-[min(92vh,820px)] w-[min(96vw,1100px)] flex-col overflow-hidden",
          "rounded-xl border border-border bg-card shadow-2xl",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <h2 className="text-base font-semibold">Explain</h2>
              <p className="text-xs text-muted-foreground">
                {problemTitle ?? "Reference solution"}
                {patternName ? ` · ${patternName}` : null}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
          <div className="flex min-h-0 flex-col border-b border-border md:border-b-0 md:border-r">
            <div className="shrink-0 border-b border-border bg-muted/20 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Solution code
            </div>
            <pre className="min-h-[200px] flex-1 overflow-auto p-4 font-mono text-[13px] leading-relaxed text-foreground/90">
              {code || "// No code"}
            </pre>
          </div>

          <div className="flex min-h-0 flex-col">
            <div className="shrink-0 border-b border-border bg-muted/20 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Explanation
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              {savedAiExplanation ? (
                <ExplainContent
                  explanation={savedAiExplanation}
                  patternName={patternName}
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  No saved explanation for this problem yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

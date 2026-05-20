"use client";

import { useEffect } from "react";
import { Loader2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AiExplainModal({ open, onOpenChange }: Props) {
  const aiExplain = useVisualizerStore((s) => s.aiExplain);
  const aiExplainLoading = useVisualizerStore((s) => s.aiExplainLoading);
  const aiExplainError = useVisualizerStore((s) => s.aiExplainError);
  const problemTitle = useVisualizerStore((s) => s.problemTitle);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !aiExplainLoading) onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange, aiExplainLoading]);

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
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-background/85 backdrop-blur-sm"
        aria-label="Close AI explanation"
        onClick={() => !aiExplainLoading && onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="AI explanation"
        className={cn(
          "relative z-10 flex max-h-[min(88vh,720px)] w-[min(96vw,640px)] flex-col overflow-hidden",
          "rounded-xl border border-border bg-card shadow-2xl",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <h2 className="text-base font-semibold">AI explanation</h2>
              <p className="text-xs text-muted-foreground">
                {problemTitle ?? "Why your code works"}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={aiExplainLoading}
            onClick={() => onOpenChange(false)}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {aiExplainLoading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Generating explanation…
              </p>
              <p className="max-w-xs text-xs text-muted-foreground">
                Reading the problem and your solution. This usually takes a few
                seconds.
              </p>
            </div>
          ) : aiExplainError ? (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              {aiExplainError}
            </div>
          ) : aiExplain ? (
            <article className="space-y-5 text-sm leading-relaxed text-foreground/95">
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Summary
                </h3>
                <p className="mt-2">{aiExplain.summary}</p>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Why this code works
                </h3>
                <p className="mt-2 whitespace-pre-wrap">{aiExplain.whyItWorks}</p>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  How the examples are satisfied
                </h3>
                <p className="mt-2 whitespace-pre-wrap">
                  {aiExplain.howExamplesAreSatisfied}
                </p>
              </section>
              {aiExplain.keyIdeas.length > 0 ? (
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Key ideas
                  </h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5">
                    {aiExplain.keyIdeas.map((idea, i) => (
                      <li key={i}>{idea}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </article>
          ) : null}
        </div>
      </div>
    </div>
  );
}

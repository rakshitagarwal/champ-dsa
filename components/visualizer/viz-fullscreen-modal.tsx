"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { CodeEditor } from "./code-editor";
import { AnimationCanvas } from "./animation-canvas";
import { WalkthroughPlaybackBar } from "./walkthrough-playback-bar";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** Hello Interview–style: code left, animation right, synced playback. */
export function VizFullscreenModal({ open, onOpenChange }: Props) {
  const pause = useVisualizerStore((s) => s.pause);
  const rebuildCompactedTimeline = useVisualizerStore(
    (s) => s.rebuildCompactedTimeline,
  );
  const trace = useVisualizerStore((s) => s.trace);
  const solutionFilled = useVisualizerStore((s) => s.solutionFilled);

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

  useEffect(() => {
    if (!open) {
      pause();
      return;
    }
    pause();
    if (trace && solutionFilled) rebuildCompactedTimeline();
  }, [open, trace, solutionFilled, rebuildCompactedTimeline, pause]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-[3vh_2vw]"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-background/90 backdrop-blur-sm"
        aria-label="Close visualization"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Visualize execution"
        className={cn(
          "relative z-10 flex flex-col overflow-hidden",
          "h-[min(94vh,920px)] w-[min(96vw,1600px)]",
          "rounded-xl border border-border bg-card shadow-2xl",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-2.5">
          <div>
            <h2 className="text-base font-semibold">Visualize</h2>
            <p className="text-xs text-muted-foreground">
              Reference solution — code and animation stay in sync
            </p>
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
          <div className="flex min-h-0 flex-col overflow-hidden border-b border-border md:border-b-0 md:border-r">
            <p className="shrink-0 border-b border-border bg-muted/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Code
            </p>
            <div className="min-h-0 flex-1 p-2">
              <CodeEditor readOnly useCompactedLine />
            </div>
          </div>

          <div className="flex min-h-0 flex-col overflow-hidden">
            <p className="shrink-0 border-b border-border bg-muted/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Animation
            </p>
            <div className="relative min-h-0 flex-1">
              <AnimationCanvas />
            </div>
          </div>
        </div>

        <WalkthroughPlaybackBar />
      </div>
    </div>
  );
}

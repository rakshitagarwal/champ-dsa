"use client";

import { useState } from "react";
import type { ConfidenceLevel } from "@/types/learning";
import { setConfidence } from "@/lib/storage/learning-store";
import { Button } from "@/components/ui/button";

type Props = {
  questionId: string;
  onDone: () => void;
};

const LABELS: Record<ConfidenceLevel, string> = {
  1: "Not confident",
  2: "Shaky",
  3: "Okay",
  4: "Confident",
  5: "Could teach it",
};

export function ConfidencePrompt({ questionId, onDone }: Props) {
  const [selected, setSelected] = useState<ConfidenceLevel | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg">
        <h2 className="text-lg font-semibold">How confident are you?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          How confident are you in solving this again without help?
        </p>
        <div className="mt-4 flex flex-col gap-2">
          {([1, 2, 3, 4, 5] as ConfidenceLevel[]).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setSelected(n)}
              className={`rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                selected === n
                  ? "border-primary bg-primary/10"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <span className="font-medium">{n}.</span> {LABELS[n]}
            </button>
          ))}
        </div>
        <Button
          className="mt-4 w-full"
          disabled={selected === null}
          onClick={() => {
            if (selected) setConfidence(questionId, selected);
            onDone();
          }}
        >
          Save & continue
        </Button>
      </div>
    </div>
  );
}

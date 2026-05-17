"use client";

import { useState } from "react";
import { RecognitionQuiz } from "@/components/train/recognition-quiz";
import { setLastVisited } from "@/lib/storage/learning-store";
import { cn } from "@/lib/utils";

export default function TrainPage() {
  const [mode, setMode] = useState<"practice" | "timed">("practice");

  return (
    <div className="w-full px-4 py-8 lg:px-10">
      <header className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Pattern recognition trainer
        </h1>
        <p className="mt-2 text-muted-foreground">
          Read the problem only — pick which pattern you would use before coding.
        </p>
        <div className="mt-4 inline-flex rounded-lg border border-border p-1">
          {(["practice", "timed"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setLastVisited({ type: "train", slugOrId: m });
              }}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm font-medium capitalize",
                mode === m
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m === "timed" ? "Timed (60s)" : "Practice"}
            </button>
          ))}
        </div>
      </header>
      <div className="mt-8">
        <RecognitionQuiz mode={mode} />
      </div>
    </div>
  );
}

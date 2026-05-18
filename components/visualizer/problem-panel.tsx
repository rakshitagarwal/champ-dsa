"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  difficultyLabel,
  formatProblemBody,
  formatSampleOutput,
} from "@/lib/questions/problem-display";
import type { QuestionExample } from "@/types/question";

type Props = {
  title: string;
  patternName: string;
  difficulty?: "easy" | "medium" | "hard";
  statement: string;
  description?: string;
  constraints?: string[];
  examples?: QuestionExample[];
  leetcodeUrl?: string;
  humanInput: string;
  sampleOutput?: string;
};

export function ProblemPanel({
  title,
  patternName,
  difficulty,
  statement,
  description,
  constraints,
  examples,
  leetcodeUrl,
  humanInput,
  sampleOutput,
}: Props) {
  const body = formatProblemBody({ title, statement, description, constraints });

  const runExample: QuestionExample = {
    input: humanInput.trim() || "—",
    output: formatSampleOutput(sampleOutput),
  };
  const exampleList: QuestionExample[] =
    examples && examples.length > 0 ? examples : [runExample];

  return (
    <div className="flex h-full min-h-0 flex-col bg-panel">
      <div className="shrink-0 border-b border-border px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          {difficulty ? (
            <Badge
              variant="secondary"
              className={
                difficulty === "easy"
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                  : difficulty === "hard"
                    ? "bg-red-500/15 text-red-700 dark:text-red-300"
                    : "bg-amber-500/15 text-amber-800 dark:text-amber-200"
              }
            >
              {difficultyLabel(difficulty)}
            </Badge>
          ) : null}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-xs text-muted-foreground">{patternName}</p>
          {leetcodeUrl ? (
            <Link
              href={leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Open on LeetCode
              <ExternalLink className="h-3 w-3" />
            </Link>
          ) : null}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <div
          className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed text-foreground/90 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[13px] [&_li]:my-0.5 [&_p]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-background [&_pre]:p-3 [&_strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        <div className="mt-6 space-y-5 border-t border-border pt-5">
          {exampleList.map((ex, i) => (
            <div key={i}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {description && exampleList.length === 1
                  ? "Example for Run"
                  : `Example ${i + 1}`}
              </p>
              <div className="space-y-3">
                <div>
                  <p className="mb-1 text-xs font-medium text-foreground/75">
                    Input
                  </p>
                  <pre className="overflow-x-auto whitespace-pre-wrap rounded-md border border-border bg-background p-3 font-mono text-xs leading-relaxed">
                    {ex.input}
                  </pre>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-foreground/75">
                    Output
                  </p>
                  <pre className="overflow-x-auto whitespace-nowrap rounded-md border border-border bg-background p-3 font-mono text-sm leading-normal text-foreground">
                    {ex.output}
                  </pre>
                </div>
                {ex.explanation ? (
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground/80">
                      Explanation:{" "}
                    </span>
                    {ex.explanation}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-muted-foreground">
          Problem text from LeetCode. Your solution is tested against Example 1
          when you click Run.
        </p>
      </div>
    </div>
  );
}


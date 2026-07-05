"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import type { editor } from "monaco-editor";
import type { AiExplainCommentary } from "@/types/ai-explain";
import {
  defineChampMonacoTheme,
  getChampEditorTheme,
} from "@/lib/editor/champ-monaco-theme";
import { Lightbulb, Target, CheckCircle2, ListChecks } from "lucide-react";

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type Props = {
  solutionCode: string;
  aiExplanation?: AiExplainCommentary;
};

export function SolutionPanel({ solutionCode, aiExplanation }: Props) {
  const { theme } = useTheme();
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);

  useEffect(() => {
    if (!monacoRef.current) return;
    defineChampMonacoTheme(monacoRef.current);
    monacoRef.current.editor.setTheme(getChampEditorTheme(theme));
  }, [theme]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-panel">
      <div className="shrink-0 border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold">Reference Solution</h2>
      </div>

      <div className="h-[min(400px,45vh)] min-h-[260px] shrink-0 p-2">
        <div className="h-full min-h-0 overflow-hidden rounded-lg border border-border bg-editor shadow-inner">
          <Monaco
            height="100%"
            defaultLanguage="javascript"
            theme={getChampEditorTheme(theme)}
            value={solutionCode}
            onMount={(_ed, monaco) => {
              monacoRef.current = monaco;
              defineChampMonacoTheme(monaco);
              monaco.editor.setTheme(getChampEditorTheme(theme));
            }}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "var(--font-geist-mono), monospace",
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 12 },
              renderLineHighlight: "none",
              folding: false,
              guides: { indentation: false },
              overviewRulerLanes: 0,
              overviewRulerBorder: false,
              hideCursorInOverviewRuler: true,
              cursorWidth: 0,
            }}
          />
        </div>
      </div>

      {aiExplanation ? (
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5">
          <div className="space-y-1.5">
            <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Lightbulb className="h-3.5 w-3.5" />
              Summary
            </h3>
            <p className="text-sm leading-relaxed text-foreground/85">
              {aiExplanation.summary}
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Target className="h-3.5 w-3.5" />
              Why it works
            </h3>
            <p className="text-sm leading-relaxed text-foreground/85 whitespace-pre-line">
              {aiExplanation.whyItWorks}
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" />
              How examples are satisfied
            </h3>
            <p className="text-sm leading-relaxed text-foreground/85">
              {aiExplanation.howExamplesAreSatisfied}
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <ListChecks className="h-3.5 w-3.5" />
              Key ideas
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {aiExplanation.keyIdeas.map((idea, i) => (
                <li
                  key={i}
                  className="rounded-md border border-border bg-accent/30 px-2 py-1 text-xs font-medium text-foreground/75"
                >
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center px-4">
          <p className="text-center text-sm text-muted-foreground">
            No explanation available for this problem.
          </p>
        </div>
      )}
    </div>
  );
}

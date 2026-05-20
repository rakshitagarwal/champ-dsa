"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import type { editor } from "monaco-editor";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import {
  defineChampMonacoTheme,
  getChampEditorTheme,
} from "@/lib/editor/champ-monaco-theme";

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type Props = {
  readOnly?: boolean;
  /** Use compacted timeline index for line highlight (viz modal). */
  useCompactedLine?: boolean;
};

export function CodeEditor({
  readOnly = false,
  useCompactedLine = false,
}: Props) {
  const { theme } = useTheme();
  const code = useVisualizerStore((s) => s.code);
  const setCode = useVisualizerStore((s) => s.setCode);
  const stepIndex = useVisualizerStore((s) => s.stepIndex);
  const trace = useVisualizerStore((s) => s.trace);
  const compactedEventIndices = useVisualizerStore(
    (s) => s.compactedEventIndices,
  );
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);
  const decoRef = useRef<string[]>([]);
  const registerFormatCode = useVisualizerStore((s) => s.registerFormatCode);

  const rawIdx = useCompactedLine
    ? (compactedEventIndices[stepIndex] ?? stepIndex)
    : stepIndex;
  const evt = trace?.events[rawIdx];
  const line =
    evt && evt.type !== "enter" ? evt.line : undefined;

  useEffect(() => {
    return () => registerFormatCode(null);
  }, [registerFormatCode]);

  useEffect(() => {
    const ed = editorRef.current;
    if (!ed) return;
    if (line) {
      ed.revealLineInCenter(line);
      decoRef.current = ed.deltaDecorations(decoRef.current, [
        {
          range: {
            startLineNumber: line,
            startColumn: 1,
            endLineNumber: line,
            endColumn: ed.getModel()?.getLineMaxColumn(line) ?? 1,
          },
          options: {
            isWholeLine: true,
            className: "executing-line-highlight",
            glyphMarginClassName: "executing-line-glyph",
            linesDecorationsClassName: "executing-line-margin",
            inlineClassName: "executing-line-inline",
          },
        },
      ]);
    } else {
      decoRef.current = ed.deltaDecorations(decoRef.current, []);
    }
  }, [line, stepIndex]);

  useEffect(() => {
    editorRef.current?.updateOptions({ readOnly });
  }, [readOnly]);

  useEffect(() => {
    if (!monacoRef.current) return;
    defineChampMonacoTheme(monacoRef.current);
    monacoRef.current.editor.setTheme(getChampEditorTheme(theme));
  }, [theme]);

  return (
    <div className="h-full min-h-0 overflow-hidden rounded-lg border border-border bg-editor shadow-inner">
      <Monaco
        height="100%"
        defaultLanguage="javascript"
        theme={getChampEditorTheme(theme)}
        value={code}
        onChange={readOnly ? undefined : (v) => setCode(v ?? "")}
        onMount={(ed, monaco) => {
          monacoRef.current = monaco;
          defineChampMonacoTheme(monaco);
          monaco.editor.setTheme(getChampEditorTheme(theme));
          editorRef.current = ed;
          ed.updateOptions({ glyphMargin: true, readOnly });
          if (!readOnly) {
            registerFormatCode(() => {
              ed.getAction("editor.action.formatDocument")?.run();
            });
          }
        }}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "var(--font-geist-mono), monospace",
          lineNumbers: "on",
          glyphMargin: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12 },
          renderLineHighlight: "none",
        }}
      />
    </div>
  );
}

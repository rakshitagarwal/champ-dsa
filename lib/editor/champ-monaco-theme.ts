/** Programiz-style dark blue Monaco theme. */
export function defineChampMonacoTheme(monaco: typeof import("monaco-editor")): void {
  monaco.editor.defineTheme("champ-blue", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "64748b", fontStyle: "italic" },
      { token: "keyword", foreground: "7dd3fc" },
      { token: "string", foreground: "fdba74" },
      { token: "number", foreground: "fb923c" },
      { token: "regexp", foreground: "fda4af" },
      { token: "type", foreground: "93c5fd" },
      { token: "function", foreground: "fde047" },
      { token: "variable", foreground: "e8eaed" },
      { token: "constant", foreground: "fb923c" },
    ],
    colors: {
      "editor.background": "#1e2128",
      "editor.foreground": "#e8eaed",
      "editor.lineHighlightBackground": "#252b36",
      "editor.selectionBackground": "#3b82f640",
      "editor.inactiveSelectionBackground": "#3b82f625",
      "editorLineNumber.foreground": "#64748b",
      "editorLineNumber.activeForeground": "#94a3b8",
      "editorGutter.background": "#1a1f28",
      "editorCursor.foreground": "#60a5fa",
      "editorWidget.background": "#1a2332",
      "editorWidget.border": "#2d3a4d",
    },
  });
}

export function getChampEditorTheme(
  theme: string | undefined,
): "champ-blue" | "light" {
  return theme === "light" ? "light" : "champ-blue";
}

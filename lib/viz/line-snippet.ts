export function getLineSnippet(code: string, line: number): string | null {
  const lines = code.split("\n");
  if (line < 1 || line > lines.length) return null;
  return lines[line - 1]?.trim() || null;
}

import { formatSampleOutput } from "@/lib/questions/problem-display";

export function normalizeOutput(s: string): string {
  return formatSampleOutput(s).replace(/\s+/g, "");
}

export function outputsMatch(actual: string, expected: string): boolean {
  const a = normalizeOutput(actual);
  const e = normalizeOutput(expected);
  if (!a && !e) return true;
  return a === e;
}

import type { PatternAiExplanation } from "@/types/pattern-ai-explain";

const PREFIX = "champdsa-pattern-ai:v1:";

export function loadPatternAiExplanation(
  slug: string,
): PatternAiExplanation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(`${PREFIX}${slug}`);
    if (!raw) return null;
    return JSON.parse(raw) as PatternAiExplanation;
  } catch {
    return null;
  }
}

export function savePatternAiExplanation(
  slug: string,
  explanation: PatternAiExplanation,
): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(`${PREFIX}${slug}`, JSON.stringify(explanation));
  } catch {
    /* quota or private mode */
  }
}

export function clearPatternAiExplanation(slug: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(`${PREFIX}${slug}`);
}

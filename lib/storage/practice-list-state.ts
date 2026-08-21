import { PRACTICE_SHEET } from "@/data/practice/leetcode-sheet";

const EXPANDED_SUB_KEY = "champdsa-practice-expanded-sub";

export function loadPracticeExpandedSub(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const id = sessionStorage.getItem(EXPANDED_SUB_KEY);
    if (!id || !isKnownPracticeSubsection(id)) return null;
    return id;
  } catch {
    return null;
  }
}

export function savePracticeExpandedSub(subsectionId: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(EXPANDED_SUB_KEY, subsectionId);
  } catch {
    /* quota or private mode */
  }
}

export function scrollPracticeSubsectionIntoView(subsectionId: string): void {
  const el = document.getElementById(subsectionId);
  if (!el) return;
  el.scrollIntoView({ block: "center", behavior: "auto" });
}

export function isKnownPracticeSubsection(id: string): boolean {
  return PRACTICE_SHEET.some((group) =>
    group.subsections.some((sub) => sub.id === id),
  );
}

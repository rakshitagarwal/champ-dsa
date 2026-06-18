import { sheetSections } from "@/data/questions/sheet-meta";

const EXPANDED_SUB_KEY = "champdsa-practice-expanded-sub";

export function findSubsectionIdForQuestion(questionId: string): string | null {
  for (const section of sheetSections) {
    for (const sub of section.subsections) {
      if (sub.questionIds.includes(questionId)) return sub.id;
    }
  }
  return null;
}

export function loadPracticeExpandedSub(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(EXPANDED_SUB_KEY);
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

import { getStriverQuestions } from "@/lib/dsa-sheet/loader";

/** Map LeetCode slug → ChampDSA practice question id (from import enrichment). */
export function getPracticeIdByLeetcodeSlug(slug: string): string | undefined {
  return getStriverQuestions().find((q) => q.leetcodeSlug === slug)?.practiceId;
}

export function getLeetcodeSlugToPracticeMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const q of getStriverQuestions()) {
    if (q.practiceId) map[q.leetcodeSlug] = q.practiceId;
  }
  return map;
}

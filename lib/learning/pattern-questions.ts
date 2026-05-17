import { getAllQuestions } from "@/data/questions";

export function getQuestionsByPattern(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const q of getAllQuestions()) {
    if (!map[q.patternSlug]) map[q.patternSlug] = [];
    map[q.patternSlug].push(q.id);
  }
  return map;
}

export function getQuestionPatternMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const q of getAllQuestions()) {
    map[q.id] = q.patternSlug;
  }
  return map;
}

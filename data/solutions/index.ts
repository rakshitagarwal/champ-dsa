import { sheetQuestions } from "@/data/questions/sheet-questions";

/**
 * Client-safe access to sheet solutions.
 * Source of truth: scripts/sheet-solutions-data.mjs → npm run generate:sheet
 */
export { sheetQuestions as sheetQuestionsWithSolutions };

export function getSheetSolutionCode(questionId: string): string | undefined {
  return sheetQuestions.find((q) => q.id === questionId)?.solutionCode;
}

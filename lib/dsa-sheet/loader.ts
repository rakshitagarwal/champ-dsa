import fs from "node:fs";
import path from "node:path";
import { STRIVER_SECTIONS } from "@/data/dsa-sheet/manifest";
import type { StriverQuestion, StriverSectionMeta } from "@/types/dsa-sheet";

const QUESTIONS_PATH = path.join(process.cwd(), "data/dsa-sheet/questions.json");

let cachedQuestions: StriverQuestion[] | null = null;

export function getStriverQuestions(): StriverQuestion[] {
  if (cachedQuestions) return cachedQuestions;
  const raw = fs.readFileSync(QUESTIONS_PATH, "utf8");
  cachedQuestions = JSON.parse(raw) as StriverQuestion[];
  return cachedQuestions;
}

export function getStriverSections(): StriverSectionMeta[] {
  return STRIVER_SECTIONS;
}

export function getStriverQuestionById(id: string): StriverQuestion | undefined {
  return getStriverQuestions().find((q) => q.id === id);
}

export function getStriverQuestionsBySection(sectionId: string): StriverQuestion[] {
  const section = STRIVER_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return [];
  const byId = new Map(getStriverQuestions().map((q) => [q.id, q]));
  return section.questionIds
    .map((id) => byId.get(id))
    .filter((q): q is StriverQuestion => q !== undefined);
}

export function getPracticeOverlapCount(): number {
  return getStriverQuestions().filter((q) => q.practiceId).length;
}

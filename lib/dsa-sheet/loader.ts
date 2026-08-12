import fs from "node:fs";
import path from "node:path";
import { DSA_ROADMAP } from "@/data/dsa-sheet/roadmap";
import { STRIVER_SECTIONS } from "@/data/dsa-sheet/manifest";
import practiceMap from "@/data/dsa-sheet/practice-map.json";
import {
  countPhaseSubtopics,
} from "@/lib/dsa-sheet/roadmap-utils";
import type {
  PracticeEntry,
  PracticeQuestion,
  RoadmapPhase,
  StriverQuestion,
  StriverSectionMeta,
} from "@/types/dsa-sheet";

export {
  countLeaves,
  countPhaseTopics,
  countPhaseSubtopics,
} from "@/lib/dsa-sheet/roadmap-utils";

const PRACTICE = practiceMap as Record<string, PracticeEntry>;

export function getRoadmapPhases(): RoadmapPhase[] {
  return DSA_ROADMAP;
}

export function getRoadmapPhase(phaseId: string): RoadmapPhase | undefined {
  return DSA_ROADMAP.find(
    (p) => p.id === phaseId || String(p.phase) === phaseId,
  );
}

export function getRoadmapStats() {
  const phases = DSA_ROADMAP;
  const topics = phases.reduce((sum, p) => sum + p.topics.length, 0);
  const subtopics = phases.reduce((sum, p) => sum + countPhaseSubtopics(p), 0);
  return { phases: phases.length, topics, subtopics };
}

export function getPracticeEntry(leafId: string): PracticeEntry | undefined {
  return PRACTICE[leafId];
}

export function getPracticeQuestions(leafId: string): PracticeQuestion[] {
  const entry = PRACTICE[leafId];
  if (!entry || entry.kind !== "questions") return [];
  return entry.questions;
}

/* --- Legacy Striver helpers (data kept for LeetCode overlap mapping) --- */

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

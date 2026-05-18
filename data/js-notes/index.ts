import { jsNoteTopics as coreJsNoteTopics } from "./catalog";
import { dsaJsNoteTopics } from "./dsa-topics";
import type { JsNoteTopic } from "@/types/js-note";

const jsNoteTopics: JsNoteTopic[] = [...coreJsNoteTopics, ...dsaJsNoteTopics];

export function getAllJsNoteTopics(): JsNoteTopic[] {
  return [...jsNoteTopics].sort((a, b) => a.order - b.order);
}

export function getJsNoteTopicBySlug(slug: string): JsNoteTopic | undefined {
  return jsNoteTopics.find((t) => t.slug === slug);
}

export function getJsNoteCategories(): string[] {
  const cats = new Set(getAllJsNoteTopics().map((t) => t.category));
  const order = [
    "Fundamentals",
    "Arrays",
    "Functions",
    "Async",
    "Browser",
    "OOP",
    "DSA Structures",
    "DSA Algorithms",
  ];
  return order.filter((c) => cats.has(c));
}

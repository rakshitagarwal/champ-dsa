import { jsNoteTopics } from "./catalog";
import type { JsNoteTopic } from "@/types/js-note";

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
  ];
  return order.filter((c) => cats.has(c));
}

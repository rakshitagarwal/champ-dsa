import fs from "node:fs";
import path from "node:path";
import { NOTE_SECTIONS } from "@/data/notes/manifest";
import type { NotePage, NoteSection } from "@/types/notes";

const CONTENT_ROOT = path.join(process.cwd(), "content", "notes");

export function getNoteSections(): NoteSection[] {
  return NOTE_SECTIONS;
}

export function getAllNotePages(): { sectionId: string; slug: string }[] {
  return NOTE_SECTIONS.flatMap((s) =>
    s.pages.map((p) => ({ sectionId: s.id, slug: p.slug })),
  );
}

export function getNotePage(
  sectionId: string,
  pageSlug: string,
): NotePage | undefined {
  const section = NOTE_SECTIONS.find((s) => s.id === sectionId);
  const meta = section?.pages.find((p) => p.slug === pageSlug);
  if (!section || !meta) return undefined;

  const filePath = path.join(CONTENT_ROOT, sectionId, `${pageSlug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const markdown = fs.readFileSync(filePath, "utf8");
  return {
    ...meta,
    sectionId: section.id,
    sectionTitle: section.title,
    markdown,
  };
}

export function getFirstPageInSection(sectionId: string) {
  const section = NOTE_SECTIONS.find((s) => s.id === sectionId);
  return section?.pages[0];
}

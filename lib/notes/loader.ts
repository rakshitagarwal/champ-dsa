import fs from "node:fs";
import path from "node:path";
import { NOTE_CATALOG } from "@/data/notes/manifest";
import type { NoteDocument, NoteDocumentMeta } from "@/types/notes";

const CONTENT_ROOT = path.join(process.cwd(), "content", "notes");

function noteFilePath(slug: string): string {
  return path.join(CONTENT_ROOT, `${slug}.md`);
}

export function noteFileExists(slug: string): boolean {
  return fs.existsSync(noteFilePath(slug));
}

/** Sidebar + routes — only entries with a markdown file on disk. */
export function getAvailableNotes(): NoteDocumentMeta[] {
  return NOTE_CATALOG.filter((entry) => noteFileExists(entry.slug));
}

export function getAllNoteSlugs(): string[] {
  return getAvailableNotes().map((n) => n.slug);
}

export function getNoteBySlug(slug: string): NoteDocument | undefined {
  const meta = NOTE_CATALOG.find((n) => n.slug === slug);
  if (!meta || !noteFileExists(slug)) return undefined;

  const markdown = fs.readFileSync(noteFilePath(slug), "utf8");
  return { ...meta, markdown };
}

export function getFirstNote(): NoteDocument | undefined {
  const first = getAvailableNotes()[0];
  if (!first) return undefined;
  return getNoteBySlug(first.slug);
}

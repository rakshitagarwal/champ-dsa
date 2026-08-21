import fs from "node:fs";
import path from "node:path";
import { SD_CATALOG, SD_GROUPS } from "@/data/system-design/catalog";
import type { SdDocument, SdDocumentMeta, SdGroupId } from "@/types/system-design";

const CONTENT_ROOT = path.join(process.cwd(), "content", "system-design");

function filePath(slug: string): string {
  return path.join(CONTENT_ROOT, `${slug}.md`);
}

export function sdFileExists(slug: string): boolean {
  return fs.existsSync(filePath(slug));
}

export function getAvailableSdDocs(): SdDocumentMeta[] {
  return SD_CATALOG.filter((entry) => sdFileExists(entry.slug));
}

export function getSdDocsByGroup(group: SdGroupId): SdDocumentMeta[] {
  return getAvailableSdDocs().filter((d) => d.group === group);
}

export function getAllSdSlugs(): string[] {
  return getAvailableSdDocs().map((d) => d.slug);
}

export function getSdBySlug(slug: string): SdDocument | undefined {
  const meta = SD_CATALOG.find((d) => d.slug === slug);
  if (!meta || !sdFileExists(slug)) return undefined;
  const markdown = fs.readFileSync(filePath(slug), "utf8");
  return { ...meta, markdown };
}

export function getFirstSd(): SdDocument | undefined {
  const first = getAvailableSdDocs()[0];
  if (!first) return undefined;
  return getSdBySlug(first.slug);
}

export { SD_GROUPS };

import fs from "node:fs";
import path from "node:path";
import { DSA_CATALOG, type DsaNoteMeta } from "@/data/dsa/manifest";

const CONTENT_ROOT = path.join(process.cwd(), "content", "dsa");

export type DsaDocument = DsaNoteMeta & {
  markdown: string;
};

function filePath(slug: string): string {
  return path.join(CONTENT_ROOT, `${slug}.md`);
}

function fileExists(slug: string): boolean {
  return fs.existsSync(filePath(slug));
}

export function getAvailableDsaNotes(): DsaNoteMeta[] {
  return DSA_CATALOG.filter((entry) => fileExists(entry.slug));
}

export function getAllDsaSlugs(): string[] {
  return getAvailableDsaNotes().map((n) => n.slug);
}

export function getDsaNoteBySlug(slug: string): DsaDocument | undefined {
  const meta = DSA_CATALOG.find((n) => n.slug === slug);
  if (!meta || !fileExists(slug)) return undefined;
  const markdown = fs.readFileSync(filePath(slug), "utf8");
  return { ...meta, markdown };
}

export function getFirstDsaNote(): DsaDocument | undefined {
  const first = getAvailableDsaNotes()[0];
  if (!first) return undefined;
  return getDsaNoteBySlug(first.slug);
}

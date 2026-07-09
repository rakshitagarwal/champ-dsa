import fs from "node:fs";
import path from "node:path";
import {
  TIPS_CATALOG,
  type TipsTabMeta,
  type TipsTabSlug,
} from "@/data/tips/manifest";

const CONTENT_ROOT = path.join(process.cwd(), "content", "tips");

export type TipsDocument = TipsTabMeta & {
  markdown: string;
};

function filePath(slug: TipsTabSlug): string {
  return path.join(CONTENT_ROOT, `${slug}.md`);
}

function fileExists(slug: TipsTabSlug): boolean {
  return fs.existsSync(filePath(slug));
}

export function getAvailableTips(): TipsTabMeta[] {
  return TIPS_CATALOG.filter((entry) => fileExists(entry.slug));
}

export function getTipBySlug(slug: TipsTabSlug): TipsDocument | undefined {
  const meta = TIPS_CATALOG.find((t) => t.slug === slug);
  if (!meta || !fileExists(slug)) return undefined;
  const markdown = fs.readFileSync(filePath(slug), "utf8");
  return { ...meta, markdown };
}

export function getAllTipsDocuments(): TipsDocument[] {
  return getAvailableTips()
    .map((meta) => getTipBySlug(meta.slug))
    .filter((doc): doc is TipsDocument => doc !== undefined);
}

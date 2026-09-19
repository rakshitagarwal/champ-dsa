/** LeetCode premium (locked) problem slugs — single source for sheet + notes UI. */
export const PREMIUM_LC_SLUGS = new Set<string>([
  "logger-rate-limiter",
  "high-five",
  "encode-and-decode-strings",
  "walls-and-gates",
  "minimum-knight-moves",
  "meeting-rooms",
  "meeting-rooms-ii",
  "number-of-connected-components-in-an-undirected-graph",
  "graph-valid-tree",
  "find-all-the-lonely-nodes",
  "binary-tree-vertical-order-traversal",
  "binary-tree-longest-consecutive-sequence",
  "alien-dictionary",
  "find-leaves-of-binary-tree",
  "remove-duplicates-from-an-unsorted-linked-list",
  "minimum-cost-to-connect-sticks",
  "design-in-memory-file-system",
  "optimize-water-distribution-in-a-village",
]);

export function isPremiumLcSlug(slug: string): boolean {
  return PREMIUM_LC_SLUGS.has(slug.replace(/\/$/, ""));
}

export function premiumSlugFromLeetcodeUrl(url: string): string | null {
  const m = url.match(/leetcode\.com\/problems\/([^/"'?#]+)/i);
  return m ? m[1] : null;
}

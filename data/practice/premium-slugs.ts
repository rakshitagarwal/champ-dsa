/** LeetCode premium (locked) problem slugs — single source for sheet + notes UI. */
export const PREMIUM_LC_SLUGS = new Set<string>([
  "alien-dictionary",
  "armstrong-number",
  "binary-tree-longest-consecutive-sequence",
  "binary-tree-vertical-order-traversal",
  "boundary-of-binary-tree",
  "encode-and-decode-strings",
  "find-all-the-lonely-nodes",
  "find-leaves-of-binary-tree",
  "graph-valid-tree",
  "high-five",
  "inorder-successor-in-bst",
  "logger-rate-limiter",
  "longest-substring-with-at-most-k-distinct-characters",
  "meeting-rooms",
  "meeting-rooms-ii",
  "minimize-max-distance-to-gas-station",
  "minimum-cost-to-connect-sticks",
  "minimum-knight-moves",
  "minimum-window-subsequence",
  "number-of-connected-components-in-an-undirected-graph",
  "number-of-islands-ii",
  "remove-duplicates-from-an-unsorted-linked-list",
  "walls-and-gates",
]);

export function isPremiumLcSlug(slug: string): boolean {
  return PREMIUM_LC_SLUGS.has(slug.replace(/\/$/, ""));
}

export function premiumSlugFromLeetcodeUrl(url: string): string | null {
  const m = url.match(/leetcode\.com\/problems\/([^/"'?#]+)/i);
  return m ? m[1] : null;
}

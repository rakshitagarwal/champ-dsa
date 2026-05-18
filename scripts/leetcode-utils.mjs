/** Shared helpers for LeetCode slug resolution and GraphQL fetch. */

export function normalizeTitle(t) {
  return t
    .toLowerCase()
    .replace(/[''`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function slugFromTitle(title) {
  return title
    .toLowerCase()
    .replace(/[''`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function fetchLeetcodeCatalog() {
  const res = await fetch("https://leetcode.com/api/problems/all/", {
    headers: { "User-Agent": "champdsa-content-sync/1.0" },
  });
  if (!res.ok) throw new Error(`LeetCode catalog HTTP ${res.status}`);
  const data = await res.json();
  const byNorm = new Map();
  const bySlug = new Map();
  for (const p of data.stat_status_pairs) {
    const slug = p.stat.question__title_slug;
    const title = p.stat.question__title;
    const norm = normalizeTitle(title);
    if (!byNorm.has(norm)) byNorm.set(norm, []);
    byNorm.get(norm).push({ slug, title, id: p.stat.question_id });
    bySlug.set(slug, { slug, title, id: p.stat.question_id });
  }
  return { byNorm, bySlug };
}

export function matchTitleToSlug(title, catalog, overrides = {}) {
  const override = overrides[String(title)] ?? overrides[title];
  if (override) return override;

  const norm = normalizeTitle(title);
  const hits = catalog.byNorm.get(norm);
  if (hits?.length === 1) return hits[0].slug;

  const guess = slugFromTitle(title);
  if (catalog.bySlug.has(guess)) return guess;

  if (hits?.length > 1) {
    const exact = hits.find((h) => normalizeTitle(h.title) === norm);
    if (exact) return exact.slug;
    return hits[0].slug;
  }

  return null;
}

const QUESTION_QUERY = `
query questionContent($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    title
    content
    difficulty
    exampleTestcases
    sampleTestCase
    metaData
  }
}`;

export async function fetchQuestionBySlug(slug) {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "champdsa-content-sync/1.0",
    },
    body: JSON.stringify({
      query: QUESTION_QUERY,
      variables: { titleSlug: slug },
    }),
  });
  if (!res.ok) throw new Error(`GraphQL HTTP ${res.status} for ${slug}`);
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  return json.data?.question ?? null;
}

export function parseExamples(question) {
  if (!question) return [];
  const lines = (question.exampleTestcases ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (!lines.length) return [];

  let params = [{ name: "input" }];
  try {
    const meta = JSON.parse(question.metaData ?? "{}");
    if (meta.params?.length) params = meta.params;
  } catch {
    /* ignore */
  }

  const paramCount = params.length;
  const examples = [];
  for (let i = 0; i + paramCount <= lines.length; i += paramCount) {
    const chunk = lines.slice(i, i + paramCount);
    const input = params
      .map((p, j) => `${p.name} = ${chunk[j]}`)
      .join("\n");
    examples.push({ input, output: "" });
  }
  return examples;
}

export function difficultyFromLc(d) {
  const m = { Easy: "easy", Medium: "medium", Hard: "hard" };
  return m[d] ?? "medium";
}

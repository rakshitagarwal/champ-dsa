import { buildSlugToFnMap, migrateToLeetCodeParams } from "./leetcode-meta.mjs";

const SLUG_TO_FN = buildSlugToFnMap();

export function slugToFnName(slug) {
  if (!slug) return undefined;
  if (SLUG_TO_FN[slug]) return SLUG_TO_FN[slug];
  return slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/-/g, "");
}

/** Wrap legacy solve() sheet entries; skip already-migrated var fn = function code. */
export function wrapLeetCodeEntry(
  starterCode,
  solutionCode,
  sampleInput,
  slug,
  existingEntryFunction,
) {
  if (existingEntryFunction) {
    return {
      starterCode,
      solutionCode,
      entryFunction: existingEntryFunction,
    };
  }

  if (/var\s+\w+\s*=\s*function\s*\(/.test(solutionCode)) {
    const m = solutionCode.match(/var\s+(\w+)\s*=\s*function/);
    return {
      starterCode,
      solutionCode,
      entryFunction: m?.[1] ?? "solve",
    };
  }

  const migrated = migrateToLeetCodeParams(
    { starterCode, solutionCode, sampleInput },
    slug,
  );
  if (migrated) {
    return {
      starterCode: `var ${migrated.fnName} = function (${migrated.sig}) {\n${migrated.starter}\n};`,
      solutionCode: `var ${migrated.fnName} = function (${migrated.sig}) {\n${migrated.solution}\n};`,
      entryFunction: migrated.fnName,
    };
  }

  return { starterCode, solutionCode, entryFunction: "solve" };
}

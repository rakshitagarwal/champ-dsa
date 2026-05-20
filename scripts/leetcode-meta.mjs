import fs from "fs";
import path from "path";

const CACHE_DIR = "scripts/.cache/leetcode";

/** Sheet input key aliases for LeetCode param names. */
const INPUT_ALIASES = {
  accounts: ["nums"],
  grid: ["nums"],
  mat: ["matrix"],
  ratings: ["nums"],
};

function resolveInputKey(lcParam, input, inputKeys) {
  if (input[lcParam] !== undefined) return lcParam;
  for (const alt of INPUT_ALIASES[lcParam] || []) {
    if (input[alt] !== undefined) return alt;
  }
  const idx = inputKeys.indexOf(lcParam);
  if (idx >= 0) return inputKeys[idx];
  return null;
}

/** @returns {{ fnName: string, params: string[] } | null} */
export function loadLeetCodeMeta(slug) {
  if (!slug) return null;
  const file = path.join(CACHE_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  try {
    const raw = JSON.parse(fs.readFileSync(file, "utf8"));
    const meta = JSON.parse(raw.metaData || "{}");
    if (!meta.name || !Array.isArray(meta.params)) return null;
    const params = meta.params.map((p) => p.name).filter(Boolean);
    if (!params.length) return null;
    return { fnName: meta.name, params };
  } catch {
    return null;
  }
}

/** Build slug -> fnName map from all cached LeetCode problems. */
export function buildSlugToFnMap() {
  const map = {};
  if (!fs.existsSync(CACHE_DIR)) return map;
  for (const file of fs.readdirSync(CACHE_DIR)) {
    if (!file.endsWith(".json")) continue;
    const slug = file.replace(/\.json$/, "");
    const meta = loadLeetCodeMeta(slug);
    if (meta) map[slug] = meta.fnName;
  }
  return map;
}

export function transformInputBody(body, input, fnName, lcParams = []) {
  let b = body;
  b = b.replace(
    /const\s*\{([^}]+)\}\s*=\s*input\s*,\s*(\w+)\s*=\s*([^;]+)\s*;?/g,
    "const $2 = $3;",
  );
  b = b.replace(/const\s*\{([^}]+)\}\s*=\s*input\s*;?\s*\n?/g, "");
  const paramNames = new Set([
    ...lcParams,
    ...Object.keys(input).filter((k) => k !== "raw" && k !== "lines"),
  ]);
  for (const name of paramNames) {
    b = b.replace(
      new RegExp(`(?:const|let)\\s+${name}\\s*=\\s*input\\.${name}\\s*,\\s*`, "g"),
      "const ",
    );
    b = b.replace(
      new RegExp(`(?:const|let)\\s+${name}\\s*=\\s*input\\.${name}\\s*;\\s*\\n?`, "g"),
      "",
    );
    b = b.replace(new RegExp(`input\\.${name}\\b`, "g"), name);
  }
  for (const key of Object.keys(input)) {
    b = b.replace(new RegExp(`input\\.${key}\\b`, "g"), key);
  }
  if (!/\bconst\s+solve\s*=/.test(b)) {
    b = b.replace(/\bsolve\s*\(/g, (match, offset, str) => {
      const before = str.slice(Math.max(0, offset - 24), offset);
      if (
        /const\s+solve\s*=\s*$/.test(before) ||
        /function\s+solve\s*$/.test(before)
      ) {
        return "solve(";
      }
      return `${fnName}(`;
    });
  }
  return b;
}

function postProcessBody(body, lcParams) {
  let b = body;
  b = b.replace(
    /const\s+k\s*=\s*target\s*,\s*a\s*=\s*nums\.slice\(\)\s*;?/g,
    "const a = nums.slice();",
  );
  b = b.replace(
    /const\s+(\w+)\s*=\s*build\s*\(\1\)\s*;?/g,
    (match, name) => {
      const alt = name === "root" ? "tree" : name;
      if (lcParams.includes(alt)) {
        return `const ${name} = build(${alt});`;
      }
      return match;
    },
  );
  b = b.replace(
    /const\s+(\w+)\s*=\s*\1\s*,\s*(\w+)\s*=\s*\2\s*;?\s*\n?/g,
    "",
  );
  b = b.replace(/const\s+(\w+)\s*=\s*\1\s*;?\s*\n?/g, "");
  for (const p of lcParams) {
    b = b.replace(
      new RegExp(`const\\s+${p}\\s*=\\s*${p}\\s*,\\s*${p}\\s*=\\s*${p}\\s*;?\\s*\\n?`, "g"),
      "",
    );
    b = b.replace(
      new RegExp(`const\\s+${p}\\s*=\\s*${p}\\b[^\\n;]*[,;]?\\s*\\n?`, "g"),
      "",
    );
    b = b.replace(
      new RegExp(`let\\s+${p}\\s*=\\s*${p}\\b[^\\n;]*[,;]?\\s*\\n?`, "g"),
      "",
    );
    if (p !== "nums") {
      b = b.replace(
        new RegExp(`const\\s+${p}\\s*=\\s*nums\\s*;?\\s*\\n?`, "g"),
        "",
      );
    }
  }
  b = b.replace(
    /while \(q\.length\) \{ const c = q\.shift\(\); order \+= c; for \(const nxt of adj\.get\(c\)\) if \(--indeg\.get\(nxt\) === 0\) q\.push\(nxt\); \}/,
    `while (q.length) {
    const c = q.shift();
    order += c;
    for (const nxt of adj.get(c)) {
      const d = indeg.get(nxt) - 1;
      indeg.set(nxt, d);
      if (d === 0) q.push(nxt);
    }
  }`,
  );
  return b;
}

function renameId(body, from, to) {
  if (!from || from === to) return body;
  return body.replace(new RegExp(`\\b${from}\\b`, "g"), to);
}

/**
 * Map sheet sample input keys to LeetCode param names and rewrite body identifiers.
 * @returns {{ input: Record<string, unknown>, sig: string, starter: string, solution: string, fnName: string } | null}
 */
export function migrateToLeetCodeParams(sol, slug) {
  const meta = loadLeetCodeMeta(slug);
  if (!meta) return null;

  const { fnName, params: lcParams } = meta;
  let input;
  try {
    input = JSON.parse(sol.sampleInput);
  } catch {
    return null;
  }

  const inputKeys = Object.keys(input).filter(
    (k) => k !== "raw" && k !== "lines",
  );
  if (!inputKeys.length) return null;

  const newInput = {};
  const renames = {};

  if (
    lcParams.length === 1 &&
    lcParams[0] === "graph" &&
    input.n !== undefined &&
    input.edges !== undefined
  ) {
    return null;
  }

  for (let i = 0; i < lcParams.length; i++) {
    const lc = lcParams[i];
    let srcKey = resolveInputKey(lc, input, inputKeys);
    if (srcKey === null || input[srcKey] === undefined) {
      const byPos = inputKeys[i];
      if (byPos !== undefined && input[byPos] !== undefined) {
        srcKey = byPos;
      } else {
        return null;
      }
    }
    newInput[lc] = input[srcKey];
    if (srcKey !== lc) renames[srcKey] = lc;
  }

  if (Object.keys(newInput).length !== lcParams.length) return null;

  const extractBody = (code) => {
    const m = code.match(/function\s+solve\s*\([^)]*\)\s*\{([\s\S]*)\}\s*$/);
    return m ? m[1] : null;
  };

  let starter = extractBody(sol.starterCode);
  let solution = extractBody(sol.solutionCode);
  if (starter == null || solution == null) return null;

  const oldSig = (sol.starterCode.match(/function\s+solve\s*\(([^)]*)\)/) ||
    [])[1]?.trim();

  if (oldSig === "input") {
    starter = transformInputBody(starter, input, fnName, lcParams);
    solution = transformInputBody(solution, input, fnName, lcParams);
  }

  for (const [from, to] of Object.entries(renames)) {
    starter = renameId(starter, from, to);
    solution = renameId(solution, from, to);
  }

  starter = postProcessBody(starter, lcParams);
  solution = postProcessBody(solution, lcParams);

  return {
    input: newInput,
    sig: lcParams.join(", "),
    starter,
    solution,
    fnName,
  };
}

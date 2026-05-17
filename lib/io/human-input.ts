/** Parse friendly input like `nums = [1,2,3]` and `target = 9` into a runner object. */
export function parseHumanInput(text: string): unknown {
  const trimmed = text.trim();
  if (!trimmed) return {};

  if (trimmed.startsWith("{")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      /* fall through */
    }
  }

  const obj: Record<string, unknown> = {};
  const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);

  for (const line of lines) {
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const raw = line.slice(eq + 1).trim();
    obj[key] = parseValue(raw);
  }

  if (Object.keys(obj).length > 0) return obj;

  return parseStdinFallback(trimmed);
}

function parseValue(raw: string): unknown {
  if (raw === "true") return true;
  if (raw === "false") return false;
  if (raw === "null") return null;
  if (/^-?\d+$/.test(raw)) return Number(raw);
  if (/^-?\d*\.\d+$/.test(raw)) return Number(raw);
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1);
  }
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function parseStdinFallback(trimmed: string): unknown {
  const lines = trimmed.split("\n").map((l) => l.trim());
  if (lines.length === 1) {
    const nums = lines[0].split(/[\s,]+/).map(Number);
    if (nums.every((n) => !Number.isNaN(n))) {
      return { nums };
    }
  }
  return { raw: trimmed };
}

export function formatHumanInput(obj: unknown): string {
  if (obj === null || obj === undefined) return "";
  if (typeof obj !== "object" || Array.isArray(obj)) {
    return String(obj);
  }
  return Object.entries(obj as Record<string, unknown>)
    .map(([k, v]) => `${k} = ${formatValue(v)}`)
    .join("\n");
}

function formatValue(v: unknown): string {
  if (typeof v === "string") return JSON.stringify(v);
  if (Array.isArray(v)) return JSON.stringify(v);
  if (typeof v === "object" && v !== null) return JSON.stringify(v);
  return String(v);
}

/** Convert legacy JSON stdin string to human-readable if possible. */
export function stdinToHuman(stdin: string): string {
  const trimmed = stdin.trim();
  if (!trimmed.startsWith("{")) return trimmed;
  try {
    return formatHumanInput(JSON.parse(trimmed));
  } catch {
    return trimmed;
  }
}

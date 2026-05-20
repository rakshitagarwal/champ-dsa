/** Lightweight JS/TS syntax highlighting for note code blocks (HTML spans). */

const KEYWORDS = new Set([
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "delete",
  "else",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "let",
  "new",
  "null",
  "of",
  "return",
  "static",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "yield",
]);

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function span(text: string, cls: string): string {
  return `<span class="${cls}">${escapeHtml(text)}</span>`;
}

const HIGHLIGHT_LANGS = new Set([
  "",
  "js",
  "javascript",
  "ts",
  "typescript",
  "node",
  "nodejs",
]);

export function highlightCode(code: string, lang?: string): string {
  const l = (lang ?? "javascript").toLowerCase();
  if (!HIGHLIGHT_LANGS.has(l)) {
    return escapeHtml(code);
  }

  const out: string[] = [];
  let i = 0;
  const src = code;

  while (i < src.length) {
    if (src.slice(i, i + 2) === "//") {
      const end = src.indexOf("\n", i);
      const endIdx = end === -1 ? src.length : end;
      out.push(span(src.slice(i, endIdx), "tok-com"));
      i = endIdx;
      continue;
    }

    if (src.slice(i, i + 2) === "/*") {
      const end = src.indexOf("*/", i + 2);
      const endIdx = end === -1 ? src.length : end + 2;
      out.push(span(src.slice(i, endIdx), "tok-com"));
      i = endIdx;
      continue;
    }

    const ch = src[i]!;
    if (ch === '"' || ch === "'" || ch === "`") {
      let j = i + 1;
      while (j < src.length) {
        if (src[j] === "\\") {
          j += 2;
          continue;
        }
        if (src[j] === ch) {
          j++;
          break;
        }
        j++;
      }
      out.push(span(src.slice(i, j), "tok-str"));
      i = j;
      continue;
    }

    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < src.length && /[0-9.xXa-fA-F_]/.test(src[j]!)) j++;
      out.push(span(src.slice(i, j), "tok-num"));
      i = j;
      continue;
    }

    if (/[a-zA-Z_$]/.test(ch)) {
      let j = i;
      while (j < src.length && /[\w$]/.test(src[j]!)) j++;
      const word = src.slice(i, j);
      if (KEYWORDS.has(word)) {
        out.push(span(word, "tok-kw"));
      } else if (src[j] === "(") {
        out.push(span(word, "tok-fn"));
      } else {
        out.push(span(word, "tok-id"));
      }
      i = j;
      continue;
    }

    out.push(escapeHtml(ch));
    i++;
  }

  return out.join("");
}

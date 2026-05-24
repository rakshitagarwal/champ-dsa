/** Lightweight markdown → HTML for revision notes (server-only). */

import { highlightCode } from "@/lib/notes/highlight-code";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function inlineFormat(text: string): string {
  let s = escapeHtml(text);
  s = s.replace(/`([^`]+)`/g, '<code class="note-inline-code">$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  s = s.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  return s;
}

function splitTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((c) => c.trim());
}

function isTableSeparator(line: string): boolean {
  return /^\|?[\s\-:|]+\|?$/.test(line.trim());
}

function parseTableRowCells(line: string): string[] {
  return splitTableRow(line);
}

export type NoteSegment =
  | { type: "html"; html: string }
  | { type: "code"; code: string; lang: string; runnable: boolean };

function parseFenceInfo(fenceInfo: string): {
  lang: string;
  runnable: boolean;
} {
  const parts = fenceInfo.trim().split(/\s+/).filter(Boolean);
  const runnable = parts.includes("runnable");
  const lang = parts.find((p) => p !== "runnable") ?? "";
  return { lang, runnable };
}

function isRunnableJs(lang: string, runnable: boolean): boolean {
  if (!runnable) return false;
  const id = lang.toLowerCase();
  return id === "" || id === "js" || id === "javascript";
}

export function staticCodeBlockHtml(body: string, fenceInfo: string): string {
  const { lang } = parseFenceInfo(fenceInfo);
  return `<pre class="note-code-block"><code class="note-code"${lang ? ` data-lang="${escapeHtml(lang)}"` : ""}>${highlightCode(body, lang)}</code></pre>`;
}

/** When false, `js runnable` fences render as static blocks (used outside javascript.md). */
export function parseNoteSegments(
  md: string,
  options?: { enableRunnable?: boolean },
): NoteSegment[] {
  const enableRunnable = options?.enableRunnable === true;
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const segments: NoteSegment[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const fenceInfo = line.slice(3).trim();
      i++;
      const code: string[] = [];
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++;
      const body = code.join("\n");
      const { lang, runnable } = parseFenceInfo(fenceInfo);
      if (enableRunnable && isRunnableJs(lang, runnable)) {
        segments.push({
          type: "code",
          code: body,
          lang: "javascript",
          runnable: true,
        });
      } else {
        segments.push({
          type: "html",
          html: staticCodeBlockHtml(body, fenceInfo),
        });
      }
      continue;
    }

    if (
      line.includes("|") &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1]!)
    ) {
      const headerCells = parseTableRowCells(line);
      i += 2;
      const bodyRows: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim() !== "") {
        bodyRows.push(parseTableRowCells(lines[i]!));
        i++;
      }
      const table: string[] = [];
      table.push('<div class="note-table-wrap"><table class="note-table"><thead><tr>');
      for (const cell of headerCells) {
        table.push(`<th>${inlineFormat(cell)}</th>`);
      }
      table.push("</tr></thead><tbody>");
      for (const row of bodyRows) {
        table.push("<tr>");
        for (let c = 0; c < headerCells.length; c++) {
          table.push(`<td>${inlineFormat(row[c] ?? "")}</td>`);
        }
        table.push("</tr>");
      }
      table.push("</tbody></table></div>");
      segments.push({ type: "html", html: table.join("") });
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      segments.push({ type: "html", html: "<hr />" });
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      const title = line.slice(4);
      segments.push({
        type: "html",
        html: `<h3 id="${slugifyHeading(title)}">${inlineFormat(title)}</h3>`,
      });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      const title = line.slice(3);
      segments.push({
        type: "html",
        html: `<h2 id="${slugifyHeading(title)}">${inlineFormat(title)}</h2>`,
      });
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      segments.push({
        type: "html",
        html: `<h1>${inlineFormat(line.slice(2))}</h1>`,
      });
      i++;
      continue;
    }

    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quote.push(lines[i].slice(2));
        i++;
      }
      segments.push({
        type: "html",
        html: `<blockquote><p>${inlineFormat(quote.join(" "))}</p></blockquote>`,
      });
      continue;
    }

    if (/^[-*] /.test(line)) {
      const list: string[] = ["<ul>"];
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        list.push(`<li>${inlineFormat(lines[i].replace(/^[-*] /, ""))}</li>`);
        i++;
      }
      list.push("</ul>");
      segments.push({ type: "html", html: list.join("") });
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const list: string[] = ["<ol>"];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        list.push(`<li>${inlineFormat(lines[i].replace(/^\d+\. /, ""))}</li>`);
        i++;
      }
      list.push("</ol>");
      segments.push({ type: "html", html: list.join("") });
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#/.test(lines[i]) &&
      !lines[i].startsWith("```") &&
      !/^[-*] /.test(lines[i]) &&
      !/^\d+\. /.test(lines[i]) &&
      !lines[i].startsWith("> ") &&
      !(
        lines[i].includes("|") &&
        i + 1 < lines.length &&
        isTableSeparator(lines[i + 1]!)
      )
    ) {
      para.push(lines[i]);
      i++;
    }
    segments.push({
      type: "html",
      html: `<p>${inlineFormat(para.join(" "))}</p>`,
    });
  }

  return segments;
}

export function extractH2Headings(md: string): { id: string; title: string }[] {
  const headings: { id: string; title: string }[] = [];
  const seen = new Map<string, number>();

  for (const line of md.replace(/\r\n/g, "\n").split("\n")) {
    if (!line.startsWith("## ")) continue;
    const title = line.slice(3).trim();
    let id = slugifyHeading(title);
    const count = seen.get(id) ?? 0;
    if (count > 0) id = `${id}-${count}`;
    seen.set(slugifyHeading(title), count + 1);
    headings.push({ id, title });
  }

  return headings;
}

export function parseMarkdown(md: string): string {
  return parseNoteSegments(md)
    .map((seg) =>
      seg.type === "html"
        ? seg.html
        : staticCodeBlockHtml(seg.code, seg.lang),
    )
    .join("\n");
}

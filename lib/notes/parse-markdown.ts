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
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      i++;
      const code: string[] = [];
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++;
      const body = code.join("\n");
      out.push(
        `<pre class="note-code-block"><code class="note-code"${lang ? ` data-lang="${escapeHtml(lang)}"` : ""}>${highlightCode(body, lang)}</code></pre>`,
      );
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
      out.push('<div class="note-table-wrap"><table class="note-table"><thead><tr>');
      for (const cell of headerCells) {
        out.push(`<th>${inlineFormat(cell)}</th>`);
      }
      out.push("</tr></thead><tbody>");
      for (const row of bodyRows) {
        out.push("<tr>");
        for (let c = 0; c < headerCells.length; c++) {
          out.push(`<td>${inlineFormat(row[c] ?? "")}</td>`);
        }
        out.push("</tr>");
      }
      out.push("</tbody></table></div>");
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      out.push("<hr />");
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      const title = line.slice(4);
      out.push(`<h3 id="${slugifyHeading(title)}">${inlineFormat(title)}</h3>`);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      const title = line.slice(3);
      out.push(`<h2 id="${slugifyHeading(title)}">${inlineFormat(title)}</h2>`);
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      out.push(`<h1>${inlineFormat(line.slice(2))}</h1>`);
      i++;
      continue;
    }

    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quote.push(lines[i].slice(2));
        i++;
      }
      out.push(`<blockquote><p>${inlineFormat(quote.join(" "))}</p></blockquote>`);
      continue;
    }

    if (/^[-*] /.test(line)) {
      out.push("<ul>");
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        out.push(`<li>${inlineFormat(lines[i].replace(/^[-*] /, ""))}</li>`);
        i++;
      }
      out.push("</ul>");
      continue;
    }

    if (/^\d+\. /.test(line)) {
      out.push("<ol>");
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        out.push(`<li>${inlineFormat(lines[i].replace(/^\d+\. /, ""))}</li>`);
        i++;
      }
      out.push("</ol>");
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
    out.push(`<p>${inlineFormat(para.join(" "))}</p>`);
  }

  return out.join("\n");
}

/** Lightweight markdown → HTML for revision notes (server-only). */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineFormat(text: string): string {
  let s = escapeHtml(text);
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  s = s.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  return s;
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
      out.push(
        `<pre class="note-code"><code${lang ? ` data-lang="${escapeHtml(lang)}"` : ""}>${escapeHtml(code.join("\n"))}</code></pre>`,
      );
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      out.push("<hr />");
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      out.push(`<h3>${inlineFormat(line.slice(4))}</h3>`);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      out.push(`<h2>${inlineFormat(line.slice(3))}</h2>`);
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
    while (i < lines.length && lines[i].trim() !== "" && !/^#/.test(lines[i]) && !lines[i].startsWith("```") && !/^[-*] /.test(lines[i]) && !/^\d+\. /.test(lines[i]) && !lines[i].startsWith("> ")) {
      para.push(lines[i]);
      i++;
    }
    out.push(`<p>${inlineFormat(para.join(" "))}</p>`);
  }

  return out.join("\n");
}

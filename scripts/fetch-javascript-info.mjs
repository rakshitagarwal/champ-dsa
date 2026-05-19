/**
 * Fetch javascript.info tutorial articles (from en.javascript.info GitHub) into article-bodies.json.
 * Usage: node scripts/fetch-javascript-info.mjs [--slug var-let-const]
 */
import fs from "fs";
import path from "path";

const RAW_BASE =
  "https://raw.githubusercontent.com/javascript-tutorial/en.javascript.info/master/";
const mapPath = "data/js-notes/javascript-info-map.json";
const outPath = "data/js-notes/article-bodies.json";
const cacheDir = "scripts/.cache/javascript-info";

const slugArg = process.argv.indexOf("--slug");
const onlySlug = slugArg >= 0 ? process.argv[slugArg + 1] : null;

if (!fs.existsSync(mapPath)) {
  console.error("Missing", mapPath);
  process.exit(1);
}

fs.mkdirSync(cacheDir, { recursive: true });

const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));
let bodies = {};
if (fs.existsSync(outPath)) {
  bodies = JSON.parse(fs.readFileSync(outPath, "utf8"));
}

/** Strip javascript.info-specific fenced blocks; keep standard markdown. */
function cleanMarkdown(md) {
  return md
    .replace(/```[\w-]*\n[\s\S]*?```/g, (block) => {
      if (
        block.startsWith("```smart") ||
        block.startsWith("```warn") ||
        block.startsWith("```online") ||
        block.startsWith("```info")
      ) {
        const inner = block.replace(/^```[\w-]*\n/, "").replace(/```$/, "");
        return `\n\n> ${inner.trim().replace(/\n/g, "\n> ")}\n\n`;
      }
      return block;
    })
    .replace(/\*\*!\*\*/g, "")
    .replace(/\/\*!\*\/[\s\S]*?\*\/!\*\//g, (m) => {
      const inner = m.replace(/\/\*!\*\//g, "").replace(/\*\/!\*\//g, "");
      return inner.trim();
    });
}

function mdToHtml(md) {
  let html = md
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const esc = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `<pre class="js-note-code"><code>${esc}</code></pre>`;
    })
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  const paragraphs = html.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  return paragraphs
    .map((p) => {
      if (p.startsWith("<h") || p.startsWith("<pre") || p.startsWith("<ul")) return p;
      if (p.startsWith(">")) return `<blockquote class="js-note-callout">${p.replace(/^> ?/gm, "")}</blockquote>`;
      return `<p>${p.replace(/\n/g, " ")}</p>`;
    })
    .join("\n");
}

async function fetchArticle(repoPath) {
  const url = RAW_BASE + repoPath;
  const cacheFile = path.join(cacheDir, repoPath.replace(/\//g, "__"));
  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile, "utf8");
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const text = await res.text();
  fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
  fs.writeFileSync(cacheFile, text);
  await new Promise((r) => setTimeout(r, 200));
  return text;
}

const report = { ok: [], failed: [] };

for (const [slug, meta] of Object.entries(map)) {
  if (onlySlug && slug !== onlySlug) continue;

  try {
    const parts = [];
    const sourceUrls = [];
    for (const article of meta.articles) {
      try {
        const md = cleanMarkdown(await fetchArticle(article.path));
        parts.push(mdToHtml(md));
        if (article.url) sourceUrls.push(article.url);
      } catch (e) {
        console.warn(`  skip ${article.path}:`, e.message);
      }
    }
    if (parts.length === 0) throw new Error("no articles fetched");

    bodies[slug] = {
      html: parts.join('\n<hr class="js-note-hr" />\n'),
      sourceUrls: [...new Set(sourceUrls)],
      fetchedAt: new Date().toISOString().slice(0, 10),
    };
    report.ok.push(slug);
    console.log("OK", slug, `(${parts.length} articles)`);
  } catch (e) {
    report.failed.push({ slug, error: e.message });
    console.error("FAIL", slug, e.message);
  }
}

fs.writeFileSync(outPath, JSON.stringify(bodies, null, 2));
console.log("\nWrote", outPath);
console.log("OK:", report.ok.length, "Failed:", report.failed.length);

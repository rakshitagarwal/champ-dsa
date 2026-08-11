import { PRACTICE_P0_TO_P4 } from "../data/dsa-sheet/practice/p0-p4.mjs";
import { PRACTICE_P5_TO_P9 } from "../data/dsa-sheet/practice/p5-p9.mjs";
import { PRACTICE_P10_TO_P13 } from "../data/dsa-sheet/practice/p10-p13.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const PRACTICE = {
  ...PRACTICE_P0_TO_P4,
  ...PRACTICE_P5_TO_P9,
  ...PRACTICE_P10_TO_P13,
};

function loadRoadmap() {
  const roadmapPath = path.join(root, "data/dsa-sheet/roadmap.json");
  return JSON.parse(fs.readFileSync(roadmapPath, "utf8"));
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cleanTitle(title) {
  return title.replace(/^\d+\.\s*/, "");
}

function renderLeaf(node) {
  const entry = PRACTICE[node.id];
  let body = "";
  if (!entry) {
    body = `<p class="missing">Practice entry coming soon for <code>${esc(node.id)}</code>.</p>`;
  } else if (entry.kind === "notes") {
    body = `<div class="notes"><strong>Notes</strong><p>${esc(entry.notes)}</p></div>`;
  } else {
    body = `<ul class="qlist">${entry.questions
      .map((q, i) => {
        const hid = `${node.id}-h${i}`;
        return `<li class="qitem">
          <div class="qtop">
            <span class="qtitle">${esc(q.title)}</span>
            <span class="qsource">${esc(q.source)}</span>
          </div>
          <div class="qactions">
            <button type="button" class="btn hint" data-hint="${hid}" aria-expanded="false">Hint</button>
            <a class="btn link" href="${esc(q.url)}" target="_blank" rel="noopener noreferrer">Link</a>
          </div>
          <div id="${hid}" class="hintbox" hidden>${esc(q.hint)}</div>
        </li>`;
      })
      .join("")}</ul>`;
  }
  return `<div class="leaf" id="${esc(node.id)}">
    <h4>${esc(node.title)}</h4>
    ${body}
  </div>`;
}

function renderNode(node, depth = 0) {
  if (!node.children?.length) return renderLeaf(node);
  // Nested group (e.g. Sort + Pattern)
  return `<div class="group depth-${depth}">
    <h4 class="group-title">${esc(cleanTitle(node.title))}</h4>
    ${node.children.map((c) => renderNode(c, depth + 1)).join("")}
  </div>`;
}

function buildHtml(roadmap) {
  let qCount = 0;
  let noteCount = 0;
  let missing = 0;
  for (const id of Object.keys(PRACTICE)) {
    if (PRACTICE[id].kind === "notes") noteCount++;
    else qCount += PRACTICE[id].questions?.length ?? 0;
  }

  const phasesHtml = roadmap
    .map((phase) => {
      const topics = phase.topics
        .map((topic, ti) => {
          const leavesHtml = (topic.children ?? [])
            .map((c) => renderNode(c))
            .join("");
          // If topic itself is a leaf (shouldn't happen often)
          const content =
            topic.children?.length
              ? leavesHtml
              : renderLeaf(topic);
          return `<section class="topic" id="${esc(topic.id)}">
            <h3><span class="num">${ti + 1}.</span> ${esc(cleanTitle(topic.title))}</h3>
            ${content}
          </section>`;
        })
        .join("");
      return `<section class="phase" id="${esc(phase.id)}">
        <header class="phase-head">
          <p class="eyebrow">Phase ${phase.phase}</p>
          <h2>${esc(phase.title)}</h2>
          <p class="desc">${esc(phase.description)}</p>
        </header>
        ${topics}
      </section>`;
    })
    .join("\n");

  // coverage check
  function walk(n, ids) {
    if (!n.children?.length) ids.push(n.id);
    else n.children.forEach((c) => walk(c, ids));
  }
  const allLeaves = [];
  for (const p of roadmap) {
    for (const t of p.topics) walk(t, allLeaves);
  }
  for (const id of allLeaves) {
    if (!PRACTICE[id]) missing++;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>ChampDSA Roadmap — Practice Sheet</title>
<style>
  :root {
    --bg: #f7f4ef;
    --ink: #1c1917;
    --muted: #57534e;
    --card: #fffcf7;
    --line: #e7e0d5;
    --accent: #0f766e;
    --accent-soft: #ccfbf1;
    --hint-bg: #fff7ed;
    --hint-border: #fdba74;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    color: var(--ink);
    background:
      radial-gradient(ellipse 80% 50% at 50% -10%, #99f6e4aa, transparent),
      var(--bg);
    line-height: 1.5;
  }
  .wrap { max-width: 880px; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
  .hero {
    border-bottom: 1px solid var(--line);
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
  }
  .hero h1 { font-size: 2rem; margin: 0.25rem 0; letter-spacing: -0.02em; }
  .hero p { color: var(--muted); margin: 0.5rem 0 0; max-width: 40rem; }
  .stats { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1rem; }
  .stat {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 0.35rem 0.85rem;
    font-size: 0.85rem;
    color: var(--muted);
  }
  .toc {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin-bottom: 2rem;
  }
  .toc h2 { font-size: 1rem; margin: 0 0 0.75rem; }
  .toc ol { margin: 0; padding-left: 1.25rem; columns: 2; gap: 1.5rem; }
  .toc a { color: var(--accent); text-decoration: none; }
  .toc a:hover { text-decoration: underline; }
  .phase {
    margin: 2.5rem 0;
    padding-top: 0.5rem;
    break-inside: avoid;
  }
  .phase-head { margin-bottom: 1.25rem; }
  .eyebrow {
    font-family: ui-monospace, Consolas, monospace;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0;
  }
  .phase-head h2 { margin: 0.2rem 0; font-size: 1.65rem; letter-spacing: -0.02em; }
  .desc { color: var(--muted); margin: 0.35rem 0 0; }
  .topic {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 1rem 1.1rem 0.75rem;
    margin: 0.85rem 0;
  }
  .topic h3 { margin: 0 0 0.75rem; font-size: 1.05rem; }
  .topic .num { color: var(--muted); font-family: ui-monospace, Consolas, monospace; }
  .leaf, .group { margin: 0.65rem 0 0.85rem; padding-left: 0.25rem; }
  .leaf h4, .group-title {
    margin: 0 0 0.4rem;
    font-size: 0.95rem;
    font-weight: 600;
  }
  .group { border-left: 2px solid var(--line); padding-left: 0.75rem; }
  .notes {
    background: #f0fdfa;
    border: 1px solid #99f6e4;
    border-radius: 8px;
    padding: 0.75rem 0.9rem;
    font-size: 0.92rem;
  }
  .notes strong { color: var(--accent); }
  .notes p { margin: 0.35rem 0 0; color: var(--ink); }
  .qlist { list-style: none; margin: 0; padding: 0; }
  .qitem {
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 0.7rem 0.85rem;
    margin: 0.45rem 0;
    background: #fff;
  }
  .qtop { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: baseline; justify-content: space-between; }
  .qtitle { font-weight: 600; font-size: 0.95rem; }
  .qsource {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
    background: #f5f5f4;
    padding: 0.15rem 0.45rem;
    border-radius: 999px;
  }
  .qactions { display: flex; gap: 0.5rem; margin-top: 0.55rem; }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 0.35rem 0.85rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    border: 1px solid transparent;
  }
  .btn.hint {
    background: var(--accent-soft);
    color: #115e59;
    border-color: #5eead4;
  }
  .btn.hint[aria-expanded="true"] {
    background: #134e4a;
    color: #ecfdf5;
  }
  .btn.link {
    background: var(--accent);
    color: #fff;
  }
  .btn.link:hover { filter: brightness(1.05); }
  .hintbox {
    margin-top: 0.55rem;
    padding: 0.65rem 0.75rem;
    background: var(--hint-bg);
    border: 1px solid var(--hint-border);
    border-radius: 8px;
    font-size: 0.9rem;
    color: #7c2d12;
  }
  .missing { color: #b45309; font-size: 0.9rem; }
  footer {
    margin-top: 3rem;
    padding-top: 1rem;
    border-top: 1px solid var(--line);
    color: var(--muted);
    font-size: 0.85rem;
  }
  @media print {
    body { background: #fff; }
    .btn.hint { display: none; }
    .hintbox { display: block !important; }
    .topic, .phase, .qitem { break-inside: avoid; }
    .toc ol { columns: 2; }
  }
  @media (max-width: 640px) {
    .toc ol { columns: 1; }
  }
</style>
</head>
<body>
  <div class="wrap">
    <header class="hero">
      <p class="eyebrow">ChampDSA</p>
      <h1>DSA Roadmap Practice Sheet</h1>
      <p>
        Phase 0 has concept notes. Phases 1–13 have curated interview-style problems
        (mostly LeetCode + GFG). Use <strong>Hint</strong> for a short approach cue —
        not a full solution — then open <strong>Link</strong> to solve it yourself.
      </p>
      <div class="stats">
        <span class="stat">14 phases</span>
        <span class="stat">${qCount} practice links</span>
        <span class="stat">${noteCount} Phase 0 notes</span>
        <span class="stat">${allLeaves.length} subtopics</span>
        ${missing ? `<span class="stat">⚠ ${missing} missing mappings</span>` : `<span class="stat">Full coverage</span>`}
      </div>
    </header>

    <nav class="toc">
      <h2>Jump to phase</h2>
      <ol start="0">
        ${roadmap
          .map(
            (p) =>
              `<li><a href="#${esc(p.id)}">Phase ${p.phase} — ${esc(p.shortTitle)}</a></li>`,
          )
          .join("")}
      </ol>
    </nav>

    ${phasesHtml}

    <footer>
      Built for ChampDSA interview prep. Hints are approach nudges only — in an interview you must derive the solution.
      Prefer solving before peeking. Sources: LeetCode, GeeksforGeeks, and classic Striver-style coverage.
    </footer>
  </div>
  <script>
    document.querySelectorAll("button.hint").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-hint");
        const box = document.getElementById(id);
        if (!box) return;
        const open = box.hasAttribute("hidden");
        if (open) {
          box.removeAttribute("hidden");
          btn.setAttribute("aria-expanded", "true");
          btn.textContent = "Hide hint";
        } else {
          box.setAttribute("hidden", "");
          btn.setAttribute("aria-expanded", "false");
          btn.textContent = "Hint";
        }
      });
    });
  </script>
</body>
</html>`;
}

async function main() {
  const roadmap = loadRoadmap();
  const html = buildHtml(roadmap);
  const outDir = path.join(root, "docs");
  fs.mkdirSync(outDir, { recursive: true });
  const htmlPath = path.join(outDir, "champdsa-roadmap-sheet.html");
  fs.writeFileSync(htmlPath, html, "utf8");
  console.log("Wrote", htmlPath);

  // Coverage report
  function walk(n, ids) {
    if (!n.children?.length) ids.push(n.id);
    else n.children.forEach((c) => walk(c, ids));
  }
  const leaves = [];
  for (const p of roadmap) for (const t of p.topics) walk(t, leaves);
  const missing = leaves.filter((id) => !PRACTICE[id]);
  if (missing.length) {
    console.log("Missing", missing.length, "ids:");
    console.log(missing.join("\n"));
  } else {
    console.log("Coverage OK:", leaves.length, "leaves");
  }

  // Try PDF via puppeteer if available
  const pdfPath = path.join(outDir, "champdsa-roadmap-sheet.pdf");
  try {
    const puppeteer = await import("puppeteer");
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(pathToFileURL(htmlPath).href, {
      waitUntil: "networkidle0",
    });
    // Expand all hints for PDF
    await page.evaluate(() => {
      document.querySelectorAll(".hintbox").forEach((el) => {
        el.removeAttribute("hidden");
      });
    });
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" },
    });
    await browser.close();
    console.log("Wrote", pdfPath);
  } catch (err) {
    console.warn("PDF via puppeteer skipped:", err.message);
    console.warn("Open the HTML and Print → Save as PDF. Installing puppeteer will enable auto PDF.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

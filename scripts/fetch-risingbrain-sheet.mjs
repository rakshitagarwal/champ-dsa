import https from "https";
import fs from "fs";

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

const html = await get("https://risingbrain.org/sheet");
const from = html.indexOf("Fundamental collection of elements");
const essential = html.indexOf(
  "Essential Array problems for interview preparation",
);
let chunk = html.slice(from - 250, essential > 0 ? essential : from + 400000);
chunk = chunk.replace(/\\"/g, '"').replace(/\\u0026/g, "&");

function extractProblems(problemsStr) {
  const problems = [];
  const pre =
    /"title":"([^"]+)","reference":"([^"]*)","difficulty":"([^"]+)","leetcodeUrl":"([^"]*)"/g;
  let m;
  while ((m = pre.exec(problemsStr))) {
    const url = m[4];
    const slugMatch = url.match(/leetcode\.com\/problems\/([^/"?]+)/);
    let slug = slugMatch ? slugMatch[1] : null;
    if (slug === "add-and-search-word-data-structure-design") {
      slug = "design-add-and-search-words-data-structure";
    }
    if (!slug) continue;
    const diff = m[3].toLowerCase();
    problems.push({
      title: m[1].replace(/’/g, "'"),
      difficulty: ["easy", "medium", "hard"].includes(diff) ? diff : "medium",
      slug,
    });
  }
  return problems;
}

const topicRe =
  /"name":"([^"]+)","description":"([^"]*)","problemCount":(\d+),"solvedCount":\d+,"patterns":\[/g;
const topicMatches = [...chunk.matchAll(topicRe)];
const topics = [];

for (let i = 0; i < topicMatches.length; i++) {
  const tm = topicMatches[i];
  const start = tm.index + tm[0].length - 1;
  const end =
    i + 1 < topicMatches.length ? topicMatches[i + 1].index : chunk.length;
  const patternsChunk = chunk.slice(start, end);
  const patterns = [];
  const patternRe =
    /"name":"([^"]+)","strategy":"([^"]*)","identification":"([^"]*)","problems":\[/g;
  const patternMatches = [...patternsChunk.matchAll(patternRe)];
  for (let j = 0; j < patternMatches.length; j++) {
    const pm = patternMatches[j];
    const pStart = pm.index + pm[0].length;
    const pEnd =
      j + 1 < patternMatches.length
        ? patternMatches[j + 1].index
        : patternsChunk.length;
    patterns.push({
      name: pm[1].replace(/’/g, "'"),
      identification: pm[3],
      problems: extractProblems(patternsChunk.slice(pStart, pEnd)),
    });
  }
  topics.push({
    name: tm[1],
    description: tm[2],
    patterns,
  });
}

const outPath = "data/practice/risingbrain-sheet.json";
fs.writeFileSync(outPath, JSON.stringify(topics, null, 2));
const total = topics.reduce(
  (s, t) => s + t.patterns.reduce((a, p) => a + p.problems.length, 0),
  0,
);
console.log("wrote", outPath, "topics", topics.length, "problems", total);

const html = await fetch(
  "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z",
).then((r) => r.text());

const slugRe = /leetcode\.com\/problems\/([a-z0-9-]+)/gi;
const slugs = new Set();
let m;
while ((m = slugRe.exec(html))) slugs.add(m[1]);
console.log("unique slugs", slugs.size);

const apiMatches = html.match(/\/api\/[a-zA-Z0-9/_-]+/g) ?? [];
console.log("api paths", [...new Set(apiMatches)].slice(0, 30));

// Look for embedded JSON blobs
const jsonBlobs = html.match(/\{"id":\d+,"problem_name"[^}]{20,200}\}/g) ?? [];
console.log("json blobs", jsonBlobs.length, jsonBlobs[0]?.slice(0, 120));

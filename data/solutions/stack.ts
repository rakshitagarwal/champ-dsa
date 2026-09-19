import type { SolutionGroup } from "./types";

export const STACK_SOLUTIONS: SolutionGroup = {
  id: "stack",
  title: "Stack",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "valid-parentheses",
      title: "Valid Parentheses",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=Lb-UP8uLEkQ&t=1s&ab_channel=AlgoJS",
      body: `Push every opener. On a closer, the top must be its match. Stack empty at the end means it nested cleanly.

[Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

\`\`\`js
// Hinglish: stack push-pop — ek-ek step comment dekho
// Stack — match open/close
// LC: https://leetcode.com/problems/valid-parentheses/
function isValid(s) {
  // Hinglish: step 1 — base case check karo
  const stack = [];
  const pair = { ")": "(", "]": "[", "}": "{" };
  for (const ch of s) {
    if (!pair[ch]) {
      stack.push(ch);
      continue;
    }
    if (stack.pop() !== pair[ch]) return false;
  }
  return stack.length === 0;
}
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "remove-all-adjacent-duplicates-in-string",
      title: "Remove All Adjacent Duplicates In String",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=MBxm3Om7y3U&ab_channel=AlgoJS",
      body: `Stack me daalo, top same ho to dono udao — chain reaction khud sambhal jayega.

[Remove All Adjacent Duplicates In String](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/)

\`\`\`js
// Hinglish: same aaye to udao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/
function removeDuplicates(s) {
  // Hinglish: step 1 — stack lo
  const st = [];
  for (const ch of s) {
    if (st.length && st[st.length - 1] === ch) st.pop(); // Hinglish: jodi ud gayi
    else st.push(ch);
  }
  return st.join("");
}
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "simplify-path",
      title: "Simplify Path",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=cEVUvTjgspM&ab_channel=AlgoJS",
      body: `Stack me folder names dalo — .. aaye to pop karo, . ya khaali ko ignore karo.

[Simplify Path](https://leetcode.com/problems/simplify-path/)

\`\`\`js
// Hinglish: folder stack — ek-ek step comment dekho
// LC: https://leetcode.com/problems/simplify-path/
function simplifyPath(path) {
  // Hinglish: step 1 — tukde karo
  const st = [];
  for (const part of path.split("/")) {
    if (part === "" || part === ".") continue; // Hinglish: bekaar chhodo
    if (part === "..") st.pop(); // Hinglish: ek upar jao
    else st.push(part); // Hinglish: andar jao
  }
  return "/" + st.join("/");
}
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "remove-all-adjacent-duplicates-in-string-ii",
      title: "Remove All Adjacent Duplicates in String 2",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=w1AYrOS65aM&ab_channel=AlgoJS",
      body: `Count ke saath stack rakho — k barabar hue to udao, chain reaction khud sambhal jayega.

[Remove All Adjacent Duplicates in String 2](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/)

\`\`\`js
// Hinglish: gin ke udao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/
function removeDuplicates(s, k) {
  // Hinglish: step 1 — stack lo [char, count]
  const st = [];
  for (const ch of s) {
    if (st.length && st[st.length - 1][0] === ch) st[st.length - 1][1]++; // Hinglish: gin badhao
    else st.push([ch, 1]);
    if (st[st.length - 1][1] === k) st.pop(); // Hinglish: k hue to udao
  }
  let out = "";
  for (const [ch, c] of st) out += ch.repeat(c); // Hinglish: jod do
  return out;
}
\`\`\``,
    },
      ],
    },
  ],
};

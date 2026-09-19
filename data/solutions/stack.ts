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
// Time: O(n) · Space: O(n)
// Stack — match open/close
var isValid = function(s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    } else {
      let prevVal = stack.pop();

      if (prevVal === "(" && char !== ")") return false;
      if (prevVal === "[" && char !== "]") return false;
      if (prevVal === "{" && char !== "}") return false;
      if (prevVal === undefined) return false;
    }
  }

  return stack.length === 0;
};
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
// Time: O(n) · Space: O(n)
var removeDuplicates = function(s) {
  let stack = [];

  for (let char of s) {
    stack[stack.length - 1] === char ? stack.pop() : stack.push(char);
  }

  return stack.join("");
};
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
// Time: O(n) · Space: O(n)
var simplifyPath = function(path) {
  let stack = [];
  path = path.split("/");

  for (let i = 0; i < path.length; i++) {
    if (path[i] === "." || path[i] === "") {
      continue;
    } else if (path[i] === "..") {
      stack.pop();
    } else {
      stack.push(path[i]);
    }
  }

  return "/" + stack.join("/");
};
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
// Time: O(n) · Space: O(n)
var removeDuplicates = function(s, k) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    let curr = s[i];

    if (stack.length === 0 || curr !== stack[stack.length - 1][0]) {
      stack.push([curr, 1]);
    } else {
      stack[stack.length - 1][1]++;
      if (stack[stack.length - 1][1] === k) stack.pop();
    }
  }

  let res = "";

  for (let [char, count] of stack) {
    res += char.repeat(count);
  }

  return res;
};
\`\`\``,
    },
      ],
    },
  ],
};

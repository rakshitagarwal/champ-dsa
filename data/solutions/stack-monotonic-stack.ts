import type { SolutionGroup } from "./types";

export const STACK_MONOTONIC_STACK_SOLUTIONS: SolutionGroup = {
  id: "stack-monotonic-stack",
  title: "Stack & Monotonic Stack",
  subs: [
    {
      title: "Basic Stack / Parsing",
      topics: [
    {
      id: 20,
      lcSlug: "valid-parentheses",
      title: "Valid Parentheses",
      diff: "Easy",
      body: `Push every opener. On a closer, the top must be its match. Stack empty at the end means it nested cleanly.

[Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

\`\`\`js
// Stack — open push, close must match top
function isValid(s) {
  const stack = [];
  const pair = { ")": "(", "]": "[", "}": "{" };
  for (const ch of s) {
    if (!pair[ch]) {
      stack.push(ch); // opener
      continue;
    }
    if (stack.pop() !== pair[ch]) return false; // wrong or empty
  }
  return stack.length === 0; // no dangling opens
}
\`\`\``,
    },
    {
      id: 155,
      lcSlug: "min-stack",
      title: "Min Stack",
      diff: "Medium",
      body: `I keep a second stack of the min after each push. Pop both together. \`getMin\` is just the top of the min stack.

[Min Stack](https://leetcode.com/problems/min-stack/)

\`\`\`js
// Parallel min stack tracks min so far after each push
function MinStack() {
  this.vals = [];
  this.mins = [];
}
MinStack.prototype.push = function (val) {
  this.vals.push(val);
  const m = this.mins.length ? this.mins.at(-1) : Infinity;
  this.mins.push(Math.min(m, val));
};
MinStack.prototype.pop = function () {
  this.vals.pop();
  this.mins.pop();
};
MinStack.prototype.top = function () {
  return this.vals.at(-1);
};
MinStack.prototype.getMin = function () {
  return this.mins.at(-1);
};
\`\`\``,
    },
    {
      id: 150,
      lcSlug: "evaluate-reverse-polish-notation",
      title: "Evaluate Reverse Polish Notation",
      diff: "Medium",
      body: `Push numbers; on an operator, pop two operands, apply it, and push the result.

[Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)

\`\`\`js
// Postfix — operands stack, operator pops two
function evalRPN(tokens) {
  const st = [];
  for (const t of tokens) {
    if (["+","-","*","/"].includes(t)) {
      const b = st.pop(), a = st.pop(); // note order for - and /
      let v = 0;
      if (t === "+") v = a + b;
      else if (t === "-") v = a - b;
      else if (t === "*") v = a * b;
      else v = Math.trunc(a / b); // toward zero
      st.push(v);
    } else st.push(Number(t));
  }
  return st[0];
}
\`\`\``,
    },
    {
      id: 71,
      lcSlug: "simplify-path",
      title: "Simplify Path",
      diff: "Medium",
      body: `Push path segments; pop on \`..\`, ignore \`.\` and empty parts.

[Simplify Path](https://leetcode.com/problems/simplify-path/)

\`\`\`js
// Path stack — .. pops one level
function simplifyPath(path) {
  const st = []; // canonical directory stack
  for (const part of path.split("/")) {
    if (part === "" || part === ".") continue; // skip empty and current dir
    if (part === "..") st.pop(); // go up one level
    else st.push(part); // enter subdirectory
  }
  return "/" + st.join("/"); // absolute normalized path
}
\`\`\``,
    },
    {
      id: 224,
      lcSlug: "basic-calculator",
      title: "Basic Calculator",
      diff: "Hard",
      body: `Expression with parentheses: accumulate signed numbers; push state when \`(\` opens.

[Basic Calculator](https://leetcode.com/problems/basic-calculator/)

\`\`\`js
// Stack saves (result, sign) on '('
function calculate(s) {
  const st = [];
  let ans = 0, num = 0, sign = 1;
  for (const ch of s) {
    if (ch >= "0" && ch <= "9") num = num * 10 + Number(ch);
    else if (ch === "+" || ch === "-") {
      ans += sign * num;
      num = 0;
      sign = ch === "+" ? 1 : -1;
    } else if (ch === "(") {
      st.push(ans);
      st.push(sign);
      ans = 0;
      sign = 1;
    } else if (ch === ")") {
      ans += sign * num;
      num = 0;
      ans = st.pop() * ans + st.pop(); // sign * inner + outer
    }
  }
  return ans + sign * num;
}
\`\`\``,
    },
    {
      id: 227,
      lcSlug: "basic-calculator-ii",
      title: "Basic Calculator II",
      diff: "Medium",
      body: `No parentheses: apply */ immediately on stack values, then sum the stack.

[Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii/)

\`\`\`js
// Defer * and / on stack; + - push signed nums
function calculate(s) {
  const st = [];
  let num = 0, op = "+";
  const apply = () => {
    if (op === "+") st.push(num);
    else if (op === "-") st.push(-num);
    else if (op === "*") st.push(st.pop() * num);
    else st.push(Math.trunc(st.pop() / num));
  };
  for (let i = 0; i <= s.length; i++) {
    const ch = s[i] || "+"; // flush last number
    if (ch >= "0" && ch <= "9") num = num * 10 + Number(ch);
    else if (ch === " ") continue;
    else {
      apply();
      op = ch;
      num = 0;
    }
  }
  let ans = 0;
  for (const x of st) ans += x;
  return ans;
}
\`\`\``,
    },
    {
      id: 394,
      lcSlug: "decode-string",
      title: "Decode String",
      diff: "Medium",
      body: `Use number and string stacks; on \`]\`, expand repeats and merge.

[Decode String](https://leetcode.com/problems/decode-string/)

\`\`\`js
// stacks: repeat count and prefix string before '['
function decodeString(s) {
  const counts = [], strs = [];
  let cur = "", num = 0;
  for (const ch of s) {
    if (ch >= "0" && ch <= "9") num = num * 10 + Number(ch);
    else if (ch === "[") {
      counts.push(num);
      strs.push(cur);
      num = 0;
      cur = "";
    } else if (ch === "]") {
      const rep = counts.pop(), prev = strs.pop();
      cur = prev + cur.repeat(rep);
    } else cur += ch;
  }
  return cur;
}
\`\`\``,
    },
    {
      id: 1249,
      lcSlug: "minimum-remove-to-make-valid-parentheses",
      title: "Minimum Remove to Make Valid Parentheses",
      diff: "Medium",
      body: `Remove invalid \`)\` by matching \`(\`; second pass drops unmatched open parens.

[Minimum Remove to Make Valid Parentheses](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/)

\`\`\`js
// Mark unmatched ')' then leftover '(' indices
function minRemoveToMakeValid(s) {
  const a = [...s];
  const st = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "(") st.push(i);
    else if (a[i] === ")") {
      if (st.length) st.pop(); // matched
      else a[i] = ""; // extra close
    }
  }
  for (const i of st) a[i] = ""; // unmatched opens
  return a.join("");
}
\`\`\``,
    },
    {
      id: 1047,
      lcSlug: "remove-all-adjacent-duplicates-in-string",
      title: "Remove All Adjacent Duplicates In String",
      diff: "Easy",
      body: `Push chars; when top matches (case-sensitive), pop both — adjacent duplicates collapse.

[Remove All Adjacent Duplicates In String](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/)

\`\`\`js
// Stack cancels pairs as we scan
function removeDuplicates(s) {
  const st = [];
  for (const ch of s) {
    if (st.length && st[st.length - 1] === ch) st.pop();
    else st.push(ch);
  }
  return st.join("");
}
\`\`\``,
    },
    {
      id: 1544,
      lcSlug: "make-the-string-great",
      title: "Make The String Great",
      diff: "Easy",
      body: `Same as adjacent removal, but treat equal letters case-insensitively.

[Make The String Great](https://leetcode.com/problems/make-the-string-great/)

\`\`\`js
// Pop if same letter different case (bad pair)
function makeGood(s) {
  const st = [];
  const bad = (a, b) => a !== b && a.toLowerCase() === b.toLowerCase();
  for (const ch of s) {
    if (st.length && bad(st[st.length - 1], ch)) st.pop();
    else st.push(ch);
  }
  return st.join("");
}
\`\`\``,
    },
      ],
    },
    {
      title: "Next Greater / Histogram",
      topics: [
    {
      id: 739,
      lcSlug: "daily-temperatures",
      title: "Daily Temperatures",
      diff: "Medium",
      body: `Monotonic decreasing stack: each pop reveals days until a warmer temperature.

[Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

\`\`\`js
// Decreasing stack of indices — pop when warmer day found
function dailyTemperatures(temps) {
  const n = temps.length, ans = Array(n).fill(0), st = [];
  for (let i = 0; i < n; i++) {
    while (st.length && temps[i] > temps[st.at(-1)]) {
      const j = st.pop();
      ans[j] = i - j; // days until warmer
    }
    st.push(i);
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 496,
      lcSlug: "next-greater-element-i",
      title: "Next Greater Element I",
      diff: "Easy",
      body: `Decreasing stack: when a larger value pops smaller ones, assign it as their next greater element.

[Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)

\`\`\`js
// NGE for nums2, then lookup for nums1
function nextGreaterElement(nums1, nums2) {
  const mp = new Map(), st = [];
  for (const x of nums2) {
    while (st.length && x > st.at(-1)) {
      const y = st.pop();
      mp.set(y, x); // y's next greater is x
    }
    st.push(x);
  }
  for (const y of st) mp.set(y, -1); // no greater ahead
  return nums1.map((x) => mp.get(x));
}
\`\`\``,
    },
    {
      id: 503,
      lcSlug: "next-greater-element-ii",
      title: "Next Greater Element II",
      diff: "Medium",
      body: `Run two passes over length \`2n\` with a decreasing stack to handle circular next greater.

[Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/)

\`\`\`js
// Double loop simulates circular array
function nextGreaterElements(nums) {
  const n = nums.length, ans = Array(n).fill(-1), st = [];
  for (let i = 0; i < 2 * n; i++) {
    const j = i % n;
    while (st.length && nums[j] > nums[st[st.length - 1]]) {
      ans[st.pop()] = nums[j];
    }
    if (i < n) st.push(j); // only push once
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 84,
      lcSlug: "largest-rectangle-in-histogram",
      title: "Largest Rectangle in Histogram",
      diff: "Hard",
      body: `For each bar, I need the first shorter bar on the left and on the right — that is the width I can stretch. Stack of increasing heights. A sentinel 0 at the end flushes the stack.

[Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

\`\`\`js
// Monotonic increasing stack — pop when shorter bar ends width
function largestRectangleArea(heights) {
  const stack = [-1]; // sentinel left boundary
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i]; // flush with 0
    while (stack.at(-1) !== -1 && h < heights[stack.at(-1)]) {
      const height = heights[stack.pop()];
      const width = i - stack.at(-1) - 1;
      best = Math.max(best, height * width);
    }
    stack.push(i);
  }
  return best;
}
\`\`\``,
    },
    {
      id: 85,
      lcSlug: "maximal-rectangle",
      title: "Maximal Rectangle",
      diff: "Hard",
      body: `Build a histogram of consecutive 1s per row, then largest rectangle in histogram per row.

[Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/)

\`\`\`js
// Row-by-row histogram + largest rectangle in histogram
function maximalRectangle(matrix) {
  if (!matrix.length) return 0;
  const cols = matrix[0].length;
  const h = Array(cols).fill(0);
  let best = 0;
  const largest = (heights) => {
    const st = [];
    let mx = 0;
    for (let i = 0; i <= heights.length; i++) {
      const cur = i === heights.length ? 0 : heights[i];
      while (st.length && cur < heights[st[st.length - 1]]) {
        const height = heights[st.pop()];
        const left = st.length ? st[st.length - 1] + 1 : 0;
        mx = Math.max(mx, height * (i - left));
      }
      st.push(i);
    }
    return mx;
  };
  for (const row of matrix) {
    for (let c = 0; c < cols; c++) h[c] = row[c] === "1" ? h[c] + 1 : 0;
    const area = largest(h);
    if (area > best) best = area;
  }
  return best;
}
\`\`\``,
    },
    {
      id: 901,
      lcSlug: "online-stock-span",
      title: "Online Stock Span",
      diff: "Medium",
      body: `Stock span: stack of \`[price, span]\` while previous days are not higher.

[Online Stock Span](https://leetcode.com/problems/online-stock-span/)

\`\`\`js
// Monotonic decreasing [price, span] stack
function StockSpanner() { this.st = []; }
StockSpanner.prototype.next = function(price) {
  let span = 1;
  while (this.st.length && this.st.at(-1)[0] <= price) {
    span += this.st.pop()[1]; // absorb previous spans
  }
  this.st.push([price, span]);
  return span;
};
\`\`\``,
    },
    {
      id: 402,
      lcSlug: "remove-k-digits",
      title: "Remove K Digits",
      diff: "Medium",
      body: `Remove \`k\` digits: increasing stack drops larger leading digits while budget remains.

[Remove K Digits](https://leetcode.com/problems/remove-k-digits/)

\`\`\`js
// Greedy — pop while top > current and k left
function removeKdigits(num, k) {
  const st = [];
  for (const ch of num) {
    while (st.length && k > 0 && st[st.length - 1] > ch) {
      st.pop();
      k--;
    }
    st.push(ch);
  }
  while (k > 0) { st.pop(); k--; } // drop from end
  let ans = st.join("").replace(/^0+/, "");
  return ans === "" ? "0" : ans;
}
\`\`\``,
    },
    {
      id: 316,
      lcSlug: "remove-duplicate-letters",
      title: "Remove Duplicate Letters",
      diff: "Medium",
      body: `Build smallest lexicographic number: pop larger digits when the same digit appears again later.

[Remove Duplicate Letters](https://leetcode.com/problems/remove-duplicate-letters/)

\`\`\`js
// Monotonic stack + last occurrence map
function removeDuplicateLetters(s) {
  const last = new Map();
  for (let i = 0; i < s.length; i++) last.set(s[i], i);
  const st = [], inStack = new Set();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (inStack.has(ch)) continue;
    while (st.length && ch < st[st.length - 1] && last.get(st[st.length - 1]) > i) {
      inStack.delete(st.pop()); // can pick smaller letter later
    }
    st.push(ch);
    inStack.add(ch);
  }
  return st.join("");
}
\`\`\``,
    },
    {
      id: 456,
      lcSlug: "132-pattern",
      title: "132 Pattern",
      diff: "Medium",
      body: `Scan from the right with min suffix; a middle peak in a stack pattern detects 132 sequence.

[132 Pattern](https://leetcode.com/problems/132-pattern/)

\`\`\`js
// Scan right to left — stack holds decreasing "3" candidates
function find132pattern(nums) {
  const st = [];
  let third = -Infinity; // best middle (2) seen
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < third) return true; // 1 < 2 < 3 pattern
    while (st.length && nums[i] > st[st.length - 1]) {
      third = st.pop(); // update middle
    }
    st.push(nums[i]);
  }
  return false;
}
\`\`\``,
    },
    {
      id: 907,
      lcSlug: "sum-of-subarray-minimums",
      title: "Sum of Subarray Minimums",
      diff: "Medium",
      body: `Sum of subarray minimums: use previous smaller and next smaller-or-equal bounds, multiply contribution.

[Sum of Subarray Minimums](https://leetcode.com/problems/sum-of-subarray-minimums/)

\`\`\`js
// Contribution: arr[i] * leftSpan * rightSpan
function sumSubarrayMins(arr) {
  const MOD = 1000000007, n = arr.length;
  const left = Array(n), right = Array(n);
  let st = [];
  for (let i = 0; i < n; i++) {
    while (st.length && arr[st[st.length - 1]] > arr[i]) st.pop(); // strict left
    left[i] = st.length ? i - st[st.length - 1] : i + 1;
    st.push(i);
  }
  st = [];
  for (let i = n - 1; i >= 0; i--) {
    while (st.length && arr[st[st.length - 1]] >= arr[i]) st.pop(); // non-strict right
    right[i] = st.length ? st[st.length - 1] - i : n - i;
    st.push(i);
  }
  let ans = 0;
  for (let i = 0; i < n; i++) ans = (ans + arr[i] * left[i] * right[i]) % MOD;
  return ans;
}
\`\`\``,
    },
    {
      id: 2104,
      lcSlug: "sum-of-subarray-ranges",
      title: "Sum of Subarray Ranges",
      diff: "Medium",
      body: `Sum of subarray ranges equals sum of subarray maximums minus sum of subarray minimums (two passes).

[Sum of Subarray Ranges](https://leetcode.com/problems/sum-of-subarray-ranges/)

\`\`\`js
// sum(max contributions) - sum(min contributions)
function subArrayRanges(nums) {
  const contrib = (isMax) => {
    const n = nums.length, left = Array(n), right = Array(n);
    let st = [];
    const better = (a, b) => isMax ? a > b : a < b;
    const betterEq = (a, b) => isMax ? a >= b : a <= b;
    for (let i = 0; i < n; i++) {
      while (st.length && better(nums[i], nums[st[st.length - 1]])) st.pop();
      left[i] = st.length ? i - st[st.length - 1] : i + 1;
      st.push(i);
    }
    st = [];
    for (let i = n - 1; i >= 0; i--) {
      while (st.length && betterEq(nums[i], nums[st[st.length - 1]])) st.pop();
      right[i] = st.length ? st[st.length - 1] - i : n - i;
      st.push(i);
    }
    let s = 0;
    for (let i = 0; i < n; i++) s += nums[i] * left[i] * right[i];
    return s;
  };
  return contrib(true) - contrib(false);
}
\`\`\``,
    },
      ],
    },
  ],
};

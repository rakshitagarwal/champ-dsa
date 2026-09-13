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
      id: 155,
      lcSlug: "min-stack",
      title: "Min Stack",
      diff: "Medium",
      body: `I keep a second stack of the min after each push. Pop both together. \`getMin\` is just the top of the min stack.

[Min Stack](https://leetcode.com/problems/min-stack/)

\`\`\`js
// Hinglish: stack push-pop — ek-ek step comment dekho
// Stack — parallel min stack
// LC: https://leetcode.com/problems/min-stack/
function MinStack() {
  // Hinglish: step 1 — base case check karo
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
      body: `Stack me number push, operator aaye to top 2 pop karke compute karke wapas push karo.

[Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)

\`\`\`js
// Hinglish: stack push-pop — ek-ek step comment dekho
// LC: https://leetcode.com/problems/evaluate-reverse-polish-notation/
function evalRPN(tokens) {
  // Hinglish: stack me numbers
  const st=[];
  for (const t of tokens) {
    if (["+","-","*","/"].includes(t)) {
      const b=st.pop(), a=st.pop(); // Hinglish: do nikal ke compute
      let v=0;
      if (t==='+') v=a+b; else if (t==='-') v=a-b; else if (t==='*') v=a*b; else v=Math.trunc(a/b); // Hinglish: divide truncate
      st.push(v);
    } else st.push(Number(t)); // Hinglish: number push
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
      id: 224,
      lcSlug: "basic-calculator",
      title: "Basic Calculator",
      diff: "Hard",
      body: `Brackets wala calculator — number jodo sign se, bracket khule to haalat stack me rakho.

[Basic Calculator](https://leetcode.com/problems/basic-calculator/)

\`\`\`js
// Hinglish: sign + stack — ek-ek step comment dekho
// LC: https://leetcode.com/problems/basic-calculator/
function calculate(s) {
  // Hinglish: step 1 — stack + sign lo
  const st = [];
  let ans = 0, num = 0, sign = 1;
  for (const ch of s) {
    if (ch >= "0" && ch <= "9") num = num * 10 + Number(ch); // Hinglish: number banao
    else if (ch === "+" || ch === "-") { ans += sign * num; num = 0; sign = ch === "+" ? 1 : -1; } // Hinglish: jodo
    else if (ch === "(") { st.push(ans); st.push(sign); ans = 0; sign = 1; } // Hinglish: haalat rakho
    else if (ch === ")") { ans += sign * num; num = 0; ans = st.pop() * ans + st.pop(); } // Hinglish: bahar lao
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
      body: `Brackets nahi, par *,/ pehle — stack me jod ke rakho, aakhir me sum karo.

[Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii/)

\`\`\`js
// Hinglish: *,/ pehle karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/basic-calculator-ii/
function calculate(s) {
  // Hinglish: step 1 — stack lo
  const st = [];
  let num = 0, op = "+";
  const apply = () => {
    if (op === "+") st.push(num); // Hinglish: jodne ke liye rakho
    else if (op === "-") st.push(-num);
    else if (op === "*") st.push(st.pop() * num); // Hinglish: turant compute
    else st.push(Math.trunc(st.pop() / num));
  };
  for (let i = 0; i <= s.length; i++) {
    const ch = s[i] || "+";
    if (ch >= "0" && ch <= "9") num = num * 10 + Number(ch);
    else if (ch === " " ) continue;
    else { apply(); op = ch; num = 0; } // Hinglish: operator badlo
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
      body: `Number stack me, string stack me — ] aaye to kholo, repeat karke jodo.

[Decode String](https://leetcode.com/problems/decode-string/)

\`\`\`js
// Hinglish: do stack kholo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/decode-string/
function decodeString(s) {
  // Hinglish: step 1 — stacks lo
  const counts = [], strs = [];
  let cur = "", num = 0;
  for (const ch of s) {
    if (ch >= "0" && ch <= "9") num = num * 10 + Number(ch); // Hinglish: ginti banao
    else if (ch === "[") { counts.push(num); strs.push(cur); num = 0; cur = ""; } // Hinglish: andar jao
    else if (ch === "]") {
      const rep = counts.pop(), prev = strs.pop();
      cur = prev + cur.repeat(rep); // Hinglish: repeat karke jodo
    }
    else cur += ch;
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
      body: `Pehle galat ) hatao (stack se match), bache open hatao — do pass me saaf.

[Minimum Remove to Make Valid Parentheses](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/)

\`\`\`js
// Hinglish: galat brackets hatao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/
function minRemoveToMakeValid(s) {
  // Hinglish: step 1 — array banao
  const a = [...s];
  const st = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "(") st.push(i); // Hinglish: open yaad rakho
    else if (a[i] === ")") {
      if (st.length) st.pop(); // Hinglish: jodi mil gayi
      else a[i] = ""; // Hinglish: akela band hatao
    }
  }
  for (const i of st) a[i] = ""; // Hinglish: bache open hatao
  return a.join("");
}
\`\`\``,
    },
    {
      id: 1047,
      lcSlug: "remove-all-adjacent-duplicates-in-string",
      title: "Remove All Adjacent Duplicates In String",
      diff: "Easy",
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
      id: 1544,
      lcSlug: "make-the-string-great",
      title: "Make The String Great",
      diff: "Easy",
      body: `Upar wala hi, par shart case-insensitive same letter hai — aA jodi ud jayegi.

[Make The String Great](https://leetcode.com/problems/make-the-string-great/)

\`\`\`js
// Hinglish: ulta case jodi udao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/make-the-string-great/
function makeGood(s) {
  // Hinglish: step 1 — stack lo
  const st = [];
  const bad = (a, b) => a !== b && a.toLowerCase() === b.toLowerCase(); // Hinglish: same letter ulta case
  for (const ch of s) {
    if (st.length && bad(st[st.length - 1], ch)) st.pop(); // Hinglish: jodi ud gayi
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
      body: `Monotonic decreasing stack se next warmer day ka wait nikalo. (Monotonic page se link)

[Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

\`\`\`js
// Hinglish: stack push-pop — ek-ek step comment dekho
// LC: https://leetcode.com/problems/daily-temperatures/
function dailyTemperatures(temps) {
  // Hinglish: decreasing stack
  const n=temps.length, ans=Array(n).fill(0), st=[];
  for (let i=0;i<n;i++) {
    while(st.length && temps[i] > temps[st.at(-1)]) {
      const j=st.pop(); ans[j]=i-j; // Hinglish: garam mila to wait pata chala
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
      body: `Map se next greater nikalo. Stack decreasing rakho, pop hote hi answer pata chalta hai.

[Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)

\`\`\`js
// Hinglish: stack se next greater — ek-ek step comment dekho
// LC: https://leetcode.com/problems/next-greater-element-i/
function nextGreaterElement(nums1, nums2) {
  // Hinglish: nums2 ka next greater map
  const mp=new Map(), st=[];
  for (const x of nums2) {
    while(st.length && x > st.at(-1)) { const y=st.pop(); mp.set(y, x); } // Hinglish: bada mila to pop ka answer
    st.push(x);
  }
  for (const y of st) mp.set(y, -1); // Hinglish: bacha to -1
  return nums1.map(x=> mp.get(x));
}
\`\`\``,
    },
    {
      id: 503,
      lcSlug: "next-greater-element-ii",
      title: "Next Greater Element II",
      diff: "Medium",
      body: `Circular array — do baar ghoomo (2n), monotonic decreasing stack rakho. Pehli baar answer bharo.

[Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/)

\`\`\`js
// Hinglish: do chakkar lagao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/next-greater-element-ii/
function nextGreaterElements(nums) {
  // Hinglish: step 1 — answer -1 se bharo
  const n = nums.length, ans = Array(n).fill(-1), st = [];
  for (let i = 0; i < 2 * n; i++) {
    const j = i % n; // Hinglish: gol ghoomo
    while (st.length && nums[j] > nums[st[st.length - 1]]) {
      ans[st.pop()] = nums[j]; // Hinglish: bada mil gaya
    }
    if (i < n) st.push(j); // Hinglish: pehle chakkar me daalo
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
// Hinglish: stack se next greater — ek-ek step comment dekho
// Monotonic stack — nearest smaller, then width * height
// LC: https://leetcode.com/problems/largest-rectangle-in-histogram/
function largestRectangleArea(heights) {
  // Hinglish: step 1 — base case check karo
  const stack = [-1];
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
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
      body: `Har row ko histogram banao (upar kitne 1), phir largest rectangle lagao. 2D ko 1D me todo.

[Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/)

\`\`\`js
// Hinglish: row ko histogram banao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/maximal-rectangle/
function maximalRectangle(matrix) {
  // Hinglish: step 1 — heights lo
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
        mx = Math.max(mx, height * (i - left)); // Hinglish: chauda * uncha
      }
      st.push(i);
    }
    return mx;
  };
  for (const row of matrix) {
    for (let c = 0; c < cols; c++) h[c] = row[c] === "1" ? h[c] + 1 : 0; // Hinglish: unchai badhao
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
      body: `Har din ka span = kitne consecutive peeche wale days price <= aaj. Stack me [price, span] rakho.

[Online Stock Span](https://leetcode.com/problems/online-stock-span/)

\`\`\`js
// Hinglish: stack se next greater — ek-ek step comment dekho
// LC: https://leetcode.com/problems/online-stock-span/
function StockSpanner() { this.st=[]; } // [price, span]
StockSpanner.prototype.next = function(price) {
  // Hinglish: chhote prices ko kha jao
  let span=1;
  while(this.st.length && this.st.at(-1)[0] <= price) { span += this.st.pop()[1]; } // Hinglish: combine span
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
      body: `Chhota number chahiye to bada digit hatao — monotonic increasing stack, k khatm hone tak.

[Remove K Digits](https://leetcode.com/problems/remove-k-digits/)

\`\`\`js
// Hinglish: bada hatao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/remove-k-digits/
function removeKdigits(num, k) {
  // Hinglish: step 1 — stack lo
  const st = [];
  for (const ch of num) {
    while (st.length && k > 0 && st[st.length - 1] > ch) {
      st.pop(); k--; // Hinglish: bada hatao
    }
    st.push(ch);
  }
  while (k > 0) { st.pop(); k--; } // Hinglish: bache peeche se hatao
  let ans = st.join("").replace(/^0+/, ""); // Hinglish: aage ke zero hatao
  return ans === "" ? "0" : ans;
}
\`\`\``,
    },
    {
      id: 316,
      lcSlug: "remove-duplicate-letters",
      title: "Remove Duplicate Letters",
      diff: "Medium",
      body: `Sabse chhota lexicographic result — stack me rakho, baad me phir milega to bada hatao.

[Remove Duplicate Letters](https://leetcode.com/problems/remove-duplicate-letters/)

\`\`\`js
// Hinglish: chhota rakho, bada hatao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/remove-duplicate-letters/
function removeDuplicateLetters(s) {
  // Hinglish: step 1 — last occurrence gin lo
  const last = new Map();
  for (let i = 0; i < s.length; i++) last.set(s[i], i);
  const st = [], inStack = new Set();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (inStack.has(ch)) continue; // Hinglish: ek hi baar
    while (st.length && ch < st[st.length - 1] && last.get(st[st.length - 1]) > i) {
      inStack.delete(st.pop()); // Hinglish: bada hatao, baad me milega
    }
    st.push(ch); inStack.add(ch);
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
      body: `Peeche se chalao, min prefix yaad rakho, stack me middle candidates rakho — 132 mila to true.

[132 Pattern](https://leetcode.com/problems/132-pattern/)

\`\`\`js
// Hinglish: peeche se dekho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/132-pattern/
function find132pattern(nums) {
  // Hinglish: step 1 — stack + third rakho
  const st = [];
  let third = -Infinity; // Hinglish: 2 wala candidate
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < third) return true; // Hinglish: 1 < 2 < 3 mila
    while (st.length && nums[i] > st[st.length - 1]) {
      third = st.pop(); // Hinglish: 2 update karo
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
      body: `Har element kitne subarrays ka minimum hai — pichhla chhota aur agla chhota-or-equal dhoondo, guna karo.

[Sum of Subarray Minimums](https://leetcode.com/problems/sum-of-subarray-minimums/)

\`\`\`js
// Hinglish: contribution gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/sum-of-subarray-minimums/
function sumSubarrayMins(arr) {
  // Hinglish: step 1 — seemayein nikalo
  const MOD = 1000000007, n = arr.length;
  const left = Array(n), right = Array(n);
  let st = [];
  for (let i = 0; i < n; i++) {
    while (st.length && arr[st[st.length - 1]] > arr[i]) st.pop(); // Hinglish: sakht bada hatao
    left[i] = st.length ? i - st[st.length - 1] : i + 1;
    st.push(i);
  }
  st = [];
  for (let i = n - 1; i >= 0; i--) {
    while (st.length && arr[st[st.length - 1]] >= arr[i]) st.pop(); // Hinglish: barabar bhi hatao
    right[i] = st.length ? st[st.length - 1] - i : n - i;
    st.push(i);
  }
  let ans = 0;
  for (let i = 0; i < n; i++) ans = (ans + arr[i] * left[i] * right[i]) % MOD; // Hinglish: left*right subarrays
  return ans;
}
\`\`\``,
    },
    {
      id: 2104,
      lcSlug: "sum-of-subarray-ranges",
      title: "Sum of Subarray Ranges",
      diff: "Medium",
      body: `Max wala sum minus min wala sum — upar wala pattern do baar chalao (max ke liye, min ke liye).

[Sum of Subarray Ranges](https://leetcode.com/problems/sum-of-subarray-ranges/)

\`\`\`js
// Hinglish: max minus min — ek-ek step comment dekho
// LC: https://leetcode.com/problems/sum-of-subarray-ranges/
function subArrayRanges(nums) {
  // Hinglish: step 1 — helper banao
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
  return contrib(true) - contrib(false); // Hinglish: max minus min
}
\`\`\``,
    },
      ],
    },
  ],
};

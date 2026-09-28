import type { SolutionGroup } from "../solutions/types";

export const STACK_SOLUTIONS: SolutionGroup = {
  id: "stack",
  title: "Stack",
  subs: [
    {
      title: "Foundation",
      topics: [
        {
          id: 20,
          lcSlug: "valid-parentheses",
          title: "Valid Parentheses",
          diff: "Easy",
          body: `Opening push karo, closing pe top se match karao. Aakhir me stack khaali hona chahiye.

[Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

\`\`\`js
// Time: O(n) · Space: O(n)
var isValid = function (s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];

  for (const c of s) {
    if (c === "(" || c === "[" || c === "{") {
      stack.push(c);
    } else {
      // khaali stack pe pop() undefined deta hai -> mismatch
      if (stack.pop() !== pairs[c]) return false;
    }
  }

  return stack.length === 0;
};
\`\`\``,
        },
        {
          id: 155,
          lcSlug: "min-stack",
          title: "Min Stack",
          diff: "Medium",
          body: `Har push ke saath "uss waqt tak ka min" bhi ek parallel stack me daal do. getMin O(1) ho jata hai.

[Min Stack](https://leetcode.com/problems/min-stack/)

\`\`\`js
// Time: O(1) har operation · Space: O(n)
var MinStack = function () {
  this.stack = [];
  this.mins = [];
};

MinStack.prototype.push = function (val) {
  this.stack.push(val);

  const prevMin = this.mins.length ? this.mins[this.mins.length - 1] : val;
  this.mins.push(Math.min(val, prevMin));
};

MinStack.prototype.pop = function () {
  this.stack.pop();
  this.mins.pop();
};

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.mins[this.mins.length - 1];
};
\`\`\``,
        },
        {
          id: 150,
          lcSlug: "evaluate-reverse-polish-notation",
          title: "Evaluate Reverse Polish Notation",
          diff: "Medium",
          body: `Number aaye to push, operator aaye to do pop karo. Order dhyan se — pehla pop hi doosra operand hai.

[Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)

\`\`\`js
// Time: O(n) · Space: O(n)
var evalRPN = function (tokens) {
  const ops = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => Math.trunc(a / b), // zero ki taraf truncate
  };

  const stack = [];

  for (const t of tokens) {
    if (t in ops) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(ops[t](a, b));
    } else {
      stack.push(Number(t));
    }
  }

  return stack[0];
};
\`\`\``,
        },
      ],
    },
    {
      title: "Medium",
      topics: [
        {
          id: 739,
          lcSlug: "daily-temperatures",
          title: "Daily Temperatures",
          diff: "Medium",
          body: `Monotonic decreasing stack of indexes. Jab garam din aaye, stack se saare thande din nikaalo — unka answer aaj hai.

[Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

\`\`\`js
// Time: O(n) · Space: O(n)
var dailyTemperatures = function (temperatures) {
  const res = new Array(temperatures.length).fill(0);
  const stack = []; // indexes, temperature ghatte hue

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length &&
      temperatures[stack[stack.length - 1]] < temperatures[i]
    ) {
      const prev = stack.pop();
      res[prev] = i - prev;
    }

    stack.push(i);
  }

  return res;
};
\`\`\``,
        },
        {
          id: 496,
          lcSlug: "next-greater-element-i",
          title: "Next Greater Element I",
          diff: "Easy",
          body: `nums2 pe ek baar monotonic stack chalao aur "next greater" ka map bana lo. Phir nums1 sirf lookup hai.

[Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)

\`\`\`js
// Time: O(n + m) · Space: O(n)
var nextGreaterElement = function (nums1, nums2) {
  const nextGreater = new Map();
  const stack = []; // values, ghatte hue

  for (const n of nums2) {
    while (stack.length && stack[stack.length - 1] < n) {
      nextGreater.set(stack.pop(), n);
    }
    stack.push(n);
  }

  // jo stack me bach gaye unka next greater hai hi nahi
  return nums1.map((n) => nextGreater.get(n) ?? -1);
};
\`\`\``,
        },
        {
          id: 853,
          lcSlug: "car-fleet",
          title: "Car Fleet",
          diff: "Medium",
          body: `Position ke ulte order me chalo (target ke paas wali pehle). Agar peeche wali car kam time leti hai to woh aage wali fleet me mil jayegi.

[Car Fleet](https://leetcode.com/problems/car-fleet/)

\`\`\`js
// Time: O(n log n) · Space: O(n)
var carFleet = function (target, position, speed) {
  const cars = position
    .map((p, i) => [p, speed[i]])
    .sort((a, b) => b[0] - a[0]); // target ke sabse paas wali pehle

  const stack = []; // har fleet ke leader ka arrival time

  for (const [p, s] of cars) {
    const time = (target - p) / s;

    // zyada time matlab yeh car aage wali ko pakad nahi paayegi -> nayi fleet
    if (!stack.length || time > stack[stack.length - 1]) stack.push(time);
  }

  return stack.length;
};
\`\`\``,
        },
      ],
    },
    {
      title: "Advanced",
      topics: [
        {
          id: 84,
          lcSlug: "largest-rectangle-in-histogram",
          title: "Largest Rectangle in Histogram",
          diff: "Hard",
          body: `Increasing stack rakho. Jab chhoti bar aaye, pop karo — popped bar ka rectangle yahin khatam hota hai aur left boundary naya top hai.

[Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

\`\`\`js
// Time: O(n) · Space: O(n)
var largestRectangleArea = function (heights) {
  const stack = []; // indexes, heights badhte hue
  let best = 0;

  // n pe ek sentinel height 0 — taaki stack poora flush ho jaye
  for (let i = 0; i <= heights.length; i++) {
    const cur = i === heights.length ? 0 : heights[i];

    while (stack.length && heights[stack[stack.length - 1]] >= cur) {
      const h = heights[stack.pop()];
      const left = stack.length ? stack[stack.length - 1] + 1 : 0;

      best = Math.max(best, h * (i - left));
    }

    stack.push(i);
  }

  return best;
};
\`\`\``,
        },
        {
          id: 224,
          lcSlug: "basic-calculator",
          title: "Basic Calculator",
          diff: "Hard",
          body: `'(' pe abhi tak ka result aur sign stack me park kar do, andar se fresh shuru karo. ')' pe wapas jodo.

[Basic Calculator](https://leetcode.com/problems/basic-calculator/)

\`\`\`js
// Time: O(n) · Space: O(n)
var calculate = function (s) {
  const stack = [];

  let result = 0;
  let sign = 1;
  let num = 0;

  for (const c of s) {
    if (c >= "0" && c <= "9") {
      num = num * 10 + (c.charCodeAt(0) - 48);
    } else if (c === "+") {
      result += sign * num;
      num = 0;
      sign = 1;
    } else if (c === "-") {
      result += sign * num;
      num = 0;
      sign = -1;
    } else if (c === "(") {
      stack.push(result, sign);
      result = 0;
      sign = 1;
    } else if (c === ")") {
      result += sign * num;
      num = 0;

      const prevSign = stack.pop();
      const prevResult = stack.pop();

      result = prevResult + prevSign * result;
      sign = 1;
    }
    // spaces ignore
  }

  return result + sign * num;
};
\`\`\``,
        },
      ],
    },
  ],
};

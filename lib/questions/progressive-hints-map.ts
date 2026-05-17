import type { ProgressiveHint } from "@/types/question";

export const progressiveHintsByQuestionId: Record<string, ProgressiveHint> = {
  "two-sum": {
    observation: "Can you avoid checking every pair with nested loops?",
    direction: "If the array were sorted, could two indices move toward each other?",
    pattern: "Try Two Pointers on sorted data (or use a hash map for unsorted).",
    pseudocode:
      "left=0, right=n-1; while left<right: if sum==target return; elif sum<target left++; else right--",
    solution:
      "Use two pointers on a sorted array, or a hash map storing seen values for O(n).",
  },
  "max-subarray-k": {
    observation: "Do you need to re-sum k elements every time the window moves?",
    direction: "Can you update the sum in O(1) when the window slides right?",
    pattern: "Use a fixed-size Sliding Window.",
    pseudocode: "Add nums[right]; if window>k subtract nums[left]; track max when size==k",
    solution: "Maintain sum of current window; slide by adding right and removing left.",
  },
  "longest-subarray-sum": {
    observation: "When the sum gets too large, what can you drop from the left?",
    direction: "Expand right, shrink left while invalid — variable window.",
    pattern: "Sliding Window with while-loop shrink.",
    pseudocode: "for right: add; while sum>target: subtract left++; update best length",
    solution: "Variable sliding window — expand right, shrink left until valid.",
  },
  fibonacci: {
    observation: "Each call splits into two smaller subproblems.",
    direction: "What are the base cases when n is 0 or 1?",
    pattern: "Recursion with clear base cases (memoization optional).",
    pseudocode: "if n<=1 return n; return fib(n-1)+fib(n-2)",
    solution: "Recursive definition with base n<=1; watch duplicate work without memo.",
  },
  factorial: {
    observation: "n! is defined in terms of (n-1)!.",
    direction: "Identify the base case and the recursive step.",
    pattern: "Linear Recursion.",
    pseudocode: "if n<=1 return 1; return n * fact(n-1)",
    solution: "Base n<=1 return 1; else return n * solve(n-1).",
  },
  kadane: {
    observation: "At each index, should you extend the current subarray or start fresh?",
    direction: "Track the best ending-here sum as you scan.",
    pattern: "Kadane / 1D DP for maximum subarray.",
    pseudocode: "curr=max(nums[i], curr+nums[i]); best=max(best, curr)",
    solution: "Kadane: curr = max(nums[i], curr+nums[i]); best = max(best, curr).",
  },
};

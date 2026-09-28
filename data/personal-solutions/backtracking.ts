import type { SolutionGroup } from "@/data/solutions/types";

export const BACKTRACKING_SOLUTIONS: SolutionGroup = {
  id: "backtracking",
  title: "Backtracking",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 78,
      lcSlug: "subsets",
      title: "Subsets",
      diff: "Medium",
      body: "Every prefix of the path is a subset. Recurse with `i + 1` so I do not reuse an index.\n\n[Subsets](https://leetcode.com/problems/subsets/)\n\n```js\n// Time: O(n·2ⁿ) · Space: O(n)\n// Hinglish: choose-explore-unchoose — ek-ek step comment dekho\n// Backtracking — subsets\nfunction subsets(nums) {\n  const ans = [];\n  const dfs = (start, path) => {\n    ans.push([...path]);\n    for (let i = start; i < nums.length; i++) {\n      path.push(nums[i]); // Hinglish: choice liya\n      dfs(i + 1, path);\n      path.pop(); // Hinglish: wapas hataya (backtrack)\n    }\n  };\n  dfs(0, []);\n  return ans;\n}\n```",
    },
    {
      id: 39,
      lcSlug: "combination-sum",
      title: "Combination Sum",
      diff: "Medium",
      body: "I may reuse the same coin, so I recurse on `i` not `i + 1`. Stop when remain is 0 (save) or negative.\n\n[Combination Sum (DP)](https://leetcode.com/problems/combination-sum/)\n\n```js\n// Time: O(n·2ⁿ) · Space: O(target)\n/**\n * @param {number[]} candidates\n * @param {number} target\n * @return {number[][]}\n */\nvar combinationSum = function(candidates, target) {\n\n    candidates.sort((a,b) => a-b);\n    let dp = [[[]]];\n\n    for(let sum = 0; sum <= target; sum++){\n        dp[sum] = [];\n        let combine = [];\n\n        for(let i = 0; i < candidates.length && candidates[i] <= sum; i++){\n            if(sum === candidates[i]){\n                combine.push([candidates[i]]);\n            } else {\n                for(let prev of dp[sum-candidates[i]]){\n                    if(candidates[i] >= prev[prev.length-1]){\n                        combine.push([...prev, candidates[i]]);\n                    }\n                }\n            }\n        }\n        dp[sum] = combine;\n    }\n\n    return dp[target];\n};\n```",
    },
    {
      id: 46,
      lcSlug: "permutations",
      title: "Permutations",
      diff: "Medium",
      body: "`used[i]` so I do not pick the same index twice. Path length === n → save.\n\n[Permutations](https://leetcode.com/problems/permutations/)\n\n```js\n// Time: O(n·n!) · Space: O(n)\n/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar permute = function(nums, arr = [], res = []) {\n    \n    //base case\n    if(nums.length === 0) res.push([...arr]);\n    \n    for(let i = 0; i < nums.length; i++){\n        let rest = nums.filter((n, index) => index !== i);\n        arr.push(nums[i]);\n        permute(rest, arr, res);\n        arr.pop();\n    }\n    \n    return res;\n    \n};\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 17,
      lcSlug: "letter-combinations-of-a-phone-number",
      title: "Letter Combinations of a Phone Number",
      diff: "Medium",
      body: "Phone digits se saare letter combos. Har digit ke letters pe loop.\n\n[Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)\n\n```js\n// Time: O(4ⁿ·n) · Space: O(n)\n/**\n * @param {string} digits\n * @return {string[]}\n */\nvar letterCombinations = function(digits, start = 0) {\n    \n    const map = {\n        '2': ['a','b','c'],\n        '3': ['d','e','f'],\n        '4': ['g','h','i'],\n        '5': ['j','k','l'],\n        '6': ['m','n','o'],\n        '7': ['p','q','r', 's'],\n        '8': ['t','u','v'],\n        '9': ['w','x','y','z'],\n    };\n    \n    if(digits === \"\") return [];\n    if(start >= digits.length) return [''];\n    \n    const digit = digits[start];\n    const letters = map[digit];\n    const combinations = [];\n    \n    const suffixCombinations = letterCombinations(digits, start + 1);\n    \n    for(const letter of letters){\n        for(const suffix of suffixCombinations){\n            combinations.push(letter + suffix);\n        }\n    }\n    \n    return combinations;\n    \n};\n```",
    },
    {
      id: 22,
      lcSlug: "generate-parentheses",
      title: "Generate Parentheses",
      diff: "Medium",
      body: "Backtracking — open < n pe '(', close < open pe ')'.\n\n[Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)\n\n```js\n// Time: O(4^n / √n) · Space: O(n)\nvar generateParenthesis = function(n) {\n  const res = [];\n  const dfs = (path, open, close) => {\n    if (path.length === 2 * n) {\n      res.push(path);\n      return;\n    }\n    if (open < n) dfs(path + \"(\", open + 1, close);\n    if (close < open) dfs(path + \")\", open, close + 1);\n  };\n  dfs(\"\", 0, 0);\n  return res;\n};\n```",
    },
    {
      id: 131,
      lcSlug: "palindrome-partitioning",
      title: "Palindrome Partitioning",
      diff: "Medium",
      body: "Backtracking + palindrome check — har cut pe partition try.\n\n[Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)\n\n```js\n// Time: O(n · 2^n) · Space: O(n)\nvar partition = function(s) {\n  const res = [];\n  const isPal = (l, r) => {\n    while (l < r) if (s[l++] !== s[r--]) return false;\n    return true;\n  };\n  const dfs = (start, path) => {\n    if (start === s.length) {\n      res.push([...path]);\n      return;\n    }\n    for (let end = start; end < s.length; end++) {\n      if (!isPal(start, end)) continue;\n      path.push(s.slice(start, end + 1));\n      dfs(end + 1, path);\n      path.pop();\n    }\n  };\n  dfs(0, []);\n  return res;\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 51,
      lcSlug: "n-queens",
      title: "N-Queens",
      diff: "Hard",
      body: "One queen per row. `cols`, `diag`, `anti` sets. Place, recurse next row, remove.\n\n[N-Queens](https://leetcode.com/problems/n-queens/)\n\n```js\n// Time: O(n!) · Space: O(n)\nvar solveNQueens = function(n) {\n    \n    if(n.length === 1) return [[\"Q\"]];\n    \n    let col = new Set();\n    let posDiag = new Set();\n    let negDiag = new Set();\n    \n    let res = [];\n    let board = Array.from(Array(n), () => new Array(n).fill(\".\"));\n    \n    //helper functions\n    const isValid = (r, c) => !(col.has(c) || posDiag.has(r+c) || negDiag.has(r-c));\n    \n    const addQueen = (r, c) => {\n        col.add(c);\n        posDiag.add(r+c);\n        negDiag.add(r-c);\n        board[r][c] = \"Q\";\n    }\n    \n    const removeQueen = (r, c) => {\n        col.delete(c);\n        posDiag.delete(r+c);\n        negDiag.delete(r-c);\n        board[r][c] = \".\";\n    }\n    \n    //recursive backtracking function\n    function recurse(row){\n        \n        //base case\n        if(row === n){\n            res.push([...board].map((row) => row.join(\"\")));\n        }\n        \n        //recurrence relation\n        for(let col = 0; col < n; col++){\n            if(isValid(row, col)){\n                addQueen(row, col);\n                //recurse\n                recurse(row+1);\n                //backtrack\n                removeQueen(row, col);\n            }\n        }\n        \n    }\n    \n    recurse(0);\n    return res;\n    \n};\n```",
    },
      ],
    },
  ],
};

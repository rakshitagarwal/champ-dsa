import type { SolutionGroup } from "./types";

export const BACKTRACKING_SOLUTIONS: SolutionGroup = {
  id: "backtracking",
  title: "Backtracking",
  subs: [
    {
      title: "Permutations / Combinations",
      topics: [
    {
      id: 78,
      lcSlug: "subsets",
      title: "Subsets",
      diff: "Medium",
      body: `Every prefix of the path is a subset. Recurse with \`i + 1\` so I do not reuse an index.

[Subsets](https://leetcode.com/problems/subsets/)

\`\`\`js
// Backtracking: every prefix of path is a valid subset
// LC: https://leetcode.com/problems/subsets/
function subsets(nums) {
  const ans = [];
  const dfs = (start, path) => {
    ans.push([...path]); // snapshot current subset before branching
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]); // include nums[i] in the subset
      dfs(i + 1, path); // only pick indices after i (no reuse)
      path.pop(); // undo choice for next sibling branch
    }
  };
  dfs(0, []);
  return ans;
}
\`\`\``,
    },
    {
      id: 90,
      lcSlug: "subsets-ii",
      title: "Subsets II",
      diff: "Medium",
      body: `Subsets with duplicates: sort and skip \`i > start && nums[i] === nums[i-1]\` to avoid duplicate subsets.

[Subsets II](https://leetcode.com/problems/subsets-ii/)

\`\`\`js
// Sort + skip equal values at same depth to avoid duplicate subsets
// LC: https://leetcode.com/problems/subsets-ii/
function subsetsWithDup(nums) {
  nums.sort((a,b)=>a-b); // duplicates become adjacent
  const ans=[];
  const dfs=(start, path)=>{
    ans.push([...path]);
    for(let i=start;i<nums.length;i++){
      if(i>start && nums[i]===nums[i-1]) continue; // same value already tried at this level
      path.push(nums[i]);
      dfs(i+1, path);
      path.pop();
    }
  };
  dfs(0, []);
  return ans;
}
\`\`\``,
    },
    {
      id: 46,
      lcSlug: "permutations",
      title: "Permutations",
      diff: "Medium",
      body: `\`used[i]\` so I do not pick the same index twice. Path length === n → save.

[Permutations](https://leetcode.com/problems/permutations/)

\`\`\`js
// used[i] tracks which indices are already in the current permutation
// LC: https://leetcode.com/problems/permutations/
function permute(nums) {
  const ans = [], used = Array(nums.length).fill(false);
  const dfs = (path) => {
    if (path.length === nums.length) {
      ans.push([...path]); // full permutation built
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // each index at most once
      used[i] = true;
      path.push(nums[i]);
      dfs(path);
      path.pop();
      used[i] = false; // free index for other positions
    }
  };
  dfs([]);
  return ans;
}
\`\`\``,
    },
    {
      id: 47,
      lcSlug: "permutations-ii",
      title: "Permutations II",
      diff: "Medium",
      body: `Sort and skip duplicates at the same recursion depth when the same value was not used.

[Permutations II](https://leetcode.com/problems/permutations-ii/)

\`\`\`js
// Skip duplicate value if previous equal slot was not used in this branch
// LC: https://leetcode.com/problems/permutations-ii/
function permuteUnique(nums) {
  nums.sort((a, b) => a - b);
  const out = [], used = Array(nums.length).fill(false);
  const dfs = (path) => {
    if (path.length === nums.length) { out.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue; // avoid duplicate permutations
      used[i] = true; path.push(nums[i]);
      dfs(path);
      path.pop(); used[i] = false;
    }
  };
  dfs([]);
  return out;
}
\`\`\``,
    },
    {
      id: 39,
      lcSlug: "combination-sum",
      title: "Combination Sum",
      diff: "Medium",
      body: `I may reuse the same coin, so I recurse on \`i\` not \`i + 1\`. Stop when remain is 0 (save) or negative.

[Combination Sum](https://leetcode.com/problems/combination-sum/)

\`\`\`js
// Recurse on i (not i+1) because the same coin may be reused
// LC: https://leetcode.com/problems/combination-sum/
function combinationSum(candidates, target) {
  const ans = [];
  const dfs = (start, remain, path) => {
    if (remain === 0) {
      ans.push([...path]); // exact target hit
      return;
    }
    if (remain < 0) return; // overshoot, prune
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(i, remain - candidates[i], path); // stay at i to allow reuse
      path.pop();
    }
  };
  dfs(0, target, []);
  return ans;
}
\`\`\``,
    },
    {
      id: 40,
      lcSlug: "combination-sum-ii",
      title: "Combination Sum II",
      diff: "Medium",
      body: `Each coin once: sort and skip identical coins at the same depth to avoid duplicate combinations.

[Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)

\`\`\`js
// Each number once; sort + skip dupes like subsets II
// LC: https://leetcode.com/problems/combination-sum-ii/
function combinationSum2(candidates, target) {
  candidates.sort((a,b)=>a-b);
  const ans=[];
  const dfs=(start, remain, path)=>{
    if(remain===0){ ans.push([...path]); return; }
    if(remain<0) return;
    for(let i=start;i<candidates.length;i++){
      if(i>start && candidates[i]===candidates[i-1]) continue;
      path.push(candidates[i]);
      dfs(i+1, remain-candidates[i], path); // i+1: each coin used at most once
      path.pop();
    }
  };
  dfs(0, target, []);
  return ans;
}
\`\`\``,
    },
    {
      id: 77,
      lcSlug: "combinations",
      title: "Combinations",
      diff: "Medium",
      body: `Only move the start index forward (no reuse); when the combination has size \`k\`, record it.

[Combinations](https://leetcode.com/problems/combinations/)

\`\`\`js
// Choose k numbers from 1..n in increasing order only
// LC: https://leetcode.com/problems/combinations/
function combine(n, k) {
  const out = [];
  const dfs = (start, path) => {
    if (path.length === k) { out.push([...path]); return; }
    for (let i = start; i <= n; i++) {
      path.push(i);
      dfs(i + 1, path); // only pick larger numbers next
      path.pop();
    }
  };
  dfs(1, []);
  return out;
}
\`\`\``,
    },
    {
      id: 216,
      lcSlug: "combination-sum-iii",
      title: "Combination Sum III",
      diff: "Medium",
      body: `Combine \`k\` numbers from 1–9 to sum \`n\`; increase start index to avoid reuse and duplicates.

[Combination Sum III](https://leetcode.com/problems/combination-sum-iii/)

\`\`\`js
// k distinct digits 1-9 must sum to n
// LC: https://leetcode.com/problems/combination-sum-iii/
function combinationSum3(k, n) {
  const out = [];
  const dfs = (start, path, sum) => {
    if (path.length === k) {
      if (sum === n) out.push([...path]);
      return;
    }
    for (let i = start; i <= 9; i++) {
      if (sum + i > n) break; // sorted digits: further i only increase sum
      path.push(i);
      dfs(i + 1, path, sum + i);
      path.pop();
    }
  };
  dfs(1, [], 0);
  return out;
}
\`\`\``,
    },
    {
      id: 22,
      lcSlug: "generate-parentheses",
      title: "Generate Parentheses",
      diff: "Medium",
      body: `I can add \`(\` if I still have some. I can add \`)\` if closes < opens. When the string length is \`2n\`, save.

[Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)

\`\`\`js
// Add '(' if budget left; add ')' only if it would close an unmatched '('
// LC: https://leetcode.com/problems/generate-parentheses/
function generateParenthesis(n) {
  const ans = [];
  const dfs = (s, open, close) => {
    if (s.length === 2 * n) {
      ans.push(s); // balanced string of length 2n
      return;
    }
    if (open < n) dfs(s + "(", open + 1, close); // open another pair
    if (close < open) dfs(s + ")", open, close + 1); // close only when valid
  };
  dfs("", 0, 0);
  return ans;
}
\`\`\``,
    },
    {
      id: 17,
      lcSlug: "letter-combinations-of-a-phone-number",
      title: "Letter Combinations of a Phone Number",
      diff: "Medium",
      body: `Map each digit to letters and backtrack through all letter combinations.

[Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

\`\`\`js
// DFS over digit index; try every letter mapped to that digit
// LC: https://leetcode.com/problems/letter-combinations-of-a-phone-number/
function letterCombinations(digits) {
  if(!digits) return [];
  const mp={2:"abc",3:"def",4:"ghi",5:"jkl",6:"mno",7:"pqrs",8:"tuv",9:"wxyz"};
  const ans=[];
  const dfs=(i, path)=>{
    if(i===digits.length){ ans.push(path); return; }
    for(const ch of mp[digits[i]]){
      dfs(i+1, path+ch); // append letter and move to next digit
    }
  };
  dfs(0, "");
  return ans;
}
\`\`\``,
    },
      ],
    },
    {
      title: "Constraint Search",
      topics: [
    {
      id: 79,
      lcSlug: "word-search",
      title: "Word Search",
      diff: "Medium",
      body: `DFS from every cell. Mark the cell, try 4 directions, unmark. If I consume the whole word, true.

[Word Search](https://leetcode.com/problems/word-search/)

\`\`\`js
// Grid DFS with in-place visited mark (#), restore on backtrack
// LC: https://leetcode.com/problems/word-search/
function exist(board, word) {
  const rows = board.length, cols = board[0].length;
  const dfs = (r, c, i) => {
    if (i === word.length) return true; // matched full word
    if (r < 0 || c < 0 || r >= rows || c >= cols) return false;
    if (board[r][c] !== word[i]) return false;
    const ch = board[r][c];
    board[r][c] = "#"; // mark cell used on this path
    const ok =
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1);
    board[r][c] = ch; // unmark for other paths
    return ok;
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true; // try every start cell
    }
  }
  return false;
}
\`\`\``,
    },
    {
      id: 51,
      lcSlug: "n-queens",
      title: "N-Queens",
      diff: "Hard",
      body: `One queen per row. \`cols\`, \`diag\`, \`anti\` sets. Place, recurse next row, remove.

[N-Queens](https://leetcode.com/problems/n-queens/)

\`\`\`js
// One queen per row; track column and both diagonal directions
// LC: https://leetcode.com/problems/n-queens/
function solveNQueens(n) {
  const ans = [], board = Array.from({ length: n }, () => Array(n).fill("."));
  const cols = new Set(), diag = new Set(), anti = new Set();
  const dfs = (r) => {
    if (r === n) {
      ans.push(board.map((row) => row.join("")));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(r - c) || anti.has(r + c)) continue; // attack line
      cols.add(c); diag.add(r - c); anti.add(r + c);
      board[r][c] = "Q";
      dfs(r + 1);
      board[r][c] = ".";
      cols.delete(c); diag.delete(r - c); anti.delete(r + c);
    }
  };
  dfs(0);
  return ans;
}
\`\`\``,
    },
    {
      id: 52,
      lcSlug: "n-queens-ii",
      title: "N-Queens II",
      diff: "Hard",
      body: `Count only: track column and diagonal conflicts with sets, no full board storage.

[N-Queens II](https://leetcode.com/problems/n-queens-ii/)

\`\`\`js
// Same placement rules as N-Queens but count only, no board build
// LC: https://leetcode.com/problems/n-queens-ii/
function totalNQueens(n) {
  let ans = 0;
  const cols = new Set(), d1 = new Set(), d2 = new Set();
  const dfs = (r) => {
    if (r === n) { ans++; return; } // placed queens on all rows
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || d1.has(r - c) || d2.has(r + c)) continue;
      cols.add(c); d1.add(r - c); d2.add(r + c);
      dfs(r + 1);
      cols.delete(c); d1.delete(r - c); d2.delete(r + c);
    }
  };
  dfs(0);
  return ans;
}
\`\`\``,
    },
    {
      id: 37,
      lcSlug: "sudoku-solver",
      title: "Sudoku Solver",
      diff: "Hard",
      body: `Find empty cell, try 1–9 valid in row/col/box, recurse forward, backtrack on failure.

[Sudoku Solver](https://leetcode.com/problems/sudoku-solver/)

\`\`\`js
// Fill empty cells in row-major order; backtrack on conflict
// LC: https://leetcode.com/problems/sudoku-solver/
function solveSudoku(board) {
  const ok = (r, c, v) => {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === v || board[i][c] === v) return false;
      const br = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const bc = 3 * Math.floor(c / 3) + (i % 3);
      if (board[br][bc] === v) return false; // 3x3 box conflict
    }
    return true;
  };
  const dfs = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== ".") continue; // next empty cell
        for (let v = 1; v <= 9; v++) {
          const ch = String(v);
          if (ok(r, c, ch)) {
            board[r][c] = ch;
            if (dfs()) return true; // propagate if rest solvable
            board[r][c] = "."; // undo digit
          }
        }
        return false; // no digit works here
      }
    }
    return true; // no empty cells left
  };
  dfs();
}
\`\`\``,
    },
    {
      id: 131,
      lcSlug: "palindrome-partitioning",
      title: "Palindrome Partitioning",
      diff: "Medium",
      body: `Partition so every piece is a palindrome: try each cut position and backtrack.

[Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)

\`\`\`js
// Try every palindrome prefix; recurse on the suffix
// LC: https://leetcode.com/problems/palindrome-partitioning/
function partition(s) {
  const isPal=(l,r)=>{ while(l<r){ if(s[l++]!==s[r--]) return false; } return true; };
  const ans=[];
  const dfs=(start, path)=>{
    if(start===s.length){ ans.push([...path]); return; }
    for(let end=start; end<s.length; end++){
      if(!isPal(start,end)) continue; // cut [start..end] must be palindrome
      path.push(s.slice(start,end+1));
      dfs(end+1, path); // partition remainder
      path.pop();
    }
  };
  dfs(0, []);
  return ans;
}
\`\`\``,
    },
    {
      id: 93,
      lcSlug: "restore-ip-addresses",
      title: "Restore IP Addresses",
      diff: "Medium",
      body: `Place three dots to split into four parts; each part is 0–255 with no leading zeros.

[Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/)

\`\`\`js
// Build exactly 4 segments; each 1-3 digits, 0-255, no leading zeros
// LC: https://leetcode.com/problems/restore-ip-addresses/
function restoreIpAddresses(s) {
  const out = [];
  const dfs = (i, parts) => {
    if (parts.length === 4) {
      if (i === s.length) out.push(parts.join(".")); // consumed full string
      return;
    }
    for (let len = 1; len <= 3 && i + len <= s.length; len++) {
      const seg = s.slice(i, i + len);
      if (seg.length > 1 && seg[0] === "0") break; // longer segments would lead with 0
      if (Number(seg) > 255) break;
      parts.push(seg);
      dfs(i + len, parts);
      parts.pop();
    }
  };
  dfs(0, []);
  return out;
}
\`\`\``,
    },
    {
      id: 698,
      lcSlug: "partition-to-k-equal-sum-subsets",
      title: "Partition to K Equal Sum Subsets",
      diff: "Medium",
      body: `Fill buckets to target: try larger numbers first; skip placing the same value in an empty bucket.

[Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/)

\`\`\`js
// Fill k buckets of sum target; sort desc + prune empty bucket retries
// LC: https://leetcode.com/problems/partition-to-k-equal-sum-subsets/
function canPartitionKSubsets(nums, k) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % k !== 0) return false;
  const target = total / k;
  nums.sort((a, b) => b - a); // try large numbers first to prune
  if (nums[0] > target) return false;
  const used = Array(nums.length).fill(false);
  const dfs = (start, kLeft, cur) => {
    if (kLeft === 1) return true; // last bucket sum is forced if others work
    if (cur === target) return dfs(0, kLeft - 1, 0); // start next bucket
    for (let i = start; i < nums.length; i++) {
      if (used[i] || cur + nums[i] > target) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
      used[i] = true;
      if (dfs(i + 1, kLeft, cur + nums[i])) return true;
      used[i] = false;
      if (cur === 0) break; // same empty bucket state already failed
    }
    return false;
  };
  return dfs(0, k, 0);
}
\`\`\``,
    },
    {
      id: 473,
      lcSlug: "matchsticks-to-square",
      title: "Matchsticks to Square",
      diff: "Medium",
      body: `Same backtracking as 4-sum buckets: each side must reach the same target sum.

[Matchsticks to Square](https://leetcode.com/problems/matchsticks-to-square/)

\`\`\`js
// k=4 bucket fill; same pruning as partition-to-k-subsets
// LC: https://leetcode.com/problems/matchsticks-to-square/
function makesquare(matchsticks) {
  const total = matchsticks.reduce((a, b) => a + b, 0);
  if (total % 4 !== 0) return false;
  const side = total / 4;
  matchsticks.sort((a, b) => b - a);
  const sides = [0, 0, 0, 0];
  const dfs = (i) => {
    if (i === matchsticks.length) {
      return sides[0] === side && sides[1] === side && sides[2] === side && sides[3] === side;
    }
    for (let s = 0; s < 4; s++) {
      if (sides[s] + matchsticks[i] > side) continue;
      sides[s] += matchsticks[i];
      if (dfs(i + 1)) return true;
      sides[s] -= matchsticks[i];
      if (sides[s] === 0) break; // skip symmetric empty-side retries
    }
    return false;
  };
  return dfs(0);
}
\`\`\``,
    },
    {
      id: 526,
      lcSlug: "beautiful-arrangement",
      title: "Beautiful Arrangement",
      diff: "Medium",
      body: `Place \`j\` at position \`i\` if divisible; count valid arrangements and backtrack.

[Beautiful Arrangement](https://leetcode.com/problems/beautiful-arrangement/)

\`\`\`js
// Place number j at position pos if j|pos or pos|j
// LC: https://leetcode.com/problems/beautiful-arrangement/
function countArrangement(n) {
  let ans = 0;
  const used = Array(n + 1).fill(false);
  const dfs = (pos) => {
    if (pos > n) { ans++; return; } // valid arrangement of length n
    for (let j = 1; j <= n; j++) {
      if (!used[j] && (j % pos === 0 || pos % j === 0)) {
        used[j] = true;
        dfs(pos + 1);
        used[j] = false;
      }
    }
  };
  dfs(1);
  return ans;
}
\`\`\``,
    },
      ],
    },
  ],
};

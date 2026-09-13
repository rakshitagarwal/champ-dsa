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
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// Backtracking — subsets
// LC: https://leetcode.com/problems/subsets/
function subsets(nums) {
  const ans = [];
  const dfs = (start, path) => {
    ans.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]); // Hinglish: choice liya
      dfs(i + 1, path);
      path.pop(); // Hinglish: wapas hataya (backtrack)
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
      body: `Duplicate numbers ke saath subsets, duplicate subsets avoid karo. Sort karke \`i>start && nums[i]==nums[i-1]\` skip karo.

[Subsets II](https://leetcode.com/problems/subsets-ii/)

\`\`\`js
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// LC: https://leetcode.com/problems/subsets-ii/
function subsetsWithDup(nums) {
  // Hinglish: sort karke duplicate pakdo
  nums.sort((a,b)=>a-b);
  const ans=[];
  const dfs=(start, path)=>{
    ans.push([...path]); // Hinglish: har path save
    for(let i=start;i<nums.length;i++){
      if(i>start && nums[i]===nums[i-1]) continue; // Hinglish: duplicate skip
      path.push(nums[i]); // Hinglish: choice liya
      dfs(i+1, path);
      path.pop(); // Hinglish: wapas hataya (backtrack)
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
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// Backtracking — permutations
// LC: https://leetcode.com/problems/permutations/
function permute(nums) {
  const ans = [], used = Array(nums.length).fill(false);
  const dfs = (path) => {
    if (path.length === nums.length) {
      ans.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]); // Hinglish: choice liya
      dfs(path);
      path.pop(); // Hinglish: wapas hataya (backtrack)
      used[i] = false;
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
      body: `Sort karke duplicate skip karo — same number pichhle jaisa aur use nahi hua to chhodo.

[Permutations II](https://leetcode.com/problems/permutations-ii/)

\`\`\`js
// Hinglish: sort + skip duplicate — ek-ek step comment dekho
// LC: https://leetcode.com/problems/permutations-ii/
function permuteUnique(nums) {
  // Hinglish: step 1 — sort karo
  nums.sort((a, b) => a - b);
  const out = [], used = Array(nums.length).fill(false);
  const dfs = (path) => {
    if (path.length === nums.length) { out.push([...path]); return; } // Hinglish: poora bana
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue; // Hinglish: duplicate skip
      used[i] = true; path.push(nums[i]);
      dfs(path);
      path.pop(); used[i] = false; // Hinglish: wapas lao
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
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// Backtracking — reuse allowed
// LC: https://leetcode.com/problems/combination-sum/
function combinationSum(candidates, target) {
  const ans = [];
  const dfs = (start, remain, path) => {
    if (remain === 0) {
      ans.push([...path]);
      return;
    }
    if (remain < 0) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]); // Hinglish: choice liya
      dfs(i, remain - candidates[i], path);
      path.pop(); // Hinglish: wapas hataya (backtrack)
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
      body: `Har coin ek baar, duplicate combos nahi. Sort + skip \`i>start && same\`.

[Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)

\`\`\`js
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// LC: https://leetcode.com/problems/combination-sum-ii/
function combinationSum2(candidates, target) {
  // Hinglish: sort
  candidates.sort((a,b)=>a-b);
  const ans=[];
  const dfs=(start, remain, path)=>{
    if(remain===0){ ans.push([...path]); return; } // Hinglish: mil gaya
    if(remain<0) return; // Hinglish: overshoot
    for(let i=start;i<candidates.length;i++){
      if(i>start && candidates[i]===candidates[i-1]) continue; // Hinglish: duplicate skip
      path.push(candidates[i]); // Hinglish: choice liya
      dfs(i+1, remain-candidates[i], path);
      path.pop(); // Hinglish: backtrack
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
      body: `Start index se aage badho — wapas peeche mat jao, size k hote hi pakdo.

[Combinations](https://leetcode.com/problems/combinations/)

\`\`\`js
// Hinglish: aage badho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/combinations/
function combine(n, k) {
  // Hinglish: step 1 — khaali path lo
  const out = [];
  const dfs = (start, path) => {
    if (path.length === k) { out.push([...path]); return; } // Hinglish: poora bana
    for (let i = start; i <= n; i++) {
      path.push(i);
      dfs(i + 1, path); // Hinglish: aage badho
      path.pop(); // Hinglish: wapas lao
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
      body: `1-9 se k numbers jod ke n banao — start index badhao taaki repeat na ho.

[Combination Sum III](https://leetcode.com/problems/combination-sum-iii/)

\`\`\`js
// Hinglish: 1-9 se chuno — ek-ek step comment dekho
// LC: https://leetcode.com/problems/combination-sum-iii/
function combinationSum3(k, n) {
  // Hinglish: step 1 — khaali path lo
  const out = [];
  const dfs = (start, path, sum) => {
    if (path.length === k) {
      if (sum === n) out.push([...path]); // Hinglish: mil gaya
      return;
    }
    for (let i = start; i <= 9; i++) {
      if (sum + i > n) break;
      path.push(i);
      dfs(i + 1, path, sum + i); // Hinglish: aage badho
      path.pop(); // Hinglish: wapas lao
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
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// Backtracking — count open/close
// LC: https://leetcode.com/problems/generate-parentheses/
function generateParenthesis(n) {
  // Hinglish: step 1 — base case check karo
  const ans = [];
  const dfs = (s, open, close) => {
    if (s.length === 2 * n) {
      ans.push(s);
      return;
    }
    if (open < n) dfs(s + "(", open + 1, close);
    if (close < open) dfs(s + ")", open, close + 1);
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
      body: `Phone digits se saare letter combos. Har digit ke letters pe loop.

[Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

\`\`\`js
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// LC: https://leetcode.com/problems/letter-combinations-of-a-phone-number/
function letterCombinations(digits) {
  // Hinglish: empty to []
  if(!digits) return [];
  const mp={2:"abc",3:"def",4:"ghi",5:"jkl",6:"mno",7:"pqrs",8:"tuv",9:"wxyz"};
  const ans=[];
  const dfs=(i, path)=>{
    if(i===digits.length){ ans.push(path); return; } // Hinglish: pura ban gaya
    for(const ch of mp[digits[i]]){
      dfs(i+1, path+ch); // Hinglish: har letter try
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
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// Backtracking — grid DFS
// LC: https://leetcode.com/problems/word-search/
function exist(board, word) {
  // Hinglish: step 1 — base case check karo
  const rows = board.length, cols = board[0].length;
  const dfs = (r, c, i) => {
    if (i === word.length) return true;
    if (r < 0 || c < 0 || r >= rows || c >= cols) return false;
    if (board[r][c] !== word[i]) return false;
    const ch = board[r][c];
    board[r][c] = "#";
    const ok =
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1);
    board[r][c] = ch;
    return ok;
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
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
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// Backtracking — place per row
// LC: https://leetcode.com/problems/n-queens/
function solveNQueens(n) {
  // Hinglish: step 1 — base case check karo
  const ans = [], board = Array.from({ length: n }, () => Array(n).fill("."));
  const cols = new Set(), diag = new Set(), anti = new Set();
  const dfs = (r) => {
    if (r === n) {
      ans.push(board.map((row) => row.join("")));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(r - c) || anti.has(r + c)) continue;
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
      body: `Sirf ginti chahiye — board mat banao, columns/diagonals sets rakho, count badhao.

[N-Queens II](https://leetcode.com/problems/n-queens-ii/)

\`\`\`js
// Hinglish: gine bina board — ek-ek step comment dekho
// LC: https://leetcode.com/problems/n-queens-ii/
function totalNQueens(n) {
  // Hinglish: step 1 — sets lo
  let ans = 0;
  const cols = new Set(), d1 = new Set(), d2 = new Set();
  const dfs = (r) => {
    if (r === n) { ans++; return; } // Hinglish: poori bhar gayi
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || d1.has(r - c) || d2.has(r + c)) continue; // Hinglish: hamla ho raha
      cols.add(c); d1.add(r - c); d2.add(r + c);
      dfs(r + 1);
      cols.delete(c); d1.delete(r - c); d2.delete(r + c); // Hinglish: wapas lao
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
      body: `Khaali cell dhoondo, 1-9 try karo — row/col/box me valid ho to aage badho, nahi to wapas.

[Sudoku Solver](https://leetcode.com/problems/sudoku-solver/)

\`\`\`js
// Hinglish: try karo wapas aao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/sudoku-solver/
function solveSudoku(board) {
  // Hinglish: step 1 — valid check helper
  const ok = (r, c, v) => {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === v || board[i][c] === v) return false; // Hinglish: row/col me hai
      const br = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const bc = 3 * Math.floor(c / 3) + (i % 3);
      if (board[br][bc] === v) return false; // Hinglish: box me hai
    }
    return true;
  };
  const dfs = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== ".") continue;
        for (let v = 1; v <= 9; v++) {
          const ch = String(v);
          if (ok(r, c, ch)) {
            board[r][c] = ch;
            if (dfs()) return true; // Hinglish: aage badho
            board[r][c] = "."; // Hinglish: wapas lao
          }
        }
        return false;
      }
    }
    return true;
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
      body: `String ko tukdon me kaato jahan har tukda palindrome ho. Backtrack se cut try karo.

[Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)

\`\`\`js
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// LC: https://leetcode.com/problems/palindrome-partitioning/
function partition(s) {
  // Hinglish: palindrome check
  const isPal=(l,r)=>{ while(l<r){ if(s[l++]!==s[r--]) return false; } return true; };
  const ans=[];
  const dfs=(start, path)=>{
    if(start===s.length){ ans.push([...path]); return; } // Hinglish: pura kaat liya
    for(let end=start; end<s.length; end++){
      if(!isPal(start,end)) continue; // Hinglish: palindrome nahi to skip
      path.push(s.slice(start,end+1)); // Hinglish: choice liya
      dfs(end+1, path);
      path.pop(); // Hinglish: backtrack
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
      body: `3 dots lagao — har hissa 0-255 aur leading zero nahi. 4 hisse bane to pakdo.

[Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/)

\`\`\`js
// Hinglish: dots lagao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/restore-ip-addresses/
function restoreIpAddresses(s) {
  // Hinglish: step 1 — khaali path lo
  const out = [];
  const dfs = (i, parts) => {
    if (parts.length === 4) {
      if (i === s.length) out.push(parts.join(".")); // Hinglish: poora bana
      return;
    }
    for (let len = 1; len <= 3 && i + len <= s.length; len++) {
      const seg = s.slice(i, i + len);
      if (seg.length > 1 && seg[0] === "0") break; // Hinglish: leading zero mana
      if (Number(seg) > 255) break;
      parts.push(seg);
      dfs(i + len, parts); // Hinglish: aage badho
      parts.pop(); // Hinglish: wapas lao
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
      body: `Har bucket target tak bharo — bada number pehle try karo, khaali bucket me dobara mat daalo (prune).

[Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/)

\`\`\`js
// Hinglish: bucket bharo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/partition-to-k-equal-sum-subsets/
function canPartitionKSubsets(nums, k) {
  // Hinglish: step 1 — total check karo
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % k !== 0) return false;
  const target = total / k;
  nums.sort((a, b) => b - a); // Hinglish: bada pehle
  if (nums[0] > target) return false;
  const used = Array(nums.length).fill(false);
  const dfs = (start, kLeft, cur) => {
    if (kLeft === 1) return true; // Hinglish: aakhri khud ban jayega
    if (cur === target) return dfs(0, kLeft - 1, 0); // Hinglish: bucket bhari, agli bharo
    for (let i = start; i < nums.length; i++) {
      if (used[i] || cur + nums[i] > target) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue; // Hinglish: duplicate skip
      used[i] = true;
      if (dfs(i + 1, kLeft, cur + nums[i])) return true;
      used[i] = false; // Hinglish: wapas lao
      if (cur === 0) break; // Hinglish: khaali bucket dobara mat try karo
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
      body: `Upar wala hi 4 buckets ke saath — har side barabar honi chahiye.

[Matchsticks to Square](https://leetcode.com/problems/matchsticks-to-square/)

\`\`\`js
// Hinglish: 4 side bharo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/matchsticks-to-square/
function makesquare(matchsticks) {
  // Hinglish: step 1 — total check karo
  const total = matchsticks.reduce((a, b) => a + b, 0);
  if (total % 4 !== 0) return false;
  const side = total / 4;
  matchsticks.sort((a, b) => b - a); // Hinglish: badi pehle
  const sides = [0, 0, 0, 0];
  const dfs = (i) => {
    if (i === matchsticks.length) {
      return sides[0] === side && sides[1] === side && sides[2] === side && sides[3] === side;
    }
    for (let s = 0; s < 4; s++) {
      if (sides[s] + matchsticks[i] > side) continue; // Hinglish: zyada ho gaya
      sides[s] += matchsticks[i];
      if (dfs(i + 1)) return true;
      sides[s] -= matchsticks[i]; // Hinglish: wapas lao
      if (sides[s] === 0) break; // Hinglish: khaali side dobara mat try karo
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
      body: `Position i pe number j rakho agar j%i==0 ya i%j==0 — count badhao, backtrack karo.

[Beautiful Arrangement](https://leetcode.com/problems/beautiful-arrangement/)

\`\`\`js
// Hinglish: shart pe rakho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/beautiful-arrangement/
function countArrangement(n) {
  // Hinglish: step 1 — count lo
  let ans = 0;
  const used = Array(n + 1).fill(false);
  const dfs = (pos) => {
    if (pos > n) { ans++; return; } // Hinglish: poora bana
    for (let j = 1; j <= n; j++) {
      if (!used[j] && (j % pos === 0 || pos % j === 0)) {
        used[j] = true; // Hinglish: rakho
        dfs(pos + 1);
        used[j] = false; // Hinglish: wapas lao
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

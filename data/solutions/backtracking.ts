import type { SolutionGroup } from "./types";

export const BACKTRACKING_SOLUTIONS: SolutionGroup = {
  id: "backtracking",
  title: "Backtracking",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "permutations",
      title: "Permutations",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=42NUMtEj51g&ab_channel=AlgoJS",
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
      id: 1,
      lcSlug: "combinations",
      title: "Combinations",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=APn_6BwzCPw&t=4s&ab_channel=AlgoJS",
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
      id: 2,
      lcSlug: "subsets",
      title: "Subsets",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=CfneJequgxg&ab_channel=AlgoJS",
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
      id: 3,
      lcSlug: "combination-sum-iii",
      title: "Combination Sum III",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=q2erhUSztxo&ab_channel=AlgoJS",
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
      id: 4,
      lcSlug: "subsets-ii",
      title: "Subsets II",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=LchF4SUbajg&ab_channel=AlgoJS",
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
      id: 5,
      lcSlug: "combination-sum",
      title: "Combination Sum",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=2u_l4GM6dKw&ab_channel=AlgoJS",
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
      id: 6,
      lcSlug: "n-queens",
      title: "N-Queens",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=OYQMjTCSgDM&ab_channel=AlgoJS",
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
      id: 7,
      lcSlug: "n-queens-ii",
      title: "N-Queens II",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=kJtv0x1kV8g&ab_channel=AlgoJS",
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
      id: 8,
      lcSlug: "sudoku-solver",
      title: "Sudoku Solver",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=3nZ45g5yhG0&ab_channel=AlgoJS",
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
      id: 9,
      lcSlug: "letter-combinations-of-a-phone-number",
      title: "Letter Combinations of a Phone Number",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=40L6LFHeaIs&ab_channel=AlgoJS",
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
  ],
};

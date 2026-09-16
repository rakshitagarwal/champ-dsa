# Backtracking

**Definition:** Backtracking ek systematic DFS technique hai state-space tree par — hum ek choice try karte hain, aage recurse karte hain, aur jaise hi pata chale ki ye rasta valid solution tak nahi ja sakta, wapas undo (backtrack) kar dete hain. Ye brute force hai par pruning se tez.

**When to use:** Jab saare subsets / permutations / combinations chahiye, ya N-Queens jaise placements, ya grid/word search jisme constraint check karna ho. Agar soch "ek choice try karo, kaam kare to rakho warna hatao" hai to yehi pattern hai.

**How it works:** Recursive `choose → explore → unchoose` (push → recurse → pop). Ek `path` rakho current partial solution ke liye aur `ans` me save karo. Har call me check karo — valid hai to record, invalid hai to prune/return, fir loop se next choices try karo. Time aksar exponential `O(k^n)` par pruning branches kaat deta hai; space `O(n)` depth + path.

```js
// Backtracking skeleton — choose / explore / unchoose
// take a choice, recurse forward, then undo (backtrack)
function backtrack(start, path) {
  ans.push([...path]); // ya: if (isSolution(path)) ans.push([...path]); return

  // prune — this branch cannot lead to a valid solution
  // if (!isValid(path)) return;

  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);      // choose — take nums[i] into current path
    backtrack(i + 1, path);  // explore — recurse (i+1 = no reuse; i = reuse allowed)
    path.pop();              // unchoose — undo choice before next branch
  }
}
const ans = [];
backtrack(0, []);
```
## Subsets

Every prefix of the path is a subset. Recurse with `i + 1` so I do not reuse an index.

[Subsets](https://leetcode.com/problems/subsets/)

```js
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
```

## Combination Sum

I may reuse the same coin, so I recurse on `i` not `i + 1`. Stop when remain is 0 (save) or negative.

[Combination Sum](https://leetcode.com/problems/combination-sum/)

```js
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
```

## Permutations

`used[i]` so I do not pick the same index twice. Path length === n → save.

[Permutations](https://leetcode.com/problems/permutations/)

```js
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
```

## Generate Parentheses

I can add `(` if I still have some. I can add `)` if closes < opens. When the string length is `2n`, save.

[Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)

```js
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
```

## Word Search

DFS from every cell. Mark the cell, try 4 directions, unmark. If I consume the whole word, true.

[Word Search](https://leetcode.com/problems/word-search/)

```js
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
```

## N-Queens

One queen per row. `cols`, `diag`, `anti` sets. Place, recurse next row, remove.

[N-Queens](https://leetcode.com/problems/n-queens/)

```js
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
```

## Subsets II (Duplicates)

Duplicate numbers ke saath subsets, duplicate subsets avoid karo. Sort karke `i>start && nums[i]==nums[i-1]` skip karo.

[Subsets II](https://leetcode.com/problems/subsets-ii/)

```js
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
```

## Combination Sum II

Har coin ek baar, duplicate combos nahi. Sort + skip `i>start && same`.

[Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)

```js
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
```

## Palindrome Partitioning

String ko tukdon me kaato jahan har tukda palindrome ho. Backtrack se cut try karo.

[Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)

```js
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
```

## Letter Combinations of a Phone Number

Phone digits se saare letter combos. Har digit ke letters pe loop.

[Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

```js
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
```

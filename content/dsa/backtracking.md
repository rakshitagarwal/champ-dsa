# Backtracking

I try a choice, recurse, then undo it (`pop`). That is subsets, perms, combinations, N-queens, word on a grid. If the path is already illegal, I return early — that is pruning.

```js
function dfs(start, path) {
  ans.push([...path]);
  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]); // choose
    dfs(i + 1, path);   // explore
    path.pop();         // unchoose
  }
}
```

## Subsets

Every prefix of the path is a subset. Recurse with `i + 1` so I do not reuse an index.

[Subsets](https://leetcode.com/problems/subsets/)

```js
// Backtracking — subsets
// LC: https://leetcode.com/problems/subsets/
function subsets(nums) {
  const ans = [];
  const dfs = (start, path) => {
    ans.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      dfs(i + 1, path);
      path.pop();
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
      path.push(candidates[i]);
      dfs(i, remain - candidates[i], path);
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
      path.push(nums[i]);
      dfs(path);
      path.pop();
      used[i] = false;
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
// Backtracking — count open/close
// LC: https://leetcode.com/problems/generate-parentheses/
function generateParenthesis(n) {
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
```

## Word Search

DFS from every cell. Mark the cell, try 4 directions, unmark. If I consume the whole word, true.

[Word Search](https://leetcode.com/problems/word-search/)

```js
// Backtracking — grid DFS
// LC: https://leetcode.com/problems/word-search/
function exist(board, word) {
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
```

## N-Queens

One queen per row. `cols`, `diag`, `anti` sets. Place, recurse next row, remove.

[N-Queens](https://leetcode.com/problems/n-queens/)

```js
// Backtracking — place per row
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
```

# Backtracking

Choose → explore → unchoose. The path array is the current answer. Recurse until you hit a stop (length, remaining sum, end of array).

```js
// Backtracking skeleton
function dfs(start, path) {
  ans.push([...path]); // or only when path is complete
  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);     // choose
    dfs(i + 1, path);       // explore
    path.pop();             // unchoose
  }
}
```

## Subsets

Include or skip each index — [Subsets](https://leetcode.com/problems/subsets/).

```js
// Backtracking — subsets (index start, no reuse)
// LC: https://leetcode.com/problems/subsets/
function subsets(nums) {
  const ans = [];
  const dfs = (start, path) => {
    ans.push([...path]); // every prefix is a subset
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]); // choose
      dfs(i + 1, path);   // explore (i+1 = no reuse)
      path.pop();         // unchoose
    }
  };
  dfs(0, []);
  return ans;
}
```

## Permutations

Swap / used-array, length === n — [Permutations](https://leetcode.com/problems/permutations/).

```js
// Backtracking — permutations (used flags)
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
      path.push(nums[i]); // choose
      dfs(path);
      path.pop();         // unchoose
      used[i] = false;
    }
  };
  dfs([]);
  return ans;
}
```

## Combination Sum

Reuse allowed: recurse on same i — [Combination Sum](https://leetcode.com/problems/combination-sum/).

```js
// Backtracking — combinations with reuse
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
      path.push(candidates[i]);        // choose
      dfs(i, remain - candidates[i], path); // same i = reuse
      path.pop();                      // unchoose
    }
  };
  dfs(0, target, []);
  return ans;
}
```

**More:** [Combination Sum II](https://leetcode.com/problems/combination-sum-ii/), [Word Search](https://leetcode.com/problems/word-search/), [Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/), [N-Queens](https://leetcode.com/problems/n-queens/).

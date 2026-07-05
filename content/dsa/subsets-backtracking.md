# Subsets & Backtracking

A recursive brute-force technique that builds candidates incrementally and abandons ("backtracks") paths that cannot lead to a valid solution.

## When to use
- Need to generate all subsets, permutations, or combinations
- Constraint satisfaction problems (N-Queens, Sudoku)
- Problems asking for "all possible" arrangements or combinations

## How it works

Define a recursive function that builds a partial solution. At each step, make a choice, recurse, then undo the choice (backtrack). Prune branches that violate constraints early. For subsets, at each index you either take or skip the element.

```js
function subsets(nums) {
  const result = [];
  function backtrack(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result;
}
```

## Practice problems
- [Subsets](https://leetcode.com/problems/subsets/) — Generate all possible subsets
- [Permutations](https://leetcode.com/problems/permutations/) — Generate all permutations of an array
- [Combination Sum](https://leetcode.com/problems/combination-sum/) — Find combinations that sum to a target
- [N-Queens](https://leetcode.com/problems/n-queens/) — Classic backtracking constraint satisfaction

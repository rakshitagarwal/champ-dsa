# Subsets & Backtracking

Backtracking is a systematic brute-force technique that incrementally builds candidate solutions and abandons ("backtracks" from) a branch as soon as it determines that the partial candidate cannot lead to a valid complete solution. It is essentially an exhaustive search with pruning. The most common applications are generating all **subsets**, **permutations**, **combinations**, and solving **constraint satisfaction problems** (N-Queens, Sudoku, graph coloring).

The core idea is the **choose-explore-undo** pattern: at each step, you make a choice (add an element), recursively explore all completions from that choice, and then undo the choice (backtrack) to try the next alternative. This naturally models problems that ask for "all possible" arrangements. For subsets, the branching factor decreases over time because you only consider elements after the current index, avoiding duplicate permutations and ensuring each subset is generated exactly once.

## When to use

- Need to generate all subsets, permutations, or combinations of a set
- Constraint satisfaction: N-Queens, Sudoku, word search, regular expression matching
- Problems that ask for "all possible ways," "all combinations," or "all solutions"
- Decision problems where you need to explore all paths but can prune early
- Problems where the solution space can be represented as a tree of choices
- Combinatorial optimization with constraints (e.g., Combination Sum with limited supply)

## How it works

### Core concept

Think of the solution space as a decision tree. At the root, no choices have been made. At depth 1, you've chosen the first element (or not, for subsets). Each path from root to leaf represents one candidate solution. Backtracking does a DFS traversal of this implicit tree. The key to efficiency is **pruning**: if the current partial solution cannot possibly lead to a valid final solution (e.g., it already exceeds the target sum), stop recursing further.

For subsets specifically, the decision at each step is simple: take the current element or skip it. By always moving forward through the array (never looking back), each subset is generated exactly once. For permutations, every element is a candidate at every position, so you swap elements or use a "used" boolean array to track what's already placed.

### Step-by-step approach

1. Define a `backtrack(start, path)` function:
   - `start` is the first index you're allowed to consider (prevents reuse and duplicate combinations).
   - `path` is the current partial solution being built.

2. In `backtrack`:
   - **Subsets:** Push a copy of `path` into the result at the start of each call (capturing every intermediate subset, including the empty set).
   - **Combinations / Permutations:** Only push when `path` is complete (reaches target length or sum).
   - Loop from `i = start` to `n - 1`:
     - Make a choice: push `nums[i]` onto `path`.
     - Recurse: `backtrack(i + 1, path)` for subsets/combinations (each element used at most once), or `backtrack(0, path)` for permutations (any remaining element allowed).
     - Undo: pop from `path`.

3. Prune invalid branches early: if the partial sum already exceeds the target, return before recursing.

The choice list (`nums`) is often pre-sorted to make pruning easier or to handle duplicates (`if (i > start && nums[i] === nums[i-1]) continue`).

### Complexity

- **Time:** O(n × 2^n) for subsets (2^n subsets, each copied in O(n)). For permutations, O(n × n!). For combinations, varies by k.
- **Space:** O(n) for the recursion stack and the path array (not counting output storage).

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

## Variations

- **Permutations:** Use a `used` boolean array instead of start index. Every unused element is a candidate at each position. Avoid duplicate permutations by sorting and skipping used duplicates.
- **Combinations (size k):** Same as subsets, but only push to result when `path.length === k`. Also prune when remaining elements aren't enough to reach k.
- **Combination Sum (unlimited use):** Recurse with `i` (not `i + 1`) to allow reusing the same element. Prune when sum exceeds target.
- **Subsets with Duplicates:** Sort the array. Skip duplicates: `if (i > start && nums[i] === nums[i-1]) continue`.
- **Pruning strategies:** Pre-sort to stop recursion early when values exceed a bound. Use constraint propagation (e.g., for N-Queens, track attacked columns/diagonals).
- **Explicit stack:** Use an iterative approach with a manual stack of `[start, path]` states to avoid recursion limits.

## Edge cases

- **Empty input ([])** : The result should be `[[]]` (the empty set is a valid subset). The recursion visits the loop zero times, but the initial `result.push([...path])` captures `[]`.
- **Large n (n > 20):** Subsets become huge (2^n). Iterative or bitmask approaches may be more memory-efficient.
- **All identical elements:** Without deduplication logic, you'll generate duplicates. Sort + skip pattern is essential.
- **Target = 0 for combinations:** Empty path may be valid or not depending on the problem rules; check constraints carefully.
- **Deep recursion for large n:** The call stack may overflow. Consider iterative backtracking or limiting the search space.

## Practice problems

- [Subsets](https://leetcode.com/problems/subsets/) — Generate all subsets of a distinct integer array (canonical backtracking)
- [Permutations](https://leetcode.com/problems/permutations/) — Generate all permutations using a used-array pattern
- [Combination Sum](https://leetcode.com/problems/combination-sum/) — Find all combinations that sum to a target (unlimited element reuse)
- [N-Queens](https://leetcode.com/problems/n-queens/) — Classic constraint satisfaction: place queens without attacks
- [Subsets II](https://leetcode.com/problems/subsets-ii/) — Subsets with duplicate inputs (sort + skip)
- [Combination Sum II](https://leetcode.com/problems/combination-sum-ii/) — Combination Sum with limited element reuse (each element once)

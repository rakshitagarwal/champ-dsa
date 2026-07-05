# Union Find (DSU)

Disjoint Set Union (DSU), also called Union Find, is a data structure that tracks a partition of a set into disjoint, non-overlapping subsets. It supports two primary operations: **find**, which returns the representative (root) of the set containing a given element, and **union**, which merges two sets into one. Without optimizations, a naive implementation can degrade to O(n) per operation. With **path compression** (flattening the tree during find) and **union by rank/size** (attaching the smaller tree under the larger one), both operations run in amortized near-constant time — specifically O(α(n)), where α is the inverse Ackermann function, which grows so slowly that it is effectively constant for all practical input sizes.

The data structure is widely used in graph algorithms (Kruskal's MST, connected components), dynamic connectivity problems, and any scenario where you need to efficiently manage equivalence relations or merge groups incrementally. Despite its simplicity — often implemented in under 30 lines of code — DSU is a powerful tool that appears frequently in both competitive programming and technical interviews.

## When to use

- **Dynamic connectivity:** Determining whether two nodes are connected in a graph as edges are added incrementally
- **Kruskal's Minimum Spanning Tree:** Sorting edges by weight and unioning endpoints to build the MST while skipping edges that would form a cycle
- **Number of islands (dynamic):** Tracking island counts as land cells are added one by one (Number of Islands II)
- **Redundant connections:** Finding an edge that, when added to an already-connected graph, creates a cycle
- **Accounts merge:** Grouping email accounts by common owner names across multiple accounts
- **Graph valid tree:** Checking whether a graph is a tree (exactly n-1 edges with no cycles, and all nodes connected)
- **Finding connected components in an undirected graph:** Counting distinct groups after processing all edges
- **Offline queries with DSU rollback:** Solving problems where edges are added or removed over time by processing queries in reverse

## How it works

### Core concept

Each set is represented as a rooted tree where every node points to its parent. The **root** of the tree is the unique representative of the set — a node that points to itself. Initially, every element is its own parent, forming singleton sets. When two sets are united, the root of one tree becomes a child of the root of the other. Without optimizations, these trees can become tall and skinny, causing find to take O(n) time in the worst case.

**Path compression** solves this by flattening the structure: during a find operation, after locating the root, every node along the path is made to point directly to the root. This ensures that subsequent find calls on those nodes (or any node deep in the tree) become O(1). **Union by rank** (or by size) keeps trees shallow by always attaching the tree with smaller height under the tree with larger height. Together, these two optimizations yield the nearly constant amortized time that makes DSU so practical.

### Step-by-step approach

1. **Initialize parents and ranks.** Create arrays `parent` and `rank` (or `size`), both of length n. Set each element's parent to itself and rank to 0 (or size to 1).
2. **Implement `find(x)` with path compression.** Walk from `x` up to the root using `parent[x]`, then for each visited node, set `parent[node] = root`. This flattens the tree for future lookups.
3. **Implement `union(x, y)`.** First find the roots of x and y. If they are the same, return (they are already in the same set). Otherwise, attach the root with smaller rank under the root with larger rank. If ranks are equal, arbitrarily pick one as the new root and increment its rank.
4. **Implement `connected(x, y)`.** Return `find(x) === find(y)`.
5. **Optionally track component count.** Start with `count = n` and decrement on each successful union. This makes it easy to answer "how many components are there?" at any point.

### Complexity

- **Time:** O(α(n)) amortized per operation (find or union), where α(n) is the inverse Ackermann function — effectively constant for any realistic n (α(n) ≤ 5 for n ≤ 2²¹⁶⁰). The amortized bound holds when both path compression and union by rank are used.
- **Space:** O(n) for the parent and rank/size arrays.

```js
class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.components = n;
  }
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
  union(x, y) {
    const rx = this.find(x), ry = this.find(y);
    if (rx === ry) return false;
    if (this.rank[rx] < this.rank[ry]) {
      this.parent[rx] = ry;
    } else if (this.rank[rx] > this.rank[ry]) {
      this.parent[ry] = rx;
    } else {
      this.parent[ry] = rx;
      this.rank[rx]++;
    }
    this.components--;
    return true;
  }
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}
```

## Variations

- **Union by size instead of rank:** Track the size (number of elements) of each set and attach the smaller tree under the larger one. This achieves the same asymptotic complexity and also lets you query the size of a component.
- **DSU with rollback:** For offline dynamic connectivity problems, maintain a stack of changes (parent and rank modifications). On rollback, restore the previous state. This requires a non-path-compressed find (or a more complex approach) since path compression is not easily reversible.
- **Counting components:** Initialize `components = n` and decrement on each successful union. Many problems directly ask for the number of connected components after a series of union operations.
- **DSU on a 2D grid:** Map each cell `(r, c)` to a single integer ID (e.g., `r * cols + c`). This lets you union adjacent cells (up, down, left, right) to track connected regions in a grid.
- **Persistent DSU:** Maintain a versioned data structure that supports queries on historical states, useful in problems like "at which time step did two nodes become connected?"

## Edge cases

- **Single element:** A DSU with n = 1 has a single set. Find returns 0, union does nothing, and the component count is 1.
- **Disconnected components:** If no union calls are made (or none succeed), each element remains its own component. `connected(a, b)` returns false for any a ≠ b.
- **All elements in one set:** After n-1 successful unions, all elements share the same root. The component count reaches 1. Find and connected are still O(α(n)).
- **Large n (e.g., n = 2 × 10⁵):** DSU handles this easily — O(n) memory and O(α(n)) per operation. However, recursive find may cause a stack overflow in some environments; use an iterative find as a safeguard.
- **Path compression on the root:** Calling find on a root node is a no-op (parent[root] === root), which is correct and safe.
- **Union where both elements are already in the same set:** The find calls return the same root. Return early without decrementing the component count.

## Practice problems

- [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) — Classic DSU problem: count connected components from an adjacency matrix.
- [Redundant Connection](https://leetcode.com/problems/redundant-connection/) — Find the first edge that creates a cycle in an undirected graph.
- [Accounts Merge](https://leetcode.com/problems/accounts-merge/) — Union email accounts that share a common name, then merge and sort each component.
- [Number of Islands II](https://leetcode.com/problems/number-of-islands-ii/) — Dynamic island counting as land cells are added one by one using 2D grid DSU.
- [Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/) — Check if a graph with n nodes and edges list is a valid tree (connected and acyclic).
- [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) — Use DSU to group consecutive numbers and find the largest component size.
- [Smallest String With Swaps](https://leetcode.com/problems/smallest-string-with-swaps/) — Union indices that can be swapped, then sort characters within each connected component.
- [Evaluate Division](https://leetcode.com/problems/evaluate-division/) — Weighted DSU (or union with ratios) to answer division queries in an equation graph.

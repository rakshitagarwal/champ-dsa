import type { SolutionGroup } from "./types";

export const MATRIX_SOLUTIONS: SolutionGroup = {
  id: "matrix",
  title: "Matrix",
  subs: [
    {
      title: "Matrix Traversal / Search",
      topics: [
    {
      id: 59,
      lcSlug: "spiral-matrix-ii",
      title: "Spiral Matrix II",
      diff: "Medium",
      body: `Same spiral walk as Spiral Matrix, but fill with 1…n² while shrinking top/bottom/left/right bounds each lap.

[Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/)

\`\`\`js
// Layer-by-layer spiral fill with four boundary pointers
function generateMatrix(n) {
  const out = Array.from({ length: n }, () => Array(n).fill(0));
  let top = 0, bottom = n - 1, left = 0, right = n - 1, v = 1;
  while (top <= bottom && left <= right) {
    // Fill top row left → right
    for (let c = left; c <= right; c++) out[top][c] = v++;
    top++; // top row consumed
    // Fill right column top → bottom
    for (let r = top; r <= bottom; r++) out[r][right] = v++;
    right--; // right column consumed
    if (top <= bottom) {
      // Fill bottom row right → left
      for (let c = right; c >= left; c--) out[bottom][c] = v++;
      bottom--; // bottom row consumed
    }
    if (left <= right) {
      // Fill left column bottom → top
      for (let r = bottom; r >= top; r--) out[r][left] = v++;
      left++; // left column consumed
    }
  }
  return out;
}
\`\`\``,
    },
    {
      id: 74,
      lcSlug: "search-a-2d-matrix",
      title: "Search a 2D Matrix",
      diff: "Medium",
      body: `Each row is sorted and every row’s first value exceeds the previous row’s last — treat the grid as one sorted array and binary-search by flat index.

[Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)

\`\`\`js
// Binary search on virtual 1D index into row-major order
function searchMatrix(matrix, target) {
  const rows = matrix.length, cols = matrix[0].length;
  let lo = 0, hi = rows * cols - 1; // search space is rows*cols cells
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const val = matrix[Math.floor(mid / cols)][mid % cols]; // map flat mid → (r,c)
    if (val === target) return true;
    if (val < target) lo = mid + 1; // target is in upper half
    else hi = mid - 1; // target is in lower half
  }
  return false;
}
\`\`\``,
    },
    {
      id: 240,
      lcSlug: "search-a-2d-matrix-ii",
      title: "Search a 2D Matrix II",
      diff: "Medium",
      body: `Start at the top-right corner: if the cell is too big move left, if too small move down — each step eliminates a row or column.

[Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/)

\`\`\`js
// Staircase search from top-right
function searchMatrix(matrix, target) {
  let r = 0, c = matrix[0].length - 1; // begin at smallest-in-row, largest-in-col corner
  while (r < matrix.length && c >= 0) {
    const v = matrix[r][c];
    if (v === target) return true;
    if (v > target) c--; // need smaller value → go left
    else r++; // need larger value → go down
  }
  return false;
}
\`\`\``,
    },
    {
      id: 498,
      lcSlug: "diagonal-traverse",
      title: "Diagonal Traverse",
      diff: "Medium",
      body: `Cells with the same \`r + c\` lie on one diagonal — bucket by that sum, reverse every other diagonal for the zigzag order.

[Diagonal Traverse](https://leetcode.com/problems/diagonal-traverse/)

\`\`\`js
// Group by diagonal index r+c, alternate reversal per diagonal
function findDiagonalOrder(mat) {
  const rows = mat.length, cols = mat[0].length;
  const groups = new Map();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const k = r + c; // diagonal id
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(mat[r][c]);
    }
  }
  const out = [];
  const keys = [...groups.keys()].sort((a, b) => a - b); // visit diagonals in order
  for (const k of keys) {
    const arr = groups.get(k);
    if (k % 2 === 0) arr.reverse(); // even diagonals go up-left in output
    for (const x of arr) out.push(x);
  }
  return out;
}
\`\`\``,
    },
    {
      id: 885,
      lcSlug: "spiral-matrix-iii",
      title: "Spiral Matrix III",
      diff: "Medium",
      body: `Walk in expanding square rings (1,1,2,2,3,3… steps per direction). Record coordinates that still lie inside the grid.

[Spiral Matrix III](https://leetcode.com/problems/spiral-matrix-iii/)

\`\`\`js
// Outward spiral with step length increasing every two turns
function spiralMatrixIII(rows, cols, rStart, cStart) {
  const out = [[rStart, cStart]];
  const dirs = [[0,1],[1,0],[0,-1],[-1,0]]; // R, D, L, U
  let d = 0, step = 1; // current direction and steps in that direction
  let r = rStart, c = cStart;
  while (out.length < rows * cols) {
    for (let t = 0; t < 2; t++) { // two sides at this step length before step++
      for (let i = 0; i < step; i++) {
        r += dirs[d][0]; c += dirs[d][1];
        if (r >= 0 && c >= 0 && r < rows && c < cols) out.push([r, c]);
      }
      d = (d + 1) % 4; // turn clockwise
    }
    step++; // longer legs on next lap
  }
  return out;
}
\`\`\``,
    },
    {
      id: 1424,
      lcSlug: "diagonal-traverse-ii",
      title: "Diagonal Traverse II",
      diff: "Medium",
      body: `Same diagonal grouping as the rectangular case, but rows have different lengths — scan bottom-up so each diagonal list is already in visit order.

[Diagonal Traverse II](https://leetcode.com/problems/diagonal-traverse-ii/)

\`\`\`js
// Bucket by r+c on jagged rows; bottom-up fill preserves diagonal order
function findDiagonalOrder(nums) {
  const groups = new Map();
  for (let r = nums.length - 1; r >= 0; r--) {
    for (let c = 0; c < nums[r].length; c++) {
      const k = r + c;
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(nums[r][c]);
    }
  }
  const out = [];
  const keys = [...groups.keys()].sort((a, b) => a - b);
  for (const k of keys) for (const x of groups.get(k)) out.push(x);
  return out;
}
\`\`\``,
    },
      ],
    },
  ],
};

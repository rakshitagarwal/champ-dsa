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
      body: `Spiral Matrix jaisa, par bharna hai 1 se n² tak — boundaries shrink karte jao.

[Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/)

\`\`\`js
// Hinglish: bharte jao shrink karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/spiral-matrix-ii/
function generateMatrix(n) {
  // Hinglish: step 1 — khaali banao
  const out = Array.from({ length: n }, () => Array(n).fill(0));
  let top = 0, bottom = n - 1, left = 0, right = n - 1, v = 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out[top][c] = v++; // Hinglish: upar row
    top++;
    for (let r = top; r <= bottom; r++) out[r][right] = v++; // Hinglish: right col
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) out[bottom][c] = v++; // Hinglish: neeche row
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) out[r][left] = v++; // Hinglish: left col
      left++;
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
      body: `Har row sorted, har row ka pehla pichhli row ke aakhri se bada — poori matrix ek sorted array hai. Flatten index pe binary search lagao.

[Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)

\`\`\`js
// Hinglish: matrix ghoomo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/search-a-2d-matrix/
function searchMatrix(matrix, target) {
  // Hinglish: step 1 — rows/cols lo
  const rows = matrix.length, cols = matrix[0].length;
  let lo = 0, hi = rows * cols - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const val = matrix[Math.floor(mid / cols)][mid % cols]; // Hinglish: flat se 2D
    if (val === target) return true;
    if (val < target) lo = mid + 1;
    else hi = mid - 1;
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
      body: `Upar-right kone se shuru karo — bada ho to neeche jao, chhota ho to left jao. Har step ek row/col khatam.

[Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/)

\`\`\`js
// Hinglish: kone se dhoondo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/search-a-2d-matrix-ii/
function searchMatrix(matrix, target) {
  // Hinglish: step 1 — kone pe khade ho
  let r = 0, c = matrix[0].length - 1;
  while (r < matrix.length && c >= 0) {
    const v = matrix[r][c];
    if (v === target) return true; // Hinglish: mil gaya
    if (v > target) c--; // Hinglish: chhota chahiye to left
    else r++; // Hinglish: bada chahiye to neeche
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
      body: `r+c same wale ek diagonal pe hain — groups banao, alternate ulta karo.

[Diagonal Traverse](https://leetcode.com/problems/diagonal-traverse/)

\`\`\`js
// Hinglish: diagonal groups banao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/diagonal-traverse/
function findDiagonalOrder(mat) {
  // Hinglish: step 1 — groups banao
  const rows = mat.length, cols = mat[0].length;
  const groups = new Map();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const k = r + c; // Hinglish: same jod = same diagonal
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(mat[r][c]);
    }
  }
  const out = [];
  const keys = [...groups.keys()].sort((a, b) => a - b);
  for (const k of keys) {
    const arr = groups.get(k);
    if (k % 2 === 0) arr.reverse(); // Hinglish: alternate ulta
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
      body: `Steps 1,1,2,2,3,3 badhte hain — direction ghoomte jao, grid ke andar ho to uthao.

[Spiral Matrix III](https://leetcode.com/problems/spiral-matrix-iii/)

\`\`\`js
// Hinglish: kadam badhate jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/spiral-matrix-iii/
function spiralMatrixIII(rows, cols, rStart, cStart) {
  // Hinglish: step 1 — start se shuru karo
  const out = [[rStart, cStart]];
  const dirs = [[0,1],[1,0],[0,-1],[-1,0]]; // Hinglish: right, down, left, up
  let d = 0, step = 1;
  let r = rStart, c = cStart;
  while (out.length < rows * cols) {
    for (let t = 0; t < 2; t++) {
      for (let i = 0; i < step; i++) {
        r += dirs[d][0]; c += dirs[d][1]; // Hinglish: chalo
        if (r >= 0 && c >= 0 && r < rows && c < cols) out.push([r, c]); // Hinglish: andar ho to uthao
      }
      d = (d + 1) % 4; // Hinglish: mudo
    }
    step++; // Hinglish: kadam badhao
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
      body: `Upar wala hi, par jagged rows hain — groups banao, ulta karke jodo.

[Diagonal Traverse II](https://leetcode.com/problems/diagonal-traverse-ii/)

\`\`\`js
// Hinglish: groups bana ke ulta jodo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/diagonal-traverse-ii/
function findDiagonalOrder(nums) {
  // Hinglish: step 1 — groups banao
  const groups = new Map();
  for (let r = nums.length - 1; r >= 0; r--) {
    for (let c = 0; c < nums[r].length; c++) {
      const k = r + c; // Hinglish: same jod = same diagonal
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

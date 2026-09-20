# Matrix

**Definition:** A matrix is a 2D array — a grid of rows × cols. Typical questions: traversal (spiral, wave), rotation, search, or paint. Always think in indices: row `r` from `0..rows-1`, column `c` from `0..cols-1`.

**When to use:** Spiral order, rotate image, mark zeroes, search in a sorted matrix, or paint a grid. Open this page when the problem is "move around in 2D".

**How it works:** Read `rows`, `cols` first. Keep a directions array `[[1,0],[-1,0],[0,1],[0,-1]]`. Bounds-check every move: `nr<0 || nc<0 || nr>=rows || nc>=cols`. Rotate 90° = transpose + reverse each row. Time usually `O(rows*cols)`; extra space often `O(1)`.

## Study notes

- **Rows/cols first:** Start every solution with `rows`, `cols` — do not repeat `grid.length`.
- **Directions array:** Put 4 moves in one array; extend to 8 for diagonals.
- **Bounds helper:** One `inBounds(r,c)` line per move.
- **Transpose + reverse = rotate:** 90° clockwise needs no new matrix.
- **Spiral boundaries:** Keep top/bottom/left/right; shrink each round; stop when empty.
- **Flatten index:** For sorted-matrix binary search: `idx → [Math.floor(idx/cols), idx%cols]`.
- **First row/col as markers:** Set Zeroes in O(1) space — mark in first row/col; use two flags for overlap.
- **In-place paint:** Mark on the grid (`"1"` → `"0"`) when you do not need the original — saves a `seen` set.

## Active revision

1. Rotate 90° CW: transpose then reverse rows — say it aloud.
2. Spiral: name the four shrink steps and the stop condition.
3. Sorted matrix search: map flat mid to `(r,c)`.

**Blank checklist:** bounds? directions? in-place? flatten for BS?

## Decision table

| If you see… | Likely move |
|-------------|-------------|
| Layer / spiral order | Shrink four boundaries |
| Rotate square image in-place | Transpose + reverse rows |
| Zero out rows/cols | Mark then write (or first row/col markers) |
| Fully sorted matrix | Binary search on flat index |
| Grid walk / paint | DFS/BFS + dirs + bounds |

```js
// Matrix skeleton — traversal with directions
// grid DFS/BFS — four directions from (r,c)
const rows = grid.length, cols = grid[0].length;
const dirs = [[1,0],[-1,0],[0,1],[0,-1]]; // four orthogonal direction vectors
const inBounds = (r, c) => r >= 0 && c >= 0 && r < rows && c < cols;
for (const [dr, dc] of dirs) {
  const nr = r + dr, nc = c + dc;
  if (!inBounds(nr, nc)) continue; // skip neighbor outside grid bounds
}

// Rotate 90° skeleton — transpose + reverse rows
// rotate 90° CW: transpose then reverse each row
for (let r = 0; r < n; r++)
  for (let c = r + 1; c < n; c++)
    [a[r][c], a[c][r]] = [a[c][r], a[r][c]];
for (const row of a) row.reverse();
```

## Spiral Matrix

Keep boundaries (top/bottom/left/right), peel one layer at a time, shrink after each side.

[Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)

```js
// Time: O(m·n) · Space: O(1)
// peel layers: right→down→left→up
var spiralOrder = function(matrix) {
  let left = 0;
  let top = 0;
  let right = matrix[0].length - 1;
  let bottom = matrix.length - 1;
  let size = matrix.length * matrix[0].length;
  let nums = [];

  while (nums.length < size) {
    for (let i = left; i <= right && nums.length < size; i++) {
      nums.push(matrix[top][i]);
    }
    top++;

    for (let i = top; i <= bottom && nums.length < size; i++) {
      nums.push(matrix[i][right]);
    }
    right--;

    for (let i = right; i >= left && nums.length < size; i--) {
      nums.push(matrix[bottom][i]);
    }
    bottom--;

    for (let i = bottom; i >= top && nums.length < size; i--) {
      nums.push(matrix[i][left]);
    }
    left++;
  }

  return nums;
};
```

## Rotate Image

Transpose `(r,c) ↔ (c,r)`, then reverse each row. In-place, no extra matrix.

[Rotate Image](https://leetcode.com/problems/rotate-image/)

```js
// Time: O(n²) · Space: O(1)
// transpose then reverse each row
var rotate = function(matrix) {
  // transpose
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix.length; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  // reverse elements and move inwards
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length / 2; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[i][matrix.length - 1 - j];
      matrix[i][matrix.length - 1 - j] = temp;
    }
  }
};
```

## Set Matrix Zeroes

If a cell is 0, zero its whole row and column. For O(1) space, mark in the first row/col.

[Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)

```js
// Time: O(m·n) · Space: O(1)
// mark zeros; second pass write
var setZeroes = function(matrix) {
  let zeroPos = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        zeroPos.push([i, j]);
      }
    }
  }

  for (let i = 0; i < zeroPos.length; i++) {
    const [row, col] = zeroPos[i];

    for (let r = 0; r < matrix.length; r++) {
      matrix[r][col] = 0;
    }

    for (let c = 0; c < matrix[0].length; c++) {
      matrix[row][c] = 0;
    }
  }
};
```

## Search a 2D Matrix

Each row is sorted, and the first of each row is larger than the last of the previous — the whole matrix is one sorted array. Binary search on the flat index.

[Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)

```js
// Time: O(n) · Space: O(n)
// Treat matrix as one sorted array — binary search on flat index
function searchMatrix(matrix, target) {
  const rows = matrix.length, cols = matrix[0].length;
  let lo = 0, hi = rows * cols - 1;
  while (lo <= hi) { // classic BS on inclusive [lo, hi]
    const mid = (lo + hi) >> 1;
    const val = matrix[Math.floor(mid / cols)][mid % cols]; // treat mid as row-major index into matrix
    if (val === target) return true;
    if (val < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}
```

# Matrix

**Definition:** Matrix 2D array hai — rows × cols ka grid. Aksar sawal traversal (spiral, wave), rotation, search ya paint ke hote hain. Soch hamesha indices pe rakho: row `r` 0 se `rows-1`, column `c` 0 se `cols-1`.

**When to use:** Spiral order, rotate image, zeroes mark karna, sorted matrix me search, ya grid paint karna. "2D me ghoomna" dikhe to ye page kholo.

**How it works:** Pehle `rows`, `cols` nikalo. Directions array rakho `[[1,0],[-1,0],[0,1],[0,-1]]`. Bounds check har move pe: `nr<0 || nc<0 || nr>=rows || nc>=cols`. Rotate 90° = transpose + har row reverse. Time aksar `O(rows*cols)`, space `O(1)` extra.

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

## Tips & Tricks

- **Rows/cols pehle:** Har solution `rows`, `cols` se shuru karo — baar-baar `grid.length` mat likho.
- **Directions array:** 4 moves ek array me rakho, alag-alag if mat lagao. 8 moves (diagonal) ho to array badhao.
- **Bounds helper:** `inBounds` function banao — har move pe ek line me check.
- **Transpose + reverse = rotate:** 90° clockwise ke liye transpose karke har row reverse karo — naya matrix nahi chahiye.
- **Spiral me boundaries:** top/bottom/left/right rakho, har round ke baad shrink karo, khaali hote hi ruko.
- **Flatten index:** Sorted matrix me binary search ke liye `idx → [Math.floor(idx/n), idx%n]` use karo.
- **First row/col as markers:** Set Zeroes O(1) space me — pehli row/col me nishan lagao, do flags se overlap sambhalo.
- **In-place paint:** Grid me hi mark karo (`"1"` → `"0"`) jab wapas nahi chahiye — extra `seen` bachta hai.

## Spiral Matrix

Boundaries rakho (top/bottom/left/right), ek-ek layer nikalo, har side ke baad shrink karo.

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

Transpose karo (r,c) ↔ (c,r), phir har row reverse. In-place, extra space nahi.

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

Jis cell me 0 ho, uski poori row+col zero karo. O(1) space ke liye pehli row/col me nishan lagao.

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

Har row sorted, har row ka pehla pichhli row ke aakhri se bada — poori matrix ek sorted array hai. Flatten index pe binary search lagao.

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

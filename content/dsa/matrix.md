# Matrix

**Definition:** Matrix 2D array hai — rows × cols ka grid. Aksar sawal traversal (spiral, wave), rotation, search ya paint ke hote hain. Soch hamesha indices pe rakho: row `r` 0 se `rows-1`, column `c` 0 se `cols-1`.

**When to use:** Spiral order, rotate image, zeroes mark karna, sorted matrix me search, ya grid paint karna. "2D me ghoomna" dikhe to ye page kholo.

**How it works:** Pehle `rows`, `cols` nikalo. Directions array rakho `[[1,0],[-1,0],[0,1],[0,-1]]`. Bounds check har move pe: `nr<0 || nc<0 || nr>=rows || nc>=cols`. Rotate 90° = transpose + har row reverse. Time aksar `O(rows*cols)`, space `O(1)` extra.

```js
// Matrix skeleton — traversal with directions
// Hinglish: rows/cols nikalo, directions se ghoomo
const rows = grid.length, cols = grid[0].length;
const dirs = [[1,0],[-1,0],[0,1],[0,-1]]; // Hinglish: 4 disha
const inBounds = (r, c) => r >= 0 && c >= 0 && r < rows && c < cols;
for (const [dr, dc] of dirs) {
  const nr = r + dr, nc = c + dc;
  if (!inBounds(nr, nc)) continue; // Hinglish: bahar to chhodo
}

// Rotate 90° skeleton — transpose + reverse rows
// Hinglish: pehle transpose, phir har row ulta
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
// Hinglish: matrix ghoomo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/spiral-matrix/
function spiralOrder(matrix) {
  // Hinglish: step 1 — boundaries lo
  const out = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out.push(matrix[top][c]); // Hinglish: upar row
    top++;
    for (let r = top; r <= bottom; r++) out.push(matrix[r][right]); // Hinglish: right col
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) out.push(matrix[bottom][c]); // Hinglish: neeche row
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) out.push(matrix[r][left]); // Hinglish: left col
      left++;
    }
  }
  return out;
}
```

## Rotate Image

Transpose karo (r,c) ↔ (c,r), phir har row reverse. In-place, extra space nahi.

[Rotate Image](https://leetcode.com/problems/rotate-image/)

```js
// Hinglish: matrix ghoomo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/rotate-image/
function rotate(matrix) {
  // Hinglish: step 1 — transpose karo
  const n = matrix.length;
  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]]; // Hinglish: adla-badli
    }
  }
  for (const row of matrix) row.reverse(); // Hinglish: har row ulta
}
```

## Set Matrix Zeroes

Jis cell me 0 ho, uski poori row+col zero karo. O(1) space ke liye pehli row/col me nishan lagao.

[Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)

```js
// Hinglish: matrix ghoomo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/set-matrix-zeroes/
function setZeroes(matrix) {
  // Hinglish: step 1 — rows/cols lo
  const rows = matrix.length, cols = matrix[0].length;
  let firstRowZero = false, firstColZero = false;
  for (let c = 0; c < cols; c++) if (matrix[0][c] === 0) firstRowZero = true;
  for (let r = 0; r < rows; r++) if (matrix[r][0] === 0) firstColZero = true;
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[r][c] === 0) { matrix[r][0] = 0; matrix[0][c] = 0; } // Hinglish: nishan lagao
    }
  }
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0; // Hinglish: nishan to zero
    }
  }
  if (firstRowZero) for (let c = 0; c < cols; c++) matrix[0][c] = 0;
  if (firstColZero) for (let r = 0; r < rows; r++) matrix[r][0] = 0;
}
```

## Search a 2D Matrix

Har row sorted, har row ka pehla pichhli row ke aakhri se bada — poori matrix ek sorted array hai. Flatten index pe binary search lagao.

[Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)

```js
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
```

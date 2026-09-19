import type { SolutionGroup } from "./types";

export const MATRIX_SOLUTIONS: SolutionGroup = {
  id: "matrix",
  title: "Matrix",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "flood-fill",
      title: "Flood Fill",
      diff: "Easy",
    solutionUrl: "https://www.youtube.com/watch?v=OODFEqJxiDo&ab_channel=AlgoJS",
      body: `Start cell ka rang badlo — same rang wale padosi pakad ke bharo. Purana-naya same ho to wapas lao.

[Flood Fill](https://leetcode.com/problems/flood-fill/)

\`\`\`js
// Hinglish: rang bharo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/flood-fill/
function floodFill(image, sr, sc, color) {
  // Hinglish: step 1 — purana rang lo
  const old = image[sr][sc];
  if (old === color) return image; // Hinglish: same hai to kuch nahi
  const rows = image.length, cols = image[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || image[r][c] !== old) return;
    image[r][c] = color; // Hinglish: rang badlo
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  };
  dfs(sr, sc);
  return image;
}
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "set-matrix-zeroes",
      title: "Set Matrix Zeroes",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=9-PXYWcRc_Y&ab_channel=AlgoJS",
      body: `Jis cell me 0 ho, uski poori row+col zero karo. O(1) space ke liye pehli row/col me nishan lagao.

[Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 2,
      lcSlug: "spiral-matrix",
      title: "Spiral Matrix",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=ty5t22rmrG8&t=1s&ab_channel=AlgoJS",
      body: `Boundaries rakho (top/bottom/left/right), ek-ek layer nikalo, har side ke baad shrink karo.

[Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 3,
      lcSlug: "rotate-image",
      title: "Rotate Image",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=swlO6KKh8yk&ab_channel=AlgoJS",
      body: `Transpose karo (r,c) ↔ (c,r), phir har row reverse. In-place, extra space nahi.

[Rotate Image](https://leetcode.com/problems/rotate-image/)

\`\`\`js
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
\`\`\``,
    },
    {
      id: 4,
      lcSlug: "word-search",
      title: "Word Search",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=_bGRNR3D92s&ab_channel=AlgoJS",
      body: `DFS from every cell. Mark the cell, try 4 directions, unmark. If I consume the whole word, true.

[Word Search](https://leetcode.com/problems/word-search/)

\`\`\`js
// Hinglish: choose-explore-unchoose — ek-ek step comment dekho
// Backtracking — grid DFS
// LC: https://leetcode.com/problems/word-search/
function exist(board, word) {
  // Hinglish: step 1 — base case check karo
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
\`\`\``,
    },
    {
      id: 5,
      lcSlug: "walls-and-gates",
      title: "Walls and Gates",
      diff: "Medium",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=R6JXIqftq5E&ab_channel=AlgoJS",
      body: `Saare gates se ek saath BFS chalao — pehli baar pahuche wahi nearest distance hai.

[Walls and Gates](https://leetcode.com/problems/walls-and-gates/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Hinglish: gates se failao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/walls-and-gates/ (Premium)
function wallsAndGates(rooms) {
  // Hinglish: step 1 — rows/cols lo
  const rows = rooms.length;
  if (!rows) return;
  const cols = rooms[0].length;
  const q = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rooms[r][c] === 0) q.push([r, c]); // Hinglish: gate queue me daalo
    }
  }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (q.length) {
    const [r, c] = q.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (rooms[nr][nc] !== 2147483647) continue; // Hinglish: khaali kamra hi bharo
      rooms[nr][nc] = rooms[r][c] + 1; // Hinglish: ek kadam aage
      q.push([nr, nc]);
    }
  }
}
\`\`\``,
    },
    {
      id: 6,
      lcSlug: "diagonal-traverse",
      title: "Diagonal Traverse",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=L_nDLQePpbo&ab_channel=AlgoJS",
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
      id: 7,
      lcSlug: "pacific-atlantic-water-flow",
      title: "Pacific Atlantic Water Flow",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=HuR-AQt3UQA&t=4s&ab_channel=AlgoJS",
      body: `Water flows down or flat. I BFS/DFS uphill from the Pacific edge and from the Atlantic edge. Cells in both sets are the answer.

[Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)

\`\`\`js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Graph DFS — from oceans inland
// LC: https://leetcode.com/problems/pacific-atlantic-water-flow/
function pacificAtlantic(heights) {
  // Hinglish: step 1 — base case check karo
  const rows = heights.length, cols = heights[0].length;
  const pac = Array.from({ length: rows }, () => Array(cols).fill(false));
  const atl = Array.from({ length: rows }, () => Array(cols).fill(false));
  const dfs = (r, c, seen, prev) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || seen[r][c]) return;
    if (heights[r][c] < prev) return;
    seen[r][c] = true;
    dfs(r + 1, c, seen, heights[r][c]);
    dfs(r - 1, c, seen, heights[r][c]);
    dfs(r, c + 1, seen, heights[r][c]);
    dfs(r, c - 1, seen, heights[r][c]);
  };
  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pac, 0);
    dfs(r, cols - 1, atl, 0);
  }
  for (let c = 0; c < cols; c++) {
    dfs(0, c, pac, 0);
    dfs(rows - 1, c, atl, 0);
  }
  const out = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pac[r][c] && atl[r][c]) out.push([r, c]);
    }
  }
  return out;
}
\`\`\``,
    },
    {
      id: 8,
      lcSlug: "number-of-islands",
      title: "Number of Islands",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=DS59uo8zRNc&t=281s&ab_channel=AlgoJS",
      body: `Each unvisited \`"1"\` is a new island. DFS (or BFS) paints the whole blob to \`"0"\`.

[Number of Islands](https://leetcode.com/problems/number-of-islands/)

\`\`\`js
// Hinglish: DFS/BFS traversal — ek-ek step comment dekho
// Graph DFS — flood fill
// LC: https://leetcode.com/problems/number-of-islands/
function numIslands(grid) {
  // Hinglish: step 1 — base case check karo
  const rows = grid.length, cols = grid[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  };
  let n = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        n++;
        dfs(r, c);
      }
    }
  }
  return n;
}
\`\`\``,
    },
    {
      id: 9,
      lcSlug: "minimum-knight-moves",
      title: "Minimum Knight Moves",
      diff: "Medium",
    premium: true,
    solutionUrl: "https://www.youtube.com/watch?v=lKwvVsI9r94&ab_channel=AlgoJS",
      body: `BFS ghode ki chaal se chalao — symmetry se pehle quadrant me lao, phir shortest nikalo.

[Minimum Knight Moves](https://leetcode.com/problems/minimum-knight-moves/)

*Premium question — kholne ke liye LeetCode premium chahiye.*

\`\`\`js
// Hinglish: ghode se BFS — ek-ek step comment dekho
// LC: https://leetcode.com/problems/minimum-knight-moves/ (Premium)
function minKnightMoves(x, y) {
  // Hinglish: step 1 — positive quadrant me lao
  x = Math.abs(x); y = Math.abs(y);
  const moves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
  const q = [[0, 0, 0]];
  const seen = new Set(["0,0"]);
  while (q.length) {
    const [r, c, d] = q.shift();
    if (r === x && c === y) return d; // Hinglish: pahuch gaye
    for (const [dr, dc] of moves) {
      const nr = r + dr, nc = c + dc;
      const key = nr + "," + nc;
      if (nr < -2 || nc < -2 || seen.has(key)) continue; // Hinglish: seema me raho
      seen.add(key);
      q.push([nr, nc, d + 1]);
    }
  }
  return -1;
}
\`\`\``,
    },
    {
      id: 10,
      lcSlug: "shortest-path-in-binary-matrix",
      title: "Shortest Path in Binary Matrix",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=qqIA4_bmpzk&ab_channel=AlgoJS",
      body: `8 directions BFS — steps ke saath queue me chalao, end mile to wapas lao.

[Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

\`\`\`js
// Hinglish: 8 disha BFS — ek-ek step comment dekho
// LC: https://leetcode.com/problems/shortest-path-in-binary-matrix/
function shortestPathBinaryMatrix(grid) {
  // Hinglish: step 1 — start/end check karo
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
  const q = [[0, 0, 1]];
  grid[0][0] = 1; // Hinglish: dekha mark karo
  while (q.length) {
    const [r, c, d] = q.shift();
    if (r === n - 1 && c === n - 1) return d; // Hinglish: pahuch gaye
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= n || nc >= n || grid[nr][nc] !== 0) continue;
      grid[nr][nc] = 1;
      q.push([nr, nc, d + 1]);
    }
  }
  return -1;
}
\`\`\``,
    },
    {
      id: 11,
      lcSlug: "01-matrix",
      title: "0 1 Matrix",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=CTqBOiciqc4&ab_channel=AlgoJS",
      body: `Saare zero queue me daalo, BFS chalao — pehli baar pahuche wahi nearest distance hai.

[0 1 Matrix](https://leetcode.com/problems/01-matrix/)

\`\`\`js
// Hinglish: zero se failao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/01-matrix/
function updateMatrix(mat) {
  // Hinglish: step 1 — zero queue me daalo
  const rows = mat.length, cols = mat[0].length;
  const q = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (mat[r][c] === 0) q.push([r, c]);
      else mat[r][c] = -1; // Hinglish: abhi pata nahi
    }
  }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (q.length) {
    const [r, c] = q.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || mat[nr][nc] !== -1) continue;
      mat[nr][nc] = mat[r][c] + 1; // Hinglish: ek kadam aage
      q.push([nr, nc]);
    }
  }
  return mat;
}
\`\`\``,
    },
    {
      id: 12,
      lcSlug: "word-search-ii",
      title: "Word Search II",
      diff: "Hard",
    solutionUrl: "https://www.youtube.com/watch?v=iQuw7mID_30&ab_channel=AlgoJS",
      body: `Build a trie of all words. DFS the board. Follow trie edges. When \`end\` is set, I found a word — push it and clear \`end\` so I do not add twice. Unmark the cell when I backtrack.

[Word Search II](https://leetcode.com/problems/word-search-ii/)

\`\`\`js
// Hinglish: trie walk — ek-ek step comment dekho
// Trie + DFS on the grid
// LC: https://leetcode.com/problems/word-search-ii/
function findWords(board, words) {
  // Hinglish: step 1 — base case check karo
  const root = { kids: Object.create(null), word: null };
  for (const w of words) {
    let cur = root;
    for (const ch of w) {
      if (!cur.kids[ch]) cur.kids[ch] = { kids: Object.create(null), word: null };
      cur = cur.kids[ch];
    }
    cur.word = w;
  }
  const rows = board.length, cols = board[0].length, ans = [];
  const dfs = (r, c, node) => {
    const ch = board[r][c];
    const next = node.kids[ch];
    if (!next) return;
    if (next.word) {
      ans.push(next.word);
      next.word = null;
    }
    board[r][c] = "#";
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || board[nr][nc] === "#") continue;
      dfs(nr, nc, next);
    }
    board[r][c] = ch;
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) dfs(r, c, root);
  }
  return ans;
}
\`\`\``,
    },
      ],
    },
  ],
};

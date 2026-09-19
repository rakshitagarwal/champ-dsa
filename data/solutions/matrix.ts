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
// Time: O(m·n) · Space: O(m·n)
var floodFill = function(image, sr, sc, color) {
  const original = image[sr][sc];

  function recurse(image, sr, sc) {
    // check boundaries
    if (
      sr < 0 ||
      sr > image.length - 1 ||
      sc < 0 ||
      sc > image[0].length - 1 ||
      image[sr][sc] !== original ||
      image[sr][sc] === color
    )
      return image;

    image[sr][sc] = color;

    recurse(image, sr + 1, sc);
    recurse(image, sr - 1, sc);
    recurse(image, sr, sc + 1);
    recurse(image, sr, sc - 1);

    return image;
  }
  return recurse(image, sr, sc);
};
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
// Time: O(m·n) · Space: O(1)
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
// Time: O(m·n) · Space: O(1)
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
// Time: O(n²) · Space: O(1)
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
// Time: O(m·n·4^L) · Space: O(L)
// Backtracking — grid DFS
var exist = function(board, word) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (board[r][c] === word[0] && dfs(r, c, 0)) return true;
    }
  }
  return false;

  function dfs(r, c, i) {
    if (word.length === i) return true;
    if (
      r >= board.length ||
      r < 0 ||
      c < 0 ||
      c >= board[0].length ||
      board[r][c] !== word[i]
    )
      return false;

    board[r][c] = "#";

    if (
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1)
    )
      return true;

    board[r][c] = word[i];
    return false;
  }
};
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
// Time: O(m·n) · Space: O(m·n)
var wallsAndGates = function(rooms) {
  const WALL = -1;
  const GATE = 0;
  const EMPTY = 2147483647;

  let queue = [];
  let dir = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < rooms[0].length; j++) {
      if (rooms[i][j] === GATE) {
        queue.push([i, j]);
      }
    }
  }

  while (queue.length) {
    let current = queue.shift();
    let currentX = current[0];
    let currentY = current[1];

    for (let d of dir) {
      let nextX = currentX + d[0];
      let nextY = currentY + d[1];

      if (
        nextX < 0 ||
        nextX > rooms.length - 1 ||
        nextY < 0 ||
        nextY > rooms[0].length - 1 ||
        rooms[nextX][nextY] !== EMPTY
      ) {
        continue;
      }

      rooms[nextX][nextY] = rooms[currentX][currentY] + 1;
      queue.push([nextX, nextY]);
    }
  }
};
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
// Time: O(m·n) · Space: O(1)
var findDiagonalOrder = function(mat) {
  if (mat.length === 1) return mat.flat();

  let row = mat.length;
  let col = mat[0].length;

  let res = Array.from(Array(row + col - 1), () => new Array().fill([]));

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if ((i + j) % 2 === 0) {
        res[i + j].unshift(mat[i][j]);
      } else {
        res[i + j].push(mat[i][j]);
      }
    }
  }

  return res.flat();
};
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
// Time: O(m·n) · Space: O(m·n)
// Graph DFS — from oceans inland
var pacificAtlantic = function(heights) {
  let m = heights.length;
  let n = heights[0].length;

  let pacificQueue = [];
  let atlanticQueue = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0) {
        pacificQueue.push([i, j]);
      }
      if (i === m - 1 || j === n - 1) {
        atlanticQueue.push([i, j]);
      }
    }
  }

  function bfs(queue) {
    const isValid = (x, y) => x >= 0 && y >= 0 && x < m && y < n;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const visited = Array.from(Array(m), () => new Array(n).fill(false));

    while (queue.length) {
      const [x, y] = queue.shift();
      visited[x][y] = true;

      for (let dir of directions) {
        let nextX = x + dir[0];
        let nextY = y + dir[1];
        if (!isValid(nextX, nextY) || visited[nextX][nextY]) continue;
        if (heights[nextX][nextY] >= heights[x][y]) {
          queue.push([nextX, nextY]);
        }
      }
    }

    return visited;
  }

  const pacific = bfs(pacificQueue);
  const atlantic = bfs(atlanticQueue);

  const result = [];

  for (let x = 0; x < m; x++) {
    for (let y = 0; y < n; y++) {
      if (pacific[x][y] && atlantic[x][y]) {
        result.push([x, y]);
      }
    }
  }

  return result;
};
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
// Time: O(m·n) · Space: O(m·n)
// Graph DFS — flood fill
var numIslands = function(grid) {
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "1") {
        count = count + dfs(grid, i, j);
      }
    }
  }

  function dfs(grid, row, col) {
    // base cases
    if (
      row < 0 ||
      row > grid.length - 1 ||
      col < 0 ||
      col > grid[row].length - 1 ||
      grid[row][col] === "0"
    ) {
      return;
    }

    grid[row][col] = "0";

    dfs(grid, row + 1, col);
    dfs(grid, row - 1, col);
    dfs(grid, row, col + 1);
    dfs(grid, row, col - 1);

    return 1;
  }

  return count;
};
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
// Time: O(max(|x|,|y|)²) · Space: O(max(|x|,|y|)²)
var minKnightMoves = function(x, y) {
  let dir = [
    [-2, -1], [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1],
  ];

  let seen = new Set();
  let queue = [[0, 0]];
  let steps = 0;

  while (queue.length) {
    let next = [];
    while (queue.length) {
      let current = queue.shift();
      let currentX = current[0];
      let currentY = current[1];

      if (currentX === x && currentY === y) return steps;

      for (let d of dir) {
        let nextX = currentX + d[0];
        let nextY = currentY + d[1];

        if (!seen.has(nextX + "," + nextY)) {
          seen.add(nextX + "," + nextY);
          next.push([nextX, nextY]);
        }
      }
    }
    steps++;
    queue = next;
  }
};
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
// Time: O(n²) · Space: O(n²)
var shortestPathBinaryMatrix = function(grid) {
  if (grid[0][0] === 1) return -1;

  let dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  let queue = [[0, 0, 1]];
  grid[0][0] = 1;

  while (queue.length) {
    let [currX, currY, count] = queue.shift();

    if (currX === grid.length - 1 && currY === grid[0].length - 1) {
      return count;
    }

    for (let [x, y] of dirs) {
      let [nextX, nextY] = [currX + x, currY + y];

      if (
        nextX < 0 ||
        nextX > grid.length - 1 ||
        nextY < 0 ||
        nextY > grid[0].length - 1 ||
        grid[nextX][nextY] === 1
      )
        continue;

      queue.push([nextX, nextY, count + 1]);
      grid[nextX][nextY] = 1;
    }
  }

  return -1;
};
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
// Time: O(m·n) · Space: O(m·n)
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function(mat) {
    let dirs = [[0,-1],[0,1],[1,0],[-1,0]];
    let queue = [];
    
    for(let i = 0; i < mat.length; i++){
        for(let j = 0; j < mat[0].length; j++){
            if(mat[i][j] === 0){
                queue.push([i, j, 0]);
            } else {
                mat[i][j] = Infinity;
            }
        }
    }
    
    //bfs
    
    while(queue.length){
        let [currX, currY, dist] = queue.shift();
        
        if(mat[currX][currY] > dist){
            mat[currX][currY] = dist;
        }
        
        for(let [x, y] of dirs){
            let [nextX, nextY, nextVal] = [currX+x, currY+y, dist+1];
            
            if(nextX < 0 || nextX > mat.length-1 || nextY < 0 || nextY > mat[0].length-1) continue;
            
            if(mat[nextX][nextY] === Infinity){
                mat[nextX][nextY] = nextVal;
                queue.push([nextX, nextY, nextVal])
            }
        }
    }
    
    return mat;
};
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
// Time: O(m·n·4^L) · Space: O(ΣL)
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
    let result = [];
    let root = buildTrie(words);
    
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            dfs(root, i, j, result, board)
        }
    }
    
    return result;
};

function dfs(node, i, j, result, board){
    if(node.word){
        result.push(node.word);
        node.word = null;
    }
    
    if(i < 0 || j < 0 || i > board.length-1 || j > board[0].length-1) return;
    if(!node[board[i][j]]) return;
    
    let c = board[i][j];
    board[i][j] = '#';
    dfs(node[c], i+1, j, result, board);
    dfs(node[c], i-1, j, result, board);
    dfs(node[c], i, j+1, result, board);
    dfs(node[c], i, j-1, result, board);
    board[i][j] = c;
}

function buildTrie(words){
    let root = {};
    
    for(let word of words){
        let currNode = root;
        
        for(let char of word){
            if(!currNode[char]) currNode[char] = {};
            currNode = currNode[char];
        }
        currNode.word = word;
    }
    
    return root;
}
\`\`\``,
    },
      ],
    },
  ],
};

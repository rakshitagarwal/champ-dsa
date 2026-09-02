# Trie

**Definition:** A trie (prefix tree) is a rooted tree where each edge is a character and each path from the root spells a prefix. Nodes share prefixes — `"app"` and `"apple"` share `a-p-p`. Each node has a `children` map and an `isEnd` flag ("a word ends here").

**When to use:** Prefix search, autocomplete, word dictionary with `.` wildcard, or counting words with a given prefix. Faster than hashing for prefix ops — `O(L)` per word (`L` = length).

**How it works:** `insert(word)` walks/creates nodes per character; `search(word)` needs `isEnd`; `startsWith(prefix)` only needs the walk to succeed. For board search, DFS follows trie edges and collects words. Time `O(L)` per op, space `O(total chars)`.

```js
// Trie skeleton — node + insert / search / startsWith
function node() { return { kids: Object.create(null), end: false }; }
const root = node();
function insert(word) {
  let cur = root;
  for (const ch of word) { if (!cur.kids[ch]) cur.kids[ch] = node(); cur = cur.kids[ch]; }
  cur.end = true;
}
function search(word) {
  let cur = root;
  for (const ch of word) { if (!cur.kids[ch]) return false; cur = cur.kids[ch]; }
  return cur.end;
}
function startsWith(pref) {
  let cur = root;
  for (const ch of pref) { if (!cur.kids[ch]) return false; cur = cur.kids[ch]; }
  return true;
}
```

## Implement Trie

`insert` walks/creates edges. `search` needs `end`. `startsWith` only needs the walk to succeed.

[Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)

```js
// Trie — insert / search / prefix
// LC: https://leetcode.com/problems/implement-trie-prefix-tree/
function Trie() {
  this.root = { kids: Object.create(null), end: false };
}
Trie.prototype.insert = function (word) {
  let cur = this.root;
  for (const ch of word) {
    if (!cur.kids[ch]) cur.kids[ch] = { kids: Object.create(null), end: false };
    cur = cur.kids[ch];
  }
  cur.end = true;
};
Trie.prototype.search = function (word) {
  let cur = this.root;
  for (const ch of word) {
    if (!cur.kids[ch]) return false;
    cur = cur.kids[ch];
  }
  return !!cur.end;
};
Trie.prototype.startsWith = function (prefix) {
  let cur = this.root;
  for (const ch of prefix) {
    if (!cur.kids[ch]) return false;
    cur = cur.kids[ch];
  }
  return true;
};
```

## Word Search II

Build a trie of all words. DFS the board. Follow trie edges. When `end` is set, I found a word — push it and clear `end` so I do not add twice. Unmark the cell when I backtrack.

[Word Search II](https://leetcode.com/problems/word-search-ii/)

```js
// Trie + DFS on the grid
// LC: https://leetcode.com/problems/word-search-ii/
function findWords(board, words) {
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
```

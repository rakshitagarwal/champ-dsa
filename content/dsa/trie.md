# Trie

**Definition:** Trie (prefix tree) ek rooted tree hai jahan har edge ek character hai aur root se path ek prefix banata hai. Nodes prefix share karte hain — `"app"` aur `"apple"` ka `a-p-p` same. Har node me `children` map aur `isEnd` flag ("shabd yahan khatam").

**When to use:** Prefix search, autocomplete, `.` wildcard wala dictionary, ya diye prefix se shuru hone wale words ginna. Prefix ops me hashing se tez — `O(L)` per word (`L` = length).

**How it works:** `insert(word)` har char par node walk/create; `search(word)` ko `isEnd` chahiye; `startsWith(prefix)` bas walk success chahiye. Board search me DFS trie edges follow karke words collect. Time `O(L)` per op, space `O(total chars)`.

```js
// Trie skeleton — node + insert / search / startsWith
// Hinglish: har char par node banao/traverse karo
function node() { return { kids: Object.create(null), end: false }; }
const root = node();
function insert(word) {
  let cur = root;
  for (const ch of word) { if (!cur.kids[ch]) cur.kids[ch] = node(); cur = cur.kids[ch]; }
  cur.end = true; // shabd khatam
}
function search(word) {
  let cur = root;
  for (const ch of word) { if (!cur.kids[ch]) return false; cur = cur.kids[ch]; }
  return cur.end; // end flag check
}
function startsWith(pref) {
  let cur = root;
  for (const ch of pref) { if (!cur.kids[ch]) return false; cur = cur.kids[ch]; }
  return true; // walk ho gaya to prefix hai
}
```
## Implement Trie

`insert` walks/creates edges. `search` needs `end`. `startsWith` only needs the walk to succeed.

[Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)

```js
// Hinglish: trie walk — ek-ek step comment dekho
// Trie — insert / search / prefix
// LC: https://leetcode.com/problems/implement-trie-prefix-tree/
function Trie() {
  // Hinglish: step 1 — base case check karo
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
```

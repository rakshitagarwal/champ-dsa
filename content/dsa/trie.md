# Trie

**Definition:** Trie (prefix tree) ek rooted tree hai jahan har edge ek character hai aur root se path ek prefix banata hai. Nodes prefix share karte hain — `"app"` aur `"apple"` ka `a-p-p` same. Har node me `children` map aur `isEnd` flag ("shabd yahan khatam").

**When to use:** Prefix search, autocomplete, `.` wildcard wala dictionary, ya diye prefix se shuru hone wale words ginna. Prefix ops me hashing se tez — `O(L)` per word (`L` = length).

**How it works:** `insert(word)` har char par node walk/create; `search(word)` ko `isEnd` chahiye; `startsWith(prefix)` bas walk success chahiye. Board search me DFS trie edges follow karke words collect. Time `O(L)` per op, space `O(total chars)`.

```js
// Trie skeleton — node + insert / search / startsWith
// for each character, create or walk to the next trie node
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
  return true; // reached end of word — prefix exists
}
```
## Implement Trie

`insert` walks/creates edges. `search` needs `end`. `startsWith` only needs the walk to succeed.

[Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)

```js
// Trie — insert / search / prefix
// LC: https://leetcode.com/problems/implement-trie-prefix-tree/
function Trie() {
  // Root has no letters; children map lives on kids
  this.root = { kids: Object.create(null), end: false };
}
Trie.prototype.insert = function (word) {
  // Walk from root, creating missing edges as we go
  let cur = this.root;
  for (const ch of word) {
    // Lazy-create child node for this character
    if (!cur.kids[ch]) cur.kids[ch] = { kids: Object.create(null), end: false };
    cur = cur.kids[ch];
  }
  // Mark full word — search requires this flag
  cur.end = true;
};
Trie.prototype.search = function (word) {
  let cur = this.root;
  for (const ch of word) {
    // Missing edge means word not in trie
    if (!cur.kids[ch]) return false;
    cur = cur.kids[ch];
  }
  // Prefix walk ok but must be a complete word
  return !!cur.end;
};
Trie.prototype.startsWith = function (prefix) {
  let cur = this.root;
  for (const ch of prefix) {
    if (!cur.kids[ch]) return false;
    cur = cur.kids[ch];
  }
  // Any path that reaches here is a valid prefix
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
  // Store matched word at terminal node (not just a boolean)
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
    // No trie edge for this cell letter — prune
    if (!next) return;
    if (next.word) {
      ans.push(next.word);
      // Clear so same word is not collected again on other paths
      next.word = null;
    }
    // Mark visited for this DFS path
    board[r][c] = "#";
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || board[nr][nc] === "#") continue;
      dfs(nr, nc, next);
    }
    // Restore cell when backtracking
    board[r][c] = ch;
  };
  // Start DFS from every cell
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) dfs(r, c, root);
  }
  return ans;
}
```

## Design Add and Search Words Data Structure

Trie me `.` wildcard search bhi chahiye. DFS se har child try karo.

[Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)

```js
// LC: https://leetcode.com/problems/design-add-and-search-words-data-structure/
function WordDictionary(){ this.root={kids:{}, end:false}; }
WordDictionary.prototype.addWord=function(word){
  // Standard trie insert — same as LC 208
  let cur=this.root;
  for(const ch of word){
    if(!cur.kids[ch]) cur.kids[ch]={kids:{}, end:false};
    cur=cur.kids[ch];
  }
  cur.end=true;
};
WordDictionary.prototype.search=function(word){
  // DFS on trie; index i tracks position in query
  const dfs=(node,i)=>{
    // Consumed entire string — success only if word ends here
    if(i===word.length) return node.end;
    const ch=word[i];
    // Dot matches any single letter — try every child branch
    if(ch==='.'){ for(const kid in node.kids) if(dfs(node.kids[kid], i+1)) return true; return false; }
    if(!node.kids[ch]) return false;
    return dfs(node.kids[ch], i+1);
  };
  return dfs(this.root,0);
};
```

## Longest Word in Dictionary

Sab prefixes wale words me se sabse lamba (lexicographically chhota tie me). Trie/ Set se check.

[Longest Word in Dictionary](https://leetcode.com/problems/longest-word-in-dictionary/)

```js
// LC: https://leetcode.com/problems/longest-word-in-dictionary/
function longestWord(words) {
  // set in saare words
  const set=new Set(words);
  let best="";
  for(const w of words){
    let ok=true;
    for(let i=1;i<w.length;i++) if(!set.has(w.slice(0,i))) ok=false; // every proper prefix must also be in the dictionary
    if(!ok) continue;
    if(w.length>best.length || (w.length===best.length && w<best)) best=w; // pick longest word; tie-break lexicographically smallest
  }
  return best;
}
```

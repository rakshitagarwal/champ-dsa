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

## Design Add and Search Words Data Structure

Trie me `.` wildcard search bhi chahiye. DFS se har child try karo.

[Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)

```js
// Hinglish: trie walk — ek-ek step comment dekho
// LC: https://leetcode.com/problems/design-add-and-search-words-data-structure/
function WordDictionary(){ this.root={kids:{}, end:false}; }
WordDictionary.prototype.addWord=function(word){
  // Hinglish: insert
  let cur=this.root;
  for(const ch of word){ if(!cur.kids[ch]) cur.kids[ch]={kids:{}, end:false}; cur=cur.kids[ch]; }
  cur.end=true; // Hinglish: khatam
};
WordDictionary.prototype.search=function(word){
  // Hinglish: DFS
  const dfs=(node,i)=>{
    if(i===word.length) return node.end;
    const ch=word[i];
    if(ch==='.'){ for(const kid in node.kids) if(dfs(node.kids[kid], i+1)) return true; return false; } // Hinglish: har rasta try
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
// Hinglish: trie walk — ek-ek step comment dekho
// LC: https://leetcode.com/problems/longest-word-in-dictionary/
function longestWord(words) {
  // Hinglish: set me saare words
  const set=new Set(words);
  let best="";
  for(const w of words){
    let ok=true;
    for(let i=1;i<w.length;i++) if(!set.has(w.slice(0,i))) ok=false; // Hinglish: har prefix hai kya?
    if(!ok) continue;
    if(w.length>best.length || (w.length===best.length && w<best)) best=w; // Hinglish: lamba ya lexicographically chhota
  }
  return best;
}
```

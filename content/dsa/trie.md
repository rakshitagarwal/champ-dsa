# Trie

**Definition:** Trie (prefix tree) ek rooted tree hai jahan har edge ek character hai aur root se path ek prefix banata hai. Nodes prefix share karte hain — `"app"` aur `"apple"` ka `a-p-p` same. Har node me `children` map aur `isEnd` flag ("shabd yahan khatam").

**When to use:** Prefix search, autocomplete, `.` wildcard wala dictionary, ya diye prefix se shuru hone wale words ginna. Prefix ops me hashing se tez — `O(L)` per word (`L` = length).

**How it works:** `insert(word)` har char par node walk/create; `search(word)` ko `isEnd` chahiye; `startsWith(prefix)` bas walk success chahiye. Board search me DFS trie edges follow karke words collect. Time `O(L)` per op, space `O(total chars)`.

## Study notes

- **Node:** `children` map + `isEnd` (or `end` flag).
- **insert / search / startsWith** — three standard APIs.
- **Wildcard `.`:** try every child (Design Add/Search Words).
- **Word Search II:** trie + board DFS; prune dead ends.
- **Traps:** mark `isEnd` only at last char; mutate board without restore.
- **Checklist:** prefix share? many queries on same dict?

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
// Time: O(L) · Space: O(ΣL)
// children map; end flag
/**
 * Initialize your data structure here.
 */
var Trie = function() {
    this.root = {};
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let node = this.root;
    
    for(let c of word){
        if(node[c] == null) node[c] = {};
        node = node[c];
    }
    node.isWord = true;
};

/**
 * @return {boolean}
 */
Trie.prototype.traverse = function(word) {
    let node = this.root;
    
    for(let c of word){
        node = node[c];
        if(node == null) return null;
    }
    return node;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let node = this.traverse(word);
    
    return node !== null && node.isWord === true;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let node = this.traverse(prefix);
    return node !== null;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
```

## Word Search II

Build a trie of all words. DFS the board. Follow trie edges. When `end` is set, I found a word — push it and clear `end` so I do not add twice. Unmark the cell when I backtrack.

[Word Search II](https://leetcode.com/problems/word-search-ii/)

```js
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
```

## Design Add and Search Words Data Structure

Trie me `.` wildcard search bhi chahiye. DFS se har child try karo.

[Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)

```js
// Time: O(L) · Space: O(ΣL)
// '.' branches to every child
var WordDictionary = function() {
    this.trie = {};
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let node = this.trie;
    for(let char of word){
        if(node[char] == null) node[char] = {};
        node = node[char];
    }
    node.isEnd = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.dfs = function(word, trie, index) {
    
    //base case
    if(word.length === index){
        return trie.isEnd ? true : false;
    }
    
    let char = word[index];
    
    if(char === "."){
        for(let key in trie){
            if(key === "isEnd") continue;
            if(this.dfs(word, trie[key], index+1)) return true;
        }
    } else {
        if(trie[char] != null){
            return this.dfs(word, trie[char], index+1);
        }
    }
    
    return false;
    
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    return this.dfs(word, this.trie, 0);
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
```

## Longest Word in Dictionary

Sab prefixes wale words me se sabse lamba (lexicographically chhota tie me). Trie/ Set se check.

[Longest Word in Dictionary](https://leetcode.com/problems/longest-word-in-dictionary/)

```js
// Time: O(n) · Space: O(n)
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

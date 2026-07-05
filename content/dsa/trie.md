# Trie (Prefix Tree)

A tree data structure that stores strings character by character, enabling efficient prefix-based lookups.

## When to use
- Autocomplete / prefix matching
- Word dictionary with fast insert, search, and prefix checks
- Replace words by shortest prefix root
- Batch word search in a grid or stream

## How it works

Each node holds a map of child characters and a flag marking the end of a word. Insert builds a path of nodes for each character of the word. Search traverses the path; if a character is missing the word/prefix does not exist. Since common prefixes share nodes, tries use memory proportional to total characters stored.

```js
class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return true;
  }
}
```

## Practice problems
- [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/) — Build the trie with insert, search, startsWith
- [Word Search II](https://leetcode.com/problems/word-search-ii/) — Trie-guided DFS on grid for multi-word search
- [Replace Words](https://leetcode.com/problems/replace-words/) — Replace words with shortest prefix root using trie
- [Longest Word in Dictionary](https://leetcode.com/problems/longest-word-in-dictionary/) — Find longest word where every prefix is in the trie

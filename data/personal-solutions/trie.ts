import type { SolutionGroup } from "@/data/solutions/types";

export const TRIE_SOLUTIONS: SolutionGroup = {
  id: "trie",
  title: "Trie",
  subs: [
    {
      title: "Foundation",
      topics: [
    {
      id: 208,
      lcSlug: "implement-trie-prefix-tree",
      title: "Implement Trie (Prefix Tree)",
      diff: "Medium",
      body: "`insert` walks/creates edges. `search` needs `end`. `startsWith` only needs the walk to succeed.\n\n[Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)\n\n```js\n// Time: O(L) · Space: O(ΣL)\n/**\n * Initialize your data structure here.\n */\nvar Trie = function() {\n    this.root = {};\n};\n\n/**\n * Inserts a word into the trie.\n * @param {string} word\n * @return {void}\n */\nTrie.prototype.insert = function(word) {\n    let node = this.root;\n    \n    for(let c of word){\n        if(node[c] == null) node[c] = {};\n        node = node[c];\n    }\n    node.isWord = true;\n};\n\n/**\n * @return {boolean}\n */\nTrie.prototype.traverse = function(word) {\n    let node = this.root;\n    \n    for(let c of word){\n        node = node[c];\n        if(node == null) return null;\n    }\n    return node;\n};\n\n/**\n * @param {string} word\n * @return {boolean}\n */\nTrie.prototype.search = function(word) {\n    let node = this.traverse(word);\n    \n    return node !== null && node.isWord === true;\n};\n\n/**\n * @param {string} prefix\n * @return {boolean}\n */\nTrie.prototype.startsWith = function(prefix) {\n    let node = this.traverse(prefix);\n    return node !== null;\n};\n\n/**\n * Your Trie object will be instantiated and called as such:\n * var obj = new Trie()\n * obj.insert(word)\n * var param_2 = obj.search(word)\n * var param_3 = obj.startsWith(prefix)\n */\n```",
    },
    {
      id: 211,
      lcSlug: "design-add-and-search-words-data-structure",
      title: "Design Add and Search Words Data Structure",
      diff: "Medium",
      body: "Trie me `.` wildcard search bhi chahiye. DFS se har child try karo.\n\n[Design Add And Search Word Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)\n\n```js\n// Time: O(L) · Space: O(ΣL)\nvar WordDictionary = function() {\n    this.trie = {};\n};\n\n/**\n * @param {string} word\n * @return {void}\n */\nWordDictionary.prototype.addWord = function(word) {\n    let node = this.trie;\n    for(let char of word){\n        if(node[char] == null) node[char] = {};\n        node = node[char];\n    }\n    node.isEnd = true;\n};\n\n/**\n * @param {string} word\n * @return {boolean}\n */\nWordDictionary.prototype.dfs = function(word, trie, index) {\n    \n    //base case\n    if(word.length === index){\n        return trie.isEnd ? true : false;\n    }\n    \n    let char = word[index];\n    \n    if(char === \".\"){\n        for(let key in trie){\n            if(key === \"isEnd\") continue;\n            if(this.dfs(word, trie[key], index+1)) return true;\n        }\n    } else {\n        if(trie[char] != null){\n            return this.dfs(word, trie[char], index+1);\n        }\n    }\n    \n    return false;\n    \n};\n\n/**\n * @param {string} word\n * @return {boolean}\n */\nWordDictionary.prototype.search = function(word) {\n    return this.dfs(word, this.trie, 0);\n};\n\n/**\n * Your WordDictionary object will be instantiated and called as such:\n * var obj = new WordDictionary()\n * obj.addWord(word)\n * var param_2 = obj.search(word)\n */\n```",
    },
      ],
    },
    {
      title: "Medium",
      topics: [
    {
      id: 648,
      lcSlug: "replace-words",
      title: "Replace Words",
      diff: "Medium",
      body: "Trie of dictionary — sentence me pehla root prefix replace.\n\n[Replace Words](https://leetcode.com/problems/replace-words/)\n\n```js\n// Time: O(total chars) · Space: O(dict)\nvar replaceWords = function(dictionary, sentence) {\n  const root = {};\n  for (const w of dictionary) {\n    let node = root;\n    for (const ch of w) {\n      if (!node[ch]) node[ch] = {};\n      node = node[ch];\n    }\n    node.end = true;\n  }\n  const replace = (word) => {\n    let node = root, pref = \"\";\n    for (const ch of word) {\n      if (!node[ch]) return word;\n      node = node[ch];\n      pref += ch;\n      if (node.end) return pref;\n    }\n    return word;\n  };\n  return sentence.split(\" \").map(replace).join(\" \");\n};\n```",
    },
    {
      id: 677,
      lcSlug: "map-sum-pairs",
      title: "Map Sum Pairs",
      diff: "Medium",
      body: "Trie with score on nodes — insert overwrite, prefix sum traverse.\n\n[Map Sum Pairs](https://leetcode.com/problems/map-sum-pairs/)\n\n```js\n// Time: O(L) · Space: O(total)\nvar MapSum = function() {\n  this.root = {};\n  this.map = new Map();\n};\nMapSum.prototype.insert = function(key, val) {\n  const delta = val - (this.map.get(key) || 0);\n  this.map.set(key, val);\n  let node = this.root;\n  for (const ch of key) {\n    if (!node[ch]) node[ch] = { sum: 0 };\n    node = node[ch];\n    node.sum = (node.sum || 0) + delta;\n  }\n};\nMapSum.prototype.sum = function(prefix) {\n  let node = this.root;\n  for (const ch of prefix) {\n    if (!node[ch]) return 0;\n    node = node[ch];\n  }\n  return node.sum || 0;\n};\n```",
    },
      ],
    },
    {
      title: "Advanced",
      topics: [
    {
      id: 212,
      lcSlug: "word-search-ii",
      title: "Word Search II",
      diff: "Hard",
      body: "Build a trie of all words. DFS the board. Follow trie edges. When `end` is set, I found a word — push it and clear `end` so I do not add twice. Unmark the cell when I backtrack.\n\n[Word Search II](https://leetcode.com/problems/word-search-ii/)\n\n```js\n// Time: O(m·n·4^L) · Space: O(ΣL)\n/**\n * @param {character[][]} board\n * @param {string[]} words\n * @return {string[]}\n */\nvar findWords = function(board, words) {\n    let result = [];\n    let root = buildTrie(words);\n    \n    for(let i = 0; i < board.length; i++){\n        for(let j = 0; j < board[0].length; j++){\n            dfs(root, i, j, result, board)\n        }\n    }\n    \n    return result;\n};\n\nfunction dfs(node, i, j, result, board){\n    if(node.word){\n        result.push(node.word);\n        node.word = null;\n    }\n    \n    if(i < 0 || j < 0 || i > board.length-1 || j > board[0].length-1) return;\n    if(!node[board[i][j]]) return;\n    \n    let c = board[i][j];\n    board[i][j] = '#';\n    dfs(node[c], i+1, j, result, board);\n    dfs(node[c], i-1, j, result, board);\n    dfs(node[c], i, j+1, result, board);\n    dfs(node[c], i, j-1, result, board);\n    board[i][j] = c;\n}\n\nfunction buildTrie(words){\n    let root = {};\n    \n    for(let word of words){\n        let currNode = root;\n        \n        for(let char of word){\n            if(!currNode[char]) currNode[char] = {};\n            currNode = currNode[char];\n        }\n        currNode.word = word;\n    }\n    \n    return root;\n}\n```",
    },
    {
      id: 421,
      lcSlug: "maximum-xor-of-two-numbers-in-an-array",
      title: "Maximum XOR of Two Numbers in an Array",
      diff: "Medium",
      body: "Bit Trie — har number insert, max XOR path prefer opposite bits.\n\n[Maximum XOR of Two Numbers in an Array](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/)\n\n```js\n// Time: O(32n) · Space: O(32n)\nvar findMaximumXOR = function(nums) {\n  const root = {};\n  const insert = (num) => {\n    let node = root;\n    for (let b = 31; b >= 0; b--) {\n      const bit = (num >> b) & 1;\n      if (!node[bit]) node[bit] = {};\n      node = node[bit];\n    }\n  };\n  const query = (num) => {\n    let node = root, xor = 0;\n    for (let b = 31; b >= 0; b--) {\n      const bit = (num >> b) & 1;\n      const want = 1 - bit;\n      if (node[want]) {\n        xor |= 1 << b;\n        node = node[want];\n      } else node = node[bit];\n    }\n    return xor;\n  };\n  let best = 0;\n  for (const n of nums) {\n    insert(n);\n    best = Math.max(best, query(n));\n  }\n  return best;\n};\n```",
    },
      ],
    },
  ],
};

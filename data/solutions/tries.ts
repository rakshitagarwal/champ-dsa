import type { SolutionGroup } from "./types";

export const TRIES_SOLUTIONS: SolutionGroup = {
  id: "tries",
  title: "Tries",
  subs: [
    {
      title: "Questions",
      topics: [
    {
      id: 0,
      lcSlug: "implement-trie-prefix-tree",
      title: "Implement Trie (Prefix Tree)",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=AcFHT2l1b3E&t=1s&ab_channel=AlgoJS",
      body: `\`insert\` walks/creates edges. \`search\` needs \`end\`. \`startsWith\` only needs the walk to succeed.

[Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)

\`\`\`js
// Time: O(L) · Space: O(ΣL)
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
\`\`\``,
    },
    {
      id: 1,
      lcSlug: "design-add-and-search-words-data-structure",
      title: "Design Add And Search Word Data Structure",
      diff: "Medium",
    solutionUrl: "https://www.youtube.com/watch?v=zDyoxl29yns&ab_channel=AlgoJS",
      body: `Trie me \`.\` wildcard search bhi chahiye. DFS se har child try karo.

[Design Add And Search Word Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)

\`\`\`js
// Time: O(L) · Space: O(ΣL)
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
\`\`\``,
    },
      ],
    },
  ],
};

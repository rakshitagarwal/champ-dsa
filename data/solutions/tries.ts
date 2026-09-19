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
\`\`\``,
    },
      ],
    },
  ],
};

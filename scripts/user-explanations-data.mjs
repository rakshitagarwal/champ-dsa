/**
 * Manual explanation overrides (sheet question number → commentary).
 * Most questions use buildParagraphExplanation in generate-sheet-explanations.mjs.
 */
export const USER_EXPLANATIONS_BY_NUM = {
  115: {
    summary:
      "Sheet #115 — Search in a Binary Search Tree. You are given the root of a BST and an integer `val`; return the node whose value equals `val` (the whole subtree rooted there), or `null` if it does not exist. Your `searchBST` is the standard recursive BST lookup: compare at the current node, then go left or right using the BST ordering rule.",
    whyItWorks:
      "A BST stores smaller keys in the left subtree and larger keys in the right subtree. That property means there is at most one valid search path from the root to any value—you never explore both sides at the same level.\n\nYour base case handles both outcomes cleanly: if `root` is `null`, the value is absent; if `root.val === val`, you found the node and return it (LeetCode wants that node as the answer subtree). Otherwise you compare `val` with `root.val` and recurse only into the left child when the target is smaller, or the right child when it is larger. Each recursive call works on a strictly smaller subtree, so the search stops after at most h steps where h is the tree height.",
    howExamplesAreSatisfied:
      "For `root = [4,2,7,1,3]` and `val = 2`: start at 4. Since 2 < 4, recurse into the left child (2). At node 2, `root.val === val`, so return that node—the subtree `[2,1,3]`. For `val = 5` you would go right from 4 to 7, then right again into an empty child and return `null`.",
    keyIdeas: [
      "BST ordering cuts the search space each level",
      "Base case: null (missing) or val match (found)",
      "Time O(h), space O(h) recursion depth",
      "Iterative while-loop variant is equivalent",
    ],
  },
};

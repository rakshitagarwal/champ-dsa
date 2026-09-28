import type { SolutionGroup } from "@/data/solutions/types";
import { TWO_POINTERS_SOLUTIONS } from "./two-pointers";
import { SLIDING_WINDOW_SOLUTIONS } from "./sliding-window";
import { BFS_SOLUTIONS } from "./bfs";
import { DFS_SOLUTIONS } from "./dfs";
import { BACKTRACKING_SOLUTIONS } from "./backtracking";
import { HEAP_SOLUTIONS } from "./heap";
import { BINARY_SEARCH_SOLUTIONS } from "./binary-search";
import { DYNAMIC_PROGRAMMING_SOLUTIONS } from "./dynamic-programming";
import { HASHING_SOLUTIONS } from "./hashing";
import { STACK_SOLUTIONS } from "./stack";
import { LINKED_LIST_SOLUTIONS } from "./linked-list";
import { TREES_SOLUTIONS } from "./trees";
import { GRAPHS_SOLUTIONS } from "./graphs";
import { PREFIX_SUM_SOLUTIONS } from "./prefix-sum";
import { INTERVALS_SOLUTIONS } from "./intervals";
import { GREEDY_SOLUTIONS } from "./greedy";
import { UNION_FIND_SOLUTIONS } from "./union-find";
import { TRIE_SOLUTIONS } from "./trie";
import { BIT_MANIPULATION_SOLUTIONS } from "./bit-manipulation";
import { DIVIDE_CONQUER_SOLUTIONS } from "./divide-conquer";

export const PERSONAL_SOLUTION_GROUPS: SolutionGroup[] = [
  TWO_POINTERS_SOLUTIONS,
  SLIDING_WINDOW_SOLUTIONS,
  BFS_SOLUTIONS,
  DFS_SOLUTIONS,
  BACKTRACKING_SOLUTIONS,
  HEAP_SOLUTIONS,
  BINARY_SEARCH_SOLUTIONS,
  DYNAMIC_PROGRAMMING_SOLUTIONS,
  HASHING_SOLUTIONS,
  STACK_SOLUTIONS,
  LINKED_LIST_SOLUTIONS,
  TREES_SOLUTIONS,
  GRAPHS_SOLUTIONS,
  PREFIX_SUM_SOLUTIONS,
  INTERVALS_SOLUTIONS,
  GREEDY_SOLUTIONS,
  UNION_FIND_SOLUTIONS,
  TRIE_SOLUTIONS,
  BIT_MANIPULATION_SOLUTIONS,
  DIVIDE_CONQUER_SOLUTIONS,
];

export const PERSONAL_SOLUTION_COUNT = PERSONAL_SOLUTION_GROUPS.reduce(
  (n, g) => n + g.subs.reduce((m, s) => m + s.topics.length, 0),
  0,
);

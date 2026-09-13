import type { SolutionGroup } from "./types";
import { ARRAYS_HASHING_SOLUTIONS } from "./arrays-hashing";
import { TWO_POINTERS_SOLUTIONS } from "./two-pointers";
import { SLIDING_WINDOW_SOLUTIONS } from "./sliding-window";
import { STACK_MONOTONIC_STACK_SOLUTIONS } from "./stack-monotonic-stack";
import { BINARY_SEARCH_SOLUTIONS } from "./binary-search";
import { LINKED_LIST_SOLUTIONS } from "./linked-list";
import { TREES_SOLUTIONS } from "./trees";
import { BST_SOLUTIONS } from "./bst";
import { HEAP_PRIORITY_QUEUE_SOLUTIONS } from "./heap-priority-queue";
import { INTERVALS_SOLUTIONS } from "./intervals";
import { GREEDY_SOLUTIONS } from "./greedy";
import { BACKTRACKING_SOLUTIONS } from "./backtracking";
import { GRAPHS_SOLUTIONS } from "./graphs";
import { SHORTEST_PATH_MST_SOLUTIONS } from "./shortest-path-mst";
import { DYNAMIC_PROGRAMMING_SOLUTIONS } from "./dynamic-programming";
import { TRIE_SOLUTIONS } from "./trie";
import { STRINGS_SOLUTIONS } from "./strings";
import { BIT_MANIPULATION_SOLUTIONS } from "./bit-manipulation";
import { MATH_GEOMETRY_SOLUTIONS } from "./math-geometry";
import { MATRIX_SOLUTIONS } from "./matrix";
import { DESIGN_DATA_STRUCTURES_SOLUTIONS } from "./design-data-structures";
import { ADVANCED_INTERVIEW_EXTRAS_SOLUTIONS } from "./advanced-interview-extras";

export const SOLUTION_GROUPS: SolutionGroup[] = [
  ARRAYS_HASHING_SOLUTIONS,
  TWO_POINTERS_SOLUTIONS,
  SLIDING_WINDOW_SOLUTIONS,
  STACK_MONOTONIC_STACK_SOLUTIONS,
  BINARY_SEARCH_SOLUTIONS,
  LINKED_LIST_SOLUTIONS,
  TREES_SOLUTIONS,
  BST_SOLUTIONS,
  HEAP_PRIORITY_QUEUE_SOLUTIONS,
  INTERVALS_SOLUTIONS,
  GREEDY_SOLUTIONS,
  BACKTRACKING_SOLUTIONS,
  GRAPHS_SOLUTIONS,
  SHORTEST_PATH_MST_SOLUTIONS,
  DYNAMIC_PROGRAMMING_SOLUTIONS,
  TRIE_SOLUTIONS,
  STRINGS_SOLUTIONS,
  BIT_MANIPULATION_SOLUTIONS,
  MATH_GEOMETRY_SOLUTIONS,
  MATRIX_SOLUTIONS,
  DESIGN_DATA_STRUCTURES_SOLUTIONS,
  ADVANCED_INTERVIEW_EXTRAS_SOLUTIONS,
];

export const SOLUTION_COUNT = SOLUTION_GROUPS.reduce(
  (n, g) => n + g.subs.reduce((m, s) => m + s.topics.length, 0),
  0,
);

import type { SolutionGroup } from "./types";
import { ARRAY_HASH_TABLES_SOLUTIONS } from "./array-hash-tables";
import { TWO_POINTER_SOLUTIONS } from "./two-pointer";
import { STACK_SOLUTIONS } from "./stack";
import { BINARY_SEARCH_SOLUTIONS } from "./binary-search";
import { STRING_SOLUTIONS } from "./string";
import { LINKED_LIST_SOLUTIONS } from "./linked-list";
import { MATRIX_SOLUTIONS } from "./matrix";
import { TREES_SOLUTIONS } from "./trees";
import { TRIES_SOLUTIONS } from "./tries";
import { BACKTRACKING_SOLUTIONS } from "./backtracking";
import { GRAPHS_SOLUTIONS } from "./graphs";
import { HEAPS_SOLUTIONS } from "./heaps";
import { INTERVALS_SOLUTIONS } from "./intervals";
import { DYNAMIC_PROGRAMMING_SOLUTIONS } from "./dynamic-programming";
import { BIT_MANIPULATION_SOLUTIONS } from "./bit-manipulation";

export const SOLUTION_GROUPS: SolutionGroup[] = [
  ARRAY_HASH_TABLES_SOLUTIONS,
  TWO_POINTER_SOLUTIONS,
  STACK_SOLUTIONS,
  BINARY_SEARCH_SOLUTIONS,
  STRING_SOLUTIONS,
  LINKED_LIST_SOLUTIONS,
  MATRIX_SOLUTIONS,
  TREES_SOLUTIONS,
  TRIES_SOLUTIONS,
  BACKTRACKING_SOLUTIONS,
  GRAPHS_SOLUTIONS,
  HEAPS_SOLUTIONS,
  INTERVALS_SOLUTIONS,
  DYNAMIC_PROGRAMMING_SOLUTIONS,
  BIT_MANIPULATION_SOLUTIONS,
];

export const SOLUTION_COUNT = SOLUTION_GROUPS.reduce(
  (n, g) => n + g.subs.reduce((m, s) => m + s.topics.length, 0),
  0,
);

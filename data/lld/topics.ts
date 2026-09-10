import type { LldGroup, LldTopic } from "./types";
import { FUNDAMENTALS } from "./fundamentals";
import { CREATIONAL } from "./creational";
import { STRUCTURAL } from "./structural";
import { BEHAVIORAL } from "./behavioral";
import { PROBLEMS } from "./problems";

export const LLD_GROUPS: LldGroup[] = [
  { id: "intro", title: "Start here" },
  { id: "patterns", title: "Patterns & Concepts" },
  { id: "questions", title: "Interview Questions" },
];

const INTRODUCTION: LldTopicWithNum = {
  slug: "introduction",
  title: "Introduction",
  tag: "Start here",
  short: "Introduction",
  group: "intro",
  num: 0,
  body: `These notes cover Low Level Design end to end: object-oriented fundamentals, SOLID principles, all major design patterns, and twelve classic interview problems with complete designs.

Start with the fundamentals, then learn each pattern family in order: creational, structural, behavioral. Finish with the interview questions, which combine everything. Every topic follows the same revision shape: short theory, a Java skeleton, and points to keep in mind.

The interview loop for any LLD problem stays constant. Clarify requirements first. List entities from the nouns in the statement. Define relationships between them. Apply SOLID principles and one or two patterns where they fit. Walk through a use case to prove the design works.

## Keep in mind

- HLD is about machines, LLD is about classes: state this line first.
- Nouns become classes, verbs become methods.
- Composition beats inheritance unless there is a true is-a relationship.
- One or two patterns per design is enough: forced patterns score negatively.
- Always close with a walkthrough of the happy path plus one edge case.`,
};

// Curriculum order (1-41)
const ORDER = [
  "what-is-lld",
  "solid-principles",
  "strategy-pattern",
  "observer-pattern",
  "decorator-pattern",
  "factory-vs-abstract-factory",
  "tic-tac-toe",
  "elevator-system",
  "car-rental-system",
  "chain-of-responsibility",
  "snake-and-ladder",
  "proxy-pattern",
  "null-object-pattern",
  "state-pattern-vending-machine",
  "parking-lot",
  "bookmyshow",
  "atm",
  "composite-pattern-file-system",
  "adapter-pattern",
  "splitwise",
  "builder-pattern",
  "cricbuzz",
  "facade-pattern",
  "bridge-pattern",
  "all-creational-patterns",
  "double-checked-locking",
  "inventory-management",
  "flyweight-word-processor",
  "command-undo-redo",
  "all-structural-patterns",
  "iterator-pattern",
  "mediator-auction-system",
  "coupons-shopping-cart",
  "visitor-pattern",
  "mvc-pattern",
  "memento-pattern",
  "template-method-pattern",
  "interpreter-pattern",
  "all-behavioral-patterns",
  "payment-gateway",
  "object-pool-pattern",
];

const SHORT_TITLES: Record<string, string> = {
  "what-is-lld": "What is LLD",
  "solid-principles": "SOLID Principles",
  "strategy-pattern": "Strategy",
  "observer-pattern": "Observer",
  "decorator-pattern": "Decorator",
  "factory-vs-abstract-factory": "Factory vs Abstract Factory",
  "tic-tac-toe": "Tic Tac Toe",
  "elevator-system": "Elevator System",
  "car-rental-system": "Car Rental",
  "chain-of-responsibility": "Chain of Responsibility",
  "snake-and-ladder": "Snake and Ladder",
  "proxy-pattern": "Proxy",
  "null-object-pattern": "Null Object",
  "state-pattern-vending-machine": "State + Vending Machine",
  "parking-lot": "Parking Lot",
  bookmyshow: "BookMyShow",
  atm: "ATM",
  "composite-pattern-file-system": "Composite + File System",
  "adapter-pattern": "Adapter",
  splitwise: "Splitwise",
  "builder-pattern": "Builder",
  cricbuzz: "Cricbuzz",
  "facade-pattern": "Facade",
  "bridge-pattern": "Bridge",
  "all-creational-patterns": "All Creational",
  "double-checked-locking": "Double-Checked Locking",
  "inventory-management": "Inventory Management",
  "flyweight-word-processor": "Flyweight",
  "command-undo-redo": "Command Undo/Redo",
  "all-structural-patterns": "All Structural",
  "iterator-pattern": "Iterator",
  "mediator-auction-system": "Mediator + Auction",
  "coupons-shopping-cart": "Coupons on Cart",
  "visitor-pattern": "Visitor",
  "mvc-pattern": "MVC",
  "memento-pattern": "Memento",
  "template-method-pattern": "Template Method",
  "interpreter-pattern": "Interpreter",
  "all-behavioral-patterns": "All Behavioral",
  "payment-gateway": "Payment Gateway",
  "object-pool-pattern": "Object Pool",
};

const QUESTION_SLUGS = new Set([
  "tic-tac-toe",
  "elevator-system",
  "car-rental-system",
  "snake-and-ladder",
  "parking-lot",
  "bookmyshow",
  "atm",
  "splitwise",
  "cricbuzz",
  "inventory-management",
  "coupons-shopping-cart",
  "payment-gateway",
]);

export type LldTopicWithNum = Omit<LldTopic, "short" | "group"> & {
  num: number;
  short: string;
  group: NonNullable<LldTopic["group"]>;
};

const BY_SLUG: Record<string, LldTopic> = {};
for (const t of [...FUNDAMENTALS, ...CREATIONAL, ...STRUCTURAL, ...BEHAVIORAL, ...PROBLEMS]) {
  BY_SLUG[t.slug] = t;
}

export const LLD_TOPICS: LldTopicWithNum[] = [
  INTRODUCTION,
  ...ORDER.map((slug, i) => {
    const t = BY_SLUG[slug];
    if (!t) throw new Error(`Missing LLD topic: ${slug}`);
    return {
      ...t,
      num: i + 1,
      short: SHORT_TITLES[slug] ?? t.title,
      group: QUESTION_SLUGS.has(slug) ? ("questions" as const) : ("patterns" as const),
    };
  }),
];

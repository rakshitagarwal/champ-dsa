import type { LldGroup, LldTopic } from "./types";
import { FUNDAMENTALS } from "./fundamentals";
import { CREATIONAL } from "./creational";
import { STRUCTURAL } from "./structural";
import { BEHAVIORAL } from "./behavioral";
import { PROBLEMS } from "./problems";
import { PROBLEMS2 } from "./problems2";

export const LLD_GROUPS: LldGroup[] = [
  { id: "intro", title: "Start here" },
  { id: "fundamentals", title: "A. OOP Fundamentals" },
  { id: "principles", title: "B. Design Principles" },
  { id: "creational", title: "C1. Creational" },
  { id: "structural", title: "C2. Structural" },
  { id: "behavioral", title: "C3. Behavioral" },
  { id: "design", title: "D. UML & Representation" },
  { id: "questions", title: "E. Coding Problems" },
];

const INTRODUCTION: LldTopicWithNum = {
  slug: "introduction",
  title: "Introduction",
  tag: "Start here",
  short: "Introduction",
  group: "intro",
  num: 0,
  body: `These notes cover Low Level Design in five groups: OOP fundamentals, design principles, design patterns, UML representation, and coding problems — all with TypeScript examples in plain English.

Start with group A to learn how objects relate, then group B for the principles behind good design. Group C teaches each pattern with a skeleton you can reuse. Group D shows how to draw designs so interviewers follow you. Finish with group E, which combines everything into complete interview builds.

Every topic follows the same revision shape: short theory, how it works, a TypeScript skeleton, a real-world scenario, when to use it, common mistakes, and points to keep in mind.

## The interview loop

The loop stays constant for any LLD problem. Clarify requirements and scope first. List entities from the nouns in the statement. Define relationships between them. Apply SOLID principles and one or two patterns where they genuinely fit. Walk through a use case to prove the design works.

## Keep in mind

- HLD is about machines, LLD is about classes: state this line first.
- Nouns become classes, verbs become methods.
- Composition beats inheritance unless there is a true is-a relationship.
- One or two patterns per design is enough: forced patterns score negatively.
- Always close with a walkthrough of the happy path plus one edge case.`,
};

// Curriculum order
const ORDER = [
  "what-is-lld",
  "classes-objects",
  "oop-pillars",
  "oop-relationships",
  "interfaces-abstract-classes",
  "dependency-injection",
  "solid-principles",
  "design-principles",
  "factory-method-pattern",
  "abstract-factory-pattern",
  "builder-pattern",
  "singleton-pattern",
  "prototype-pattern",
  "adapter-pattern",
  "bridge-pattern",
  "composite-pattern-file-system",
  "decorator-pattern",
  "facade-pattern",
  "flyweight-pattern",
  "proxy-pattern",
  "strategy-pattern",
  "observer-pattern",
  "chain-of-responsibility",
  "command-undo-redo",
  "state-pattern",
  "template-method-pattern",
  "iterator-pattern",
  "mediator-auction-system",
  "interpreter-pattern",
  "memento-pattern",
  "visitor-pattern",
  "uml-diagrams",
  "parking-lot",
  "elevator-system",
  "atm",
  "vending-machine",
  "library-system",
  "hotel-booking",
  "bookmyshow",
  "cab-booking",
  "food-delivery",
  "splitwise",
  "chess-game",
  "tic-tac-toe",
  "snake-and-ladder",
  "logger-system",
  "rate-limiter",
  "notification-system",
  "payment-system",
  "shopping-cart",
  "coupons-shopping-cart",
  "file-storage",
  "task-scheduler",
  "lru-cache",
  "pubsub-system",
  "meeting-scheduler",
  "ride-management",
];

const SHORT_TITLES: Record<string, string> = {
  "what-is-lld": "What is LLD",
  "classes-objects": "Classes & Objects",
  "oop-pillars": "OOP Pillars",
  "oop-relationships": "Relationships",
  "interfaces-abstract-classes": "Interfaces vs Abstract",
  "dependency-injection": "Dependency Injection",
  "solid-principles": "SOLID Principles",
  "design-principles": "Design Principles",
  "factory-method-pattern": "Factory Method",
  "abstract-factory-pattern": "Abstract Factory",
  "bridge-pattern": "Bridge",
  "flyweight-pattern": "Flyweight",
  "interpreter-pattern": "Interpreter",
  "memento-pattern": "Memento",
  "visitor-pattern": "Visitor",
  "builder-pattern": "Builder",
  "singleton-pattern": "Singleton",
  "prototype-pattern": "Prototype",
  "adapter-pattern": "Adapter",
  "decorator-pattern": "Decorator",
  "facade-pattern": "Facade",
  "proxy-pattern": "Proxy",
  "composite-pattern-file-system": "Composite + File System",
  "strategy-pattern": "Strategy",
  "observer-pattern": "Observer",
  "chain-of-responsibility": "Chain of Responsibility",
  "command-undo-redo": "Command Undo/Redo",
  "state-pattern": "State",
  "template-method-pattern": "Template Method",
  "iterator-pattern": "Iterator",
  "mediator-auction-system": "Mediator + Auction",
  "uml-diagrams": "UML Diagrams",
  "parking-lot": "Parking Lot",
  "elevator-system": "Elevator System",
  atm: "ATM",
  "vending-machine": "Vending Machine",
  "library-system": "Library System",
  "hotel-booking": "Hotel Booking",
  bookmyshow: "BookMyShow",
  "cab-booking": "Cab Booking",
  "food-delivery": "Food Delivery",
  splitwise: "Splitwise",
  "chess-game": "Chess Game",
  "tic-tac-toe": "Tic Tac Toe",
  "snake-and-ladder": "Snake and Ladder",
  "logger-system": "Logger System",
  "rate-limiter": "Rate Limiter",
  "notification-system": "Notifications",
  "payment-system": "Payment System",
  "shopping-cart": "Shopping Cart",
  "coupons-shopping-cart": "Coupons on Cart",
  "file-storage": "File Storage",
  "task-scheduler": "Task Scheduler",
  "lru-cache": "LRU Cache",
  "pubsub-system": "Pub-Sub System",
  "meeting-scheduler": "Meeting Scheduler",
  "ride-management": "Ride Management",
};

const GROUP_OF: Record<string, LldTopicWithNum["group"]> = {
  "what-is-lld": "intro",
  "classes-objects": "fundamentals",
  "oop-pillars": "fundamentals",
  "oop-relationships": "fundamentals",
  "interfaces-abstract-classes": "fundamentals",
  "dependency-injection": "fundamentals",
  "solid-principles": "fundamentals",
  "design-principles": "principles",
  "factory-method-pattern": "creational",
  "abstract-factory-pattern": "creational",
  "builder-pattern": "creational",
  "singleton-pattern": "creational",
  "prototype-pattern": "creational",
  "adapter-pattern": "structural",
  "bridge-pattern": "structural",
  "composite-pattern-file-system": "structural",
  "decorator-pattern": "structural",
  "facade-pattern": "structural",
  "flyweight-pattern": "structural",
  "proxy-pattern": "structural",
  "strategy-pattern": "behavioral",
  "observer-pattern": "behavioral",
  "chain-of-responsibility": "behavioral",
  "command-undo-redo": "behavioral",
  "state-pattern": "behavioral",
  "template-method-pattern": "behavioral",
  "iterator-pattern": "behavioral",
  "mediator-auction-system": "behavioral",
  "interpreter-pattern": "behavioral",
  "memento-pattern": "behavioral",
  "visitor-pattern": "behavioral",
  "uml-diagrams": "design",
  "parking-lot": "questions",
  "elevator-system": "questions",
  "atm": "questions",
  "vending-machine": "questions",
  "library-system": "questions",
  "hotel-booking": "questions",
  "bookmyshow": "questions",
  "cab-booking": "questions",
  "food-delivery": "questions",
  "splitwise": "questions",
  "chess-game": "questions",
  "tic-tac-toe": "questions",
  "snake-and-ladder": "questions",
  "logger-system": "questions",
  "rate-limiter": "questions",
  "notification-system": "questions",
  "payment-system": "questions",
  "shopping-cart": "questions",
  "coupons-shopping-cart": "questions",
  "file-storage": "questions",
  "task-scheduler": "questions",
  "lru-cache": "questions",
  "pubsub-system": "questions",
  "meeting-scheduler": "questions",
  "ride-management": "questions",
};

export type LldTopicWithNum = Omit<LldTopic, "short" | "group"> & {
  num: number;
  short: string;
  group: NonNullable<LldTopic["group"]>;
};

const BY_SLUG: Record<string, LldTopic> = {};
for (const t of [...FUNDAMENTALS, ...CREATIONAL, ...STRUCTURAL, ...BEHAVIORAL, ...PROBLEMS, ...PROBLEMS2]) {
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
      group: GROUP_OF[slug],
    };
  }),
];

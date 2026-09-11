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
  body: `Ye notes Low Level Design ko shuru se aakhir tak cover karte hain: object-oriented fundamentals, SOLID usool, saare major design patterns aur complete designs wale barah classic interview problems. Saare examples JavaScript me hain — JS me classes, Maps aur arrays se har pattern aaram se banta hai.

LLD seekhna kyun zaroori hai? Kyunki code likhne se pehle sochna sasta padta hai. Galat class structure production me technical debt banta hai — har nayi feature me kaam do guna hota hai. Interviews me LLD round tumhari OOP pakad test karta hai, aur senior roles me ye round aksar faisla karta hai.

Pehle fundamentals padho, phir har pattern family tartib se seekho: creational, structural, behavioral. Aakhir me interview questions karo, jo sab kuch jodte hain. Har topic ka revision shape ek jaisa hai: chhoti theory, kaise-kaam-karta hai, JavaScript skeleton, kab use karein, aam galtiyan aur yaad rakhne wale points.

## The interview loop

Kisi bhi LLD problem ka loop constant rehta hai. Pehle requirements clear karo aur scope pakdo. Statement ke nouns se entities nikalo. Unke beech rishte tay karo. SOLID lagao aur ek-do patterns wahan lagao jahan dil se fit hon. Design prove karne ke liye ek use case end tak chala ke dikhao.

## Keep in mind

- HLD machines ki baat hai, LLD classes ki: ye line sabse pehle bolo.
- Nouns classes bante hain, verbs methods bante hain.
- Composition inheritance se behtar hai, jab tak sach me is-a rishta na ho.
- Har design me ek-do patterns kaafi hain: zabardasti lagana negative jata hai.
- Hamesha happy path plus ek edge case ke walkthrough pe khatm karo.`,
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

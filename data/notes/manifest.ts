import type { NoteSection } from "@/types/notes";

export const NOTE_SECTIONS: NoteSection[] = [
  {
    id: "js-basics",
    title: "JS Basics",
    pages: [
      { slug: "event-loop", title: "Event loop & task queues", description: "Microtasks, macrotasks, and starvation traps." },
      { slug: "types-and-coercion", title: "Types & coercion", description: "== vs ===, truthy edge cases, Number quirks." },
      { slug: "scope-and-closures", title: "Scope & closures", description: "Lexical scope, TDZ, module scope in bundlers." },
      { slug: "objects-arrays", title: "Objects & arrays", description: "Reference semantics, iteration, structuredClone." },
    ],
  },
  {
    id: "js-advance",
    title: "JS Advance",
    pages: [
      { slug: "prototypes-classes", title: "Prototypes & classes", description: "Delegation, private fields, instanceof limits." },
      { slug: "iterators-generators", title: "Iterators & generators", description: "Protocols, lazy sequences, async iterators." },
      { slug: "memory-gc", title: "Memory & GC", description: "Retention, WeakMap/WeakRef, leak patterns." },
      { slug: "modules-tooling", title: "Modules & tooling", description: "ESM/CJS interop, tree-shaking, package exports." },
    ],
  },
  {
    id: "react-js",
    title: "React js",
    pages: [
      { slug: "hooks-model", title: "Hooks mental model", description: "Render phase vs effects, rules that matter." },
      { slug: "state-rerenders", title: "State & re-renders", description: "Batching, context cost, lifting vs colocation." },
      { slug: "effects-patterns", title: "Effects & cleanup", description: "When not to useEffect, subscriptions, races." },
      { slug: "performance", title: "Performance patterns", description: "memo/useMemo, virtualization, concurrent features." },
    ],
  },
  {
    id: "node-js",
    title: "Node js",
    pages: [
      { slug: "runtime-io", title: "Runtime & I/O", description: "libuv thread pool, blocking work, cluster basics." },
      { slug: "streams", title: "Streams & backpressure", description: "pipe, transform, memory bounds." },
      { slug: "express-apis", title: "Express & APIs", description: "Middleware order, errors, validation at the edge." },
      { slug: "ops-debugging", title: "Ops & debugging", description: "ENV, logging, profiling, graceful shutdown." },
    ],
  },
  {
    id: "next-js",
    title: "Next js",
    pages: [
      { slug: "app-router", title: "App Router", description: "Layouts, loading/error, parallel routes mental map." },
      { slug: "rsc-boundaries", title: "RSC boundaries", description: "Server vs client components, serialization gotchas." },
      { slug: "data-caching", title: "Data & caching", description: "fetch cache, revalidate, tags, stale patterns." },
      { slug: "deploy-edge", title: "Deploy & edge", description: "Middleware, ISR, env on Vercel-like hosts." },
    ],
  },
  {
    id: "sql-basics",
    title: "SQL basics",
    pages: [
      { slug: "joins", title: "Joins & cardinality", description: "INNER/LEFT, fan-out, when to denormalize." },
      { slug: "indexes", title: "Indexes & plans", description: "B-tree intuition, covering indexes, EXPLAIN." },
      { slug: "transactions", title: "Transactions", description: "Isolation levels, deadlocks, idempotency keys." },
      { slug: "query-patterns", title: "Query patterns", description: "Pagination, upserts, window functions cheat sheet." },
    ],
  },
  {
    id: "css-essentials",
    title: "CSS essentials",
    pages: [
      { slug: "layout", title: "Layout", description: "Flex vs grid decision tree, minmax(0,1fr)." },
      { slug: "stacking", title: "Stacking & specificity", description: "Layers, isolation, BEM vs utility tradeoffs." },
      { slug: "responsive", title: "Responsive & units", description: "clamp(), container queries, dvh pitfalls." },
      { slug: "motion", title: "Motion & paint", description: "transform/opacity only, will-change sparingly." },
    ],
  },
];

import type { JsNoteTopic } from "@/types/js-note";

type Enriched = Partial<JsNoteTopic["content"]>;

/** Extra overview, sections, and reading links (javascript.info-inspired). */
export const jsNoteEnrichedBySlug: Record<string, Enriched> = {
  "var-let-const": {
    overview:
      "Modern JavaScript gives you three ways to declare variables: `var`, `let`, and `const`. They look similar, but they behave differently with respect to scope, hoisting, and reassignment. Understanding those differences prevents subtle bugs in loops, callbacks, and React components.",
    sections: [
      {
        id: "declarations",
        title: "Variable declarations",
        paragraphs: [
          "`var` declares a variable in function scope (or global scope if declared at the top level). It is hoisted: the declaration is processed before the code runs, but assignments stay in place — so reading `var x` before its line gives `undefined`, not an error.",
          "`let` and `const` are block-scoped: they exist only inside the nearest `{ }` (if, for, while, or a bare block). They are also hoisted into a temporal dead zone (TDZ): the name exists from the start of the block, but you cannot read or write it until the declaration line executes.",
          "`const` requires an initializer and forbids reassigning the binding. Important: `const` does not make objects immutable — you can still change properties; you just cannot point the variable at a different object.",
        ],
      },
      {
        id: "when-to-use",
        title: "Which one should you use?",
        paragraphs: [
          "Default to `const` for every binding that will not be reassigned. Use `let` when you need to reassign (counters, accumulators, flags). Avoid `var` in new code unless you are maintaining legacy codebases.",
          "In `for` loops, `for (let i = 0; …)` creates a new `i` per iteration, which is what you want when closures capture `i` in timeouts or promises. `for (var i = 0; …)` shares one `i` across all iterations.",
        ],
      },
    ],
    furtherReading: [
      {
        title: "Variables — javascript.info",
        url: "https://javascript.info/variables",
      },
      {
        title: "let and const — javascript.info",
        url: "https://javascript.info/let-const",
      },
    ],
  },
  "map-reduce-filter": {
    overview:
      "Arrays in JavaScript ship with powerful iteration methods: `forEach`, `map`, `filter`, and `reduce`. They express common patterns — visit each element, transform, select, or combine — without manual index management. They are central to interview solutions and to idiomatic frontend code.",
    sections: [
      {
        id: "map-filter",
        title: "map and filter",
        paragraphs: [
          "`map` calls your callback for each element and builds a new array from the return values. The original array is unchanged. Use `map` when every output slot corresponds to one input slot (same length).",
          "`filter` keeps elements where the callback returns a truthy value. Use it to narrow a collection: evens, passing scores, active users, etc.",
          "Both methods pass `(element, index, array)` to the callback. You can chain them: `arr.filter(pred).map(transform)`.",
        ],
      },
      {
        id: "reduce",
        title: "reduce",
        paragraphs: [
          "`reduce` walks the array left to right, carrying an accumulator. The callback receives `(accumulator, currentValue, index, array)` and returns the next accumulator. The second argument to `reduce` is the initial accumulator — always provide it unless you are sure the array is non-empty and the first element is a valid starting value.",
          "Common uses: sum, max/min, building an object histogram, flattening nested arrays, or composing multiple passes into one loop for performance.",
        ],
      },
    ],
    furtherReading: [
      {
        title: "Array methods — javascript.info",
        url: "https://javascript.info/array-methods",
      },
    ],
  },
  functions: {
    overview:
      "Functions are first-class values in JavaScript: you can store them in variables, pass them as arguments, and return them from other functions. That flexibility underpins callbacks, event handlers, and higher-order patterns used throughout DSA and React.",
    sections: [
      {
        id: "syntax",
        title: "Ways to write a function",
        paragraphs: [
          "Function declaration: `function name() {}` — hoisted in its scope, so you can call it before its line in the file.",
          "Function expression: `const fn = function() {}` — exists only after the assignment runs.",
          "Arrow function: `const fn = () => {}` — concise syntax; no own `this`, `arguments`, or `new` binding. Ideal for short callbacks; use declarations when you need hoisting or a named stack frame.",
        ],
      },
      {
        id: "parameters",
        title: "Parameters and return",
        paragraphs: [
          "Default parameters fill in missing arguments: `function f(a = 1) {}`. Rest parameters collect the rest: `function sum(...nums) {}`.",
          "A function without `return` returns `undefined`. Early `return` exits immediately — useful for guards in interview solutions.",
        ],
      },
    ],
    furtherReading: [
      {
        title: "Functions — javascript.info",
        url: "https://javascript.info/function-basics",
      },
      {
        title: "Arrow functions — javascript.info",
        url: "https://javascript.info/arrow-functions-basics",
      },
    ],
  },
  closures: {
    overview:
      "A closure is when a function remembers variables from the place where it was created, even after that outer function has finished running. Closures are how JavaScript implements private state, factories, and most callbacks.",
    sections: [
      {
        id: "lexical-env",
        title: "Lexical environment",
        paragraphs: [
          "Every function has an associated lexical environment: its local variables plus a reference to the environment where it was defined. When the inner function runs, it can still read (and sometimes write) outer variables as long as something still references the inner function.",
          "That is why `makeCounter()` can keep a private `count` — the returned methods close over `count` and the engine keeps that scope alive.",
        ],
      },
    ],
    furtherReading: [
      {
        title: "Closures — javascript.info",
        url: "https://javascript.info/closure",
      },
    ],
  },
  promises: {
    overview:
      "Promises represent a value that may be available now, later, or never (if something fails). They replace deeply nested callbacks with a chain of `.then()` handlers and unify success and failure with `.catch()`.",
    sections: [
      {
        id: "states",
        title: "Promise states",
        paragraphs: [
          "A promise starts pending, then settles once as either fulfilled (with a value) or rejected (with a reason). Settled promises ignore further resolve/reject calls.",
          "`.then(onFulfilled, onRejected)` registers handlers; `.catch(onRejected)` is sugar for `.then(null, onRejected)`. Always return or chain promises inside `.then` to avoid losing errors.",
        ],
      },
    ],
    furtherReading: [
      {
        title: "Promises — javascript.info",
        url: "https://javascript.info/promise-basics",
      },
    ],
  },
  "async-await": {
    overview:
      "`async`/`await` is syntactic sugar on top of promises: `async` functions always return a promise, and `await` pauses inside the function until a promise settles. It reads like synchronous code but still runs asynchronously.",
    sections: [
      {
        id: "usage",
        title: "Using async/await",
        paragraphs: [
          "Mark a function `async` when it uses `await`. Call it like any async API — you get a promise back. Use `try/catch` around `await` for errors instead of `.catch()` on every line.",
          "Parallel work should use `Promise.all([p1, p2])` rather than awaiting in sequence when tasks are independent.",
        ],
      },
    ],
    furtherReading: [
      {
        title: "Async/await — javascript.info",
        url: "https://javascript.info/async-await",
      },
    ],
  },
  "event-loop": {
    overview:
      "JavaScript runs on a single thread with an event loop. Long-running code blocks everything else; I/O and timers are handled by the host (browser or Node), which queues callbacks when work completes.",
    sections: [
      {
        id: "micro-macro",
        title: "Microtasks vs macrotasks",
        paragraphs: [
          "After the current call stack empties, the engine drains the microtask queue (promise callbacks, `queueMicrotask`) before the next macrotask (setTimeout, DOM events). That is why `Promise.resolve().then(...)` runs before `setTimeout(..., 0)`.",
          "Understanding this order explains odd console.log sequences in interviews and helps debug race conditions in UI code.",
        ],
      },
    ],
    furtherReading: [
      {
        title: "Event loop — javascript.info",
        url: "https://javascript.info/event-loop",
      },
    ],
  },
  objects: {
    overview:
      "Objects store collections of key–value pairs. Keys are strings or symbols; values can be any type, including functions (methods). Objects are reference types: copying a variable copies a pointer, not a deep clone.",
    sections: [
      {
        id: "properties",
        title: "Reading and writing properties",
        paragraphs: [
          "Dot syntax `obj.key` is shorthand when the key is a valid identifier. Bracket syntax `obj[key]` is required for dynamic keys or keys with special characters.",
          "Shorthand property syntax `{ name, age }` builds keys from variable names. Method shorthand `{ greet() {} }` defines a function property without writing `: function`.",
        ],
      },
    ],
    furtherReading: [
      { title: "Objects — javascript.info", url: "https://javascript.info/object" },
    ],
  },
  hoisting: {
    overview:
      "Hoisting is JavaScript's behavior of processing declarations before executing the rest of the scope. `var` and function declarations are hoisted in ways that can surprise you; `let` and `const` are hoisted but sit in the temporal dead zone until their line runs.",
    furtherReading: [
      { title: "Hoisting — MDN", url: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting" },
    ],
  },
  "spread-rest": {
    overview:
      "The `...` syntax can spread iterables into lists or object copies, or collect remaining arguments/items into an array. Spread creates shallow copies; nested objects are still shared unless you deep-clone.",
    furtherReading: [
      {
        title: "Rest parameters — javascript.info",
        url: "https://javascript.info/rest-parameters-spread",
      },
    ],
  },
  "set-and-map": {
    overview:
      "`Set` stores unique values with fast membership checks. `Map` stores arbitrary keys (including objects) with predictable iteration order. Both are preferable to plain objects when keys are not strings or when you need size and iteration without prototype noise.",
    furtherReading: [
      { title: "Map and Set — javascript.info", url: "https://javascript.info/map-set" },
    ],
  },
  "loops-and-math": {
    overview:
      "Interview loops usually combine index pointers, accumulators, and early exit. Know `for`, `while`, `for...of` (values), and `for...in` (keys — avoid on arrays). Integer overflow is rare in JS (IEEE doubles), but watch floating-point equality and `Math.floor` vs truncation.",
    sections: [
      {
        id: "complexity",
        title: "Why loop choice matters",
        paragraphs: [
          "A single forward scan is O(n). Nested loops over the same array are often O(n²) unless the inner loop moves a pointer that only advances — two pointers and sliding window patterns can still be O(n).",
        ],
      },
    ],
  },
  "recursion-basics": {
    overview:
      "Recursion solves a problem by solving smaller instances of the same problem. Every recursive function needs a base case (stop) and a recursive case (smaller input). The call stack has a limit — very deep recursion may need iteration or tail-call awareness.",
    furtherReading: [
      {
        title: "Recursion — javascript.info",
        url: "https://javascript.info/recursion",
      },
    ],
  },
  "array-manipulation": {
    overview:
      "Array problems often combine sorting, two pointers, prefix sums, or in-place swapping. Built-in `sort` mutates and compares as strings by default — pass a comparator: `arr.sort((a, b) => a - b)` for numbers.",
    furtherReading: [
      {
        title: "Array methods — javascript.info",
        url: "https://javascript.info/array-methods",
      },
    ],
  },
};

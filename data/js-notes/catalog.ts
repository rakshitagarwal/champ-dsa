import type { JsNoteTopic } from "@/types/js-note";

export const jsNoteTopics: JsNoteTopic[] = [
  {
    slug: "var-let-const",
    order: 1,
    title: "var, let, and const",
    summary: "Three ways to declare variables — scope and mutability differ.",
    category: "Fundamentals",
    content: {
      simple:
        "Variables are boxes that hold values. `const` means the box label cannot point to a new value (but objects inside can still change). `let` means you can replace what is in the box later. `var` is the old style: it ignores block scope and can surprise you in loops and if-statements.",
      deepDive: [
        "Scope is where a name is visible. `let` and `const` are block-scoped: they exist only inside the nearest `{ }`. `var` is function-scoped (or global), so a `var` inside an `if` is still visible after the `if`.",
        "The temporal dead zone (TDZ) means you cannot use `let` or `const` before the line where they are declared — JavaScript throws a ReferenceError. `var` is hoisted and becomes `undefined` until assignment.",
        "Use `const` by default, `let` when you need to reassign, and avoid `var` in new code unless you are maintaining legacy projects.",
      ],
      teachBack: [
        "Say: const is for things that should not be reassigned; let is for counters and flags that change; var is legacy and leaks out of blocks.",
        "Give the loop example: `for (let i = 0; ...)` gives a fresh `i` each iteration; `var i` shares one `i` for all iterations.",
      ],
      examples: [
        {
          title: "Block scope",
          code: `if (true) {
  const x = 1;
  let y = 2;
}
// console.log(x); // Error — x is not defined here
// console.log(y); // Error — y is not defined here`,
          explanation:
            "x and y only exist inside the if block. That is why let/const help you avoid accidental bugs.",
        },
        {
          title: "const does not freeze objects",
          code: `const user = { name: "Ada" };
user.name = "Grace"; // OK — you changed a property, not the binding
// user = {};        // Error — cannot reassign user`,
          explanation:
            "const stops reassignment of the variable, not mutation of the object it points to.",
        },
      ],
    },
  },
  {
    slug: "map-reduce-filter",
    order: 2,
    title: "map, reduce, and filter",
    summary: "Transform, keep, or fold an array without manual for-loops.",
    category: "Arrays",
    content: {
      simple:
        "`filter` picks items that pass a test. `map` builds a new array by transforming each item. `reduce` squashes the whole array into one value (sum, max, object, etc.). They do not change the original array.",
      deepDive: [
        "These methods take a callback `(item, index, array) => ...` and return a new result. Chaining is common: `nums.filter(...).map(...).reduce(...)`.",
        "filter returns elements where the callback returns true. map returns one new value per element. reduce carries an accumulator from left to right.",
        "For interviews and readability, prefer them when the logic is a straight transformation. A plain for-loop is fine when you need break/continue or complex control flow.",
      ],
      teachBack: [
        "filter = keep some; map = change each; reduce = combine all into one.",
        "Mention they return new data (immutable style), which pairs well with React state updates.",
      ],
      examples: [
        {
          title: "filter + map + reduce",
          code: `const scores = [42, 88, 65, 91, 55];
const totalPassing = scores
  .filter((n) => n >= 60)
  .map((n) => n + 5)
  .reduce((sum, n) => sum + n, 0);
// Only scores >= 60, add bonus 5, then sum`,
          explanation:
            "Read the chain top to bottom: who stays, how each is changed, then how they combine.",
        },
      ],
    },
  },
  {
    slug: "functions",
    order: 3,
    title: "Functions",
    summary: "Reusable blocks of logic — declarations, expressions, and arrows.",
    category: "Functions",
    content: {
      simple:
        "A function is a recipe with a name. You pass ingredients (arguments) and get a result (return value). Arrow functions are a shorter syntax; function declarations are hoisted so you can call them before their line in the file.",
      deepDive: [
        "Function declaration: `function foo() {}` — hoisted. Function expression: `const foo = function() {}` — not hoisted until that line runs.",
        "Arrow functions: `const add = (a, b) => a + b`. They do not have their own `this` (inherit from surrounding scope).",
        "Default parameters and rest parameters (`...args`) make APIs flexible without manual checks.",
      ],
      teachBack: [
        "Explain functions as named steps you can call many times.",
        "Contrast arrow vs regular when `this` matters (DOM handlers, object methods).",
      ],
      examples: [
        {
          title: "Declaration vs arrow",
          code: `function greet(name) {
  return "Hello, " + name;
}
const greet2 = (name) => "Hello, " + name;

greet("Sam");  // "Hello, Sam"`,
          explanation:
            "Both do the same job here. Choose arrows for short callbacks; choose declarations for top-level helpers you want hoisted.",
        },
      ],
    },
  },
  {
    slug: "closures",
    order: 4,
    title: "Closures",
    summary: "An inner function that still remembers variables from its outer function.",
    category: "Functions",
    content: {
      simple:
        "When a function is created inside another function, the inner one keeps access to the outer one's variables — even after the outer function has finished. That memory is called a closure.",
      deepDive: [
        "Closures power private variables, factories, and callbacks. The JavaScript engine keeps the outer scope alive as long as something still references the inner function.",
        "Classic interview pattern: loops with `var` and `setTimeout` — use `let` or an IIFE so each callback closes over the right index.",
        "Closures are everywhere: event handlers, React hooks, debounce — any time inner code uses variables from outside.",
      ],
      teachBack: [
        "Use the backpack analogy: the inner function carries the outer variables in a backpack wherever it goes.",
        "Demo: `function makeCounter() { let n = 0; return () => ++n; }` — each counter has its own `n`.",
      ],
      examples: [
        {
          title: "Private counter",
          code: `function makeCounter() {
  let count = 0;
  return {
    inc() { return ++count; },
    get() { return count; },
  };
}
const c = makeCounter();
c.inc(); // 1
c.inc(); // 2
// count is not accessible from outside — only via inc/get`,
          explanation:
            "The outer `count` is hidden; only the returned methods can touch it. That is closure-based privacy.",
        },
      ],
    },
  },
  {
    slug: "currying",
    order: 5,
    title: "Currying",
    summary: "Turn one function with many arguments into a chain of one-argument functions.",
    category: "Functions",
    content: {
      simple:
        "Currying means `f(a, b, c)` becomes `f(a)(b)(c)`. Each step returns a new function until you have all arguments, then you get the final result. It is useful when you want to fix some arguments early and reuse the rest later.",
      deepDive: [
        "Partial application is related but not identical: you fix some args and get one callable function, not necessarily one arg at a time.",
        "Currying helps with configuration: `const addTax = (rate) => (price) => price * (1 + rate);` then `addTax(0.18)(100)`.",
        "In real apps you see it in libraries and functional utilities; you do not need it everywhere, but recognizing it helps read advanced code.",
      ],
      teachBack: [
        "Say: curry = split arguments across nested functions so you can reuse the first part.",
        "Example: logging with a fixed prefix — `const logErr = logWithLevel('ERROR'); logErr('disk full');`",
      ],
      examples: [
        {
          title: "Manual curry",
          code: `function multiply(a) {
  return function (b) {
    return a * b;
  };
}
const double = multiply(2);
double(5); // 10`,
          explanation:
            "`multiply(2)` returns a function that always multiplies by 2. That returned function closes over `a`.",
        },
      ],
    },
  },
  {
    slug: "objects",
    order: 6,
    title: "Objects",
    summary: "Key–value collections for modeling real-world things.",
    category: "Fundamentals",
    content: {
      simple:
        "An object groups related data and behavior. Keys are strings (or symbols); values can be anything. Dot notation (`user.name`) and bracket notation (`user['name']`) read properties; bracket notation is required for dynamic keys.",
      deepDive: [
        "Objects are reference types: assigning `const b = a` copies the reference, not a deep clone.",
        "Shorthand: `{ name, age }` when variables match key names. Methods: `{ greet() { ... } }` is sugar for a function property.",
        "Optional chaining `obj?.prop` and nullish coalescing `??` avoid crashes when data might be missing.",
      ],
      teachBack: [
        "Describe objects as labeled drawers; keys are labels, values are contents.",
        "Mention JSON is data shaped like objects, but plain objects in JS can also hold functions.",
      ],
      examples: [
        {
          title: "Create and update",
          code: `const book = { title: "DSA", pages: 300 };
book.pages = 320;
book.author = "You";
const key = "title";
console.log(book[key]); // "DSA"`,
          explanation:
            "You can add properties anytime. Bracket syntax lets you use variables as key names.",
        },
      ],
    },
  },
  {
    slug: "this-keyword",
    order: 7,
    title: "The this keyword",
    summary: "Who called the function — not where it was written.",
    category: "Functions",
    content: {
      simple:
        "`this` is decided by how a function is called, not where it is defined. In a method `obj.foo()`, `this` is usually `obj`. In a plain call `foo()`, `this` is `undefined` in strict mode (or the global object in sloppy mode). Arrow functions ignore their own `this` and use the parent scope's `this`.",
      deepDive: [
        "Rules (simplified): (1) method call → receiver object; (2) `new` → new instance; (3) `call`/`apply`/`bind` → whatever you pass; (4) arrow → lexical `this`.",
        "Losing `this` is common: `const fn = obj.method; fn()` drops the receiver. Fix with `bind` or an arrow wrapper.",
        "In React class components, `this` mattered for setState; in hooks, you mostly avoid `this` entirely.",
      ],
      teachBack: [
        "Say: think who is to the left of the dot when the function runs.",
        "Demo: same function, call as `obj.log()` vs `const f = obj.log; f()` — different `this`.",
      ],
      examples: [
        {
          title: "Method vs bare call",
          code: `const user = {
  name: "Riya",
  hello() { return this.name; },
};
user.hello(); // "Riya"
const h = user.hello;
// h(); // undefined in strict mode — lost this`,
          explanation:
            "Extracting the method into `h` removes the connection to `user`, so `this` is no longer `user`.",
        },
      ],
    },
  },
  {
    slug: "call-apply-bind",
    order: 8,
    title: "call, apply, and bind",
    summary: "Borrow a function and set its this explicitly.",
    category: "Functions",
    content: {
      simple:
        "All three control `this`. `call` invokes now with arguments listed: `fn.call(ctx, a, b)`. `apply` is the same but arguments go in an array. `bind` returns a new function with `this` (and optionally args) fixed ahead of time — it does not run immediately.",
      deepDive: [
        "Use `call`/`apply` when you want to reuse a method on another object: `Array.prototype.slice.call(arrayLike)`.",
        "`bind` is common for callbacks: `this.handleClick = this.handleClick.bind(this)`.",
        "Arrow functions cannot be used as constructors and do not have `bind` changing their lexical `this` — `bind` on an arrow still won't give dynamic `this`.",
      ],
      teachBack: [
        "call/apply = run now with this set; bind = create a version with this locked in.",
        "Memory phrase: Call Comma, Apply Array, Bind Later.",
      ],
      examples: [
        {
          title: "bind for callbacks",
          code: `const timer = {
  seconds: 0,
  tick() { this.seconds++; },
};
const bound = timer.tick.bind(timer);
setInterval(bound, 1000); // this stays timer`,
          explanation:
            "Without bind, passing `timer.tick` to setInterval would lose `this` when the browser calls it.",
        },
      ],
    },
  },
  {
    slug: "promises",
    order: 9,
    title: "Promises",
    summary: "A placeholder for a value that will arrive later — success or failure.",
    category: "Async",
    content: {
      simple:
        "Async work (fetch, timers, file read) finishes later. A Promise is either pending, fulfilled (success), or rejected (error). You attach handlers with `.then` and `.catch` instead of nesting callbacks.",
      deepDive: [
        "Promise chaining: each `.then` can return a value or another Promise; the chain flattens automatically.",
        "`Promise.all` waits for all; `Promise.race` settles when the first finishes; `Promise.allSettled` never throws on individual failures.",
        "Errors propagate down the chain until a `.catch` handles them — like try/catch for async pipelines.",
      ],
      teachBack: [
        "Say: a Promise is an IOU — later you get the result or a reason it failed.",
        "Contrast with callbacks: promises give a standard way to chain and handle errors.",
      ],
      examples: [
        {
          title: "fetch-style chain",
          code: `function getUser(id) {
  return fetch("/api/users/" + id)
    .then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then((user) => user.name)
    .catch((err) => {
      console.error(err);
      return "Guest";
    });
}`,
          explanation:
            "Each step transforms data or throws; one catch at the end handles failures from any step.",
        },
      ],
    },
  },
  {
    slug: "async-await",
    order: 10,
    title: "async / await",
    summary: "Write async code that reads top to bottom like normal code.",
    category: "Async",
    content: {
      simple:
        "`async` on a function makes it return a Promise. `await` pauses inside that function until a Promise settles, then gives you the value. Use try/catch for errors instead of only `.catch`.",
      deepDive: [
        "await only works inside async functions (or at top level in modules). It does not block the main thread — other code can still run while waiting.",
        "Parallel work: use `await Promise.all([a(), b()])` instead of two awaits in a row when tasks are independent.",
        "async/await is syntax over Promises — understanding Promises still helps debug.",
      ],
      teachBack: [
        "Say: async/await is sugar — still Promises under the hood.",
        "Show try/catch around await for the same mental model as synchronous code.",
      ],
      examples: [
        {
          title: "Sequential vs parallel",
          code: `async function loadDashboard(userId) {
  try {
    const [user, stats] = await Promise.all([
      fetchUser(userId),
      fetchStats(userId),
    ]);
    return { user, stats };
  } catch (e) {
    return { error: e.message };
  }
}`,
          explanation:
            "Promise.all runs both fetches together; await waits for both before continuing.",
        },
      ],
    },
  },
  {
    slug: "debounce-throttle",
    order: 11,
    title: "Debounce and throttle",
    summary: "Control how often expensive handlers run during rapid events.",
    category: "Browser",
    content: {
      simple:
        "Debounce: wait until the user stops, then run once (search as you type). Throttle: run at most once per interval (scroll or resize). Both save work when events fire very often.",
      deepDive: [
        "Debounce resets a timer on every event; when events pause for N ms, the function runs. Good for input validation and API search.",
        "Throttle uses a gate: if enough time passed since last run, run again. Good for scroll position updates and button spam protection.",
        "Implement with closures holding timer ids or last-run timestamps.",
      ],
      teachBack: [
        "Debounce = elevator door waits for everyone to stop rushing in; throttle = train leaves every 5 minutes whether or not you are ready.",
      ],
      examples: [
        {
          title: "Simple debounce",
          code: `function debounce(fn, delayMs) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delayMs);
  };
}
const onSearch = debounce((q) => fetch("/search?q=" + q), 300);`,
          explanation:
            "Typing fast fires many events but only one fetch 300ms after the last keystroke.",
        },
      ],
    },
  },
  {
    slug: "event-propagation",
    order: 12,
    title: "Event propagation",
    summary: "Events travel down (capture), target, then up (bubble) the DOM tree.",
    category: "Browser",
    content: {
      simple:
        "Click a button inside a div: the click hits the button (target), but parents can listen too. Capture phase goes from window down to the target; bubble phase goes back up. `stopPropagation` stops the journey; `preventDefault` stops the browser default (like following a link).",
      deepDive: [
        "Listeners register with `addEventListener(type, handler, { capture: true })` for capture phase; default is bubble.",
        "Event delegation: put one listener on a parent and use `event.target` to handle children — efficient for long lists.",
        "In React, synthetic events wrap native events; concepts are the same but pooling and batching differ slightly.",
      ],
      teachBack: [
        "Draw three nested boxes: click inner — path is capture down, target, bubble up.",
        "Delegation: one bouncer at the door checks who actually was clicked.",
      ],
      examples: [
        {
          title: "Delegation",
          code: `document.querySelector("#list").addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  console.log("Clicked item", li.dataset.id);
});`,
          explanation:
            "One listener on the list handles clicks on any current or future `<li>` child.",
        },
      ],
    },
  },
  {
    slug: "compose-pipe",
    order: 13,
    title: "Compose and pipe",
    summary: "Combine small functions into one pipeline.",
    category: "Functions",
    content: {
      simple:
        "Pipe runs functions left to right: `pipe(f, g)(x)` is `g(f(x))`. Compose runs right to left: `compose(f, g)(x)` is `f(g(x))`. They help you build data transformations from tiny reusable steps.",
      deepDive: [
        "Popular in functional programming and some utility libraries (lodash flow/flowRight).",
        "Keeps each function pure and testable; the pipeline reads as a story of transformations.",
        "In modern JS, array method chains often replace manual compose for collections.",
      ],
      teachBack: [
        "Pipe = assembly line left to right; compose = read the math notation f(g(x)) from the inside out.",
      ],
      examples: [
        {
          title: "Pipe",
          code: `const pipe = (...fns) => (x) => fns.reduce((v, fn) => fn(v), x);
const trim = (s) => s.trim();
const lower = (s) => s.toLowerCase();
const normalize = pipe(trim, lower);
normalize("  Hello  "); // "hello"`,
          explanation:
            "Data flows through trim then lower. Each step receives the previous output.",
        },
      ],
    },
  },
  {
    slug: "prototypes",
    order: 14,
    title: "Prototypes",
    summary: "How JavaScript shares behavior between objects without copying every method.",
    category: "OOP",
    content: {
      simple:
        "Every object has a hidden link to another object called its prototype. When you read `obj.foo` and `obj` does not have `foo`, JavaScript looks on the prototype chain. Functions have a `prototype` property used when you call `new`.",
      deepDive: [
        "`Object.create(proto)` makes an object whose prototype is `proto`.",
        "Classes in ES6 are syntactic sugar over constructor functions and prototypes.",
        "Know `hasOwnProperty` vs inherited keys when iterating objects.",
      ],
      teachBack: [
        "Say: objects delegate missing lookups to their prototype — like asking a friend if they have a tool you lack.",
        "Draw a small chain: instance → Constructor.prototype → Object.prototype → null.",
      ],
      examples: [
        {
          title: "Prototype chain",
          code: `const animal = { speak() { return "..."; } };
const dog = Object.create(animal);
dog.speak = function () { return "woof"; };
dog.speak(); // "woof" — own property wins`,
          explanation:
            "dog has its own speak; other methods could still come from animal via the chain.",
        },
      ],
    },
  },
  {
    slug: "classes-constructors",
    order: 15,
    title: "Classes and constructors",
    summary: "A clearer syntax for constructor functions and shared methods.",
    category: "OOP",
    content: {
      simple:
        "`class` defines a template for objects. `constructor` runs when you `new` the class. Methods on the class body live on the prototype so all instances share them. `extends` sets up inheritance between classes.",
      deepDive: [
        "Instance fields can be declared in the class body: `count = 0`. Private fields use `#name` syntax.",
        "Static methods belong to the class itself, not instances: `MyClass.fromJSON()`.",
        "Still prototypes underneath — classes are easier to read for most teams.",
      ],
      teachBack: [
        "Say: class is a blueprint; new builds a house from that blueprint.",
        "Mention super() in child constructors must run before using this in the child.",
      ],
      examples: [
        {
          title: "Basic class",
          code: `class Stack {
  #items = [];
  push(x) { this.#items.push(x); }
  pop() { return this.#items.pop(); }
  get size() { return this.#items.length; }
}
const s = new Stack();
s.push(1);
s.pop(); // 1`,
          explanation:
            "#items is private to the class. push/pop are shared via the prototype.",
        },
      ],
    },
  },
  {
    slug: "event-loop",
    order: 16,
    title: "The event loop",
    summary: "How JavaScript runs async work on a single thread without freezing the page.",
    category: "Async",
    content: {
      simple:
        "JavaScript runs one piece of code at a time on the call stack. Slow work (timers, network) is handled by the browser; when done, callbacks go in a task queue. The event loop moves callbacks to the stack when the stack is empty. Microtasks (Promises) run before the next macrotask.",
      deepDive: [
        "Order to remember: sync code first → drain microtasks (Promise callbacks) → one macrotask (setTimeout, I/O) → repeat.",
        "Long sync loops block rendering and input — split work or use workers for heavy CPU.",
        "console.log order puzzles in interviews test call stack vs microtask vs macrotask timing.",
      ],
      teachBack: [
        "Say: stack = what runs now; queue = what waits; loop = referee that picks next when stack clears.",
        "Classic: `setTimeout(0)` vs `Promise.resolve().then` — Promise runs first (microtask).",
      ],
      examples: [
        {
          title: "Order puzzle",
          code: `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// 1, 4, 3, 2`,
          explanation:
            "Sync 1 and 4, then microtask 3, then timeout 2. Drawing the loop diagram makes this stick.",
        },
      ],
    },
  },
  {
    slug: "hoisting",
    order: 17,
    title: "Hoisting",
    summary: "How declarations are set up before your code runs line by line.",
    category: "Fundamentals",
    content: {
      simple:
        "Before execution, JavaScript registers declarations in memory. `var` and `function` declarations are hoisted (var as undefined until assigned). `let` and `const` are hoisted but sit in the temporal dead zone until their line runs.",
      deepDive: [
        "Function declarations are fully hoisted — you can call them above their line. `const fn = function(){}` is not hoisted as a function, only `fn` binding if var (avoid).",
        "Understanding hoisting explains why some code order works and some throws.",
      ],
      teachBack: [
        "Say: JS scans the scope first, then runs your statements — hoisting is that scan step for names.",
      ],
      examples: [
        {
          title: "var vs let",
          code: `console.log(a); // undefined
var a = 1;
// console.log(b); // ReferenceError — TDZ
let b = 2;`,
          explanation:
            "var exists but has no value yet; let exists in TDZ and cannot be read early.",
        },
      ],
    },
  },
  {
    slug: "spread-rest",
    order: 18,
    title: "Spread and rest",
    summary: "Expand or collect values with `...` — opposite jobs, same syntax.",
    category: "Fundamentals",
    content: {
      simple:
        "Spread copies or expands: `[...arr]`, `{ ...obj }`, `fn(...args)`. Rest collects the remainder: `function f(first, ...rest) {}`. Context tells JavaScript which role `...` plays.",
      deepDive: [
        "Shallow copy: spread only clones one level; nested objects are still shared.",
        "Useful for immutable updates in React: `setState({ ...state, count: state.count + 1 })`.",
        "Rest in destructuring: `const [head, ...tail] = arr`.",
      ],
      teachBack: [
        "Spread = unpack; rest = pack the leftovers.",
      ],
      examples: [
        {
          title: "Merge and rest",
          code: `const defaults = { theme: "dark", lang: "en" };
const user = { ...defaults, lang: "hi" };
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6`,
          explanation:
            "Spread merges objects; rest gathers all arguments into an array.",
        },
      ],
    },
  },
];

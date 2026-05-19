# Event loop & task queues

You already know JavaScript is single-threaded. The revision worth keeping in muscle memory is **ordering**: what runs before the next paint, what can starve I/O, and what still runs after `async` "finishes."

## Macrotasks vs microtasks

- **Macrotasks**: `setTimeout`, `setInterval`, I/O callbacks, UI events (browser).
- **Microtasks**: `Promise` reactions, `queueMicrotask`, `MutationObserver`.

After the current call stack empties, the engine drains **all microtasks** before the next macrotask.

```js
console.log("sync");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("microtask"));
// sync → microtask → timeout
```

## `async/await` is still microtasks

`await` schedules the continuation as a microtask. Deep `await` chains can delay `setTimeout(0)` longer than newcomers expect.

## Starvation pattern

```js
function loop() {
  Promise.resolve().then(loop);
}
loop();
// setTimeout never runs — microtask queue never empties
```

In production: unbounded `queueMicrotask` / promise recursion in hot paths blocks timers and sometimes paint.

## Node vs browser

Node adds **phases** (`timers`, `poll`, `check`, `close`). `setImmediate` vs `setTimeout(0)` ordering differs from browsers. For isomorphic code, don't rely on subtle ordering between them.

## Practical checklist

- Prefer **one** async coordination primitive per feature (`async/await` + structured concurrency).
- Defer heavy work: `setImmediate` (Node) or `requestIdleCallback` (browser) — not infinite microtasks.
- Log with labels when debugging race bugs; order is often the bug.

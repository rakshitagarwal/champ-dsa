# Memory & performance

## GC basics

Generational GC: young objects collected often; survivors promoted. **Short-lived** allocations are cheap; **long-lived** leaks hurt.

## Leak sources

- Global caches without eviction (Maps keyed by string forever).
- Detached DOM nodes still referenced from JS.
- Event listeners not removed.
- Closures holding large graphs (see scope notes).

## WeakRef / FinalizationRegistry

Rare in app code; useful for caches tied to object lifetime. Don't rely on `FinalizationRegistry` for critical cleanup — timing is nondeterministic.

## Profiling workflow

1. Reproduce under load.
2. Chrome Performance / Memory snapshot or Node `--inspect` + heap snapshot.
3. Diff snapshots; find retaining paths.

## Micro-optimizations

- Avoid creating functions/objects in tight render loops.
- Batch DOM reads/writes.
- Use `TypedArray` for numeric bulk data.

Measure with **LCP, INP, TTFB** for UX; V8 for CPU hotspots.

## Worker threads

CPU-bound work off main thread: `Worker`, `worker_threads` (Node). Serialization cost — transfer `ArrayBuffer` with `postMessage` transfer list.

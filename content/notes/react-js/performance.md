# Performance patterns

## When to memo

- `React.memo` when parent re-renders often and child is expensive **with same props**.
- `useMemo`/`useCallback` for referential equality consumed by memoized children or deps arrays — not by default.

## Lists

Virtualize long lists (`@tanstack/react-virtual`). Stable `key`. Avoid inline object/array props on 1000+ rows.

## Concurrent features

`useTransition` — keep UI responsive during heavy state updates (filtering large tables).
`useDeferredValue` — lag behind fast typing for expensive derived UI.

## Suspense

Declarative loading boundaries for lazy `import()` and data (with compatible libraries). Pair with error boundaries.

## Profiling

React DevTools Profiler → why did this render? Record interaction, check "render duration".

## Anti-patterns

- Context holding rapidly changing value at root.
- Giant single component tree without code splitting.
- `useEffect` + `setState` on every keystroke without deferral.

## Production metrics

INP (interaction to next paint) > raw FPS. Optimize what users feel on mid-tier mobile.

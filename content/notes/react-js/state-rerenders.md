# State & re-renders

## What triggers render

- Own `setState` / `useReducer` dispatch.
- Parent re-render (child re-renders unless memoized).
- Context value change — **all** consumers re-render.

## Batching

React 18 batches updates in event handlers, promises, native events. `flushSync` opts out — use rarely (measurement, third-party DOM libs).

## Colocation

State closest to where it's used reduces render fan-out. Lift only when siblings must stay in sync.

## Context cost

Split contexts: `ThemeContext` vs `AuthContext`. Pass primitives or memoized objects:

```js
const value = useMemo(() => ({ user, signOut }), [user]);
```

## Keys

List `key` must be stable per identity, not index (reorder bugs). Changing `key` **remounts** — resets state intentionally.

## Derived state

Prefer computing during render over syncing with `useEffect`:

```js
// avoid: useEffect(() => setFullName(first + last), [first, last]);
const fullName = `${first} ${last}`;
```

## External stores

`useSyncExternalStore` for subscribe/getSnapshot pattern (URL, zustand, Redux) — avoids tearing in concurrent rendering.

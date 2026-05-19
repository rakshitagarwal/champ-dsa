# Effects & cleanup

## Default stance for seniors

**Most data fetching belongs in the framework** (Next `fetch`, loaders, React Query) — not raw `useEffect`.

Use effects for: subscriptions, non-React widgets, imperative bridges, analytics after mount.

## Cleanup contract

```js
useEffect(() => {
  const sub = source.subscribe(handler);
  return () => sub.unsubscribe();
}, [source]);
```

Missing cleanup → leaks, stale handlers, race winners.

## Race pattern

```js
useEffect(() => {
  let cancelled = false;
  (async () => {
    const data = await fetch(id);
    if (!cancelled) setData(data);
  })();
  return () => { cancelled = true; };
}, [id]);
```

Or AbortController on fetch.

## Dependency array

Exhaustive deps with eslint. Omitting deps is a **conscious** stale-closure choice — comment why.

## `useLayoutEffect`

Runs before paint — measure DOM, sync scroll. SSR warning: use only when paint flicker matters.

## Event handlers vs effects

User action → handler. Don't mirror "click state" into effect that does the same side effect.

## Strict Mode

Mount → unmount → remount in dev tests cleanup. Idempotent setup helps.

# Hooks mental model

## Two phases every render

1. **Render** — pure(ish): compute UI from props/state. No subscriptions, no DOM writes.
2. **Commit** — React applies DOM; **effects** run after paint (layout effects earlier).

Hooks are **ordered slots** on the fiber — never call conditionally.

## State hook identity

`useState` / `useReducer` identity is position in component. Extracting custom hooks is how you share slot logic without breaking rules.

## Refs vs state

`useRef` updates don't trigger re-render. Use for instance values, DOM nodes, latest callback in effects without adding deps.

## Custom hooks contract

Return stable API; document which values change every render. Don't wrap everything in `useMemo` — measure first.

## Server Components (Next)

Hooks only in **Client Components** (`"use client"`). Server components can async-fetch; no `useState`/`useEffect`.

## Debug checklist

- Strict Mode double-invokes effects in dev — account for duplicate subscriptions.
- "Rendered more hooks than previous" → conditional hook or wrong component type.

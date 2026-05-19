# RSC boundaries

## Server Components (default)

Can async `await` data, access secrets, zero client bundle for that code. Cannot use hooks, browser APIs, or event handlers.

## Client Components

`"use client"` at top — boundary. Imports of server-only modules fail below this line. Pass **serializable** props only.

## Serialization limits

Props: plain objects, arrays, strings, numbers, booleans, null, Date (supported in recent versions — verify your Next docs), Promises in some patterns.

**Not serializable**: functions, class instances, Symbols, DOM nodes.

## Composition pattern

Server parent renders Client child with server-fetched data as props — don't fetch the same data again on client unless needed for interactivity.

## Context

React context only works in Client Components. Provider wraps client subtree; server can render children passed as `children` prop.

## Bundle discipline

Push `"use client"` leaves down the tree — large client subtrees inflate JS.

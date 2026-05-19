# App Router

## File conventions

- `page.tsx` — route UI
- `layout.tsx` — shared shell, preserves state on navigation
- `loading.tsx` / `error.tsx` — Suspense boundary + error boundary
- `route.ts` — Route Handlers (API)

## Nested layouts

Layouts don't remount on sibling navigations — good for sidebars; bad if you need reset per child (use `key` on segment).

## Dynamic segments

`[id]`, `[...slug]`, `[[...slug]]` optional catch-all. `generateStaticParams` for SSG paths.

## Navigation

`Link` prefetches by default (configurable). `useRouter().push` for imperative. `redirect()` in Server Components/actions.

## Route groups

`(marketing)/about` — organize without URL segment.

## Parallel routes

`@modal` slots — advanced; use for modals that deep-link. Requires discipline on default.tsx fallbacks.

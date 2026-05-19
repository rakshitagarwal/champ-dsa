# Data & caching

## `fetch` cache (App Router)

Default caches GET on server. Opt out: `{ cache: 'no-store' }`. Revalidate time: `{ next: { revalidate: 60 } }`.

## `unstable_cache` / tags

Tag fetches, `revalidateTag('posts')` after mutation — on-demand ISR without rebuilding everything.

## Server Actions

Mutations colocated with UI; revalidate paths/tags after success. Watch CSRF — framework handles for same-origin forms.

## Duplicate request deduping

Same URL in one render tree dedupes — still design explicit data layer for clarity (React Query on client).

## Static vs dynamic

`export const dynamic = 'force-static' | 'force-dynamic'` — escape hatches when heuristics wrong.

## Stale-while-revalidate mental model

Serve fast cached page; refresh in background. Good for dashboards; bad for auth-sensitive without `no-store`.

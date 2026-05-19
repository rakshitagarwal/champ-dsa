# Deploy & edge

## Middleware

Runs on edge before route — auth redirects, geo headers, A/B. Keep fast; no heavy DB (use edge KV or JWT verify).

## Edge vs Node runtime

Edge: limited Node APIs, smaller cold start. Node: full `fs`, native modules. Pick per route `export const runtime = 'edge'`.

## Env vars

`NEXT_PUBLIC_*` exposed to browser. Server-only secrets without prefix. Set in host dashboard per environment.

## ISR / SSG

Build time paths + revalidation. Failed build on dynamic-only routes → add `generateStaticParams` or force dynamic.

## Images

`next/image` optimization — configure remote patterns in `next.config`. Know your CDN costs.

## Observability

Log drains, OpenTelemetry, Web Vitals in production. Trace RSC payload size if TTFB high.

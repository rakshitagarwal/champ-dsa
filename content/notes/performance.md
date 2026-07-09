# Performance optimization

> **What seniors are evaluated on:** You measure before optimizing, fix the bottleneck users feel, and can explain trade-offs in production — not premature `useMemo` everywhere.

Related: caching and scaling → [System Design — HLD](/notes/system-design-hld).

---

## 1. How to think (measure first)

| Step | Action |
|------|--------|
| 1 | Define SLO — p95 latency, error rate, Core Web Vitals |
| 2 | Measure in prod-like conditions (RUM, APM, profiler) |
| 3 | Find the bottleneck (one at a time) |
| 4 | Fix, deploy, re-measure |
| 5 | Stop when SLO is met — don't gold-plate |

**Anti-pattern:** Optimizing code that profiles at &lt;1% of request time.

**Senior phrase:** *"I'd check p95 API latency and DB slow-query log before touching React memoization."*

---

## 2. Core Web Vitals (frontend)

| Metric | What it measures | Target (good) |
|--------|------------------|---------------|
| **LCP** | Largest content paint — perceived load | &lt; 2.5s |
| **INP** | Interaction to next paint — responsiveness | &lt; 200ms |
| **CLS** | Layout shift — visual stability | &lt; 0.1 |

**Common LCP fixes:** Optimize hero image (WebP/AVIF, `priority`, correct size), reduce blocking JS, server-render above-the-fold content, CDN for static assets.

**Common INP fixes:** Break up long tasks, defer non-critical JS, virtualize long lists, `useTransition` for heavy filters.

**Common CLS fixes:** Explicit width/height on images, reserve space for ads/embeds, avoid injecting content above existing UI.

**Tools:** Chrome DevTools Performance, Lighthouse, PageSpeed Insights, real-user monitoring (Vercel Analytics, Datadog RUM).

---

## 3. Frontend bundle & rendering

- **Code splitting** — `import()` per route; lazy-load heavy charts/editors
- **Tree shaking** — import named exports from lodash-es, not entire library
- **Bundle analysis** — `@next/bundle-analyzer` or `webpack-bundle-analyzer`
- **Caching** — long `Cache-Control` on hashed static assets; short on HTML
- **Images** — Next `Image`, responsive `srcset`, CDN

### React (when measured, not by default)

| Tool | When |
|------|------|
| `React.memo` | Expensive child, same props often, parent re-renders frequently |
| `useMemo` | Expensive derived data; stable reference for memoized child deps |
| `useCallback` | Callback passed to memoized child or listed in effect deps |
| `useTransition` | Keep UI responsive during heavy table filter/sort |
| `useDeferredValue` | Lag expensive search UI behind fast typing |
| Virtualization | Lists with 500+ rows (`@tanstack/react-virtual`) |

**Anti-patterns:**
- Context holding fast-changing value at app root
- `useEffect` + `setState` on every keystroke without deferral
- Giant component tree without code splitting

---

## 4. Backend & Node.js

### Event loop blocking

CPU-heavy work on main thread blocks all requests. **Fix:** worker threads, child process, or queue for PDF generation, image resize, bcrypt at scale.

### Connection pooling

Reuse DB connections — don't open per request. Tune pool size to DB `max_connections`.

### N+1 queries

```js
// Bad: 1 + N queries
const orders = await Order.find();
for (const o of orders) o.user = await User.findById(o.userId);

// Good: eager load / join / DataLoader batch
const orders = await Order.find().populate("user");
```

### Pagination

Never `SELECT *` unbounded. Cursor-based for feeds; `LIMIT` + index on sort column.

### Caching layers

1. In-process (short TTL, single instance only)
2. Redis (shared, TTL, cache-aside pattern)
3. CDN (static + cacheable API responses)

See [HLD caching section](/notes/system-design-hld) for strategies.

### Async I/O

Prefer non-blocking I/O; parallelize independent calls with `Promise.all` — not sequential awaits.

---

## 5. Database performance

| Technique | When |
|-----------|------|
| **EXPLAIN** | Every slow query investigation |
| **Indexes** | Columns in WHERE, JOIN, ORDER BY — watch write overhead |
| **Covering index** | Hot read query runs index-only |
| **Read replica** | Read-heavy, stale reads acceptable |
| **Denormalize** | Join too expensive at scale — duplicate with care |
| **Connection pooling** | Always in production |

**Slow query triage:** Log queries &gt; 100ms → EXPLAIN → missing index vs bad query shape vs table scan.

---

## 6. API & network

- **Compression** — gzip/brotli on JSON responses &gt; 1KB
- **HTTP/2** — multiplexing reduces connection overhead
- **Timeouts** — client and server; fail fast, don't hang thread pools
- **Retries** — exponential backoff + jitter; only on idempotent ops
- **Circuit breaker** — stop hammering failing downstream (see HLD)
- **Payload size** — return only fields client needs; GraphQL/DataLoader or field selection

---

## 7. Production observability

| Signal | Use for |
|--------|---------|
| **Metrics** | p50/p95/p99 latency, error rate, QPS, CPU, memory |
| **Logs** | Structured JSON; correlation `requestId` |
| **Traces** | Find which service/DB call dominates latency |

**Alert on:** SLO burn rate, error spike, queue depth, disk full — not every slow request.

Details → [Advanced topics — Observability](/notes/advanced-topics).

---

## 8. Interview checklist

When asked *"How would you improve performance?"*:

1. *"What's the user-facing symptom — slow page load, API timeout, or DB CPU?"*
2. *"I'd check RUM/Lighthouse for frontend, APM traces for backend, slow query log for DB."*
3. *"Hypothesis: [X]. I'd validate with profiler, fix bottleneck, deploy behind feature flag, compare p95."*
4. *"Trade-off: caching improves read latency but adds invalidation complexity."*

**Don't say:** "I'd use Redis" without explaining what you cache and how you invalidate.

---

## 9. Quick wins checklist (production)

- [ ] Indexes on hot query paths
- [ ] Pagination on all list endpoints
- [ ] Gzip/brotli enabled
- [ ] Static assets on CDN with cache headers
- [ ] Images optimized and sized correctly
- [ ] DB connection pool configured
- [ ] Timeouts on outbound HTTP calls
- [ ] N+1 eliminated on top 3 endpoints by traffic

# Rate Limiter

> Protect an API with a **fast, shared counter** and a clear algorithm — token bucket or sliding window — not a lecture on Redis internals.

> Atomic check via Redis Lua; enforce at the gateway; return 429 + Retry-After; fail closed on expensive routes when Redis blips. Theory: [Rate Limiting](/hld/rate-limiting).

## What they ask

**Scenario:** Design a rate limiter service: `allow(key) → { allowed, remaining, retryAfter }`, in-line at the [API Gateway](/hld/api-design) — e.g. 100 req/min per user, 5 req/s per IP on login.

**What the interviewer really tests:**
- **Algorithms:** token bucket vs sliding window (burst vs accuracy).
- **Distributed atomicity** so N gateway replicas share one budget, not N×.
- **Placement, headers, failure mode** (429, Retry-After, fail open vs closed).
- **Tiers, per-route limits, multi-DC** without pretending global exactness.

**Example scale:** 50K RPS across 20 gateway nodes → 50K Redis Lua checks/s (one shard ~100K/s; cluster beyond that).

## Requirements

**Functional:**
- `allow(key, cost)` → allowed, remaining, retryAfterMs.
- Rules per userId, IP, API key, route; multiple windows (10/s + 100/min).
- Burst (token bucket) and tiered limits (free vs paid).

**Non-functional:**
- p95 < 5ms added latency; no 10× drift across replicas.
- Horizontally scalable to 100K+ RPS; tolerate brief Redis blips.

**Clarify:** Per user vs IP vs route? Burst OK? Fail open or closed? Global vs per-region budget?

**Out of scope (v1):** WAF/bot ML, billing metering UI, per-tenant quota admin (config service as a box).

## Scale estimation

| Metric | Result |
|--------|--------|
| Checks | 50K/s (1 per request) |
| Redis | 1 `EVALSHA`/check → cluster if >100K/s |
| Memory | Sliding **counter** keys ~30 B × 10M principals ≈ 300 MB (not timestamp logs) |
| Local-only limiter | Effective limit = rule × replicas — **wrong** as source of truth |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/check` | Single allow check |
| `POST` | `/v1/check/batch` | AND across keys |
| `GET` | `/v1/rules/{key}` | Resolved rules |
| `PUT` | `/v1/rules/{key}` | Admin / config service |

**Check body:** `{ "key": "user:u_123", "route": "POST /v1/search", "cost": 1 }` → `{ "allowed", "remaining", "retryAfterMs", "limit", "windowMs" }`.

Gateway plugin: one Lua call per request; on deny → `429` with `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, `Retry-After`.

## High-Level Design (HLD)

![Rate limiter architecture: gateway, limiter fleet, Redis Lua, config, audit](/images/hld/rate-limiter-architecture.svg)

```
Clients → LB → API Gateway (limiter sidecar/Lua)
                    → Redis Cluster (Lua atomic per key)
                    → Config Service (rules, 5s cache + pub/sub)
                    → Kafka audit (async, non-blocking)
```

- **Gateway:** builds `key = f(userId, IP, route, tier)`; **no** local counter as truth.
- **Redis:** `rl:{key}:{window}` or token-bucket hash; TTL = window; persistence off.
- **Config:** Postgres rules; gateways cache with invalidation.
- **Audit:** deny/allow events to [Kafka](/hld/message-queue) for abuse dashboards.

**Flow:** `EVALSHA` sliding-window counter or token bucket → if denied, 429; else proxy upstream.

**Batch check:** AND semantics — one failing key denies; return `failingKey` + max `retryAfterMs`.

**Placement:** first hop that knows principal (gateway); stricter limits again inside LLM/search services if bypass risk.

## Deep dive — distributed correctness

Race without atomicity: two pods read 99, both allow → 101 under limit 100. **One Lua script** per key: read prev/curr window, weighted count, INCR if allowed. Use Redis `TIME` in Lua, not client clock.

**Redis down:** fail **closed** on `/login`, `/pay`; optional in-memory emergency cap at ~50% of limit for read APIs. Never 500 for rate limit.

## Deep dive — multi-DC, tiers, and algorithms

| Algorithm | When |
|-----------|------|
| Token bucket | Bursts (20 at once, then 1/s) |
| Sliding window counter | Default cost/accuracy balance |
| Fixed window | Mention; reject (2× edge burst) |

**Multi-DC:** per-region limits (100/min each), not one cross-ocean Redis. Per-route: stricter on `POST /login` than `GET /feed`. Tier from JWT; rules cached 5s.

## Failures and scale

- Hot key: Lua is O(1); optional 10ms negative cache on denied keys.
- Rule reload via pub/sub, not thundering DB poll.
- 500K RPS: Redis Cluster (~10 shards), pipelined `EVALSHA`, no AOF.
- Clock skew: server time inside Lua only.
- Compose multiple rules with AND; `retryAfter = max(retryAfters)`.
- Dynamic tier change: pub/sub invalidates cached rules within seconds.
- Audit trail in Kafka for "who got 429 when" — not for enforcement path.

**Phrase:** Shared Redis token bucket at the gateway, atomic INCR via Lua, 429 + Retry-After. If Redis dies I fail closed on expensive APIs and keep a small local cap so we don't melt origin.

**Remember:** Lua atomic → sliding window or token bucket → per-region budget → RateLimit-* headers always.

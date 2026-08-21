# Rate Limiter

> Protect an API from abuse. The design is a **fast, shared counter** with a clear algorithm — token bucket or sliding window — not a lecture on Redis internals.

## What they ask

"Design a rate limiter" as a **service**: `allow(key) → yes/no`. Used at the [API gateway](/system-design/api-gateway) for `userId`, IP, or API key.

## Requirements

**Functional:** allow or reject; return retry-after; rules like 100 req/min.

**Non-functional:** very low latency (in-line on every request), correct enough across many gateway nodes, fail open or closed (say which).

**Clarify:** per user vs per IP vs per endpoint. Burst allowed or not.

## API

1. `POST /v1/check` `{ key, cost: 1 }` → `{ allowed, remaining, retryAfterMs }`
2. Or a sidecar / gateway plugin that talks Redis directly — fewer hops.

## Algorithms

**Token bucket.** Tokens refill at rate R, bucket size B (burst). Each request takes a token. Natural bursts. Easy to explain.

**Sliding window log.** Store timestamps in a Redis sorted set; count in (now-W, now]. Accurate, more memory.

**Sliding window counter.** Two buckets (current + previous) weighted by time. Cheap and "good enough."

**Fixed window.** Simple; burst of 2× at the window edge. Mention and usually reject for payments.

## Design

All gateway instances share **Redis**. Key: `rl:{userId}:{minute}` or a Lua script that INCR + EXPIRE atomically (avoid race of INCR then EXPIRE).

Local memory limiter is **wrong** with 10 replicas (effective limit × 10) unless you only need a coarse cap.

**Placement:** first line of defense at the gateway. Extra limits inside expensive services (LLM, search).

## Deep dive — distributed correctness

Without atomicity: two pods read 99, both INCR to 100, you served 101. Use Lua or `INCR` + TTL in one round trip.

**Redis down:** fail **open** (availability) vs fail **closed** (protect origin). For public APIs, fail closed or use a local emergency cap.

**Multi-DC:** don't expect a global exact 100/min. Per-region limits plus a global budget if they insist.

**429** with `Retry-After`. Don't 500.

## Extra probes

1. Different tiers (free vs paid) — config service, cache rules
2. Rate limit by token bucket **per tenant + per route**
3. See also LLD-style interface `allow(key)` if they want classes — still back it with Redis

**Phrase:** "Shared Redis token bucket at the gateway, atomic INCR, 429 + Retry-After. If Redis dies I fail closed on the expensive APIs and keep a small local cap so we don't melt origin."

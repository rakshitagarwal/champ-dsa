# Distributed Cache

> Design the cache **service**, not "I'll add Redis." Interviewers want **placement, invalidation, stampede, and hashing**.

> Placement via consistent hashing, L1 in app + L2 in Redis, singleflight stops stampedes, split hot keys, replicate.

> **Theory first:** [Caching Strategies](/hld/caching-strategies) — cache-aside, write policies, eviction, stampede prevention. This page is the cache **cluster** design.

## What they ask

**Scenario:** 500 app servers, DB melting at 50k QPS — design a distributed cache for ~95% hit rate, p95 < 5ms, survive node loss without DB stampede.

**Tests:** Consistent hashing vs `hash % N`? Cache-aside + invalidation vs TTL-only? Stampede prevention? Replication/failover? Hot keys?

**Scale:** 100k cache QPS, 10M keys, ~100GB working set; 10–12 Redis shards × 16GB, RF=2; 95% hit → ~5k DB QPS.

## Requirements

**Functional (≤6):** get/set/del/mget; TTL + maxmemory eviction (LRU/LFU); sharded cluster; replication; optional `SET NX` for coalescing.

**Non-functional:** p95 hit < 5ms; hit rate > 90%; no thundering herd on miss; hot-key mitigation; scale-out without full reshuffle.

**Clarify (≤4):** Usage layer vs building Redis-like internals? DB is source of truth? Single DC vs geo? Strong vs eventual per key?

**Out of scope (v1):** Geo active-active CRDT cache; cross-key transactions; search on values.

## Scale estimation

| Dimension | Result |
|-----------|--------|
| Ops | ~80k get/s, ~20k set/s |
| Working set | ~100 GB → ~12 nodes @ 16GB, RF=2 |
| Miss @ 95% hit | ~4k/s to DB (within 5k capacity) |
| Evictions | ~33k/s with 5 min avg TTL — monitor hit rate SLI |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/cache/{key}` | Value or 404 |
| `PUT` | `/cache/{key}` | `{ value, ttlSeconds, nx? }` |
| `DELETE` | `/cache/{key}` | Invalidate |
| `POST` | `/cache/mget` | Scatter-gather keys |

Production apps use **smart client** (RESP) not HTTP per op — `SET key EX 300 NX` for lock/singleflight.

## High-Level Design (HLD)

![Distributed cache: hash ring, Redis shards, singleflight, DB truth](/images/hld/distributed-cache-architecture.svg)

```
App pods (Caffeine L1, 5–10s TTL)
    → Smart client (CRC16 → 16384 slots → node)
    → Redis shard (primary + async replica) × N
    → miss: singleflight → DB (bulkhead max concurrent fills)
Config/gossip: slot migration on add/remove node
```

**Cache-aside read:** L1 → L2 → coalesced load → DB → populate L2/L1. **Write:** update DB → **delete** key (TTL as safety net). Optional CDC/[Kafka](/hld/message-queue) invalidator if DEL fails after commit.

## Deep dive

**Invalidation:** TTL alone stale-prices inventory — delete-on-write mandatory. Version bump (`k:version`) beats DEL/SET races; L1 coherence via pub/sub or short L1 TTL.

**Stampede + hot keys:** Singleflight + TTL jitter; `SET NX` lock on miss. Hot key → replicate to multiple shards + aggressive L1. Node death → promote replica; rate-limit cold refill.

## Failures and scale

- AP for cache: serve stale under partition; DB remains truth.
- Cluster outage → circuit breaker, bulkhead to DB (~5k cap), degrade don't 500.
- `maxmemory-policy allkeys-lru`; alert hit rate < 90%.
- Warm new cluster via shadow reads or hot-key replay — not bare deploy.
- Negative cache nulls (30s); hashtag `{userId}` for co-located keys ([Redis](/hld/caching-strategies) Cluster).

**Phrase:** Cache-aside with TTL and delete-on-write. Consistent hashing for the cluster, a lock on miss to stop stampedes, and a plan for hot keys. The DB remains source of truth.

**Remember:** Hit rate is the SLI; invalidation is best-effort + TTL bound; never `hash % N` on elastic clusters; L1 saves RTT but needs short TTL or version checks.

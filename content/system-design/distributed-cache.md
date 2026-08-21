# Distributed Cache

> Design the cache **service**, not "I'll add Redis." Interviewers want **placement, invalidation, stampede, and hashing**.

## What they ask

A cache layer in front of a database used by many app servers. Sometimes they want you to design Redis-like internals (shards, replication).

## Requirements

**Functional:** `get/set/del`, TTL, maybe `mget`.

**Non-functional:** low latency, high hit rate, survive node loss, don't stampede the DB.

**Clarify:** cache-aside vs they want you to build the cache cluster itself.

## API

1. `GET /cache/{key}`
2. `PUT /cache/{key}` `{ value, ttl }`
3. `DELETE /cache/{key}`

Or the Redis protocol. Mentally it's the same.

## Design (as a product)

**Clients** (app servers) talk to a cache cluster. **Consistent hashing** maps keys to nodes so adding a node doesn't reshuffle everything. Virtual nodes for balance.

**Replication:** each key has a primary + replica. Reads from primary (or local replica if stale OK).

**Eviction:** LRU / LFU / TTL. Memory cap per node.

**Persistence:** optional. If it's a cache, empty after crash is allowed if the DB can refill.

**L1 + L2:** in-process Caffeine (tiny, per pod) + Redis cluster (shared). L1 must be short TTL or you'll serve ghosts after deletes.

## Deep dive — the hard parts

**Invalidation:** on DB write, delete the key (or version it). TTL-only is how you serve stale prices.

**Stampede:** lock / singleflight on miss; probabilistic early expire; serve stale while one thread loads.

**Hot key:** one key hits one node. Split, replicate the hot key to many nodes, or cache in L1 + CDN.

**Thundering herd on node death:** consistent hashing + replica; don't dump all keys onto the DB at once — rate-limit refill.

**Partial failure:** if cache is down, **fail to DB with a bulkhead** (limited extra QPS) or fail the read. Say the choice.

## Extra probes

1. Compare to [Redis](/system-design/redis) cluster hash slots
2. Write-through vs cache-aside
3. Negative caching (cache 404s) to protect against missing-key attacks

**Phrase:** "Cache-aside with TTL and delete-on-write. Consistent hashing for the cluster, a lock on miss to stop stampedes, and a plan for hot keys. The DB remains source of truth."

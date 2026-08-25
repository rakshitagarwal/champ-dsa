# Distributed Cache

> Design the cache **service**, not "I'll add Redis." Interviewers want **placement, invalidation, stampede, and hashing**.

## What they ask

Interviewer: "We have 500 app servers hitting a DB that's melting at 50k QPS. Design a distributed cache layer — or design Redis Cluster itself — that gives 95% hit rate, <5ms p95, and survives nodes dying at 3am without cold-restarting the DB." They will push on consistent hashing, replication, and the thundering herd you caused.

**What they really test:** (1) Placement + hashing (mod vs consistent vs rendezvous) and why naive `hash%N` fails. (2) Cache patterns (aside / through / write-behind) and invalidation vs TTL. (3) Stampede/thundering herd prevention (singleflight, probabilistic expire). (4) Replication, failover, and persistence trade-offs. (5) Hot keys and multi-level (L1+L2) strategy.

**Scale anchor:** 500 app servers, 100k cache QPS (5:1 read:write), 10M keys, working set ~100GB (avg value 10KB). DB can handle 5k QPS comfortably but not 50k. Cache cluster: 10 nodes * 16GB = 160GB raw, replication 2x → 80GB usable. Hit rate 90% → DB 10k QPS, hit 95% → 5k QPS (target).

## Requirements

**Functional:**
- Operations: `get(key)`, `set(key, value, ttl)`, `del(key)`, `mget(keys)`, `incr/decr` (optional), `compare-and-swap` for stampede control.
- TTL per key (sliding or absolute) + max memory with eviction (LRU/LFU/TTL).
- Sharded distribution across N nodes; add/remove node with minimal key movement.
- Replication for fault tolerance (primary + 1-2 replicas, async or sync).
- Optional persistence (snapshot/AOF) — but cache may be lossy if DB is source of truth.

**Non-functional:**
- Latency p95 <5ms for hit, <10ms for miss+load (excluding DB).
- High hit rate (>90%) with bounded memory; graceful degradation when cache down.
- No **stampede**: 10k concurrent misses for same key don't fire 10k DB queries.
- Hot-key aware: one celebrity key at 100k RPS doesn't melt one node.
- Linear scale-out: add node → capacity + throughput increase without full reshuffle.

**Clarify:**
- Are we designing cache **usage** (cache-aside over existing DB) or cache **internals** (build Redis-like cluster)? (Cover both; clarify expectation.)
- Is cache source of truth or DB is? (Assume DB is truth, cache lossy — simpler correctness.)
- Eviction vs TTL priority? Memory cap per node? (Say LRU + TTL combined.)
- Consistency: per-key strong or eventual? (Eventual with delete-on-write, TTL-bounded staleness.)
- Scope: single DC or geo-replicated? (V1 single DC, mention async replication for multi-DC.)

**Out of scope (v1):**
- Geo-replicated active-active with CRDTs (v2).
- Transactions / Lua scripts (mention as Redis feature, not core).
- Search or secondary indexes on cached values.
- Persistent queue semantics — cache is ephemeral.

## Scale estimation

| Dimension | Assumption | Math | Result |
|-----------|-----------|------|--------|
| QPS | 100k ops/sec (80k get, 20k set) |  | driver for shard count |
| Key space | 10M keys * 10KB avg value + 100B key overhead | 10M * 10KB | ~100 GB working set |
| Memory | 10 nodes * 16GB = 160GB raw, RF=2 | 160/2 | ~80GB usable → need ~12 nodes or larger values for headroom |
| Hit rate 95% | 80k gets * 5% miss | 4k misses/sec to DB | DB ok (5k capacity) |
| Bandwidth | 100k ops * 10KB | 1 GB/s aggregate (~100 MB/s per node) | Needs 10 Gbps NICs |
| Eviction churn | TTL 5 min avg, 10M keys | 10M / 300s | ~33k expirations/sec (background) |
| Replication lag | async 1ms intra-AZ |  | acceptable for cache |

If hit rate drops to 80%, DB sees 16k QPS and melts — hit rate is the SLI.

## API Design

```http
// Redis-like (preferred for interview — also maps to HTTP)
GET /cache/{key}            => 200 { "value": "...", "ttlRemaining": 42 } | 404
PUT /cache/{key}
{ "value": "bytes or JSON", "ttlSeconds": 300, "nx": false }  // nx=true => set-if-not-exists (for singleflight)
=> 200 { "status": "ok" } | 409 if nx and exists
DELETE /cache/{key}          => 204
POST /cache/mget
{ "keys": ["k1","k2","k3"] }  => 200 { "k1": "v1", "k2": null, "k3": "v3" }

// Bulk / admin
POST /cache/mset { "entries": [{ "key": "k1", "value": "v1", "ttl": 60 }] } => 200
GET /cache/stats => { "hitRate": 0.94, "evictions": 1234, "memoryUsed": "12GB" }

// Redis protocol equivalent (mention)
// SET key value EX 300 NX
// GET key
// MGET k1 k2 k3
// DEL key
// INCR counter:1
// EVALSHA ... (optional)
```

For cache-in-app usage, the app calls `CacheClient.get(k)` library that handles hashing + pooling + fallback — not raw HTTP per request in high-throughput path (use RESP/binary).

## High-Level Design (HLD)

```
App Servers (500 pods, each with Caffeine L1 64MB, 10s TTL)
        |
        v
  Client Router (consistent-hash ring + health check)  -->  Config Service (membership, ring version)
        |
        +---> [Redis] Shard 1 (primary + replica)  \
        +---> [Redis] Shard 2 (primary + replica)   +-- Replication (async, 1ms)
        +---> ... 10-12 shards                         |
        +---> [Redis] Shard N (primary + replica)  /
        |
        +---> (miss) --> DB (with bulkhead: max 5k QPS from cache misses)
        |
   Fallback: if cache cluster unhealthy, go to DB with circuit breaker + coalesce
```

**Components:**
- **L1 (in-process Caffeine / Guava):** Per-pod tiny cache (64-128MB, TTL 5-10s) for hottest keys. Eliminates network RTT for 30-40% hits and shields L2 hot shard. Must use short TTL or versioning, because L1 invalidation is hard (pub/sub or TTL only).
- **L2 (distributed [Redis](/system-design/redis) Cluster):** Sharded by consistent hashing. Each shard = primary + 1-2 replicas (async). Data partitioned into 16384 hash slots (Redis Cluster style) mapped to nodes via ring. Client router knows slot→node table, updated via gossip/config.
- **Client Router / Smart Client:** Library in app server, not a proxy hop (avoids extra latency). Does: `slot = CRC16(key) % 16384`, lookup node, send command to primary (reads may go to replica if stale OK). Handles `MOVED` redirect on topology change, connection pooling, health checks, retry with backoff.
- **[Load Balancer](/system-design/load-balancer) alternative:** Some designs put Twemproxy/McRouter between apps and shards — simpler clients but extra hop and proxy becomes bottleneck/hotspot. Mention both and justify smart client for p95.
- **Config / Membership Service:** Etcd/Zookeeper or Redis Cluster gossip maintains ring version. On node add/remove, slot migration happens incrementally (one slot at a time, not stop-the-world).
- **Persistence (optional):** RDB snapshot every 15 min + AOF per write (if cache doubles as store). For pure cache-aside, persistence off — empty on crash is OK, just incurs warm-up misses guarded by stampede protection.
- **DB Bulkhead:** On cache miss, loader goes to DB through a semaphore (max concurrent DB fills). Prevents cache outage from cascading to DB.

**Write path (cache-aside, most common):**
- App write: `UPDATE DB` → `DELETE cache(key)` (delete, not set, to avoid stale race). Next read will miss and load fresh. TTL is safety net if delete fails.
- App read: `get(k)` → L1 hit? return. → L2 hit? populate L1 and return. → miss → singleflight loader → `SELECT DB` → `SET cache(k, value, ttl)` → populate L1 → return.

**Read path:** L1 → L2 → (singleflight) → DB. P95 hit path is L1 (~0.5ms) or L2 (~2ms).

## Low-Level Design (LLD)

**DB schema — cache metadata (cache itself is KV, but membership + stats need tables)**

```sql
-- Membership / slot map (backed by etcd in prod; SQL for interview clarity)
CREATE TABLE cache_nodes (
  node_id     VARCHAR(32) PRIMARY KEY,
  host        VARCHAR(255) NOT NULL,
  port        INT NOT NULL,
  status      VARCHAR(16) NOT NULL, -- 'active','joining','leaving','failed'
  slots       INT[] NOT NULL, -- e.g., '{0..1364}' for Redis hash slots
  memory_used_mb INT NOT NULL DEFAULT 0,
  updated_at  TIMESTAMPTZ NOT NULL
);

-- Per-key metadata if tracking TTL centrally (otherwise embedded in Redis)
CREATE TABLE cache_key_meta (
  key_hash    CHAR(64) PRIMARY KEY, -- SHA256(key)
  key_name    TEXT NOT NULL,
  shard_id    VARCHAR(32) NOT NULL REFERENCES cache_nodes(node_id),
  ttl_seconds INT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  version     BIGINT NOT NULL DEFAULT 1 -- for versioned invalidation
);
CREATE INDEX ON cache_key_meta (shard_id, expires_at);

-- Stats for tuning
CREATE TABLE cache_stats (
  shard_id    VARCHAR(32) NOT NULL,
  ts          TIMESTAMPTZ NOT NULL,
  hit_rate    DOUBLE PRECISION NOT NULL,
  qps         INT NOT NULL,
  evictions   BIGINT NOT NULL,
  PRIMARY KEY (shard_id, ts)
) PARTITION BY RANGE (ts);
```

**Key classes & responsibilities**

```java
class HashRing {
  // Consistent hashing with virtual nodes (e.g., 150 vnodes per physical)
  Node getNode(String key); // CRC16(key) % 16384 -> slot -> node
  void addNode(Node n);     // moves ~1/N keys
  void removeNode(Node n);
}

class CacheClient {
  Value get(String key); // L1 -> L2 -> singleflight loader -> DB -> populate
  void set(String key, Value v, int ttl, boolean nx);
  void del(String key);  // delete + version bump
  Map<String,Value> mget(List<String> keys); // scatter-gather to shards
}

class SingleFlight {
  // coalesce concurrent misses for same key
  Value load(String key, Loader loader); // only one thread loads, others wait on future
}

class EvictionPolicy {
  void onAccess(String key); // LRU linked list / LFU counter
  String pickVictim();       // evict when memory > maxmemory
}

class ReplicationManager {
  void replicate(Node primary, Node replica, Op op); // async
  void promoteReplica(Node replica); // on primary failure via failover
}

class VersionedCache {
  // pattern: SET key value:version, GET returns version, invalidator bumps version
  long bumpVersion(String key); // used instead of DEL for L1+L2 coherence
}
```

**Concurrency handling / algorithms:**
- **Consistent hashing with vnodes:** Physical node down → only `1/N` keys remap (vs `hash%N` remaps ~all). 150 virtual nodes per physical smooths load to ±10%. Redis Cluster maps to hash slots (0-16383) — similar idea. Use `CRC16` or `Murmur3`.
- **Stampede prevention — singleflight + early recompute:** `SingleFlight` ensures 10k concurrent `get(miss)` for same hot key coalesce into 1 DB load; others await same future. Add **probabilistic early expiration:** refresh key before TTL with probability `p = exp((now - expiry)/beta)` (beta ~ -200) so not all pods expire simultaneously. Or **serve stale while revalidate:** on TTL expiry, return stale value and trigger async background reload (client gets stale ~100ms but DB not hammered).
- **Hot key detection & mitigation:** Track per-key QPS in each shard (Count-Min Sketch). If key QPS > threshold (e.g., 10k/sec), **replicate hot key** to many nodes (push to all replicas or L1 5s) or shard value into `hotkey:{id}:{shard}` pieces and scatter `mget`. Celebrity key no longer hits single shard.
- **Versioned invalidation (alternative to DEL):** Instead of `DEL k`, do `INCR k:version` and store `value:version`. Readers do `GET k` + `GET k:version`, compare versions. Solves DEL race where old writer re-sets after delete. TTL bounds staleness regardless.
- **Write ordering:** Cache-aside race: `Thread A read miss -> SELECT v1; Thread B UPDATE v2 -> DEL; Thread A SET v1 (stale)`. Fix: `SET` with `NX` or version check, or just `DEL` after `SET` and rely on TTL. Mention the race and chosen fix.
- **Replication & failover:** Async primary→replica; replica lag <5ms intra-AZ. On primary death, sentinel/raft promotes replica; client router receives `MOVED`/`CLUSTERDOWN` and refreshes slot map. During failover window (~5s), reads may go to replica (stale OK) or to DB with bulkhead.

**Design patterns:**
- **Cache-Aside (lazy loading):** App loads on miss; simplest and most common for DB-backed cache.
- **Write-Through / Write-Behind (alternative):** Cache writes sync to DB (through) or async batch (behind) — mention when to use (write-heavy small values, need fast writes).
- **Singleflight / Coalescing:**经典 stampede prevention (Go `singleflight`, Java `CompletableFuture` dedup).
- **Decorator — L1+L2 multi-level:** L1 as decorator over L2; transparent fallback.
- **Circuit Breaker + Bulkhead:** Isolate DB from cache-failure cascade.

## Deep dive — Invalidation is the hard part

TTL alone guarantees **stale reads until expiry** — unacceptable for price/inventory where serving $10 after update to $12 for 5 minutes loses money. So **delete-on-write** is mandatory: transaction `BEGIN; UPDATE db; DELETE cache(k); COMMIT`. But `DELETE` can fail or race (see stale SET above). Defenses: (1) **Version bump** (`k:version++`, readers verify version) handles re-ordered SET after DEL. (2) **Outbox / CDC:** DB change captured via Debezium/[Kafka](/system-design/kafka) and async invalidator retries `DEL` until acked — survives process crash between DB commit and cache DEL. (3) **Short TTL as safety net:** Even if DEL lost, key expires in 30-60s. Combine all three; interviewers want you to say "cache invalidation is best-effort + TTL bound". For **L1+L2** coherence, DEL must reach both layers: L2 `DEL` + pub/sub `invalidate L1` to all pods (or L1 TTL 5s so you can skip pub/sub and accept 5s staleness — practical trade-off). Name your choice.

## Deep dive — Hot keys, stampede and thundering herd on node death

**Hot key:** One key (`trending:global`) receives 100k RPS, all hashes to one shard, that shard CPU 100% while others idle. Detection via per-shard top-K counter (SpaceSaving 1% memory). Mitigation: (a) **Replicate hot key** to 2-3 random shards + L1 cache (10× fan-out); client router picks random replica. (b) **Split** large hot value into chunks `hot:{id}:chunk:{n}` and assemble via `mget` scatter. Briefly, "make hot key cold by duplication". **Stampede:** Cache expiry at `T` — 500 servers miss at same ms and fire 500 DB queries for same key. Fix: singleflight coalesce + `SET NX` lock (`SET k:lock 1 NX EX 5` — only winner loads). Add jitter to TTL (`300s ± 30s`) so keys don't align. **Thundering herd on node death:** Node holds 10% of keys; on crash, 10% misses flood DB simultaneously. Fix: replica already warm (reads failover to replica instantly); if no replica, rate-limit refill (`token bucket 500 QPS to DB`) + serve stale from replica snapshot if available. Recovery: slot migration in background, not thundering `MIGRATE` of all keys at once.

## Handling failures and scale

- **Node failure:** Gossip detects within 2s; replicas promoted, slot map version bumped, clients refresh via `MOVED` or config push. No data loss if `acks` to replica before ack to client (configurable). Otherwise loss is acceptable — DB repopulates on miss with stampede guard.
- **Network partition (split brain):** Prefer AP for cache (available + partition tolerant): both sides serve stale, reconcile on heal via last-write-wins + TTL. Not a CP store.
- **Cache cluster full outage:** Circuit breaker opens after 50% error rate 10s; apps bypass cache and go to DB through bulkhead (max 5k QPS, queue excess). Serve degraded but not 500. Alert fires.
- **Memory pressure / eviction storm:** `maxmemory 12GB` per shard + `maxmemory-policy allkeys-lru`. Monitor evictions/sec; scale by adding shards and rebalancing slots before hit rate drops below 90%.
- **Cold start / warm-up:** On deploy, new cluster empty → all misses. Warm via **shadow reads** (async `GET` from old cluster) or replay recent hot keys from Kafka/DB access log. Rate-limit warm-up fills.
- **Persistence choice:** If cache is lossy, disable AOF/RDB. If used as store (sessions), enable RDB 15 min + AOF every second; replica rebuild from RDB on restart.
- **Observability:** Per-shard hit rate, p95 latency, evictions, replication lag, hot-key QPS, DB bulkhead queue depth. Alert on hit rate <90% or replication lag >100ms.
- **Scale knobs:** Add shards → slot rebalance (consistent hash moves `1/N`). Scale L1 size per pod if network is bottleneck. Increase TTL for higher hit rate, but accept staler reads.

## Extra probes

- Compare to [Redis](/system-design/redis) Cluster hash slots vs pure consistent hashing — slots allow `MGET` with `{hashtag}` co-location; mention hashtag `key:{user123}:profile` forces same slot.
- Write-through vs cache-aside — when to use each (through for write-heavy + need cache always warm).
- Negative caching — cache `404`/`null` with short TTL (30s) to protect against missing-key attacks that would otherwise always hit DB.
- Bloom filter in front of cache — for huge key space, check Bloom before cache miss to avoid DB lookup for guaranteed-miss keys.
- Why not just enlarge DB? — Caching gives 10x cost reduction, <5ms vs 20-50ms DB, and isolates read scale from write scale.
- Security: `KEYS *` disabled in prod; use `SCAN` to avoid blocking.

**Phrase:** Cache-aside with TTL and delete-on-write. Consistent hashing for the cluster, a lock on miss to stop stampedes, and a plan for hot keys. The DB remains source of truth.

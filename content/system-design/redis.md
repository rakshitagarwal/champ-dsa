# Redis

> In-memory data structure store. In interviews it is almost always **cache, sessions, rate limits, or presence** — not your source of truth.

Redis is a single-threaded server (per instance) that speaks a simple protocol. Reads and writes are typically **~1ms** in the same datacenter. Data lives in RAM, with optional snapshot / AOF to disk. If the process dies and you had no persistence, the cache is empty. Your database must still be able to answer.

## When you pick it

1. Hot keys that would melt Postgres (session, feed page 1, short URL lookup)
2. Counters and sliding windows for [rate limiting](/system-design/rate-limiter)
3. Pub/sub or presence heartbeats for chat
4. Distributed locks (`SET key nx ex`) — use carefully
5. Tiny job lists — fine for low volume; real work queues → [Kafka](/system-design/kafka)

Do **not** put user-generated blobs, full search, or years of analytics in Redis. RAM is expensive and eviction will surprise you.

## Patterns that show up in designs

**Cache-aside (lazy loading).** App reads Redis. Miss → DB → `SET` with TTL. After a write, delete or update the key. This is the default you should draw.

**Write-through.** Write cache and DB together. Simpler reads, slower writes.

**Write-behind.** Write cache, flush DB async. Fast and dangerous — say it only if loss is OK.

**Stampede.** A popular key expires and 10k requests hit the DB. Mitigate with a lock / singleflight, a slightly random TTL, or serving stale for a few seconds.

**Hot key.** One celebrity `userId` lives on one Redis shard. Split the key (`feed:123:0`, `feed:123:1`) or cache at the CDN / application layer.

## Data structures you should name

1. **String** — JSON blob, session token, short URL
2. **Hash** — object fields without rewriting the whole blob
3. **Sorted set** — leaderboards, "latest N", delayed jobs by score=timestamp
4. **List** — naive queue (OK for interviews, not for huge backlog)
5. **HyperLogLog** — unique counts with error (view uniqueness)

## Failure modes to mention

1. **Eviction** (`allkeys-lru`) — treat Redis as maybe-empty
2. **Failover** — replica promotion; a short window of stale or lost writes
3. **Persistence** — AOF vs RDB; "cache" usually means you can rebuild
4. **Cluster** — hash slots; multi-key ops must land on one slot (`{userId}` hash tags)

**Phrase:** "Redis is the hot path. Postgres (or S3) stays the source of truth. TTL plus delete-on-write, and I'll call out stampede on the hottest keys."

**See also:** [distributed cache](/system-design/distributed-cache), [rate limiter](/system-design/rate-limiter), [Bitly](/system-design/bitly).

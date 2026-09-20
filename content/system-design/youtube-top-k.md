# YouTube Top K

> Trending videos. The interview is **counting at scale** and keeping a **cheap Top-K**, not training YouTube's real recommender.

> Count views in Flink windows, keep a Top-K heap per window, serve from cache. Late events handled with watermarks.

## What they ask

"Top 100 videos in last 24h globally/per country — views as firehose, dashboard <100ms."

**Tests:** Events in a log not row `UPDATE views`; windowing + watermarks; O(K) not sort entire catalog; hot-key salting.

**Scale anchor:** ~5B plays/day (~58k/s avg, 300–500k peak viral); `GET /trending` ~10k RPS (CDN/Redis).

## Requirements

**Functional:**
- Ingest `{ videoId, region, categoryId, ts, eventId, userId? }` (batched, at-least-once).
- `GET /trending` for windows `1h|24h|7d`, region, optional category, `k` up to ~200.
- Return ranks with view counts + metadata (title, channel, thumb); rank delta optional.
- Optional debounce: one view per user per video per 10m.

**Non-functional:**
- Read p95 <80ms from [Redis](/hld/caching-strategies); ingest off critical path.
- Trending may lag 10–30s; avoid wild rank flips (coalesce publishes).
- Fault-tolerant: rebuild from Kafka + checkpoints; no `ORDER BY views` on OLTP.

**Clarify:** What counts as a view (3s vs 30s)? Max `k`? Per-user dedupe within 10m? Fraud basic vs ML?

**Out of scope (v1):** Personalized For You, comment/like in score, exact billing-grade counts.

## Scale estimation

| Dimension | Assumption | Result |
|-----------|-----------|--------|
| View events | 5B/day | ~58k/s avg, ~300–500k peak viral |
| Trending reads | 10k RPS | CDN + Redis — ~90% cache hit |
| Serving payload | 100 ids × ~50KB hydrated | Origin ~500 MB/s without cache |
| Raw log | ~200B/event | ~1 TB/day Kafka; ~7 TB/week retention |
| Distinct videos/day | ~50M in window | Flink state + RocksDB spill OK |
| Heap state | K=100 × ~200 regions | <10 MB Redis lists |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/views:batch` | Ingest (202, idempotent `eventId`) |
| `GET` | `/v1/trending` | `window`, `region`, `category`, `k` |
| `GET` | `/internal/counts` | Hydration counts |

## High-Level Design (HLD)

![YouTube Top-K architecture: Kafka, window agg, CMS/heaps, trending API](/images/hld/youtube-top-k-architecture.svg)

```
Player → Edge collector → Kafka views.raw → Flink: dedupe (eventId TTL) → sliding window counts + min-heap Top-K per region
  → Redis trending:{region}:{window} + optional Cassandra
Trending Service → Redis → hydrate metadata cache → CDN on response
```

**Components:** Edge collector (batch 50ms) → [Kafka](/hld/message-queue) → [Flink](/hld/message-queue) dedupe + windowed count + min-heap per `(region, window)` → Redis sorted list + optional [Cassandra](/hld/nosql-databases) point counts. Trending Service hydrates from video metadata cache (L1 + L2).

**Write:** 202 fast, never touch OLTP on ingest. **Read:** `GET trending:IN:24h` → mget metadata → CDN-cache response 15–30s.

## Deep dive — windows and late events

Event-time watermarks (delay 30–60s), allowed lateness ~5m; minute buckets summed for 24h slide. Publish to Redis at most every 15s per region to limit churn. Beyond lateness → side output adjustments.

## Deep dive — hot keys and Top-K

Salt `videoId` in stage-1 count, merge in stage-2. Min-heap size K: O(N log K). Optional Count-Min Sketch for cardinality discussion. Never `ORDER BY views` on MySQL at 60k/s.

## Handling failures and scale

- **Kafka down:** Edge disk buffer + client retry; `429` when buffer full.
- **Flink fail:** Checkpoint every ~30s; replay from offset; dedupe by `eventId`.
- **Redis hot key:** Read replicas + service L1 (5s); replicate trending keys for top regions.
- **Writer stall:** Serve last snapshot with `Age` header — prefer stale over 500.
- **Batch reconciler (optional):** Hourly Spark over S3 raw vs Flink counts if drift >0.1%.
- **Scale:** Partition Kafka + Flink parallelism; independent heap per `(region, category)`.

**Phrase:** Views are events. Flink counts in a sliding window and publishes a Redis list of 100 ids. The website never sorts the whole catalog.

**Remember:** CQRS — log is truth, trending list is materialized view; heap per region; watermarks for lateness.

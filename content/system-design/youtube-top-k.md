# YouTube Top K

> Trending videos. The interview is **counting at scale** and keeping a **cheap Top-K**, not training YouTube's real recommender.

## What they ask

"Top 100 videos in the last 24 hours" (global or per country). Views arrive as a firehose.

## Requirements

**Functional:** ingest a view event, query top K for a window, maybe per-region.

**Non-functional:** slightly stale is OK; don't hit the video table on every view; one video going viral shouldn't melt one counter machine if you can help it.

## API

1. Internal: `POST /events/view` `{ videoId, region, ts }` (usually from the player, batched)
2. `GET /trending?window=24h&region=IN&k=100`

## Design

**Do not** `UPDATE videos SET views = views + 1` as the system of record for trending.

**Pipeline:** player → [Kafka](/system-design/kafka) `views` → [Flink](/system-design/flink) / consumer aggregates `count` per `videoId` in a sliding window → writes a serving table.

**Serving Top-K:**

1. **If K and cardinality are small:** keep a min-heap (size K) per window in Flink state; emit the heap to Redis every few seconds.
2. **If many videos:** count in Cassandra/Redis hashes, then a **periodic job** computes Top-K (every 30s). Trending can lag — that's fine.
3. **Count-min sketch / heavy hitters** if the interviewer wants an approximation algorithm.

**Read path:** `GET /trending` reads Redis `trending:IN:24h` — a list of 100 ids — then hydrates titles from cache.

## Deep dive — windows and viral videos

**Event time:** a view delayed 10 minutes still belongs in the right window (watermarks).

**Hot key:** one video, millions of views/s. Don't shard by `videoId` onto one Flink key without splitting (`videoId + bucket`) then summing.

**Decay:** trending is not all-time views. Weight recent windows higher, or use a 24h sliding window only.

**Fraud:** filter obviously bot views before they enter Top-K (simple rate per IP).

## Extra probes

1. Per-category trending — same pipeline, extra dimension in the key
2. Cold start new video — separate "rising" list
3. Consistency: serving store is derived; source is the log

**Phrase:** "Views are events. Flink counts in a sliding window and publishes a Redis list of 100 ids. The website never sorts the whole catalog."

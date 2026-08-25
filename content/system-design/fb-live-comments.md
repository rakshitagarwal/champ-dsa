# FB Live Comments

> Comments on a **live** video. The problem is **fan-out of a hot firehose** to millions of viewers without one chat server dying.

## What they ask

Design comments for a Facebook / YouTube / Instagram **Live** stream: millions watch one video concurrently, a fraction comment at high rate, and every viewer should see new comments with **~1–2s lag** — not perfect global order, not every single comment on screen.

What the interviewer tests:

- Can you avoid the naive `poll GET /comments` and the naive `one WS server for 2M viewers`?
- Can you separate the **write log** (durable, ordered per stream) from the **read fan-out** (sampled, partitioned, pub/sub)?
- Do you have a story for **backpressure, sampling, and catch-up** when the UI cannot render 1K comments/s?
- Do you reuse pieces from [Rate Limiter](/system-design/rate-limiter), [Kafka](/system-design/kafka), [Redis](/system-design/redis), [Cassandra](/system-design/cassandra), [WebSocket](/system-design/websocket)?

A strong answer: *append to per-stream log → partition viewers across subscriber shards → broadcast via pub/sub → sample if overloaded → catch-up from durable store on join*.

## Requirements

| Category | Details |
|---|---|
| **Functional** | Post comment on live stream, subscribe to new comments (real-time), reactions (scoped), pagination for catch-up, moderation highlight/pin, viewers count |
| **Non-functional** | Huge fan-out (1 stream → 2M viewers), bounded lag ~1–2s, posting still works when read path is degraded (degrade reads, not writes), no need for total global order across viewers |
| **Clarify** | Do we need **every** comment rendered? Usually **no** — sample 50/s + show "12K comments" + dedicated "all" slow path. Max comment length? Auth required? Ask before sizing |
| **Out of scope v1** | VOD comments (different access pattern, shard by videoId — no live fan-out), video transcode/CDN, full moderation ML (name as async box) |

## Scale estimation

Assume a top stream: 2M concurrent viewers, 1% comment at 0.1 comment/min per commenter → 2K comments/min ≈ **33 comments/s** sustained, spike 300/s during highlight. A mega-event: 10M viewers, 200 comments/s.

| Metric | Math | Result |
|---|---|---|
| Write QPS (comments) | 33–200/s per hot stream; 100 hot streams concurrently | **3K–20K writes/s** globally |
| Fan-out multiplier | 200 comments/s × 2M viewers = **400M deliveries/s** if every comment to every viewer | Impossible via 1:1 push — must sample/partition |
| Storage (durable) | 200/s × 300 bytes × 3600s = **~216 MB/hr** per mega-stream | Tiny — goes to [Cassandra](/system-design/cassandra), not hot path |
| Connections | 2M WS per stream × 100 streams = **200M sockets** globally if naïve | Must shard subscriber fleet: 2M / 50K per node = 40 nodes per mega-stream |
| Bandwidth (sampled) | Deliver 20 comments/s × 300 bytes × 2M = **12 GB/s** if sampled to 20/s | Still huge — requires regional pub/sub + edge aggregation, not one DC |

Conclusion: the **bottleneck is fan-out, not writes**. You can append 200/s to [Kafka](/system-design/kafka) trivially; you cannot push 400M/s 1:1. So you **partition viewers** and **sample**.

## API Design

```http
POST /v1/streams/{streamId}/comments
Authorization: Bearer <token>
{ "text": "🔥🔥 what a goal!", "replyTo": null }
→ 201 { "commentId":"c_9f1","streamId":"s_abc","authorId":"u_1","text":"...","ts":1714000000,"status":"visible" }
→ 429 { "error":"rate_limited", "retryAfterMs": 2000 } // via Rate Limiter

GET /v1/streams/{streamId}/comments?cursor=c_9f0&limit=50
→ 200 { "comments":[{ "commentId":"...","author":"...","text":"...","ts":... }], "nextCursor":"c_9f2" }

WS wss://live.example/streams/{streamId}/comments?token=...
  Server → Client: { "type":"comment", "commentId":"c_9f1","author":"u_1","text":"...","ts":1714000000,"isSampled": true }
  Server → Client: { "type":"count", "totalComments": 48201, "viewers": 2034122 }
  Server → Client: { "type":"highlight", "commentId":"c_9f3","reason":"pinned" }
  Client → Server: { "type":"ping" }  // heartbeat, server tracks presence
```

Headers: `Idempotency-Key` on POST for retry; `Retry-After` on 429. WS query param `sampleRate=20` lets client hint desired rate. Moderation is async — comment may arrive as `pending` then `visible`/`hidden` after ML.

## High-Level Design (HLD)

```
[ Comment Authors ] --HTTPS POST--> [ API Gateway ] --> [ Comment Service ] --append--> [ Kafka (topic=live.comments, key=streamId) ]
                                                        |                         \
                                                        |                          `--> [ Cassandra (durable, for catch-up) ]
                                                        |                          `--> [ Moderation Workers (async ML) ]
                                                        |
[ Viewers 2M ] --WS/SSE--> [ Subscriber Fleet (sharded by viewer, 40 nodes) ] <--subscribe-- [ Pub/Sub (Redis/NATS) channels live:{streamId}:{shard} ]
                               |         |         |
                               v         v         v
                          [ Presence (Redis) ] [ Sampling / Rate Adaptor per shard ] [ Edge Aggregator / CDN for counts ]
```

**Components:**

- **Comment Service (write):** Validates ([Rate Limiter](/system-design/rate-limiter) per user per stream), appends to [Kafka](/system-design/kafka) topic partitioned by `streamId` (order per stream), dual-writes to [Cassandra](/system-design/cassandra) for catch-up. Returns 201 immediately; moderation is async.
- **[Kafka](/system-design/kafka) Log:** Single partition per hot stream ensures order without global lock. Retention hours–days. Acts as replay source for new subscriber nodes.
- **Subscriber Fleet (read):** Holds viewer [WebSocket](/system-design/websocket) connections, sharded by `hash(viewerId)` or LB least-connections. Each shard subscribes to a **dispatcher** that fans Kafka → pub/sub channels `live:{streamId}:{shardId}`. Viewers in a shard get a **sampled** feed (e.g., token bucket 20/s per shard) plus `count` and `highlight` out-of-band.
- **Pub/Sub (Redis/NATS):** Regional broadcast. One dispatcher per stream partition publishes to N shard channels; subscriber nodes are simple consumers (no per-viewer Kafka consumer — that would be 2M consumers).
- **[Cassandra](/system-design/cassandra) / Dynamo:** Durable store `PK=streamId, SK=ts`. Used for `GET /comments?cursor=` catch-up and replay after disconnect.
- **Presence:** Viewer count in [Redis](/system-design/redis) (`INCR live:{streamId}:viewers` on WS connect with TTL). Not in Postgres.
- **Moderation:** Async consumer of Kafka; marks comment `hidden` and emits `comment.moderated` → dispatcher sends `remove`/`hide` to shards.

**Write flow:** `POST /comments` → Gateway rate-limit → Comment Service `INSERT Cassandra` + `produce Kafka{streamId, comment}` (outbox for exactly-once) → `201` + WS push via dispatcher → sampled delivery.

**Read flow (subscribe):** Viewer opens stream → `GET /comments?cursor=latest&limit=50` for last N (from Cassandra) → then `WS /streams/{id}/comments` → assigned to a subscriber shard (consistent hash) → shard subscribes to `live:{streamId}:{shard}` → receives sampled comments at ~20/s → if client slow, **drop** (never buffer unbounded).

## Low-Level Design (LLD)

### DB schema

```sql
-- Cassandra CQL
CREATE TABLE live_comments (
  stream_id   UUID,
  ts          BIGINT, -- server snowflake, clustering
  comment_id  UUID,
  author_id   UUID,
  text        TEXT,
  reply_to    UUID,
  status      TEXT, -- 'visible'|'pending'|'hidden'
  PRIMARY KEY (stream_id, ts, comment_id)
) WITH CLUSTERING ORDER BY (ts DESC);
-- Catch-up: SELECT * FROM live_comments WHERE stream_id=? AND ts < ? LIMIT 50

CREATE TABLE streams (
  stream_id   UUID PRIMARY KEY,
  owner_id    UUID,
  title       TEXT,
  status      TEXT, -- 'live'|'ended'
  started_at  BIGINT,
  ended_at    BIGINT
);

CREATE TABLE highlights (
  stream_id   UUID,
  comment_id  UUID,
  pinned_by   UUID,
  pinned_at   BIGINT,
  PRIMARY KEY (stream_id, pinned_at, comment_id)
);

-- Redis (ephemeral)
-- live:{streamId}:viewers  → INT (INCR/DECR with TTL)
-- live:{streamId}:shard:{n} → Pub/Sub channel
-- user:node  → hash viewerId -> subscriberNodeId (for routing if needed)
-- sampling bucket: live:{streamId}:shard:{n}:tokens → token bucket per shard

-- Postgres for users/auth (small)
-- users(user_id PK, handle, ...)
```

### Key classes / responsibilities

```java
class CommentService {
  Comment post(streamId, userId, text) // rate-limit, validate, persist Cassandra, produce Kafka, return 201
  List<Comment> catchUp(streamId, cursor, limit) // CQL range query
}
class Dispatcher { // one per Kafka partition / hot stream
  void onKafkaMessage(Comment c) // for each shard channel: maybeSample(c, shard) → publish Redis/NATS live:{streamId}:{shard}
  boolean maybeSample(Comment c, int shard) // token bucket 20/s; always pass highlights / friends
}
class SubscriberNode {
  void onViewerConnect(viewerId, streamId) // assign shard, subscribe to channel, send catch-up + live
  void onPubSubMessage(Comment c) // push to all local WS conns for that stream; drop if client buffer full
  void onBackpressure(viewerConn) // drop oldest, increment dropped counter, send {type:"dropped", count: N}
}
class ModerationWorker { // Kafka consumer
  void moderate(Comment c) // async ML → update Cassandra status, publish comment.moderated → dispatcher sends hide
}
class PresenceService {
  void heartbeat(streamId, viewerId) // INCR with TTL, publish viewer count every 2s per shard
}
```

### Concurrency & algorithms

- **Idempotent produce:** `commentId` = Snowflake (or `authorId + clientMsgId` dedup). Kafka producer `enable.idempotence=true`, exactly-once via outbox (write Cassandra + outbox in same batch, relay to Kafka).
- **Sampling:** Per-shard **token bucket** (e.g., 20 tokens/s, burst 40). On `onKafkaMessage`, try consume; if empty, drop or aggregate into `count` badge ("12K new comments"). Highlights and friends bypass sampling.
- **Backpressure:** Each WS connection has bounded buffer (e.g., 100 msgs). On overflow, **drop** and send `dropped` signal — never grow heap or block dispatcher.
- **Sharding:** `shardId = hash(viewerId) % numShards` or LB least-connections; subscriber nodes are stateless so any can take any viewer. Dispatcher knows `numShards` and publishes to each.

### Patterns used

Partitioned Fan-out, Sampled Delivery, Pub/Sub, CQRS (write to log, read via pub/sub + cache), Token Bucket (sampling), Backpressure Drop, Presence with TTL, Outbox Pattern.

## Deep dive — sampling vs total order

Total order of millions of comments is **expensive and useless** — a phone renders ~5 at a time. So you guarantee **order per partition** (Kafka partition = total order for that stream) but **not** that every viewer sees every comment. Provide three paths: (a) **sampled firehose** (20/s, best-effort), (b) **pinned/highlighted** (always delivered), (c) **your friends' comments** (small filtered query, always delivered). Clients reconcile by `ts` and dedup by `commentId`. Interviewers love hearing "we intentionally drop comments on the UI path" — it shows you understand the bottleneck is human attention, not durability.

## Deep dive — backpressure and catch-up on join

If a client is **slow** (bad Wi-Fi), do not buffer unbounded on server — that OOMs the subscriber fleet. Drop with a counter and let client show "You're behind — 3K new comments". On **join**, the viewer first `GET /comments?cursor=latest` gets last N (e.g., 50) from [Cassandra](/system-design/cassandra), then attaches WS for live — so gap between REST and WS is covered by dedup on `commentId`. On **reconnect**, send `cursor=lastSeenCommentId` and server replays from that cursor (Cassandra range), then resumes live. Dispatcher lag is monitored; if a shard lags > 2s, shed sampled rate further.

## Deep dive — moderation and abuse without blocking writes

Moderation (toxicity, spam) runs **async** as a Kafka consumer with 200–400ms ML — do not block `POST /comments` on it. Write is `status=pending` → after ML, update to `visible`/`hidden`; dispatcher sends `hide` to shards if hidden. Abuse: [Rate Limiter](/system-design/rate-limiter) **per user per stream** (e.g., 1 comment/2s, burst 5) at the gateway; global per-IP limit as backup. Q&A mode is a separate filtered topic (`live.qna`) with stricter sampling and mod queue.

## Handling failures and scale

- **Subscriber node crash:** Viewers reconnect via LB to another node; presence count self-heals via TTL; no message loss because durable log is in [Kafka](/system-design/kafka)/Cassandra — client catches up by cursor.
- **Dispatcher lag / Kafka consumer lag:** Autoscale dispatchers per hot stream; add partitions only for new streams (hot stream stays one partition for order). If lag > threshold, increase sampling drop rate (deliver 10/s instead of 20/s).
- **Cassandra hotspot (viral stream):** Single `streamId` partition is hot — use `TWCS` + large partition handling, and front with Redis cache of last 200 comments per stream (updated by dispatcher) so catch-up rarely hits Cassandra.
- **Redis/NATS pub/sub down:** Fallback to polling `GET /comments?cursor=` every 2s (degraded but functional); writes still append to Kafka.
- **Thundering join (stream start):** 2M viewers join in 10s — pre-warm subscriber fleet (HPA on connection count), stagger catch-up with jitter, serve initial 50 from Redis cache not Cassandra.
- **Cross-region:** Replicate Kafka topic regionally or use per-region dispatcher + periodic cross-region sync for counts; viewers connect to nearest region's subscriber fleet (latency over correctness).

## Extra probes / follow-ups

1. **Moderation:** Async ML, delay overlay a few hundred ms — client shows "sending…" then `visible`/`hidden`; human mods get a separate queue.
2. **Abuse:** Per-user per-stream [Rate Limiter](/system-design/rate-limiter) + global IP limiter; shadow-ban by still 201 but not fanning to others.
3. **Q&A mode:** Separate filtered topic with upvotes, only `top-K` fanned to all, rest on demand — avoids firehose for questions.
4. **Reactions (likes/hearts):** Aggregated counter per window, not per-comment fan-out — push `count` every 1s, not each heart.
5. **See also:** [WebSocket](/system-design/websocket), [Notification System](/system-design/notification-system) for offline highlights.

**Phrase:** Writes go to a per-stream log. Viewers connect to sharded subscriber nodes and get a sampled live feed. We don't try to render every comment for 2 million phones.


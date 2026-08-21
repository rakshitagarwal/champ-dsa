# FB Live Comments

> Comments on a **live** video. The problem is **fan-out of a hot firehose** to millions of viewers without one chat server dying.

## What they ask

Millions watch a stream. A fraction comment. Everyone should see new comments with a second or two of lag — not a perfect global order.

## Requirements

**Functional:** post comment, subscribe to new comments, maybe reactions.

**Non-functional:** huge fan-out, bounded lag, posting still possible when read path is busy (degrade reads).

**Clarify:** do we need *every* comment on screen? Usually **no** — sample / top comments + a slow "all" path.

## API

1. `POST /streams/{id}/comments` `{ text }`
2. `WS /streams/{id}/comments` or SSE
3. `GET /streams/{id}/comments?cursor=` catch-up

## Design

**Write:** comment service appends to a log ([Kafka](/system-design/kafka) topic partitioned by `streamId`) and a durable store for catch-up ([Cassandra](/system-design/cassandra) / Dynamo).

**Read (naive):** each viewer holds a WS to a chat box. 2M connections × one stream = that box dies.

**Read (real):** **don't** send every comment to every client.

1. **Partition viewers** across many subscriber nodes (connection shards).
2. **Broadcast internally** via the Kafka partition for that stream — each subscriber node is a consumer group member? Better: one **dispatcher** per stream partition publishes to a pub/sub (Redis, NATS) channel `live:{streamId}:{shard}`.
3. Clients in a shard get a **sampled** feed if QPS is insane (show 50/s, drop rest, or show "12k new comments").

**Presence** of connections lives in the subscriber fleet, not in Postgres.

## Deep dive — sampling vs total order

Total order of millions of comments is expensive and useless on a phone screen. Give: (a) a firehose sample, (b) pinned / highlighted, (c) your friends' comments (small query). Interviewers love hearing "we drop comments on the UI path."

**Backpressure:** if a client is slow, drop — don't buffer forever.

**Catch-up on join:** last N from Cassandra, then attach to live.

## Extra probes

1. Moderation: async ML, delay overlay a few hundred ms
2. Abuse: [rate limiter](/system-design/rate-limiter) per user per stream
3. Q&A mode: separate filtered topic

**Phrase:** "Writes go to a per-stream log. Viewers connect to sharded subscriber nodes and get a sampled live feed. We don't try to render every comment for 2 million phones."

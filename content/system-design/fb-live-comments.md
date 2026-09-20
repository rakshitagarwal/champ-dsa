# FB Live Comments

> Comments on a **live** video. The problem is **fan-out of a hot firehose** to millions of viewers without one chat server dying.

> No polling for 1M viewers — sampling + WebSocket fan-out, regional edge nodes, some lag acceptable.

## What they ask

Live stream: millions watch, thousands comment/s — show new comments with **~1–2s lag**, not every comment on every phone.

**Tests:** Not `poll GET /comments` or one WS box for 2M sockets; **write log** vs **sampled read fan-out**; backpressure and catch-up on join.

**Scale anchor:** 2M viewers × even modest comment rate → impossible 1:1 delivery; must **partition + sample**.

## Requirements

| Category | Details |
|---|---|
| **Functional** | Post comment, WS subscribe, reactions (aggregated), catch-up pagination, pin/highlight, viewer count |
| **Non-functional** | Bounded lag ~1–2s; writes durable when reads degrade; no global total order required for UI |
| **Clarify** | Render every comment? Usually **no** — sample ~20/s + total count |
| **Out of scope v1** | VOD comments pattern, video CDN, full moderation ML (async box) |

## Scale estimation

| Metric | Math | Result |
|---|---|---|
| Writes | 33–200/s per mega-stream | [Kafka](/hld/message-queue) trivial |
| Naive fan-out | 200/s × 2M viewers | ~400M deliveries/s — impossible |
| Connections | 2M WS/stream | Shard subscriber fleet (~50k/node) |
| Storage | 200/s × 300B | ~216 MB/hr/stream in [Cassandra](/hld/nosql-databases) |
| Sampled egress | ~20/s × 300B × 2M viewers | Still huge — regional pub/sub + edge aggregation |

**Conclusion:** Fan-out dominates; writes to Kafka are the easy part.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/streams/{id}/comments` | Post (+ rate limit, idempotency) |
| `GET` | `/v1/streams/{id}/comments` | Catch-up cursor |
| `WS` | `/streams/{id}/comments` | Live sampled feed + counts |

WS messages: `comment`, `count`, `highlight`; bounded client buffer — server drops if slow.

**Rate limit:** [Rate limiter](/hld/rate-limiter) per user per stream on POST (e.g. 1 comment / 2s); `429` + `Retry-After`.

## High-Level Design (HLD)

![Live comments architecture: comment svc, pub/sub, realtime fleet, SSE](/images/hld/fb-live-comments-architecture.svg)

```
POST → Comment Service → Cassandra (catch-up) + Kafka (key=streamId, ordered per stream)
  → Dispatcher → Pub/Sub channels live:{streamId}:{shardId} (token-bucket sample ~20/s/shard)
  → Subscriber fleet (WS, sharded by viewer) + Redis presence (viewer count)
  Moderation async → hide events to shards
```

**Component roles:**
- **Comment Service:** Validates, persists catch-up row, produces to Kafka (partition = `streamId` for order).
- **Dispatcher:** One per hot partition; token-bucket sample per shard; always forward pins/highlights.
- **Subscriber fleet:** Holds [WebSocket](/hld/networking) connections; pub/sub consumer per shard channel.
- **Moderation:** Async ML consumer → update status → fan `hide` to shards.

**Write:** Rate-limit → Cassandra + Kafka (outbox) → 201. **Read:** `GET` last N → WS shard → sampled stream + aggregate counts every ~2s (not per-heart fan-out).

## Deep dive — sampling vs order

Kafka partition per hot stream gives **order in the log**; viewers get **sampled subset** + total count. Friends/pins can bypass sampler. Dedup client-side by `commentId`.

## Deep dive — backpressure and join

Never unbounded WS buffers — drop + `{type:"dropped"}`. On join: REST last 50 then WS; reconnect replays from cursor in Cassandra. Moderation async (`pending` → `visible`/`hidden`).

## Handling failures and scale

- **Subscriber crash:** Clients reconnect; catch-up from durable store.
- **Pub/Sub down:** Degrade to 2s polling `GET /comments`.
- **Hot stream partition:** Cache last 200 comments in [Redis](/hld/caching-strategies) for catch-up.
- **Thundering join:** Pre-warm fleet; stagger catch-up jitter.
- **Cross-region:** Viewers to nearest subscriber region; replicate counts not every comment globally.
- **Reactions:** Aggregate hearts into periodic `count` messages — not per-event fan-out.

**Phrase:** Writes go to a per-stream log. Viewers connect to sharded subscriber nodes and get a sampled live feed. We don't try to render every comment for 2 million phones.

**Remember:** Fan-out is the bottleneck, not writes; intentional drop on read path; three tiers — sample, pin, catch-up REST.

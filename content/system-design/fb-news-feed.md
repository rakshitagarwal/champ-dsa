# FB News Feed

> Home feed for a social graph. The classic deep dive is **fan-out on write vs read**, plus ranking. Same family as Twitter and [Instagram](/hld/instagram).

> Hybrid fan-out — push for normal users, pull for celebrities. Feed ids time-partitioned; rank a small candidate set only.

## What they ask

**Scenario:** Design FB News Feed — open app, see friends' and pages' posts, roughly ranked, in under a couple hundred ms.

**What the interviewer really tests:**
- **Fan-out trade-off** and **hybrid** for celebrities.
- Separating **feed generation** from post storage and media.
- **Pagination, cache, timeline merge** at scale.
- **Celebrity problem** without O(fans) writes per post.

**Example scale:** 2B users, 100M posts/day, ~230k feed reads/s avg (~1M peak). One celebrity post to 50M followers = 50M cache writes if naive push.

## Requirements

**Functional:**
- Publish post (text + media refs), follow/unfollow/block.
- Home feed: ranked, cursor-paginated.
- Like/comment (counters via side service).

**Non-functional:**
- Feed page p95 < 200ms; publish visible to normal followers in seconds.
- ~200:1 read:write; eventual feed OK; filter blocked authors on read.
- Heuristic or ML ranking — explainable features.

**Clarify:** Friends vs follow model? Chronological v1 or ranked? Celebrity threshold (~10k)? Real-time push vs pull on open?

**Out of scope (v1):** [FB post search](/hld/fb-post-search), [live comments](/hld/fb-live-comments), Messenger, ads engine.

## Scale estimation

| Metric | Result |
|--------|--------|
| Posts | ~1.2k/s avg, ~5k/s peak |
| Feed reads | ~230k/s avg, ~1M/s peak |
| Pure push cost | 100M posts × 200 friends ≈ 20B inbox writes/day — untenable at celebrity scale |
| Inbox cache | ~3 TB if full materialized (sharded Redis/Cassandra) |

Naive fan-out on write collapses on celebrity posts — hybrid is required.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/posts` | Create post |
| `GET` | `/v1/posts/{id}` | Post metadata |
| `POST` / `DELETE` | `/v1/follows` | Follow / unfollow |
| `GET` | `/v1/feed?cursor=&limit=20` | Ranked home feed |
| `POST` | `/v1/posts/{id}/like` | Like |

**Create:** `{ "text", "mediaIds", "visibility" }` → `{ "postId", "createdAt" }`. Feed uses `(score, postId)` cursor, not OFFSET.

## High-Level Design (HLD)

![News feed architecture: feed service, fan-out, timeline cache, ranker](/images/hld/fb-news-feed-architecture.svg)

- **Post Service:** DB + S3 media → [Kafka](/hld/message-queue) `PostCreated` (no sync fan-out).
- **Graph Service:** follow adjacency; paginated follower lists, cached.
- **Fan-out Service:** if followers < threshold → **push** `postId` to each inbox (`ZADD feed:{userId}`); else **skip**, celebrity outbox only.
- **Feed cache:** per-user inbox (Redis hot + Cassandra durable), cap ~500–1000 ids.
- **Timeline + Ranking:** merge inbox + pulled celebrity posts → hydrate → score top 20.
- **Counters:** [Redis](/hld/caching-strategies) INCR likes, async flush.

**Read:** inbox slice + parallel celebrity recent posts → dedupe → rank → cursor page.

**Write:** persist post → Kafka → async fan-out + notifications.

**Media:** bytes in S3/CDN; post row stores `mediaIds` only — feed hydrate joins URLs at read time.

**Real-time (v2):** WS badge `new_post`; client refresh feed — do not push full ranked feed over WS.

## Deep dive — hybrid fan-out

**Push:** O(1) read, O(followers) write — breaks at 50M followers.

**Pull:** cheap write, O(followees) queries per feed open — breaks at 1000 followees.

**Hybrid:** push under ~10k followers; celebrities write only `author_outbox:{id}` (one key). On read, union inbox with recent celebrity posts (indexed by `author_id, created_at`). Lazy-filter blocked/unfollowed on read; async cleaner on unfollow events.

## Deep dive — ranking and pagination

Rank **candidates only** (~100 inbox + ~50 per celebrity), not full history. Heuristic: `0.4×affinity + 0.3×recency + 0.2×engagement + diversity/unseen`. Cursor = `base64(score, postId)` for stable pages under new inserts.

## Failures and scale

- Shard inbox by `userId`; posts by `authorId`; graph by `followerId`.
- Fan-out lag → stale feed, not lost; catch up from Kafka.
- Redis down → pull-only from DB (slower but available).
- Celebrity outbox: cache 10s stale-while-revalidate; one write not 50M.
- Hot author near threshold: batched `ZADD`, backpressure if Redis hot.
- Likes: never `COUNT(*)` on hot posts — counter service.
- Dedupe push+pull overlap by `postId` before ranking.
- A/B ranking: shadow weights via feature flag — not on critical read path.

**Phrase:** Precomputed inbox for normal accounts, pull for celebrities. The feed API only ranks a small candidate set — Kafka fans out writes, not the read path.

**Remember:** Hybrid threshold → merge on read → rank candidates only → cursor not OFFSET.

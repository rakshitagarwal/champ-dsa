# Instagram

> Photo-first social network. Same feed bones as [FB news feed](/hld/fb-news-feed), with **heavier media** and a simpler graph (follow, not friends).

> Photos in S3 + CDN, hybrid feed fan-out, stories with 24h TTL in Redis, Explore built async via Kafka.

## What they ask

"Design Instagram." Interviewer means: follow graph, post photos/reels, ranked home feed, profile grid, like/comment, 24h stories, optional Explore.

**Tests:** Separate **bytes** (S3/CDN/transcode) from **metadata**; **hybrid fan-out** for celebrities; feed stores **ids not JPEGs**; ranking without hand-waving a full ML lab.

**Example scale:** 500M DAU, ~100M posts/day, ~1B feed fetches/day; video dominates storage.

## Requirements

**Functional:**
- Follow/unfollow, block/mute; create post (1–10 images or short video), caption, hashtags.
- Presigned S3 upload; home feed ranked + cursor; profile grid; like/comment.
- Stories 24h TTL, sequential tray; search users/hashtags; notifications (follow, like).

**Non-functional:**
- Feed p95 <200ms when cached; first paint via CDN variants.
- Post write ACK quickly; fan-out seconds behind is OK.
- Celebrity write amplification capped via hybrid fan-out.

**Clarify:** Ranked default vs chronological toggle? Live video v1? Reels same infra?

**Out of scope (v1):** Explore ML training, AR/shopping, E2E DMs, real-time co-editing.

## Scale estimation

| Quantity | Assumption | Result |
|---|---|---|
| New posts | 100M/day | ~1.2k/s avg, ~5k peak |
| Fan-out writes | 100M × ~300 followers avg | ~350k inbox writes/s avg — hybrid caps this |
| Feed reads | 1B/day × 20 ids | 20B id reads/day |
| Media | photos + video variants | PB-scale S3; CDN for delivery |
| Metadata | ~1 KB/post row | shard Postgres by author |

**Takeaway:** Bytes and fan-out QPS dominate; hybrid fan-out exists to cap writes.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/media/presign` | Presigned S3 upload |
| `POST` | `/v1/posts` | Create post (mediaIds, caption) |
| `GET` | `/v1/feed?cursor=` | Home feed |
| `GET` | `/v1/users/{id}/posts` | Profile grid |
| `POST/DELETE` | `/v1/users/{id}/follow` | Follow graph |
| `POST` | `/v1/stories` | Story (24h TTL) |
| `POST/DELETE` | `/v1/posts/{id}/like` | Like toggle |

Use `Idempotency-Key` on create. Client uploads to S3 directly; server never proxies bytes.

**Post create (sketch):** `POST /v1/posts { mediaIds[], caption }` → 201 `{ postId }` while variants may still transcode.

## High-Level Design (HLD)

![Instagram architecture: post/graph/feed, media processor, S3, Kafka](/images/hld/instagram-architecture.svg)

```
Client → CDN → API Gateway
  Post / Graph / Feed / Media Processor (async transcode, thumbs)
  Postgres (sharded) + S3 variants + Kafka (PostCreated, FollowCreated)
  Fan-out workers → Redis/Cassandra inboxes (postId scores)
  Feed Service: push inbox + pull celebrity posts → hydrate → rank
  Elasticsearch — users, hashtags (optional)
```

**Write (post):** Presign → S3 → `POST /posts` → DB row → Kafka → 201; fan-out async. **Read (feed):** Inbox ids (push) + recent posts from followed celebrities (pull) → merge → hydrate from cache/DB → rank top 20.

**Hybrid fan-out:** If `followerCount > threshold` (~500k), skip push; mark celebrity; readers pull on feed load.

## Deep dive — media vs feed ids

Inbox stores `postId` + timestamps only. Hydration builds CDN URLs on read. Celebrity push = millions of Redis writes — use pull path indexed by `(author_id, created_at)`.

## Deep dive — ranking (interview-safe)

Ranker service: `score = w1·recency_decay + w2·affinity (follow/likes) + w3·engagement`. Explore/Reels = separate candidate source (embeddings/ANN), same ranker interface. Stories: sequential, `expires_at > now()`, not ranked like feed.

## Handling failures and scale

- **Transcode lag:** Post visible with placeholder until `media.status=ready`.
- **Inbox hot shard:** Cap inbox length (`ZREMRANGEBYRANK`); chunk celebrity fan-out with backpressure.
- **Private accounts:** Fan-out only to approved followers at Graph Service.
- **Transcode failure:** Placeholder in feed until `media.status=ready`; DLQ + retry.
- **Fan-out lag:** Monitor Kafka consumer lag; chunk follower scans (1000/batch).

**Phrase:** S3 + CDN for bytes, DB for the post, precomputed inboxes for normal users, pull for celebrities. The feed never carries raw photos.

**Remember:** Hybrid fan-out is the celebrity answer; cache post metadata, not images; Kafka decouples write from fan-out.

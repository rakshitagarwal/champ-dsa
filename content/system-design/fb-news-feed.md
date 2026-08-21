# FB News Feed

> Home feed for a social graph. The classic deep dive is **fan-out on write vs read**, plus ranking. Same family as Twitter and [Instagram](/system-design/instagram).

## What they ask

User opens the app and sees posts from friends (and pages), roughly ranked, in under a couple hundred ms.

## Requirements

**Functional:** publish post, follow/friend, read home feed, like/comment (scoped).

**Non-functional:** low latency feed, huge read QPS, celebrity / mega-pages.

**Clarify:** friends-only vs public pages. Ranking quality vs recency.

## API

1. `POST /posts` `{ text, mediaIds }`
2. `POST /friends` / follow
3. `GET /feed?cursor=`
4. `POST /posts/{id}/like`

## Design

**Write path:** User service auth → Post service writes metadata in Postgres/MySQL. Media already in S3. Publish `PostCreated` to [Kafka](/system-design/kafka).

**Feed generation:**

| Model | What happens | Pain |
|-------|----------------|------|
| Fan-out on read | Merge latest posts of all friends at read time | Slow if you have 2000 friends |
| Fan-out on write | Push post id into each follower's feed cache | Celebrity with 50M followers |
| Hybrid | Push for normal users; pull for celebrities | What production does |

**Serving:** Redis / [Cassandra](/system-design/cassandra) list of `postId` per user. API hydrates posts from cache/DB, then ranks a page (ML or heuristics: affinity, recency, time spent).

**Media:** CDN. Don't put bytes in the feed store.

## Deep dive — hybrid fan-out

On publish: for followers below threshold (e.g. 10k), **push** post id into their precomputed inbox. For the rest, the reader **pulls** that author's recent posts and merges. Celebrity write path stays O(1) to the log, not O(fans).

**Ranking:** don't sort the whole history. Rank the merged candidate set (~few hundred). Features: relationship, recency, unseen, media type.

**Pagination:** cursor of `(score, postId)`, not `OFFSET`.

## Extra probes

1. Unfollow / block — must drop from feed; lazy filter on read is OK
2. Counter service for likes (don't `COUNT(*)` every time)
3. Search is **not** the feed — [FB post search](/system-design/fb-post-search)
4. Live comments on video — [FB live comments](/system-design/fb-live-comments)

**Phrase:** "Precomputed inbox for normal accounts, pull for celebrities. Kafka fans out to cache, search, and notifications. The feed API only ranks a small candidate set."

# FB News Feed

> Home feed for a social graph. The classic deep dive is **fan-out on write vs read**, plus ranking. Same family as Twitter and [Instagram](/system-design/instagram).

## What they ask

**Scenario:** "Design FB News Feed — user opens the app and sees posts from friends (and pages), roughly ranked, in under a couple hundred ms."

**What the interviewer really tests:**
- Do you know the **fan-out trade-off** (push vs pull) and when to use **hybrid** for celebrities?
- Can you separate **feed generation** (candidate + ranking) from **post storage** and **media?
- How you handle **pagination, cache, and timeline merging** at scale?
- Whether you can reason about **celebrity / mega-page** problem without O(fans) writes.

**Example scale:** 2B users, avg 200 friends, 500 follows (pages). 100M posts/day. Each user opens feed 10x/day → 20B feed reads/day (~230k QPS avg, 1M peak). Celebrity with 50M followers posts → naive fan-out = 50M cache writes.

## Requirements

**Functional:**
- Publish post: text + media (via S3/CDN), visibility (friends/public/private).
- Follow / friend (bidirectional) and unfollow/block.
- Read home feed: ranked, paginated, infinite scroll.
- Like / comment / share (scoped — counters, not full feed logic in v1).
- Reels / story injection (mention as ranked candidate source, not v1).

**Non-functional:**
- **Latency:** feed page (20 posts) p95 < 200ms; post publish < 500ms to author's followers (hybrid visibility).
- **Availability:** feed reads highly available (cache); writes durable.
- **Throughput:** 20B reads/day, 100M writes/day — read-heavy ~200:1.
- **Consistency:** eventual for feed (seconds), but don't show posts from blocked/unfollowed users; likes eventually consistent.
- **Ranking:** not strictly chronological — affinity * recency * engagement, but explainable.

**Clarify — questions to ask:**
- Friends-only or follow model? Public pages vs private friends?
- Ranking: chronological v1 or ML-ranked? Features available?
- Celebrity threshold for hybrid? (e.g., >10k followers)
- Need real-time (push on new post) or pull on open?
- Media handling — CDN already exists?
- Ads injection — separate slot?

**Out of scope (v1):**
- Full search over posts ([FB post search](/system-design/fb-post-search)).
- Real-time comments on live video ([FB live comments](/system-design/fb-live-comments)).
- Messenger / chat — separate system.
- Graph mutations beyond follow/block.

## Scale estimation

| Metric | Assumption | Math | Result |
|--------|-----------|------|--------|
| Users | 2B | — | 2B |
| Posts per day | 100M | 100M / 86400 | ~1.2k writes/s avg, ~5k/s peak |
| Feed reads | 2B * 10 opens | 20B / 86400 | ~230k reads/s avg, ~1M/s peak |
| Read:write ratio | 20B / 100M | — | 200:1 |
| Avg friends | 200 | fan-out push 200 cache writes/post | 100M * 200 = 20B cache writes/day if pure push |
| Celebrity post | 50M followers | 50M * 1 post | 50M writes burst — must be pull |
| Storage (posts) | 1KB metadata + media refs | 100M * 1KB | ~100 GB/day, ~36 TB/year — before media |
| Cache (feed inbox) | 2B users * 200 postIds * 8B | 2B * 200 * 8 | ~3.2 TB for inboxes (sharded Redis/Cassandra) |
| Bandwidth (feed) | 20 posts * 1KB each =20KB/page *230k QPS | 230k*20KB | ~4.6 GB/s egress |

**Takeaway:** naive fan-out on write collapses on celebrity posts. Hybrid is required; numbers prove it.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/posts` | Create post |
| `GET` | `/v1/posts/{id}` | Get post + metadata |
| `POST` | `/v1/follows` | Follow user/page |
| `DELETE` | `/v1/follows/{targetId}` | Unfollow |
| `GET` | `/v1/feed?cursor=&limit=20` | Ranked home feed |
| `POST` | `/v1/posts/{id}/like` | Like post |
| `POST` | `/v1/posts/{id}/comments` | Comment |

**Create post:**
```json
POST /v1/posts
Authorization: Bearer <token>
{
  "text": "Hello world",
  "mediaIds": ["med_abc"],
  "visibility": "friends",
  "mentions": ["user_123"]
}
→ 201 { "postId": "pst_789", "createdAt": "2026-08-25T10:00:00Z" }
```

**Read feed:**
```
GET /v1/feed?cursor=eyJzY29yZSI6MC45LCJpZCI6InBzdF8xMjMifQ==&limit=20
Authorization: Bearer <token>
→ 200 {
    "posts": [{ "postId":"pst_456", "authorId":"u_1", "text":"...", "mediaUrl":"https://cdn/...", "likeCount":42, "score":0.87 }],
    "nextCursor": "eyJzY29yZSI6MC44LCJpZCI6InBzdF80NTYifQ==",
    "hasMore": true
  }
```

**Follow:**
```json
POST /v1/follows
{ "targetId": "user_999", "type": "follow" }
→ 200 { "followerCount": 10001 }
```

WebSocket/push for real-time: `WS /feed/updates` → `{ type:"new_post", postId:"pst_789" }` (optional v2).

## High-Level Design (HLD)

```
Client (Mobile/Web)
  |
 CDN (media, not feed JSON)
  |
 L4 LB → API Gateway (auth, [rate limiter](/system-design/rate-limiter))
  |
 +-- Post Service (write path) → Postgres/MySQL (posts, media refs) → S3 (media bytes)
 |        `--> publishes PostCreated → [Kafka](/system-design/kafka)
 |
 +-- Graph Service (follows, friends) → Postgres/Cassandra (adjacency)
 |
 +-- Feed Services  <--- Kafka consumers
 |     |-- Fan-out Service (hybrid push/pull)
 |     |-- Feed Cache ([Redis](/system-design/redis) / [Cassandra](/system-design/cassandra): userId → list<postId>)
 |     |-- Ranking Service (ML/heuristic)
 |     `--> Timeline Service (merge + paginate)
 |
 +-- Counter Service ([Redis](/system-design/redis) + Cassandra) — likes, comments count
 |
 +-- Search / Notification consumers (off Kafka)
```

**Component roles:**
- **Post Service:** validates, writes `posts` row to DB, uploads media to S3, publishes `PostCreated{ postId, authorId, timestamp }` to [Kafka](/system-design/kafka). Never fans out synchronously.
- **Graph Service:** owns `follows(followerId, followeeId)` adjacency; serves follower lists in pages. Cached in [Redis](/system-design/redis).
- **Fan-out Service:** Kafka consumer that decides per post: for normal author (followers < threshold e.g., 10k), **push** `postId` into each follower's inbox (`LPUSH` in Redis / append in Cassandra). For celebrity (followers > threshold), **skip push**, leave for pull path.
- **Feed Cache:** per-user inbox: `userId → sorted list of postIds` (by score/time, capped at ~500-1000). Stored in [Redis](/system-design/redis) (hot) + [Cassandra](/system-design/cassandra) (durable, wide row). This is the **precomputed feed**.
- **Ranking Service:** given candidate `postIds` (~200-500), hydrates `Post` objects from cache/DB, scores via features (affinity, recency, engagement, media type, unseen), returns top 20 sorted.
- **Timeline Service:** on `GET /feed`, merges: (a) pushed inbox + (b) pulled celebrity posts (fetch recent posts of celebrities user follows on demand). Deduplicates, filters blocked/unfollowed, then calls Ranking.

**Write flow (publish):** User `POST /posts` → Post Service DB write + S3 → Kafka `PostCreated` → Fan-out Service fans out to normal followers' inboxes; celebrity path does nothing. Notification consumer also sends push.

**Read flow (feed):** `GET /feed?cursor=` → Timeline Service: fetch `inbox[userId]` slice (e.g., 100 ids) from Redis/Cassandra → pull recent posts of celebrity followees (parallel `GET /posts?authorId=celebrity&since=...`) → merge → hydrate → Ranking Service scores → paginate by `(score, postId)` cursor → return.

## Low-Level Design (LLD)

**Database schema (SQL, simplified):**
```sql
CREATE TABLE users (
  id            BIGSERIAL PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE posts (
  id            BIGSERIAL PRIMARY KEY,
  author_id     BIGINT NOT NULL REFERENCES users(id),
  text          TEXT,
  visibility    VARCHAR(16) NOT NULL DEFAULT 'public', -- public|friends|private
  created_at    TIMESTAMPTZ DEFAULT now(),
  like_count    INT DEFAULT 0, -- denormalized via Counter Service
  comment_count INT DEFAULT 0
);
CREATE INDEX idx_posts_author_created ON posts(author_id, created_at DESC);
CREATE INDEX idx_posts_created ON posts(created_at DESC);

CREATE TABLE media (
  id            VARCHAR(64) PRIMARY KEY,
  post_id       BIGINT REFERENCES posts(id),
  s3_key        VARCHAR(512) NOT NULL,
  type          VARCHAR(16) NOT NULL, -- image|video
  width         INT, height INT
);

CREATE TABLE follows ( -- adjacency
  follower_id   BIGINT NOT NULL REFERENCES users(id),
  followee_id   BIGINT NOT NULL REFERENCES users(id),
  created_at    TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (follower_id, followee_id)
);
CREATE INDEX idx_follows_followee ON follows(followee_id, follower_id);

CREATE TABLE likes (
  post_id       BIGINT REFERENCES posts(id),
  user_id       BIGINT REFERENCES users(id),
  created_at    TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);

-- Feed inbox: Cassandra-style wide row modeling (or Redis list)
-- In Postgres sketch for interview:
CREATE TABLE feed_inbox (
  user_id       BIGINT NOT NULL,
  post_id       BIGINT NOT NULL REFERENCES posts(id),
  author_id     BIGINT NOT NULL,
  score         DOUBLE PRECISION NOT NULL,
  added_at      TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, score, post_id)
) PARTITION BY HASH (user_id);
CREATE INDEX idx_inbox_user_score ON feed_inbox(user_id, score DESC);
```

**Cassandra / Redis modeling (preferred for feed):**
```
-- Cassandra
CREATE TABLE feed_inbox (
  user_id bigint,
  post_id bigint,
  author_id bigint,
  score double,
  added_at timestamp,
  PRIMARY KEY (user_id, score, post_id)
) WITH CLUSTERING ORDER BY (score DESC);
-- Redis: ZSET feed:{userId} score=postScore member=postId  (or LPUSH chronological)
```

**Key classes:**
```python
class PostService:
    def create_post(self, author_id, text, media_ids) -> Post: ...
    def get_post(self, post_id) -> Post: ...

class GraphService:
    def followers(self, user_id, cursor, limit) -> List[int]: ...
    def followees(self, user_id) -> List[int]: ...
    def is_following(self, follower, followee) -> bool: ...

class FanoutService:
    def on_post_created(self, event: PostCreated): ... # push or skip
    def push_to_followers(self, post_id, follower_ids): ...

class FeedService:
    def get_feed(self, user_id, cursor, limit) -> FeedPage: ... # merge + rank
    def merge_candidates(self, inbox_ids, celebrity_ids) -> List[int]: ...

class RankingService:
    def rank(self, user_id, candidate_posts) -> List[Post]: ... # features → score
    def features(self, user_id, post) -> dict: ... # affinity, recency, engagement

class CounterService:
    def incr_like(self, post_id): ... # Redis INCR + async flush to DB
    def get_count(self, post_id) -> int: ...
```

**Algorithms / concurrency:**
- **Hybrid threshold:** `if follower_count < 10k: push else pull`. Threshold tunable by write QPS budget.
- **Merge:** k-way merge of inbox (pre-sorted) + N celebrity recent lists (each sorted by `createdAt`). Heap merge O((inbox + celebrities) log celebrities).
- **Ranking (heuristic v1):** `score = 0.4*affinity(author, reader) + 0.3*recency(decay) + 0.2*engagement(likes/comments velocity) + 0.1*media_type_boost`. Affinity = past interactions / follow recency. ML v2: learning-to-rank model offline, features fetched at request time.
- **Pagination:** cursor = `base64(score, postId)` of last item, not `OFFSET`. Next page: `WHERE score < cursor_score OR (score==cursor_score AND postId < cursor_id)`.

**Patterns:** Fan-out (pub/sub), CQRS (write vs read), Cache-Aside, Strategy (ranking), Observer (Kafka).

## Deep dive — hybrid fan-out

**Pure push (fan-out on write):** On `PostCreated`, push to **all** followers' inboxes. Pros: read is O(1) — just fetch inbox. Cons: celebrity with 50M followers → 50M cache writes, 50M replication, hours of lag, hot shard.

**Pure pull (fan-out on read):** Store nothing; on `GET /feed`, fetch recent posts of **all** followees and merge. Pros: write cheap. Cons: user with 1000 followees → 1000 DB queries per feed open → p95 2s, DB collapse.

**Hybrid (production):** Push for normal authors, pull for celebrities.

- On publish: `followers = GraphService.followers(authorId)` paginated. If `len(followers) < threshold`, `for fid in followers: ZADD feed:{fid} score postId`. Else, write only to author's `author_timeline` (celebrity outbox) and skip followers.
- On read: `candidates = inbox[userId] (pushed) ∪ ⋃_{celebrity in myFolloweeCelebrities} recentPosts(celebrity, since=lastSeen)`. The celebrity pull path fetches ~20 recent posts per celebrity from `posts` DB (indexed by `author_id, created_at`) or celebrity outbox cache. Merge and rank.

**Threshold tuning:** 10k is common; adjust so p99 write fan-out < 10k ops. Monitor Kafka lag.

## Deep dive — ranking and pagination

**Don't rank the whole history.** Candidate set is small: inbox slice 100 + celebrity pulls ~50 per celebrity * few celebrities = few hundred. Rank that set, return top 20. Heavy ML (if used) runs only on candidates.

**Features (explainable):**
- Affinity: messages, profile visits, past likes with author (precomputed in graph store).
- Recency: exponential decay `exp(-hours/24)`.
- Engagement: `likes/(age+1)` velocity.
- Diversity: don't show 5 posts from same author consecutively — down-weight repeats.
- Unseen: boost posts not yet shown (`seen:{userId}` Bloom filter).

**Cursor pagination:** `OFFSET` is wrong for ranked feeds (new posts shift offsets). Use `(score, postId)` cursor. Client passes `cursor` of last seen item; server returns items with `score <= cursorScore` (and tie-breaker `postId`). Stable across inserts.

## Deep dive — celebrity and hot user handling

**50M follower write:** Hybrid avoids it. For the author's own timeline, store `author_outbox:{celebrityId} → list<postId>` in Redis/Cassandra (capped 1000). Readers pull from there. Replication: outbox is single key per celebrity, not 50M keys — O(1) write.

**Hot read (celebrity outbox):** 50M followers polling same celebrity → cache outbox in CDN/Redis replica with TTL 10s; serve stale while revalidating. Don't hit DB per follower.

**Unfollow/block:** Push path leaves stale postIds in inbox. Fix by **lazy filter on read**: before ranking, filter `if authorId in blockedByReader or not is_following(reader, author) then drop`. Async cleaner removes from inbox via Kafka `UnfollowEvent`.

## Handling failures and scale

- **Sharding:** `posts` sharded by `authorId` or `postId` hash; `feed_inbox` sharded by `userId` hash (so `GET /feed` hits one shard). Graph adjacency sharded by `followerId`.
- **Caching:** [Redis](/system-design/redis) Cluster for inboxes (TTL + LRU), post hydrate cache (`post:{id} → JSON` 5m TTL). Celebrity outbox cached with replica.
- **Replication:** DB primary + read replicas; fan-out reads replicas for `followers` pages. Kafka replication for durability of `PostCreated`.
- **Failure modes:** Fan-out consumer down → Kafka lag, feed appears stale but not lost — catch up on restart. Redis down → degrade to pull-only (fetch followees' recent posts directly from DB) — slower but available. Post Service down → writes fail, reads still serve cached feed.
- **Hot partition:** single user with 1M followers crossing threshold — ensure Graph pagination + batched `ZADD` (pipeline 1k per batch) + backpressure if Redis overloaded.

## Extra probes / Interview follow-ups

1. **Real-time updates:** `WS /feed/updates` pushes `new_post` count badge; client fetches next page when user pulls to refresh — don't push full feed over WS.
2. **Counter service:** Likes via [Redis](/system-design/redis) `INCR post:{id}:likes` + async flush to `posts.like_count` every second; don't `COUNT(*)` on hot posts.
3. **De-duplication:** Same post via push + pull (if follower threshold flapped) — dedup by `postId` before ranking.
4. **Search is not the feed:** Post search is inverted index ([FB post search](/system-design/fb-post-search)), separate from timeline merge.
5. **A/B ranking:** Feature flag ranking weights; shadow-rank and compare engagement lift before rollout.

**Phrase:** Precomputed inbox for normal accounts, pull for celebrities. Kafka fans out to cache, search, and notifications. The feed API only ranks a small candidate set.

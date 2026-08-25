# Instagram

> Photo-first social network. Same feed bones as [FB news feed](/system-design/fb-news-feed), with **heavier media** and a simpler graph (follow, not friends).

## What they ask

"Design Instagram." Interviewer means: follow users, post photos/reels (multi-image carousel + short video), scroll a ranked home feed, view profile grids, like/comment, stories that vanish in 24h, and maybe Explore.

What they really test: can you separate **bytes** (images/video, CDN, transcode) from **metadata** (post row, graph, feed ids)? Can you explain why a naive push fan-out breaks for a 50M-follower celebrity and pick **hybrid fan-out**? Can you describe ranking without hand-waving a full ML system? And can you avoid the classic mistake of stuffing JPEGs into [Redis](/system-design/redis)?

Example scale: 2B users, 500M DAU, 100M new posts/day (avg 1.5 media per post), each post fanned out to ~300 followers on average. Home feed: ~1B feed fetches/day. Stories: ~400M daily story posts. Video is ~60% of bytes.

## Requirements

**Functional:**
- User accounts + follow graph (directed, not mutual): follow/unfollow, followers/following lists, block/mute.
- Create post: 1-10 images and/or 1 video/reel (≤90s), caption, hashtags, location tag. Edit caption, delete post.
- Upload flow: presigned S3 URL, client uploads directly, server records post.
- Home feed: infinite scroll ranked feed (recency + relationship + engagement), cursor-paginated.
- Profile grid: `GET /users/{id}/grid` paginated by time, shows own + tagged posts.
- Like, comment (thread scoped), save/bookmark, share via DM (scoped).
- Stories: 24h TTL, sequential (not ranked), viewer list, reply to story.
- Search: users by handle/name, hashtags → posts.
- Notifications: new follower, like, comment, mention.

**Non-functional:**
- Feed p95 < 200 ms for cached users; first image paint < 1s via CDN.
- Write path for post creation must ACK quickly; fan-out can be async (seconds is fine). Celebrity posts must not block normal posts.
- Media durable in object storage (11-9s), served via CDN globally.
- Strong consistency for follow graph and post metadata; eventual for feed/Explore.
- Must handle write amplification: a 50M-follower post cannot do 50M synchronous DB writes.

**Clarify:**
- Is feed purely chronological or ranked? Say ranked default, chronological toggle.
- Do we need live video / Go-Live? Defer — say batch transcode only.
- Reels algorithm vs friends feed — same infra, different candidate source?
- Retention for stories? 24h visible, archived privately maybe.

**Out of scope (v1):**
- Full ML training infra for Explore/For You — treat as black-box ranker consuming embeddings.
- AR filters, shopping checkout, in-app payments.
- End-to-end encrypted DMs (separate system).
- Real-time multiplayer / co-authored posts.

## Scale estimation

| Quantity | Assumption | Math | Result |
|---|---|---|---|
| New posts | 100M/day (70M photo, 30M video) | — | ~1,150 posts/sec avg, ~5k peak |
| Media objects | 1.5 per post avg | 150M objects/day | — |
| Storage — photos | 100M photos/day × 1.2 MB avg (orig + 3 sizes) | — | ~120 TB/day → ~44 PB/yr |
| Storage — video | 30M videos/day × 25 MB avg transcoded set | — | ~750 TB/day → ~270 PB/yr (dominant) |
| Feed reads | 1B fetches/day, each fetches 20 ids | 1B × 20 | 20B post-id reads/day |
| Fan-out writes | 100M posts × 300 avg fan-out | — | 30B inbox writes/day ≈ 350k writes/s avg |
| CDN bandwidth | 2B image views/day × 150 KB; 500M video plays/day × 5 MB | — | ~300 TB/day images + ~2.5 PB/day video |
| Metadata DB | Post row ~1 KB | 100M × 1 KB | ~100 GB/day → ~36 TB/yr (shard!) |
| Follow graph | 2B users × 300 avg follows | — | ~600B edges (~600 GB if 1 byte/edge is unrealistic; ~few TB with overhead) |

Reasoning: bytes dominate cost; metadata is large but manageable when sharded. Fan-out QPS is the hidden monster — 350k writes/s average bursts to millions; hybrid fan-out exists to cap it.

## API Design

**Auth:** `Authorization: Bearer <JWT>` on all endpoints.

**Media upload (presign → direct to S3 → complete)**
```http
POST /v1/media/presign
{ "contentType": "image/jpeg", "contentLength": 3421090, "type": "image" }
200 { "mediaId":"m_...", "uploadUrl":"https://s3.../m_...?sig=...", "expiresAt":"..." }

POST /v1/posts
{ "mediaIds":["m_a","m_b"], "caption":"sunset #beach @bob", "locationId":"loc_sf", "altText":["..."]}
201 { "postId":"p_...", "createdAt":"2026-05-11T..." }

GET /v1/posts/{postId}
200 { "postId":"p_...", "author":{"id":"u_...","handle":"alice"}, "media":[{"type":"image","urls":{"thumb":"https://cdn.../m_a_150.jpg","feed":"https://cdn.../m_a_800.jpg","orig":"https://cdn.../m_a.jpg"}}], "caption":"...", "likeCount":482, "commentCount":21, "createdAt":"..." }

POST /v1/posts/{id}/like   -> 204
DELETE /v1/posts/{id}/like -> 204
POST /v1/posts/{id}/comments { "text":"..." } -> 201 { "commentId":"c_..." }
```

**Graph + feed**
```http
POST /v1/users/{userId}/follow  -> 204
DELETE /v1/users/{userId}/follow -> 204
GET  /v1/users/{userId}/followers?cursor=&limit=30
GET  /v1/users/{userId}/following?cursor=&limit=30

GET /v1/feed?cursor=eyJ...&limit=20
200 { "items":[ { "postId":"p_...", "score":0.92, "reason":"following" }, ...], "nextCursor":"..." }

GET /v1/users/{userId}/posts?cursor=&limit=18   // profile grid
GET /v1/stories/tray                             // sequential stories from followed users
POST /v1/stories { "mediaId":"m_...", "duration":15 } // 24h TTL
GET  /v1/explore?cursor=
GET  /v1/search?q=&type=users|hashtags
GET  /v1/hashtags/{tag}/posts?cursor=
```

**Idempotency:** `Idempotency-Key: <uuid>` on `POST /posts` and `POST /media/presign` so retry does not double-create.

## High-Level Design (HLD)

```
[ Mobile / Web ]
      |
     CDN (CloudFront/Fastly) — image/video variants, edge-cached feed pages for anon
      |
  [ API Gateway ] — auth, rate-limit, payload validation
      |
  +---+---+---+---+
  |       |       |       |
 Post  Graph  Feed   Media
Service Service Service Processor (async)
  |       |       |       |
  +---+---+---+---+-------+
      |       |       |
  [ Postgres (sharded) ]  [ S3 (orig + variants) ]  [ Transcode fleet (FFmpeg) ]
  users, posts, follows   m_a.jpg / m_a_150.jpg     video: 480p/720p/1080p + HLS
      |                   ^                           |
      +--- CDC/Kafka -----+                           +--> S3 --> CDN
      |
  [Kafka] — PostCreated, FollowCreated, LikeCreated
      |
  +---+---+
  |       |
Fan-out workers  Ranking workers
  |               |
[ Redis / Cassandra ]  [ Feature store / ranker ]
 timeline inboxes       (reads inbox ids → hydrates → scores)
  |               |
  +---> Feed Service (merge ranked + celebrity pull)
              |
         [Elasticsearch] — users, hashtags, captions (optional)
```

**Component roles:**
- **Media Processor:** on `MediaUploaded` event, generates thumbs (150, 800, 1080), strips EXIF, runs NSFW classifier, and for video enqueues transcode. Marks `media.status=ready` else `rejected`.
- **Post Service:** validates `mediaIds` are owned + ready, inserts `post` row in sharded Postgres, emits `PostCreated` to [Kafka](/system-design/kafka).
- **Graph Service:** owns `follow` table; on follow/unfollow emits event so Feed Service can backfill/trim inboxes.
- **Fan-out workers:** consume `PostCreated`; for normal authors push `postId` to each follower's inbox (Redis sorted set or Cassandra `user_timeline`), except **celebrity** authors (>threshold, e.g. 500k followers) — skip push, mark post as `celebrity:true` for pull-on-read.
- **Feed Service:** on `GET /feed`, reads caller's inbox ids (push), pulls recent celebrity posts from followed celebrities (pull), hydrates metadata from Postgres/Redis cache, calls ranker, paginates with cursor.
- **CDN:** serves `https://cdn.../m_{id}_{variant}.jpg` with immutable cache headers; video via HLS segments.

**Write path (post):** Client presigns → uploads to S3 directly → `POST /posts` → Post Service validates + writes DB → emit Kafka → ACK 201 (media may still be processing; post shows "processing" until variants ready) → async fan-out.

**Read path (feed):** Client `GET /feed` → API Gateway → Feed Service → `ZRANGE inbox:{userId} -inf +inf REV LIMIT 0 100` (push ids) + `SELECT ... WHERE author IN (celebrity_following) ORDER BY created_at DESC LIMIT 50` (pull) → merge 150 → hydrate → rank top 20 → return cursor (`last_score|last_id`).

## Low-Level Design (LLD)

**Database schema (Postgres, sharded by `author_id` hash for posts; follow table sharded by `follower_id`):**
```sql
CREATE TABLE users (
  id            TEXT PRIMARY KEY,            -- u_...
  handle        TEXT UNIQUE NOT NULL,        -- @alice
  display_name  TEXT NOT NULL,
  bio           TEXT,
  avatar_media_id TEXT REFERENCES media(id),
  is_verified   BOOLEAN DEFAULT FALSE,
  follower_count INT NOT NULL DEFAULT 0,
  following_count INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON users (handle);

CREATE TABLE media (
  id            TEXT PRIMARY KEY,            -- m_...
  owner_id      TEXT NOT NULL REFERENCES users(id),
  type          TEXT NOT NULL CHECK (type IN ('image','video')),
  s3_key_orig   TEXT NOT NULL,
  s3_key_thumb  TEXT, s3_key_feed TEXT, s3_key_hd TEXT,
  status        TEXT NOT NULL DEFAULT 'pending', -- pending|ready|rejected
  width         INT, height INT, duration_ms INT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE post (
  id            TEXT PRIMARY KEY,            -- p_...
  author_id     TEXT NOT NULL REFERENCES users(id),
  caption       TEXT,
  location_id   TEXT,
  media_ids     TEXT[] NOT NULL,             -- ordered; FK enforced in app
  like_count    INT NOT NULL DEFAULT 0,
  comment_count INT NOT NULL DEFAULT 0,
  is_celebrity  BOOLEAN NOT NULL DEFAULT FALSE, -- denorm from author follower count
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at    TIMESTAMPTZ
);
CREATE INDEX ON post (author_id, created_at DESC); -- profile grid
CREATE INDEX ON post (created_at DESC);             -- global + pull queries
CREATE INDEX ON post USING GIN (to_tsvector('english', caption)); -- hashtag/caption search

CREATE TABLE follow (
  follower_id   TEXT NOT NULL REFERENCES users(id),
  followee_id   TEXT NOT NULL REFERENCES users(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (follower_id, followee_id)
);
CREATE INDEX ON follow (followee_id, created_at DESC); -- followers list
CREATE INDEX ON follow (follower_id);

CREATE TABLE like_tbl (
  user_id       TEXT NOT NULL REFERENCES users(id),
  post_id       TEXT NOT NULL REFERENCES post(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);
CREATE INDEX ON like_tbl (post_id, created_at DESC);

CREATE TABLE comment (
  id            TEXT PRIMARY KEY,
  post_id       TEXT NOT NULL REFERENCES post(id) ON DELETE CASCADE,
  author_id     TEXT NOT NULL REFERENCES users(id),
  text          TEXT NOT NULL,
  parent_id     TEXT REFERENCES comment(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON comment (post_id, created_at ASC);

CREATE TABLE story (
  id            TEXT PRIMARY KEY,
  author_id     TEXT NOT NULL REFERENCES users(id),
  media_id      TEXT NOT NULL REFERENCES media(id),
  expires_at    TIMESTAMPTZ NOT NULL,        -- created_at + 24h
  viewer_count  INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON story (author_id, created_at DESC) WHERE expires_at > now();

-- Timeline inbox (alternative in Cassandra; shown as Redis sorted-set mental model)
-- key: inbox:{userId}  member: postId  score: epoch_ms
-- profile denorm cache: Redis hash post:{id} -> {authorId, mediaUrls, likeCount, ...} TTL 5m
```

**Key classes:**
```java
class PostService {
  Post create(String authorId, CreatePost cmd) {
    validateMediaOwned(authorId, cmd.mediaIds); // status=ready
    Post p = postRepo.insert(authorId, cmd);     // txn
    kafka.emit(new PostCreated(p.id, p.authorId, p.createdAt, isCelebrity(authorId)));
    return p;
  }
}
class FanoutWorker {
  void onPostCreated(PostCreated e) {
    if (e.isCelebrity) return; // pulled on read
    List<String> followers = graph_chunked(e.authorId); // paginated scan to avoid OOM
    for (List<String> chunk : chunks(followers, 1000))
      redisPipeline.zaddBatch(chunk, e.postId, e.createdAt.toEpochMilli());
  }
}
class FeedService {
  FeedPage getFeed(String userId, String cursor, int limit) {
    List<String> pushed = inbox.range(userId, 100);
    List<String> celebPulled = pullCelebrityPosts(userId, 50); // SELECT ... WHERE author IN (...)
    List<String> merged = mergeByTime(pushed, celebPulled);
    List<Post> hydrated = postCache.mget(merged);
    List<ScoredPost> ranked = ranker.score(userId, hydrated); // recency * affinity * engagement
    return paginate(ranked, cursor, limit);
  }
}
class MediaProcessor {
  void onMediaUploaded(MediaUploaded e) { // Kafka
    if (isImage(e)) generateVariants(e); else transcode(e);
    nsfwScan(e); // async, never blocks ACK
  }
}
```

**Concurrency / algorithms:**
- **Hybrid fan-out threshold:** `if followerCount > 500k → celebrity (pull)` else push. Threshold tunable per cluster. Keeps p99 fan-out < 1s for 99.9% of posts; celebrity post costs zero writes but extra read-time merge.
- **Idempotent fan-out:** dedup by `(postId)` in inbox (`ZADD NX`), consumer uses idempotent Kafka offset handling.
- **Hydration:** feed cache stores ids+types only; `MGET post:{id}` from [Redis](/system-design/redis) with fallback to Postgres replica; never store JPEGs in Redis.
- **Cursor:** opaque `base64(last_score:last_postId:last_createdAt)` for stable pagination after ranking.

**Patterns:** Fan-out-on-write (CQRS), Cache-Aside + TTL for post hydration, Outbox for Kafka, Strategy for ranking (ranker interface), Saga-lite for media pipeline.

## Deep dive — media vs feed ids

Feed cache must store `postId` + `authorId` + `createdAt`, not image bytes. Hydration builds CDN URLs on read. If you put JPEGs in Redis you blow memory and still need CDN for edge delivery. Variants are immutable: `m_a_150.jpg` never changes, so CDN cache hit ratio is ~98%. Upload is presigned so app servers never proxy large bytes.

Celebrity write amplification is the second gotcha. A 50M-follower push is 50M Redis writes + replication — minutes of lag and hot shards. Hybrid avoids it: zero writes for that post; cost moves to read-time pull (`SELECT ... WHERE author IN (myCelebrityFollows) LIMIT 50` — indexed, small fan-in because a user follows at most few hundred celebrities). Explain the tradeoff explicitly.

## Deep dive — ranking without building an ML lab

Interviewers will ask "how do you rank?" Don't describe training a transformer from scratch. Say: ranker is a service with interface `score(userId, candidatePosts) -> sorted`. v1 features: `recency_hours_decay = exp(-age/24h)`, `affinity = follows + past likes/comments with author`, `engagement = like_rate of post`. Score = `w1*recency + w2*affinity + w3*engagement`. Mention that Explore/Reels use a separate candidate generator (embedding similarity) that feeds the same ranker. Reels may need a different weight vector (watch time > likes). Human mention of A/B testing is enough.

## Deep dive — stories and profile grid

Stories are a different access pattern: write-once, read-sequential, TTL 24h. Store `story` rows with `expires_at`; a periodic sweeper deletes expired rows (or rely on `WHERE expires_at > now()`). Inbox for stories is tiny: for each follower, push `storyId` to a short `story_inbox:{userId}` capped at ~200 entries, or simply query `SELECT ... WHERE author IN (following) AND expires_at > now() ORDER BY created_at DESC`. Sequential not ranked, viewer list is a separate `story_view` table.

Profile grid is trivial: `SELECT * FROM post WHERE author_id=$1 AND deleted_at IS NULL ORDER BY created_at DESC LIMIT 18` — index on `(author_id, created_at)` does it, plus a Redis `grid:{userId}:{cursor}` cache. Tag grid and saved posts are similar secondary indexes.

## Handling failures and scale

- **S3 / transcode down:** post still created but `media.status=pending`; feed hides pending media (shows placeholder) and retries transcode with exponential backoff + DLQ.
- **Postgres shard down:** feed degrades — serve from Redis post cache + inbox; writes to that shard queue in Kafka for replay. Profile grids for that shard show stale.
- **Redis/Cassandra inbox hot shard:** shard inboxes by `hash(userId) % N` (256 shards); celebrity follows pull path bypasses inbox so no hot key. For non-celebrity viral post (1M follows, still under threshold), chunked fan-out with backpressure; inbox `ZREMRANGEBYRANK` caps at 2000 entries.
- **Cache stampede on popular profile:** singleflight on `grid:{userId}` miss; CDN caches grid for anon viewers.
- **Replication:** Postgres streaming replica per shard; S3 cross-region; Kafka 3× replication; CDN edge failover.
- **Probes / SLOs:** fan-out lag (Kafka consumer lag) >10s alert, p95 feed latency, transcode queue depth, CDN hit ratio, story expiry sweeper lag.
- **Privacy:** private accounts — Feed Service checks `visibility` before fanning out; Graph Service enforces follow-request approval.

## Extra probes / Interview follow-ups

1. **Explore / For You:** candidate generation from embeddings (user vector vs post vectors via ANN in a vector DB) → ranker → feed. Don't claim to train it; say "candidate source is pluggable".
2. **Hashtags:** `hashtag → postIds` in [Elasticsearch](/system-design/elasticsearch) or a dedicated `hashtag_post` table (sharded by hashtag hash) with time-ordered ids; ingest parses `#tag` from caption on post creation.
3. **Abuse / moderation:** photo moderation async (not blocking upload ACK), report queue, shadow-ban — workers mark `media.status=rejected` and remove postId from inboxes.
4. **Live / Real-time:** new posts via WebSocket / SSE to feed clients with long-poll fallback; likes/comments via pub/sub per post (`post:{id}:live`).
5. **Data retention / GDPR:** hard-delete flows purge S3 objects + DB rows + inboxes + search index; story auto-expiry handles most.
6. **Analytics:** impression + engagement events to [Kafka](/system-design/kafka) → warehouse for ranking experiments.

**Phrase:** "S3 + CDN for bytes, DB for the post, precomputed inboxes for normal users, pull for celebrities. The feed never carries raw photos."

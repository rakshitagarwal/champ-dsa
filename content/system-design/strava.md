# Strava

> Fitness social network. GPS traces are **fat time-series**. Segments and leaderboards are the spicy extra — not just "Instagram for runs."

> GPS traces as time-series, segment matching on bounding boxes, leaderboards in Redis sorted sets, privacy per activity.

## What they ask

"Design Strava." Record GPS, activity page with map/stats, friends feed, **segment match** + **leaderboards**.

**Tests:** GPS in **S3 not OLTP**; async pipeline; segment match without O(activities × segments); hot leaderboard reads.

**Example scale:** 20M activities/month, ~5k points/trace, 5M segments; feed ~15k QPS avg.

## Requirements

**Functional:** Presigned upload, activity summary, follow graph + feed, define segments, match efforts, leaderboards (overall/year/friends), kudos/comments, privacy fuzz start/end.

**Non-functional:** Upload ACK without waiting for segment match; activity page p95 <200ms; traces immutable.

**Clarify:** Live beacons v1? Auto-pause vs moving time on server? Curated vs user segments?

**Out of scope (v1):** Live segments/cheering, route heatmaps (batch only), DMs, training plans.

## Scale estimation

| Quantity | Assumption | Result |
|---|---|---|
| GPS storage | 20M/mo × ~80 KB | ~1.6 TB/mo S3 |
| Activity rows | 20M/mo × ~1 KB | sharded Postgres |
| Efforts | ~5 segments/activity | ~100M efforts/mo |
| Leaderboard reads | Hot segment ~2k/s peak | Redis top-100 cache |
| Feed reads | ~15k QPS avg | inbox push like Instagram-lite |
| Efforts | ~5 matches/activity | ~100M efforts/mo |

**Takeaway:** Never match each activity against all 5M segments — geo pre-filter is mandatory.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/activities/presign` | S3 upload URL |
| `POST` | `/v1/activities` | Create activity (`status=processing`) |
| `GET` | `/v1/activities/{id}` | Summary + CDN polyline URL |
| `GET` | `/v1/feed` | Friends activities |
| `POST` | `/v1/segments` | Define segment polyline |
| `GET` | `/v1/segments/{id}/leaderboard` | Ranked efforts |
| `POST` | `/v1/users/{id}/follow` | Social graph |
| `POST` | `/v1/activities/{id}/kudos` | Like activity |

`Idempotency-Key` on `POST /activities` prevents double-upload on retry.

## High-Level Design (HLD)

![Strava architecture: GPS pipeline, segments, leaderboards, feed](/images/hld/strava-architecture.svg)

```
Mobile → presigned S3 (raw GPS) → POST /activities → Postgres summary → Kafka ActivityUploaded
  Workers: simplify polyline → stats → privacy fuzz → segment matcher (geo index) → effort + Redis ZADD leaderboard → feed fan-out
  CDN serves simplified polyline + map thumb
```

**Component roles:**
- **Activity Service:** Creates `processing` row; never proxies GPS through API tier.
- **Workers ([Kafka](/hld/message-queue)):** Simplify → stats → privacy fuzz → match → leaderboard → feed fan-out; each step idempotent.
- **Segment geo index:** [Elasticsearch](/hld/nosql-databases) / S2 on bbox — not full-table scan.
- **Feed:** Push `activityId` to follower inboxes ([Redis](/hld/caching-strategies) sorted set), like [Instagram](/hld/instagram) at lower QPS.

**Pipeline:** Douglas-Peucker; haversine + elevation filter; mask ~400m near `home_geohash`. **Matcher:** bbox query → corridor (start/end circles + max deviation). **Leaderboard:** Postgres `effort` then Redis `ZADD` by `elapsedMs`.

## Deep dive — 5M segments → ~50 candidates

Coarse: geo index (ES `geo_shape` / S2) on segment bbox. Fine: enter start circle, exit end circle, stay within `corridor_m`. Elapsed time between matched indices → insert `effort` (unique per activity×segment). All async after upload ACK.

## Deep dive — hot leaderboards

Famous segment: cache top-100 page 30–60s; Postgres on miss. `ZADD` after durable effort insert; rebuild Redis from DB on failover. Friends board: filter efforts by follow set (small) or precomputed key.

## Handling failures and scale

- **Worker crash:** Kafka replay; idempotent effort unique constraint.
- **Matcher paused:** Activity `ready` without efforts; catch up later.
- **Cheat filter:** Absurd sustained speed → flag, skip leaderboard insert.

**Phrase:** S3 for the GPS file, Postgres for the summary, async workers to match nearby segments and update Redis leaderboards. The feed only stores activity ids.

**Remember:** Bbox pre-filter before corridor math; never block upload on segment match; fuzz home location on stored polyline.

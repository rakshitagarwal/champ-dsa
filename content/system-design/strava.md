# Strava

> Fitness social network. GPS traces are **fat time-series**. Segments and leaderboards are the spicy extra — not just "Instagram for runs."

## What they ask

Record a run, store the GPS, show the activity, compare on a popular climb (segment), feed of friends' workouts.

## Requirements

**Functional:** upload activity (GPS + stats), activity page, follow feed, segments/leaderboard (scoped).

**Non-functional:** traces can be large; don't block upload on matching every segment on earth; feed similar to [Instagram](/system-design/instagram) but lower QPS.

## API

1. `POST /activities/presign` or chunked upload of GPX/polyline
2. `POST /activities` `{ objectKey, sport }`
3. `GET /activities/{id}`
4. `GET /feed`
5. `GET /segments/{id}/leaderboard`

## Design

**Raw GPS:** S3 (polyline / GPX). Never dump thousands of lat/lng rows into the request DB.

**Summary:** Postgres activity row: user, distance, time, elevation, start geohash, map thumbnail.

**Pipeline:** upload complete → Kafka workers: (1) simplify polyline, (2) compute stats, (3) match **segments** (pre-indexed geo), (4) update leaderboards, (5) fan-out to friends' feed.

**Feed:** activity ids into followers' inboxes. Photos optional.

**Maps:** static map image via tile CDN; interactive map loads the polyline from CDN.

## Deep dive — segments

A segment is a path with start/end plus a corridor. Matching every activity against every segment is impossible.

**Index segments** in a geo store (S2 / ES geo). For an activity, query segments near the trace bounding box, then check whether the GPS follows the corridor. Write `effort(segmentId, userId, elapsed, activityId)`.

**Leaderboard:** sorted set in Redis per segment (`score=elapsed`). Global and "this year" as two keys. Viral segment = hot key — shard by time or cache top 100.

**Privacy:** hide starting location (fuzz home). Don't leak a user's house in the public polyline.

## Extra probes

1. Live segments / beacons — similar to [Uber](/system-design/uber) location, TTL
2. Cheating: GPS sanity, too-fast filters
3. Dedup accidental double uploads (hash of trace)

**Phrase:** "S3 for the GPS file, Postgres for the summary, async workers to match nearby segments and update Redis leaderboards. The feed only stores activity ids."

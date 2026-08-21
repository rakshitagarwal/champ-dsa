# Instagram

> Photo-first social network. Same feed bones as [FB news feed](/system-design/fb-news-feed), with **heavier media** and a simpler graph (follow, not friends).

## What they ask

Follow people, post photos/reels, scroll a home feed, stories (optional).

## Requirements

**Functional:** upload, follow, feed, like/comment (scoped), profile grid.

**Non-functional:** fast first paint of images, write path that doesn't wait on fan-out for celebrities, CDN everywhere.

## API

1. `POST /media/presign` → upload to S3
2. `POST /posts` `{ mediaIds, caption }`
3. `POST /follow/{userId}`
4. `GET /feed?cursor=`
5. `GET /users/{id}/grid?cursor=`

## Design

**Upload:** client → S3. Workers make sizes (thumb, feed, full) + maybe a reel transcode ([YouTube](/system-design/youtube) lite). CDN in front.

**Post row** in Postgres: author, caption, media keys, createdAt.

**Feed:** hybrid fan-out. Push post id to followers' inbox (Redis/Cassandra) except celebrities — those are pulled at read time and merged. See news feed notes.

**Profile grid:** query by `authorId` + time. Easy to cache.

**Stories:** TTL 24h, separate store, sequential not ranked like feed.

## Deep dive — media vs feed ids

The feed cache stores **ids + types**, not JPEGs. The app hydrates URLs (CDN). If you stuff images into Redis, you will have a bad day.

**Write amplification:** a 50M-follower account cannot push 50M inbox writes. Hybrid fan-out is the answer; say the threshold.

**Ranking:** recency + relationship + send time. Reels may use a different candidate source (explore).

## Extra probes

1. Explore / For You — recall from embeddings; don't fake the whole ML stack
2. Hashtags — ES or a tag → post index
3. Abuse: photo moderation async, not blocking upload ACK

**Phrase:** "S3 + CDN for bytes, DB for the post, precomputed inboxes for normal users, pull for celebrities. The feed never carries raw photos."

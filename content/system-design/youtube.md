# YouTube

> Video platform. Bytes go through **object storage + CDN + transcoding**. The API only stores metadata and the user never waits on FFmpeg.

## What they ask

Upload a video, process it, play it on a phone in Nairobi with bad Wi-Fi. Search and comments are extras.

## Requirements

**Functional:** upload, process, stream, like, comment (scoped), search (scoped).

**Non-functional:** durable originals, global playback, adaptive bitrate, upload API not blocked on transcode.

## API

1. `POST /videos` `{ title }` → `{ videoId, uploadUrl }`
2. Client **PUT** to pre-signed S3
3. `POST /videos/{id}/complete`
4. `GET /videos/{id}` — metadata + playlist URL (HLS/DASH)
5. `GET /watch` player talks to CDN, not your app servers

## Design

**Upload:** client → S3. API records `status=processing`.

**Pipeline (Kafka workers):** virus/policy check → transcode ladder (144p…4K) → thumbnails → pack HLS/DASH → write rendition keys. Update `status=ready`. Notify the user.

**Playback:** player fetches a manifest from a nearby CDN (or YouTube's edge). Manifest lists chunk URLs. **Adaptive bitrate** picks a ladder rung from bandwidth.

**Metadata:** Postgres (title, owner, duration, vis). View counts via a separate counter / [Top K](/system-design/youtube-top-k) pipeline — not `UPDATE videos SET views=views+1` on every play.

**Thumbnails and previews:** CDN. Search: async [Elasticsearch](/system-design/elasticsearch) index.

## Deep dive — never block on transcode

Transcode is CPU/GPU minutes. If `complete` ran FFmpeg inline, uploads would time out. Queue + workers + progress events.

**Idempotent workers:** same source object shouldn't spawn 50 transcodes (dedupe on `videoId`).

**Hot video:** CDN cache; origin S3. App servers stay out of the byte path.

**Copyright / region:** policy service + CDN token / cookie. Don't invent DRM in 45 minutes — name Widevine as a box.

## Extra probes

1. Comments: shard by `videoId`; popular video → [live comments](/system-design/fb-live-comments) pattern
2. Recommendations: candidate generation + ranking; offline jobs
3. Live streaming: different ingest (RTMP) → packager → CDN; not the VOD pipeline

**Phrase:** "Pre-signed upload to S3, Kafka transcode to an HLS ladder, play from CDN. Postgres holds metadata only. View counts and search are async."

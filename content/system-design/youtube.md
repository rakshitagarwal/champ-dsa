# YouTube

> Video platform. Bytes go through **object storage + CDN + transcoding**. The API only stores metadata — users never wait on FFmpeg.

> Presigned S3 upload, async transcode to HLS ladder, playback from CDN. Views batched; metadata in Postgres.

## What they ask

**Scenario:** Creators upload video; platform transcodes to multiple qualities; viewers stream adaptively globally. Search/comments scoped extras.

**What the interviewer really tests:**
- **Byte path** (GB) vs **metadata path** (KB JSON).
- **Async transcoding** — upload API never blocks on FFmpeg.
- **ABR (HLS/DASH)**, CDN, never serve video from app servers.
- Avoid `views=views+1` per play and blobs in Postgres.

**Example scale:** ~17–50K playback QPS; ~1.3 PB/day originals + renditions; metadata ~1.7 GB/day — CDN carries bandwidth.

## Requirements

**Functional:**
- Upload (title, visibility), transcode ladder (144p–4K), thumbnails, adaptive stream.
- Like/comment (scoped), search (scoped), view count.

**Non-functional:**
- Upload API p95 < 300ms (not blocked on transcode); 11 9s on originals.
- Playback 99.9%; metadata strong; counts/search eventual.

**Clarify:** Max file size/duration? Live vs VOD separate? Region/copyright checks?

**Out of scope (v1):** Live RTMP ingest, ML recommendations, DRM detail (Widevine as box).

## Scale estimation

| Metric | Result |
|--------|--------|
| Uploads | ~10/s avg, ~30/s peak |
| Plays | ~17K/s avg, ~50K/s peak |
| Blob storage | PB-scale → [Object Storage](/hld/storage) |
| Bandwidth | ~4 Tbps avg — **CDN**, not origin |
| Metadata | trivial in [Postgres](/hld/sql-databases) |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/videos` | Create + presigned upload URL |
| `PUT` | presigned URL | Client → S3 direct |
| `POST` | `/v1/videos/{id}/complete` | Start processing (202) |
| `GET` | `/v1/videos/{id}` | Metadata + `manifestUrl` |
| `GET` | `/v1/videos/{id}/manifest` | 302 signed CDN URL |
| `POST` | `/v1/videos/{id}/views` | Debounced heartbeat |
| `GET` | `/v1/search?q=` | Search (async index) |

**Create:** `{ title, description, visibility }` → `{ videoId, uploadUrl, expiresAt }`.

## High-Level Design (HLD)

![YouTube architecture: upload, transcode queue, HLS, edge CDN](/images/hld/youtube-architecture.svg)

- **CDN:** HLS segments, manifests, thumbs — origin S3; signed URLs for private.
- **Video Service:** metadata state `created → uploading → processing → ready`; presign + complete → [Kafka](/hld/message-queue).
- **Transcode workers:** pull job, FFmpeg ladder, upload segments + `master.m3u8`, GPU autoscale.
- **Postgres:** videos/renditions; replicas for GET.
- **Views:** Redis INCR or Kafka → aggregator → [YouTube Top K](/hld/youtube-top-k); not hot row update.
- **Search:** Kafka → [Elasticsearch](/hld/nosql-databases) async.

**Playback:** GET metadata → player fetches manifest from CDN → ABR picks rendition client-side.

**State machine:** `UPDATE status='processing' WHERE status='uploading'` prevents double-queue on retry.

**Unlisted/private:** short-lived signed manifest; player refreshes before CDN cookie/TTL expiry.

## Deep dive — never block on transcode

`POST /complete` only flips status + publishes event. Workers scale on queue depth; poison → DLQ. Progress via poll or SSE. Multipart S3 for resume.

## Deep dive — views and hot videos

Player heartbeat ~30s → `INCR` Redis → minute batch to `views_daily`. Viral spike: CDN absorbs bytes; origin shield; app never sees segment traffic. Policy scan before transcode; region gate at CDN edge token.

## Failures and scale

- Worker retry: idempotent `UNIQUE(videoId, quality)` on renditions.
- CDN miss: player downgrades rendition; stale-while-revalidate.
- Transcode backlog: HPA on depth; shed 4K if queue huge.
- Signed URL refresh via `GET /manifest` before TTL expiry.
- Comments on viral video: shard by `videoId` ([FB Live Comments](/hld/fb-live-comments) pattern if asked).
- Live streaming: separate RTMP/LL-HLS path — not this VOD ladder.
- Copyright fingerprint stage before transcode — fail fast to `status=failed`.

**Phrase:** Pre-signed upload to S3, Kafka transcode to an HLS ladder, play from CDN. Postgres holds metadata only. View counts and search are async.

**Remember:** Presign → async transcode → HLS on CDN → batched views, not per-play UPDATE.

# YouTube

> Video platform. Bytes go through **object storage + CDN + transcoding**. The API only stores metadata and the user never waits on FFmpeg.

## What they ask

Design a system like YouTube / Netflix VOD where creators **upload** raw video, the platform **processes** it into multiple qualities, and viewers **stream** adaptively on any device — including a phone in Nairobi with bad Wi-Fi. Search, comments, likes, and recommendations are usually scoped extras, not the core 45-minute design.

What the interviewer really tests:

- Do you keep the **byte path** (gigabytes of video) separate from the **metadata path** (kilobytes of JSON)?
- Can you design an **async transcoding pipeline** that never blocks the upload API?
- Do you understand **adaptive bitrate (HLS/DASH)**, CDN caching, and why you never serve video bytes from app servers?
- Can you avoid the classic traps: `UPDATE views SET views=views+1` on every play, storing blobs in Postgres, or running FFmpeg inline in the request?

A strong answer: *pre-signed upload → durable blob → queue → transcode ladder → manifest → CDN → player*. Everything else is an async side-effect.

## Requirements

| Category | Details |
|---|---|
| **Functional** | Upload video (title, description, visibility), transcode to multiple renditions (144p to 4K), generate thumbnails, stream with adaptive bitrate, like/dislike, comment (scoped), search by title/description (scoped), view count, subscriptions / feed (v2) |
| **Non-functional** | Durable originals (11 9s), global low-latency playback, adaptive bitrate for variable bandwidth, upload API p95 < 300ms (not blocked on transcode), 99.9% availability for playback, strong consistency for metadata, eventual for counts/search |
| **Clarify** | Max video size? (e.g., 10 GB / 2 hr). Retention? Analytics? Live streaming is **not** VOD — separate ingest (RTMP). Ask about copyright/region checks vs simple upload |
| **Out of scope v1** | Real-time live ingest, recommendations/ML ranking (offline job), real-time collaborative editing, DRM beyond tokenized CDN URLs (name Widevine/FairPlay as a box) |

## Scale estimation

Assume 300M DAU, 2% creators upload 1 video/week, average original 1.5 GB, 5 renditions average 0.4× extra total (ladder is smaller than source).

| Metric | Math | Result |
|---|---|---|
| Upload QPS | 300M × 2% / 7 days = ~860K uploads/day ≈ **10 uploads/s** peak 3× → ~30/s | ~30 writes/s |
| Playback QPS | 300M × 5 plays/day = 1.5B plays/day ≈ **17K plays/s**, peak 50K/s | 17–50K reads/s |
| Storage (originals) | 860K × 1.5 GB = **1.3 PB/day** → 475 PB/year before renditions | PB scale — needs [Object Storage](/system-design/s3) (S3/GCS) |
| Storage (renditions) | 1.3 PB × 1.4 (ladder + thumbs + manifest) | ~1.8 PB/day |
| Bandwidth | 1.5B plays × 30 MB avg (ABR mix) = 45 PB/day ≈ **4.2 Tbps** avg | CDN-served, not origin |
| Metadata | 1 row/video ~2 KB → 860K × 2 KB = **1.7 GB/day** in [Postgres](/system-design/postgres) | Tiny vs blobs |

Key insight: metadata QPS and storage are trivial. Bandwidth and blob storage dominate — which is why the **CDN + object store** are the system, the API is just the index.

## API Design

```http
POST /v1/videos
Authorization: Bearer <token>
{ "title": "How I learned HLS", "description": "...", "visibility": "public" }
→ 201 { "videoId": "vid_9f3a", "uploadUrl": "https://upload.yt.example/...?sig=...", "expiresAt": "2026-08-25T12:10:00Z" }

PUT <uploadUrl>              // client uploads bytes directly to S3/GCS, not through API
Content-Type: video/mp4
<binary>

POST /v1/videos/{videoId}/complete
{ "fileSize": 1572864000, "checksum": "sha256:..." }
→ 202 { "status": "processing" }

GET /v1/videos/{videoId}
→ 200 { "videoId":"vid_9f3a","title":"...","status":"ready","durationSec":632,"renditions":["144p","720p","1080p"],"manifestUrl":"https://cdn.yt.example/vid_9f3a/master.m3u8","thumbnailUrl":"https://cdn.yt.example/vid_9f3a/thumb.jpg","views":48201 }

GET /v1/videos/{videoId}/manifest
→ 302 redirect to CDN signed URL (or return manifest directly if edge-cached)

POST /v1/videos/{videoId}/views   // called by player heartbeat, debounced — not on every chunk
POST /v1/videos/{videoId}/comments { "text": "..." }
GET  /v1/search?q=adaptive+bitrate&cursor=...
```

Headers: `Idempotency-Key` on create/complete. Player polling uses `Range` requests for chunks. All CDN URLs are **signed** with short TTL for private/unlisted videos.

## High-Level Design (HLD)

```
[ Client / Player ] 
      |
      v
[ CDN (CloudFront /Akamai) ]  <--  HLS chunks, thumbnails, manifests (edge-cached)
      |
[ L4 LB → API Gateway ]  --auth, rate-limit--[ Rate Limiter ] 
      |
  +---+---+---+
  |       |   |
[Video Service] [Transcode Orchestrator] [View/Search Services]
  |       |                |
[Postgres] [S3/GCS]   [ Kafka → Transcode Workers (FFmpeg/GPU) ]
  |       |                |
[Cache]  [Thumb Svc]  [ Elasticsearch (async) ]
[Redis]                [ Notification via WebSocket/Push ]
```

**Components:**

- **Client / Player:** Uploads via pre-signed URL, plays via HLS/DASH. ABR logic lives in player (hls.js / ExoPlayer) — not server.
- **CDN:** Serves 95%+ of bytes. Origin is S3. Cache key = `videoId/rendition/segment`. Signed cookies for region/privacy.
- **API Gateway + LB:** Terminates TLS, validates JWT, enforces [Rate Limiter](/system-design/rate-limiter) per user/IP.
- **Video Service:** Owns metadata, upload session, state machine `created → uploading → processing → ready/failed`. Writes Postgres, emits `video.upload.completed` to [Kafka](/system-design/kafka).
- **Transcode Workers:** Stateless consumers. Pull task, download source from S3, run FFmpeg ladder (144p…4K), pack HLS segments + master manifest, upload renditions back to S3, update DB via orchestrator. GPU autoscaled.
- **Metadata DB:** [Postgres](/system-design/postgres) for videos, users. Read replicas for `GET /videos`. Not on byte path.
- **Search & Counts:** Async [Elasticsearch](/system-design/elasticsearch) indexer and a separate counter pipeline ([YouTube Top K](/system-design/youtube-top-k)) — never inline `views+1`.
- **Cache:** [Redis](/system-design/redis) for hot video metadata, view-count write-behind buffer.

**Write flow (upload):** `POST /videos` → create row `status=created` + presign S3 → client PUT to S3 → `POST /complete` → set `processing` → publish Kafka event. Returns 202 immediately.

**Read flow (playback):** Player `GET /videos/{id}` → Video Service (or Redis/CDN cache) returns `manifestUrl` → player fetches `master.m3u8` from CDN → CDN fetches from S3 on miss → player picks rendition per bandwidth and fetches `.ts`/`.m4v` chunks directly from CDN.

## Low-Level Design (LLD)

### DB schema

```sql
CREATE TABLE users (
  user_id       UUID PRIMARY KEY,
  handle        TEXT UNIQUE NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE videos (
  video_id      UUID PRIMARY KEY,
  owner_id      UUID NOT NULL REFERENCES users(user_id),
  title         TEXT NOT NULL,
  description   TEXT,
  visibility    TEXT NOT NULL CHECK (visibility IN ('public','unlisted','private')),
  status        TEXT NOT NULL CHECK (status IN ('created','uploading','processing','ready','failed')),
  duration_sec  INT,
  source_key    TEXT, -- s3://bucket/originals/{videoId}/source.mp4
  manifest_key  TEXT, -- s3://bucket/renditions/{videoId}/master.m3u8
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_videos_owner ON videos(owner_id, created_at DESC);
CREATE INDEX idx_videos_status ON videos(status) WHERE status='processing';

CREATE TABLE renditions (
  rendition_id  UUID PRIMARY KEY,
  video_id      UUID NOT NULL REFERENCES videos(video_id) ON DELETE CASCADE,
  quality       TEXT NOT NULL, -- '144p','360p','720p','1080p','4K'
  codec         TEXT NOT NULL, -- 'h264','vp9','av1'
  bitrate_kbps  INT NOT NULL,
  s3_key_prefix TEXT NOT NULL,
  file_size     BIGINT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(video_id, quality, codec)
);

CREATE TABLE views_daily (
  video_id      UUID NOT NULL REFERENCES videos(video_id),
  day           DATE NOT NULL,
  view_count    BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (video_id, day)
);
-- Real-time counter in Redis, flushed hourly to views_daily + materialized total
```

### Key classes / responsibilities

```java
class VideoService {
  Video createVideo(userId, title) // → presigned URL
  void completeUpload(videoId, checksum) // validate S3 HEAD, set processing, publish event
  Video getVideo(videoId) // cache-aside Redis → Postgres → signed manifest URL
}
class TranscodeOrchestrator {
  void onUploadCompleted(event) // idempotent: INSERT ... ON CONFLICT DO NOTHING (dedupe videoId)
  void updateRendition(videoId, rendition) // track progress, set ready when ladder complete
}
class TranscodeWorker { // Kafka consumer
  void process(Task t) // download → FFmpeg ladder → upload chunks → ack; retry with backoff
}
class PlaybackService {
  String signedManifestUrl(videoId, user) // policy check + sign CDN URL
}
```

### Concurrency & algorithms

- **Idempotent workers:** Dedupe on `videoId` + `source_etag`. Worker writes `renditions` with `UNIQUE(videoId,quality)` — retries are safe.
- **State machine:** `compare-and-swap` on `status` (`UPDATE videos SET status='processing' WHERE status='created'`) prevents double-queueing.
- **Adaptive bitrate:** Player measures throughput per segment (EWMA), picks highest bitrate < estimated bandwidth. Server is stateless — just serves manifest.
- **Upload resumption:** Multipart S3 upload; `uploadId` stored in `videos` row for resume.

### Patterns used

Strategy (codec choice), State Machine (video lifecycle), Producer-Consumer (Kafka queue), Cache-Aside (Redis), Signed URL / Token Bucket for CDN auth.

## Deep dive — never block on transcode

Transcode is **minutes** of CPU/GPU, not milliseconds. If `POST /complete` ran FFmpeg inline, the HTTP request would time out, retries would spawn duplicate jobs, and a burst of uploads would OOM the API fleet. The fix: the API only flips a row and publishes an event. Workers scale independently (GPU ASG / K8s HPA on queue depth). Progress is reported via `GET /videos/{id}` polling or [WebSocket](/system-design/websocket) / SSE events (`processing: 30%`). Poison messages go to a DLQ after N retries.

## Deep dive — view counts and hot videos

Do **not** `UPDATE videos SET views=views+1` on every play — that row becomes a hot lock at 50K QPS. Instead the player heartbeats every ~30s debounced, hits a stateless `ViewIngest` service that `INCR` in [Redis](/system-design/redis) (or [Kafka](/system-design/kafka) → aggregator). Flusher aggregates per minute and batch-upserts `views_daily`. Reads use `cached_total + redis_delta`. Same reason search is async: DB write → Kafka → [Elasticsearch](/system-design/elasticsearch) — so indexing never blocks upload.

## Deep dive — copyright, regions, and thumbnail hot path

Policy checks (virus, CSAM, copyright fingerprint) run as **early pipeline stages** before transcode — fail fast and set `status=failed:policy`. Region / age-gate is enforced at **CDN edge** via signed token + edge function, not in app servers. Thumbnails are generated alongside renditions and pushed to CDN with long TTL + cache purge on update.

## Handling failures and scale

- **S3 / CDN miss:** Player retries next segment at lower rendition; CDN stale-while-revalidate. Origin shield reduces S3 thundering herd.
- **Worker crash mid-transcode:** Kafka re-delivers (at-least-once); idempotent rendition writes + deterministic chunk naming make retry safe.
- **DB overload:** Metadata reads from Redis + Postgres replicas; writes only on create/complete/status. View counts never hit Postgres hot path.
- **Hot video (MrBeast spike):** CDN absorbs 99% of bandwidth; add origin shield, pre-warm CDN on publish, and use consistent hashing for manifest cache. App servers never see byte traffic.
- **Transcode backlog:** Priority queue (small videos first), autoscale workers, and shed low-priority qualities (e.g., skip 4K if queue > threshold) — degrade gracefully.
- **Signed URL expiry:** Player refreshes manifest URL via `GET /manifest` every N minutes; never hardcode TTL in client.

## Extra probes / follow-ups

1. **Comments:** Shard by `videoId`; for viral videos reuse the [FB Live Comments](/system-design/fb-live-comments) sampled fan-out pattern rather than loading all comments.
2. **Recommendations:** Offline candidate generation + ranking service; online serving via feature store — not part of upload/playback critical path.
3. **Live streaming:** Separate ingest — RTMP/WebRTC → packager → low-latency CDN (LL-HLS) — not the VOD ladder; needs edge transcode and DVR window.
4. **Dedupe / re-upload:** Content hash (e.g., perceptual hash) to detect re-uploads; optionally reuse existing renditions copy-on-write.
5. **Analytics:** Kafka → warehouse; never query Postgres for watch-time aggregations.

**Phrase:** Pre-signed upload to S3, Kafka transcode to an HLS ladder, play from CDN. Postgres holds metadata only. View counts and search are async.


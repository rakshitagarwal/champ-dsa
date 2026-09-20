# Pastebin

> Paste service. Interesting parts are **unique short IDs**, **expiry**, and a **read-heavy fetch** path — similar bones to Bitly with larger payloads.

> Mint IDs with Snowflake, store body in object storage, cache hot pastes in Redis, expire with TTL workers. CDN serves public reads.

## What they ask

**Scenario:** "Design Pastebin — users paste text, get `pastebin.com/aB3x9K`. Anyone with the link can read it until it expires."

**What the interviewer really tests:**
- Unique ID generation at write QPS without a central bottleneck ([fundamentals](/hld/fundamentals) Snowflake).
- Where the **blob** lives vs **metadata** (object store vs DB).
- Expiry / privacy (public, unlisted, password) and abuse (size limits, rate limits).
- Read-heavy path: cache + CDN without making the DB hot.

**Example scale:** 10M new pastes/day (~100 writes/s, 1k peak), 100:1 read:write, avg paste 10 KB, max 1 MB, retention 1 day–forever by plan.

## Requirements

**Functional:**
- Create paste: `POST /v1/pastes` → `id` + URL.
- Fetch: `GET /v1/pastes/{id}` → body + metadata.
- Optional: syntax language, title, password, burn-after-read, custom expiry.
- Delete (owner) / list own pastes (auth).

**Non-functional:**
- **Latency:** p95 read < 100ms cache hit; create < 300ms.
- **Availability:** 99.9%+ reads; durable storage for paid/forever pastes.
- **Consistency:** read-your-writes for creator; public reads eventual OK within seconds.
- **Security:** size caps, rate limits, malware scanning for large uploads (v2).

**Clarify:** max size, retention defaults, anonymous vs auth, custom aliases, analytics?

**Out of scope (v1):** collaborative editing, folders, full-text search across all pastes.

## Scale estimation

| Metric | Math | Result |
|--------|------|--------|
| Writes | 10M/day / 10⁵ | ~100/s avg, ~1k peak |
| Reads | 100× writes | ~10k/s avg, ~100k peak |
| Storage/day | 10M × 10 KB | ~100 GB/day raw |
| Hot cache | 1% hottest × 10 KB | fits multi-GB Redis |

Bottleneck is **read QPS + bytes**, not row count — put bodies in [object storage](/hld/storage).

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/pastes` | Create paste |
| `GET` | `/v1/pastes/{id}` | Fetch paste |
| `DELETE` | `/v1/pastes/{id}` | Delete (auth) |
| `GET` | `/v1/me/pastes` | List own (auth) |

**Create request:**
```json
{
  "content": "console.log('hi')",
  "language": "javascript",
  "expiresInSec": 86400,
  "visibility": "unlisted"
}
```

**Errors:** `413` too large, `404` missing/expired, `401` password required, `429` rate limited.

## High-Level Design (HLD)

![Pastebin architecture: CDN, API, ID service, metadata DB, object store, cache, expiry](/images/hld/pastebin-architecture.svg)

```
Client → CDN / LB → Paste API
              ├─ ID / Snowflake service
              ├─ Metadata DB (Postgres): id, owner, expiry, visibility, s3_key
              ├─ Object store (S3): paste body
              ├─ Redis: hot paste cache
              └─ Expiry workers (scan / TTL queue)
```

**Write:** validate size → mint id → put object → insert metadata → (optional) warm cache → return URL.

**Read:** CDN/cache → Redis → else metadata + S3 → populate cache. Password pastes never CDN-cache publicly.

## Deep dive — IDs and expiry

- **IDs:** Snowflake or Base62 of Snowflake — short, unique, no DB sequence hotspot. Custom aliases: unique index, reserved words blocked.
- **Expiry:** store `expires_at`; workers delete S3 + row; Redis TTL mirrors. Burn-after-read: atomic `GET` + delete flag.
- **Large pastes:** multipart to S3; API stores only pointer.

## Failure and scale

- S3 outage → reads miss for cold pastes; serve from Redis hot set; creates fail closed.
- DB down → no new pastes; cached reads still work.
- Abuse → per-IP rate limit ([rate limiter](/hld/rate-limiter)), max size, CAPTCHA on anonymous.

**Closing phrase:** *"Snowflake ids, body in S3, metadata in Postgres, Redis + CDN on the read path, TTL workers for expiry."*

**See also:** [Bitly](/hld/bitly), [Storage](/hld/storage), [Fundamentals](/hld/fundamentals) (unique IDs).

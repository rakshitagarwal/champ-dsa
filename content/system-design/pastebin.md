# Pastebin

> Paste service. Interesting parts are **unique short IDs**, **expiry**, and a **read-heavy fetch** path — similar bones to Bitly with larger payloads.

> Mint IDs with Snowflake, store body in object storage, cache hot pastes in Redis, expire with TTL workers. CDN serves public reads.

## What they ask

**Scenario:** Users paste text, get `pastebin.com/aB3x9K`; anyone with the link reads until expiry.

**Tests:** Unique IDs at write QPS without DB hotspot ([fundamentals](/hld/fundamentals) Snowflake)? Blob in object store vs metadata in DB? Expiry, visibility, abuse limits? Read path without hot DB?

**Scale:** 10M pastes/day (~100 writes/s, ~1k peak); 100:1 read:write; avg 10 KB, max 1 MB.

## Requirements

**Functional (≤6):** Create + fetch by id; optional language, password, burn-after-read, expiry; delete/list own (auth).

**Non-functional:** p95 read < 100ms (cache hit); create < 300ms; 99.9%+ reads; size caps + [rate limiter](/hld/rate-limiter).

**Clarify (≤4):** Max size, default retention, anonymous vs auth, custom aliases?

**Out of scope (v1):** Collaborative editing, folders, global full-text search.

## Scale estimation

| Metric | Result |
|--------|--------|
| Reads | ~10k/s avg, ~100k/s peak |
| Storage/day | ~100 GB (10M × 10 KB) |
| Hot cache | Top 1% fits multi-GB Redis |

Bottleneck is **read QPS + bytes** — bodies in [object storage](/hld/storage).

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/pastes` | Create |
| `GET` | `/v1/pastes/{id}` | Fetch |
| `DELETE` | `/v1/pastes/{id}` | Delete (auth) |
| `GET` | `/v1/me/pastes` | List own |

Create body: `{ "content", "language", "expiresInSec", "visibility" }` — errors: `413`, `404`, `401`, `429`.

## High-Level Design (HLD)

![Pastebin architecture: CDN, API, ID service, metadata DB, object store, cache, expiry](/images/hld/pastebin-architecture.svg)

```
Client → CDN / LB → Paste API
              ├─ Snowflake IDs
              ├─ Postgres: id, owner, expiry, visibility, s3_key
              ├─ S3: body
              ├─ Redis: hot reads
              └─ Expiry workers (TTL / scan)
```

**Write:** validate → mint id → S3 put → metadata row → return URL. **Read:** CDN → Redis → metadata + S3 → warm cache. Password pastes skip public CDN.

## Deep dive

**IDs + expiry:** Base62 Snowflake — no sequence hotspot. `expires_at` + worker deletes S3 + row; Redis TTL mirrors. Burn-after-read: atomic read + delete flag. Large pastes: multipart to S3, pointer in DB.

## Failures and scale

- S3 outage: hot Redis still serves; creates fail closed.
- DB down: no new pastes; cached reads OK.
- Abuse: per-IP limits, max size, CAPTCHA on anonymous spikes.

**Phrase:** Snowflake ids, body in S3, metadata in Postgres, Redis + CDN on reads, TTL workers for expiry.

**Remember:** Read-heavy — never serve cold bodies from Postgres; unlisted ≠ secret (guessable ids) unless entropy is high.

**See also:** [Bitly](/hld/bitly), [Storage](/hld/storage).

# Bitly

> URL shortener. The interesting parts are **unique short codes** and a **read-heavy redirect** path. Analytics is extra, not v1.

> Build short codes with a range allocator, serve redirects from Redis in ~50ms, push analytics to Kafka async. Remember the 302 vs 301 trade-off.

## What they ask

**Scenario:** Design bit.ly — paste a long URL, get `bit.ly/abc12`; opening it redirects to the original.

**What the interviewer really tests:**
- **100:1 to 1000:1 read:write** without putting the DB on the hot path.
- **Globally unique, short codes** at scale without a single bottleneck.
- **301 vs 302**, browser/CDN caching, and analytics trade-offs.
- **High availability** on redirects — a broken link is a broken internet.

**Example scale:** 100M links/month (~400 writes/s peak), 10B redirects/month (~40k reads/s peak). They may push: "500M DAU clicking links from Twitter?"

## Requirements

**Functional:**
- Create short link: `POST /v1/links` → `code` + `shortUrl`.
- Redirect: `GET /{code}` → HTTP redirect to `longUrl`.
- Custom alias (unique), optional expiry, delete/deactivate (owner).
- Analytics (v2): clicks, referrer, geo — off the hot path.

**Non-functional:**
- p95 redirect < 50ms (cache hit), < 150ms (miss); creation < 300ms.
- 99.99% availability for reads; durable mappings.
- 10k–50k redirect QPS sustained, burst to 100k.
- Read-after-write for creator; no open-redirect abuse.

**Clarify:** read/write ratio and retention? Code length/charset (Base62)? 301 vs 302 for analytics? Auth and rate limits on create?

**Out of scope (v1):** BI dashboard, QR, branded domains, link password, deep funnels.

## Scale estimation

| Metric | Result |
|--------|--------|
| Writes | ~38/s avg, ~400/s peak |
| Reads (100:1) | ~3.8k/s avg, ~40k/s peak |
| Storage | ~500 B/mapping → ~50 GB/month, ~3 TB / 5 years |
| Hot cache | Top 20% links → ~10 GB in [Redis](/hld/caching-strategies) |

Bottleneck is QPS, not bytes.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/links` | Create short link |
| `GET` | `/{code}` | Redirect to long URL |
| `DELETE` | `/v1/links/{code}` | Delete/deactivate (auth) |
| `GET` | `/v1/links/{code}` | Metadata |
| `GET` | `/v1/links/{code}/stats` | Analytics (v2) |

**Create (201):** `{ "longUrl", "customAlias?", "expiresAt?" }` → `{ "code", "shortUrl", "longUrl", "expiresAt" }`.

Redirect: `302` + `Cache-Control: private, max-age=0` if you need click counts; `301` if browser/CDN cache matters and analytics do not. Errors: `400`, `409` alias taken, `404` expired, `429`.

## High-Level Design (HLD)

![Bitly architecture: CDN, link service, Redis, DB, Kafka analytics](/images/hld/bitly-architecture.svg)

- **CDN:** TLS, DDoS shield; caches 301s if used.
- **API Gateway:** auth on create, [rate limiter](/hld/rate-limiter), URL validation.
- **Link Service:** allocate code → persist → cache; redirect = Redis → DB → 302.
- **Cache ([Redis](/hld/caching-strategies)):** `code → { longUrl, expiresAt }`; cluster + LRU.
- **DB:** Postgres or DynamoDB (`PK=code`); shard by code prefix when needed.
- **[Kafka](/hld/message-queue):** async `LinkClicked` → ClickHouse; never block redirect.

**Write:** validate → alias uniqueness → range allocator → INSERT → SET Redis → return.

**Read:** CDN → Redis GET; miss → DB → backfill Redis (TTL = min(expires, 24h)) → redirect; publish click async.

**Idempotency on create:** same `longUrl` optional dedup is product choice; custom alias races resolved by unique index → `409`.

## Deep dive — generating codes

**Counter + Base62 + range allocation:** Each host reserves `[start, end)` from Redis/etcd `INCRBY`; encodes locally — no per-request coordination. Seven chars ≈ 3.5T codes. Gaps on restart are OK.

**Alternatives:** KGS precomputed pool (`SKIP LOCKED` pop); hash+retry collides on 6 chars — always enforce DB unique on `code`. Custom aliases share the same namespace and unique index.

## Deep dive — read-heavy redirect

Cache-aside with TTL; **singleflight** on cold codes so one DB read backfills Redis. **302** for analytics; **301** if repeat hits should not reach origin. Never synchronous `UPDATE click_count` on redirect.

**Enumeration:** 7+ char non-sequential codes; rate-limit guessing on `GET /{code}`; no public list API.

## Failures and scale

- Shard `links` by code prefix; Redis cluster by hash.
- Postgres primary + replicas for miss path; circuit breaker if Redis down → bounded DB load.
- DB down: creations 503; redirects from Redis/CDN if warm.
- Expiry: lazy on read + daily sweeper; async delete expired keys.
- KGS down → fall back to range allocator; Kafka down → buffer clicks, redirect still succeeds.
- Abuse: [rate limiter](/hld/rate-limiter) on create; blocklist bad long URLs async.
- Branded domain (probe): route by `Host` header, composite key `(domain, code)`.
- Link edit: `UPDATE` + `DEL` Redis + CDN purge; creator read-after-write from primary optional.

**Phrase:** Redirect is cache then DB. Codes from a range allocator so we never collide. 302 if we care about click counts; analytics async off the hot path.

**Remember:** Range allocator Base62 → Redis redirect → 302 for counts → clicks via Kafka, not on the request path.

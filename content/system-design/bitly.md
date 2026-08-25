# Bitly

> URL shortener. The interesting parts are **unique short codes** and a **read-heavy redirect** path. Analytics is extra, not v1.

## What they ask

**Scenario:** "Design bit.ly — users paste a long URL, get `bit.ly/abc12`. Anyone who opens it lands on the original."

**What the interviewer really tests:**
- Can you handle **100:1 to 1000:1 read:write ratio** without putting the DB on the hot path?
- How you generate **globally unique, short, non-colliding codes** at scale without a single bottleneck.
- Whether you understand **301 vs 302**, browser/CDN caching, and analytics trade-offs.
- How you make the system **highly available** — a broken redirect is a broken internet.

**Example scale they expect you to reason about:** 100M new links/month (~40 writes/s avg, 400/s peak), 10B redirects/month (~4k reads/s avg, 40k/s peak). They will push: "What if we have 500M DAU clicking links from Twitter?"

## Requirements

**Functional:**
- Create short link from long URL: `POST /v1/links` → returns `code` + `shortUrl`.
- Redirect: `GET /{code}` → HTTP redirect to `longUrl`.
- Custom alias: user requests `bit.ly/my-brand` — must be unique, validated.
- Expiry: optional `expiresAt`; after expiry return 404/410.
- Delete / deactivate link (authenticated owner only).
- Analytics (v2): click counts, referrer, geo — off the hot path.

**Non-functional:**
- **Latency:** p95 redirect < 50ms (cache hit), < 150ms (cache miss). Creation < 300ms.
- **Availability:** 99.99% for reads; writes can be slightly less. No data loss for mappings — durable.
- **Throughput:** support 10k–50k redirect QPS sustained, burst to 100k.
- **Consistency:** eventual OK for creation propagation, but redirect must return correct mapping once created (read-after-write for creator).
- **Security:** no open redirect abuse, private links not enumerable if needed.

**Clarify — questions to ask interviewer:**
- Expected read/write ratio and retention period? (7 years? forever?)
- Code length fixed (6-7 chars) or variable? Allowed charset — Base62?
- Need custom aliases and are they globally unique?
- 301 vs 302 preference — do we need click analytics?
- Auth required to create? Rate limits per user/IP?
- Need QR codes, link editing, or bulk creation?

**Out of scope (v1):**
- Full BI dashboard, A/B testing on links, link preview unfurling.
- QR generation, branded domains (keep `bit.ly` only).
- Link password protection, deep analytics funnels.

## Scale estimation

| Metric | Assumption | Math | Result |
|--------|-----------|------|--------|
| Writes (new links) | 100M / month | 100M / 30 / 86400 | ~38 writes/s avg, ~400/s peak (10x) |
| Reads (redirects) | 100:1 read:write | 38 * 100 | ~3.8k reads/s avg, ~40k/s peak |
| If 1B redirects/month | — | 1B / 2.6M sec/month | ~385 reads/s per 100M? Actually ~12k/s avg |
| Storage per mapping | `code(7) + longUrl(avg 200) + metadata ~500B` | 100M * 500B | ~50 GB/month, ~600 GB/year, ~3 TB / 5 years |
| Cache needed | Hot 20% links serve 80% traffic | 20M * 500B | ~10 GB hot set — fits in [Redis](/system-design/redis) cluster |
| Bandwidth (redirect) | 500B response headers + 302 | 40k * 500B | ~20 MB/s egress at peak |

**Reasoning:** metadata only — not the destination page. Even at 1B links, storage is single-digit TBs. Bottleneck is QPS, not bytes. Show you can do this math in 60 seconds.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/links` | Create short link |
| `GET` | `/{code}` | Redirect to long URL |
| `DELETE` | `/v1/links/{code}` | Delete/deactivate (auth) |
| `GET` | `/v1/links/{code}` | Get link metadata |
| `GET` | `/v1/links/{code}/stats` | Click analytics (v2) |

**Create — Request:**
```json
POST /v1/links
Authorization: Bearer <token>
{
  "longUrl": "https://example.com/very/long/path?with=params",
  "customAlias": "my-brand",
  "expiresAt": "2027-08-25T00:00:00Z"
}
```
**Create — Response (201):**
```json
{
  "code": "aB3x9K2",
  "shortUrl": "https://bit.ly/aB3x9K2",
  "longUrl": "https://example.com/very/long/path?with=params",
  "createdAt": "2026-08-25T10:00:00Z",
  "expiresAt": "2027-08-25T00:00:00Z"
}
```
**Redirect:**
```
GET /aB3x9K2
→ 302 Found
  Location: https://example.com/very/long/path?with=params
  Cache-Control: private, max-age=0
```
Use `302` if you need analytics (hits reach you). Use `301` if you want browser/CDN caching and don't care about counting — mention trade-off explicitly.

**Errors:** `400` invalid URL, `409` alias taken, `404` not found/expired, `429` rate limited.

## High-Level Design (HLD)

```
Client (Browser/App)
   |
  CDN (CloudFront / Cloudflare) — caches 301s, shields origin
   |
  L4 LB → API Gateway (auth, [rate limiter](/system-design/rate-limiter), WAF)
   |
  +---> Link Service (create + redirect)
   |        |--> ID / Code Generator Service
   |        |--> Cache ([Redis](/system-design/redis) Cluster)
   |        |--> DB (Postgres / DynamoDB)
   |        `--> [Kafka](/system-design/kafka) → Analytics Workers → ClickHouse / Druid
   |
   `--> Analytics Service (reads from OLAP)
```

**Component roles:**
- **CDN:** offloads hot redirects if using 301; even with 302, absorbs DDoS and TLS termination.
- **API Gateway:** authenticates creation, rate-limits per API key/IP, validates URLs.
- **Link Service:** stateless app servers (auto-scaled). Handles both write (allocate code → persist → cache) and read (cache → DB → redirect).
- **Cache ([Redis](/system-design/redis)):** `code → { longUrl, expiresAt, ownerId }`. TTL-aware. Clustered, replicated. Hot path for 90%+ reads.
- **DB (Postgres with read replicas or DynamoDB PK=`code`):** source of truth. Shard by `code` prefix when needed.
- **[Kafka](/system-design/kafka):** decouples analytics — redirect publishes `LinkClicked{ code, timestamp, ip, ua }` asynchronously.

**Write flow (create):** Validate URL → check custom alias uniqueness → allocate code (via generator) → `INSERT INTO links` → `SET` in Redis → publish creation event → return `shortUrl`.

**Read flow (redirect):** `GET /{code}` → check CDN → hit API Gateway → Redis `GET`. On hit & not expired → `302`. On miss → DB lookup → if found, backfill Redis (with TTL = min(expiresAt - now, 24h)) → redirect. If missing/expired → `404`. Async publish click to Kafka (fire-and-forget, don't block redirect).

## Low-Level Design (LLD)

**Database schema (Postgres):**
```sql
CREATE TABLE users (
  id            BIGSERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  api_key       VARCHAR(64) UNIQUE NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE links (
  code          VARCHAR(16) PRIMARY KEY,          -- Base62, 7 chars default
  long_url      TEXT NOT NULL,
  owner_id      BIGINT REFERENCES users(id),
  created_at    TIMESTAMPTZ DEFAULT now(),
  expires_at    TIMESTAMPTZ,
  is_active     BOOLEAN DEFAULT true,
  click_count   BIGINT DEFAULT 0,                 -- optional denormalized, or in OLAP
  CONSTRAINT chk_code CHECK (code ~ '^[A-Za-z0-9_-]{4,16}$')
);
CREATE INDEX idx_links_owner ON links(owner_id);
CREATE INDEX idx_links_expires ON links(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX idx_links_created ON links(created_at);

-- For analytics (OLAP wisely separate, but v2 inline sketch):
CREATE TABLE click_events (
  id            BIGSERIAL PRIMARY KEY,
  code          VARCHAR(16) REFERENCES links(code),
  clicked_at    TIMESTAMPTZ DEFAULT now(),
  ip            INET,
  user_agent    TEXT,
  referrer      TEXT,
  country       CHAR(2)
) PARTITION BY RANGE (clicked_at);
```

**Sharding note:** when single Postgres saturates, shard by `hash(code) % N` or `code[0]` prefix. Dynamo alternative: `PK=code`, GSI on `owner_id`.

**Key classes / responsibilities:**
```python
class LinkService:
    def create_link(self, user_id, long_url, custom_alias=None, expires_at=None) -> Link: ...
    def resolve(self, code: str) -> str: ...  # returns long_url or raises NotFound
    def delete(self, code: str, user_id: str): ...

class CodeGenerator:
    # Range allocator: each app host reserves [start, end) from ZK/etcd/Redis INCR
    def next_code(self) -> str: ...  # Base62(counter)

class KeyGenerationService:  # alternative: precomputed pool
    def pop_unused_code(self) -> str: ...
    def refill_async(self): ...

class Cache:
    def get(self, code): ...
    def set(self, code, value, ttl): ...

class AnalyticsPublisher:
    def publish_click(self, code, request_meta): ...  # -> Kafka
```

**Important algorithms / concurrency:**
- **Base62 encoding:** `chars = 0-9A-Za-z`; encode auto-increment counter → 7 chars gives `62^7 ≈ 3.5T` codes — enough for decades.
- **Range allocator:** `INCRBY 10000` on Redis/etcd gives each instance a range; no coordination per request. On restart, discard unused range (gaps OK).
- **Custom alias:** `INSERT ... ON CONFLICT DO NOTHING` + check affected rows; return `409` if conflict. Unique index guarantees correctness under race.
- **Hash+retry alternative:** `code = Base62(hash(longUrl + salt))[:7]`; on collision, retry with new salt — needs DB uniqueness check.

**Design patterns:** Factory (CodeGenerator), Proxy/Cache-Aside, Publisher-Subscriber (Kafka), Singleton for range allocator coordinator.

## Deep dive — generating codes

**Why not `md5(url)[:6]`?** Same URL should arguably give same code (dedup), but different URLs collide in 6 hex chars (≈16M space). Birthday paradox guarantees collisions fast. Don't rely on hash truncation without collision handling.

**Preferred — Counter + Base62 with range allocation:** Single logical counter, physically sharded. Each API host fetches a range `[1M, 2M)` from [ZooKeeper](/system-design/zookeeper) / etcd lease. Encodes locally with no network call. Pros: guaranteed unique, short, ordered. Cons: guessable/enumerable — mitigate by shuffling or starting at random offset, or using 7 chars + non-sequential precomputed pool.

**Alternative — Key Generation Service (KGS):** Dedicated service pre-generates codes into a DB table `unused_codes(code PK, used BOOLEAN)`. Creation does `SELECT ... FOR UPDATE SKIP LOCKED LIMIT 1` or `POP` from Redis list. Survives bursts because pool is pre-filled. Need to monitor refill lag and handle KGS single-point-of-failure via replicas + standby.

**Custom aliases:** treat as same namespace. Validate `^[A-Za-z0-9_-]{4,16}$`, length 4-16, reserved words blocklist (`api`, `admin`). Unique index on `code` is the arbiter.

## Deep dive — read-heavy redirect path

**Cache-Aside with TTL:** Redis holds `code → longUrl` with TTL = `expiresAt - now()` (capped). p95 < 10ms from cache. On miss, DB read + backfill. Use `SET NX` stampede protection: if 10k clients request same cold code, only one threads through to DB (singleflight).

**301 vs 302 decision:** `301 Moved Permanently` is cached by browsers/CDNs — great for cost, terrible for analytics (you never see repeat clicks). `302 Found` always hits origin — accurate counts but higher load. Most interviewers expect `302` + `Cache-Control: private, max-age=0` and explicit mention. Hybrid: `302` for logged-in/analytics links, `301` for public evergreen links.

**CDN interaction:** Even with 302, CDN can still shield via `stale-while-revalidate` for hot codes. Purge on delete.

## Deep dive — analytics off the hot path

Redirect should **never** do a synchronous DB `UPDATE click_count`. Instead: publish to [Kafka](/system-design/kafka) `topic=link-clicks` with `{ code, ts, ip, ua, referrer }`. Consumers batch-write to ClickHouse/Cassandra and increment Redis counters. This keeps redirect latency flat under spike. Mention idempotency: consumers dedup via `(code, requestId)` if needed. For GDPR, hash IPs.

## Handling failures and scale

- **Sharding:** Hash-shard `links` by `code` prefix (`code[0:2]` → shard). Consistent hashing for Redis cluster. Add shards when single-node QPS > 10k or storage > 1TB.
- **Replication:** Postgres primary + 2 read replicas for creation reads and cache miss fallback. Failover via managed service (RDS). Dynamo alternative gives multi-AZ by default.
- **Caching:** Redis Cluster with replicas, eviction `allkeys-lru`. Size for hot set (10-20 GB). On Redis failure, degrade to DB — circuit breaker to avoid DB overload; serve stale CDN copy if available.
- **Failure modes:** DB down → creations fail (return 503), redirects still served from Redis/CDN (partial availability). KGS down → fall back to range allocator. Kafka down → buffer in memory + retry; redirect still succeeds.
- **Expiry cleanup:** Lazy on read (`if now > expiresAt → 404 + async delete`) + daily sweeper job deleting `expires_at < now() - 7d`. Use partitioned `click_events` with TTL.
- **Abuse:** Auth + [rate limiter](/system-design/rate-limiter) (token bucket per API key/IP: 100 creates/min). Blocklist malicious long URLs via async scanner.

## Extra probes / Interview follow-ups

1. How to support **branded domains** (`brand.ly/xyz`)? Add `domain` column, composite PK `(domain, code)`, routing by `Host` header.
2. How to handle **link editing** (change longUrl for same code)? `UPDATE` + cache invalidate (`DEL` Redis + CDN purge) + version history table.
3. What if we need **strong read-after-write** for creator? Read from primary or wait for cache replication; return newly created mapping directly.
4. How to prevent **enumeration** of all links? Use 7+ chars, non-sequential codes, rate-limit `GET /{code}` guessing, don't expose list API publicly.
5. **Data retention:** archive cold links (no clicks in 1 year) to S3/Parquet, keep DB lean; lazy restore on access.

**Phrase:** Redirect is cache then DB. Codes come from a range allocator so we never collide. 302 if we care about click counts; Kafka for analytics off the hot path.

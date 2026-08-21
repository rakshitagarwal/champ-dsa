# Bitly

> URL shortener. The interesting parts are **unique short codes** and a **read-heavy redirect** path. Analytics is extra, not v1.

## What they ask

Users paste a long URL, get `bit.ly/abc12`. Anyone who opens it lands on the original. Interviewers poke ID generation, 301 vs 302, and cache.

## Requirements

**Functional:** create a short link, redirect, optional expiry and custom alias.

**Non-functional:** redirects must be fast and highly available. Writes are rare vs reads (~100:1). Don't lose mappings.

**Out of scope until they ask:** QR codes, A/B links, full BI.

**Scale sketch:** 100M new links/month is tens of writes/s; redirects can be thousands/s. Storage is metadata (TBs over years), not the web itself.

## API

1. `POST /v1/links` `{ longUrl, expiresAt? }` → `{ code, shortUrl }`
2. `GET /{code}` → **302** (or 301) to `longUrl`
3. `DELETE /v1/links/{code}` (auth)
4. `GET /v1/links/{code}/stats` (later)

**301 vs 302:** 301 is cached by browsers — cheaper for you, worse analytics. 302 keeps hits on your servers. Say which and why.

## Design

Client → CDN/LB → [API gateway](/system-design/api-gateway) → Link service.

**Write:** validate URL → allocate `code` → write Postgres (or Dynamo: PK=`code`) → set Redis `code → longUrl`.

**Read:** Redis get. Miss → DB. 404 if missing or expired. Then redirect.

Do not fetch the destination page. You only store the string.

## Deep dive — generating codes

Naive `md5(url)[:6]` collides. Don't.

**Base62 of a counter.** Global counter. Encode 7 chars. Need unique counters across machines: each instance grabs a **range** (1–1M, 1M–2M) from [ZooKeeper](/system-design/zookeeper) / etcd / Redis `INCR`. Simple and ordered (guessable — add a shuffle if needed).

**Key generation service.** Precompute unused keys; on create, pop one. Survives bursts.

**Custom aliases.** Unique index on `code`. If taken, 409.

**Hash + retry** is OK if you check uniqueness in the DB.

## Extra probes

1. Shard URL table by `code` prefix when it no longer fits
2. TTL: lazy delete on redirect + a sweeper
3. Analytics: redirect publishes to [Kafka](/system-design/kafka); don't do it inline
4. Abuse: auth + [rate limiter](/system-design/rate-limiter) on create

**Phrase:** "Redirect is cache then DB. Codes come from a range allocator so we never collide. 302 if we care about click counts; Kafka for analytics off the hot path."

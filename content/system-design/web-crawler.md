# Web Crawler

> Download the web politely. The core is a **URL frontier + dedup + robots.txt**, not a recursive `wget` on one box.

## What they ask

Start from seed URLs, follow links, store pages for search. Don't DDoS a small site. Don't loop forever on calendar URLs.

## Requirements

**Functional:** fetch HTML, extract links, store documents, respect robots.txt.

**Non-functional:** huge URL space, polite per-host rate, idempotent recrawl, detect duplicates.

**Clarify:** whole web vs a company intranet (changes politeness and size).

## API

Usually internal:

1. `POST /seeds` `{ urls[] }`
2. `GET /status` queue depth, crawl rate
3. Downstream search uses the store, not the crawler API

## Design

**Frontier (priority queue):** URLs to visit. Kafka / Redis / custom disk queue. Priority: importance, recency, sitemap.

**Fetcher workers:** pop URL → DNS → robots check (cached per host) → HTTP GET with cap on size/time → parse.

**Per-host limiter:** one crawl queue **per domain** so example.com isn't hit by 200 workers. This is a [rate limiter](/system-design/rate-limiter) keyed by host.

**Dedup URLs:** canonicalize (strip tracking params, trailing slash, hash). Bloom filter + exact store of seen URLs (Cassandra / Dynamo / RocksDB).

**Content:** store raw HTML in S3; hash body to skip unchanged pages (ETag / checksum). Parse links → enqueue if unseen.

**DNS / robots cache:** don't look up robots.txt every fetch.

## Deep dive — traps

**Calendar / infinite spaces:** cap path depth, cap unique URLs per host, fingerprint URL patterns (`?date=`).

**Canonical vs duplicate content:** same page, many URLs — store by content hash.

**Politeness vs throughput:** many hosts in parallel, few connections per host. That's how you stay fast *and* nice.

**JavaScript-heavy pages:** optional headless render queue (expensive). Say v1 is static HTML.

## Extra probes

1. Recrawl policy: sitemaps + change frequency
2. Failures: 5xx backoff; 410 drop
3. Output: index pipeline to [Elasticsearch](/system-design/elasticsearch)

**Phrase:** "A frontier of canonical URLs, fetchers sharded by host with robots and rate limits, and a seen-set so we don't loop. HTML in S3; links go back to the queue."

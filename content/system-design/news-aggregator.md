# News Aggregator

> Google News / Apple News lite. Ingest many publishers, **dedupe stories**, rank a feed. Crawling is a means, not the product.

## What they ask

Pull articles from 1k sites, cluster duplicates ("same earthquake, 40 headlines"), show a personalized or ranked list.

## Requirements

**Functional:** ingest, cluster, rank, read article (or outbound link), optional topic pages.

**Non-functional:** freshness (minutes), don't DDoS publishers, legal robots/sitemaps.

## API

1. `GET /feed?topic=&cursor=`
2. `GET /stories/{clusterId}`
3. Publisher webhooks or crawl-only (internal)

## Design

**Ingest:** RSS / sitemaps / [web crawler](/system-design/web-crawler) polite per host → raw HTML in S3 → parse title, body, time, canonical URL.

**Canonicalize:** URL normalize + content hash. Same article, many URLs → one document.

**Cluster:** embedding or shingling / MinHash of title+first paragraph. Same cluster id for "near duplicate" news. Store cluster → list of sources.

**Rank:** recency × source authority × clicks (from your pixels). Personalization: user topic weights in Redis; blend with global.

**Serve:** homepage reads a materialized list per topic (Redis / CDN) rebuilt every minute by a job. Don't scatter-gather 1k publishers on `GET /feed`.

## Deep dive — clustering

Exact hash misses rewrites. Too-loose clustering merges unrelated stories. Practical v1: normalize title, block by time window + geo/topic, then similarity threshold. Human-ish: "first source in, others attach."

**Freshness vs load:** poll important publishers every minute, long tail every 15. Webhooks if they offer them.

**Paywalls / copyright:** often link out; store snippet only. Say it.

## Extra probes

1. Breaking news: push ([notification system](/system-design/notification-system))
2. Spam SEO sites — denylist
3. Search — [Elasticsearch](/system-design/elasticsearch) on cluster titles

**Phrase:** "Polite ingest, canonicalize URLs, cluster near-duplicates, and serve a precomputed topic feed. The user request never crawls the web."

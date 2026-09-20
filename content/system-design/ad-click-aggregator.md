# Ad Click Aggregator

> Count clicks (and impressions) for ads so you can **bill** and show dashboards. The bar is **no lost money** and **late events**, not a fancy UI.

> Clicks into Kafka, counted in Flink windows, late events via watermarks, billing exactly-once with checkpoints + idempotent sinks.

## What they ask

"Billions of clicks/impressions/day — aggregate by campaign/ad/hour; pixels retry; events arrive late; Super Bowl spikes."

**Tests:** Ingest fast/durable vs serve dashboards (CQRS); dedup at-least-once ingest; event-time windows; **closed billing windows** vs live dashboard approximations.

**Scale anchor:** ~52B events/day combined; ~600k/s avg ingest; impressions dominate volume.

## Requirements

**Functional:**
- Ingest click/impression `{ eventId, type, adId, campaignId, userId, ts, region, costMicros }`.
- Dedupe retries (UUID + optional `user+ad+minute` fallback).
- Rollups: counts, spend sum, HLL uniques by campaign/ad/region for 1m/1h/1d buckets.
- `GET /stats` for dashboards; daily **closed** billing export per campaign (UTC day).

**Non-functional:**
- **No lost billable events** — at-least-once ingest + dedup + idempotent sink.
- Dashboard freshness ~30–60s; invoices use immutable closed windows + adjustments trail.
- Raw log retained ~90 days for audit/replay; query path isolated from ingest firehose.

**Clarify:** Client `eventId` vs server `hash(user,ad,minute)` dedup? Separate click/impression topics? HLL OK for dashboard uniques?

**Out of scope (v1):** Auction/bidding, view-through attribution, synchronous fraud reject on pixel.

## Scale estimation

| Dimension | Assumption | Result |
|-----------|-----------|--------|
| Impressions | 50B/day | ~580k/s avg, ~3M peak |
| Clicks | 2B/day | ~23k/s avg, ~150k peak |
| Combined ingest | ~52B/day | ~600k/s avg aggregate |
| Raw volume | ~300B/event | ~15 TB/day Kafka (~109 TB × RF7d) |
| Hour aggregates | ~1M campaigns × 24 buckets | GB/day — trivial vs raw |
| Dashboard reads | 2k RPS × ~10KB | Redis for top 1% campaigns |
| Flink dedupe state | 1h window @ peak | RocksDB spill to disk OK |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/click` | Pixel 204 (→ Kafka) |
| `POST` | `/v1/events:batch` | SDK batch 202 |
| `GET` | `/v1/stats` | Dashboard buckets (`isFinal` on open hour) |
| `GET` | `/internal/billing/export` | Closed day totals |

## High-Level Design (HLD)

![Ad click aggregator: ingest, fraud, billing path, OLAP](/images/hld/ad-click-aggregator-architecture.svg)

```
Pixel/SDK → Edge (204 <20ms, acks=all) → Kafka raw_clicks / raw_impressions
  → Flink dedupe (eventId TTL 1h) → window agg (event-time 1m/1h/1d, watermarks)
  → Serving store (Cassandra/ClickHouse) + Redis hot campaigns
  → Dashboard Service | Billing Service (close day + S3 Parquet reconcile)
  Fraud tap: same topic, separate consumer — filter at query time for billing
```

**Components:** Regional edge behind [load balancer](/hld/load-balancing); Kafka `ad.raw.clicks` / `ad.raw.impressions` (impressions much higher volume); Flink dedupe + tumbling/sliding windows; serving store (ClickHouse/Cassandra); optional fraud consumer on same topic.

**Write:** 204/202 in <20ms — produce with `acks=all`. **Read:** Dashboard hits Redis then OLAP; billing cron closes UTC day and reconciles against S3 Parquet archive.

## Deep dive — money vs dashboards

Dashboards: HLL uniques, ~30s staleness, `isFinal=false` on current hour. Billing: freeze day at T+5 UTC; late events → `billing_adjustments` row, not silent overwrite. Hourly Spark vs raw reconciles drift.

## Deep dive — late events and exactly-once effect

Watermark + 5m allowed lateness updates open windows; older → adjustments table. Flink checkpoint + idempotent upsert key `(campaignId, bucket, adId, region)` = no double billing on replay.

## Handling failures and scale

- **Edge death:** Stateless LB; client retries same `eventId` — dedup absorbs duplicates.
- **Kafka broker loss:** RF=3, `min.insync.replicas=2`; producer retries with backoff.
- **Flink job fail:** Checkpoint recovery; idempotent upsert prevents double billing.
- **Serving store overload:** Redis front door; async sink with bounded concurrency.
- **Hot campaign (Super Bowl):** Salt keys two-stage; boost parallelism on detected heavy hitters.
- **Clock skew:** Cap future `ts` to `receivedAt`; bucket in UTC at ingest.
- **PII:** Hash user/ip early in pipeline if policy requires; encrypt raw at rest.

**Phrase:** The pixel only publishes to Kafka. Flink counts with event-time windows. Billing uses closed windows and deduped event ids. The advertiser UI reads a serving store, never the firehose.

**Remember:** Separate ingest SLA from query SLA; dedupe before count; closed windows for invoices.

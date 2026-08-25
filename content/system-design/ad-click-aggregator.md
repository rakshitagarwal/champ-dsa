# Ad Click Aggregator

> Count clicks (and impressions) for ads so you can **bill** and show dashboards. The bar is **no lost money** and **late events**, not a fancy UI.

## What they ask

Interviewer: "We serve billions of ad clicks/impressions a day. Build the pipeline that aggregates by campaign/ad/hour so finance can invoice and advertisers see dashboards. Pixels retry, events arrive late, and one campaign can spike 10x during Super Bowl." This is a streaming billing system, not a CRUD app.

**What they really test:** (1) Separate **ingest** (fast, never loses money) from **serve** (queried dashboards) — CQRS. (2) Idempotency & dedup under at-least-once ingest. (3) Event-time windows, watermarks, and late-event handling. (4) When dashboards can be approximate but invoices must reconcile exactly. (5) Hot campaign skew.

**Scale anchor:** 2B clicks + 50B impressions/day at a large ad network. Avg ingest ~600k events/sec, peak ~5M/sec during prime time. Each event ~300B JSON. Dashboard query ~2k RPS; billing export once daily. Retain raw 90 days for audit, aggregates indefinitely.

## Requirements

**Functional:**
- Ingest click event `{ eventId, adId, campaignId, userId, ts, ip, region, costMicros }` and impression event (same schema, `type=impression|click`) via pixel/SDK.
- De-duplicate retries and double-pixels (same `eventId` or `user+ad+timeBucket` within 10 min).
- Aggregate counts and sums: `count, sum(cost), uniqueUsers (HLL)` grouped by `campaignId, adId, region` per time bucket (1 min, 1 hour, 1 day).
- Query API `GET /stats?campaign=&ad=&from=&to=&granularity=hour` for dashboards.
- Billing export: daily closed-window aggregates per campaign (UTC day) with reconciled, auditable numbers.
- Fraud signal tap: obvious bots filtered before billing (consumed by fraud service).

**Non-functional:**
- Durability: **zero lost billable events** (at-least-once ingest + dedup, not at-most-once).
- Idempotent counts under retries; exactly-once *effect* via idempotent sink.
- Freshness: dashboard lag < 30-60s (streaming), billing uses closed windows.
- Isolation: query path never touches ingest path; serving store scaled independently.
- Auditability: raw log retained immutable for replay; aggregates reconcilable to raw.

**Clarify:**
- What defines duplicate? `eventId` UUID from client vs server-generated `hash(user,ad,minute)`? (Prefer client UUID with server fallback.)
- Impression vs click: two topics/pipelines or one? (Often two, different volume.)
- Timezone for billing day? (Say UTC, configurable per advertiser.)
- Need real-time fraud blocking or offline filtering? (Offline for v1, flag not drop.)
- Unique user counting strict or HyperLogLog approximate? (HLL for dashboards, exact for billing via dedup table.)

**Out of scope (v1):**
- Bidding / ad serving / auction — only counting.
- Real-time ML fraud models (separate service taps same topic).
- Per-user frequency capping.
- Complex attribution (view-through vs click-through).

## Scale estimation

| Dimension | Assumption | Math | Result |
|-----------|-----------|------|--------|
| Click events | 2B/day | 2B / 86400 | ~23k/sec avg, ~150k peak |
| Impression events | 50B/day | 50B / 86400 | ~580k/sec avg, ~3M peak |
| Combined ingest | ~52B/day | 52B * 300B | ~15.6 TB/day raw into Kafka |
| Kafka retention 7d | 15.6 TB * 7 | ~109 TB | 3x replication → ~327 TB disk |
| Aggregates | 1M campaigns * 24 hour buckets * 100B row | ~2.4 GB/day hour-granularity | Trivial vs raw; daily granularity even smaller |
| Dashboard reads | 2k RPS * 10KB response | 20 MB/s | Cacheable for top campaigns |
| Flink state | dedup window 1h * 600k eps * 64B key | ~2.2 GB/hour * replication | RocksDB spill to disk, manageable |

Impressions dominate volume; many designs keep clicks and impressions on separate pipelines with different retention/cost.

## API Design

```http
// Pixel — must be feather-light, returns 204 or 1x1 GIF
GET /v1/click?eventId=uuid-1&adId=ad123&campaignId=camp9&ts=1714000000&userId=u42&costMicros=1200
=> 204 No Content  (also sets CORS headers, logs, publishes to Kafka)

// SDK / server-to-server (preferred, batched)
POST /v1/events:batch
Content-Type: application/json
{
  "events": [
    { "eventId": "uuid-1", "type": "click", "adId": "ad123", "campaignId": "camp9", "ts": 1714000000, "userId": "u42", "region": "IN", "costMicros": 1200 },
    { "eventId": "uuid-2", "type": "impression", "adId": "ad123", "campaignId": "camp9", "ts": 1714000005, "userId": "u43" }
  ]
}
=> 202 { "accepted": 2 }

// Query — dashboard
GET /v1/stats?campaignId=camp9&from=2026-05-10T00:00:00Z&to=2026-05-11T00:00:00Z&granularity=hour&region=IN
=> 200
{
  "campaignId": "camp9",
  "granularity": "hour",
  "buckets": [
    { "bucket": "2026-05-10T00:00:00Z", "clicks": 12034, "impressions": 892341, "ctr": 0.013, "spendMicros": 14440800, "uniquesHLL": 11023 }
  ],
  "isFinal": false  // false if last bucket still open
}

// Billing export (internal)
GET /internal/billing/export?day=2026-05-10&campaignId=camp9
=> 200 { "day": "2026-05-10", "campaignId": "camp9", "clicks": 288123, "spendMicros": 345000000, "status": "closed" }
```

All ingest endpoints return fast (edge validates and enqueues, never waits for aggregation).

## High-Level Design (HLD)

```
Pixel/SDK -> Edge Collector (204 fast) -> [Kafka] raw_clicks / raw_impressions (partitioned by campaignId hash)
                                                  |
                                     [Flink] Dedupe (eventId table TTL 1h) -> [Flink] Window Agg (event-time, 1m/1h/1d)
                                                  |                                        |
                                          Fraud Service (tap)                      Serving Store ([Cassandra]/[Druid]/ClickHouse)
                                                  |                                        ^ 
                                                  v                                        |
                                            Dead-letter / late queue                Dashboard Service -> Cache ([Redis]) -> UI
                                                                                         |
                                                                                  Billing Service (closed windows from store + S3 replay)
```

**Components:**
- **Edge Collector:** Stateless edge in 3 regions, behind [Load Balancer](/system-design/load-balancer) + CDN. Validates fields, stamps `receivedAt`, assigns `eventId` if missing, produces to [Kafka](/system-design/kafka) with `acks=all`. Returns 204 in <20ms. No DB on request path. Backpressure via bounded queue + `429` when Kafka unavailable (client retries).
- **[Kafka](/system-design/kafka):** Two topics `ad.raw.clicks` (12 partitions per 10k eps) and `ad.raw.impressions` (larger). Retention 7-30 days. Compression `lz4`/`zstd`. Partition key `campaignId` (or `adId`) preserves per-campaign ordering for deterministic dedup; but for throughput sometimes round-robin and dedup via global table.
- **[Flink](/system-design/flink) Pipelines:** (1) **Dedupe processor:** RocksDB state `eventId -> seen` TTL 1h + Bloom pre-filter; drops duplicates. Also handles `user+ad+minute` fallback key for clients without UUID. (2) **Window aggregator:** Keyed by `(campaignId, granularity)` with event-time windows. Maintain `count, sum(cost), HLL uniques` incrementally. Emit updates every 10s to serving store (upsert). Watermark = max event ts - 45s; allowed lateness 5 min.
- **Serving Store:** [Cassandra](/system-design/cassandra) or ClickHouse/Druid for OLAP slices. Schema optimized for `WHERE campaignId=? AND bucket >=? AND bucket <?`. TTL not needed — keep forever for reporting. Secondary [Redis](/system-design/redis) cache for hottest campaigns (top 1% campaigns = 90% reads) with 30s TTL.
- **Dashboard Service:** Reads serving store, merges open (in-flight) + closed buckets, marks `isFinal=false` for current hour. Serves from Redis cache first.
- **Billing Service:** Cron at `00:05 UTC` closes yesterday's window. Queries serving store for `day=2026-05-10` and cross-checks with **S3 raw replay** (hourly Parquet dump via Kafka Connect) for reconciliation. Billing reads closed windows only.

**Write path:** pixel -> edge -> Kafka -> Flink dedupe -> Flink window agg -> serving store.
**Read path:** dashboard/billing -> Dashboard/Billing Service -> Redis cache -> serving store (Cassandra/Druid) -> response.

## Low-Level Design (LLD)

**DB schema — dedup + aggregates + raw archive pointer**

```sql
-- Dedupe table (RocksDB in Flink; shown as SQL for interview)
CREATE TABLE event_dedup (
  event_id   UUID PRIMARY KEY,
  campaign_id VARCHAR(32) NOT NULL,
  ts         TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
) WITH ttl = '1 hour';
CREATE INDEX ON event_dedup (campaign_id, ts);

-- Minute aggregates (hot, Flink upserts)
CREATE TABLE agg_minute (
  campaign_id VARCHAR(32) NOT NULL,
  ad_id       VARCHAR(32) NOT NULL,
  region      VARCHAR(8)  NOT NULL,
  bucket      TIMESTAMPTZ NOT NULL, -- truncated to minute
  clicks      BIGINT NOT NULL DEFAULT 0,
  impressions BIGINT NOT NULL DEFAULT 0,
  spend_micros BIGINT NOT NULL DEFAULT 0,
  uniques_hll BYTEA, -- serialized HLL sketch
  updated_at  TIMESTAMPTZ NOT NULL,
  is_final    BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (campaign_id, bucket, ad_id, region)
) PARTITION BY RANGE (bucket);

-- Hour aggregates (rolled up from minute, serving)
CREATE TABLE agg_hour (
  campaign_id VARCHAR(32) NOT NULL,
  ad_id       VARCHAR(32) NOT NULL,
  region      VARCHAR(8)  NOT NULL,
  bucket      TIMESTAMPTZ NOT NULL, -- truncated to hour
  clicks      BIGINT NOT NULL,
  impressions BIGINT NOT NULL,
  spend_micros BIGINT NOT NULL,
  uniques_hll BYTEA,
  PRIMARY KEY (campaign_id, bucket, ad_id, region)
) PARTITION BY RANGE (bucket);

-- Day aggregates (billing source of truth, immutable after close)
CREATE TABLE agg_day (
  day         DATE NOT NULL,
  campaign_id VARCHAR(32) NOT NULL,
  ad_id       VARCHAR(32) NOT NULL,
  region      VARCHAR(8)  NOT NULL,
  clicks      BIGINT NOT NULL,
  impressions BIGINT NOT NULL,
  spend_micros BIGINT NOT NULL,
  uniques_exact BIGINT, -- reconciled exact if required
  status      VARCHAR(16) NOT NULL, -- 'open','closed','adjusted'
  PRIMARY KEY (day, campaign_id, ad_id, region)
);

-- Raw archive (S3 external table via Hive/Parquet)
-- s3://ad-logs/raw/dt=2026-05-10/hour=00/events.parquet
```

**Key classes & responsibilities**

```java
class AdEvent { String eventId, type, adId, campaignId, userId, region; Instant ts; long costMicros; }
class EdgeCollector {
  void handle(AdEvent e); // validate, stamp receivedAt, produce to Kafka
}
class DedupeProcessor {
  boolean isDuplicate(AdEvent e); // check eventId table TTL 1h + user+ad+minute fallback
  void markSeen(AdEvent e);
}
class WindowAggregator {
  // Flink ReduceFunction + WindowFunction keyed by campaignId+bucket
  void add(AdEvent e, Window w); // increments count/sum/HLL
  Aggregate emit(Window w);       // upsert to Cassandra
}
class ServingStore {
  List<Bucket> query(String campaignId, Instant from, Instant to, Granularity g);
  void upsert(Aggregate agg); // idempotent upsert keyed by (campaignId, bucket, adId, region)
}
class BillingService {
  void closeDay(LocalDate day); // freeze agg_day, reconcile with S3 replay
  void adjustLate(LocalDate day, AdEvent late); // side adjustments table
}
```

**Concurrency handling / algorithms:**
- **Idempotent sink:** Sink key is `(campaignId, bucket, adId, region)`. Flink upsert is idempotent; replay produces same row. Use `INSERT ... ON CONFLICT DO UPDATE clicks = clicks + delta` if delta model, or `upsert full bucket count` if recomputed.
- **Event-time + watermark:** Events may arrive 5 min late (mobile offline, retry). Watermark = max ts - 45s; windows fire on watermark. Late events within 5 min update window via allowed lateness; beyond that, go to `late_events` side output and an `adjustments` table that billing adds to closed day without mutating history silently.
- **HLL for uniques:** `uniques` is HyperLogLog sketch merged per window — O(1) memory vs exact set, ~1% error acceptable for dashboards; billing can optionally compute exact via batch replay if contract requires.
- **Hot campaign skew:** One campaign (Super Bowl) gets 100x traffic → single Flink key would bottleneck. **Salt the key:** `key = campaignId + "#" + random(0..S-1)` first stage sums per salt, second stage merges. Same trick as YouTube Top-K.
- **Exactly-once effect:** Flink checkpointing (every 30s to S3) + transactional Kafka producer + idempotent Cassandra sink = end-to-end exactly-once effect despite at-least-once ingest.

**Design patterns:**
- **CQRS / Event Sourcing:** Kafka log is source of truth; serving store is derived materialized view.
- **Idempotent Receiver:** `eventId` dedup table.
- **Lambda/Kappa unified:** Streaming path for realtime + batch Parquet replay for reconciliation (Kappa with replay).
- **Sidecar fraud tap:** Separate consumer group reads same topic without coupling to billing latency.

## Deep dive — Money vs dashboards (correctness tiers)

Not all reads need same accuracy. **Dashboards** can be approximate and laggy: show `isFinal=false` badge on current hour, use HLL for uniques, allow 30s staleness via [Redis](/system-design/redis) cache. **Invoices** need closed, auditable numbers: finance runs `closeDay()` at `T+5 min` UTC — that day's `agg_day` rows become immutable (`status='closed'`). Any late event after close doesn't overwrite the row; it inserts into `billing_adjustments(day, campaignId, deltaClicks, deltaSpend)` so the invoice can show "original + adjustments" with audit trail. Reconciliation job (Spark over S3 Parquet) hourly compares `SUM(raw)` per campaign vs `SUM(agg_hour)`; if divergence >0.1% alert and auto-correct via upsert. Timezone handling: store all bucket timestamps in UTC, convert at query time per advertiser preference — never bucket in local time at ingest.

## Deep dive — Late events, fraud and exactly-once

**Late events:** Watermark delay 45s accommodates normal jitter; allowed lateness 5 min lets Flink update already-emitted windows via incremental aggregation (RocksDB keeps window state until `watermark + lateness` passes). Beyond that, late queue → adjustments. **Fraud filtering:** Synchronous blocking on ingest would add latency and lose money if fraud service is slow — so ingest always accepts, then a Flink side-processor or separate consumer flags `is_fraud_suspected` based on rate per IP, datacenter ASN, impossible velocity. Billing query by default filters `WHERE is_fraud=false`, but raw retains everything for appeal. **Exactly-once:** Don't claim Kafka alone gives exactly-once. Show checkpoint + two-phase commit sink: Flink checkpoints offset + state atomically; on failure, replays from last checkpoint and re-upserts same aggregates (idempotent) → no double billing. **At-least-once + dedup** alternative is simpler to explain and equally correct: keep `event_dedup` and sink via idempotent upsert.

## Handling failures and scale

- **Edge collector death:** Stateless behind LB; clients retry pixel with same `eventId` — dedup absorbs duplicates.
- **Kafka broker loss:** Replication factor 3, `acks=all`, `min.insync.replicas=2`; producer retries with backoff; edge buffer spills to local disk 5 min if Kafka unavailable then replays.
- **Flink job failure:** Checkpoint recovery from S3; window state rebuilt. No data loss because Kafka retains 7 days. Lag alert if consumer lag >100k.
- **Cassandra/Druid overload:** Bulkhead: Flink sink throttles via async writes with bounded concurrency; dashboard reads go through Redis cache so DB not hit per request. Add read replicas / scale ClickHouse shards.
- **Hot campaign overload:** Salting + separate fast lane: top 10 campaigns get dedicated Flink parallelism or dedicated Kafka partitions; auto-detected via heavy-hitter sketch.
- **Clock skew:** Edge stamps `receivedAt`; windowing uses `event.ts` (client time) but caps future timestamps (>5 min ahead) to `receivedAt` to avoid window never closing.
- **PII / GDPR:** Hash `userId`/`ip` before logging if possible; raw store encrypted at rest; deletion requests handled via compaction tombstones on raw S3 (batch rewrite).
- **Scale knob:** Add Kafka partitions + Flink task managers linearly; serving store scales via partitioning by `campaignId`.

## Extra probes

- Impression vs click — two topics with 25x volume difference; keep pipelines identical but impression pipeline cheaper retention and sampled for dashboard if needed.
- Why not write aggregates directly on pixel request? — Would make pixel latency depend on DB and lose events on DB outage; queue decouples.
- Negative caching / bot flood — [Redis](/system-design/redis) rate limiter per IP at edge drops obvious abuse before Kafka.
- Compare stores: [Cassandra](/system-design/cassandra) for write-heavy aggregates, Druid/ClickHouse for OLAP slice-and-dice, [Elasticsearch](/system-design/elasticsearch) less ideal for sums.
- Exactly-once vs at-least-once + dedup — both valid; interviewers often accept latter as simpler.
- GDPR/purge — don't put raw PII in Kafka if avoidable; hash early.

**Phrase:** The pixel only publishes to Kafka. Flink counts with event-time windows. Billing uses closed windows and deduped event ids. The advertiser UI reads a serving store, never the firehose.

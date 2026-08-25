# Metrics Monitoring

> Datadog / Prometheus-shaped system. Ingest **time series**, downsample, alert when an SLO burns. Dashboards are a read model.

## What they ask

Interviewer: *"Design a metrics platform — services emit CPU, latency, QPS; you store them, graph them, and page a human when `p99 latency > 300ms` for 5 minutes. Millions of series, cheap storage for a year."*

What they really test:
- **Write vs read path split:** High-cardinality ingestion (millions of points/sec) vs ad-hoc range queries — do you separate and downsample?
- **Cardinality bomb:** Can you explain why `userId` as a tag kills the TSDB and what you do instead?
- **Alert correctness:** State machine `pending → firing → resolved`, burn-rate vs threshold, grouping/inhibition so one outage isn't 5k pages.
- **Downsampling & retention:** Raw 15s for a day, 1m for weeks, 1h for a year — do you design tiered storage?

Example scale: 5k hosts × 100 metrics/host × 1 sample/15s = 33k samples/sec. With labels (service, endpoint, status, AZ) → 2M active series. Query: 1k dashboards × refresh 30s. Keep 1 year — 1T samples → need compaction.

## Requirements

**Functional:**
- **Ingest:** push (StatsD/Datadog agent) and pull (Prometheus scrape) — `metric name + labels/tags + timestamp → value`.
- **Query:** range query `GET /query?metric=http_latency&tags=service:api,status:500&from=&to=&agg=avg|p99|sum`, instant query, and dashboard widgets (line, heatmap).
- **Dashboards:** CRUD, templated variables, sharing; widget cache.
- **Alerts:** CRUD rule `expr: avg(http_latency{service=api}) > 300ms for 5m`, notify via [notification system](/system-design/notification-system) (PagerDuty/Slack/email), with grouping, inhibition, silencing.
- **Labels/tags:** arbitrary key-value, but with cardinality guardrails.
- **Retention & downsampling:** tiered: raw → 1m → 1h.

**Non-functional:**
- **Write QPS ~100k/sec** sustained, burst 500k, with backpressure and local buffer.
- Cheap long-term storage — 90% of queries hit last 24h, but 1y must be queryable slower.
- Query P99 < 1s for last-hour dashboard, < 5s for 7-day.
- Alert evaluation reliable — at-least-once, not missed due to ingest lag.
- No unbounded series explosion — guard cardinality at ingest.

**Clarify:**
- Push vs pull — support both or pick one? (Say your choice, justify)
- Exact quantiles or approximate? (t-digest/histogram vs raw samples)
- Per-tenant isolation or single org? (Multi-tenant adds `tenantId` label)
- Logs/traces in same system? (No — metrics only, sibling stores)

**Out of scope (v1):**
- Distributed tracing (Jaeger) — same agents, different store.
- Log aggregation (ELK) — cardinality expectations differ.
- ML anomaly detection — rule-based alerts v1.
- Billing/metering per team — defer.

## Scale estimation

| Parameter | Assumption | Math | Result |
|---|---|---|---|
| Hosts | 5k | — | 5k |
| Metrics/host | 100 (CPU, mem, http_*, db_*) | 5k×100 | 500k logical metrics |
| Cardinality | avg 4 label combos per metric (service×endpoint×status×az) | 500k×4 | **~2M active series** |
| Samples/sec | scrape 15s | 2M / 15 | **~133k samples/sec** ingress |
| Bytes/sample | 16B (ts 8 + value 8 + overhead) | 133k×16 | **~2.1 MB/s** raw, ~180 GB/day uncompressed |
| With replication & index | 3× overhead | — | **~540 GB/day** to store (before downsampling) |
| Storage 1y raw | 540GB×365 | — | **~197 TB** if kept raw — must downsample |
| After downsampling | raw 1d (540GB) + 1m for 30d (~18GB/d) + 1h for 335d (~0.75GB/d) | — | **~1.3 TB + index** per year — feasible |
| Dashboards | 1k dashboards × 10 panels × refresh 30s | 10k queries /30s | **~330 QPS** query path |

Bandwidth dominated by scrape payload — compression (snappy) and delta-of-delta encoding.

## API Design

```http
// Ingest — push (Datadog style)
POST /api/v1/ingest
Content-Type: application/json
[
  {"metric":"http.requests","value":1,"timestamp":1715600000,"tags":{"service":"api","endpoint":"/checkout","status":"200","az":"us-east-1a"}},
  {"metric":"http.latency","value":42,"timestamp":1715600000,"tags":{"service":"api","endpoint":"/checkout"},"type":"histogram"}
]
→ 202 { "ingested": 2 }

// Ingest — Prometheus remote write (protobuf + snappy)
POST /api/v1/write  (Prometheus remote_write)
→ 204

// Query — range
GET /api/v1/query_range?metric=http.latency&tags=service:api,endpoint:/checkout&from=1715600000&to=1715603600&step=60s&agg=avg
→ 200 { "metric":"http.latency","tags":{...},"points":[[1715600000,42],[1715600060,45],...] }

GET /api/v1/query?metric=http.latency&tags=service:api&at=1715600000&agg=p99

// Dashboards
POST /api/v1/dashboards { "title":"API Overview", "widgets":[{ "query":{...}, "type":"line" }] }
→ 201 { "dashboardId":"d_123" }
GET  /api/v1/dashboards/{id}
PUT  /api/v1/dashboards/{id}

// Alerts
POST /api/v1/alerts
{
  "name":"High latency api",
  "expr":"avg(http.latency{service=\"api\"}) > 300",
  "for":"5m",
  "labels":{"severity":"page","team":"checkout"},
  "annotations":{"summary":"p99 > 300ms"},
  "notify":["pagerduty:svc_123","slack:#alerts"]
}
→ 201 { "alertId":"a_123", "state":"inactive" }

GET /api/v1/alerts
GET /api/v1/alerts/{id}/history?from=&to=

POST /api/v1/silences { "matchers":[{"name":"service","value":"api"}],"endsAt":"..." } // mute noise
```

Scrape alternative: `GET /metrics` on each host (Prometheus pull) — agent exposes text exposition format; collector scrapes every 15s.

## High-Level Design (HLD)

```
[Hosts/Services] ── agents (StatsD/Prometheus exporter) ──┐
                                                          │ push or pull
                          ┌───────────────────────────────▼───────────────────────────────┐
                          │                    Ingest Tier                               │
                          │  [Load Balancer] → [Ingest Gateway] (validate, cardinality   │
                          │                    check, hash by metric)                    │
                          └───────────────────────────────┬───────────────────────────────┘
                                                          │ partitioned by (metric, tags) hash
                          ┌───────────────────────────────▼───────────────────────────────┐
                          │               Buffer: [Kafka]  topic: metrics.raw             │
                          │               (partition by metric hash, RF=3, retention 6h)  │
                          └───────────────────────────────┬───────────────────────────────┘
                                                          │  ┌─────────────────┐
                          ┌───────────────────────────────▼──▼─────────────────▼─────────┐
                          │                 Storage Tier                                    │
                          │  [TSDB Writers] ──▶ [TSDB Cluster] (Mimir/Thanos/ClickHouse)  │
                          │       │               ├── Hot: raw 15s, 24h retention (SSD)   │
                          │       │               ├── Warm: downsampled 1m, 30d (HDD)     │
                          │       │               └── Cold: downsampled 1h, 1y (S3/GCS)   │
                          │       │                                                        │
                          │       └────────▶ [Downsampler Job] (continuous compaction)   │
                          └───────────────────────────────┬───────────────────────────────┘
                                                          │
                          ┌───────────────────────────────▼───────────────────────────────┐
                          │                  Query Tier                                     │
                          │  [Query Gateway] → [Query Engine] (range agg, cache) → TSDB  │
                          │       │              │                                          │
                          │       │              └─ [Redis] widget cache (TTL 30s)         │
                          │       └─ [Dashboard Service → Postgres (dashboard defs)]       │
                          └───────────────────────────────┬───────────────────────────────┘
                                                          │
                          ┌───────────────────────────────▼───────────────────────────────┐
                          │                  Alerting Tier                                  │
                          │  [Rule Evaluator] (every 30s, reads TSDB) → [Alert Manager]  │
                          │       │ state: pending→firing→resolved                         │
                          │       └─▶ [Notification System] → PagerDuty/Slack/email        │
                          │           grouping, inhibition, silencing                        │
                          └───────────────────────────────────────────────────────────────┘
```

**Component roles:**
- **Agents:** per-host daemon (Datadog agent / Prometheus exporter) — aggregates counters, buffers locally on disk if Kafka down, compresses batch, pushes every 10s or exposes `/metrics` for pull. Tags host-level labels automatically.
- **Ingest Gateway:** validates schema, enforces cardinality limit (`max_series_per_metric`), hashes `(metric, tags)` to partition, writes to [Kafka](/system-design/kafka). Returns 429 if cardinality would explode.
- **[Kafka](/system-design/kafka) buffer:** decouples bursty ingest from TSDB write; retention 6h enough to absorb TSDB compaction pause or Writer crash.
- **TSDB Cluster:** write-optimized LSM/col-store. Hot shard holds raw 15s for 24h on SSD (fast queries). Downsampler continuously aggregates `avg/sum/min/max` per 1m and 1h buckets and moves to warm/cold. Uses delta-of-delta + XOR encoding for values.
- **Query Gateway/Engine:** parses PromQL-ish, fans out to TSDB shards by time range + metric hash, merges, applies `avg/p99` (p99 via pre-aggregated histograms/t-digests). Caches dashboard widget results in [Redis](/system-design/redis) (30s) to absorb refresh storms.
- **Rule Evaluator:** loads alert rules from Postgres, evaluates `expr` every 30s by querying TSDB (same path as dashboards but with `for` hold). State machine prevents flapping — must stay `> threshold` for `for` duration before firing.
- **Alert Manager:** groups by `labels` (e.g., `alertname+service`), inhibits lower severity if higher fires, respects silences, dedups, then calls [notification system](/system-design/notification-system).

**Data flow — ingest:** App `http_latency 42` → Agent batch → Ingest Gateway validates → hash → Kafka partition `metrics.raw` → TSDB Writer consumes → writes to hot TSDB + WAL → ack.

**Data flow — query:** Dashboard `GET /query_range?http.latency last 1h step 1m` → Query Gateway checks [Redis](/system-design/redis) widget cache → miss → fan-out to hot shard only (since 1h) → merge + `avg` per step → cache → return.

**Data flow — alert:** Rule `avg(latency{service=api}) > 300 for 5m` → Evaluator every 30s queries TSDB for last 5m → sees 4/5 samples above → state `pending`; 5th sample still above → `firing` → Alert Manager groups and pages PagerDuty via notification service.

## Low-Level Design (LLD)

**Data model — TSDB internal (not plain SQL):**

```text
Series:  { metric: "http.latency", labels: {service:"api", endpoint:"/checkout", status:"200", az:"1a"} } → seriesId (hash)
Point:   (seriesId, timestampSec, value double)
Storage layout per shard (LSM):
  - WAL (write-ahead log) per writer
  - Memtable (recent 1h, sorted)
  - SSTables (time-partitioned blocks, 2h chunks) with inverted index: label → seriesIds
  - Downsampled blocks: 1m rollup {avg,sum,count,min,max, tDigest} and 1h rollup
```

**Relational tables (for dashboards/alerts metadata in Postgres):**

```sql
CREATE TABLE dashboards (
  id            UUID PRIMARY KEY,
  owner_id      UUID NOT NULL,
  title         TEXT NOT NULL,
  definition    JSONB NOT NULL, -- widgets: [{ query, type, thresholds }]
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE alert_rules (
  id            UUID PRIMARY KEY,
  name          TEXT NOT NULL,
  expr          TEXT NOT NULL, -- promql-ish
  for_duration  INTERVAL NOT NULL DEFAULT '5 minutes',
  labels        JSONB NOT NULL, -- severity, team
  annotations   JSONB NOT NULL,
  notify_channels TEXT[] NOT NULL,
  enabled       BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON alert_rules (enabled);

CREATE TABLE alert_history (
  alert_id      UUID REFERENCES alert_rules(id),
  fired_at      TIMESTAMPTZ NOT NULL,
  resolved_at   TIMESTAMPTZ,
  state         TEXT CHECK (state IN ('pending','firing','resolved')),
  value         DOUBLE PRECISION,
  PRIMARY KEY (alert_id, fired_at)
);

-- Cardinality guard
CREATE TABLE series_cardinality (
  metric        TEXT PRIMARY KEY,
  series_count  BIGINT NOT NULL,
  last_updated  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Key classes:**

```text
IngestGateway         — validate(metric): check name regex, label count ≤10, label value length ≤100
CardinalityLimiter    — incr(seriesId): if metric series_count > 100k → reject with 429 + guidance
TSDBWriter            — write(seriesId, points): append WAL, insert memtable, flush SSTable every 2h
Downsampler           — rollup(raw 15s → 1m): avg/sum/count/min/max + tDigest for p99; runs every 1h, backfills cold
QueryEngine           — plan(query): choose hot/warm/cold shards by time range, fan-out, merge, apply agg
HistogramStore        — for p99: store pre-aggregated histogram buckets or DDSketch per 1m, merge on query
RuleEvaluator         — tick(): for each rule, query TSDB, update state machine, emit alertEvent
AlertManager          — group(alertEvents by labels), inhibit(), silence(), notify()
DashboardService      — CRUD dashboards, render widget cache key = hash(query+timeRange)
```

**Important algorithms / concurrency:**
- **Cardinality control:** On ingest, `seriesId = hash(metric, sorted labels)`. Check `series_cardinality[metric]` counter in [Redis](/system-design/redis) (approx via HyperLogLog). If `count > threshold (100k per metric)`, reject new series with `429 cardinality_exceeded` and suggest using logs instead. This prevents `userId` explosion: one metric × 10M users = 10M series → blocked at gateway.
- **p99 without storing every sample:** Ingest histogram buckets (e.g., `latency_bucket{le=100} 42`) or t-digest sketches per minute. Query merges sketches → estimates p99 with <1% error, no need to keep raw samples for a year.
- **Downsampling correctness:** `1m avg = sum(raw values in minute)/count`; for counters, store `rate` (delta). Use **counter reset detection** — if value drops, treat as new counter.
- **Push vs pull:** Pull (Prometheus) gives service discovery and staleness detection (if target down, no scrape = gap); push (Datadog) works through NAT and for short-lived jobs. Support both via adapter — ingest gateway accepts push, separate **Scraper** pulls `/metrics` and pushes into same Kafka.
- **Alert state machine:** `inactive → pending` when expr true first time; stay pending until `for` duration continuously true; then `firing`; when expr false → `resolved`. Prevents single blip paging.
- **Sharding:** TSDB shards by `hash(metric)` or `hash(seriesId)` — query fan-out merges; hot shard separate from warm/cold so writes don't contend with long-range queries.

**Design patterns:** Write-Behind (WAL + SSTable), Materialized Rollup (downsampling), Circuit Breaker on TSDB writers, Cache-Aside for dashboards, Observer (alerts).

## Deep dive — Cardinality: how this design dies

Unbounded tags are the #1 outage cause. Example anti-pattern: `http.requests{userId=12345}` — each user creates a new series, 10M users × 10 endpoints = 100M series, index explodes, query `avg(http.requests)` must scan 100M series. Rule of thumb: **metrics are for systems, logs/traces for entities**. Metrics labels should be low-cardinality (service, endpoint, status, AZ, version) — cardinality < 10k per metric. High-cardinality dimensions (userId, requestId, IP) belong in logs ([Elasticsearch](/system-design/elasticsearch)) or tracing (Jaeger) where per-event storage is expected, or as **exemplars** (sampled traceId attached to histogram bucket). At ingest, enforce `max_label_count=10`, `max_series_per_metric=100k`, and `deny_list=[userId, email]`. Provide a "cardinality explorer" dashboard showing top metrics by series count so teams self-correct. If a team truly needs per-user metrics, suggest **aggregation at agent** — emit `unique_users` as a gauge, not per-user counter.

## Deep dive — Alert burn rate and grouping

Naive `latency > 300ms → page` fires on every spike and fatigues on-call. Better: **SLO burn rate**. Define SLI `request_success = status<500`, SLO `99.9% over 30d`. Error budget = 0.1%. Alert when `burnRate = (errors in 5m)/(budget per 5m) > 2` sustained. This pages only when you're eating budget fast. Implement as recording rule `job:errors:rate5m` + `job:requests:rate5m` evaluated continuously, stored as new series (like [Flink](/system-design/flink) derived metrics). Grouping: if 50 hosts fire `HostDown`, Alert Manager groups by `cluster` and sends one page with count, not 50. Inhibition: if `ClusterDown` fires, suppress `HostDown` children. Silencing: maintenance window mutes by matcher. All alerts go through [notification system](/system-design/notification-system) with priority so `page` vs `ticket` use separate channels/rate limits.

## Handling failures and scale

- **Sharding:** Ingest shards by `hash(metric)` (e.g., 32 TSDB writers); query shards same hash so fan-out is minimal for single-metric dashboards. Time-based partitioning (2h blocks) lets you drop old raw blocks after downsampling.
- **Caching:** Widget result cache in [Redis](/system-design/redis) `key=hash(metric+tags+step+from+to)` TTL 30s absorbs dashboard refresh thundering herd. Query engine also caches seriesId → posting list for 1 min.
- **Replication:** Kafka RF=3, min ISR 2; TSDB replication factor 2 (or 3 for hot). Cold blocks erasure-coded on S3 (cheaper than 3× replica).
- **Failure modes:**
  - *TSDB hot shard down:* writes buffer in Kafka (6h), reads fall back to warm (1m) with slightly stale/coarser data — dashboard shows "data may be delayed" banner.
  - *Agent offline:* gap in series — query shows null, alert `absent(metric) for 5m` fires to detect missing data rather than false green.
  - *Cardinality spike:* gateway 429s new series, emits `metrics.ingest.rejected{reason=cardinality}` so team notices; existing series unaffected.
  - *Downsampler lag:* long-range queries hit raw (expensive) — throttle such queries or serve degraded 1m approximation with warning.
  - *Alert evaluator lag:* if evaluator can't keep 30s cadence, alert `firing` delayed — monitor evaluator lag and alert on it (meta-alert).
- **Probes:** scrape success rate, ingestion lag (Kafka lag), TSDB compaction lag, query latency P99, alert evaluation duration, cardinality per metric top-100.

## Extra probes / Interview follow-ups

1. **Prometheus vs Datadog:** Prometheus pulls, good for K8s service discovery; Datadog pushes, good for ephemeral lambdas. Say which you pick and why — either scores if justified.
2. **Logs vs metrics vs traces:** When to use each — metrics for aggregates, logs for per-event debug, traces for request flow. Don't store `userId` in metrics.
3. **Long-term query cost:** How to keep 1y query <5s — pre-aggregated 1h blocks + S3 with columnar format (Parquet) + query engine that skips cold unless range requires it.
4. **Multi-tenancy:** Add `tenantId` label, enforce per-tenant cardinality and query isolation via [API Gateway](/system-design/api-gateway) + row-level filter on TSDB.
5. **Derived metrics:** Use [Flink](/system-design/flink) to compute `rate`/`increase` over Kafka raw stream and feed back into TSDB as recording rules — reduces query-time compute.
6. **Cost control:** Retention by team — infra team 90d raw, product team 7d — different downsample configs; S3 Intelligent-Tiering for cold.

**Phrase:** "Agents ingest into a TSDB with downsampling. Alerts evaluate on recorded rules and page through the notification service. I will not put userId on metrics — that's how cardinality melts the cluster."

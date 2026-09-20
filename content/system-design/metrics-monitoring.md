# Metrics Monitoring

> Datadog / Prometheus-shaped platform. Ingest **time series**, downsample, alert when an SLO burns. Dashboards are a read model.

> Agents → buffer → TSDB with tiered retention; alert evaluator with pending→firing; **never put userId on metrics**.

> **Theory:** [Observability](/hld/observability) — logs vs metrics vs traces, RED/USE, SLOs. This page is the full monitoring product.

## What they ask

**Scenario:** Services emit CPU, latency, QPS; graph and page when `p99 > 300ms` for 5m. Millions of series, **1 year** retention without bankruptcy.

**What the interviewer really tests:**
- Write vs read path split + downsampling
- **Cardinality bomb** (`userId` tag kills TSDB)
- Alert state machine, grouping/inhibition
- Tiered retention: raw → 1m → 1h

**Example scale:** ~133k samples/sec ingress, ~2M active series; ~330 dashboard QPS; raw 1y ≈ 197 TB → must compact to ~1.3 TB.

## Requirements

**Functional:** Push (StatsD) and/or pull (Prometheus scrape). Range/instant query. Dashboards CRUD. Alerts with notify via [notification system](/hld/notification-system); silences.

**Non-functional:** ~100k writes/s sustained; query p99 <1s (1h), <5s (7d); reliable alert eval; cardinality guards at ingest.

**Clarify:** Push vs pull? Approximate p99 (histogram/t-digest)? Multi-tenant? Metrics only (no traces v1)?

**Out of scope (v1):** Jaeger traces, ELK logs, ML anomaly detection, per-team billing.

## Scale estimation

| Metric | Result |
|--------|--------|
| Ingress | ~133k samples/s (~180 GB/day raw) |
| After tiering | ~1.3 TB/year feasible |
| Dashboards | ~330 query QPS — widget cache |

90% of queries hit last 24h hot tier.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/ingest` | Push batch of points |
| `POST` | `/api/v1/write` | Prometheus remote_write |
| `GET` | `/api/v1/query_range` | Range query (`metric`, tags, step, agg) |
| `POST` | `/api/v1/dashboards` | Create dashboard |
| `POST` | `/api/v1/alerts` | Create rule `{ expr, for, notify }` |
| `POST` | `/api/v1/silences` | Mute matchers |

Scrape: collector pulls `GET /metrics` on targets every 15s → same ingest path.

## High-Level Design (HLD)

![Metrics monitoring: collectors, TSDB, alerts, Grafana](/images/hld/metrics-monitoring-architecture.svg)

- **Agents:** local buffer if backend down; batch push or expose `/metrics`.
- **Ingest gateway:** schema validate, **cardinality limit** per metric, hash → [Kafka](/hld/message-queue) `metrics.raw`.
- **TSDB writers:** hot SSD raw 15s (24h); downsampler → warm 1m (30d) → cold 1h (1y) on S3.
- **Query engine:** fan-out by time range + shard; merge; p99 from histogram sketches.
- **Redis:** dashboard widget cache TTL ~30s.
- **Rule evaluator:** every 30s query TSDB; **pending → firing → resolved** with `for` duration.
- **Alert manager:** group by labels, inhibit child alerts, dedup → PagerDuty/Slack.
- **Postgres:** dashboard + alert rule metadata only.

**Ingest:** agent → gateway → Kafka → WAL/memtable → SSTable blocks.

**Query:** cache miss → hot/warm/cold shard merge.

**Alert:** expr true sustained `for` → notify.

## Deep dive — cardinality

`http.requests{userId=…}` → 10M series → index death. **Metrics = low-cardinality labels** (service, endpoint, status, AZ). Deny `userId` at gateway; HyperLogLog per metric; 429 with guidance. High-cardinality → logs/traces or **exemplars** on histograms.

## Deep dive — alerts and retention

Threshold pages on every spike → fatigue. Prefer **SLO burn rate** on error budget. Group 50 `HostDown` into one page; inhibit `HostDown` when `ClusterDown` fires.

Downsample: 1m avg = sum/count; counters need reset detection. TSDB shard down → read warm 1m with banner; `absent(metric)` detects missing scrapes.

## Failures and scale

- Kafka 6h buffer absorbs writer pause; RF=3.
- Agent offline: gap in series; alert on absence.
- Cardinality spike: reject new series, existing OK.
- Evaluator lag: meta-alert on eval duration.
- Shard TSDB by metric hash; cold on S3 columnar.
- Never log full prompts — token counts as metrics only (tie to cost).

**Phrase:** Agents ingest into a TSDB with downsampling. Alerts evaluate on recorded rules and page through the notification service. I will not put userId on metrics — that's how cardinality melts the cluster.

**Remember:** Gateway cardinality cap → Kafka buffer → hot/warm/cold → histogram p99 → alert `for` + grouping → deny high-cardinality tags.

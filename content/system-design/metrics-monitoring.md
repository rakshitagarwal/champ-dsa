# Metrics Monitoring

> Datadog / Prometheus-shaped system. Ingest **time series**, downsample, alert when an SLO burns. Dashboards are a read model.

## What they ask

Services emit metrics. You store them, graph them, page a human when `p99 > 300ms` for 5 minutes.

## Requirements

**Functional:** ingest, query range, dashboards, alerts, labels/tags.

**Non-functional:** high write QPS, cheap storage for old data, alert delivery reliable-ish.

## API

1. `POST /ingest` (or Prometheus remote write / StatsD)
2. `GET /query?metric=&from=&to=&tags=`
3. `POST /alerts` `{ expr, for, notify }`

## Design

**Ingest agents** on each host → local buffer → Kafka or directly into a TSDB (Prometheus/Mimir/Influx/Timescale).

**Storage:** `(metric, tags, timestamp) → value`. Write-optimized. **Downsample:** raw 15s for 24h, 1m for 2 weeks, 1h for a year.

**Query:** range aggregation (`avg`, `p99` approx). Expensive queries hit a cache of dashboard widgets.

**Alert manager:** evaluate rules on an interval. State machine `pending → firing → resolved`. Send to [notification system](/system-design/notification-system). Group/inhibit so one outage isn't 5k pages.

## Deep dive — cardinality

The way this design dies: unbounded tags (`userId` on a metric). One metric × millions of users = explode series.

**Rule:** metrics are for *systems* (service, route, status). Events/logs/traces for per-user debug.

**p99:** histograms / t-digests, not storing every sample forever.

**Push vs pull:** Prometheus pulls; Datadog agents push. Either is fine — mention scrape vs agent.

**Hot ingest:** shard by metric name hash. Don't put the query path on the same boxes if you can split write/read.

## Extra probes

1. SLI/SLO/error budget — alert on burn rate, not a single blip
2. Tracing (Jaeger) as a sibling, not the same store
3. [Flink](/system-design/flink) for derived metrics from Kafka

**Phrase:** "Agents ingest into a TSDB with downsampling. Alerts evaluate on recorded rules and page through the notification service. I will not put userId on metrics — that's how cardinality melts the cluster."

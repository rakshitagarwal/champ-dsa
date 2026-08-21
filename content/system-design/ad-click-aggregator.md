# Ad Click Aggregator

> Count clicks (and impressions) for ads so you can **bill** and show dashboards. The bar is **no lost money** and **late events**, not a fancy UI.

## What they ask

Billions of click events a day. Aggregate by campaign, ad, time bucket. Advertisers see numbers that match the invoice *closely*.

## Requirements

**Functional:** ingest click, aggregate, query stats, export for billing.

**Non-functional:** at-least-once ingest, idempotent counts, handle late / duplicate pixels, query path not on the ingest path.

## API

1. Public pixel: `GET /click?id=&campaign=&ts=` (or POST from SDK)
2. `GET /stats?campaign=&from=&to=`
3. Internal billing export

## Design

**Ingest:** edge returns 204 fast. Enqueue the event to [Kafka](/system-design/kafka). Never write the warehouse on the pixel request.

**Dedupe:** event id (or `user + ad + time bucket`) in a short Redis TTL or Kafka compacted key so double-clicks / retries don't double-bill.

**Aggregate:** [Flink](/system-design/flink) keyed by `campaignId` + window. Sink to a serving store (Cassandra / Druid / BigQuery).

**Query:** dashboards read the serving store. Billing reads a **closed** window (yesterday UTC), not the in-flight minute.

## Deep dive — money vs dashboards

Dashboards can be approximate (sketches). **Invoices** need a reconciled number: unique event ids, timezone, what "click" means (fraud filter).

**Late events:** watermark + allowed lateness; after that, a small "adjustments" table, not rewrite history silently.

**Fraud:** obvious bots filtered before billing (rate, datacenter IPs). Say a fraud service consumes the same topic.

**Exactly-once:** Flink checkpoints + idempotent sink, or at-least-once + unique event table.

## Extra probes

1. Impression ≠ click — two topics, two pipelines
2. GDPR — don't put PII in the log if you can hash
3. Hot campaign — key by `campaign + shard`

**Phrase:** "The pixel only publishes to Kafka. Flink counts with event-time windows. Billing uses closed windows and deduped event ids. The advertiser UI reads a serving store, never the firehose."
